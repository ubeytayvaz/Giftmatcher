export type LanguageCode = 'en' | 'tr' | 'de' | 'fr' | 'es';

export interface Translation {
  title: string;
  subtitle: string;
  yearTag: string;
  inputDesc: string;
  placeholderName: string;
  placeholderPhone: string;
  addButton: string;
  phoneNote: string;
  emptyList: string;
  raffleButton: string;
  matchesReady: string;
  matchesDesc: string;
  resetButton: string;
  giverLabel: string;
  receiverLabel: string;
  luckyPerson: string;
  clickToReveal: string;
  whatsappButton: string;
  whatsappMessage: (giver: string, receiver: string) => string;
  alertMinParticipants: string;
}

export const translations: Record<LanguageCode, Translation> = {
  en: {
    title: "Secret Santa",
    subtitle: "🎅 Everyone gets a gift! Pick your card, find your match.",
    yearTag: "🎄 2025 Special",
    inputDesc: "Add names and (optional) phone numbers to the list.",
    placeholderName: "Name (e.g. John)",
    placeholderPhone: "Phone (555...)",
    addButton: "Add",
    phoneNote: "*If you add a phone number, you can send results via WhatsApp.",
    emptyList: "The list is empty",
    raffleButton: "Draw & Match 🎰",
    matchesReady: "Matches Ready!",
    matchesDesc: "Everyone should click the card with their name.",
    resetButton: "Start Over ↺",
    giverLabel: "Gift Giver",
    receiverLabel: "Matched With",
    luckyPerson: "Lucky Person",
    clickToReveal: "Click to Reveal",
    whatsappButton: "WhatsApp",
    whatsappMessage: (giver, receiver) => `🎄 *Secret Santa 2025* 🎅\n\nHello ${giver}! 👋\n\nYou are buying a gift for: *${receiver}* 🎁\n\nHappy Holidays! ✨`,
    alertMinParticipants: "At least 2 participants are required!",
  },
  tr: {
    title: "Yılbaşı Çekilişi",
    subtitle: "🎅 Herkes birbirine hediye alıyor! Kartını seç, şanslı kişiyi öğren.",
    yearTag: "🎄 2025 Özel",
    inputDesc: "Çekilişe katılacak isimleri ve (isteğe bağlı) telefon numaralarını ekleyin.",
    placeholderName: "İsim (Örn: Ahmet)",
    placeholderPhone: "Tel No (555...)",
    addButton: "Ekle",
    phoneNote: "*Telefon numarası girerseniz, sonuçları WhatsApp üzerinden gönderebilirsiniz.",
    emptyList: "İsim listesi boş",
    raffleButton: "Kura Çek & Eşleştir 🎰",
    matchesReady: "Eşleşmeler Hazır!",
    matchesDesc: "Herkes kendi isminin yazdığı karta tıklasın.",
    resetButton: "Yeniden Başla ↺",
    giverLabel: "Hediye Alacak Kişi",
    receiverLabel: "Kime Çıktı?",
    luckyPerson: "Şanslı Kişi",
    clickToReveal: "Tıkla",
    whatsappButton: "WhatsApp",
    whatsappMessage: (giver, receiver) => `🎄 *Yılbaşı Çekilişi 2025* 🎅\n\nMerhaba ${giver}! 👋\n\nSana çıkan kişi: *${receiver}* 🎁\n\nMutlu Yıllar! ✨`,
    alertMinParticipants: "Çekiliş için en az 2 kişi gerekli!",
  },
  de: {
    title: "Wichteln",
    subtitle: "🎅 Jeder bekommt ein Geschenk! Wähle deine Karte.",
    yearTag: "🎄 2025 Spezial",
    inputDesc: "Fügen Sie Namen und (optional) Telefonnummern hinzu.",
    placeholderName: "Name (z.B. Hans)",
    placeholderPhone: "Telefon",
    addButton: "Hinzufügen",
    phoneNote: "*Mit Telefonnummer können Ergebnisse per WhatsApp gesendet werden.",
    emptyList: "Die Liste ist leer",
    raffleButton: "Auslosen 🎰",
    matchesReady: "Fertig!",
    matchesDesc: "Jeder klickt auf die Karte mit seinem Namen.",
    resetButton: "Neustart ↺",
    giverLabel: "Schenker",
    receiverLabel: "Beschenkter",
    luckyPerson: "Glückspilz",
    clickToReveal: "Klicken",
    whatsappButton: "WhatsApp",
    whatsappMessage: (giver, receiver) => `🎄 *Wichteln 2025* 🎅\n\nHallo ${giver}! 👋\n\nDu beschenkst: *${receiver}* 🎁\n\nFrohe Feiertage! ✨`,
    alertMinParticipants: "Mindestens 2 Teilnehmer erforderlich!",
  },
  fr: {
    title: "Père Noël Secret",
    subtitle: "🎅 Échange de cadeaux ! Choisissez votre carte.",
    yearTag: "🎄 Spécial 2025",
    inputDesc: "Ajoutez des noms et (facultatif) des numéros de téléphone.",
    placeholderName: "Nom (ex. Marie)",
    placeholderPhone: "Tél",
    addButton: "Ajouter",
    phoneNote: "*Avec un numéro, envoyez les résultats par WhatsApp.",
    emptyList: "La liste est vide",
    raffleButton: "Tirer au sort 🎰",
    matchesReady: "C'est prêt !",
    matchesDesc: "Cliquez sur la carte avec votre nom.",
    resetButton: "Recommencer ↺",
    giverLabel: "Donneur",
    receiverLabel: "Destinataire",
    luckyPerson: "L'heureux élu",
    clickToReveal: "Voir",
    whatsappButton: "WhatsApp",
    whatsappMessage: (giver, receiver) => `🎄 *Père Noël Secret 2025* 🎅\n\nBonjour ${giver}! 👋\n\nTu offres un cadeau à : *${receiver}* 🎁\n\nJoyeuses Fêtes ! ✨`,
    alertMinParticipants: "Au moins 2 participants sont requis !",
  },
  es: {
    title: "Amigo Invisible",
    subtitle: "🎅 ¡Intercambio de regalos! Elige tu tarjeta.",
    yearTag: "🎄 Especial 2025",
    inputDesc: "Agrega nombres y (opcional) números de teléfono.",
    placeholderName: "Nombre (ej. Juan)",
    placeholderPhone: "Teléfono",
    addButton: "Añadir",
    phoneNote: "*Si añades teléfono, puedes enviar por WhatsApp.",
    emptyList: "La lista está vacía",
    raffleButton: "Sortear 🎰",
    matchesReady: "¡Listo!",
    matchesDesc: "Haz clic en la tarjeta con tu nombre.",
    resetButton: "Reiniciar ↺",
    giverLabel: "Regalador",
    receiverLabel: "Destinatario",
    luckyPerson: "Afortunado",
    clickToReveal: "Ver",
    whatsappButton: "WhatsApp",
    whatsappMessage: (giver, receiver) => `🎄 *Amigo Invisible 2025* 🎅\n\n¡Hola ${giver}! 👋\n\nTe toca regalar a: *${receiver}* 🎁\n\n¡Felices Fiestas! ✨`,
    alertMinParticipants: "¡Se requieren al menos 2 participantes!",
  }
};