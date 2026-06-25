export const FALLBACK_PROPERTY_IMAGE =
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80';

export function getPropertyImage(images?: string[], index = 0) {
  return images?.[index] || FALLBACK_PROPERTY_IMAGE;
}
