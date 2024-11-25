import React from 'react';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto", inverted = false }) => {
  const mainColor = inverted ? "#FFFFFF" : "#000000";
  const accentColor = "#0052CC"; // Bleu SOFTNET

  return (
    <svg 
      viewBox="0 0 1200 300" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* Network nodes and lines */}
        <path 
          d="M50,150 C150,50 250,250 350,150 C450,50 550,250 650,150" 
          stroke={accentColor} 
          strokeWidth="2"
          fill="none"
        />
        <circle cx="50" cy="150" r="5" fill={accentColor} />
        <circle cx="200" cy="100" r="5" fill={accentColor} />
        <circle cx="350" cy="150" r="5" fill={accentColor} />
        <circle cx="500" cy="100" r="5" fill={accentColor} />
        <circle cx="650" cy="150" r="5" fill={accentColor} />

        {/* Text */}
        <text x="100" y="200" fill={mainColor} fontSize="120" fontWeight="bold" fontFamily="Arial">
          Soft
        </text>
        <text x="450" y="200" fill={accentColor} fontSize="120" fontWeight="bold" fontFamily="Arial">
          Net
        </text>
        
        {/* Groupe text */}
        <rect x="800" y="160" width="300" height="60" rx="30" fill={accentColor} />
        <text x="850" y="205" fill="white" fontSize="40" fontFamily="Arial">
          GROUPE
        </text>
      </g>
    </svg>
  );
};

export default Logo;