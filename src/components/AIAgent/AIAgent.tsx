import { useState, useRef, useEffect } from "react";
import "./AIAgent.css";
import {
  getAIResponse,
  INITIAL_AI_MESSAGE,
  AIResponse,
} from "./aiKnowledge";
import { RiRobot2Line } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import {
  IoSend,
  IoMicOutline,
  IoMicOffOutline,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
  IoClose,
  IoSparkles,
  IoRefreshOutline,
  IoCopyOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";
import { TbDownload } from "react-icons/tb";
import { MdArrowOutward } from "react-icons/md";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  action?: AIResponse["action"];
  suggestions?: string[];
  timestamp: string;
}

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "ai",
      text: INITIAL_AI_MESSAGE.text,
      suggestions: INITIAL_AI_MESSAGE.suggestions,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll on message updates
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Global shortcut: Cmd+K / Ctrl+K to toggle, Escape to close
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen]);

  const handleResetChat = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: "ai",
        text: INITIAL_AI_MESSAGE.text,
        suggestions: INITIAL_AI_MESSAGE.suggestions,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  // Speech synthesis (TTS) helper
  const speakText = (text: string) => {
    if (!soundEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    window.speechSynthesis.cancel();

    // Strip markdown formatting for speech
    const cleanText = text
      .replace(/\*\*/g, "")
      .replace(/•/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/[#*_`]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick a smooth natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha"))
    );
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Speech Recognition (STT) setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputValue(transcript);
            handleSend(transcript);
          }
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [soundEnabled]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Speech recognition error:", err);
      }
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Natural assistant latency simulation
    const delay = Math.floor(Math.random() * 300) + 400;
    setTimeout(async () => {
      const response = await getAIResponse(query, messages);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: response.text,
        action: response.action,
        suggestions: response.suggestions,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      speakText(response.text);

      if (!isOpen) {
        setHasNewMessage(true);
      }
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleActionClick = (action: AIResponse["action"]) => {
    if (!action) return;
    if (action.type === "scroll" && action.url) {
      const el = document.querySelector(action.url);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (action.type === "download_resume") {
      window.open(action.url, "_blank", "noopener,noreferrer");
      const a = document.createElement("a");
      a.href = action.url;
      a.download = "Chayan_Kumar_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (action.type === "email") {
      window.location.href = action.url;
    } else {
      window.open(action.url, "_blank", "noopener,noreferrer");
    }
  };

  // Helper component for syntax code blocks with copy-to-clipboard functionality
  const CodeSnippet = ({ lang, code }: { lang: string; code: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="ai-code-wrapper">
        <div className="ai-code-header">
          <span className="ai-code-lang">{lang || "code"}</span>
          <button
            className="ai-code-copy-btn"
            onClick={handleCopy}
            title="Copy code"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <IoCheckmarkOutline /> Copied!
              </>
            ) : (
              <>
                <IoCopyOutline /> Copy
              </>
            )}
          </button>
        </div>
        <pre className="ai-code-block">
          <code>{code}</code>
        </pre>
      </div>
    );
  };

  // Helper to render markdown formatting (fenced code blocks, inline code, bold, links)
  const renderFormattedText = (rawText: string) => {
    // Split by code blocks ```...```
    const segments = rawText.split(/(```[\s\S]*?```)/g);

    return segments.map((segment, segIdx) => {
      // If it's a code block
      if (segment.startsWith("```") && segment.endsWith("```")) {
        const lines = segment.slice(3, -3).trim().split("\n");
        let lang = "";
        let codeBody = "";
        if (lines[0] && /^[a-zA-Z0-9_-]+$/.test(lines[0].trim())) {
          lang = lines[0].trim();
          codeBody = lines.slice(1).join("\n");
        } else {
          codeBody = lines.join("\n");
        }

        return <CodeSnippet key={segIdx} lang={lang} code={codeBody} />;
      }

      // Regular text: split by lines
      const lines = segment.split("\n");
      return (
        <div key={segIdx} className="ai-text-segment">
          {lines.map((line, lineIndex) => {
            if (!line.trim() && lineIndex > 0 && lineIndex < lines.length - 1) {
              return <div key={lineIndex} className="ai-text-spacer" />;
            }

            // Split by inline code, bold, and links
            const parts = line.split(/(`[^`]+`|\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

            return (
              <div key={lineIndex} className="ai-text-line">
                {parts.map((part, partIndex) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                  }
                  if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
                    return (
                      <code key={partIndex} className="ai-inline-code">
                        {part.slice(1, -1)}
                      </code>
                    );
                  }
                  const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
                  if (linkMatch) {
                    return (
                      <a
                        key={partIndex}
                        href={linkMatch[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ai-msg-link"
                      >
                        {linkMatch[1]}
                      </a>
                    );
                  }
                  return part;
                })}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="ai-agent-wrapper">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          className={`ai-trigger-btn ${hasNewMessage ? "has-new" : ""}`}
          onClick={() => setIsOpen(true)}
          title="Chat with Chayan AI Copilot (⌘K / Ctrl+K)"
          aria-label="Open Chayan AI Assistant"
          data-cursor="disable"
        >
          <div className="ai-trigger-pulse"></div>
          <div className="ai-trigger-icon">
            <RiRobot2Line />
            <span className="ai-sparkle">
              <BsStars />
            </span>
          </div>
          <div className="ai-trigger-label">
            <div className="ai-trigger-title-row">
              <span className="ai-trigger-title">Ask Chayan AI</span>
              <kbd className="ai-trigger-kbd">⌘K</kbd>
            </div>
            <span className="ai-trigger-sub">Copilot Online</span>
          </div>
          <span className="ai-status-beacon"></span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="ai-chat-window" data-cursor="disable">
          {/* Header */}
          <div className="ai-header">
            <div className="ai-header-left">
              <div className="ai-avatar">
                <RiRobot2Line />
                <span className="ai-online-dot"></span>
              </div>
              <div className="ai-title-block">
                <div className="ai-name">
                  Chayan AI <span className="ai-badge">Agent</span>
                </div>
                <div className="ai-subtitle">AI/ML Portfolio Copilot</div>
              </div>
            </div>

            <div className="ai-header-actions">
              <button
                className="ai-icon-btn reset-btn"
                onClick={handleResetChat}
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <IoRefreshOutline />
              </button>

              <button
                className={`ai-icon-btn ${soundEnabled ? "active" : ""}`}
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                title={soundEnabled ? "Mute Voice Output" : "Enable Voice Output"}
                aria-label="Toggle Voice Output"
              >
                {soundEnabled ? <IoVolumeHighOutline /> : <IoVolumeMuteOutline />}
              </button>

              <button
                className="ai-icon-btn close-btn"
                onClick={() => {
                  setIsOpen(false);
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                title="Close Assistant (Esc)"
                aria-label="Close Assistant"
              >
                <IoClose />
              </button>
            </div>
          </div>

          {/* Message Thread */}
          <div className="ai-messages-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ai-message-row ${
                  msg.sender === "user" ? "user-row" : "ai-row"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="ai-bubble-avatar">
                    <IoSparkles />
                  </div>
                )}
                <div className="ai-bubble-content">
                  <div className="ai-message-bubble">
                    {renderFormattedText(msg.text)}

                    {/* Action Card Button */}
                    {msg.action && (
                      <button
                        className="ai-action-btn"
                        onClick={() => handleActionClick(msg.action)}
                      >
                        {msg.action.type === "download_resume" && <TbDownload />}
                        {(msg.action.type === "link" || msg.action.type === "scroll") && <MdArrowOutward />}
                        {msg.action.label}
                      </button>
                    )}
                  </div>

                  <div className="ai-timestamp">{msg.timestamp}</div>

                  {/* Quick Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="ai-suggestions-row">
                      {msg.suggestions.map((chip, idx) => (
                        <button
                          key={idx}
                          className="ai-suggestion-chip"
                          onClick={() => handleSend(chip)}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message-row ai-row">
                <div className="ai-bubble-avatar">
                  <IoSparkles />
                </div>
                <div className="ai-message-bubble typing-bubble">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="ai-input-wrapper">
            <button
              className={`ai-mic-btn ${isListening ? "listening" : ""}`}
              onClick={toggleListening}
              title={isListening ? "Listening... click to stop" : "Speak your question"}
              aria-label="Voice Input"
            >
              {isListening ? <IoMicOffOutline /> : <IoMicOutline />}
            </button>

            <input
              ref={inputRef}
              type="text"
              placeholder={isListening ? "Listening to your voice..." : "Ask about Amazon, Lyptus, research, resume..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />

            <button
              className="ai-send-btn"
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              title="Send Message"
              aria-label="Send Message"
            >
              <IoSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAgent;
