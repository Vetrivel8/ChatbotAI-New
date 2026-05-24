import ReactMarkdown from "react-markdown";

export default function Message({ role, text }) {
  return (
    <div className={`message ${role}`}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}
