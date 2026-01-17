import React, { useState, useEffect } from 'react';
import {
  Droplet, Thermometer, Cloud, Leaf, Bug, AlertTriangle, User, LogOut,
  Mic, Wifi, WifiOff, Users, Camera, TrendingUp, DollarSign,
  BarChart3, Download, Plus, Bell, Smartphone, MapPin, CheckCircle, XCircle,
  Save, Settings
} from 'lucide-react';
import './App.css';
import jsPDF from 'jspdf';

// Define API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// --- Translations ---
const translations = {
  en: {
    title: "Smart Farm",
    tagline: "Affordable • Voice-Enabled • Offline-Ready",
    login: "Login",
    register: "Register",
    username: "Username or Email",
    email: "Email Address",
    password: "Password",
    confirmPass: "Confirm Password",
    phone: "Phone Number (for SMS Alerts)",
    dashboard: "Dashboard",
    manual: "Manual Input",
    iot: "IoT Sensors",
    offline: "Offline",
    online: "Online",
    voice: "Voice Command",
    community: "Community",
    cropDoctor: "Crop Doctor",
    costs: "Cost Tracking",
    reports: "Reports",
    settings: "Settings",
    soilMoisture: "Soil Moisture",
    airTemp: "Air Temperature",
    plantHealth: "Crop Health",
    humidity: "Humidity",
    pestPresence: "Pest Alert",
    soilCondition: "Soil Condition",
    weatherFeel: "Weather Feel",
    pestsYes: "Pests Detected",
    pestsNo: "No Pests",
    alerts: "Alerts",
    sendSms: "SMS Alerts",
    treatment: "Recommended Treatment",
    nearestShop: "Nearest Agro Shop",
    uploadPhoto: "Upload Crop Photo",
    analyzing: "AI Analyzing...",
    diagnosis: "Diagnosis",
    confidence: "Confidence",
    treatmentCost: "Est. Treatment Cost",
    contactFarmer: "Contact",
    submitObservation: "Submit Observation",
    manualEntryTitle: "Field Observations",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    reportTypes: {
      weekly: "Weekly Water Usage",
      monthly: "Monthly Cost Analysis",
      health: "Crop Health Trends"
    },
    costCategories: {
      irrigation: "Irrigation",
      fertilizer: "Fertilizer",
      pesticide: "Pesticide",
      labor: "Labor"
    },
    manualOptions: {
      soil: {
        veryDry: "☀️ Very Dry (cracks visible)",
        slightlyDry: "🌤️ Slightly Dry",
        moist: "💧 Moist (good)",
        veryWet: "💦 Very Wet (waterlogged)"
      },
      plant: {
        healthy: "🟢 Healthy (green leaves)",
        okay: "🟡 Okay (some yellowing)",
        poor: "🔴 Poor (wilting/brown)"
      },
      weather: {
        veryHot: "🥵 Very Hot",
        warm: "☀️ Warm",
        pleasant: "🌤️ Pleasant",
        cool: "❄️ Cool"
      }
    }
  },
  hi: {
    title: "स्मार्ट खेती प्रबंधन",
    tagline: "किफायती • आवाज़-सक्षम • ऑफलाइन-तैयार",
    login: "लॉगिन",
    register: "पंजीकरण",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    confirmPass: "पासवर्ड की पुष्टि करें",
    phone: "फोन नंबर (SMS अलर्ट के लिए)",
    dashboard: "डैशबोर्ड",
    manual: "मैनुअल इनपुट",
    iot: "IoT सेंसर",
    offline: "ऑफलाइन",
    online: "ऑनलाइन",
    voice: "आवाज़ आदेश",
    community: "समुदाय",
    cropDoctor: "फसल डॉक्टर",
    costs: "लागत ट्रैकिंग",
    reports: "रिपोर्ट",
    settings: "सेटिंग्स",
    soilMoisture: "मिट्टी की नमी",
    airTemp: "हवा का तापमान",
    plantHealth: "फसल स्वास्थ्य",
    humidity: "नमी",
    pestPresence: "कीट चेतावनी",
    soilCondition: "मिट्टी की स्थिति",
    weatherFeel: "मौसम का ehsas",
    pestsYes: "कीट मिले",
    pestsNo: "कोई कीट नहीं",
    alerts: "चेतावनी",
    sendSms: "SMS अलर्ट",
    treatment: "सुझाया गया उपचार",
    nearestShop: "निकटतम कृषि दुकान",
    uploadPhoto: "फसल की फोटो अपलोड करें",
    analyzing: "AI विश्लेषण कर रहा है...",
    diagnosis: "निदान",
    confidence: "विश्वास",
    treatmentCost: "अनुमानित उपचार लागत",
    contactFarmer: "संपर्क",
    submitObservation: "अवलोकन जमा करें",
    manualEntryTitle: "खेत अवलोकन",
    noAccount: "खाता नहीं है?",
    hasAccount: "क्या आपके पास पहले से एक खाता मौजूद है?",
    reportTypes: {
      weekly: "साप्ताहिक जल उपयोग",
      monthly: "मासिक लागत विश्लेषण",
      health: "फसल स्वास्थ्य रुझान"
    },
    costCategories: {
      irrigation: "सिंचाई",
      fertilizer: "उर्वरक",
      pesticide: "कीटनाशक",
      labor: "श्रम"
    },
    manualOptions: {
      soil: {
        veryDry: "☀️ बहुत सूखा (दरारें)",
        slightlyDry: "🌤️ थोड़ा सूखा",
        moist: "💧 नम (अच्छा)",
        veryWet: "💦 बहुत गीला (जलभराव)"
      },
      plant: {
        healthy: "🟢 स्वस्थ (हरी पत्तियां)",
        okay: "🟡 ठीक (थोड़ा पीलापन)",
        poor: "🔴 खराब (मुरझाया हुआ)"
      },
      weather: {
        veryHot: "🥵 बहुत गर्म",
        warm: "☀️ गर्म",
        pleasant: "🌤️ सुहावना",
        cool: "❄️ ठंडा"
      }
    }
  },
  kn: {
    title: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ನಿರ್ವಹಣೆ",
    tagline: "ಕೈಗೆಟುಕುವ • ಧ್ವನಿ-ಶಕ್ತಗೊಂಡ • ಆಫ್‌ಲೈನ್",
    login: "ಲಾಗಿನ್",
    register: "ನೋಂದಣಿ",
    username: "ಬಳಕೆದಾರ ಹೆಸರು",
    password: "ಪಾಸ್ವರ್ಡ್",
    confirmPass: "ಪಾಸ್ವರ್ಡ್ ಖಚಿತಪಡಿಸಿ",
    phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    manual: "ಮ್ಯಾನುಯಲ್",
    iot: "IoT ಸೆನ್ಸಾರ್",
    offline: "ಆಫ್‌ಲೈನ್",
    online: "ಆನ್‌ಲೈನ್",
    voice: "ಧ್ವನಿ ಆದೇಶ",
    community: "ಸಮುದಾಯ",
    cropDoctor: "ಬೆಳೆ ವೈದ್ಯ",
    costs: "ವೆಚ್ಚ ನಿರ್ವಹಣೆ",
    reports: "ವರದಿಗಳು",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    soilMoisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
    airTemp: "ಗಾಳಿಯ ಉಷ್ಣಾಂಶ",
    plantHealth: "ಬೆಳೆ ಆರೋಗ್ಯ",
    humidity: "ಆರ್ದ್ರತೆ",
    pestPresence: "ಕೀಟ ಎಚ್ಚರಿಕೆ",
    soilCondition: "ಮಣ್ಣಿನ ಸ್ಥಿತಿ",
    weatherFeel: "ಹವಾಮಾನ",
    pestsYes: "ಕೀಟಗಳು ಕಂಡುಬಂದಿವೆ",
    pestsNo: "ಕೀಟಗಳಿಲ್ಲ",
    alerts: "ಎಚ್ಚರಿಕೆಗಳು",
    sendSms: "SMS ಎಚ್ಚರಿಕೆಗಳು",
    treatment: "ಶಿಫಾರಸು ಮಾಡಿದ ಚಿಕಿತ್ಸೆ",
    nearestShop: "ಹತ್ತಿರದ ಕೃಷಿ ಅಂಗಡಿ",
    uploadPhoto: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    analyzing: "AI ಪರಿಶೀಲಿಸುತ್ತಿದೆ...",
    diagnosis: "ರೋಗನಿರ್ಣಯ",
    confidence: "ನಂಬಿಕೆ",
    treatmentCost: "ಅಂದಾಜು ವೆಚ್ಚ",
    contactFarmer: "ಸಂಪರ್ಕಿಸಿ",
    submitObservation: "ವೀಕ್ಷಣೆ ಸಲ್ಲಿಸಿ",
    manualEntryTitle: "ಕ್ಷೇತ್ರ ವೀಕ್ಷಣೆಗಳು",
    noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
    hasAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    reportTypes: {
      weekly: "ವಾರದ ನೀರು ಬಳಕೆ",
      monthly: "ಮಾಸಿಕ ವೆಚ್ಚ",
      health: "ಬೆಳೆ ಆರೋಗ್ಯ"
    },
    costCategories: {
      irrigation: "ನೀರಾವರಿ",
      fertilizer: "ಗೊಬ್ಬರ",
      pesticide: "ಕೀಟನಾಶಕ",
      labor: "ಕೂಲಿ"
    },
    manualOptions: {
      soil: {
        veryDry: "☀️ ತುಂಬಾ ಒಣ (ಬಿರುಕುಗಳು)",
        slightlyDry: "🌤️ ಸ್ವಲ್ಪ ಒಣ",
        moist: "💧 ತೇವ (ಉತ್ತಮ)",
        veryWet: "💦 ತುಂಬಾ ಹಸಿ (ನೀರು ನಿಂತಿದೆ)"
      },
      plant: {
        healthy: "🟢 ಆರೋಗ್ಯಕರ (ಹಸಿರು)",
        okay: "🟡 ಸರಿ (ಸ್ವಲ್ಪ ಹಳದಿ)",
        poor: "🔴 ಕಳಪೆ (ಒಣಗುವುದು)"
      },
      weather: {
        veryHot: "🥵 ತುಂಬಾ ಬಿಸಿ",
        warm: "☀️ ಬೆಚ್ಚಗಿನ",
        pleasant: "🌤️ ಆಹ್ಲಾದಕರ",
        cool: "❄️ ತಂಪಾದ"
      }
    }
  },
  ta: {
    title: "ஸ்மார்ட் விவசாய மேலாண்மை",
    tagline: "மலிவு • குரல் வழி • ஆஃப்லைன்",
    login: "உள்நுழைய",
    register: "பதிவு",
    username: "பயனர்பெயர்",
    password: "கடவுச்சொல்",
    confirmPass: "கடவுச்சொல் உறுதிப்படுத்தவும்",
    phone: "தொலைபேசி எண்",
    dashboard: "முகப்பு",
    manual: "கைமுறை",
    iot: "IoT சென்சார்",
    offline: "ஆஃப்லைன்",
    online: "ஆன்லைன்",
    voice: "குரல் கட்டளை",
    community: "சமூகம்",
    cropDoctor: "பயிர் மருத்துவர்",
    costs: "செலவு கணக்கு",
    reports: "அறிக்கைகள்",
    settings: "அமைப்புகள்",
    soilMoisture: "மண் ஈரம்",
    airTemp: "வெப்பநிலை",
    plantHealth: "பயிர் நலம்",
    humidity: "ஈரப்பதம்",
    pestPresence: "பூச்சி எச்சரிக்கை",
    soilCondition: "மண் நிலை",
    weatherFeel: "வானிலை",
    pestsYes: "பூச்சிகள் உள்ளன",
    pestsNo: "பூச்சிகள் இல்லை",
    alerts: "எச்சரிக்கைகள்",
    sendSms: "SMS எச்சரிக்கை",
    treatment: "பரிந்துரைக்கப்பட்ட சிகிச்சை",
    nearestShop: "அருகிலுள்ள கடை",
    uploadPhoto: "புகைப்படம் பதிவேற்றவும்",
    analyzing: "AI ஆய்வு செய்கிறது...",
    diagnosis: "கண்டறிதல்",
    confidence: "நம்பகத்தன்மை",
    treatmentCost: "மதிப்பிடப்பட்ட செலவு",
    contactFarmer: "தொடர்பு",
    submitObservation: "சமர்ப்பிக்கவும்",
    manualEntryTitle: "கள ஆய்வுகள்",
    noAccount: "கணக்கு இல்லையா?",
    hasAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    reportTypes: {
      weekly: "வாராந்திர நீர்",
      monthly: "மாதாந்திர செலவு",
      health: "பயிர் ஆரோக்கியம்"
    },
    costCategories: {
      irrigation: "நீர்ப்பாசனம்",
      fertilizer: "உரம்",
      pesticide: "பூச்சிக்கொல்லி",
      labor: "வேலை"
    },
    manualOptions: {
      soil: {
        veryDry: "☀️ மிகவும் உலர்",
        slightlyDry: "🌤️ சிறிது உலர்",
        moist: "💧 ஈரம் (நன்று)",
        veryWet: "💦 அதிக ஈரம்"
      },
      plant: {
        healthy: "🟢 ஆரோக்கியமான",
        okay: "🟡 பரவாயில்லை",
        poor: "🔴 மோசம்"
      },
      weather: {
        veryHot: "🥵 மிக வெப்பம்",
        warm: "☀️ வெப்பம்",
        pleasant: "🌤️ இதமான",
        cool: "❄️ குளிர்"
      }
    }
  },
  te: {
    title: "స్మార్ట్ వ్యవసాయ నిర్వహణ",
    tagline: "సరసమైన • వాయిస్ • ఆఫ్‌లైన్",
    login: "లాగిన్",
    register: "నమోదు",
    username: "వినియోగదారు పేరు",
    password: "పాస్వర్డ్",
    confirmPass: "పాస్వర్డ్ నిర్ధారించండి",
    phone: "ఫోన్ నెంబర్",
    dashboard: "డ్యాష్‌బోర్డ్",
    manual: "మాన్యువల్",
    iot: "IoT సెన్సార్",
    offline: "ఆఫ్‌లైన్",
    online: "ఆన్‌లైన్",
    voice: "వాయిస్ కమాండ్",
    community: "సంఘం",
    cropDoctor: "పంట డాక్టర్",
    costs: "ఖర్చు ట్రాకింగ్",
    reports: "నివేదికలు",
    settings: "సెట్టింగులు",
    soilMoisture: "నేల తేమ",
    airTemp: "ఉష్ణోగ్రత",
    plantHealth: "పంట ఆరోగ్యం",
    humidity: "తేమ",
    pestPresence: "చీడ హెచ్చరిక",
    soilCondition: "నేల పరిస్థితి",
    weatherFeel: "వాతావరణం",
    pestsYes: "చీడలు ఉన్నాయి",
    pestsNo: "చీడలు లేవు",
    alerts: "హెచ్చరికలు",
    sendSms: "SMS హెచ్చరికలు",
    treatment: "చికిత్స",
    nearestShop: "దగ్గరి షాపు",
    uploadPhoto: "ఫోటో అప్‌లోడ్ చేయండి",
    analyzing: "AI విశ్లేషిస్తోంది...",
    diagnosis: "నిర్ధారణ",
    confidence: "నమ్మకం",
    treatmentCost: "అంచనా ఖర్చు",
    contactFarmer: "సంప్రదించండి",
    submitObservation: "సమర్పించు",
    manualEntryTitle: "క్షేత్ర పరిశీలనలు",
    noAccount: "ఖాతా లేదా?",
    hasAccount: "ఇప్పటికే ఖాతా ఉందా?",
    reportTypes: {
      weekly: "వారపు నీరు",
      monthly: "నెలవారీ ఖర్చు",
      health: "పంట ఆరోగ్యం"
    },
    costCategories: {
      irrigation: "నీటిపారుదల",
      fertilizer: "ఎరువులు",
      pesticide: "పురుగుమందు",
      labor: "కూలీ"
    },
    manualOptions: {
      soil: {
        veryDry: "☀️ చాలా పొడిగా",
        slightlyDry: "🌤️ కొద్దిగా పొడిగా",
        moist: "💧 తేమ (మంచి)",
        veryWet: "💦 చాలా తడి"
      },
      plant: {
        healthy: "🟢 ఆరోగ్యకరమైన",
        okay: "🟡 పర్వాలేదు",
        poor: "🔴 బాగాలేదు"
      },
      weather: {
        veryHot: "🥵 చాలా వేడి",
        warm: "☀️ వెచ్చని",
        pleasant: "🌤️ ఆహ్లాదకరమైన",
        cool: "❄️ చల్లని"
      }
    }
  },
  mr: {
    title: "स्मार्ट शेती व्यवस्थापन",
    tagline: "परवडणारे • व्हॉइस • ऑफलाइन",
    login: "लॉगिन",
    register: "नोंदणी",
    username: "वापरकर्ता नाव",
    password: "पासवर्ड",
    confirmPass: "पासवर्ड पुष्टी करा",
    phone: "फोन नंबर",
    dashboard: "डॅशबोर्ड",
    manual: "मॅन्युअल",
    iot: "IoT सेन्सर",
    offline: "ऑफलाइन",
    online: "ऑनलाइन",
    voice: "आवाज आदेश",
    community: "समुदाय",
    cropDoctor: "पीक डॉक्टर",
    costs: "खर्च ट्रॅकिंग",
    reports: "अहवाल",
    settings: "सेटिंग्ज",
    soilMoisture: "मातीची ओलावा",
    airTemp: "हवा तापमान",
    plantHealth: "पीक आरोग्य",
    humidity: "आर्द्रता",
    pestPresence: "कीड अलर्ट",
    soilCondition: "मातीची स्थिती",
    weatherFeel: "हवामान",
    pestsYes: "कीड आढळली",
    pestsNo: "कीड नाही",
    alerts: "सूचना",
    sendSms: "SMS सूचना",
    treatment: "उपचार",
    nearestShop: "जवळचे दुकान",
    uploadPhoto: "फोटो अपलोड करा",
    analyzing: "AI विश्लेषण करत आहे...",
    diagnosis: "निदान",
    confidence: "खात्री",
    treatmentCost: "अंदाजे खर्च",
    contactFarmer: "संपर्क",
    submitObservation: "निरीक्षण सादर करा",
    manualEntryTitle: "शेत निरीक्षणे",
    noAccount: "खाते नाही?",
    hasAccount: "आधीच खाते आहे?",
    reportTypes: {
      weekly: "साप्ताहिक पाणी",
      monthly: "मासिक खर्च",
      health: "पीक आरोग्य"
    },
    costCategories: {
      irrigation: "सिंचन",
      fertilizer: "खत",
      pesticide: "कीटकनाशक",
      labor: "मजुरी"
    },
    manualOptions: {
      soil: {
        veryDry: "☀️ खूप कोरडे (भेगा)",
        slightlyDry: "🌤️ थोडे कोरडे",
        moist: "💧 ओलसर (चांगले)",
        veryWet: "💦 खूप ओले"
      },
      plant: {
        healthy: "🟢 निरोगी (हिरवी पाने)",
        okay: "🟡 ठीक (पिवळसर)",
        poor: "🔴 खराब (सुकलेली)"
      },
      weather: {
        veryHot: "🥵 खूप गरम",
        warm: "☀️ उबदार",
        pleasant: "🌤️ प्रसन्न",
        cool: "❄️ थंड"
      }
    }
  }
};

