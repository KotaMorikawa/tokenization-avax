"use client";

type Props = {
  title: string;
  onClick: () => void;
  disable: boolean;
};

const ActionButton = ({ title, onClick, disable }: Props) => {
  return (
    <button
      className="bg-green-600 border border-gray-300 rounded-md text-white font-semibold text-sm leading-5 py-2 px-4 hover:bg-green-700 disabled:bg-gray-700"
      onClick={() => onClick()}
      disabled={disable}
    >
      {title}
    </button>
  );
};

export default ActionButton;
