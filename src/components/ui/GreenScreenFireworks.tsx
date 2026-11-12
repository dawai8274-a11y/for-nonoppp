"use client";

import { useEffect, useRef } from "react";

type GreenScreenFireworksProps = {
  active: boolean;
  src?: string;
};

/**
 * Renders the green-screen fireworks video (/videos/fireworks-greenscreen.mp4)
 * onto a transparent HTML5 Canvas using real-time chroma key (removing green background).
 */
export default function GreenScreenFireworks({
  active,
  src = "/videos/fireworks-greenscreen.mp4"
}: GreenScreenFireworksProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animId = 0;
    let running = true;

    const processFrame = () => {
      if (!running) return;

      if (video.readyState >= 2 && !video.paused && !video.ended) {
        const w = canvas.width;
        const h = canvas.height;
        ctx.drawImage(video, 0, 0, w, h);

        const frame = ctx.getImageData(0, 0, w, h);
        const data = frame.data;
        const len = data.length;

        // Chroma key out bright green pixels and soften green edges
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const maxRB = r > b ? r : b;
          const greenExcess = g - maxRB;

          if (g > 75 && greenExcess > 28) {
            // Pure green screen background -> fully transparent
            if (greenExcess > 65) {
              data[i + 3] = 0;
            } else {
              // Smooth edge feathering + spill suppression
              const alphaRatio = 1 - (greenExcess - 28) / 37;
              data[i + 3] = Math.max(0, Math.min(255, Math.round(data[i + 3] * alphaRatio)));
              data[i + 1] = maxRB;
            }
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      animId = window.requestAnimationFrame(processFrame);
    };

    video.currentTime = 0;
    video.play().catch(() => {
      // Ignore autoplay errors if blocked
    });
    animId = window.requestAnimationFrame(processFrame);

    return () => {
      running = false;
      window.cancelAnimationFrame(animId);
      video.pause();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fireworks-overlay" aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        width={270}
        height={480}
        className="fireworks-canvas"
      />
    </div>
  );
}
