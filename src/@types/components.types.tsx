import { ReactNode } from 'react';

export interface TIconBtn {
  Icon: ReactNode;
  state?: boolean;
}

export interface IMediaIcon extends TIconBtn {
  size?: string;
  className?: string;
}
