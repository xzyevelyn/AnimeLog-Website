// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged /*, signOut */ } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkvJ7KN1JPm1LunD5TDLPTYbmOFWAwbPM",
    authDomain: "animelog-a8732.firebaseapp.com",
    projectId: "animelog-a8732",
    storageBucket: "animelog-a8732.appspot.com",
    messagingSenderId: "404380025306",
    appId: "1:404380025306:web:2cacbab5eee336bb3d40e3",
    measurementId: "G-J6FER7E9KR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Optional: Uncomment below to force sign out on page load to avoid auto-login
// signOut(auth).then(() => {
//     console.log("User signed out to prevent auto-login.");
// });

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, redirect to dashboard if not already there
        if (!window.location.href.includes("anime-dashboard.html")) {
            window.location.href = "anime-dashboard.html";
        }
    }
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "anime-dashboard.html"; // redirect to dashboard page
        })
        .catch((error) => {
            const errorCode = error.code;

            if (errorCode === 'auth/user-not-found') {
                alert("User not found. Redirecting to Sign Up.");
                window.location.href = "animelogwebsitesignup.html";
            } else if (errorCode === 'auth/wrong-password') {
                alert("Wrong password.");
            } else {
                alert(error.message);
            }
        });
});




