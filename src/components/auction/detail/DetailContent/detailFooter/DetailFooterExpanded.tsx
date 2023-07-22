import { motion } from "framer-motion";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { AuctionInfo } from "../../../../../types/auction.type";

interface DetailFooterExpandedProps {
  onBidChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBidSet: (value: number) => void;
  auctionInfo: AuctionInfo;
  bidPrice: number;
}

const DetailFooterExpanded = (props: DetailFooterExpandedProps) => {
  const priceButton = [
    { title: "+1천원", value: props.bidPrice + 1000 },
    { title: "+1만원", value: props.bidPrice + 10000 },
    { title: "+5만원", value: props.bidPrice + 50000 },
    { title: "현재가", value: props.auctionInfo.currentPrice },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full gap-4"
    >
      <div className="flex items-center w-full h-10 justify-evenly">
        <button
          className="h-full bg-gray-200 btn btn-sm hover:bg-gray-300"
          onClick={() => props.onBidSet(props.bidPrice - 1)}
        >
          <AiOutlineMinus size={24} />
        </button>
        <motion.input
          type="number"
          key={props.auctionInfo.currentPrice}
          initial={{ color: "#000000" }}
          animate={{ color: ["#FF008A", "#000000"] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-2xl font-semibold text-center bg-transparent"
          onChange={props.onBidChange}
          value={props.bidPrice}
        />
        <button
          className="h-full bg-gray-200 btn btn-sm hover:bg-gray-300"
          onClick={() => props.onBidSet(props.bidPrice + 1)}
        >
          <AiOutlinePlus size={24} />
        </button>
      </div>
      <div className="flex items-center w-full h-10 justify-evenly">
        {priceButton.map((pb) => (
          <button
            key={pb.title}
            onClick={() => props.onBidSet(pb.value)}
            className="w-1/5 h-full bg-gray-200 btn btn-sm hover:bg-gray-300"
          >
            {pb.title}
          </button>
        ))}
      </div>
    </motion.section>
  );
};

export default DetailFooterExpanded;
