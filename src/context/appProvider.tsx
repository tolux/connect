import {
  TChildrenProp,
  TAppProvider,
  TReducerAction,
  TAppProviderApi,
} from '@/@types/app.types';
import { SOCKET_URL } from '@/data';

import { createContext, useMemo, useReducer } from 'react';
import { io } from 'socket.io-client';

const initialApiState = {
  setAppFn: () => {},
};

const socketIo = io(SOCKET_URL, {
  transports: ['websocket'],
});
const initialDataState = {
  userName: '',
  socket: socketIo,
  userCount: 0,
  meetLink: '',
  isLoadingMeeting: true,
  meetingMessage: 'Processing...',
};
function reducer(
  state: TAppProvider,
  action: TReducerAction<TAppProvider>
): TAppProvider {
  if (action.type) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }
  return state;
}

export const AppContextData = createContext<TAppProvider>(initialDataState);
export const AppContextApi =
  createContext<TAppProviderApi<TAppProvider>>(initialApiState);

export const AppContext = createContext<TAppProvider>(initialDataState);

export function AppProvider({ children }: TChildrenProp) {
  const [appState, dispatch] = useReducer(reducer, initialDataState);

  const data = useMemo(() => {
    return {
      userName: appState.userName,
      socket: socketIo,
      userCount: appState.userCount,
      meetLink: appState.meetLink,
      isLoadingMeeting: appState.isLoadingMeeting,
      meetingMessage: appState.meetingMessage,
    };
  }, [appState]);

  const api = useMemo(() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setAppFn: (type: keyof TAppProvider, payload: any) =>
        dispatch({ type, payload }),
    };
  }, []);

  return (
    <AppContextData.Provider value={data}>
      <AppContextApi.Provider value={api}>{children}</AppContextApi.Provider>
    </AppContextData.Provider>
  );
}
