import Header from "../components/ui/Header";
import Layout from "../components/ui/Layout";

import DetailContent from "../components/auction/detail/detailContent/DetailContent";
import HeartAnimation from "../components/ui/HeartAnimation";

const DetailPage = () => {
  return (
    <Layout>
      <Header />
      <HeartAnimation />
      <DetailContent />
    </Layout>
  );
};

export default DetailPage;
