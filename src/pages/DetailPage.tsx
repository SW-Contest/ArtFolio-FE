import Layout from "../components/ui/Layout";
import { useParams } from "react-router-dom";
import Header from "../components/ui/Header";
import { dummyItems } from "../components/list/ListWrapper";

const DetailPage = () => {
  const id = Number(useParams().id);

  const item = dummyItems.filter((item) => item.id === id)[0];

  return (
    <Layout>
      <Header />
      <img
        className="flex shrink-0 object-contain w-full h-80"
        src="/src/assets/img/penguin.jpeg"
      />
      <section className="p-2">
        <p className=" font-bold text-sm truncate">{item.artist}</p>
        <p className="w-full font-normal text-sm mb-1 truncate">{item.title}</p>
        <div className="flex justify-between items-center">
          <p className=" font-normal text-xs text-gray-400 mb-1">현재가</p>
          <p className=" font-medium text-lg">{item.curPrice}원</p>
        </div>
        <div className=" border-b-2 p-1 mb-2"></div>
        <p className=" font-semibold text-sm truncate">작품 설명</p>
        <p className="w-full font-normal text-sm mb-1 ">
          사랑의 않는 싹이 뼈 그들의 아니다. 구하지 힘차게 불어 아름답고 운다.
          실현에 위하여, 앞이 주며, 두기 청춘을 맺어, 피어나는 남는 끓는다.
          인간의 사는가 귀는 이것이야말로 커다란 얼음 그들의 할지니, 보내는
          아니다. 인생을 웅대한 그들은 것이다. 날카로우나 끓는 소담스러운
          칼이다. 이성은 날카로우나 무한한 운다. 인간은 위하여 봄날의 말이다.
          별과 무한한 뼈 풍부하게 그림자는 힘있다. 열매를 목숨이 남는
          방황하여도, 장식하는 발휘하기 동력은 바이며, 눈이 힘있다. 귀는 영락과
          놀이 시들어 이상은 봄날의 이것이다. 같지 못하다 꾸며 교향악이다.
          과실이 이것이야말로 거선의 그들의 청춘에서만 역사를 봄바람이다.
          사라지지 이상 이상의 노래하며 우리 것은 인간은 이상의 듣는다. 곧 끓는
          인생을 두기 피가 할지라도 끓는다. 그들은 이성은 풀이 그들은 풀밭에
          피에 청춘은 용감하고 위하여, 것이다. 그들의 이상을 긴지라 굳세게
          곳으로 이상 얼마나 구하지 교향악이다. 돋고, 대한 이는 사막이다.
        </p>
      </section>
    </Layout>
  );
};

export default DetailPage;
