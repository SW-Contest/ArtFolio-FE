import Layout from "../components/ui/Layout";
import { useParams } from "react-router-dom";
import Header from "../components/ui/Header";
import { dummyItems } from "../components/list/ListWrapper";
import DetailCarousel from "../components/detail/DetailCarousel";
import BidButton from "../components/detail/BidButton";
import OutlineButton from "../components/ui/OutlineButton";
import { useEffect, useState, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import UserIcon from "../components/ui/UserIcon";
import CircleButton from "../components/ui/CircleButton";
import RoundedButton from "../components/ui/RoundedButton";
import DetailFooter from "../components/detail/DetailFooter";

const DetailPage = () => {
  const id = Number(useParams().id);

  const item = dummyItems.filter((item) => item.id === id)[0];

  const client = useRef<any>({});

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://3.37.192.223:8080/test",
      onConnect: () => {
        console.log("success");
        subscribe();
      },
    });
    client.current.activate();
  };

  const publish = () => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/price",
      body: JSON.stringify({
        auctionId: 1,
        curPrice: 1000,
      }),
    });
  };

  const subscribe = () => {
    client.current.subscribe("/sub/channel/" + 1, (body: any) => {
      const json_body = JSON.parse(body.body);
      console.log(json_body);
    });
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  return (
    <Layout>
      <Header />
      <DetailCarousel />
      <section className="flex flex-col p-2 font-Pretendard mb-6">
        <article className="flex justify-between w-full py-2">
          <p className="text-xl font-bold ">{item.title}</p>
          <p className="text-xl font-bold text-af-hotPink ">
            {item.curPrice}원
          </p>
        </article>

        <article className="flex items-center w-full gap-4 p-4 mb-4 rounded-md bg-af-lightGray">
          <UserIcon url="/src/assets/img/cat.jpeg" />
          <div className="flex flex-col justify-between grow">
            <p className="text-sm font-bold truncate ">{item.artist}</p>

            <p className="text-xs font-light">최근 거래 작품 n</p>
          </div>
          <CircleButton>작가 Home</CircleButton>
        </article>

        <article className="mb-4">
          <p className="mb-2 text-sm font-semibold">작품 설명</p>
          <p className="w-full mb-1 text-sm font-normal ">
            사랑의 않는 싹이 뼈 그들의 아니다. 구하지 힘차게 불어 아름답고 운다.
            실현에 위하여, 앞이 주며, 두기 청춘을 맺어, 피어나는 남는 끓는다.
            인간의 사는가 귀는 이것이야말로 커다란 얼음 그들의 할지니, 보내는
            아니다. 인생을 웅대한 그들은 것이다. 날카로우나 끓는 소담스러운
            칼이다. 이성은 날카로우나 무한한 운다. 인간은 위하여 봄날의 말이다.
            별과 무한한 뼈 풍부하게 그림자는 힘있다. 열매를 목숨이 남는
            방황하여도, 장식하는 발휘하기 동력은 바이며, 눈이 힘있다. 귀는
            영락과 놀이 시들어 이상은 봄날의 이것이다. 같지 못하다 꾸며
            교향악이다. 과실이 이것이야말로 거선의 그들의 청춘에서만 역사를
            봄바람이다. 사라지지 이상 이상의 노래하며 우리 것은 인간은 이상의
            듣는다. 곧 끓는 인생을 두기 피가 할지라도 끓는다. 그들은 이성은 풀이
            그들은 풀밭에 피에 청춘은 용감하고 위하여, 것이다. 그들의 이상을
            긴지라 굳세게 곳으로 이상 얼마나 구하지 교향악이다. 돋고, 대한 이는
            사막이다.
          </p>
        </article>

        <article className="mb-4">
          <section className="w-full mb-4">
            <p className="mb-2 text-sm font-semibold">경매 내역</p>
            <div className="flex justify-between py-1 border-b">
              <p className="w-1/2 text-xs font-light text-left">입찰자</p>
              <p className="w-1/2 text-xs font-light text-right">입찰가</p>
            </div>
            <div className="flex justify-between py-1">
              <p className="w-1/2 text-xs font-light text-left">김김김</p>
              <p className="w-1/2 text-xs font-light text-right">100,000</p>
            </div>
            <div className="flex justify-between py-1">
              <p className="w-1/2 text-xs font-light text-left">김김김</p>
              <p className="w-1/2 text-xs font-light text-right">100,000</p>
            </div>
            <div className="flex justify-between py-1">
              <p className="w-1/2 text-xs font-light text-left">김김김</p>
              <p className="w-1/2 text-xs font-light text-right">100,000</p>
            </div>
          </section>

          <div className="flex justify-center w-full">
            <OutlineButton>전체보기 {">"}</OutlineButton>
          </div>
        </article>
      </section>
      <DetailFooter />
    </Layout>
  );
};

export default DetailPage;
