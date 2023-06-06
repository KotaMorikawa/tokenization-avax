import HomeContainer from "@/components/Container/HomeContainer";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout home>
      <HomeContainer />
    </DefaultLayout>
  );
};
export default Home;
