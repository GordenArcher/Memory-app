import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Notify } from "../components/Notify";
import '../assets/CSS/chat.css';
import Bot from '../assets/bott.png';
import sendImg from '../assets/se.png';
import NonImg from '../assets/e.svg';

export const Chat = () => {

    const notify = (e) => toast(e);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState([]);

    const textareaRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, response]);

    const fetchGeneratedContent = async () => {
        if (!message.trim()) return notify("Enter a message");

        const res = await fetch("https://gordenarcher.pythonanywhere.com/api/v1/generate_content/", {
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

    return (
        <div className="chat" >
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
                                            <p>Whenever you refresh, all your chat will be lost, sorry for the inconvenience, we&apos;ll fix it very soon, for now ENJOY</p>
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
                                                <div >{msg.text || "Loading..."}</div>
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
                            <input
                                ref={textareaRef}
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
                            />
                        </div>

                        <div className="s_chat_mess">
                            <div className="s_c">
                                <button onClick={handleUserMessage}>
                                    <div className="v_s">
                                        <img src={sendImg} alt="send image" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notify />
        </div>
    );
};
