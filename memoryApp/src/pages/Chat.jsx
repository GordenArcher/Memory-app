import { useState, useRef, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { Notify } from "../components/Notify";
import '../assets/CSS/chat.css';
import Bot from '../assets/bott.png';
import UserImg from '../assets/use.png';
import sendImg from '../assets/se.png';
import NonImg from '../assets/e.svg';
import { AuthContext } from "../utils/context/AuthContext";

export const Chat = () => {

    const notify = (e) => toast(e);
    const { theme } = useContext(AuthContext)

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState([]);

    const textareaRef = useRef(null);
    const chatContainerRef = useRef(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;

        if(message.length < 30){
            textarea.style.height = "56px";
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, response]);

    const fetchGeneratedContent = async () => {
        if (!message.trim()) return notify("Enter a message");

        const res = await fetch("https://gordenarcher.pythonanywhere.com/api/generate_content/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: message })
        });

        const data = await res.json();
        if (res.ok) {
            const responseData = data.response.candidates[0].content.parts;
            setResponse((prevData) => [...prevData, responseData[0].text]);
        } else {
            console.error("Error:", data.error);
        }
    };

    const handleUserMessage = () => {
        if (message.trim()) {
            setMessages((prevMessages) => [...prevMessages, { text: message, sender: "user" }]);
            setMessage(""); 
            fetchGeneratedContent();
        }
    };

    useEffect(() => {
        if (response.length > 0) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: response[response.length - 1], sender: "bot" },
            ]);
        }
    }, [response]);

    const dark = {
        background: "black",
        color : "white",
    }

    const c = {
        color : "black"
    }

    const j = {
        border : "1px solic #ccc",
        color : "white"
    }

    return (
        <div className="chat" style={theme === "light" ? dark : null}>
            <div className="chat_content">
                <div className="chat_wrapper">
                    <div className="chat_view">
                        <div className="c_view" ref={chatContainerRef}>
                            <div className="chat_message">
                                {messages.length === 0 ?
                                (
                                    <div className="no">
                                        <div className="cent">
                                            <div className="cent_img">
                                                <img src={NonImg} alt="n image" />
                                            </div>

                                            <div className="cent_smt">
                                            Say something to start the conversation! <i className="bi bi-messenger"></i>  <br /> <br />
                                            <p>Whenever you refresh all your chat will be lost, sorry for the inconvenience, we&apos;ll fix it very soon, for now ENJOY</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                                :

                                (
                                    messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={msg.sender === "user" ? "s_m" : "i_m"}
                                        >
                                            <div className={msg.sender === "user" ? "f" : "chat_icon"}>
                                                {msg.sender === "bot" && (
                                                    <img src={Bot} alt="ai image" />
                                                )}
                                            </div>
                                            <div className={msg.sender === "user" ? "act_mess_sent" : "act_res"}>
                                                {msg.sender === "user" && (
                                                    <img src={UserImg} alt="ai image" />
                                                )}
                                                <div style={theme === "light" ? c : null}>{msg.text || "Loading..."}</div>
                                            </div>
                                        </div>
                                    ))
                                )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="chat_input">
                        <div className="s_chatm">
                            <textarea
                                style={theme === "light" ? j : null}
                                ref={textareaRef}
                                onInput={handleInput}
                                type="text"
                                name="text"
                                value={message}
                                id="chatbot"
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Say Something..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleUserMessage();
                                    }
                                }}
                            ></textarea>
                        </div>

                        {message.length > 0 && message.trim() && (
                            <div className="s_chat_mess">
                                <div className="s_c">
                                    <button onClick={handleUserMessage}>
                                        <div className="v_s">
                                            <img src={sendImg} alt="send image" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Notify />
        </div>
    );
};
