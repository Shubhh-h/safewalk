export const generateShareUrl = (lat, lng) => `https://www.google.com/maps?q=${lat},${lng}`;

export const formatPhoneForSMS = (phone) => {
  return phone.replace(/[^0-9+]/g, '');
};

export const generateSOSMessage = (contacts, locationUrl) => {
  return `EMERGENCY! I need help. My current location is: ${locationUrl}`;
};

export const triggerSOS = (contacts, position) => {
  const url = generateShareUrl(position.lat, position.lng);
  const msg = generateSOSMessage(contacts, url);
  
  if (contacts && contacts.length > 0) {
    const phone = formatPhoneForSMS(contacts[0].phone);
    window.open(`sms:${phone}?body=${encodeURIComponent(msg)}`);
  }
};
