import React, { useEffect, useState } from "react";

function MapPage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/map`)
      .then((res) => res.text())
      .then((html) => {
        setContent(html);
        // Inject backend styles
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${import.meta.env.VITE_BACKEND_URL}/css/style.css`;
        document.head.appendChild(link);

        // Inject backend scripts
        const script = document.createElement("script");
        script.src = `${import.meta.env.VITE_BACKEND_URL}/js/script.js`;
        script.async = true;
        document.body.appendChild(script);
      })
      .catch((err) => console.error("Failed to load page:", err));
  }, []);

  return (
    <div 
      className="ejs-content" 
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default MapPage;
