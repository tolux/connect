import {
  TChildrenProp,
  TAppProvider,
  TReducerAction,
  TAppProviderApi,
} from '@/@types/app.types';
import { SOCKET_URL } from '@/data';

import { createContext, useEffect, useMemo, useReducer } from 'react';
import { io } from 'socket.io-client';

const socketIo = io(SOCKET_URL, {
  transports: ['websocket'],
});
const initialDataState = {
  userName: '',
  socket: socketIo,
  userCount: 0,
};

const initialApiState = {
  setAppData: () => {},
};

function reducer(state: TAppProvider, action: TReducerAction): TAppProvider {
  if (action.type) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }
  return state;
}

export const AppContextData = createContext<TAppProvider>(initialDataState);
export const AppContextApi = createContext<TAppProviderApi>(initialApiState);

export const AppContext = createContext<TAppProvider>(initialDataState);

export function AppProvider({ children }: TChildrenProp) {
  const [appState, dispatch] = useReducer(reducer, initialDataState);

  const data = useMemo(() => {
    return {
      userName: appState.userName,
      socket: socketIo,
      userCount: appState.userCount,
    };
  }, [appState]);

  const api = useMemo(() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setAppData: (type: keyof TAppProvider, payload: any) =>
        dispatch({ type, payload }),
    };
  }, []);

  useEffect(() => {
    appState.socket.connect();
    // console.log('form parent');
  }, []);

  return (
    <AppContextData.Provider value={data}>
      <AppContextApi.Provider value={api}>{children}</AppContextApi.Provider>
    </AppContextData.Provider>
  );
}
