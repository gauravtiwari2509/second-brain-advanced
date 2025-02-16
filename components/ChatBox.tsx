"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface Message {
  type: "user" | "bot";
  text: string;
}

interface ChatBoxProps {
  groups: string;
  links: string;
  closeModal: () => void;
}

// A helper component for rendering and sanitizing markdown
const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  // Convert markdown to HTML synchronously
  const htmlContent = marked(text);

  // Sanitize the generated HTML
  //@ts-ignore
  const sanitizedHtml = DOMPurify.sanitize(htmlContent, {
    USE_PROFILES: { html: true },
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

const ChatBox: React.FC<ChatBoxProps> = ({ groups, links, closeModal }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const rules = {
    rules: [
      {
        rule: "Avoid JSON format in response",
        description:
          "Never return the entire JSON structure. Provide human-readable summaries.",
      },
      {
        rule: "Formating rules",
        description:
          "Ensure the response is formatted using proper markdown syntax. Use headings for titles or sections, bold text for link titles or important terms, and italics for links or emphasis. If applicable, use bullet points for lists or key items. Ensure proper use of code formatting (inline `code` or code blocks) where needed and keep the structure clear and easy to read.",
      },
      {
        rule: "Focus on relevance",
        description:
          "Share only relevant details based on the user's query, especially from groups or links.",
      },
      {
        rule: "Be concise",
        description:
          "Keep answers short and to the point. Avoid overwhelming the user with unnecessary data.",
      },
      {
        rule: "Clarify vague requests",
        description: "Ask for more details if the user’s request is unclear.",
      },

      {
        rule: "use previous messages to process the current prompt",
        description:
          "just don't repeat the previous messages reply always reply to current prompt use previous messages to process the current prompt",
      },
      {
        rule: "return a polite thankyou and ask feel free to ask more question message",
        description:
          "when someone appreciate you then return proper message with polite thankyou and ask feel free to ask more question message",
      },
    ],
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const sendMessage = async (): Promise<void> => {
    if (!prompt.trim()) return;

    const dataToSend = JSON.stringify({
      "rules which you have to follow before responding": rules,
      groups,
      links,
      currentprompt: prompt,
      ourLastMessages: messages.slice(0, messages.length - 1),
    });
    console.log(dataToSend);
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: prompt },
      { type: "bot", text: "..." },
    ]);

    setLoading(true);
    setPrompt("");
    try {
      const response = await axios.post("/api/chat", {
        data: dataToSend,
      });

      const botMessage = response.data.message;

      // Use the MarkdownRenderer component to sanitize and render the markdown
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { type: "bot", text: botMessage },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { type: "bot", text: "Error: Unable to get response" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="fixed h-screen w-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center modal z-50"
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="max-mobile:w-[95vw] max-mobile:h-[80vh] w-[75vw] h-[85vh] lg:w-[60vw] lg:h-[70vh] bg-gray-purple-600 rounded-lg shadow-lg p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex-1 flex-wrap overflow-y-auto bg-gray-500 p-4 rounded-md">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-md max-mobile:text-sm flex-wrap ${
                message.type === "user"
                  ? "bg-purple-500 text-white  text-sm w-fit ml-auto"
                  : "bg-blue-300 text-black w-fit "
              }`}
            >
              {message.text === "..." ? (
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                </div>
              ) : (
                // Using MarkdownRenderer for sanitized message rendering
                <MarkdownRenderer text={message.text} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 w-full flex justify-center items-center">
          <Button
            onClick={() => {
              closeModal();
            }}
            className="w-[10%] max-sm:w-[15%] p-3 max-mobile:text-xs max-sm:p-1 max-sm:text-sm  bg-red-500 text-white rounded-l-xl disabled:bg-blue-300"
          >
            Cancel
          </Button>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt here..."
            className="w-[80%] max-sm:w-[70%] p-3 bg-black border-none text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={sendMessage}
            disabled={loading}
            className="w-[10%] max-sm:w-[15%] p-3 max-mobile:text-xs max-sm:p-1 max-sm:text-sm bg-green-500 text-white rounded-r-xl disabled:bg-blue-300"
          >
            send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
