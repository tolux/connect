import { AppContextData } from '@/context/appProvider';
import { useContext } from 'react';

const messageType = [
  'Processing...',
  'reconnecting...',
  'Setting up your devices',
];

export default function MeetingSpinner() {
  const { isLoadingMeeting, meetingMessage } = useContext(AppContextData);
  return isLoadingMeeting ? (
    <section className=" fixed w-full bg-black h-full flex justify-center items-center flex-col z-50">
      <div className=" text-white flex space-x-3 items-center">
        {messageType.includes(meetingMessage) ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : null}
        <span className=" font-semibold text-lg">{meetingMessage}</span>
      </div>
    </section>
  ) : null;
}
