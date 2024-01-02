import { TIconBtn } from '@/@types/components.types';
import { CheckSvg } from '@/assets/icons';

export default function IconBtn({ Icon, state }: TIconBtn) {
  return (
    <button
      className={` ${
        state && 'bg-slate-300'
      } border p-3  rounded-md relative  hover:bg-slate-300`}
    >
      {Icon}
      {state && (
        <CheckSvg className=" w-3 absolute bottom-1 right-1 text-blue-500" />
      )}
    </button>
  );
}
