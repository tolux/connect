import { TChatBox } from '@/@types/app.types';

export default function ChatBox({ isYou, userName, message }: TChatBox) {
  return (
    <div
      className={`${
        isYou ? 'justify-start' : ' justify-end '
      } flex items-start gap-2.5 mt-4 `}
    >
      <div
        className={`  flex flex-col w-full max-w-[320px] relative leading-1.5 p-4 border-gray-200 bg-gray-100  rounded-e-xl`}
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
        <p className="text-sm font-normal py-2.5 text-gray-900 ">{message}</p>
      </div>
    </div>
  );
}
