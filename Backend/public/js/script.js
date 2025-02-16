const socket = io();

// Check if geolocation is available
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
    }, (error) => {
        console.log(error);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    });
}

const map = L.map("map").setView([0, 0], 10);

// Add OpenStreetMap tiles
L.tileLayer("https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=d9dd1d85da844cd1b4911322016b113e", {
    attribution: "OpenStreetMap"
}).addTo(map);

const markers = {};

// Define a red marker icon for the user's location
const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // Link to a red marker image
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Handle real-time location data
socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude], 15);

    // If the marker exists, update its position, otherwise create a new marker
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        if (id === socket.id) {
            // Use red marker for the user's own location
            markers[id] = L.marker([latitude, longitude], { icon: redIcon }).addTo(map)
                .bindPopup("Your Location");
        } else {
            // Use default marker for other users
            markers[id] = L.marker([latitude, longitude]).addTo(map);
        }
    }

    // Fetch and display nearby hospitals
    getNearbyHospitals(latitude, longitude);
});

// Function to get nearby hospitals using Overpass API
function getNearbyHospitals(lat, lon) {
    const query = `[out:json]; node(around:5000, ${lat}, ${lon})["amenity"~"hospital|clinic|doctor|pharmacy"]; out body;`;
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    // Add a console log to debug the request URL
    console.log("Overpass API URL:", overpassUrl);

    // Make the API request
    axios.get(overpassUrl)
        .then(response => {
            console.log("Overpass API Response:", response.data); // Log the response for debugging
            const hospitals = response.data.elements;

            // Check if we have hospitals returned
            if (hospitals.length === 0) {
                console.log("No hospitals found near this location.");
            } else {
                hospitals.forEach(hospital => {
                    // Check if a marker for this hospital already exists
                    if (!markers[hospital.id]) {
                        const hospitalMarker = L.marker([hospital.lat, hospital.lon]).addTo(map)
                            .bindPopup(hospital.tags.name || "Medical Facility");

                        markers[hospital.id] = hospitalMarker; // Add to markers dictionary
                    }
                });
            }
        })
        .catch(error => {
            console.error("Error fetching hospital data:", error); // Log errors if API request fails
        });
}
