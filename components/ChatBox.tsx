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

const ChatBox: React.FC<ChatBoxProps> = ({ groups, links, closeModal }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const injectedData = {
    Information:
      "You have two types of data: 'groups' and 'links'. 'Links' contains information based on the data you provide. I will generate a precise response based on your prompt and these data types. Sometimes, the group type can be 'none', meaning I'm only sending a single link's data.",
    Groups: groups,
    LinksData: links,
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const sendMessage = async (): Promise<void> => {
    if (!prompt.trim()) return;

    const dataToSend = `Information: ${injectedData.Information}
      Groups: ${groups}
      LinksData: ${links}
      Prompt: ${prompt}
    `;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: prompt },
    ]);

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", text: "..." },
    ]);
    setLoading(true);
    setPrompt("");
    try {
      const response = await axios.post("/api/chat", {
        data: dataToSend,
      });

      const botMessage = response.data.message;

      //@ts-ignore
      const sanitizedMessage = DOMPurify.sanitize(marked(botMessage));

      // Replacing the loading message with the actual bot response
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { type: "bot", text: sanitizedMessage },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
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
        <div className="flex-1 flex-wrap  overflow-y-auto bg-gray-500 p-4 rounded-md">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-md max-mobile:text-sm flex-wrap ${
                message.type === "user"
                  ? "bg-purple-500 text-white font-bold text-sm w-fit ml-auto"
                  : "bg-blue-300 text-black w-fit font-bold"
              }`}
            >
              {message.text === "..." ? (
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: message.text }}></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 w-full flex justify-center items-center">
          <Button
            onClick={() => {
              closeModal();
            }}
            className="w-[10%] max-sm:w-[15%] p-3  max-mobile:text-xs max-sm:p-1 max-sm:text-sm  bg-red-500 text-white rounded-l-xl disabled:bg-blue-300"
          >
            Cancel
          </Button>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt here..."
            className="w-[80%] max-sm:w-[70%] p-3  bg-black border-none text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={sendMessage}
            disabled={loading}
            className="w-[10%] max-sm:w-[15%] p-3 max-mobile:text-xs max-sm:p-1 max-sm:text-sm   bg-green-500 text-white rounded-r-xl disabled:bg-blue-300"
          >
            send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
