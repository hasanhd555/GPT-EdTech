import { DeepChat } from "deep-chat-react";
import Draggable from "react-draggable";
import Styles from "./ChatBot.module.css";

interface ChatBotProps {
  chatbotActive: boolean;
  toggleChatbot: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ chatbotActive, toggleChatbot }) => {
  const apiKey = process.env.REACT_APP_OPEN_AI_KEY;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: "2",
      }}
    >
      <Draggable>
        <div className="rounded-circle text-end">
          {chatbotActive && (
            <DeepChat
              directConnection={{
                openAI: {
                  key: apiKey,
                  chat: {
                    max_tokens: 300,
                    system_prompt:
                      "You are an educational bot. Assist me with concise answers",
                  },
                },
              }}
              chatStyle={{
                borderRadius: "15px",
                boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.4)",
              }}
              textInput={{
                styles: {
                  container: {
                    borderRadius: "20px",
                    border: "unset",
                    width: "78%",
                    marginLeft: "-15px",
                    boxShadow:
                      "0px 0.3px 0.9px rgba(0, 0, 0, 0.12), 0px 1.6px 3.6px rgba(0, 0, 0, 0.16)",
                  },
                  text: {
                    padding: "10px",
                    paddingLeft: "15px",
                    paddingRight: "34px",
                  },
                },
                placeholder: {
                  text: "Ask me anything...",
                  style: { color: "#606060" },
                },
              }}
              messageStyles={{
                default: {
                  shared: {
                    bubble: {
                      backgroundColor: "unset",
                      marginTop: "10px",
                      marginBottom: "10px",
                      boxShadow:
                        "0px 0.3px 0.9px rgba(0, 0, 0, 0.12), 0px 1.6px 3.6px rgba(0, 0, 0, 0.16)",
                    },
                  },
                  user: {
                    bubble: {
                      background:
                        "linear-gradient(130deg, #2870EA 20%, #1B4AEF 77.5%)",
                    },
                  },
                  ai: {
                    bubble: { background: "rgba(255,255,255,0.7)" },
                  },
                },
              }}
              submitButtonStyles={{
                position: "outside-right",
                submit: {
                  container: {
                    default: {
                      bottom: "0.8em",
                      borderRadius: "25px",
                      padding: "6px 5px 4px",
                      backgroundColor: "unset",
                    },
                    hover: { backgroundColor: "#b0deff4f" },
                    click: { backgroundColor: "#b0deffb5" },
                  },
                  svg: {
                    content:
                      '<?xml version="1.0" encoding="utf-8"?> <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"/></svg>',
                    styles: {
                      default: {
                        width: "1.5em",
                        filter:
                          "brightness(0) saturate(100%) invert(10%) sepia(86%) saturate(6044%) hue-rotate(205deg) brightness(100%) contrast(100%)",
                      },
                    },
                  },
                },
                loading: {
                  svg: {
                    styles: {
                      default: {
                        filter:
                          "brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)",
                      },
                    },
                  },
                },
                stop: {
                  container: {
                    hover: { backgroundColor: "#ededed94" },
                  },
                  svg: {
                    styles: {
                      default: {
                        filter:
                          "brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)",
                      },
                    },
                  },
                },
              }}
              introMessage={{
                text: "Hi I am your AI Tutor, ask me anything!",
              }}
              stream={true}
            />
          )}

          <i
            className={`${Styles.icon} mt-2`}
            onClick={toggleChatbot}
            onTouchStart={toggleChatbot}
          ></i>
        </div>
      </Draggable>
    </div>
  );
};

export default ChatBot;
