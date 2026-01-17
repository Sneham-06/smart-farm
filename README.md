# 🌱 Smart Farm Management System

> Empowering farmers with AI-driven insights, offline capabilities, and smart farm tracking.

![Smart Farm Banner](frontend/src/assets/bg.png)

## 📖 Overview
**Smart Farm** is a comprehensive Progressive Web App (PWA) designed to help farmers manage their crops, expenses, and connectivity challenges. Built with a modern **Glassmorphism UI** and **Offline-First** architecture, it ensures farmers can log data even in remote areas without internet access.

## ✨ Key Features

### 🚜 Smart Dashboard
- **IoT Integration**: Real-time visualization of Soil Moisture, Temperature, and Crop Health.
- **Offline Mode**: Toggle between "Online" and "Offline" modes. Data collected offline is stored locally and syncs automatically when connectivity returns.
- **Manual Entry**: Log daily farming activities manually if sensors are unavailable.

### 🤖 AI Crop Doctor
- **Disease Detection**: Upload photos of crops to detect diseases (e.g., Early Blight) and get instant treatment recommendations.
- **Visual Analysis**: Displays diagnosis confidence and nearest shop for remedies.

### 💰 Farm Management
- **Expense Tracking**: Monitor costs for seeds, fertilizers, and equipment.
- **PDF Reports**: Generate and download professional PDF reports for expenses and health trends.
- **Community**: Connect with other farmers and experts (Simulated).

### 🌍 Accessibility
- **Multilingual Support**: Switch seamlessly between **English (EN)** and **Marathi (MR)**.
- **Voice Commands**: Voice-enabled navigation and input assists.
- **Responsive Design**: optimized for Mobile and Desktop with large touch-friendly controls.

## 🛠️ Tech Stack

- **Frontend**: React.js, CSS3 (Glassmorphism), Lucide Icons, jsPDF.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Atlas Cloud).
- **Deployment**: Render (Web Service & Static Site).

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas Account

### 1. Clone the Repository
```bash
git clone https://github.com/Sneham-06/smart-farm.git
cd smart-farm
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create a .env file with your MongoDB URI
# MONGO_URI=your_mongodb_connection_string
npm start
```
*Server runs on port 5000.*

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
```
*App runs on http://localhost:3000.*

## 🔒 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the `backend` folder:

`MONGO_URI` = `mongodb+srv://<username>:<password>@cluster0.mongodb.net/smart-farm-db`

## 📱 Screenshots
*(Add screenshots of your Dashboard, Login, and Offline Sync alerts here)*

## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
