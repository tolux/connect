import { AppContextData } from '@/context/appProvider';
import avatar1 from '../assets/testimg/avatar1.png';
import avatar2 from '../assets/testimg/avatar2.png';
import avatar3 from '../assets/testimg/avatar3.png';
import avatar4 from '../assets/testimg/avatar4.png';
import avatar5 from '../assets/testimg/avatar5.png';
import { AudioSvg, CameraSvg } from '@/assets/icons';
import IconBtn from '@/components/element/iconBtn';

import { useRouting } from '@/hooks/routing';
import { useContext, useRef } from 'react';
import { MediaContextApi, MediaContextData } from '@/context/mediaContext';

const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5];

export default function WaitRoom() {
  const { switchUrl } = useRouting();
  const { userCount } = useContext(AppContextData);
  const { startConnect, setAppData } = useContext(MediaContextApi);
  const { stream, IsVideo } = useContext(MediaContextData);
  const videoRef = useRef<HTMLVideoElement>(null);
  // () => switchUrl('meeting')

  function stopMeeting() {
    const tract = stream.getTracks()[0];
    // tract.stop();
    tract.enabled = false;
    console.log(tract);
  }

  return (
    <section className=" bg-">
      <div className=" flex items-center justify-center space-x-5 mt-16 ">
        <div className="flex -space-x-4 rtl:space-x-reverse justify-center ">
          {avatarImages.map((imgSrc, i) => (
            <img
              key={i}
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src={imgSrc}
              alt=""
            />
          ))}

          <a
            className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
            href="#"
          >
            +{userCount}
          </a>
        </div>
        <p className=" text-lg capitalize font-semibold">connected</p>
      </div>
      <div className="mt-20">
        <p className=" font-bold text-lg text-center mt-6">Join With</p>
        <div className=" justify-center flex mt-6 space-x-8">
          <IconBtn Icon={<AudioSvg className=" w-8" />} state />

          <span onClick={() => setAppData('IsVideo', !IsVideo)}>
            <IconBtn Icon={<CameraSvg className=" w-8" />} />
          </span>
        </div>
        <div className="mt-6 text-center ">
          <button
            onClick={() => startConnect(videoRef)}
            className=" bg-BLUE_01 text-white p-3 hover:bg-BLUE_01/90 rounded-md "
          >
            Join Meeting
          </button>
        </div>
        <div className="p-3">
          <div className=" max-w-[20rem] mx-auto  bg-red-300 ">
            {/* <video
              className=" h-auto w-full"
              ref={videoRef}
              autoPlay
              playsInline
            ></video> */}
          </div>
        </div>
      </div>
    </section>
  );
}
