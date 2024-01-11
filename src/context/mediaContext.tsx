import {
  TAppProviderApi,
  TChildrenProp,
  TInitialMediaState,
  TReducerAction,
} from '@/@types/app.types';
import { RefObject, createContext, useMemo, useReducer } from 'react';

const initialApiState = {
  setAppData: () => {},
  startConnect: () => {},
};

const initialState = {
  IsAudio: true,
  IsVideo: true,
  stream: {} as MediaStream,
  isHost: true,
  streamTrack: [],
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
  createContext<TAppProviderApi<TInitialMediaState>>(initialApiState);

export function MediaContextProvider({ children }: TChildrenProp) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function streamData(): Promise<MediaStream> {
    return await navigator.mediaDevices.getUserMedia({
      audio: state.IsAudio,
      video: state.IsVideo,
    });
  }

  // async function init() {
  //   try {
  //     const stream = await streamData();

  //     dispatch({ type: 'stream', payload: stream });

  //     // handleSuccess(stream);
  //   } catch (e) {
  //     // handleError(e);
  //     console.log(e);
  //   }
  // }

  async function startConnect(videoRef: RefObject<HTMLVideoElement>) {
    // console.log(state.stream, 'sterem from state');
    // await init();
    const stream = await streamData();
    dispatch({ type: 'stream', payload: stream });
    const streamTrack = state.isHost
      ? stream.getTracks()
      : stream.getTracks()[0];
    dispatch({ type: 'streamTrack', payload: streamTrack });
    const videoTracks = stream.getVideoTracks();
    // console.log(stream, 'Got stream with constraints:');
    console.log(`Using video device: ${videoTracks[0].label}`);
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }

  const api = useMemo(() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setAppData: (type: keyof TInitialMediaState, payload: any) =>
        dispatch({ type, payload }),

      startConnect: startConnect,
    };
  }, []);

  const data = useMemo(() => {
    console.log(state, 'Got stream with constraints:');
    return {
      IsAudio: state.IsAudio,
      IsVideo: state.IsVideo,
      stream: state.stream,
      isHost: state.isHost,
      streamTrack: state.streamTrack,
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
