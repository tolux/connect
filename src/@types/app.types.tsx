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
};

export type TMediaProvider = {
  stream: MediaStream;
};
export type TInitialMediaState = {
  isAudio: boolean;
  isVideo: boolean;
  stream: MediaStream;
  isHost: boolean;
};
export type TAppProviderApi<T> = {
  setAppFn: (type: keyof T, payload: T[keyof T]) => void;
};
export type TMediaProviderApi<T> = {
  setMediaFn: (type: keyof T, payload: T[keyof T]) => void;
  startConnect: (videoRef: RefObject<HTMLVideoElement>) => void;
};

export type TReducerAction<T> = {
  type: keyof T;
  payload?: T[keyof T];
};

export type TChatMessage = { message: string; byWho: string };
export type TChatBox = {
  isYou: boolean;
  userName: string;
  message: string;
};
