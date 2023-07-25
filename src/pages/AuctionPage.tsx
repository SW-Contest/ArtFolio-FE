import Layout from "../components/ui/Layout";
import Header from "../components/ui/Header";
import AuctionContent from "../components/auction/auctionContent/AuctionContent";

const AuctionPage = () => {
  return (
    <Layout>
      <Header main />
      <AuctionContent />
    </Layout>
  );
};

export default AuctionPage;
