// Import Firebase functions (fix the duplicated/incorrect import lines)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBkvJ7KN1JPm1LunD5TDLPTYbmOFWAwbPM",
  authDomain: "animelog-a8732.firebaseapp.com",
  projectId: "animelog-a8732",
  storageBucket: "animelog-a8732.appspot.com",
  messagingSenderId: "404380025306",
  appId: "1:404380025306:web:2cacbab5eee336bb3d40e3",
  measurementId: "G-J6FER7E9KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Form submission handling
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("newPassword").value;
  const username = document.getElementById("newUsername").value;

  if (!email || !password || !username) {
    alert("Please fill out all fields.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`Account created for ${username}!`);
      window.location.href = "login.html"; // Redirect to login
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error registering user:", errorCode, errorMessage);

      // Optional: Friendly error messages
      switch (errorCode) {
        case 'auth/email-already-in-use':
          alert("This email is already registered.");
          break;
        case 'auth/invalid-email':
          alert("Please enter a valid email address.");
          break;
        case 'auth/weak-password':
          alert("Password should be at least 6 characters.");
          break;
        default:
          alert(errorMessage);
      }
    });
});
// Optional: Redirect to login page if already logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, redirect to home or dashboard
    window.location.href = "index.html"; // Change to your desired page
  }
});