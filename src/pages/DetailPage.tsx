import Layout from "../components/ui/Layout";
import { useParams } from "react-router-dom";
import Header from "../components/ui/Header";
import { dummyDetail } from "../mocks/dummyList";
import DetailCarousel from "../components/detail/DetailCarousel";

import { useEffect, useState, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import UserIcon from "../components/ui/UserIcon";

import DetailFooter from "../components/detail/DetailFooter";

const DetailPage = () => {
  const auctionId = Number(useParams().auctionId);

  const item = dummyDetail;

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
      <DetailCarousel photoPaths={item.photoPaths} />
      <section className="flex flex-col p-2 mb-40 font-Pretendard">
        <article className="flex justify-between w-full py-2">
          <p className="text-xl font-bold ">{item.artPieceTitle}</p>
          <p className="text-xl font-bold text-af-hotPink ">
            {item.auctionStartPrice}원
          </p>
        </article>

        <article className="flex items-center w-full gap-4 p-4 mb-4 rounded-md bg-af-lightGray">
          <UserIcon url="/src/assets/img/cat.jpeg" />
          <div className="flex flex-col justify-between grow">
            <p className="text-sm font-bold truncate ">{item.artPieceId}</p>

            <p className="text-xs font-light">최근 거래 작품 n</p>
          </div>
          {/* <CircleButton>작가 Home</CircleButton> */}
          <button className="border-0 rounded-full btn btn-sm bg-af-hotPink hover:bg-af-hotPink">
            작가 Home
          </button>
        </article>

        <article className="mb-4">
          <p className="mb-2 text-sm font-semibold">작품 설명</p>
          <p className="w-full mb-1 text-sm font-normal ">
            {item.auctionContent}
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
            <label htmlFor="my-modal-4" className="btn btn-ghost">
              전체보기 {">"}
            </label>
          </div>

          {/* 모달 내용 */}
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="cursor-pointer modal">
            <label className="modal-box relative w-[350px]" htmlFor="">
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
            </label>
          </label>
        </article>
      </section>
      <DetailFooter />
    </Layout>
  );
};

export default DetailPage;
