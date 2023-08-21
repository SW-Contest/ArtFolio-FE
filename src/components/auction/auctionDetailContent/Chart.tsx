import { ResponsiveLine, CustomLayerProps, Layer } from "@nivo/line";
import { chartDataProps } from "./BidList";
import { DotsItem } from "@nivo/core";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ChartProps {
  chartData: chartDataProps[];
  startPrice: number;
}

// customLayer를 통해 마지막 point에만 표시합니다.
function LastPoint({ points, ...props }: CustomLayerProps) {
  const shownPoints = points.slice(-1);

  // 마지막 포인트의 x와 y가 변경될 때마다 ping 애니메이셔을 재랜더링 하기 위한 key
  const pingKey = "key" + String(shownPoints[0].x) + String(shownPoints[0].y);

  return (
    <>
      {/* 포인트 */}
      <g>
        {shownPoints.map((point) => (
          <DotsItem
            key={point.id}
            x={point.x}
            y={point.y}
            datum={point.data}
            symbol={props.pointSymbol as any}
            size={props.pointSize!}
            color={point.color}
            borderWidth={props.pointBorderWidth!}
            borderColor={point.borderColor}
            labelYOffset={props.pointLabelYOffset}
          />
        ))}
      </g>
      {/* ping 애니메이션 효과 */}
      {/* 위에서 만든 key를 사용하여 화면 크기가 변하면 재렌더링 되도록 함  */}
      <motion.g
        key={pingKey}
        className="animate-custom-ping"
        animate={{ scale: 1 }}
      >
        {shownPoints.map((point) => (
          <DotsItem
            key={point.id}
            x={point.x}
            y={point.y}
            datum={point.data}
            symbol={props.pointSymbol as any}
            size={props.pointSize!}
            color={point.color}
            borderWidth={props.pointBorderWidth!}
            borderColor={point.borderColor}
            labelYOffset={props.pointLabelYOffset}
          />
        ))}
      </motion.g>
    </>
  );
}

const Chart = (props: ChartProps) => {
  return (
    <div className="w-full h-[200px] px-2">
      <ResponsiveLine
        layers={
          [
            "grid",
            "axes",
            "areas",
            "lines",
            "crosshair",
            "slices",
            "mesh",
            "legends",
            LastPoint,
          ] as Layer[]
        }
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 9,
                fontFamily: "Pretendard",
              },
            },
          },
        }}
        defs={[
          {
            id: "gradient",

            type: "linearGradient",

            colors: [
              { offset: 50, color: "#FF008A" },
              { offset: 100, color: "white" },
            ],
          },
        ]}
        fill={[{ match: "*", id: "gradient" }]}
        colors={"#FF008A"}
        data={props.chartData}
        margin={{ top: 20, right: 25, bottom: 40, left: 60 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        areaBaselineValue={props.startPrice}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (tick) => {
            const dateObj = new Date(tick);

            const tickDate = new Intl.DateTimeFormat("ko-KR", {
              day: "2-digit",
              // timeStyle: "short",
            }).format(dateObj);

            const tickTime = new Intl.DateTimeFormat("ko-KR", {
              // day: "2-digit",
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            }).format(dateObj);

            return tickDate + " " + tickTime;
          },

          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          format: (tick) => tick + "원",
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        lineWidth={3}
        pointSize={10}
        pointColor={"#FF008A"}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel={(e) => e.x + ": " + e.y}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.6}
        isInteractive={false}
        enableCrosshair={false}
        useMesh={true}
        motionConfig="stiff"
        enablePoints={false}
      />
    </div>
  );
};

export default Chart;
