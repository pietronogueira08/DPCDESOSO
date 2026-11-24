import type { MascotId } from "@/data/dpc-content";

export type MascotMood = "happy" | "cheering" | "thinking" | "love";

interface MascotProps {
  mood?: MascotMood;
  className?: string;
  decorative?: boolean;
}

function MascotMoodDecor({ mood }: { mood: MascotMood }) {
  if (mood === "cheering") {
    return (
      <g aria-hidden="true">
        <path
          d="M16 26 L18 20 L20 26 L26 28 L20 30 L18 36 L16 30 L10 28 Z"
          fill="#F59E0B"
        />
        <path
          d="M101 22 L102.5 18 L104 22 L108 23.5 L104 25 L102.5 29 L101 25 L97 23.5 Z"
          fill="#059669"
        />
        <circle cx="96" cy="37" r="2.2" fill="#DB2777" />
      </g>
    );
  }
  if (mood === "love") {
    return (
      <g aria-hidden="true">
        <path
          d="M99 24 C99 20 93 20 93 24 C93 28 99 32 99 32 C99 32 105 28 105 24 C105 20 99 20 99 24 Z"
          fill="#DB2777"
        />
        <path
          d="M18 30 C18 27.5 14 27.5 14 30 C14 32.5 18 35 18 35 C18 35 22 32.5 22 30 C22 27.5 18 27.5 18 30 Z"
          fill="#F472B6"
        />
      </g>
    );
  }
  if (mood === "thinking") {
    return (
      <g aria-hidden="true">
        <circle cx="98" cy="30" r="3" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
        <circle cx="105" cy="21" r="4.5" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
      </g>
    );
  }
  return null;
}

