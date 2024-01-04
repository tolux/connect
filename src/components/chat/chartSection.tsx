import { TChatMessage } from '@/@types/app.types';
import { ChatSvg, CloseSvg, SendSvg } from '@/assets/icons';
import { AppContextData } from '@/context';

import { useContext, useEffect, useRef, useState } from 'react';
import ChatBox from './chatbox';

export default function ChartSection() {
  const [showChat, setShowChat] = useState(false);

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<TChatMessage[]>([]);

  const { socket, userName } = useContext(AppContextData);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  function sendMessage() {
    const messageBody = { message, byWho: userName };
    socket.emit('onMessaging', messageBody);
    setChatMessages([...chatMessages, messageBody]);
  }
  const scrollToLastFruit = () => {
    chatBodyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  function toggleShowChat() {
    // scrollToLastFruit();

    // chatBodyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    chatInputRef.current?.focus();
    setShowChat(!showChat);
  }

  useEffect(() => {
    if (showChat) {
      scrollToLastFruit();
    }
    socket.on('sendMess', (message) => {
      setChatMessages(message);
    });
    return () => {
      socket.off('sendMess');
    };
  }, [showChat]);

  return (
    <section className=" h-full  absolute  top-0 left-0 w-full">
      <div
        className={` ${
          showChat ? 'right-8' : '-right-[30rem]'
        } absolute w-[22rem] rounded-lg   shadow-lg h-[80%] bg-white bottom-14 z-20 transition-all  `}
      >
        <div
          ref={chatBodyRef}
          className=" h-[90%] bg-GRAY_02 p-3 rounded-t-lg  overflow-y-auto"
        >
          {chatMessages.map(({ message, byWho }, id) => (
            <ChatBox
              key={id}
              isYou={byWho == userName}
              message={message}
              userName={userName}
            />
          ))}
        </div>
        <div className="absolute  left-1 bottom-1 right-1 z-[99] bg-white ">
          <div className="flex space-x-3 items-center pe-3 border-2 rounded-md ">
            <input
              ref={chatInputRef}
              type="text"
              placeholder="message..."
              onChange={(e) => setMessage(e.target.value)}
              className=" inline-block w-full h-10 px-2 focus:outline-none "
            />
            <SendSvg
              onClick={sendMessage}
              className=" w-4 rotate-90 text-BLUE_01 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 z-10 ">
        <span
          onClick={toggleShowChat}
          className=" inline-block p-3 bg-white ring-4  rounded-full cursor-pointer "
        >
          {!showChat ? (
            <ChatSvg className=" w-4 h-4 text-BLUE_01 cursor-pointer" />
          ) : (
            <CloseSvg className=" w-4 h-4 text-RED_01 cursor-pointer" />
          )}
        </span>
      </div>
    </section>
  );
}
