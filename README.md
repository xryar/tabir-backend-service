# 🔐 Backend - Real-time Sign Language Detection

This backend is responsible for handling user authentication, token management, and prediction results used in the **TaBir: Real-time Sign Language Detection** application.

The frontend application connects to this backend to perform login, token refresh, logout, and save prediction results. The system is built using **Hapi.js** and deployed through **Railway**.

---

## ⚙️ Tech Stack

- **Hapi.js** –A Node.js framework for building modular and scalable RESTful APIs.
- **JWT (JSON Web Token)** – Used to manage authentication with access and refresh tokens.
- **PostgreSQL** – The main database for storing user data.
- **Railway** – A simple and fast deployment platform for backend services.
- **MobileNetV2 (TensorFlow.js)** – A lightweight machine learning model used on the frontend side to efficiently detect sign language gestures in real-time.

---

# API Documentation for Tangan Bicara
* [Documentation](https://xryar.github.io/tabir-api-docs/)
