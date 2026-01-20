# 🚗 Parking Management System (Backend)

A backend application for managing parking operations such as parking locations, slots, vehicle check-in/check-out, payments, and reports.  
Built using **Node.js, Express, MongoDB**, with **JWT-based authentication** and **role-based access control**.

---

## 📌 Features

### 👤 Authentication & Authorization
- User login with JWT
- Secure password hashing
- Role-based access control
- Roles:
  - `SUPER_ADMIN`
  - `PARKING_ADMIN`
  - `ATTENDANT`

---

### 🅿️ Parking Management
- Create and manage parking locations
- Create parking slots (CAR / BIKE)
- Slot uniqueness per location
- Ordered slot allocation (C-01 → C-02 → C-03)

---

### 🎫 Ticket Management
- Vehicle check-in
- Automatic slot assignment
- Vehicle check-out
- Slot release after checkout
- Prevent duplicate vehicle entry
- Payment calculation on checkout
- Ticket lifecycle management (ACTIVE → COMPLETED)

---

### 📊 Reports
- Daily report
  - Total vehicles parked
  - Total revenue collected
- Accessible only by `PARKING_ADMIN`

---

## 🔐 Security Design

- JWT-based authentication (stateless)
- Tokens sent via `Authorization` header
- Middleware-based role authorization
- Protected routes for sensitive operations

---

## 🏗️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Security:** bcrypt
- **Environment:** dotenv
- **Dev Tools:** nodemon

---

## 📂 Project Structure

