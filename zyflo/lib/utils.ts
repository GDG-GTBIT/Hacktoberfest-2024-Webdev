import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getCSSVariable(variableName: string): string {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }
  return '';
}


export function areColorsCompatible(
  bgH: number,
  bgS: number,
  bgL: number,
  fgH: number,
  fgS: number,
  fgL: number
): boolean {
  function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100;
    l /= 100;
    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, (h / 360 + 1 / 3) % 1);
      g = hue2rgb(p, q, h / 360);
      b = hue2rgb(p, q, (h / 360 - 1 / 3 + 1) % 1);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  function getLuminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  const bgRGB = hslToRgb(bgH, bgS, bgL);
  const fgRGB = hslToRgb(fgH, fgS, fgL);

  const bgLuminance = getLuminance(...bgRGB);
  const fgLuminance = getLuminance(...fgRGB);

  const contrastRatio = (Math.max(bgLuminance, fgLuminance) + 0.05) /
    (Math.min(bgLuminance, fgLuminance) + 0.05);

  return contrastRatio >= 4.5;
}

export function getAutoContrastClassName(comaptibleWithBlack: boolean, comaptibleWithWhite: boolean): "rgb(10,10,10)" | "rgb(245,245,245)" | "" {
  const defaultClassName = "";
  if (!comaptibleWithBlack && !comaptibleWithWhite) {
    return defaultClassName
  }
  if (comaptibleWithBlack) {
    return "rgb(10,10,10)"
  }
  if (comaptibleWithWhite) {
    return "rgb(245,245,245)"
  }
  if (comaptibleWithBlack && comaptibleWithWhite) {
    return "rgb(245,245,245)"
  }
  return defaultClassName
}

export const getURL = (path: string = '') => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
      process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
      process?.env?.NEXT_PUBLIC_VERCEL_URL &&
        process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
        'http://localhost:3000/';

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, '');
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, '');

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

export function getKeywords(category: string, componentName: string): string[] {
  const baseKeywords = [
    "Zyflo", "UI Library", "React", "Next.js", "Tailwind CSS", "UI Components",
    "Web Development", "Frontend", "Design System", "Responsive Design",
    "Accessibility", "Performance", "Customization", "Open Source"
  ]

  const categoryKeywords: { [key: string]: string[] } = {
    components: [
      "React Components", "UI Elements", "Reusable Components", "Component Library",
      "UI Kit", "User Interface", "Interactive Components", "Modular Design"
    ],
    "getting-started": [
      "Installation Guide", "Quick Start", "Setup", "Configuration", "Integration",
      "Usage Instructions", "First Steps", "Onboarding"
    ],
  }

  const componentKeywords: { [key: string]: string[] } = {
    navbar: [
      "Navigation Bar", "Header Component", "Menu", "Site Navigation", "Responsive Navbar",
      "Top Bar", "App Bar", "Navigation Menu"
    ],
    alert: [
      "Notification Component", "Warning Message", "Info Alert", "Error Alert",
      "Success Message", "Toast Notification", "Feedback Component"
    ],
    badge: [
      "Label Component", "Status Indicator", "Tag", "Chip", "Counter",
      "Notification Badge", "Visual Indicator"
    ],
  }

  return [
    ...baseKeywords,
    ...(categoryKeywords[category] || []),
    ...(componentKeywords[componentName] || []),
    `Zyflo ${componentName}`,
    `${componentName} component`,
    `${category} in Zyflo`,
    `Zyflo ${category}`,
  ]
}