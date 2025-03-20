import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
     const token = req.headers.authorization?.split(" ")[1]; // ✅ Extract token

     if (!token) {
          return res.status(401).json({ message: "No token provided" });
     }

     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
               return res.status(401).json({ message: "Invalid token" });
          }
          req.user = decoded;
          next();
     });
};