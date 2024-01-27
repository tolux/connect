import { ReactNode, RefObject } from 'react';
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
  meetLink: string;
  isLoadingMeeting: boolean;
  meetingMessage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

export type TMediaProvider = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stream: any;
};
export type TInitialMediaState = {
  isAudio: boolean;
  isVideo: boolean;
  stream: MediaStream;
  isHost: boolean;
};
export type TAppProviderApi<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAppFn: (type: keyof T, payload: any) => void;
};
export type TMediaProviderApi<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMediaFn: (type: keyof T, payload: any) => void;
  startConnect: (videoRef: RefObject<HTMLVideoElement>) => void;
};

export type TReducerAction<T> = {
  type: keyof T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

export type TChatMessage = { message: string; byWho: string };
export type TChatBox = {
  isYou: boolean;
  userName: string;
  message: string;
};
