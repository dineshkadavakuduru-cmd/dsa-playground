"use client";

import { Component, type ReactNode } from "react";

type CanvasErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type CanvasErrorBoundaryState = {
  error: boolean;
};

export class CanvasErrorBoundary extends Component<CanvasErrorBoundaryProps, CanvasErrorBoundaryState> {
  state: CanvasErrorBoundaryState = { error: false };

  static getDerivedStateFromError(): CanvasErrorBoundaryState {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="stage-loading">WEBGL UNAVAILABLE / STAGE OFFLINE</div>
        )
      );
    }
    return this.props.children;
  }
}
