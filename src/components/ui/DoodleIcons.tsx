import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

/** Cute hand-drawn heart stamp */
export function DoodleHeart({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 20.4C12 20.4 4 14.9 4 9.2C4 6.2 6.3 4 9.1 4C10.8 4 12 5 12 6.2C12 5 13.2 4 14.9 4C17.7 4 20 6.2 20 9.2C20 14.9 12 20.4 12 20.4Z"
        fill="#F2AFC0"
        stroke="#80624E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.2 7.8C6.6 8.4 6.4 9.3 6.5 10"
        stroke="#FFFAF2"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Cute vintage instant camera / polaroid icon */
export function DoodleCamera({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="7.5"
        width="21"
        height="16"
        rx="4"
        fill="#FFFAF2"
        stroke="#80624E"
        strokeWidth="1.8"
      />
      <path
        d="M9 7.5L10.4 4.8C10.7 4.3 11.2 4 11.8 4H16.2C16.8 4 17.3 4.3 17.6 4.8L19 7.5"
        fill="#F7D879"
        stroke="#80624E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="14"
        cy="15.5"
        r="4.5"
        fill="#F2AFC0"
        stroke="#80624E"
        strokeWidth="1.8"
      />
      <circle cx="15.3" cy="14.2" r="1.2" fill="#FFFAF2" />
      <circle cx="20.2" cy="11" r="1.1" fill="#80624E" />
    </svg>
  );
}

/** Cute wax-sealed love letter envelope icon */
export function DoodleLetter({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="6.5"
        width="21"
        height="15"
        rx="3"
        fill="#FFFAF2"
        stroke="#80624E"
        strokeWidth="1.8"
      />
      <path
        d="M4.2 7.5L14 15.2L23.8 7.5"
        stroke="#80624E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="14"
        cy="14.8"
        r="3.2"
        fill="#F2AFC0"
        stroke="#80624E"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Cute little flower / garden sprout icon */
export function DoodleFlower({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 15V24"
        stroke="#80624E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 20C14 20 18.5 19.5 19.5 16.5C16.5 16 14 18 14 20Z"
        fill="#A8B99B"
        stroke="#80624E"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 21C14 21 9.5 20.5 8.5 17.5C11.5 17 14 19 14 21Z"
        fill="#A8B99B"
        stroke="#80624E"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="7.2" r="2.8" fill="#F2AFC0" stroke="#80624E" strokeWidth="1.6" />
      <circle cx="17.8" cy="10.2" r="2.8" fill="#F2AFC0" stroke="#80624E" strokeWidth="1.6" />
      <circle cx="16.3" cy="14.5" r="2.8" fill="#F2AFC0" stroke="#80624E" strokeWidth="1.6" />
      <circle cx="11.7" cy="14.5" r="2.8" fill="#F2AFC0" stroke="#80624E" strokeWidth="1.6" />
      <circle cx="10.2" cy="10.2" r="2.8" fill="#F2AFC0" stroke="#80624E" strokeWidth="1.6" />
      <circle cx="14" cy="11" r="2.6" fill="#F7D879" stroke="#80624E" strokeWidth="1.6" />
    </svg>
  );
}

/** Cute tied gift box icon */
export function DoodleGift({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="5"
        y="12"
        width="18"
        height="12"
        rx="2.5"
        fill="#F7D879"
        stroke="#80624E"
        strokeWidth="1.8"
      />
      <rect
        x="3.8"
        y="8.5"
        width="20.4"
        height="4"
        rx="1.8"
        fill="#FFFAF2"
        stroke="#80624E"
        strokeWidth="1.8"
      />
      <path d="M14 8.5V24" stroke="#80624E" strokeWidth="1.8" />
      <path
        d="M14 8.5C14 8.5 10 8.5 9.2 6.2C8.5 4.2 11.5 3.2 13.2 5.8C13.7 6.6 14 8.5 14 8.5Z"
        fill="#F2AFC0"
        stroke="#80624E"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M14 8.5C14 8.5 18 8.5 18.8 6.2C19.5 4.2 16.5 3.2 14.8 5.8C14.3 6.6 14 8.5 14 8.5Z"
        fill="#F2AFC0"
        stroke="#80624E"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Cute home / little world dome icon */
export function DoodleHome({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 11L12 4.5L20 11"
        stroke="#80624E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 9.5V18.5C6.5 19.3 7.2 20 8 20H16C16.8 20 17.5 19.3 17.5 18.5V9.5"
        fill="#FFFAF2"
        stroke="#80624E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2 20V14.8C10.2 13.8 11 13 12 13C13 13 13.8 13.8 13.8 14.8V20"
        fill="#F7D879"
        stroke="#80624E"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/** Hand-drawn arrow right */
export function DoodleArrowRight({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 10.2C7.5 9.9 11.5 9.9 15.5 10.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11.5 6L16 10.1L11.5 14.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand-drawn arrow left */
export function DoodleArrowLeft({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 10.2C12.5 9.9 8.5 9.9 4.5 10.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.5 6L4 10.1L8.5 14.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Cute stamp / sticker badge icon for memories */
export function DoodlePin({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="10"
        r="5.2"
        fill="#F2AFC0"
        stroke="#80624E"
        strokeWidth="1.8"
      />
      <circle cx="10.4" cy="8.4" r="1.3" fill="#FFFAF2" />
      <path
        d="M12 15.2V20.5"
        stroke="#80624E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Cute jigsaw puzzle piece with little heart */
export function DoodlePuzzle({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 7H11.5C11.5 5.3 12.8 4 14.5 4C16.2 4 17.5 5.3 17.5 7H21C22.1 7 23 7.9 23 9V12.5C24.7 12.5 26 13.8 26 15.5C26 17.2 24.7 18.5 23 18.5V22C23 23.1 22.1 24 21 24H7C5.9 24 5 23.1 5 22V18.5C6.7 18.5 8 17.2 8 15.5C8 13.8 6.7 12.5 5 12.5V9C5 7.9 5.9 7 7 7Z"
        fill="#F7D879"
        stroke="#80624E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 18.5C14.5 18.5 11 16 11 13.5C11 12.2 12 11.2 13.2 11.2C13.9 11.2 14.5 11.6 14.5 12.2C14.5 11.6 15.1 11.2 15.8 11.2C17 11.2 18 12.2 18 13.5C18 16 14.5 18.5 14.5 18.5Z"
        fill="#F2AFC0"
        stroke="#80624E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Cute hand-drawn vinyl record / music disc icon */
export function DoodleDisc({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        fill="#3A2D27"
        stroke="#80624E"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="6.8"
        stroke="#6E5A4E"
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />
      <circle
        cx="12"
        cy="12"
        r="4.2"
        fill="#F2AFC0"
        stroke="#80624E"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="12" r="1.3" fill="#FFFBF5" />
    </svg>
  );
}


