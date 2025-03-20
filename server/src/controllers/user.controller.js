import { addUser, getAUser, getUserId, removeUser } from "../models/user.model.js";
import { generateToken } from "../utils/token.utils.js";

export const register = async (req, res) => {
     const { fullname, email, photoUrl } = req.body;
     if (!fullname || !email || !photoUrl) {
          return res.status(404).json({ message: "Please provide all details" });
     }

     try {
          const user = await getAUser(email);
          if (user.length > 0) {
               return res.status(409).json({ message: "User already existed." });
          }

          const result = await addUser(fullname, email, photoUrl);
          const userCreated = await getAUser(email)
          if (userCreated.length === 0) {
               return res.json({ message: "Email not registered. Please register with us." });
          }

          const token = generateToken(userCreated.id);

          res.cookie("token", token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: "strict",
               maxAge: 3600000,
          });
          if (result.affectedRows === 0) {
               return res.status(402).json({ message: "User not created." });
          } else {
               return res.status(200).json({
                    message: "User created successfully.",
                    token: token,
                    data: userCreated[0]
               });
          }
     } catch (erroror) {
          console.log(erroror);
     }
};

export const checkUser = async (req, res) => {
     const { email } = req.query;
     if (!email) {
          return res.status(400).json({ message: "Email is required." });
     }

     try {
          const user = await getAUser(email);
          return res.status(200).json({ exists: user.length > 0 });
     } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
     }
};



export const login = async (req, res, next) => {
     const { email } = req.body;

     try {
          const user = await getAUser(email);
          if (user.length === 0) {
               return res.json({ message: "Email not registered. Please register with us." });
          }

          const token = generateToken(user.id);

          res.cookie("token", token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: "strict",
               maxAge: 3600000,
          });

          res.status(200).json({
               message: "User logged in successfully.",
               token: token,
               data: user[0]
          });
     } catch (erroror) {
          next(erroror);
     }
};

export const detailsUser = async (req, res, next) => {
     const { id } = req.params;
     try {
          const user = await getUserId(id);
          if (user.length === 0) {
               return res.json({ message: "Email not registered. Please register with us." });
          }
          res.status(200).json({
               message: "User found successfully.",
               data: user[0]
          });
     } catch (error) {
          next(error);
     }
};

export const deleteAUser = async (req, res, next) => {
     const { id } = req.params;

     if (!req.body._id === id) {
          return res.status(404).json({ message: "User not found" });
     }

     try {
          const deletedUser = await removeUser(id);
          if (deletedUser.affectedRows === 0) {
               return res.status(402).json({ message: "User not found." });
          } else {
               return res.status(200).json({
                    message: "User deleted successfully."
               });
          }
     } catch (error) {
          next(error);
     }
};