export type Property = {
  id: string;
  name: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  images: string[];
  amenities: string[];
  available: boolean;
  availableFrom?: string;
  features: {
    wifi: boolean;
    parking: boolean;
    heating: boolean;
    airConditioning: boolean;
    kitchen: boolean;
    balcony: boolean;
  };
};

export type Booking = {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
};

export type Review = {
  id: string;
  propertyId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};
