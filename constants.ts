import type { Theme, Layout } from './types';

export const DEFAULT_THEMES: Theme[] = [
  {
    id: 'indigo',
    name: 'Indigo Dusk',
    isAIGenerated: false,
    light: {
      primary: '#6366f1',
      secondary: '#a78bfa',
      background: '#f8fafc',
      card: '#ffffff',
      text: '#374151',
      heading: '#111827',
    },
    dark: {
      primary: '#818cf8',
      secondary: '#c4b5fd',
      background: '#111827',
      card: '#1f2937',
      text: '#d1d5db',
      heading: '#f9fafb',
    },
  },
  {
    id: 'teal',
    name: 'Ocean Teal',
    isAIGenerated: false,
    light: {
      primary: '#14b8a6',
      secondary: '#2dd4bf',
      background: '#f0fdfa',
      card: '#ffffff',
      text: '#374151',
      heading: '#0f172a',
    },
    dark: {
      primary: '#2dd4bf',
      secondary: '#5eead4',
      background: '#0f172a',
      card: '#1e293b',
      text: '#cbd5e1',
      heading: '#f1f5f9',
    },
  },
   {
    id: 'rose',
    name: 'Rose Gold',
    isAIGenerated: false,
    light: {
      primary: '#f43f5e',
      secondary: '#fb7185',
      background: '#fff1f2',
      card: '#ffffff',
      text: '#52525b',
      heading: '#18181b',
    },
    dark: {
      primary: '#fb7185',
      secondary: '#fda4af',
      background: '#270c0f',
      card: '#44191e',
      text: '#e2e8f0',
      heading: '#fafafa',
    },
  },
   {
    id: 'amber',
    name: 'Golden Hour',
    isAIGenerated: false,
    light: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      background: '#fffbeb',
      card: '#ffffff',
      text: '#4b5563',
      heading: '#1f2937',
    },
    dark: {
      primary: '#fbbf24',
      secondary: '#fcd34d',
      background: '#201602',
      card: '#3a2b05',
      text: '#d1d5db',
      heading: '#f9fafb',
    },
  },
];

export const LAYOUTS: Layout[] = [
    { id: 'classic', name: 'Classic' },
    { id: 'minimal-split', name: 'Minimal Split' },
    { id: 'gallery-grid', name: 'Gallery Grid' },
    { id: 'timeline', name: 'Timeline' },
    { id: 'centered-card', name: 'Centered Card' },
    { id: 'interactive-blocks', name: 'Interactive Blocks' },
    { id: 'booklet', name: 'Booklet Style' },
    { id: 'material-resume', name: 'Material Resume' },
    { id: 'retro', name: 'Retro Terminal' },
];

export const GOOGLE_FONTS = [
  'Inter', 'Roboto', 'Lato', 'Montserrat', 'Oswald', 'Source Sans Pro', 'Slabo 27px', 'Raleway', 'PT Sans', 'Merriweather',
  'Noto Sans', 'Open Sans', 'Playfair Display', 'Poppins', 'Roboto Condensed', 'Ubuntu', 'Work Sans', 'Fira Sans',
  'Nunito', 'Quicksand', 'Rubik', 'Space Mono', 'BioRhyme', 'Cabin', 'Cormorant Garamond', 'Crimson Text', 'DM Sans',
  'Dosis', 'Eczar', 'Exo 2', 'Gentium Book Basic', 'Heebo', 'IBM Plex Sans', 'Josefin Sans', 'Karla', 'Libre Baskerville',
  'Libre Franklin', 'Lora', 'Muli', 'Old Standard TT', 'Overpass', 'Oxygen', 'Pacifico', 'Permanent Marker', 'Philosopher',
  'Prompt', 'Quando', 'Questrial', 'Rajdhani', 'Righteous', 'Rokkitt', 'Sacramento', 'Satisfy', 'Signika', 'Spectral',
  'Teko', 'Titillium Web', 'Trirong', 'Varela Round', 'Vollkorn', 'Yanone Kaffeesatz', 'Zilla Slab', 'Alegreya',
  'Anton', 'Arimo', 'Asap', 'Barlow', 'Bitter', 'Cairo', 'Catamaran', 'Comfortaa', 'Didact Gothic', 'Domine', 'Fjalla One',
  'Francois One', 'Hind', 'Inconsolata', 'Istok Web', 'Kalam', 'Kanit', 'Kreon', 'Lobster', 'Manrope', 'Maven Pro', 'Mukta',
  'Orbitron', 'Patua One', 'Play', 'Russo One', 'Shadows Into Light', 'Source Code Pro', 'Tinos', 'Abel', 'Acme',
  'Archivo', 'Bebas Neue', 'Caveat', 'Chivo', 'Crete Round', 'Dancing Script', 'EB Garamond', 'Fira Mono', 'Indie Flower',
  'Josefin Slab', 'Jura', 'League Spartan'
];