// form-handler.js
import { db } from './firebase.js'; // ✅ Import your existing config
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form["name"].value.trim();
      const email = form["email"].value.trim();
      const message = form["message"].value.trim();

      try {
        await addDoc(collection(db, "messages"), {
          name,
          email,
          message,
          timestamp: serverTimestamp()
        });

        alert("Message sent successfully!");
        form.reset();
      } catch (error) {
        console.error("Error sending message: ", error);
        alert("Something went wrong. Please try again.");
      }
    });
  }
});
