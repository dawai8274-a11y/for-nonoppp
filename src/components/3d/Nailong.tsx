"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type NailongProps = {
  onReact?: (clipName?: string) => void;
};

const REACTION_CLIPS = ["Wave", "Jump", "Dance", "Hug"] as const;

export default function Nailong({ onReact }: NailongProps) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const reactionIndex = useRef(0);

  const gltf = useGLTF("/models/nailong.glb");
  const { actions, names, mixer } = useAnimations(gltf.animations, group);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.frustumCulled = true;
      }
    });
  }, [gltf.scene]);

  useEffect(() => {
    const idleAction = actions["Idle"] ?? (names[0] ? actions[names[0]] : null);
    const waveAction = actions["Wave"];
    const blinkAction = actions["Blink"];

    if (idleAction) {
      idleAction.reset().fadeIn(0.25).play();
    }

    // Play a friendly wake-up wave on initial entry
    if (waveAction && idleAction && waveAction !== idleAction) {
      waveAction.reset();
      waveAction.setLoop(THREE.LoopOnce, 1);
      waveAction.clampWhenFinished = true;
      idleAction.crossFadeTo(waveAction, 0.25, false);
      waveAction.play();
    }

    const handleFinished = (event: { action: THREE.AnimationAction }) => {
      if (event.action !== idleAction && event.action !== blinkAction && idleAction) {
        idleAction.reset().fadeIn(0.25).play();
        event.action.fadeOut(0.25);
      }
    };

    mixer.addEventListener("finished", handleFinished);

    // Periodic natural eye blink
    const blinkTimer = window.setInterval(() => {
      if (blinkAction) {
        blinkAction.reset();
        blinkAction.setLoop(THREE.LoopOnce, 1);
        blinkAction.play();
      }
    }, 3400);

    return () => {
      mixer.removeEventListener("finished", handleFinished);
      window.clearInterval(blinkTimer);
    };
  }, [actions, mixer, names]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const baseOffset = -0.55;
    const targetY = baseOffset + (hovered ? 0.1 : 0);
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      targetY + Math.sin(state.clock.elapsedTime * 2.2) * 0.03,
      5,
      delta
    );
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.24, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.08, 4, delta);
  });

  const playReaction = () => {
    const available = REACTION_CLIPS.filter((name) => names.includes(name));
    const selected =
      available.length > 0
        ? available[reactionIndex.current % available.length]
        : names[0];
    reactionIndex.current += 1;

    if (selected && actions[selected]) {
      const nextAction = actions[selected]!;
      Object.entries(actions).forEach(([key, action]) => {
        if (key !== selected && key !== "Blink") {
          action?.fadeOut(0.2);
        }
      });
      nextAction.reset();
      nextAction.setLoop(THREE.LoopOnce, 1);
      nextAction.clampWhenFinished = false;
      nextAction.fadeIn(0.2).play();
    }
    onReact?.(selected);
  };

  return (
    <group
      ref={group}
      position={[0, -0.55, 0]}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={playReaction}
      scale={1.32}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

useGLTF.preload("/models/nailong.glb");