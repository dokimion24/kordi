export function ChordQuiz3D({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* White cat with orange patches - holding trophy, celebrating */}

        {/* Body */}
        <ellipse cx="50" cy="58" rx="22" ry="20" fill="#FFF5EE" />
        <ellipse cx="50" cy="62" rx="14" ry="12" fill="#FFFFFF" />
        {/* Orange patch on body */}
        <ellipse cx="60" cy="54" rx="8" ry="6" fill="#FFD4A8" opacity="0.5" />

        {/* Head */}
        <circle cx="50" cy="34" r="20" fill="#FFF5EE" />
        {/* Orange patch on head */}
        <ellipse cx="42" cy="26" rx="8" ry="6" fill="#FFD4A8" opacity="0.5" />

        {/* Ears - rounder, floppy */}
        <ellipse cx="35" cy="18" rx="8" ry="10" transform="rotate(-20 35 18)" fill="#FFF5EE" />
        <ellipse cx="35" cy="18" rx="5" ry="6.5" transform="rotate(-20 35 18)" fill="#FFCACA" />
        <ellipse cx="65" cy="18" rx="8" ry="10" transform="rotate(20 65 18)" fill="#FFF5EE" />
        <ellipse cx="65" cy="18" rx="5" ry="6.5" transform="rotate(20 65 18)" fill="#FFCACA" />

        {/* Eyes - sparkling, excited */}
        <ellipse cx="43" cy="33" rx="5.5" ry="6" fill="#3D2C2C" />
        <ellipse cx="43" cy="34" rx="3.5" ry="4" fill="#6B4226" />
        <ellipse cx="45" cy="31" rx="2.5" ry="2.8" fill="#FFF" opacity="0.9" />
        <ellipse cx="46" cy="30" rx="1" ry="1" fill="#FFF" />
        <ellipse cx="41" cy="35.5" rx="1.2" ry="0.8" fill="#FFF" opacity="0.3" />

        <ellipse cx="57" cy="33" rx="5.5" ry="6" fill="#3D2C2C" />
        <ellipse cx="57" cy="34" rx="3.5" ry="4" fill="#6B4226" />
        <ellipse cx="59" cy="31" rx="2.5" ry="2.8" fill="#FFF" opacity="0.9" />
        <ellipse cx="60" cy="30" rx="1" ry="1" fill="#FFF" />
        <ellipse cx="55" cy="35.5" rx="1.2" ry="0.8" fill="#FFF" opacity="0.3" />

        {/* Nose */}
        <ellipse cx="50" cy="39" rx="2" ry="1.5" fill="#FFCACA" />

        {/* Big happy smile */}
        <path d="M44 41 Q50 48 56 41" stroke="#3D2C2C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M45 42 Q50 47 55 42" fill="#FF9B9B" opacity="0.2" />

        {/* Cheeks - very rosy */}
        <ellipse cx="36" cy="39" rx="5" ry="3.5" fill="#FFCACA40" />
        <ellipse cx="64" cy="39" rx="5" ry="3.5" fill="#FFCACA40" />

        {/* Whiskers */}
        <line x1="28" y1="37" x2="38" y2="38" stroke="#D8C8C0" strokeWidth="0.6" />
        <line x1="28" y1="41" x2="38" y2="41" stroke="#D8C8C0" strokeWidth="0.6" />
        <line x1="72" y1="37" x2="62" y2="38" stroke="#D8C8C0" strokeWidth="0.6" />
        <line x1="72" y1="41" x2="62" y2="41" stroke="#D8C8C0" strokeWidth="0.6" />

        {/* Trophy held up */}
        <g transform="translate(38, 68)">
          <path d="M8 0 C8 0 8 12 12 14 C16 12 16 0 16 0 Z" fill="#FFD54F" />
          <ellipse cx="12" cy="0" rx="4.5" ry="1.5" fill="#FFEB85" />
          <rect x="10" y="14" width="4" height="2.5" rx="0.8" fill="#FFC107" />
          <rect x="8.5" y="16.5" width="7" height="2" rx="0.8" fill="#FFC107" />
          <polygon points="12,3 13,5.5 15.5,5.5 13.5,7.5 14.2,10 12,8.2 9.8,10 10.5,7.5 8.5,5.5 11,5.5" fill="#FFF9C4" />
        </g>

        {/* Paws holding trophy up */}
        <ellipse cx="42" cy="72" rx="5" ry="3.5" fill="#FFF5EE" />
        <ellipse cx="58" cy="72" rx="5" ry="3.5" fill="#FFF5EE" />

        {/* Celebration stars */}
        <g opacity="0.6">
          <polygon points="80,10 81.2,13 84,13 81.8,15 82.5,18 80,16 77.5,18 78.2,15 76,13 78.8,13" fill="#FFD54F" />
        </g>
        <g opacity="0.4">
          <polygon points="20,8 21,10 23,10 21.5,11.5 22,13.5 20,12 18,13.5 18.5,11.5 17,10 19,10" fill="#FFD54F" />
        </g>
        <g opacity="0.3">
          <polygon points="82,28 82.8,30 84.5,30 83.2,31 83.6,33 82,31.8 80.4,33 80.8,31 79.5,30 81.2,30" fill="#FFD54F" />
        </g>
      </svg>
    </div>
  );
}
