export function Piano3D({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Orange tabby cat - playing piano happily */}

        {/* Body */}
        <ellipse cx="50" cy="58" rx="24" ry="22" fill="#FFD4B8" />
        <ellipse cx="50" cy="62" rx="16" ry="13" fill="#FFF0E6" />

        {/* Head - tilted slightly */}
        <circle cx="50" cy="34" r="20" fill="#FFD4B8" />

        {/* Ears - round, small */}
        <ellipse cx="36" cy="20" rx="7" ry="11" transform="rotate(-10 36 20)" fill="#FFD4B8" />
        <ellipse cx="36" cy="20" rx="4" ry="7" transform="rotate(-10 36 20)" fill="#FFB0B0" />
        <ellipse cx="64" cy="20" rx="7" ry="11" transform="rotate(10 64 20)" fill="#FFD4B8" />
        <ellipse cx="64" cy="20" rx="4" ry="7" transform="rotate(10 64 20)" fill="#FFB0B0" />

        {/* Eyes - happy squint, enjoying music */}
        <path d="M40 32 Q44 37 48 32" stroke="#3D2C2C" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M52 32 Q56 37 60 32" stroke="#3D2C2C" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Nose */}
        <ellipse cx="50" cy="38" rx="2" ry="1.5" fill="#FFB0B0" />

        {/* Happy open mouth */}
        <path d="M46 40 Q50 45 54 40" stroke="#3D2C2C" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M47 41 Q50 44 53 41" fill="#FF9B9B" opacity="0.3" />

        {/* Cheeks - extra rosy from happiness */}
        <ellipse cx="36" cy="38" rx="5" ry="3.5" fill="#FFB0B050" />
        <ellipse cx="64" cy="38" rx="5" ry="3.5" fill="#FFB0B050" />

        {/* Whiskers */}
        <line x1="28" y1="35" x2="38" y2="37" stroke="#E0B898" strokeWidth="0.7" />
        <line x1="28" y1="39" x2="38" y2="39" stroke="#E0B898" strokeWidth="0.7" />
        <line x1="72" y1="35" x2="62" y2="37" stroke="#E0B898" strokeWidth="0.7" />
        <line x1="72" y1="39" x2="62" y2="39" stroke="#E0B898" strokeWidth="0.7" />

        {/* Piano */}
        <rect x="26" y="74" width="48" height="16" rx="4" fill="#FFF" stroke="#E0D5CC" strokeWidth="0.8" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={`w${i}`} x={28 + i * 7.5} y="76" width="6.5" height="12" rx="1.5" fill="#FFF" stroke="#E8DDD5" strokeWidth="0.4" />
        ))}
        {[0, 1, 3, 4].map((i) => (
          <rect key={`b${i}`} x={33 + i * 7.5} y="76" width="4" height="7" rx="1" fill="#3D2C2C" />
        ))}

        {/* Paws pressing keys - action! */}
        <ellipse cx="38" cy="76" rx="5" ry="3.5" fill="#FFD4B8" />
        <ellipse cx="55" cy="76" rx="5" ry="3.5" fill="#FFD4B8" />

        {/* Music notes floating */}
        <g opacity="0.6">
          <circle cx="78" cy="12" r="2.5" fill="#A8D8A8" />
          <rect x="80.5" y="5" width="1.2" height="7" rx="0.6" fill="#A8D8A8" />
        </g>
        <g opacity="0.4">
          <circle cx="84" cy="22" r="2" fill="#A8D8A8" />
          <rect x="86" y="16" width="1" height="6" rx="0.5" fill="#A8D8A8" />
        </g>
      </svg>
    </div>
  );
}
