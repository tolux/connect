import {
  AudioSvg,
  CameraSvg,
  CogSvg,
  PhoneSvg,
  UsersSvg,
  WindowSvg,
} from '@/assets/icons';
import ChartSection from '@/components/chat/chartSection';
import MediaIcon from '@/components/element/mediaIcon';
import MeetingSpinner from '@/components/layout/meetingSpinner';
import { AppContextData } from '@/context/appProvider';
import { MediaContextApi, MediaContextData } from '@/context/mediaContext';
import { useContext, useLayoutEffect, useRef } from 'react';

export default function MeetingRoom() {
  const { userCount } = useContext(AppContextData);
  const { stream, isVideo, isAudio } = useContext(MediaContextData);
  const { startConnect, setMediaFn } = useContext(MediaContextApi);
  const videoRef = useRef<HTMLVideoElement>(null);

  function connect() {
    startConnect(videoRef);
  }
  function toggleMute() {
    const [audio] = stream.getAudioTracks();
    audio.enabled = !isAudio;
    setMediaFn('isAudio', !isAudio);
  }
  function toggleVideo() {
    const [video] = stream.getVideoTracks();
    video.enabled = !isVideo;
    setMediaFn('isVideo', !isVideo);
  }

  useLayoutEffect(() => {
    connect();
  }, []);

  return (
    <>
      <MeetingSpinner />
      <section className="h-full p-3 overflow-hidden relative ">
        <ChartSection />
        <div className=" bg-BLACK_0 h-full rounded-2xl flex items-start border-2 shadow-md p-3 border-GRAY_02">
          <div className=" flex-1 relative h-full">
            <div className="inline-block">
              <div className="  border-2 px-5 py-1 border-GRAY_01 rounded-3xl flex items-center space-x-3">
                <UsersSvg className=" w-4 h-4" /> <span>{userCount}</span>
              </div>
            </div>
            <div className="mt-8 ">
              <div className=" grid grid-cols-4 space-x-3  ">
                <div className=" rounded-3xl border-2  w-full h-[15rem]  relative">
                  <video
                    className="  w-full h-full object-fill "
                    ref={videoRef}
                    autoPlay
                    playsInline
                  ></video>
                  <span className=" px-2 py-1 rounded-xl bg-black/30 text-white absolute bottom-2 right-2">
                    Tolu
                  </span>

                  <span onClick={toggleMute} className="absolute top-2 right-2">
                    <MediaIcon
                      state={!isAudio}
                      Icon={<AudioSvg className="w-4" />}
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute w-full flex justify-center bottom-2 space-x-4 items-center">
              <MediaIcon size="md" Icon={<AudioSvg className="w-4" />} />
              <span onClick={toggleVideo}>
                <MediaIcon
                  size="md"
                  state={!isVideo}
                  Icon={<CameraSvg className="w-4 h-4" />}
                />
              </span>
              <MediaIcon
                size="lg"
                className=" !bg-RED_01"
                Icon={<PhoneSvg className=" h-6 text-white rotate-[135deg]" />}
              />
              <MediaIcon size="md" Icon={<WindowSvg className="w-6 h-4" />} />
              <MediaIcon size="md" Icon={<CogSvg className="w-6 h-4" />} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
