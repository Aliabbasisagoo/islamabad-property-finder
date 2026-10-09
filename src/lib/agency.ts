// Single source of truth for all public business contact details.
export const agency = {
  name: "Ali Property Dealers",
  city: "Islamabad",
  years: 5,
  phone: "+92 317 582104",
  whatsapp: "92317582104",
  whatsappMessage: "Hello! I found your website and I'm interested in a property.",
  address: "Elysium Tower, Jinnah Avenue, Blue Area, Islamabad 44000",
  landmark: "Blue Area, G-8/3",
  maps: "https://www.google.com/maps/search/?api=1&query=Elysium%20Tower%2C%20Jinnah%20Avenue%2C%20Blue%20Area%2C%20Islamabad%2044000",
  hours: "10 AM – 5 PM",
  areas: ["DHA", "Bahria Town", "Gulberg", "F-6", "F-7", "F-8", "F-10", "F-11", "G-11", "G-13", "E-11"],
};

export const whatsappUrl = `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(agency.whatsappMessage)}`;

export const listingSummaries = [
  "10 Marla House — DHA Phase 5 — 4 beds — PKR 4.5 Crore",
  "5 Marla House — Bahria Town — 3 beds — PKR 2.1 Crore",
  "2 Bed Flat — Gulberg Greens — PKR 1.2 Crore",
  "1 Kanal Plot — DHA Phase 2 — PKR 8.5 Crore",
  "Commercial Shop 400 sq ft — F-11 Markaz — PKR 1.8 Crore",
  "3 Bed Apartment — F-10 — PKR 2.8 Crore",
];
