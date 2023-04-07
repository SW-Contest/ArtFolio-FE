import Layout from "../components/ui/Layout";
import Header from "../components/ui/Header";
import Carousel from "../components/ui/Carousel";
import ListWrapper from "../components/list/ListWrapper";

const MainPage = () => {
  return (
    <Layout>
      <Header />
      <Carousel />
      <ListWrapper />
    </Layout>
  );
};

export default MainPage;
