import { useState, useRef, useCallback } from "react";
import styles from "./SearchBar.module.css";
import Image from "next/image";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const recognitionRef = useRef(null);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setVoiceStatus("");
  }, []);

  const handleVoiceSearch = () => {
    if (isListening) {
      stopListening();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceStatus("Listening...");
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (interimTranscript) {
        setVoiceStatus(`Hearing: "${interimTranscript}"`);
      }

      if (finalTranscript) {
        setSearchQuery((prev) => {
          const trimmed = finalTranscript.trim();
          if (prev) return prev + " " + trimmed;
          return trimmed;
        });
        setVoiceStatus(`Got: "${finalTranscript.trim()}"`);
      }
    };

    recognition.onerror = (event) => {
      switch (event.error) {
        case "no-speech":
          setVoiceStatus("No speech detected. Try again.");
          break;
        case "audio-capture":
          setVoiceStatus("No microphone found.");
          break;
        case "not-allowed":
          setVoiceStatus("Microphone permission denied.");
          break;
        case "network":
          setVoiceStatus("Network error. Check internet.");
          break;
        case "aborted":
          break;
        default:
          setVoiceStatus(`Error: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => setVoiceStatus(""), 3000);
    };

    recognition.start();
  };

  const handleClear = () => {
    setSearchQuery("");
    setVoiceStatus("");
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <Image
          src="/images/search.png"
          width={30}
          height={30}
          alt=""
          className={styles.icon}
        />

        <input
          type="text"
          placeholder={isListening ? "Listening..." : "Search food items..."}
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {searchQuery && (
          <span className={styles.clearBtn} onClick={handleClear}>
            ✕
          </span>
        )}

        <div className={styles.separator}></div>

        <div
          className={`${styles.micBtn} ${isListening ? styles.listening : ""}`}
          onClick={handleVoiceSearch}
          title="Voice Search"
        >
          <Image
            src="/images/mic.png"
            width={30}
            height={30}
            alt=""
            className={styles.icon}
          />
        </div>
      </div>
      {voiceStatus && (
        <div className={`${styles.voiceStatus} ${isListening ? styles.voiceListening : ""}`}>
          {voiceStatus}
        </div>
      )}
    </div>
  );
}
