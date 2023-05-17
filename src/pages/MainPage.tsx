import Layout from "../components/ui/Layout";
import Header from "../components/ui/Header";
import Carousel from "../components/ui/Carousel";
import ListWrapper from "../components/list/ListWrapper";
import SearchBar from "../components/ui/SearchBar";
import LoginPage from "./LoginPage";

const MainPage = () => {
  return (
    <Layout>
      <Header />
      <Carousel />
      <SearchBar />
      <ListWrapper />
    </Layout>
  
  );
};

export default MainPage;
