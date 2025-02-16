import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "defaultSecret";

// Function to generate a token
export const generateToken = async (userData) => {
    const payload = {
      id: userData._id,
      email: userData.email,
    };
  
    return jwt.sign(payload, secretKey, { expiresIn: "2d" });
  };
  

// Function to verify a token
export const verifyToken = async(token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
