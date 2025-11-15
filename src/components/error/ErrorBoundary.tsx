"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Button from "@/components/common/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              문제가 발생했습니다
            </h2>
            <p className="text-gray-600">
              예상치 못한 오류가 발생했습니다. 페이지를 새로고침하거나 다시
              시도해주세요.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mt-4 p-4 bg-red-50 rounded border border-red-200">
                <p className="text-sm font-mono text-red-800">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            <div className="flex gap-2">
              <Button
                onClick={this.handleReset}
                className="flex-1"
                primary
                content="다시 시도"
              />
              <Button
                onClick={() => window.location.reload()}
                className="flex-1"
                content="페이지 새로고침"
              />
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
