import { TChatBox } from '@/@types/app.types';

export default function ChatBox({ isYou, userName, message }: TChatBox) {
  return (
    <div
      className={`${
        isYou ? 'justify-start' : ' justify-end '
      } flex items-start gap-2.5 mt-4 `}
    >
      <div
        className={`flex flex-col w-full max-w-[320px] relative leading-1.5 py-2  px-3 border-gray-200 bg-white  rounded-xl`}
      >
        <div
          className={` ${
            isYou ? ' justify-end' : ' justify-start'
          } flex items-center space-x-2 rtl:space-x-reverse`}
        >
          <span className="text-sm font-semibold text-gray-900  capitalize">
            {isYou ? 'you' : userName}
          </span>
        </div>
        <p className="text-sm font-normal py-2 text-gray-900 text-wrap ">
          {message}
        </p>
      </div>
    </div>
  );
}
