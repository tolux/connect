import { CONNECT_ROOM_URL } from './data';
import { useContext, useEffect, useState } from 'react';
import { AppContextApi, AppContextData } from './context/appProvider';
import { CheckSvg, CopySvg } from './assets/icons';
import { useRouting } from './hooks/routing';

const meetingPageLink = `${window.location}${CONNECT_ROOM_URL}?switch=meeting&link=`;
function App() {
  const { socket, meetLink } = useContext(AppContextData);
  const { setAppData } = useContext(AppContextApi);
  const [isCopy, setIsCopy] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const { switchUrl } = useRouting();

  function createLink() {
    socket.emit('createLink');
    setIsLink(true);
  }

  function goToPage() {
    switchUrl(`meeting&link=${meetLink}`, CONNECT_ROOM_URL);
  }

  function copyLink() {
    navigator.clipboard.writeText(`${meetingPageLink}${meetLink}`);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
      setIsLink(false);
      goToPage();
    }, 3000);
  }

  useEffect(() => {
    socket.connect();
    socket.on('sendLink', (link) => {
      setAppData('meetLink', link);
    });
  }, []);

  return (
    <main className="h-full relative">
      <div className=" flex justify-center items-center h-full">
        <div
          className={` ${
            meetLink && isLink ? 'top-3' : '-top-20'
          } transition-all   absolute left-[50%] -translate-x-[50%]  `}
        >
          <div className=" p-3 rounded-md shadow-lg  text-lg flex items-center space-x-5 ">
            <span>
              {' '}
              Connect Link:
              <span className=" underline ms-3">{meetLink}</span>
            </span>
            {!isCopy ? (
              <span
                onClick={copyLink}
                className="p-[10px] cursor-pointer animate-bounce mt-1 rounded-full  bg-blue-700 inline-block "
              >
                <CopySvg className=" w-4 h-4  text-white" />
              </span>
            ) : (
              <div className=" relative ">
                <span className="p-[10px] cursor-pointer  mt-1 rounded-full bg-green-600 inline-block ">
                  <CheckSvg className=" w-4 h-4  text-white" />
                </span>
                <span className=" absolute -bottom-2 left-[50%] -translate-x-[50%] text-sm">
                  copied
                </span>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={createLink}
          className=" border rounded-md  p-3 capitalize"
        >
          create connect{' '}
        </button>
      </div>
    </main>
  );
}

export default App;
