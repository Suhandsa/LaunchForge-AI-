import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card p-6 border-l-4 border-red-500 mt-5">
          <p className="text-red-400 font-bold mb-2">Rendering Error:</p>
          <p className="text-red-300 text-sm break-words">{this.state.error?.message || String(this.state.error)}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
