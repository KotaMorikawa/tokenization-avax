import { MdAgriculture, MdList } from "react-icons/md";
import LinkToPageButton from "../Button/LinkToPageButton";

const HomeContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-8">
        <LinkToPageButton
          linkTo={"/farmerPage"}
          iconLeft={<MdAgriculture className="w-14 h-14" />}
          description={"For Farmer"}
        />
      </div>
      <div className="my-8">
        <LinkToPageButton
          linkTo={"/buyerPage"}
          iconLeft={<MdList className="w-14 h-14" />}
          description={"For Buyer"}
        />
      </div>
    </div>
  );
};
export default HomeContainer;
