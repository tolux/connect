import { ChatSvg, CloseSvg, SendSvg } from '@/assets/icons';
import { useState } from 'react';

export default function ChartSection() {
  const [showChat, setShowChat] = useState(false);

  return (
    <section>
      <div
        className={` ${
          showChat ? 'right-8' : '-right-[30rem]'
        } fixed w-[22rem] rounded-lg   shadow-lg h-[80%] bg-white bottom-14 z-20 transition-all  `}
      >
        <div className=" h-full bg-GRAY_02 p-3 rounded-t-lg pb-[3rem]"></div>
        <div className="absolute  left-1 bottom-1 right-1 z-[99] bg-white ">
          <div className="flex space-x-3 items-center pe-3 border-2 rounded-md ">
            <input
              type="text"
              placeholder="message..."
              className=" inline-block w-full h-10 px-2 focus:outline-none "
            />
            <SendSvg className=" w-4 rotate-90 text-BLUE_01 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-10 ">
        <span
          onClick={() => setShowChat(!showChat)}
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
