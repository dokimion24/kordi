"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/utils";

interface KordiMascotProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  interactive?: boolean;
}

export function KordiMascot({ className, size = "md", interactive = false }: KordiMascotProps) {
  const [happy, setHappy] = useState(false);

  const sizeClass = {
    xs: "w-7",
    sm: "w-16",
    md: "w-28",
    lg: "w-44",
  }[size];

  const handleClick = () => {
    if (!interactive) return;
    setHappy(true);
    setTimeout(() => setHappy(false), 1500);
  };

  return (
    <div
      className={cn(
        sizeClass,
        interactive && "cursor-pointer select-none active:scale-90 transition-transform duration-150",
        happy && "animate-[wiggle_0.4s_ease-in-out]",
        className,
      )}
      onClick={handleClick}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="100" cy="192" rx="50" ry="6" fill="#00000010" />

        {/* Body - round cat shape */}
        <ellipse cx="100" cy="130" rx="52" ry="48" fill="#FFD4B8" />
        {/* Belly */}
        <ellipse cx="100" cy="138" rx="34" ry="30" fill="#FFF0E6" />

        {/* Head */}
        <circle cx="100" cy="75" r="45" fill="#FFD4B8" />

        {/* Left ear */}
        <ellipse cx="70" cy="38" rx="10" ry="16" transform="rotate(-15 70 38)" fill="#FFD4B8" />
        <ellipse cx="70" cy="38" rx="6" ry="10" transform="rotate(-15 70 38)" fill="#FFB0B0" />

        {/* Right ear */}
        <ellipse cx="130" cy="38" rx="10" ry="16" transform="rotate(15 130 38)" fill="#FFD4B8" />
        <ellipse cx="130" cy="38" rx="6" ry="10" transform="rotate(15 130 38)" fill="#FFB0B0" />

        {/* Eyes */}
        {happy ? (
          <>
            {/* Happy closed eyes */}
            <path d="M76 70 Q82 78 88 70" stroke="#3D2C2C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M112 70 Q118 78 124 70" stroke="#3D2C2C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            {/* Left eye */}
            <ellipse cx="82" cy="72" rx="10" ry="11" fill="#3D2C2C" />
            <ellipse cx="82" cy="74" rx="7" ry="7.5" fill="#5C4033" />
            <ellipse cx="85" cy="68" rx="4.5" ry="5" fill="#FFFFFF" opacity="0.9" />
            <ellipse cx="86.5" cy="66" rx="2" ry="2" fill="#FFFFFF" />
            <ellipse cx="79" cy="76" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.4" />
            {/* Right eye */}
            <ellipse cx="118" cy="72" rx="10" ry="11" fill="#3D2C2C" />
            <ellipse cx="118" cy="74" rx="7" ry="7.5" fill="#5C4033" />
            <ellipse cx="121" cy="68" rx="4.5" ry="5" fill="#FFFFFF" opacity="0.9" />
            <ellipse cx="122.5" cy="66" rx="2" ry="2" fill="#FFFFFF" />
            <ellipse cx="115" cy="76" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.4" />
          </>
        )}

        {/* Nose */}
        <ellipse cx="100" cy="82" rx="4" ry="3" fill="#FFB0B0" />

        {/* Mouth */}
        <path d="M96 85 Q100 90 104 85" stroke="#3D2C2C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Mouth line down from nose */}
        <line x1="100" y1="85" x2="100" y2="88" stroke="#3D2C2C" strokeWidth="1.5" strokeLinecap="round" />

        {/* Whiskers */}
        <line x1="55" y1="76" x2="74" y2="80" stroke="#D4A88C" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="55" y1="82" x2="74" y2="83" stroke="#D4A88C" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="55" y1="88" x2="74" y2="86" stroke="#D4A88C" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="145" y1="76" x2="126" y2="80" stroke="#D4A88C" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="145" y1="82" x2="126" y2="83" stroke="#D4A88C" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="145" y1="88" x2="126" y2="86" stroke="#D4A88C" strokeWidth="1.2" strokeLinecap="round" />

        {/* Cheeks */}
        <ellipse
          cx="68"
          cy="84"
          rx={happy ? 10 : 8}
          ry={happy ? 7 : 6}
          fill="#FFB0B050"
          className="transition-all duration-300"
        />
        <ellipse
          cx="132"
          cy="84"
          rx={happy ? 10 : 8}
          ry={happy ? 7 : 6}
          fill="#FFB0B050"
          className="transition-all duration-300"
        />

        {/* Piano keys in front of cat */}
        <rect x="58" y="155" width="84" height="28" rx="6" fill="#FFFFFF" stroke="#E0D5CC" strokeWidth="1" />
        {/* White keys */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={`w${i}`} x={61 + i * 11} y="158" width="9" height="22" rx="2" fill="#FFFFFF" stroke="#E8DDD5" strokeWidth="0.5" />
        ))}
        {/* Black keys */}
        {[0, 1, 3, 4, 5].map((i) => (
          <rect key={`b${i}`} x={68 + i * 11} y="158" width="6" height="13" rx="1.5" fill="#3D2C2C" />
        ))}

        {/* Paws on piano */}
        <ellipse cx="78" cy="156" rx="10" ry="7" fill="#FFD4B8" />
        <ellipse cx="122" cy="156" rx="10" ry="7" fill="#FFD4B8" />
        {/* Paw pads */}
        <circle cx="74" cy="158" r="2" fill="#FFB0B0" />
        <circle cx="78" cy="159" r="2" fill="#FFB0B0" />
        <circle cx="82" cy="158" r="2" fill="#FFB0B0" />
        <circle cx="118" cy="158" r="2" fill="#FFB0B0" />
        <circle cx="122" cy="159" r="2" fill="#FFB0B0" />
        <circle cx="126" cy="158" r="2" fill="#FFB0B0" />

        {/* Musical notes floating */}
        <g opacity="0.6">
          <circle cx="155" cy="40" r="3.5" fill="#FFB0B0" />
          <rect x="158.5" y="28" width="2" height="12" rx="1" fill="#FFB0B0" />
        </g>
        <g opacity="0.4">
          <circle cx="40" cy="35" r="2.5" fill="#B8D4FF" />
          <rect x="42.5" y="25" width="1.5" height="10" rx="0.75" fill="#B8D4FF" />
        </g>

        {/* Extra happy elements */}
        {happy && (
          <>
            <g opacity="0.7">
              <path d="M30 20 L32 14 L34 20 L28 17 L36 17 Z" fill="#FFD700" />
            </g>
            <g opacity="0.7">
              <path d="M168 25 L170 19 L172 25 L166 22 L174 22 Z" fill="#FFD700" />
            </g>
            <g opacity="0.5">
              <path d="M160 60 L161.5 55 L163 60 L158 57.5 L165 57.5 Z" fill="#FF8FAB" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
