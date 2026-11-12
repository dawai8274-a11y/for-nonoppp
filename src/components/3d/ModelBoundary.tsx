"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: () => void;
};
type State = { failed: boolean };

export function MissingModelNotice() {
  return (
    <div style={{
      width: "100%", height: "100%", minHeight: 220, display: "grid",
      placeItems: "center", padding: 24, textAlign: "center",
      color: "#80624e", fontSize: 13, lineHeight: 1.7,
      background: "rgba(255, 250, 242, 0.72)",
      border: "1px dashed rgba(128, 98, 78, 0.28)",
      borderRadius: 18
    }}>
      <div>
        <strong>Menyiapkan Kejutan Ulang Tahun...</strong>
        <div>Sedang memuat tampilan 3D spesial untukmu.</div>
      </div>
    </div>
  );
}

export default class ModelBoundary extends React.Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.warn("3D model could not be loaded. Add public/models/nailong.glb.", error);
    this.props.onError?.();
  }

  render() {
    if (this.state.failed) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      return <MissingModelNotice />;
    }
    return this.props.children;
  }
}
