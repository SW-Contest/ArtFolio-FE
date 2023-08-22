import Layout from "../components/common/Layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <section className="mt-10 w-full h-full flex flex-col justify-center items-center">
        <p>올바른 경로가 아닙니다.</p>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
