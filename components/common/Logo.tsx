
import React from 'react';

type LogoProps = React.SVGProps<SVGSVGElement>;

export const Logo: React.FC<LogoProps> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'rgb(129, 140, 248)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'rgb(167, 139, 250)', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
      fill="url(#logoGradient)"
      fillOpacity="0.2"
      stroke="url(#logoGradient)"
      strokeWidth="4"
    />
    <path
      d="M30 35 L50 25 L70 35"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30 65 L50 75 L70 65"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
     <path
      d="M50 25 L50 75"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="5 10"
    />
  </svg>
);