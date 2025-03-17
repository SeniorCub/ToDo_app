// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { toast } from "react-hot-toast"; // Ensure react-toastify is installed

const apiURL = import.meta.env.VITE_API_URL; // Use VITE_ prefix for Vite projects

// Firebase Config (Replace with actual config from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDwHkNTh1L0TSyNJv7UzdT5vD1_G8oFDMM",
  authDomain: "todoapp-6d36b.firebaseapp.com",
  projectId: "todoapp-6d36b",
  storageBucket: "todoapp-6d36b.firebasestorage.app",
  messagingSenderId: "507611342624",
  appId: "1:507611342624:web:3539f47eddf71394be1945",
  measurementId: "G-PDW9HBLRKH"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to handle Google sign-in
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // User data to be sent to backend
    const userData = {
      email: user.email,
      fullname: user.displayName,
      photoUrl: user.photoURL
    };

    try {
      // 🔹 First, check if the user exists
      const checkUserResponse = await axios.get(`${apiURL}/user/check?email=${user.email}`);

      if (checkUserResponse.data.exists) {
        // 🔹 If user exists, log them in
        // toast.notify("User already exists. Logging in...", { icon: "ℹ️" });

        const loginResponse = await axios.post(`${apiURL}/user/login`, { email: user.email });
        toast.success("Login successful!", { icon: "✅" });
        console.log("Login Response:", loginResponse.data);
      } else {
        // 🔹 If user does not exist, create new account
        const response = await axios.post(`${apiURL}/user/create`, userData, {
          headers: { "Content-Type": "application/json" }
        });

        toast.success("Registration successful!", { icon: "🎉" });
        console.log("Backend Response:", response.data);
      }
    } catch (error) {
      console.error("API Error:", error);

      if (error.response?.status === 409) {
        toast.info("User already exists. Logging in...", { icon: "ℹ️" });

        // If user exists, send a login request instead of showing an error
        try {
          const loginResponse = await axios.post(`${apiURL}/user/login`, { email: user.email });
          toast.success("Login successful!", { icon: "✅" });
          console.log("Login Response:", loginResponse.data);
        } catch (loginError) {
          console.error("Login API Error:", loginError);
          toast.error("Login failed. Please try again.");
        }
      } else {
        toast.error(error.response?.data?.message || "Registration failed. Please try again.");
      }
    }

    console.log("User Info:", userData);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    toast.error("Google Sign-In failed. Please try again.");
  }
};

export { auth, provider, signInWithGoogle };
