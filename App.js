import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Alert,
  TextInput,
  Modal,
  Linking
} from 'react-native';

const translations = {
  ar: {
    welcomeTitle: "YASSINE BARBER",
    welcomeSub: "HAIRCUT & STYLING STUDIO",
    statusOpen: "مفتوح اليوم",
    statusClosed: "مغلق حالياً (ظرف طارئ)",
    chooseRole: "مرحباً بك! اختر وجهتك:",
    clientRoleTitle: "أنا زبون (Client)",
    clientRoleSub: "احجز حلاقتك، اختر وقتك وشوف الدالة",
    barberRoleTitle: "أنا الحلاق (Barber)",
    barberRoleSub: "إدارة المواعيد، التنبيهات، والمدخول",
    footerText: "📍 مستغانم، الجزائر • حلاقة احترافية وسريعة",
    pinTitle: "🔒 دخول الحلاق",
    pinSub: "أدخل رمز الـ PIN الخاص بك",
    loginBtn: "دخول",
    cancelBtn: "إلغاء",
    backBtn: "← القائمة",
    exitBtn: "← خروج",
    quickNextSlot: "⚡ أسرع موعد متاح اليوم:",
    noSlots: "كل المواعيد ممتلئة اليوم",
    selectThisSlot: "اختيار هذا الوقت",
    callBarber: "📞 اتصل بالحلاق",
    location: "📍 موقع الصالون",
    currentBookingTitle: "📌 موعدك المحجوز حالياً:",
    timeLabel: "⏰ التوقيت:",
    serviceLabel: "✂️ الخدمة:",
    cancelBookingBtn: "❌ إلغاء الحجز",
    step1Service: "1. اختر الخدمة:",
    step2Time: "2. اختر التوقيت المتاح:",
    selectBtn: "اختر",
    selectedBtn: "✅ مختارة",
    confirmBookingBtn: "تأكيد حجز الموعد",
    alreadyBookedBtn: "لديك موعد محجوز مسبقاً",
    salonClosedBtn: "الصالون مغلق حالياً",
    bookingInfoTitle: "معلومات الحجز",
    bookingInfoSub: "يرجى إدخال بياناتك للتأكيد (10 أرقام)",
    fullNamePlaceholder: "الاسم الكامل",
    phonePlaceholder: "رقم الهاتف (06/07/05... 10 أرقام)",
    finalConfirmBtn: "تأكيد النهائي",
    dashboardTitle: "💈 لوحة تحكم الحلاق",
    todayEarnings: "💰 مدخول اليوم التقديري:",
    salonOpenState: "🟢 الصالون مفتوح",
    salonClosedState: "🔴 الصالون متوقف",
    dailyReportBtn: "📊 ملخص ونشاط اليوم (Daily Report)",
    emergencyStopBtn: "🚨 إغلاق طارئ وإلغاء جميع المواعيد",
    workHoursBtn: "⚙️ ضبط ساعات العمل",
    manualBlockBtn: "🔒 غلق توقيت معين (استراحة/زبون مباشر)",
    changePinBtn: "🔐 تغيير رمز الـ PIN",
    noBookings: "لا توجد مواعيد قائمة حالياً.",
    notifyClientBtn: "🔔 تنبيه القرب",
    promoteVipBtn: "⚡ تقديم الموعد",
    doneBookingBtn: "✓ إنهاء الموعد وتفريغ الوقت",
    dailyReportTitle: "📊 ملخص اليوم الشامل",
    dailyReportSub: "تقرير الأداء وحركة الصالون اليوم",
    totalEarningsLabel: "💰 المدخول الإجمالي:",
    completedClientsLabel: "👥 الزبائن الذين تم إنهاء حلاقتهم:",
    remainingBookingsLabel: "⏳ الحجوزات المتبقية قائمة:",
    topServiceLabel: "🔥 الخدمة الأكثر طلباً اليوم:",
    closeReportBtn: "إغلاق التقرير",
    oldPinPlaceholder: "الرمز القديم",
    newPinPlaceholder: "الرمز الجديد (4 أرقام)",
    changePinConfirmBtn: "تأكيد التغيير",
    workScheduleTitle: "⏱️ دوام اليوم",
    workScheduleSub: "حدد وقت بداية ونهاية العمل اليوم:",
    startTimeLabel: "وقت بداية العمل:",
    endTimeLabel: "وقت نهاية العمل:",
    applyScheduleBtn: "تطبيق البرنامج اليومي",
    manualBlockTitle: "🔒 غلق توقيت يدويًا",
    manualBlockSub: "اختر الوقت واكتب ملاحظة (اختياري)",
    manualNotePlaceholder: "سبب الغلق (مثلاً: زبون مباشر / استراحة)",
    manualBlockConfirmBtn: "تأكيد الغلق",
    closedSlotText: "مغلق ⛔",
    bookedSlotText: "غير متاح 🚫",
    stdService: "حلاقة ستوندار (Standard)",
    stdDesc: "شعر ولحية",
    vipService: "حلاقة كاملة + العناية (V.I.P)",
    vipDesc: "شعر + لحية + كيراتين والعناية بالبشرة",
    eventService: "خدمة المناسبات",
    eventDesc: "حلاقة خاصة للمناسبات (عرس، مناقشة مذكرة، إلخ)",
    newBookingNoticeTitle: "⚡ حجز جديد وصل الآن!",
    cancellationAlertTitle: "❌ زبون ألغى حجزه!",
    callClientNowBtn: "📞 اتصل بالزبون الآن",
    quickMsgBtn: "💬 رسالة سريعة",
    quickMsgTitle: "اختر رسالة جاهزة للإرسال:",
    msgDelay: "⏳ راني متأخر بـ 10 دقائق، اصبر عليّة",
    msgCome: "🏃‍♂️ تفضل للصالون جاء دورك",
    msgDone: "✨ كملت، تفضل",
    invalidPhoneAlertTitle: "رقم الهاتف غير صحيح ⚠️",
    invalidPhoneAlertMsg: "يرجى كتابة رقم هاتف جزائري يتكون من 10 أرقام ويبدأ بـ 05 أو 06 أو 07.",
  },
  fr: {
    welcomeTitle: "YASSINE BARBER",
    welcomeSub: "STUDIO COIFFURE & STYLING",
    statusOpen: "Ouvert Aujourd'hui",
    statusClosed: "Fermé Actuellement (Urgence)",
    chooseRole: "Bienvenue! Choisissez votre profil:",
    clientRoleTitle: "Je suis un Client",
    clientRoleSub: "Réservez votre coupe et choisissez votre heure",
    barberRoleTitle: "Je suis le Coiffeur",
    barberRoleSub: "Gérer les RDV, notifications et revenus",
    footerText: "📍 Mostaganem, Algérie • Coiffure Professionnelle",
    pinTitle: "🔒 Espace Coiffeur",
    pinSub: "Entrez votre code PIN",
    loginBtn: "Connexion",
    cancelBtn: "Annuler",
    backBtn: "← Menu",
    exitBtn: "← Quitter",
    quickNextSlot: "⚡ Prochain créneau disponible:",
    noSlots: "Tous les créneaux sont complets aujourd'hui",
    selectThisSlot: "Choisir cet horaire",
    callBarber: "📞 Appeler le Coiffeur",
    location: "📍 Localisation",
    currentBookingTitle: "📌 Votre réservation actuelle:",
    timeLabel: "⏰ Heure:",
    serviceLabel: "✂️ Service:",
    cancelBookingBtn: "❌ Annuler le RDV",
    step1Service: "1. Choisissez le service:",
    step2Time: "2. Choisissez l'horaire disponible:",
    selectBtn: "Choisir",
    selectedBtn: "✅ Sélectionné",
    confirmBookingBtn: "Confirmer la réservation",
    alreadyBookedBtn: "Vous avez déjà un RDV",
    salonClosedBtn: "Le salon est actuellement fermé",
    bookingInfoTitle: "Informations de réservation",
    bookingInfoSub: "Veuillez entrer vos coordonnées (10 chiffres)",
    fullNamePlaceholder: "Nom & Prénom",
    phonePlaceholder: "N° Téléphone (06/07/05... 10 chiffres)",
    finalConfirmBtn: "Confirmer Définitivement",
    dashboardTitle: "💈 Tableau de Bord Coiffeur",
    todayEarnings: "💰 Revenu Estimé du Jour:",
    salonOpenState: "🟢 Salon Ouvert",
    salonClosedState: "🔴 Salon En Pause",
    dailyReportBtn: "📊 Rapport du Jour (Daily Report)",
    emergencyStopBtn: "🚨 Fermeture d'urgence & Annulation",
    workHoursBtn: "⚙️ Réglage des Heures de Travail",
    manualBlockBtn: "🔒 Bloquer un Créneau (Pause/Direct)",
    changePinBtn: "🔐 Changer le Code PIN",
    noBookings: "Aucun rendez-vous pour le moment.",
    notifyClientBtn: "🔔 Alerte Proximité",
    promoteVipBtn: "⚡ Avancer le RDV",
    doneBookingBtn: "✓ Terminer & Libérer le Créneau",
    dailyReportTitle: "📊 Rapport Global du Jour",
    dailyReportSub: "Performances et activité du salon",
    totalEarningsLabel: "💰 Revenu Total:",
    completedClientsLabel: "👥 Clients Coiffés:",
    remainingBookingsLabel: "⏳ Réservations Restantes:",
    topServiceLabel: "🔥 Service le Plus Demandé:",
    closeReportBtn: "Fermer le Rapport",
    oldPinPlaceholder: "Ancien Code PIN",
    newPinPlaceholder: "Nouveau PIN (4 chiffres)",
    changePinConfirmBtn: "Confirmer le Changement",
    workScheduleTitle: "⏱️ Horaires du Jour",
    workScheduleSub: "Définissez le début et la fin de travail:",
    startTimeLabel: "Heure de Début:",
    endTimeLabel: "Heure de Fin:",
    applyScheduleBtn: "Appliquer les Horaires",
    manualBlockTitle: "🔒 Bloquer un Créneau",
    manualBlockSub: "Choisissez l'heure et notez la raison",
    manualNotePlaceholder: "Raison (ex: Client direct / Pause)",
    manualBlockConfirmBtn: "Confirmer le Blocage",
    closedSlotText: "Fermé ⛔",
    bookedSlotText: "Indisponible 🚫",
    stdService: "Coupe Standard",
    stdDesc: "Cheveux + Barbe",
    vipService: "Coupe Complète + Soin (V.I.P)",
    vipDesc: "Cheveux + Barbe + Kératine et Soin de Visage",
    eventService: "Service Événements",
    eventDesc: "Coupe spéciale (Mariage, Soutenance, etc.)",
    newBookingNoticeTitle: "⚡ Nouvelle réservation reçue!",
    cancellationAlertTitle: "❌ Un client a annulé son RDV!",
    callClientNowBtn: "📞 Appeler le client maintenant",
    quickMsgBtn: "💬 Message Rapide",
    quickMsgTitle: "Choisissez un message type:",
    msgDelay: "⏳ Je suis en retard de 10 min",
    msgCome: "🏃‍♂️ C'est votre tour, venez au salon",
    msgDone: "✨ C'est terminé",
    invalidPhoneAlertTitle: "Numéro de téléphone invalide ⚠️",
    invalidPhoneAlertMsg: "Veuillez entrer un numéro algérien valide de 10 chiffres commençant par 05, 06 ou 07.",
  }
};

