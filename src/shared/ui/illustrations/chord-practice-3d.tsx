export function ChordPractice3D({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Gray cat - reading music sheet with glasses */}

        {/* Body */}
        <ellipse cx="50" cy="60" rx="22" ry="20" fill="#C8C8D4" />
        <ellipse cx="50" cy="64" rx="14" ry="12" fill="#E8E8F0" />

        {/* Head */}
        <circle cx="50" cy="36" r="20" fill="#C8C8D4" />

        {/* Ears - pointier but still rounded */}
        <ellipse cx="36" cy="20" rx="6" ry="12" transform="rotate(-15 36 20)" fill="#C8C8D4" />
        <ellipse cx="36" cy="20" rx="3.5" ry="7.5" transform="rotate(-15 36 20)" fill="#B0A0B8" />
        <ellipse cx="64" cy="20" rx="6" ry="12" transform="rotate(15 64 20)" fill="#C8C8D4" />
        <ellipse cx="64" cy="20" rx="3.5" ry="7.5" transform="rotate(15 64 20)" fill="#B0A0B8" />

        {/* Eyes - big, focused, curious */}
        <ellipse cx="43" cy="34" rx="5" ry="5.5" fill="#3D2C2C" />
        <ellipse cx="43" cy="35" rx="3.5" ry="3.8" fill="#4A6858" />
        <ellipse cx="44.5" cy="32.5" rx="2" ry="2.2" fill="#FFF" opacity="0.9" />
        <ellipse cx="45.5" cy="31.5" rx="0.8" ry="0.8" fill="#FFF" />
        <ellipse cx="41" cy="36.5" rx="1" ry="0.8" fill="#FFF" opacity="0.3" />

        <ellipse cx="57" cy="34" rx="5" ry="5.5" fill="#3D2C2C" />
        <ellipse cx="57" cy="35" rx="3.5" ry="3.8" fill="#4A6858" />
        <ellipse cx="58.5" cy="32.5" rx="2" ry="2.2" fill="#FFF" opacity="0.9" />
        <ellipse cx="59.5" cy="31.5" rx="0.8" ry="0.8" fill="#FFF" />
        <ellipse cx="55" cy="36.5" rx="1" ry="0.8" fill="#FFF" opacity="0.3" />

        {/* Tiny round glasses */}
        <circle cx="43" cy="34" r="7" stroke="#A09080" strokeWidth="0.8" fill="none" />
        <circle cx="57" cy="34" r="7" stroke="#A09080" strokeWidth="0.8" fill="none" />
        <line x1="50" y1="34" x2="50" y2="34" stroke="#A09080" strokeWidth="0.8" />
        <path d="M50 33.5 Q50 32.5 50 33.5" stroke="#A09080" strokeWidth="0.8" />

        {/* Nose */}
        <ellipse cx="50" cy="40" rx="2" ry="1.5" fill="#B0A0B8" />

        {/* Concentrated mouth - small */}
        <path d="M48 42 Q50 43.5 52 42" stroke="#3D2C2C" strokeWidth="0.8" strokeLinecap="round" fill="none" />

        {/* Cheeks */}
        <ellipse cx="37" cy="39" rx="4" ry="2.5" fill="#D4B8C830" />
        <ellipse cx="63" cy="39" rx="4" ry="2.5" fill="#D4B8C830" />

        {/* Whiskers */}
        <line x1="30" y1="37" x2="38" y2="39" stroke="#B0B0B8" strokeWidth="0.6" />
        <line x1="30" y1="41" x2="38" y2="41" stroke="#B0B0B8" strokeWidth="0.6" />
        <line x1="70" y1="37" x2="62" y2="39" stroke="#B0B0B8" strokeWidth="0.6" />
        <line x1="70" y1="41" x2="62" y2="41" stroke="#B0B0B8" strokeWidth="0.6" />

        {/* Open book/music sheet */}
        <g transform="translate(30, 74)">
          <rect x="0" y="0" width="40" height="18" rx="2" fill="#FFF" stroke="#D0C8D0" strokeWidth="0.6" />
          <line x1="20" y1="1" x2="20" y2="17" stroke="#E0D8E0" strokeWidth="0.4" />
          {/* Staff lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="2" y1={4 + i * 2.5} x2="18" y2={4 + i * 2.5} stroke="#D4C8D4" strokeWidth="0.3" />
          ))}
          {/* Notes on staff */}
          <circle cx="6" cy="7" r="1.2" fill="#9B85E0" />
          <circle cx="10" cy="10" r="1.2" fill="#9B85E0" />
          <circle cx="14" cy="6" r="1.2" fill="#9B85E0" />
        </g>

        {/* Paws holding book */}
        <ellipse cx="38" cy="76" rx="5" ry="3" fill="#C8C8D4" />
        <ellipse cx="62" cy="76" rx="5" ry="3" fill="#C8C8D4" />

        {/* Question mark - thinking */}
        <g opacity="0.4">
          <text x="76" y="18" fontSize="12" fill="#9B85E0" fontFamily="sans-serif" fontWeight="bold">?</text>
        </g>
      </svg>
    </div>
  );
}