function MascotFace({ mood, noseY = 67 }: { mood: MascotMood; noseY?: number }) {
  return (
    <g aria-hidden="true">
      {/* Rosy cheeks */}
      <ellipse cx="40" cy={noseY + 3} rx="6" ry="3.5" fill="#FBCFE8" />
      <ellipse cx="80" cy={noseY + 3} rx="6" ry="3.5" fill="#FBCFE8" />

      {/* Eyes */}
      {mood === "cheering" || mood === "love" ? (
        <>
          <path
            d={`M41 ${noseY - 6} Q45 ${noseY - 12} 49 ${noseY - 6}`}
            fill="none"
            stroke="#2D2A32"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d={`M71 ${noseY - 6} Q75 ${noseY - 12} 79 ${noseY - 6}`}
            fill="none"
            stroke="#2D2A32"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </>
      ) : mood === "thinking" ? (
        <>
          <circle cx="45" cy={noseY - 7} r="3.4" fill="#2D2A32" />
          <circle cx="46" cy={noseY - 8.2} r="1.2" fill="#FFFFFF" />
          <path
            d={`M71 ${noseY - 7} L79 ${noseY - 8.5}`}
            stroke="#2D2A32"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle cx="45" cy={noseY - 7} r="3.8" fill="#2D2A32" />
          <circle cx="46.2" cy={noseY - 8.4} r="1.3" fill="#FFFFFF" />
          <circle cx="75" cy={noseY - 7} r="3.8" fill="#2D2A32" />
          <circle cx="76.2" cy={noseY - 8.4} r="1.3" fill="#FFFFFF" />
        </>
      )}

      {/* Mouth */}
      {mood === "cheering" ? (
        <path
          d={`M54 ${noseY + 3} Q60 ${noseY + 11} 66 ${noseY + 3} Z`}
          fill="#DB2777"
          stroke="#2D2A32"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      ) : mood === "thinking" ? (
        <path
          d={`M56 ${noseY + 6} Q60 ${noseY + 3.5} 64 ${noseY + 6}`}
          fill="none"
          stroke="#2D2A32"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d={`M54 ${noseY + 3} Q57 ${noseY + 7} 60 ${noseY + 3} Q63 ${noseY + 7} 66 ${noseY + 3}`}
          fill="none"
          stroke="#2D2A32"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

export function BunnyDoctor({
  mood = "happy",
  className = "h-20 w-20",
  decorative = false,
}: MascotProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Dr. Coelhinho, mascote médico da DPC"}
      aria-hidden={decorative ? true : undefined}
    >
      {/* Background pastel aura */}
      <circle cx="60" cy="64" r="48" fill="#D1FAE5" opacity="0.55" />

      {/* Bunny ears */}
      <ellipse cx="44" cy="28" rx="9" ry="22" transform="rotate(-10 44 28)" fill="#FFFFFF" stroke="#2D2A32" strokeWidth="2.4" />
      <ellipse cx="44" cy="29" rx="4.5" ry="14" transform="rotate(-10 44 29)" fill="#FCE7F3" />
      <ellipse cx="76" cy="28" rx="9" ry="22" transform="rotate(10 76 28)" fill="#FFFFFF" stroke="#2D2A32" strokeWidth="2.4" />
      <ellipse cx="76" cy="29" rx="4.5" ry="14" transform="rotate(10 76 29)" fill="#FCE7F3" />

      {/* Lab coat body */}
      <path
        d="M32 108 C32 86 44 80 60 80 C76 80 88 86 88 108 Z"
        fill="#FFFFFF"
        stroke="#2D2A32"
        strokeWidth="2.4"
      />
      {/* Mint scrub shirt collar */}
      <path d="M51 82 L60 95 L69 82 Z" fill="#059669" />
      {/* Stethoscope */}
      <path
        d="M45 83 C45 96 52 100 60 100 C68 100 75 96 75 83"
        fill="none"
        stroke="#047857"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="60" cy="102" r="4.5" fill="#D1FAE5" stroke="#047857" strokeWidth="2" />

      {/* Head */}
      <ellipse cx="60" cy="61" rx="28" ry="24" fill="#FFFFFF" stroke="#2D2A32" strokeWidth="2.4" />
      {/* Cute nose */}
      <ellipse cx="60" cy="65" rx="3.2" ry="2.2" fill="#DB2777" />
      <MascotFace mood={mood} noseY={66} />
      <MascotMoodDecor mood={mood} />
    </svg>
  );
}

export function BearNurse({
  mood = "happy",
  className = "h-20 w-20",
  decorative = false,
}: MascotProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Dra. Ursinha, mascote acolhedora da DPC"}
      aria-hidden={decorative ? true : undefined}
    >
      <circle cx="60" cy="64" r="48" fill="#FCE7F3" opacity="0.65" />

      {/* Round ears */}
      <circle cx="36" cy="39" r="10" fill="#FDE6C4" stroke="#2D2A32" strokeWidth="2.4" />
      <circle cx="36" cy="39" r="5" fill="#FBCFE8" />
      <circle cx="84" cy="39" r="10" fill="#FDE6C4" stroke="#2D2A32" strokeWidth="2.4" />
      <circle cx="84" cy="39" r="5" fill="#FBCFE8" />

      {/* Lab coat & pink uniform */}
      <path
        d="M32 108 C32 86 44 80 60 80 C76 80 88 86 88 108 Z"
        fill="#FFFFFF"
        stroke="#2D2A32"
        strokeWidth="2.4"
      />
      <path d="M52 82 L60 94 L68 82 Z" fill="#FCE7F3" />
      {/* Heart pocket badge */}
      <path
        d="M73 95 C73 92.5 69 92.5 69 95 C69 97.5 73 100 73 100 C73 100 77 97.5 77 95 C77 92.5 73 92.5 73 95 Z"
        fill="#DB2777"
      />

      {/* Head */}
      <ellipse cx="60" cy="61" rx="28" ry="24" fill="#FDE6C4" stroke="#2D2A32" strokeWidth="2.4" />
      {/* Muzzle */}
      <ellipse cx="60" cy="67" rx="10" ry="7.5" fill="#FFFDF9" />
      <ellipse cx="60" cy="64.5" rx="3.4" ry="2.4" fill="#2D2A32" />

      {/* Nurse cap with mint cross */}
      <path
        d="M46 37 L50 25 L70 25 L74 37 Z"
        fill="#FFFFFF"
        stroke="#2D2A32"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M60 28 V34 M57 31 H63" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />

      <MascotFace mood={mood} noseY={66} />
      <MascotMoodDecor mood={mood} />
    </svg>
  );
}

export function CatResearcher({
  mood = "happy",
  className = "h-20 w-20",
  decorative = false,
}: MascotProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Gatinho Pesquisador, mascote cientista da DPC"}
      aria-hidden={decorative ? true : undefined}
    >
      <circle cx="60" cy="64" r="48" fill="#EDE9FE" opacity="0.65" />

      {/* Kitty ears */}
      <path d="M34 52 L32 26 L52 40 Z" fill="#F5F3FF" stroke="#2D2A32" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M36 47 L35 32 L47 41 Z" fill="#FBCFE8" />
      <path d="M86 52 L88 26 L68 40 Z" fill="#F5F3FF" stroke="#2D2A32" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M84 47 L85 32 L73 41 Z" fill="#FBCFE8" />

      {/* Lab coat */}
      <path
        d="M32 108 C32 86 44 80 60 80 C76 80 88 86 88 108 Z"
        fill="#FFFFFF"
        stroke="#2D2A32"
        strokeWidth="2.4"
      />
      <path d="M51 82 L60 95 L69 82 Z" fill="#7C3AED" />
      <rect x="42" y="92" width="11" height="10" rx="2" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.6" />

      {/* Head */}
      <ellipse cx="60" cy="61" rx="28" ry="23" fill="#F5F3FF" stroke="#2D2A32" strokeWidth="2.4" />
      {/* Whiskers */}
      <path
        d="M27 63 L37 64 M26 69 L37 68 M83 64 L93 63 M83 68 L94 69"
        stroke="#5C5566"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <polygon points="57,64 63,64 60,67.5" fill="#DB2777" />

      <MascotFace mood={mood} noseY={66} />

      {/* Cute round researcher glasses */}
      <circle cx="45" cy="59" r="8.5" fill="none" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="75" cy="59" r="8.5" fill="none" stroke="#7C3AED" strokeWidth="2" />
      <path d="M53.5 59 H66.5" stroke="#7C3AED" strokeWidth="2" />

      <MascotMoodDecor mood={mood} />
    </svg>
  );
}

export function PuppyIntern({
  mood = "happy",
  className = "h-20 w-20",
  decorative = false,
}: MascotProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Cachorrinho Interno, mascote parceiro de estudo da DPC"}
      aria-hidden={decorative ? true : undefined}
    >
      <circle cx="60" cy="64" r="48" fill="#FDF7EE" stroke="#F3ECE4" strokeWidth="2" />

      {/* Floppy puppy ears */}
      <ellipse cx="30" cy="60" rx="9" ry="18" transform="rotate(14 30 60)" fill="#E7C8A6" stroke="#2D2A32" strokeWidth="2.4" />
      <ellipse cx="90" cy="60" rx="9" ry="18" transform="rotate(-14 90 60)" fill="#E7C8A6" stroke="#2D2A32" strokeWidth="2.4" />

      {/* Lab coat */}
      <path
        d="M32 108 C32 86 44 80 60 80 C76 80 88 86 88 108 Z"
        fill="#FFFFFF"
        stroke="#2D2A32"
        strokeWidth="2.4"
      />
      <path d="M51 82 L60 95 L69 82 Z" fill="#059669" />
      {/* Mini stethoscope */}
      <path
        d="M46 84 C46 95 53 99 60 99 C67 99 74 95 74 84"
        fill="none"
        stroke="#059669"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Head */}
      <ellipse cx="60" cy="60" rx="27" ry="23" fill="#FFF1DC" stroke="#2D2A32" strokeWidth="2.4" />
      {/* Cute spot over one eye */}
      <ellipse cx="45" cy="57" rx="9" ry="8" fill="#E7C8A6" opacity="0.6" />
      <ellipse cx="60" cy="65" rx="3.8" ry="2.6" fill="#2D2A32" />

      <MascotFace mood={mood} noseY={66} />
      <MascotMoodDecor mood={mood} />
    </svg>
  );
}

export function MascotAvatar({
  mascot,
  mood = "happy",
  className = "h-16 w-16",
  decorative = false,
}: {
  mascot: MascotId;
  mood?: MascotMood;
  className?: string;
  decorative?: boolean;
}) {
  switch (mascot) {
    case "bunny":
      return <BunnyDoctor mood={mood} className={className} decorative={decorative} />;
    case "bear":
      return <BearNurse mood={mood} className={className} decorative={decorative} />;
    case "cat":
      return <CatResearcher mood={mood} className={className} decorative={decorative} />;
    case "puppy":
      return <PuppyIntern mood={mood} className={className} decorative={decorative} />;
  }
}
