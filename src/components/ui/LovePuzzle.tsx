"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import GreenScreenFireworks from "./GreenScreenFireworks";
import { DoodleHeart, DoodleFlower, DoodlePuzzle } from "./DoodleIcons";

// Initial scrambled order of 4 puzzle tiles (0 = top-left, 1 = top-right, 2 = bottom-left, 3 = bottom-right)
const INITIAL_TILES = [2, 0, 3, 1];

type LovePuzzleProps = {
  onSolved?: () => void;
};

/** Renders one quadrant of a hand-crafted Love Heart illustration */
function HeartQuadrantArt({ pieceId }: { pieceId: number }) {
  // Each quadrant shows its quarter of a 200x200 viewBox
  const viewBoxMap: Record<number, string> = {
    0: "0 0 100 100",
    1: "100 0 100 100",
    2: "0 100 100 100",
    3: "100 100 100 100"
  };

  return (
    <svg
      viewBox={viewBoxMap[pieceId]}
      className="puzzle-quadrant-svg"
      aria-hidden="true"
    >
      {/* Soft warm paper background */}
      <rect x="0" y="0" width="200" height="200" fill="#FFF6E7" />

      {/* Subtle decorative dotted circle */}
      <circle
        cx="100"
        cy="100"
        r="82"
        fill="#FFFAF2"
        stroke="#DFC5AC"
        strokeWidth="2.5"
        strokeDasharray="6 6"
      />

      {/* Hand-drawn big romantic heart */}
      <path
        d="M100 166C100 166 34 122 34 74C34 49 53 32 75 32C88 32 96 39 100 48C104 39 112 32 125 32C147 32 166 49 166 74C166 122 100 166 100 166Z"
        fill="#F2AFC0"
        stroke="#80624E"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner warm butter heart */}
      <path
        d="M100 142C100 142 56 110 56 78C56 62 68 51 82 51C91 51 97 56 100 62C103 56 109 51 118 51C132 51 144 62 144 78C144 110 100 142 100 142Z"
        fill="#F7D879"
        stroke="#80624E"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hand-drawn highlight on top-left lobe */}
      <path
        d="M52 62C47 68 46 76 48 83"
        stroke="#FFFAF2"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Cute little flowers in corners */}
      <circle cx="42" cy="42" r="6" fill="#F7D879" stroke="#80624E" strokeWidth="2.2" />
      <circle cx="158" cy="42" r="6" fill="#F2AFC0" stroke="#80624E" strokeWidth="2.2" />
      <circle cx="42" cy="158" r="6" fill="#A8B99B" stroke="#80624E" strokeWidth="2.2" />
      <circle cx="158" cy="158" r="6" fill="#F7D879" stroke="#80624E" strokeWidth="2.2" />

      {/* Center ribbon text */}
      <text
        x="100"
        y="102"
        textAnchor="middle"
        fill="#493B32"
        fontFamily="Caveat, cursive"
        fontWeight="700"
        fontSize="24"
      >
        Happy B&apos;day
      </text>
    </svg>
  );
}

export default function LovePuzzle({ onSolved }: LovePuzzleProps) {
  const [tiles, setTiles] = useState<number[]>(INITIAL_TILES);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const handleTileClick = (slotIndex: number) => {
    if (isSolved) return;

    if (selectedSlot === null) {
      setSelectedSlot(slotIndex);
      return;
    }

    if (selectedSlot === slotIndex) {
      setSelectedSlot(null);
      return;
    }

    // Swap the two selected tiles
    const nextTiles = [...tiles];
    const temp = nextTiles[selectedSlot];
    nextTiles[selectedSlot] = nextTiles[slotIndex];
    nextTiles[slotIndex] = temp;

    setTiles(nextTiles);
    setSelectedSlot(null);

    const solvedNow = nextTiles.every((pieceId, idx) => pieceId === idx);
    if (solvedNow) {
      setIsSolved(true);
      onSolved?.();
    }
  };

  const handleReset = () => {
    setTiles(INITIAL_TILES);
    setSelectedSlot(null);
    setIsSolved(false);
  };

  return (
    <div className="love-puzzle-box">
      {/* Green screen fireworks overlay when puzzle is solved */}
      <GreenScreenFireworks active={isSolved} />

      <div className="puzzle-header-bar">
        <span className="puzzle-badge">
          <DoodlePuzzle size={16} /> Mini Game · Susun Puzzle Love
        </span>
        {isSolved && (
          <button
            type="button"
            className="puzzle-reset-btn"
            onClick={handleReset}
          >
            Main Lagi ↺
          </button>
        )}
      </div>

      <p className="puzzle-instruction">
        {isSolved
          ? "Yeay! Puzzle Love berhasil tersusun utuh! Kembang api merayakan ulang tahunmu!"
          : selectedSlot !== null
          ? "Sekarang ketuk kepingan lain untuk menukar posisinya!"
          : "Ketuk dua kepingan gambar di bawah untuk menukar posisi sampai membentuk Hati yang utuh:"}
      </p>

      <div className={`puzzle-board ${isSolved ? "is-solved" : ""}`}>
        {tiles.map((pieceId, slotIndex) => {
          const isSelected = selectedSlot === slotIndex;
          const isCorrectSpot = pieceId === slotIndex;

          return (
            <motion.button
              key={`slot-${slotIndex}`}
              type="button"
              layout
              onClick={() => handleTileClick(slotIndex)}
              className={`puzzle-tile ${isSelected ? "is-selected" : ""} ${
                isCorrectSpot && !isSolved ? "is-correct-hint" : ""
              }`}
              whileTap={!isSolved ? { scale: 0.96 } : undefined}
              aria-label={`Kepingan puzzle posisi ${slotIndex + 1}`}
            >
              <HeartQuadrantArt pieceId={pieceId} />
              {!isSolved && (
                <span className="puzzle-piece-num">#{slotIndex + 1}</span>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {isSolved && (
          <motion.div
            className="hug-note-card puzzle-win-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            <div className="hug-note-icons">
              <DoodleFlower size={24} />
              <DoodleHeart size={26} />
              <DoodleFlower size={24} />
            </div>
            <h3>Selamat Ulang Tahun, Kesayanganku!</h3>
            <p>
              Terima kasih sudah menyusun kepingan hati ini sampai utuh! Semoga
              di usia yang baru ini hidupmu selalu semeriah kembang api, sehat
              selalu, dan semua harapan baikmu lekas terkabul.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
