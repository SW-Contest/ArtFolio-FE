import { rest } from "msw";
import { dummyAuctionList, dummyAuctionList2, dummyDetail } from "./dummyList";

// get 요청시 더미 리스트를 반환해준다.
export const handlers = [
  rest.get("/rt_auction/list/0", async (req, res, ctx) => {
    await sleep(500);

    return res(ctx.status(200), ctx.json(dummyAuctionList));
  }),
  rest.get("/rt_auction/list/1", async (req, res, ctx) => {
    await sleep(500);

    return res(ctx.status(200), ctx.json(dummyAuctionList2));
  }),
  rest.get("/rt_auction/1", async (req, res, ctx) => {
    await sleep(500);

    return res(ctx.status(200), ctx.json(dummyDetail));
  }),
  // rest.post("/dummyItems", async (req, res, ctx) => {
  //   await sleep(200);
  //   dummyItems.push({
  //     id: "345",
  //     name: "son",
  //     country: "asia",
  //     lang: "php",
  //   });

  //   return res(ctx.status(201), ctx.json(dummyItems));
  // }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
