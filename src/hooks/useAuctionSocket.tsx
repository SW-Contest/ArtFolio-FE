import { useRef, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";
import { HOST } from "../constants/host";

// 해당 경매와 연결된 웹소켓을 생성하고, 해당 경매의 경매가를 갱신하는 커스텀 훅입니다.
export default function useAuctionSocket(
  auctionId: string | undefined,
  callback: () => void
) {
  const client = useRef<StompJs.Client | null>(null);

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `ws://${HOST}/sock`,
      onConnect: () => {
        // console.log("success");
        subscribe();
      },
    });
    client.current.activate();
  };

  const publish = (body: { bidderId: number; bidPrice: number }) => {
    if (!client.current?.connected) return;

    client.current.publish({
      destination: "/app/price",
      body: JSON.stringify({
        auctionId: auctionId,
        bidderId: body.bidderId,
        price: body.bidPrice,
      }),
    });
  };

  const subscribe = () => {
    // console.log("subscribe");
    // 정상 응답 구독 경로
    client.current?.subscribe("/topic/channel/" + auctionId, (body: any) => {
      const json_body = JSON.parse(body.body);
      console.log(json_body);

      // 웹소켓 응답이 올 시 데이터를 재요청합니다.
      callback();
    });

    // 예외 발생시 응답 구독 경로
    client.current?.subscribe("/user/queue/errors", (body: any) => {
      const json_body = JSON.parse(body.body);
      console.log(json_body);
    });
  };

  const disconnect = () => {
    // console.log("disconnect");
    client.current?.deactivate();
  };

  return [publish];
}
