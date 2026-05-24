import ChatBox from "./components/Chatbox";
import "./index.css";

export default function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-icon">🎓</div>
        <div className="header-text">
          <h1>EduBot</h1>
          <p>AI-powered College Admissions Advisor</p>
        </div>
        <div className="header-status">
          <span className="status-dot"></span>
          Online
        </div>
      </header>

      {/* Chat Interface */}
      <ChatBox />

      {/* Footer hint */}
      <p className="input-footer">
        Ask about colleges, fees, cutoffs, placements, courses &amp; more
      </p>
    </div>
  );
}