const AdvancedFarmSystem = () => {
  // State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [isOffline, setIsOffline] = useState(false);
  const [inputMode, setInputMode] = useState('iot');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Data State
  const [sensorData, setSensorData] = useState({
    soilMoisture: 33.4,
    airTemp: 25.6,
    humidity: 72.3,
    cropHealth: 89.1,
    pestAlert: false
  });

  const [manualObservation, setManualObservation] = useState({
    soil: 'moist',
    plant: 'healthy',
    weather: 'pleasant'
  });

  const [alerts, setAlerts] = useState([
    { id: 1, message: 'Low soil moisture detected', time: '10 mins ago', read: false, type: 'warning' },
    { id: 2, message: '3 farmers nearby reported aphids', time: '1 hour ago', read: false, type: 'critical' },
    { id: 3, message: 'Heavy rain expected tomorrow', time: '2 hours ago', read: true, type: 'info' }
  ]);

  const [expenses, setExpenses] = useState({
    irrigation: 1200,
    fertilizer: 3500,
    pesticide: 800,
    labor: 4000
  });

  const [nearbyFarmers] = useState([
    { id: 1, name: "Ramesh K.", dist: "2km", status: "Aphids Found", phone: "+91 98765 43210" },
    { id: 2, name: "Suresh P.", dist: "3.5km", status: "Healthy Crop", phone: "+91 98765 43211" },
    { id: 3, name: "Geeta D.", dist: "5km", status: "Water Shortage", phone: "+91 98765 43212" },
  ]);

  // Crop Doctor Simulation State
  const [analyzingPhoto, setAnalyzingPhoto] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  const t = translations[language];

  // Persistent Login
  useEffect(() => {
    const savedUser = localStorage.getItem('sfa_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUsername(user.username);
      setPhone(user.phone || '');
      setIsLoggedIn(true);
    }
  }, []);

  // Handlers
  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.success) {
        alert(`Welcome back, ${data.user.username}!`);
        localStorage.setItem('sfa_user', JSON.stringify(data.user));
        setPhone(data.user.phone || '');
        setIsLoggedIn(true);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server Error: Ensure backend is running.");
      console.error(err);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, phone })
      });
      const data = await res.json();

      if (data.success) {
        alert("Registration successful! Please login.");
        setIsRegistering(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server Error: Ensure backend is running.");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sfa_user');
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');
    setPassword('');
    setPhone('');
  };

  const handleUpdateSettings = async (newPhone, smsEnabled) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/update-settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, phone: newPhone, smsEnabled })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('sfa_user', JSON.stringify(data.user)); // Update local
        alert("Settings Saved!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Simulating live data
  useEffect(() => {
    if (!isLoggedIn || inputMode !== 'iot') return;
    const interval = setInterval(() => {
      setSensorData(prev => ({
        soilMoisture: +(prev.soilMoisture + (Math.random() - 0.5)).toFixed(1),
        airTemp: +(prev.airTemp + (Math.random() - 0.5)).toFixed(1),
        humidity: +(prev.humidity + (Math.random() - 0.5)).toFixed(1),
        cropHealth: prev.cropHealth,
        pestAlert: prev.pestAlert
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [isLoggedIn, inputMode]);

  const handlePhotoUpload = () => {
    setAnalyzingPhoto(true);
    setTimeout(() => {
      setAnalyzingPhoto(false);
      setDiagnosisResult({
        disease: "Early Blight",
        confidence: "94%",
        treatment: "Apply Copper Oxychloride (3g/liter)",
        cost: "₹450",
        nearestShop: "Kisan Agro Keep (2.5km away)",
        image: require('./assets/disease.png')
      });
    }, 2500);
  };

  const addExpense = (category) => {
    const amt = prompt(`Add amount for ${t.costCategories[category]} (₹):`);
    if (amt) {
      setExpenses(prev => ({
        ...prev,
        [category]: prev[category] + parseInt(amt)
      }));
    }
  };

  const handleSMSAlertToggle = () => {
    if (!phone) {
      alert("Please input a phone number first.");
      return;
    }
    handleUpdateSettings(phone, true);
  };

  // PDF Generation Logic
  const generatePDF = (reportType) => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(34, 197, 94); // Green Color
    doc.text(t.title, 20, 20);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Report: ${t.reportTypes[reportType]}`, 20, 35);
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 45);
    doc.text(`Farmer: ${username || 'Guest'}`, 20, 52);

    doc.setLineWidth(0.5);
    doc.line(20, 58, 190, 58);

    // Dynamic Content based on Report Type
    let yPos = 70;

    if (reportType === 'monthly') {
      doc.setFontSize(14);
      doc.text("Expense Breakdown:", 20, yPos);
      yPos += 10;
      doc.setFontSize(12);

      Object.keys(expenses).forEach((key) => {
        const label = t.costCategories[key] || key;
        const value = `Rs ${expenses[key].toLocaleString()}`;
        doc.text(`${label}: ${value}`, 20, yPos);
        yPos += 10;
      });

      yPos += 5;
      doc.setFont(undefined, 'bold');
      const total = Object.values(expenses).reduce((a, b) => a + b, 0);
      doc.text(`Total Spend: Rs ${total.toLocaleString()}`, 20, yPos);
    }
    else if (reportType === 'health') {
      doc.text(`Current Crop Health Score: ${sensorData.cropHealth}/100`, 20, yPos);
      yPos += 10;
      doc.text(`Pest Alert Status: ${sensorData.pestAlert ? 'Action Needed' : 'No Critical Threats'}`, 20, yPos);
      yPos += 10;
      doc.text("Recent Observations:", 20, yPos);
      // Could integrate manual observations here
    }
    else {
      doc.text("No specific data available for this report type yet.", 20, yPos);
    }

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Generated by Smart Farm App - Empowering Agriculture", 20, 280);

    doc.save(`${reportType}_report_${Date.now()}.pdf`);
  };

  // --- Offline Sync Logic ---
  useEffect(() => {
    const syncOfflineData = async () => {
      const offlineData = JSON.parse(localStorage.getItem('offline_readings') || '[]');

      if (offlineData.length > 0 && !isOffline) {
        console.log("Syncing offline data...", offlineData);
        alert(`Syncing ${offlineData.length} offline records to cloud...`);

        try {
          for (const reading of offlineData) {
            await fetch(`${API_BASE_URL}/api/manual-entry`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(reading)
            });
          }
          localStorage.removeItem('offline_readings');
          alert("All offline data synced successfully! ✅");
        } catch (err) {
          console.error("Sync failed", err);
        }
      }
    };

    if (!isOffline) {
      syncOfflineData();
    }
  }, [isOffline]); // Re-run whenever 'isOffline' changes

  const handleManualSubmit = async () => {
    if (!username) {
      alert("Please login to submit observations.");
      return;
    }

    const payload = {
      username,
      ...manualObservation,
      timestamp: new Date().toISOString()
    };

    // If Offline: Save to Local Storage
    if (isOffline) {
      const currentData = JSON.parse(localStorage.getItem('offline_readings') || '[]');
      currentData.push(payload);
      localStorage.setItem('offline_readings', JSON.stringify(currentData));

      alert("⚠️ You are OFFLINE. Data saved locally. Will sync when Online.");
      return;
    }

    // If Online: Send to Backend
    try {
      const res = await fetch(`${API_BASE_URL}/api/manual-entry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        alert("Observation submitted to Cloud! AI is analyzing your data...");
      } else {
        alert("Failed to submit: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting observation:", err);
      alert("Server error. Data saved locally instead.");

      // Fallback to local storage on error
      const currentData = JSON.parse(localStorage.getItem('offline_readings') || '[]');
      currentData.push(payload);
      localStorage.setItem('offline_readings', JSON.stringify(currentData));
    }
  };

  // Login/Register View
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <Leaf size={48} className="app-logo" />
          <h1 className="login-title">{t.title}</h1>
          <p className="login-subtitle">{t.tagline}</p>

          <div className="form-group">
            <label className="form-label">Language / भाषा / ಭಾಷೆ</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="form-input"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">{t.username}</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">{t.password}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
          </div>

          {isRegistering && (
            <>
              <div className="form-group">
                <label className="form-label">{t.email}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" placeholder="farmer@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">{t.confirmPass}</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">{t.phone}</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" />
              </div>
            </>
          )}

          {isRegistering ? (
            <button onClick={handleRegister} className="btn-primary">{t.register}</button>
          ) : (
            <button onClick={handleLogin} className="btn-primary" id="login-btn">{t.login}</button>
          )}

          <p className="text-sm text-center mt-4 cursor-pointer text-blue-600 hover:underline" id="toggle-register" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? t.hasAccount : t.noAccount} <strong>{isRegistering ? t.login : t.register}</strong>
          </p>

        </div>
      </div>
    );
  }

  // Main App
  return (
    <div className="dashboard-layout">
      {/* Header */}
      <header className="top-header">
        <div className="header-left">
          <Leaf className="color-green" size={28} />
          <h1 className="header-title hidden-mobile">{t.title}</h1>
        </div>

        <div className="header-right">
          <select className="control-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="kn">KN</option>
            <option value="ta">TA</option>
            <option value="te">TE</option>
            <option value="mr">MR</option>
          </select>

          <div className="toggle-wrapper" title="Switch between free manual entry or automated IoT sensors">
            <select className="control-select input-mode-select" value={inputMode} onChange={(e) => setInputMode(e.target.value)}>
              <option value="iot">🤖 {t.iot}</option>
              <option value="manual">📝 {t.manual}</option>
            </select>
          </div>

          <button className="icon-btn btn-blue-soft" onClick={() => alert("Listening... Say 'Soil Status' or 'Weather'")}>
            <Mic size={20} />
          </button>

          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`status-badge ${isOffline ? 'offline' : 'online'}`}
          >
            {isOffline ? <WifiOff size={16} /> : <Wifi size={16} />}
            <span className="hidden-mobile">{isOffline ? t.offline : t.online}</span>
          </button>

          <div style={{ position: 'relative' }}>
            <button className="icon-btn" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
              <Bell size={20} className="color-text-secondary" />
              {alerts.filter(a => !a.read).length > 0 && (
                <span className="notification-badge">{alerts.filter(a => !a.read).length}</span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="notification-dropdown" style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                width: '320px',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                zIndex: 100,
                border: '1px solid #e2e8f0',
                padding: '1rem',
                animation: 'slideUp 0.2s ease-out'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h4 style={{ fontWeight: 'bold' }}>Notifications</h4>
                  <button onClick={() => setAlerts(alerts.map(a => ({ ...a, read: true })))} style={{ background: 'none', border: 'none', color: '#059669', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'bold' }}>
                    Mark all read
                  </button>
                </div>
                {alerts.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No new notifications</p>
                ) : (
                  <ul className="alert-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {alerts.map(a => (
                      <li key={a.id} className={`alert-item ${a.type}`} style={{ padding: '0.75rem', borderRadius: '8px', marginBottom: '0.5rem', background: a.read ? 'white' : '#f8fafc' }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.9rem', fontWeight: a.read ? 'normal' : 'bold', color: '#1e293b' }}>{a.message}</p>
                          <small style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{a.time}</small>
                        </div>
                        {!a.read && <div style={{ width: '8px', height: '8px', background: '#f97316', borderRadius: '50%' }}></div>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <button onClick={handleLogout} className="icon-btn" title="Logout">
            <LogOut size={20} className="color-red" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs-list">
          {[
            { id: 'dashboard', icon: BarChart3, label: t.dashboard },
            { id: 'community', icon: Users, label: t.community },
            { id: 'doctor', icon: Camera, label: t.cropDoctor },
            { id: 'costs', icon: DollarSign, label: t.costs },
            { id: 'reports', icon: TrendingUp, label: t.reports },
            { id: 'settings', icon: Settings, label: t.settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className={`tab-btn ${currentView === tab.id ? 'active' : ''}`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Areas */}
      <main className="main-content">

        {/* DASHBOARD */}
        {currentView === 'dashboard' && (
          <div className="card-grid">

            {/* IoT SENSORS MODE */}
            {inputMode === 'iot' && (
              <>
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon-wrapper bg-blue-100 text-blue-600">
                      <Droplet size={24} />
                    </div>
                    <span>{t.soilMoisture}</span>
                  </div>
                  <div>
                    <div className="stat-value">{sensorData.soilMoisture}%</div>
                    <div className="stat-subtext">Optimal range: 40-60%</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon-wrapper bg-orange-100 text-orange-600">
                      <Thermometer size={24} />
                    </div>
                    <span>{t.airTemp}</span>
                  </div>
                  <div>
                    <div className="stat-value">{sensorData.airTemp}°C</div>
                    <div className="stat-subtext">Partly Cloudy</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon-wrapper bg-green-100 text-green-600">
                      <Leaf size={24} />
                    </div>
                    <span>{t.plantHealth}</span>
                  </div>
                  <div>
                    <div className="stat-value">{sensorData.cropHealth}/100</div>
                    <div className="stat-subtext">No issues detected</div>
                  </div>
                </div>
              </>
            )}

            {/* MANUAL ENTRY MODE */}
            {inputMode === 'manual' && (
              <div className="stat-card full-width">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                  <Plus className="text-green-600" size={24} />
                  <h3 className="font-bold text-lg">{t.manualEntryTitle}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Soil Input */}
                  <div>
                    <label className="form-label">{t.soilCondition}</label>
                    <select
                      className="form-input"
                      value={manualObservation.soil}
                      onChange={(e) => setManualObservation({ ...manualObservation, soil: e.target.value })}
                    >
                      <option value="veryDry">{t.manualOptions.soil.veryDry}</option>
                      <option value="slightlyDry">{t.manualOptions.soil.slightlyDry}</option>
                      <option value="moist">{t.manualOptions.soil.moist}</option>
                      <option value="veryWet">{t.manualOptions.soil.veryWet}</option>
                    </select>
                  </div>

                  {/* Plant Input */}
                  <div>
                    <label className="form-label">{t.plantHealth}</label>
                    <select
                      className="form-input"
                      value={manualObservation.plant}
                      onChange={(e) => setManualObservation({ ...manualObservation, plant: e.target.value })}
                    >
                      <option value="healthy">{t.manualOptions.plant.healthy}</option>
                      <option value="okay">{t.manualOptions.plant.okay}</option>
                      <option value="poor">{t.manualOptions.plant.poor}</option>
                    </select>
                  </div>

                  {/* Weather Input */}
                  <div>
                    <label className="form-label">{t.weatherFeel}</label>
                    <select
                      className="form-input"
                      value={manualObservation.weather}
                      onChange={(e) => setManualObservation({ ...manualObservation, weather: e.target.value })}
                    >
                      <option value="veryHot">{t.manualOptions.weather.veryHot}</option>
                      <option value="warm">{t.manualOptions.weather.warm}</option>
                      <option value="pleasant">{t.manualOptions.weather.pleasant}</option>
                      <option value="cool">{t.manualOptions.weather.cool}</option>
                    </select>
                  </div>

                  <button className="btn-primary flex items-center justify-center gap-2 mt-auto" onClick={handleManualSubmit}>
                    <Save size={20} /> {t.submitObservation}
                  </button>
                </div>
              </div>
            )}

            {/* Alerts Log */}
            <div className="stat-card full-width">
              <div className="stat-header">
                <AlertTriangle className="color-orange" size={20} />
                <span>{t.alerts}</span>
              </div>
              <ul className="alert-list">
                {alerts.map(a => (
                  <li key={a.id} className={`alert-item ${a.type}`}>
                    <span className="alert-msg">{a.message}</span>
                    <span className="alert-time">{a.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* COMMUNITY */}
        {currentView === 'community' && (
          <div className="card-grid">
            {nearbyFarmers.map(farmer => (
              <div key={farmer.id} className="stat-card">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{farmer.name}</h3>
                    <p className="text-sm text-gray-500">{farmer.dist} away</p>
                  </div>
                  <User className="text-gray-400" />
                </div>
                <div className="mb-4">
                  <span className={`status-pill ${farmer.status.includes('Healthy') ? 'success' : 'warning'}`}>
                    {farmer.status}
                  </span>
                </div>
                <button className="btn-secondary w-full" onClick={() => alert(`Calling ${farmer.name}...`)}>
                  {t.contactFarmer}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CROP DOCTOR */}
        {currentView === 'doctor' && (
          <div className="doctor-container">
            {!diagnosisResult ? (
              <div className="upload-section">
                <div className="upload-box" onClick={handlePhotoUpload}>
                  {analyzingPhoto ? (
                    <div className="animate-pulse flex flex-col items-center">
                      <Camera className="mb-2 text-green-500" size={48} />
                      <p>{t.analyzing}</p>
                    </div>
                  ) : (
                    <>
                      <Camera className="mb-2 text-gray-400" size={48} />
                      <p>{t.uploadPhoto}</p>
                      <p className="text-xs text-gray-500 mt-2">(Click to Simulate)</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="diagnosis-result animate-fade-in">
                <div className="result-header">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="text-red-500" size={32} />
                      <h2 className="text-xl font-bold text-red-600">{diagnosisResult.disease}</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-2"><strong>{t.confidence}:</strong> {diagnosisResult.confidence}</p>
                    {diagnosisResult.image && (
                      <img src={diagnosisResult.image} alt="Crop Issue" className="rounded-lg shadow-sm border border-gray-200 w-full max-h-48 object-cover" />
                    )}
                  </div>
                </div>

                <div className="treatment-box">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-600" /> {t.treatment}
                  </h4>
                  <p className="mb-4">{diagnosisResult.treatment}</p>

                  <div className="cost-estimate">
                    <DollarSign size={16} />
                    <span>{t.treatmentCost}: {diagnosisResult.cost}</span>
                  </div>
                </div>

                <div className="map-link">
                  <MapPin size={18} />
                  <span>{t.nearestShop}: <strong>{diagnosisResult.nearestShop}</strong></span>
                </div>

                <button onClick={() => setDiagnosisResult(null)} className="btn-secondary mt-4 w-full">
                  Scan Another Crop
                </button>
              </div>
            )}
          </div>
        )}

        {/* COST TRACKING */}
        {currentView === 'costs' && (
          <div className="card-grid">
            <div className="stat-card full-width bg-blue-50">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-blue-900">Total Spend</h3>
                <span className="text-2xl font-bold text-blue-700">
                  ₹{Object.values(expenses).reduce((a, b) => a + b, 0).toLocaleString()}
                </span>
              </div>
            </div>

            {Object.keys(expenses).map(key => (
              <div key={key} className="stat-card">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-600">{t.costCategories[key]}</span>
                  <div className="bg-gray-100 p-2 rounded-full">
                    <DollarSign size={16} className="text-gray-500" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-4">₹{expenses[key].toLocaleString()}</div>
                <button onClick={() => addExpense(key)} className="btn-small btn-outline w-full">
                  + Add Expense
                </button>
              </div>
            ))}
          </div>
        )}

        {/* REPORTS */}
        {currentView === 'reports' && (
          <div className="stat-card full-width">
            <h3 className="font-bold text-lg mb-4">{t.reports}</h3>
            <ul className="report-list">
              {Object.keys(t.reportTypes).map(key => (
                <li key={key} className="report-item">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <TrendingUp className="text-green-600" size={20} />
                    </div>
                    <span>{t.reportTypes[key]}</span>
                  </div>
                  <button className="icon-btn" onClick={() => generatePDF(key)} title="Download PDF">
                    <Download size={20} className="text-gray-500" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SETTINGS (MY ACCOUNT) */}
        {currentView === 'settings' && (
          <div className="max-w-5xl mx-auto mt-6">
            <div className="stat-card full-width p-8">

              {/* Profile Header */}
              <div className="flex items-center gap-4 border-b pb-6 mb-6">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-2xl">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">My Account</h2>
                  <p className="text-gray-500 font-medium">@{username}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                    Verified Farmer
                  </span>
                </div>
              </div>

              {/* Account Details Form */}
              <div className="space-y-6">

                {/* Phone Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.phone}
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Smartphone className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-input pl-10 w-full"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <button
                      onClick={() => handleUpdateSettings(phone, true)}
                      className="btn-primary whitespace-nowrap px-6"
                    >
                      Update
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <CheckCircle size={12} className="text-green-500" />
                    Enables manual SMS alerts & community features.
                  </p>
                </div>

                {/* Preferences (Visual only for now) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Preferences</label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <Bell size={18} className="text-gray-500" />
                      <span className="text-gray-700">Daily Weather SMS</span>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none">
                      <input type="checkbox" checked={!!phone} readOnly className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-green-500 right-0" />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-green-500 cursor-pointer"></label>
                    </div>
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="border-t pt-6 mt-8">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 flex items-center justify-center gap-2 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdvancedFarmSystem;