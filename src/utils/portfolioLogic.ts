/**
 * Core utility functions for Huzaifa Hussain's Portfolio
 * Pure logic decoupled from UI for deterministic testing and ultra-mode verification.
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates the cyber contact form inputs
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Callsign / Name must be at least 2 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Valid digital comms email address is required';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject signal transmission must be at least 3 characters';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Transmission payload / message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates 3D photo shrink and tilt transform progress based on scroll position
 * @param scrollY Current vertical scroll offset
 * @param heroHeight Height of the hero section in pixels
 * @returns Normalized progress [0, 1] and calculated scale & tilt values
 */
export function calculateScrollShrink(scrollY: number, heroHeight: number) {
  const safeHeroHeight = Math.max(heroHeight, 400);
  // Start shrinking after 50px of scroll, fully settle by 0.95 * heroHeight
  const rawProgress = (scrollY - 50) / (safeHeroHeight * 0.85);
  const progress = Math.max(0, Math.min(1, rawProgress));

  // Scale down smoothly from 1.0 (large in hero) to 0.42 (card in about)
  const scale = Number((1.0 - progress * 0.58).toFixed(4));

  // 3D perspective rotation tilt
  const rotateX = Number((progress * 15).toFixed(2)); // degrees
  const rotateY = Number((Math.sin(progress * Math.PI) * 18).toFixed(2)); // smooth arc tilt
  const translateY = Number((progress * (safeHeroHeight * 0.82)).toFixed(2));
  const opacity = Number((1 - Math.max(0, (progress - 0.85) / 0.15)).toFixed(2));

  return {
    progress: Number(progress.toFixed(4)),
    scale,
    rotateX,
    rotateY,
    translateY,
    opacity,
    isSettled: progress >= 0.95,
  };
}

/**
 * Formats coordinates for cyber HUD display
 */
export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}° ${latDir}, ${Math.abs(lng).toFixed(2)}° ${lngDir}`;
}
