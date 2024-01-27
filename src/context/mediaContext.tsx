import {
  TChildrenProp,
  TInitialMediaState,
  TMediaProviderApi,
  TReducerAction,
} from '@/@types/app.types';
import {
  RefObject,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { AppContextApi } from './appProvider';

const initialApiState = {
  setMediaFn: () => {},
  startConnect: () => {},
};

const initialState = {
  isAudio: false,
  isVideo: false,
  stream: {} as MediaStream,
  isHost: true,
};

function reducer(
  state: TInitialMediaState,
  { type, payload }: TReducerAction<TInitialMediaState>
): TInitialMediaState {
  if (type) {
    return {
      ...state,
      [type]: payload,
    };
  }
  return state;
}

export const MediaContextData = createContext<TInitialMediaState>(initialState);
export const MediaContextApi =
  createContext<TMediaProviderApi<TInitialMediaState>>(initialApiState);

export function MediaContextProvider({ children }: TChildrenProp) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setAppFn } = useContext(AppContextApi);

  async function streamData(): Promise<MediaStream> {
    setAppFn('isLoadingMeeting', true);
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
  }

  function muteVideoAndAudio(stream: MediaStream) {
    const [audioTrack, videoTrack] = stream.getTracks();
    audioTrack.enabled = false;
    videoTrack.enabled = false;
    setAppFn('isLoadingMeeting', false);
  }

  async function startConnect(videoRef: RefObject<HTMLVideoElement>) {
    // remember to check for permission first
    const stream = await streamData();
    dispatch({ type: 'stream', payload: stream });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      muteVideoAndAudio(stream);
    }
  }

  const api = useMemo(() => {
    return {
      setMediaFn: (
        type: keyof TInitialMediaState,
        payload: TInitialMediaState[keyof TInitialMediaState]
      ) => dispatch({ type, payload }),
      startConnect: startConnect,
    };
  }, []);

  const data = useMemo(() => {
    return {
      isAudio: state.isAudio,
      isVideo: state.isVideo,
      stream: state.stream,
      isHost: state.isHost,
    };
  }, [state]);

  return (
    <MediaContextData.Provider value={data}>
      <MediaContextApi.Provider value={api}>
        {children}
      </MediaContextApi.Provider>
    </MediaContextData.Provider>
  );
}
