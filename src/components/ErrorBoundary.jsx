import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // You can log error info here if needed
    // console.error(error);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "2rem",
          maxWidth: 500,
          margin: "4rem auto",
          background: "#fff0f0",
          borderRadius: 12,
          boxShadow: "0 2px 16px 0 rgba(220,38,38,0.08)",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#dc2626" }}>Something went wrong.</h2>
          <p style={{ color: "#991b1b" }}>{this.state.error?.message || "An unexpected error occurred."}</p>
          <button onClick={this.handleReload} style={{
            marginTop: 20,
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.7rem 1.5rem",
            fontSize: "1.1rem",
            fontWeight: 600,
            cursor: "pointer"
          }}>Reload App</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
