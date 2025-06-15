import React from 'react';

interface AmenityIconProps {
  amenity: string;
  className?: string;
}

const getAmenityIcon = (amenity: string) => {
  const normalizedAmenity = amenity.toLowerCase().trim();
  
  // WiFi / İnternet
  if (normalizedAmenity.includes('wifi') || normalizedAmenity.includes('internet') || normalizedAmenity.includes('wi-fi')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    );
  }
  
  // Havuz / Pool
  if (normalizedAmenity.includes('havuz') || normalizedAmenity.includes('pool') || normalizedAmenity.includes('yüzme')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36C4.73 20.63 4.11 21 3 21v2c1.11 0 1.73-.37 2.18-.64.37-.22.6-.36 1.15-.36.56 0 .78.13 1.15.36.46.27 1.08.64 2.18.64s1.73-.37 2.18-.64c.37-.22.6-.36 1.15-.36.56 0 .78.13 1.15.36.46.27 1.08.64 2.18.64s1.73-.37 2.18-.64c.37-.22.6-.36 1.15-.36.56 0 .78.13 1.15.36.46.27 1.08.64 2.18.64v-2zm0-7c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36C4.73 13.63 4.11 14 3 14v2c1.11 0 1.73-.37 2.18-.64.37-.22.6-.36 1.15-.36.56 0 .78.13 1.15.36.46.27 1.08.64 2.18.64s1.73-.37 2.18-.64c.37-.22.6-.36 1.15-.36.56 0 .78.13 1.15.36.46.27 1.08.64 2.18.64s1.73-.37 2.18-.64c.37-.22.6-.36 1.15-.36.56 0 .78.13 1.15.36.46.27 1.08.64 2.18.64v-2zM12 5.5c1.11 0 2.11.39 2.78 1.06L16.06 5.28C14.78 4.14 13.41 3.5 12 3.5s-2.78.64-4.06 1.78L9.22 6.56C9.89 5.89 10.89 5.5 12 5.5z"/>
      </svg>
    );
  }
  
  // Klima / Air Conditioning
  if (normalizedAmenity.includes('klima') || normalizedAmenity.includes('air') || normalizedAmenity.includes('conditioning') || normalizedAmenity.includes('ac')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M14,8V16H12V10H10V8H14Z"/>
      </svg>
    );
  }
  
  // Barbekü / BBQ / Mangal
  if (normalizedAmenity.includes('barbekü') || normalizedAmenity.includes('bbq') || normalizedAmenity.includes('mangal') || normalizedAmenity.includes('grill')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.5 5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S10.83 7 10 7s-1.5-.67-1.5-1.5zm5 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S15.83 7 15 7s-1.5-.67-1.5-1.5zm-2.5 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S13.33 7 12.5 7s-1.5-.67-1.5-1.5zM22 8.5H2c0 .96.78 1.74 1.74 1.74H3.5l.74 9.01c.11 1.32 1.23 2.25 2.55 2.25h10.42c1.32 0 2.44-.93 2.55-2.25L20.5 10.24h-.24c.96 0 1.74-.78 1.74-1.74zm-2.9 1.74l-.69 8.26c-.05.66-.61 1.15-1.28 1.15H6.87c-.67 0-1.23-.49-1.28-1.15l-.69-8.26h14.2z"/>
      </svg>
    );
  }
  
  // Otopark / Parking
  if (normalizedAmenity.includes('otopark') || normalizedAmenity.includes('parking') || normalizedAmenity.includes('garaj') || normalizedAmenity.includes('garage')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6,10V8h6c2,0 4,1 4,3s-2,3 -4,3h-6v2H4V8h2m2,0v6h4c3,0 6,-2 6,-3s-3,-3 -6,-3H8z"/>
      </svg>
    );
  }
  
  // Mutfak / Kitchen
  if (normalizedAmenity.includes('mutfak') || normalizedAmenity.includes('kitchen') || normalizedAmenity.includes('buzdolabı') || normalizedAmenity.includes('fridge')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M6.5,17.5H9.5V14.5H6.5V17.5M6.5,13H9.5V10H6.5V13Z"/>
      </svg>
    );
  }
  
  // TV / Television
  if (normalizedAmenity.includes('tv') || normalizedAmenity.includes('television') || normalizedAmenity.includes('televizyon')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21,3H3C1.89,3 1,3.89 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5C23,3.89 22.1,3 21,3M21,17H3V5H21V17Z"/>
      </svg>
    );
  }
  
  // Çamaşır Makinesi / Washing Machine
  if (normalizedAmenity.includes('çamaşır') || normalizedAmenity.includes('washing') || normalizedAmenity.includes('machine') || normalizedAmenity.includes('laundry')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18,2.01L6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2.01M18,20H6V4H18V20M8,6A1,1 0 0,1 9,7A1,1 0 0,1 8,8A1,1 0 0,1 7,7A1,1 0 0,1 8,6M11,6A1,1 0 0,1 12,7A1,1 0 0,1 11,8A1,1 0 0,1 10,7A1,1 0 0,1 11,6M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z"/>
      </svg>
    );
  }
  
  // Balkon / Terrace / Balcony
  if (normalizedAmenity.includes('balkon') || normalizedAmenity.includes('terrace') || normalizedAmenity.includes('balcony') || normalizedAmenity.includes('teras')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2M6.5,12.5L5.91,14.26L4,14.5L5.91,14.74L6.5,16.5L7.09,14.74L9,14.5L7.09,14.26L6.5,12.5M17.5,12.5L16.91,14.26L15,14.5L16.91,14.74L17.5,16.5L18.09,14.74L20,14.5L18.09,14.26L17.5,12.5Z"/>
      </svg>
    );
  }
  
  // Güvenlik / Security
  if (normalizedAmenity.includes('güvenlik') || normalizedAmenity.includes('security') || normalizedAmenity.includes('alarm')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.7C16,17.4 15.4,18 14.7,18H9.2C8.6,18 8,17.4 8,16.8V12.8C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
      </svg>
    );
  }
  
  // Deniz Manzarası / Sea View
  if (normalizedAmenity.includes('deniz') || normalizedAmenity.includes('sea') || normalizedAmenity.includes('view') || normalizedAmenity.includes('manzara')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12C6,13.5 6.5,14.87 7.36,16H8.64C7.87,14.87 7.5,13.5 7.5,12A4.5,4.5 0 0,1 12,7.5A4.5,4.5 0 0,1 16.5,12C16.5,13.5 16.13,14.87 15.36,16H16.64C17.5,14.87 18,13.5 18,12A6,6 0 0,0 12,6Z"/>
      </svg>
    );
  }
  
  // Banyo / Bathroom
  if (normalizedAmenity.includes('banyo') || normalizedAmenity.includes('bathroom') || normalizedAmenity.includes('duş') || normalizedAmenity.includes('shower')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9,2V4H8V6H16V4H15V2H17V4H19V6H20V8H19V20H5V8H4V6H5V4H7V2H9M7,8V18H17V8H7Z"/>
      </svg>
    );
  }
  
  // Yatak Odası / Bedroom
  if (normalizedAmenity.includes('yatak') || normalizedAmenity.includes('bedroom') || normalizedAmenity.includes('oda') || normalizedAmenity.includes('room')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19,7H5V14H3V5H1V20H3V16H21V20H23V11A4,4 0 0,0 19,7M21,14H5V9H19A2,2 0 0,1 21,11V14Z"/>
      </svg>
    );
  }
  
  // Jakuzi / Jacuzzi / Hot Tub
  if (normalizedAmenity.includes('jakuzi') || normalizedAmenity.includes('jacuzzi') || normalizedAmenity.includes('hot tub') || normalizedAmenity.includes('spa')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1L13.5,2.5L16.17,5.17L10.5,10.84L11.91,12.25L15.17,9H20V9H21M7.91,10.25L6.5,11.66L4.5,9.66L10.5,3.66L9.08,2.25L1.5,9.83L2.91,11.25L7.91,10.25Z"/>
      </svg>
    );
  }
  
  // Mikrodalga / Microwave
  if (normalizedAmenity.includes('mikrodalga') || normalizedAmenity.includes('microwave') || normalizedAmenity.includes('fırın') || normalizedAmenity.includes('oven')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3,4V20A1,1 0 0,0 4,21H20A1,1 0 0,0 21,20V4A1,1 0 0,0 20,3H4A1,1 0 0,0 3,4M5,5H19V19H5V5M7,7V17H15V7H7M17,7V9H19V7H17M17,11V13H19V11H17Z"/>
      </svg>
    );
  }
  
  // Çocuk Havuzu / Kids Pool
  if (normalizedAmenity.includes('çocuk') || normalizedAmenity.includes('kids') || normalizedAmenity.includes('children')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,7H13.5A1,1 0 0,1 14.5,8V10.5H16.5L15.5,15L14,13V18A1,1 0 0,1 13,19H11A1,1 0 0,1 10,18V13L8.5,15L7.5,10.5H9.5V8A1,1 0 0,1 10.5,7Z"/>
      </svg>
    );
  }
  
  // Bulaşık Makinesi / Dishwasher
  if (normalizedAmenity.includes('bulaşık') || normalizedAmenity.includes('dishwasher')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5,2V4H3V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4H19V2H17V4H7V2H5M5,6H19V20H5V6M7,8V18H17V8H7M9,10H15V16H9V10Z"/>
      </svg>
    );
  }
  
  // Elektrik / Electricity / Generator
  if (normalizedAmenity.includes('elektrik') || normalizedAmenity.includes('electricity') || normalizedAmenity.includes('generator') || normalizedAmenity.includes('jeneratör')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11,21H13V18.1C14.8,17.8 16.4,17 17.7,15.8L15.8,14.4C14.9,15.2 13.8,15.7 12.6,15.9L11,17.5V21M13,3H11V6.9C9.2,7.2 7.6,8 6.3,9.2L8.2,10.6C9.1,9.8 10.2,9.3 11.4,9.1L13,7.5V3M15.1,4.9L13.7,6.3C15,6.7 16.1,7.4 17,8.4L19,6.4C17.6,5 15.9,4.1 15.1,4.9M8.9,19.1L10.3,17.7C9,17.3 7.9,16.6 7,15.6L5,17.6C6.4,19 8.1,19.9 8.9,19.1M6.4,5L5,6.4C5.5,6.9 6.1,7.4 6.8,7.8L8.2,6.4C7.6,6 7,5.5 6.4,5M17.6,19L19,17.6C18.5,17.1 17.9,16.6 17.2,16.2L15.8,17.6C16.4,18 17,18.5 17.6,19Z"/>
      </svg>
    );
  }
  
  // Default icon for unknown amenities
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
    </svg>
  );
};

export default function AmenityIcon({ amenity, className = "text-[#24b6b6]" }: AmenityIconProps) {
  return (
    <div className={`flex-shrink-0 ${className}`}>
      {getAmenityIcon(amenity)}
    </div>
  );
}