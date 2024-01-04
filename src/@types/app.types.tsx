import { ReactNode } from 'react';
import { Socket } from 'socket.io-client';

export type TChildrenProp = {
  children: ReactNode;
};

export interface TWaitRoom {
  userCount: number;
}
export interface TChartSection {
  sendMessage: (message: string) => void;
}
export interface TMeetingRoom extends TWaitRoom {}

export type TMessage = {
  userId: string;
  message: string;
};

export type TAppProvider = {
  userName: string;
  socket: Socket;
  userCount: number;
};
export type TAppProviderApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAppData: (type: keyof TAppProvider, payload: any) => void;
};

export type TReducerAction = {
  type: keyof TAppProvider;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

export type TChatMessage = { message: string; byWho: string };
export type TChatBox = {
  isYou: boolean;
  userName: string;
  message: string;
};
