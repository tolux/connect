import { IMediaIcon } from '@/@types/components.types';

export default function MediaIcon({
  Icon,
  state,
  size,
  className,
}: IMediaIcon) {
  function sizeType() {
    if (size === 'md') {
      return 'p-4';
    }
    if (size === 'lg') {
      return 'p-5';
    }
    return 'p-3';
  }
  return (
    <span
      className={` inline-block ${sizeType()} ${className}  cursor-pointer  rounded-xl bg-black/30 text-white relative`}
    >
      {Icon}
      {state && (
        <span
          className=" inline-block w-[95%] absolute left-[50%] top-[50%] -translate-x-[50%] 
    -translate-y-[50%] -rotate-45
    h-[1.5px] bg-white"
        ></span>
      )}
    </span>
  );
}
