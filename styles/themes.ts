import type { Theme } from '../types';

export const THEMES: Theme[] = [
  {
    name: 'Classic Wood',
    light: '#f0d9b5', // A light, warm wood color
    dark: '#b58863',  // A rich, medium wood color
    lightText: '#b58863',
    darkText: '#f0d9b5',
  },
  {
    name: 'Graphite',
    light: '#bdbdbd', // A cool, light gray
    dark: '#424242',  // A deep, dark gray
    lightText: '#424242',
    darkText: '#bdbdbd',
  },
  {
    name: 'Sea Green',
    light: '#d1e1e1', // A very light, desaturated cyan
    dark: '#6a9b9b',  // A muted, medium-dark teal
    lightText: '#6a9b9b',
    darkText: '#d1e1e1',
  },
  {
    name: 'Icy Blue',
    light: '#e0e8f0', // A bright, very light blue
    dark: '#6082b6',  // A calm, slate blue
    lightText: '#6082b6',
    darkText: '#e0e8f0',
  },
  {
    name: 'Classic Marble',
    light: '#e8e8e8', // Light grey/off-white
    dark: '#5c6e7a',  // Dark slate grey
    lightText: '#5c6e7a',
    darkText: '#e8e8e8',
  },
  {
    name: 'Forest Green',
    light: '#e0eac6', // Light, pale green
    dark: '#556b2f',  // Dark olive green
    lightText: '#556b2f',
    darkText: '#e0eac6',
  },
  {
    name: 'Royal Purple',
    light: '#e6d8ff', // Light lavender
    dark: '#4b0082',  // Indigo/deep purple
    lightText: '#4b0082',
    darkText: '#e6d8ff',
  },
  {
    name: 'Crimson',
    light: '#f5c6cb', // Light pink/rose
    dark: '#8b0000',  // Dark red
    lightText: '#8b0000',
    darkText: '#f5c6cb',
  },
  {
    name: 'Ocean Deep',
    light: '#bde0fe', // Light sky blue
    dark: '#003060',  // Deep navy blue
    lightText: '#003060',
    darkText: '#bde0fe',
  },
  {
    name: 'Dark Walnut',
    light: '#d2b48c', // Tan
    dark: '#3a2d27',  // Very dark brown, like walnut wood
    lightText: '#3a2d27',
    darkText: '#d2b48c',
  },
];

export const DEFAULT_THEME = THEMES[0];
