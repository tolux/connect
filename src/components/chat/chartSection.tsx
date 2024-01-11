import { TChatMessage } from '@/@types/app.types';
import { ChatSvg, CloseSvg, SendSvg } from '@/assets/icons';

import {
  FormEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import ChatBox from './chatbox';
import { AppContextData } from '@/context/appProvider';

export default function ChartSection() {
  const [showChat, setShowChat] = useState(false);

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<TChatMessage[]>([]);

  const { socket, userName } = useContext(AppContextData);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  function sendMessage(e: FormEvent) {
    e.preventDefault();
    if (message.trim() === '') return;

    scrollToBottom();
    const messageBody = { message, byWho: userName };
    socket.emit('onMessaging', messageBody);
    setChatMessages([...chatMessages, messageBody]);
    setMessage('');
  }

  function scrollToBottom() {
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }

  function toggleShowChat() {
    chatInputRef.current?.focus();
    scrollToBottom();
    setShowChat(!showChat);
  }

  useLayoutEffect(() => {
    socket.on('sendAllMess', (message) => {
      setChatMessages(message);
    });
  }, []);

  useEffect(() => {
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
        } fixed w-[22rem] rounded-lg   shadow-lg h-[80%] bg-white bottom-14 z-20 transition-all  `}
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
          <form
            action=""
            className="flex space-x-3 items-center pe-3 border-2 rounded-md"
            onSubmit={sendMessage}
          >
            <input
              ref={chatInputRef}
              type="text"
              value={message}
              placeholder="message..."
              onChange={(e) => setMessage(e.target.value)}
              className=" inline-block w-full h-10 px-2 focus:outline-none "
            />
            <button className=" border-none" type="submit">
              <SendSvg
                onClick={sendMessage}
                className=" w-4 rotate-90 text-BLUE_01 cursor-pointer"
              />
            </button>
          </form>
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