export default function App() {
  const [lang, setLang] = useState('ar');
  const t = translations[lang];

  const [role, setRole] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [isBarberWorking, setIsBarberWorking] = useState(true);
  const [barberPin, setBarberPin] = useState("4455");

  const allTimeSlots = [
    '15:00', '15:30', '16:00', '16:30', 
    '17:00', '17:30', '18:00', '18:30', 
    '19:00', '19:30', '20:00', '20:30', 
    '21:00', '21:30', '22:00', '22:30'
  ];

  const [workStartTime, setWorkStartTime] = useState('15:00');
  const [workEndTime, setWorkEndTime] = useState('22:30');

  const [bookings, setBookings] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [completedCount, setCompletedCount] = useState(0); 
  const [serviceStats, setServiceStats] = useState({}); 

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeClientBooking, setActiveClientBooking] = useState(null);

  const [emergencyNotification, setEmergencyNotification] = useState(null);
  const [turnNotification, setTurnNotification] = useState(null);

  const [newBookingAlert, setNewBookingAlert] = useState(null);
  const [cancellationAlert, setCancellationAlert] = useState(null); // إشعار إلغاء الحجز للحلاق
  const [quickMsgClient, setQuickMsgClient] = useState(null);

  const [isManualModalVisible, setIsManualModalVisible] = useState(false);
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [isChangePinModalVisible, setIsChangePinModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isQuickMsgModalVisible, setIsQuickMsgModalVisible] = useState(false);

  const [manualTime, setManualTime] = useState(null);
  const [manualNote, setManualNote] = useState('');

  const [oldPinInput, setOldPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');

  const BARBER_PHONE = "0796733714"; 
  const MAPS_URL = "https://maps.app.goo.gl/ZN68ozM8GpAns7pr7";

  const [enteredPin, setEnteredPin] = useState('');
  const [isPinModalVisible, setIsPinModalVisible] = useState(false);

  const services = [
    { id: '1', name: t.stdService, description: t.stdDesc, price: 350, priceText: '350 DA' },
    { id: '2', name: t.vipService, description: t.vipDesc, price: 1000, priceText: '1000 DA' },
    { id: '3', name: t.eventService, description: t.eventDesc, price: 500, priceText: '500 DA' },
  ];

  const toggleLanguage = () => setLang(prevLang => (prevLang === 'ar' ? 'fr' : 'ar'));

  const getAvailableTimeSlots = () => {
    const startIndex = allTimeSlots.indexOf(workStartTime);
    const endIndex = allTimeSlots.indexOf(workEndTime);
    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) return allTimeSlots;
    return allTimeSlots.slice(startIndex, endIndex + 1);
  };

  const availableSlots = getAvailableTimeSlots();
  const isTimeBooked = (time) => bookings.some(b => b.time === time);
  const getNextAvailableSlot = () => availableSlots.find(slot => !isTimeBooked(slot)) || null;
  const nextSlot = getNextAvailableSlot();

  const handleBookingStart = () => {
    if (!isBarberWorking) {
      Alert.alert(lang === 'ar' ? 'تنبيه ⛔' : 'Attention ⛔', lang === 'ar' ? 'الصالون متوقف حالياً.' : 'Le salon est fermé.');
      return;
    }
    if (!selectedService) {
      Alert.alert(lang === 'ar' ? 'تنبيه' : 'Attention', lang === 'ar' ? 'الرجاء اختيار الخدمة أولاً' : 'Veuillez choisir un service.');
      return;
    }
    if (!selectedTime) {
      Alert.alert(lang === 'ar' ? 'تنبيه' : 'Attention', lang === 'ar' ? 'الرجاء اختيار الوقت المناسب' : 'Veuillez choisir un horaire.');
      return;
    }
    if (isTimeBooked(selectedTime)) {
      Alert.alert(lang === 'ar' ? 'تنبيه ⚠️' : 'Attention ⚠️', lang === 'ar' ? 'هذا الوقت غير متاح.' : 'Cet horaire est occupé.');
      return;
    }
    setIsModalVisible(true);
  };

  const isValidDzPhone = (phone) => {
    const cleanPhone = phone.trim();
    const phoneRegex = /^(05|06|07)[0-9]{8}$/;
    return phoneRegex.test(cleanPhone);
  };

  const handleFinalConfirm = () => {
    if (!clientName.trim()) {
      Alert.alert(lang === 'ar' ? 'تنبيه' : 'Attention', lang === 'ar' ? 'يرجى إدخال الاسم الكامل' : 'Veuillez entrer votre nom.');
      return;
    }

    if (!isValidDzPhone(clientPhone)) {
      Alert.alert(t.invalidPhoneAlertTitle, t.invalidPhoneAlertMsg);
      return;
    }

    const serviceObj = services.find(s => s.id === selectedService);

    const newBooking = {
      id: Date.now().toString(),
      name: clientName,
      phone: clientPhone.trim(),
      service: serviceObj ? serviceObj.name : '',
      price: serviceObj ? serviceObj.price : 0,
      priceText: serviceObj ? serviceObj.priceText : '',
      time: selectedTime,
      isManual: false,
      isVipFastTrack: false
    };

    setBookings([newBooking, ...bookings]);
    setActiveClientBooking(newBooking);
    setIsModalVisible(false);
    setNewBookingAlert(newBooking);

    Alert.alert(
      lang === 'ar' ? 'نجاح الحجز! 🎉' : 'Réservation Réussie! 🎉', 
      lang === 'ar' ? `شكراً ${clientName}!\nتم حجز موعدك الساعة ${selectedTime}.` : `Merci ${clientName}!\nRDV confirmé à ${selectedTime}.`
    );

    setSelectedService(null);
    setSelectedTime(null);
  };

  const handlePromoteToVip = (bookingId) => {
    const updatedBookings = bookings.map(b => {
      if (b.id === bookingId) return { ...b, isVipFastTrack: true };
      return b;
    });
    updatedBookings.sort((a, b) => (b.isVipFastTrack ? 1 : 0) - (a.isVipFastTrack ? 1 : 0));
    setBookings(updatedBookings);
    Alert.alert('VIP Fast Track ⚡', lang === 'ar' ? 'تم تقديم الموعد بنجاح!' : 'RDV avancé avec succès!');
  };

  const handleCancelClientBooking = () => {
    if (!activeClientBooking) return;
    
    // إرسال تنبيه للحلاق بأن هذا الزبون ألغى حجزه
    setCancellationAlert({
      name: activeClientBooking.name,
      time: activeClientBooking.time,
      service: activeClientBooking.service
    });

    setBookings(bookings.filter(b => b.id !== activeClientBooking.id));
    Alert.alert(lang === 'ar' ? 'تم الإلغاء 🗑️' : 'Annulé 🗑️', lang === 'ar' ? 'تم إلغاء حجزك بنجاح.' : 'Votre RDV a été annulé.');
    setActiveClientBooking(null);
  };

  const handleSendTurnNotification = (booking) => {
    setTurnNotification(lang === 'ar' ? `يا ${booking.name}، دورك قرب! تفضل للصالون الآن.` : `Cher ${booking.name}, votre tour approche! Veuillez venir au salon.`);
    Alert.alert(lang === 'ar' ? 'تم التنبيه 🔔' : 'Notifié 🔔', lang === 'ar' ? `تم إرسال إشعار للزبون ${booking.name}.` : `Notification envoyée à ${booking.name}.`);
  };

  const handleSendQuickMessage = (msgText) => {
    if (!quickMsgClient) return;
    setTurnNotification(`رسالة من الحلاق إلى ${quickMsgClient.name}: "${msgText}"`);
    setIsQuickMsgModalVisible(false);
    setQuickMsgClient(null);
    Alert.alert(lang === 'ar' ? 'تم الإرسال 💬' : 'Envoyé 💬', lang === 'ar' ? 'تم إرسال الرسالة السريعة بنجاح.' : 'Message envoyé avec succès.');
  };

  const handleEmergencyStop = () => {
    Alert.alert(
      lang === 'ar' ? '🚨 غلق طارئ للصالون' : '🚨 Fermeture d\'urgence',
      lang === 'ar' ? 'هل أنت تأكد من غلق الصالون وإلغاء جميع المواعيد الحالية؟' : 'Voulez-vous vraiment annuler tous les rendez-vous?',
      [
        { text: lang === 'ar' ? 'إلغاء' : 'Annuler', style: 'cancel' },
        { 
          text: lang === 'ar' ? 'تأكيد الإغلاق 🚨' : 'Confirmer 🚨', 
          style: 'destructive',
          onPress: () => {
            setIsBarberWorking(false);
            setBookings([]);
            setEmergencyNotification(lang === 'ar' ? "نعتذر منك، جاني ظرف طارئ وتقدر تحجز وقت آخر." : "Désolé, urgence imprévue. Veuillez réserver ultérieurement.");
            if (activeClientBooking) setActiveClientBooking(null);
          }
        }
      ]
    );
  };

  const handleAddManualBlock = () => {
    if (!manualTime) {
      Alert.alert(lang === 'ar' ? 'تنبيه' : 'Attention', lang === 'ar' ? 'يرجى اختيار التوقيت' : 'Choisissez un horaire.');
      return;
    }

    const manualBooking = {
      id: Date.now().toString(),
      name: manualNote.trim() ? manualNote : (lang === 'ar' ? 'حجز يدوي / استراحة' : 'Réservation Manuel / Pause'),
      phone: '---',
      service: lang === 'ar' ? 'مغلق يدويًا' : 'Bloqué manuellement',
      price: 0,
      priceText: '0 DA',
      time: manualTime,
      isManual: true,
      isVipFastTrack: false
    };

    setBookings([manualBooking, ...bookings]);
    setIsManualModalVisible(false);
    setManualNote('');
    setManualTime(null);
  };

  const handleBarberLogin = () => {
    if (enteredPin === barberPin) {
      setIsPinModalVisible(false);
      setEnteredPin('');
      setRole('barber');
    } else {
      Alert.alert(lang === 'ar' ? 'خطأ ❌' : 'Erreur ❌', lang === 'ar' ? 'رمز PIN غير صحيح!' : 'Code PIN incorrect!');
    }
  };

  const handleChangePin = () => {
    if (oldPinInput !== barberPin) {
      Alert.alert(lang === 'ar' ? 'خطأ ❌' : 'Erreur ❌', lang === 'ar' ? 'الرمز القديم غير صحيح!' : 'Ancien PIN incorrect!');
      return;
    }
    if (newPinInput.length !== 4) {
      Alert.alert(lang === 'ar' ? 'تنبيه ⚠️' : 'Attention ⚠️', lang === 'ar' ? 'يجب أن يتكون الرمز من 4 أرقام!' : 'Le PIN doit contenir 4 chiffres!');
      return;
    }
    setBarberPin(newPinInput);
    setIsChangePinModalVisible(false);
    setOldPinInput('');
    setNewPinInput('');
    Alert.alert(lang === 'ar' ? 'نجاح 🔐' : 'Succès 🔐', lang === 'ar' ? 'تم تغيير PIN بنجاح!' : 'Code PIN modifié avec succès!');
  };

  const getMostRequestedService = () => {
    let mostRequested = lang === 'ar' ? 'لا توجد بيانات' : 'Pas de données';
    let max = 0;
    Object.keys(serviceStats).forEach(key => {
      if (serviceStats[key] > max) {
        max = serviceStats[key];
        mostRequested = key;
      }
    });
    return mostRequested;
  };

  const callBarber = () => Linking.openURL(`tel:${BARBER_PHONE}`);
  const callClient = (phone) => Linking.openURL(`tel:${phone}`);
  const openLocation = () => Linking.openURL(MAPS_URL);

  // 1. الواجهة الرئيسية
  if (!role) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.welcomeScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.welcomeWrapper}>
            <TouchableOpacity style={styles.langSwitchBtn} onPress={toggleLanguage}>
              <Text style={styles.langSwitchText}>🌐 {lang === 'ar' ? 'Français (FR)' : 'العربية (AR)'}</Text>
            </TouchableOpacity>

            <View style={styles.heroCard}>
              <View style={styles.logoBadgeModern}>
                <Text style={styles.logoIconModern}>💈</Text>
              </View>
              <Text style={styles.brandTitle}>{t.welcomeTitle}</Text>
              <Text style={styles.brandTagline}>{t.welcomeSub}</Text>

              <View style={[styles.statusBadgeModern, isBarberWorking ? styles.statusOpenModern : styles.statusClosedModern]}>
                <View style={[styles.statusDot, { backgroundColor: isBarberWorking ? '#2ECC71' : '#E74C3C' }]} />
                <Text style={styles.statusBadgeTextModern}>
                  {isBarberWorking ? `${t.statusOpen} (${workStartTime} - ${workEndTime})` : t.statusClosed}
                </Text>
              </View>
            </View>

            <Text style={styles.selectRoleTitle}>{t.chooseRole}</Text>

            <TouchableOpacity style={styles.roleCardClient} activeOpacity={0.8} onPress={() => setRole('client')}>
              <View style={styles.roleCardIconBox}><Text style={{ fontSize: 28 }}>✂️</Text></View>
              <View style={styles.roleCardTextBox}>
                <Text style={styles.roleCardTitle}>{t.clientRoleTitle}</Text>
                <Text style={styles.roleCardSub}>{t.clientRoleSub}</Text>
              </View>
              <Text style={styles.arrowIcon}>➔</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.roleCardBarber} activeOpacity={0.8} onPress={() => setIsPinModalVisible(true)}>
              <View style={[styles.roleCardIconBox, { backgroundColor: 'rgba(230, 126, 34, 0.15)' }]}>
                <Text style={{ fontSize: 28 }}>👑</Text>
              </View>
              <View style={styles.roleCardTextBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.roleCardTitle}>{t.barberRoleTitle}</Text>
                  {bookings.length > 0 && (
                    <View style={styles.notificationBadgeModern}>
                      <Text style={styles.notificationTextModern}>{bookings.length}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.roleCardSub}>{t.barberRoleSub}</Text>
              </View>
              <Text style={styles.arrowIcon}>➔</Text>
            </TouchableOpacity>

            <View style={styles.footerNote}>
              <Text style={styles.footerNoteText}>{t.footerText}</Text>
            </View>
          </View>
        </ScrollView>

        <Modal visible={isPinModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{t.pinTitle}</Text>
              <Text style={styles.modalSubtitle}>{t.pinSub}</Text>
              <TextInput 
                style={[styles.input, { textAlign: 'center', fontSize: 22, letterSpacing: 6 }]}
                placeholder="****"
                placeholderTextColor="#6BA4B8"
                keyboardType="numeric"
                secureTextEntry={true}
                maxLength={4}
                value={enteredPin}
                onChangeText={setEnteredPin}
              />
              <TouchableOpacity style={styles.confirmModalButton} onPress={handleBarberLogin}>
                <Text style={styles.confirmModalButtonText}>{t.loginBtn}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelModalButton} onPress={() => { setIsPinModalVisible(false); setEnteredPin(''); }}>
                <Text style={styles.cancelModalButtonText}>{t.cancelBtn}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  // 2. واجهة الزبون
  if (role === 'client') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredWrapper}>
          <View style={styles.headerRow}>
            <View style={styles.headerBrand}>
              <Text style={styles.headerTitle}>{t.welcomeTitle}</Text>
              <Text style={styles.headerSub}>{t.welcomeSub}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={[styles.langSwitchBtnSmall, { marginRight: 8 }]} onPress={toggleLanguage}>
                <Text style={styles.langSwitchTextSmall}>{lang === 'ar' ? 'FR' : 'AR'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButtonWrapper} onPress={() => setRole(null)}>
                <Text style={styles.switchText}>{t.backBtn}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isBarberWorking && (
            <View style={styles.nextSlotCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.nextSlotTag}>{t.quickNextSlot}</Text>
                <Text style={styles.nextSlotTime}>{nextSlot ? nextSlot : t.noSlots}</Text>
              </View>
              {nextSlot && (
                <TouchableOpacity style={styles.quickBookBtn} onPress={() => setSelectedTime(nextSlot)}>
                  <Text style={styles.quickBookBtnText}>{t.selectThisSlot}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {turnNotification && (
            <View style={styles.turnAlertCard}>
              <Text style={styles.turnAlertTitle}>🔔 {turnNotification}</Text>
              <TouchableOpacity style={styles.dismissTurnBtn} onPress={() => setTurnNotification(null)}>
                <Text style={styles.dismissTurnBtnText}>OK</Text>
              </TouchableOpacity>
            </View>
          )}

          {emergencyNotification && (
            <View style={styles.emergencyAlertCard}>
              <Text style={styles.emergencyAlertTitle}>⚠️ {emergencyNotification}</Text>
              <TouchableOpacity style={styles.dismissEmergencyBtn} onPress={() => setEmergencyNotification(null)}>
                <Text style={styles.dismissEmergencyBtnText}>OK</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={callBarber}>
              <Text style={styles.actionBtnText}>{t.callBarber}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={openLocation}>
              <Text style={styles.actionBtnText}>{t.location}</Text>
            </TouchableOpacity>
          </View>

          {activeClientBooking && (
            <View style={styles.activeBookingCard}>
              <Text style={styles.activeBookingTitle}>{t.currentBookingTitle}</Text>
              <Text style={styles.activeBookingText}>{t.timeLabel} {activeClientBooking.time}</Text>
              <Text style={styles.activeBookingText}>{t.serviceLabel} {activeClientBooking.service}</Text>
              <TouchableOpacity style={styles.cancelBookingBtn} onPress={handleCancelClientBooking}>
                <Text style={styles.cancelBookingBtnText}>{t.cancelBookingBtn}</Text>
              </TouchableOpacity>
            </View>
          )}

          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>{t.step1Service}</Text>
            {services.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.serviceCard, selectedService === item.id && styles.selectedServiceCard]}
                onPress={() => setSelectedService(item.id)}
              >
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{item.name}</Text>
                  <Text style={styles.serviceDescription}>{item.description}</Text>
                  <Text style={styles.servicePrice}>{item.priceText}</Text>
                </View>
                <Text style={[styles.selectIndicator, selectedService === item.id && styles.selectedIndicator]}>
                  {selectedService === item.id ? t.selectedBtn : t.selectBtn}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
              {t.step2Time} ({workStartTime} - {workEndTime}):
            </Text>
            <View style={styles.timeGrid}>
              {availableSlots.map((time) => {
                const booked = isTimeBooked(time);
                const selected = selectedTime === time;

                return (
                  <TouchableOpacity
                    key={time}
                    disabled={booked || !isBarberWorking}
                    style={[
                      styles.timeSlot,
                      selected && styles.selectedTimeSlot,
                      (booked || !isBarberWorking) && styles.bookedTimeSlot
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[
                      styles.timeText,
                      selected && styles.selectedTimeText,
                      (booked || !isBarberWorking) && styles.bookedTimeText
                    ]}>
                      {!isBarberWorking ? t.closedSlotText : (booked ? t.bookedSlotText : time)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity 
              style={[styles.mainButton, (!isBarberWorking || activeClientBooking) && styles.disabledButton]} 
              onPress={handleBookingStart}
              disabled={!isBarberWorking || !!activeClientBooking}
            >
              <Text style={styles.mainButtonText}>
                {activeClientBooking ? t.alreadyBookedBtn : (isBarberWorking ? t.confirmBookingBtn : t.salonClosedBtn)}
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <Modal visible={isModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>{t.bookingInfoTitle}</Text>
                <Text style={styles.modalSubtitle}>{t.bookingInfoSub}</Text>

                <TextInput 
                  style={[styles.input, { textAlign: lang === 'ar' ? 'right' : 'left' }]}
                  placeholder={t.fullNamePlaceholder}
                  placeholderTextColor="#6BA4B8"
                  value={clientName}
                  onChangeText={setClientName}
                />

                <TextInput 
                  style={[styles.input, { textAlign: lang === 'ar' ? 'right' : 'left' }]}
                  placeholder={t.phonePlaceholder}
                  placeholderTextColor="#6BA4B8"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={clientPhone}
                  onChangeText={setClientPhone}
                />

                <TouchableOpacity style={styles.confirmModalButton} onPress={handleFinalConfirm}>
                  <Text style={styles.confirmModalButtonText}>{t.finalConfirmBtn}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelModalButton} onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.cancelModalButtonText}>{t.cancelBtn}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }

  // 3. لوحة تحكم الحلاق
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredWrapper}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{t.dashboardTitle}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={[styles.langSwitchBtnSmall, { marginRight: 8 }]} onPress={toggleLanguage}>
              <Text style={styles.langSwitchTextSmall}>{lang === 'ar' ? 'FR' : 'AR'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButtonWrapper} onPress={() => setRole(null)}>
              <Text style={styles.switchText}>{t.exitBtn}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* إشعار فوري للحلاق عند حجز زبون جديد */}
        {newBookingAlert && (
          <View style={styles.newBookingBanner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.newBookingBannerTitle}>{t.newBookingNoticeTitle}</Text>
              <Text style={styles.newBookingBannerText}>👤 {newBookingAlert.name} | ⏰ {newBookingAlert.time}</Text>
              <Text style={styles.newBookingBannerText}>📞 {newBookingAlert.phone}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity 
                style={styles.callNowBtn}
                onPress={() => callClient(newBookingAlert.phone)}
              >
                <Text style={styles.callNowBtnText}>{t.callClientNowBtn}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.dismissBannerBtn}
                onPress={() => setNewBookingAlert(null)}
              >
                <Text style={styles.dismissBannerBtnText}>✕ إغلاق</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* إشعار فوري للحلاق عند إلغاء الزبون لحجزه */}
        {cancellationAlert && (
          <View style={styles.cancellationBanner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cancellationBannerTitle}>{t.cancellationAlertTitle}</Text>
              <Text style={styles.cancellationBannerText}>👤 {cancellationAlert.name} | ⏰ {cancellationAlert.time}</Text>
              <Text style={styles.cancellationBannerText}>✂️ {cancellationAlert.service}</Text>
            </View>
            <TouchableOpacity 
              style={styles.dismissBannerBtn}
              onPress={() => setCancellationAlert(null)}
            >
              <Text style={styles.dismissBannerBtnText}>✕ إغلاق</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* شريط الإحصائيات السريعة للخدمات والمدخول */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>{t.todayEarnings}</Text>
          <Text style={styles.statsValue}>{totalEarnings} DA</Text>
          <View style={styles.quickStatsRow}>
            <Text style={styles.quickStatItem}>✂️ Standard: {serviceStats[t.stdService] || 0}</Text>
            <Text style={styles.quickStatItem}>👑 V.I.P: {serviceStats[t.vipService] || 0}</Text>
            <Text style={styles.quickStatItem}>🎉 Event: {serviceStats[t.eventService] || 0}</Text>
          </View>
        </View>

        <View style={styles.statusControlBox}>
          <TouchableOpacity 
            style={[styles.statusToggleBtn, isBarberWorking ? styles.btnOpen : styles.btnClosed]}
            onPress={() => setIsBarberWorking(!isBarberWorking)}
          >
            <Text style={styles.statusToggleBtnText}>
              {isBarberWorking ? t.salonOpenState : t.salonClosedState}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reportBtn} onPress={() => setIsReportModalVisible(true)}>
            <Text style={styles.reportBtnText}>{t.dailyReportBtn}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emergencyBtn} onPress={handleEmergencyStop}>
            <Text style={styles.emergencyBtnText}>{t.emergencyStopBtn}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.scheduleBtn} onPress={() => setIsScheduleModalVisible(true)}>
            <Text style={styles.scheduleBtnText}>{t.workHoursBtn} ({workStartTime} ➔ {workEndTime})</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.manualBlockBtn} onPress={() => setIsManualModalVisible(true)}>
            <Text style={styles.manualBlockBtnText}>{t.manualBlockBtn}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.changePinBtn} onPress={() => setIsChangePinModalVisible(true)}>
            <Text style={styles.changePinBtnText}>{t.changePinBtn}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {bookings.length === 0 ? (
            <View style={styles.dashboardBox}>
              <Text style={styles.dashboardText}>{t.noBookings}</Text>
            </View>
          ) : (
            bookings.map((b) => (
              <View 
                key={b.id} 
                style={[
                  styles.bookingCard, 
                  b.isManual && styles.manualBookingCard,
                  b.isVipFastTrack && styles.vipBookingCard
                ]}
              >
                <View style={styles.bookingHeader}>
                  <Text style={styles.bookingClientName}>
                    {b.isVipFastTrack ? '⚡ VIP: ' : (b.isManual ? '🔒 ' : '👤 ')} {b.name}
                  </Text>
                  <Text style={styles.bookingTimeBadge}>⏰ {b.time}</Text>
                </View>

                {!b.isManual && (
                  <TouchableOpacity onPress={() => callClient(b.phone)}>
                    <Text style={styles.bookingDetailCall}>📞 {b.phone} (اضغط للاتصال)</Text>
                  </TouchableOpacity>
                )}

                <Text style={styles.bookingDetail}>{t.serviceLabel} {b.service} ({b.priceText})</Text>

                {!b.isManual && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, flexWrap: 'wrap' }}>
                    <TouchableOpacity 
                      style={[styles.notifyClientBtn, { flex: 1, marginRight: 4, marginBottom: 4 }]}
                      onPress={() => handleSendTurnNotification(b)}
                    >
                      <Text style={styles.notifyClientBtnText}>{t.notifyClientBtn}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.quickMsgActionBtn, { flex: 1, marginRight: 4, marginBottom: 4 }]}
                      onPress={() => { setQuickMsgClient(b); setIsQuickMsgModalVisible(true); }}
                    >
                      <Text style={styles.quickMsgActionBtnText}>{t.quickMsgBtn}</Text>
                    </TouchableOpacity>

                    {!b.isVipFastTrack && (
                      <TouchableOpacity 
                        style={[styles.vipFastTrackBtn, { marginBottom: 4 }]}
                        onPress={() => handlePromoteToVip(b.id)}
                      >
                        <Text style={styles.vipFastTrackBtnText}>{t.promoteVipBtn}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                <TouchableOpacity 
                  style={styles.doneButton}
                  onPress={() => {
                    if (!b.isManual) {
                      setTotalEarnings(prev => prev + b.price);
                      setCompletedCount(prev => prev + 1);
                      setServiceStats(prev => ({
                        ...prev,
                        [b.service]: (prev[b.service] || 0) + 1
                      }));
                    }
                    setBookings(bookings.filter(item => item.id !== b.id));
                  }}
                >
                  <Text style={styles.doneButtonText}>{t.doneBookingBtn}</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        {/* مودال الرسائل السريعة */}
        <Modal visible={isQuickMsgModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{t.quickMsgTitle}</Text>
              <Text style={styles.modalSubtitle}>{quickMsgClient ? quickMsgClient.name : ''}</Text>

              <TouchableOpacity style={styles.msgOptionBtn} onPress={() => handleSendQuickMessage(t.msgDelay)}>
                <Text style={styles.msgOptionText}>{t.msgDelay}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.msgOptionBtn} onPress={() => handleSendQuickMessage(t.msgCome)}>
                <Text style={styles.msgOptionText}>{t.msgCome}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.msgOptionBtn} onPress={() => handleSendQuickMessage(t.msgDone)}>
                <Text style={styles.msgOptionText}>{t.msgDone}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.cancelModalButton, { marginTop: 15 }]} onPress={() => { setIsQuickMsgModalVisible(false); setQuickMsgClient(null); }}>
                <Text style={styles.cancelModalButtonText}>{t.cancelBtn}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={isReportModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{t.dailyReportTitle}</Text>
              <Text style={styles.modalSubtitle}>{t.dailyReportSub}</Text>

              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>{t.totalEarningsLabel}</Text>
                <Text style={styles.reportValue}>{totalEarnings} DA</Text>
              </View>
              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>{t.completedClientsLabel}</Text>
                <Text style={styles.reportValue}>{completedCount}</Text>
              </View>
              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>{t.remainingBookingsLabel}</Text>
                <Text style={styles.reportValue}>{bookings.filter(b => !b.isManual).length}</Text>
              </View>
              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>{t.topServiceLabel}</Text>
                <Text style={[styles.reportValue, { fontSize: 13 }]}>{getMostRequestedService()}</Text>
              </View>

              <TouchableOpacity style={[styles.confirmModalButton, { marginTop: 15 }]} onPress={() => setIsReportModalVisible(false)}>
                <Text style={styles.confirmModalButtonText}>{t.closeReportBtn}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={isChangePinModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{t.changePinBtn}</Text>
              <TextInput 
                style={[styles.input, { textAlign: 'center' }]}
                placeholder={t.oldPinPlaceholder}
                placeholderTextColor="#6BA4B8"
                keyboardType="numeric"
                secureTextEntry={true}
                maxLength={4}
                value={oldPinInput}
                onChangeText={setOldPinInput}
              />
              <TextInput 
                style={[styles.input, { textAlign: 'center' }]}
                placeholder={t.newPinPlaceholder}
                placeholderTextColor="#6BA4B8"
                keyboardType="numeric"
                secureTextEntry={true}
                maxLength={4}
                value={newPinInput}
                onChangeText={setNewPinInput}
              />
              <TouchableOpacity style={styles.confirmModalButton} onPress={handleChangePin}>
                <Text style={styles.confirmModalButtonText}>{t.changePinConfirmBtn}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelModalButton} onPress={() => { setIsChangePinModalVisible(false); setOldPinInput(''); setNewPinInput(''); }}>
                <Text style={styles.cancelModalButtonText}>{t.cancelBtn}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={isScheduleModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{t.workScheduleTitle}</Text>
              <Text style={styles.modalSubtitle}>{t.workScheduleSub}</Text>

              <Text style={styles.labelTitle}>{t.startTimeLabel}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: 'row' }}>
                  {allTimeSlots.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[styles.miniTimeSlot, workStartTime === time && styles.selectedTimeSlot]}
                      onPress={() => setWorkStartTime(time)}
                    >
                      <Text style={[styles.miniTimeText, workStartTime === time && styles.selectedTimeText]}>{time}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <Text style={styles.labelTitle}>{t.endTimeLabel}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                  {allTimeSlots.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[styles.miniTimeSlot, workEndTime === time && styles.selectedTimeSlot]}
                      onPress={() => setWorkEndTime(time)}
                    >
                      <Text style={[styles.miniTimeText, workEndTime === time && styles.selectedTimeText]}>{time}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <TouchableOpacity style={styles.confirmModalButton} onPress={() => setIsScheduleModalVisible(false)}>
                <Text style={styles.confirmModalButtonText}>{t.applyScheduleBtn}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={isManualModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{t.manualBlockTitle}</Text>
              <Text style={styles.modalSubtitle}>{t.manualBlockSub}</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                  {allTimeSlots.map((time) => {
                    const booked = isTimeBooked(time);
                    return (
                      <TouchableOpacity
                        key={time}
                        disabled={booked}
                        style={[
                          styles.miniTimeSlot,
                          manualTime === time && styles.selectedTimeSlot,
                          booked && styles.bookedTimeSlot
                        ]}
                        onPress={() => setManualTime(time)}
                      >
                        <Text style={[styles.miniTimeText, manualTime === time && styles.selectedTimeText]}>{time}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>

              <TextInput 
                style={[styles.input, { textAlign: lang === 'ar' ? 'right' : 'left' }]}
                placeholder={t.manualNotePlaceholder}
                placeholderTextColor="#6BA4B8"
                value={manualNote}
                onChangeText={setManualNote}
              />

              <TouchableOpacity style={styles.confirmModalButton} onPress={handleAddManualBlock}>
                <Text style={styles.confirmModalButtonText}>{t.manualBlockConfirmBtn}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelModalButton} onPress={() => { setIsManualModalVisible(false); setManualTime(null); }}>
                <Text style={styles.cancelModalButtonText}>{t.cancelBtn}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1118', paddingHorizontal: 16 },
  langSwitchBtn: { backgroundColor: '#1E2C3A', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#2A7A88', marginBottom: 15, alignSelf: 'center' },
  langSwitchText: { color: '#6BA4B8', fontWeight: 'bold', fontSize: 13 },
  langSwitchBtnSmall: { backgroundColor: '#1E2C3A', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: '#2A7A88' },
  langSwitchTextSmall: { color: '#6BA4B8', fontWeight: 'bold', fontSize: 11 },

  welcomeScroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 },
  welcomeWrapper: { width: '100%', maxWidth: 400, alignItems: 'center' },
  heroCard: { width: '100%', backgroundColor: '#141D26', borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#21303E', marginBottom: 25 },
  logoBadgeModern: { width: 86, height: 86, borderRadius: 43, backgroundColor: '#1B2735', borderWidth: 2, borderColor: '#2A7A88', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  logoIconModern: { fontSize: 44 },
  brandTitle: { fontSize: 24, fontWeight: '900', color: '#2A7A88', letterSpacing: 1 },
  brandTagline: { fontSize: 11, fontWeight: '700', color: '#6BA4B8', letterSpacing: 2, marginBottom: 16 },
  statusBadgeModern: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  statusOpenModern: { backgroundColor: 'rgba(46, 204, 113, 0.12)', borderWidth: 1, borderColor: '#2ECC71' },
  statusClosedModern: { backgroundColor: 'rgba(231, 76, 60, 0.12)', borderWidth: 1, borderColor: '#E74C3C' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  statusBadgeTextModern: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },

  selectRoleTitle: { color: '#8CA0B3', fontSize: 14, fontWeight: '700', alignSelf: 'flex-start', marginBottom: 14 },
  roleCardClient: { width: '100%', backgroundColor: '#141D26', borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#2A7A88', marginBottom: 14 },
  roleCardBarber: { width: '100%', backgroundColor: '#141D26', borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#21303E', marginBottom: 20 },
  roleCardIconBox: { width: 52, height: 52, borderRadius: 14, backgroundColor: 'rgba(42, 122, 136, 0.15)', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  roleCardTextBox: { flex: 1 },
  roleCardTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginBottom: 3 },
  roleCardSub: { color: '#6BA4B8', fontSize: 12 },
  arrowIcon: { color: '#6BA4B8', fontSize: 18, fontWeight: 'bold' },
  notificationBadgeModern: { backgroundColor: '#E74C3C', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 1, marginLeft: 8 },
  notificationTextModern: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 11 },

  footerNote: { marginTop: 10 },
  footerNoteText: { color: '#4A5B6C', fontSize: 12, textAlign: 'center' },

  centeredWrapper: { width: '100%', maxWidth: 400, justifyContent: 'center', flex: 1, paddingTop: 35 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 10 },
  logoutButtonWrapper: { backgroundColor: '#1E2C3A', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#FF5C5C' },
  headerBrand: { flexDirection: 'column' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#2A7A88' },
  headerSub: { fontSize: 11, color: '#6BA4B8' },
  switchText: { color: '#FF5C5C', fontSize: 13, fontWeight: 'bold' },

  newBookingBanner: { backgroundColor: '#1C2B1E', borderColor: '#2ECC71', borderWidth: 1.5, borderRadius: 12, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  newBookingBannerTitle: { color: '#2ECC71', fontWeight: 'bold', fontSize: 13, marginBottom: 2 },
  newBookingBannerText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  
  cancellationBanner: { backgroundColor: '#2C1E1E', borderColor: '#E74C3C', borderWidth: 1.5, borderRadius: 12, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cancellationBannerTitle: { color: '#FF5C5C', fontWeight: 'bold', fontSize: 13, marginBottom: 2 },
  cancellationBannerText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },

  callNowBtn: { backgroundColor: '#2ECC71', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, marginBottom: 4 },
  callNowBtnText: { color: '#0B1118', fontWeight: 'bold', fontSize: 11 },
  dismissBannerBtn: { paddingVertical: 2, paddingHorizontal: 6 },
  dismissBannerBtnText: { color: '#8CA0B3', fontSize: 10, fontWeight: 'bold' },

  nextSlotCard: { backgroundColor: '#142533', padding: 12, borderRadius: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#2A7A88' },
  nextSlotTag: { color: '#6BA4B8', fontSize: 11, fontWeight: 'bold' },
  nextSlotTime: { color: '#2ECC71', fontSize: 15, fontWeight: 'bold', marginTop: 2 },
  quickBookBtn: { backgroundColor: '#2A7A88', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  quickBookBtnText: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },

  turnAlertCard: { backgroundColor: 'rgba(241, 196, 15, 0.2)', borderWidth: 1, borderColor: '#F1C40F', padding: 12, borderRadius: 12, marginBottom: 12 },
  turnAlertTitle: { color: '#F1C40F', fontWeight: 'bold', fontSize: 12 },
  dismissTurnBtn: { backgroundColor: '#F1C40F', paddingVertical: 4, borderRadius: 6, marginTop: 6, alignItems: 'center' },
  dismissTurnBtnText: { color: '#0F171E', fontWeight: 'bold', fontSize: 11 },
  emergencyAlertCard: { backgroundColor: 'rgba(231, 76, 60, 0.2)', borderWidth: 1, borderColor: '#E74C3C', padding: 12, borderRadius: 12, marginBottom: 12 },
  emergencyAlertTitle: { color: '#FF5C5C', fontWeight: 'bold', fontSize: 12 },
  dismissEmergencyBtn: { backgroundColor: '#E74C3C', paddingVertical: 4, borderRadius: 6, marginTop: 6, alignItems: 'center' },
  dismissEmergencyBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 11 },
  quickActionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  actionBtn: { width: '48%', backgroundColor: '#141D26', paddingVertical: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#21303E' },
  actionBtnText: { color: '#6BA4B8', fontWeight: 'bold', fontSize: 12 },
  activeBookingCard: { backgroundColor: '#1A2F3D', padding: 12, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#6BA4B8' },
  activeBookingTitle: { color: '#6BA4B8', fontWeight: 'bold', fontSize: 13, marginBottom: 4 },
  activeBookingText: { color: '#FFFFFF', fontSize: 12, marginBottom: 2 },
  cancelBookingBtn: { backgroundColor: 'rgba(231, 76, 60, 0.2)', borderWidth: 1, borderColor: '#E74C3C', paddingVertical: 6, borderRadius: 6, marginTop: 8, alignItems: 'center' },
  cancelBookingBtnText: { color: '#E74C3C', fontWeight: 'bold', fontSize: 12 },
  sectionTitle: { color: '#6BA4B8', fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  scrollContainer: { paddingBottom: 20 },
  serviceCard: { backgroundColor: '#141D26', padding: 14, borderRadius: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#21303E' },
  selectedServiceCard: { borderColor: '#6BA4B8', backgroundColor: '#1A2F3D' },
  serviceInfo: { flex: 1, paddingRight: 10 },
  serviceName: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', marginBottom: 3 },
  serviceDescription: { color: '#8CA0B3', fontSize: 12, marginBottom: 4 },
  servicePrice: { color: '#6BA4B8', fontSize: 14, fontWeight: 'bold' },
  selectIndicator: { color: '#62788D', fontSize: 13 },
  selectedIndicator: { color: '#6BA4B8', fontWeight: 'bold' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 15 },
  timeSlot: { width: '23%', backgroundColor: '#141D26', paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#21303E' },
  miniTimeSlot: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#141D26', borderRadius: 8, marginRight: 8, borderWidth: 1, borderColor: '#21303E' },
  miniTimeText: { color: '#8CA0B3', fontSize: 12, fontWeight: 'bold' },
  selectedTimeSlot: { backgroundColor: '#2A7A88', borderColor: '#6BA4B8' },
  bookedTimeSlot: { backgroundColor: '#2C1E21', borderColor: '#E74C3C', opacity: 0.6 },
  timeText: { color: '#8CA0B3', fontSize: 12, fontWeight: 'bold' },
  selectedTimeText: { color: '#FFFFFF' },
  bookedTimeText: { color: '#E74C3C', fontSize: 10 },
  mainButton: { backgroundColor: '#2A7A88', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  disabledButton: { backgroundColor: '#4A5568' },
  mainButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  statsCard: { backgroundColor: '#1A2F3D', padding: 15, borderRadius: 12, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#2A7A88' },
  statsTitle: { color: '#6BA4B8', fontSize: 13, fontWeight: 'bold' },
  statsValue: { color: '#2ECC71', fontSize: 22, fontWeight: 'bold', marginTop: 2, marginBottom: 6 },
  quickStatsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', borderTopWidth: 1, borderTopColor: '#243B4D', paddingTop: 8 },
  quickStatItem: { color: '#8CA0B3', fontSize: 11, fontWeight: 'bold' },

  statusControlBox: { width: '100%', marginBottom: 12 },
  statusToggleBtn: { width: '100%', paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginBottom: 8 },

  reportBtn: { width: '100%', backgroundColor: '#1B2735', borderWidth: 1, borderColor: '#9B59B6', paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginBottom: 8 },
  reportBtnText: { color: '#9B59B6', fontWeight: 'bold', fontSize: 12 },
  reportRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#21303E' },
  reportLabel: { color: '#8CA0B3', fontSize: 13 },
  reportValue: { color: '#2ECC71', fontWeight: 'bold', fontSize: 14 },

  emergencyBtn: { width: '100%', backgroundColor: 'rgba(231, 76, 60, 0.2)', borderWidth: 1, borderColor: '#E74C3C', paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginBottom: 8 },
  emergencyBtnText: { color: '#FF5C5C', fontWeight: 'bold', fontSize: 12 },
  scheduleBtn: { width: '100%', backgroundColor: '#141D26', borderWidth: 1, borderColor: '#2A7A88', paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginBottom: 8 },
  scheduleBtnText: { color: '#2A7A88', fontWeight: 'bold', fontSize: 12 },
  manualBlockBtn: { width: '100%', backgroundColor: '#141D26', borderWidth: 1, borderColor: '#6BA4B8', paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginBottom: 8 },
  manualBlockBtnText: { color: '#6BA4B8', fontWeight: 'bold', fontSize: 12 },
  changePinBtn: { width: '100%', backgroundColor: '#141D26', borderWidth: 1, borderColor: '#E67E22', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  changePinBtnText: { color: '#E67E22', fontWeight: 'bold', fontSize: 12 },
  btnOpen: { backgroundColor: '#2ECC71' },
  btnClosed: { backgroundColor: '#E74C3C' },
  statusToggleBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 },
  bookingCard: { backgroundColor: '#141D26', padding: 15, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#21303E' },
  manualBookingCard: { borderColor: '#E74C3C', backgroundColor: '#251D21' },

  vipBookingCard: { borderColor: '#F1C40F', backgroundColor: '#2A2415', borderWidth: 1.5 },
  vipFastTrackBtn: { backgroundColor: 'rgba(241, 196, 15, 0.2)', borderWidth: 1, borderColor: '#F1C40F', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, alignItems: 'center' },
  vipFastTrackBtnText: { color: '#F1C40F', fontWeight: 'bold', fontSize: 11 },

  bookingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  bookingClientName: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  bookingTimeBadge: { color: '#2A7A88', fontWeight: 'bold', fontSize: 13, backgroundColor: '#1B2735', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  bookingDetail: { color: '#8CA0B3', fontSize: 12, marginBottom: 4 },
  bookingDetailCall: { color: '#2ECC71', fontSize: 12, marginBottom: 6, fontWeight: 'bold' },
  notifyClientBtn: { backgroundColor: 'rgba(241, 196, 15, 0.15)', borderWidth: 1, borderColor: '#F1C40F', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  notifyClientBtnText: { color: '#F1C40F', fontWeight: 'bold', fontSize: 11 },

  quickMsgActionBtn: { backgroundColor: 'rgba(42, 122, 136, 0.15)', borderWidth: 1, borderColor: '#6BA4B8', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  quickMsgActionBtnText: { color: '#6BA4B8', fontWeight: 'bold', fontSize: 11 },
  msgOptionBtn: { width: '100%', backgroundColor: '#1B2735', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: '#2A7A88' },
  msgOptionText: { color: '#FFFFFF', fontSize: 13, fontWeight: 'bold', textAlign: 'center' },

  doneButton: { backgroundColor: '#1B2735', borderColor: '#2ECC71', borderWidth: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  doneButtonText: { color: '#2ECC71', fontSize: 12, fontWeight: 'bold' },
  dashboardBox: { backgroundColor: '#141D26', padding: 20, borderRadius: 12, marginVertical: 20, width: '100%' },
  dashboardText: { color: '#8CA0B3', textAlign: 'center', fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalCard: { width: '100%', maxWidth: 350, backgroundColor: '#141D26', borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#2A7A88' },
  modalTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold', marginBottom: 6 },
  modalSubtitle: { color: '#8CA0B3', fontSize: 12, marginBottom: 15, textAlign: 'center' },
  labelTitle: { color: '#6BA4B8', fontSize: 12, fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 6 },
  input: { width: '100%', backgroundColor: '#0B1118', borderWidth: 1, borderColor: '#21303E', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 12, color: '#FFFFFF', fontSize: 14, marginBottom: 12 },
  confirmModalButton: { width: '100%', backgroundColor: '#2A7A88', paddingVertical: 13, borderRadius: 10, alignItems: 'center', marginTop: 5 },
  confirmModalButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  cancelModalButton: { marginTop: 10, paddingVertical: 8 },
  cancelModalButtonText: { color: '#FF5C5C', fontSize: 13, fontWeight: '600' },
});