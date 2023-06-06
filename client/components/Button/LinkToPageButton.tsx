import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

type Props = {
  linkTo: string;
  iconLeft: any;
  description: string;
};

const LinkToPageButton = ({ linkTo, iconLeft, description }: Props) => {
  return (
    <Link href={linkTo}>
      <div className="flex items-center justify-center">
        <div className="p-3">{iconLeft}</div>
        <h2>{description}</h2>
        <MdKeyboardArrowRight className="w-6 h-6" />
      </div>
    </Link>
  );
};
export default LinkToPageButton;
