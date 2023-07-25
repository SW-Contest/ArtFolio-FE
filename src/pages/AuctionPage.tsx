import Layout from "../components/ui/Layout";
import Header from "../components/ui/Header";
import Carousel from "../components/auction/list/Carousel";
import AuctionListWrapper from "../components/auction/list/AuctionListWrapper";
import SearchBar from "../components/ui/SearchBar";

const AuctionPage = () => {
  return (
    <Layout>
      <Header />
      <Carousel />
      <SearchBar />
      <AuctionListWrapper />
    </Layout>
  );
};

export default AuctionPage;
