# 🌾 Smart Farm Management System
![Smart Farm Banner](frontend/src/assets/bg.png) 
*(Note: Replace the above path with your actual banner image URL if hosted externally)*

> **Empowering farmers with data-driven insights, even in remote areas with poor connectivity.**

A modern, AI-powered Progressive Web App (PWA) that brings smart agriculture to every farmer's fingertips. Built with React, Node.js, and MongoDB, Smart Farm combines cutting-edge technology with practical farming needs.

---

## ✨ Features

### 📊 Real-Time Monitoring
*   Visualizes IoT sensor data (Soil Moisture, Temperature, Crop Health).
*   Beautiful glassmorphism dashboard for intuitive data representation.
*   Live updates with visual indicators optimized for sunlight visibility.

### 📴 Offline-First Architecture
*   **Works without internet!** Farmers can log data offline.
*   Automatic cloud sync when connection is restored.
*   Custom offline sync engine using browser LocalStorage.
*   **Zero data loss guarantee.**

### 🤖 AI Crop Doctor
*   Upload plant photos to detect diseases (e.g., Early Blight).
*   Instant AI-powered diagnosis.
*   Treatment recommendations tailored to detected issues.
*   Helps prevent crop loss with early intervention.

### 💰 Farm Management
*   Track farming expenses and revenue.
*   Downloadable **PDF reports** for financial planning.
*   Budget insights for better resource allocation.

### 🌐 Accessibility
*   **Bilingual Interface:** English/Marathi support.
*   **Voice Commands:** Simulated voice control for ease of use.
*   **Mobile-First Design:** Optimized for smartphones and tablets.
*   Premium UI with high-contrast colors for outdoor visibility.

---

## 🛠️ Technologies Used

### Frontend
*   **React.js** - Component-based UI framework
*   **CSS3** - Custom glassmorphism design with themed variables
*   **Lucide React** - Modern icon library
*   **jsPDF** - Client-side PDF report generation
*   **LocalStorage** - Offline data caching

### Backend
*   **Node.js** - JavaScript runtime
*   **Express.js** - RESTful API framework
*   **MongoDB Atlas** - Cloud NoSQL database

### DevOps & Deployment
*   **Render** - Cloud hosting (backend + frontend)
*   **Git/GitHub** - Version control
*   **Environment Variables** - Secure configuration management

---

## 🚀 Getting Started

### Option 1: Live Demo (Cloud)
Visit the deployed application:  
👉 **[https://smart-farm-frontend.onrender.com](https://smart-farm-frontend.onrender.com)**

### Option 2: Local Development

#### Prerequisites
*   Node.js (v14 or higher)
*   npm or yarn
*   MongoDB Atlas account (or local MongoDB)
*   Git

#### Installation Steps

**1. Clone the Repository**
```bash
git clone https://github.com/Sneham-06/smart-farm.git
cd smart-farm
```

**2. Backend Setup**
```bash
cd backend
npm install

# Create .env file with the following:
# MONGO_URI=your_mongodb_connection_string
# PORT=5000

npm start
```
*Backend will run on http://localhost:5000*

**3. Frontend Setup**
```bash
cd ../frontend
npm install
npm start
```
*Frontend will run on http://localhost:3000*

**4. Access the Application**  
Open your browser and navigate to `http://localhost:3000`

---

## 📁 Project Structure

```bash
smart-farm/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & validation
│   ├── config/          # Database configuration
│   ├── server.js        # Entry point
│   ├── package.json
│   └── .env             # Environment variables
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json  # PWA configuration
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── services/      # API calls & offline sync
│   │   ├── styles/        # CSS modules
│   │   ├── utils/         # Helper functions
│   │   ├── App.js         # Root component
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── .env               # API endpoint configuration
│
├── README.md
├── .gitignore
└── LICENSE
```

---

## 🎨 Key Highlights

### Offline Sync Engine
A custom-built system that:
*   Queues data in browser's **LocalStorage** when offline.
*   Automatically detects when connection is restored.
*   Flushes queued data to MongoDB in correct order.
*   Provides user feedback on sync status.

### Premium UI Design
*   **Glassmorphism:** Modern, translucent card-based design.
*   **Custom Color Scheme:** Gold (success) and Red-Orange (alerts).
*   **High Visibility:** Optimized for outdoor use in bright sunlight.
*   **Responsive:** Adapts seamlessly to all screen sizes.

### SPA Architecture
*   Smooth client-side routing without page refreshes.
*   Fast navigation optimized for mobile devices.
*   Code splitting for improved performance.
*   Lazy loading of heavy components.

### 📱 Progressive Web App (PWA)
Smart Farm can be installed on mobile devices like a native app:
1.  Visit the website on your phone.
2.  Tap "Add to Home Screen" in your browser menu.
3.  Launch the app icon from your home screen.
4.  Enjoy offline functionality!

---

## 🔐 Environment Variables

**Backend (.env)**
```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartfarm
PORT=5000
NODE_ENV=production
```

**Frontend (.env)**
```bash
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

---

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License
This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👨‍💻 Author
**Sneham-06**  
GitHub: [@Sneham-06](https://github.com/Sneham-06)

---

## 🙏 Acknowledgments
*   IoT sensor data integration inspired by real farming needs.
*   UI/UX design principles from Material Design and Glassmorphism trends.
*   AI crop disease detection powered by machine learning models.
*   Special thanks to the farming community for feedback and testing.

---

### 📞 Support
For issues, questions, or suggestions:
*   Open an issue on GitHub.
*   Email: *[Insert Email Here]*

<br>
<p align="center">Made with ❤️ for farmers everywhere 🌾</p>
