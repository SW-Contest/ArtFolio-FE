import { ResponsiveLine } from "@nivo/line";
import { chartDataProps } from "./BidList";

interface ChartProps {
  chartData: chartDataProps[];
  startPrice: number;
}
// TODO : customLayer를 통해 point 특정 부분에만 표시 구현
const Chart = (props: ChartProps) => {
  return (
    <div className="w-full h-[200px]">
      <ResponsiveLine
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 9,
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
        margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
        xScale={{
          // format: "%Y-%m-%d %H:%M:%SZ",
          type: "point",

          // min: "auto",
          // max: "auto",
          // nice: true,
          // useUTC: true,
          // precision: "hour",
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

            const tickDate = new Intl.DateTimeFormat("ko", {
              day: "2-digit",
              // timeStyle: "short",
            }).format(dateObj);

            const tickTime = new Intl.DateTimeFormat("ko", {
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
        pointColor={{ theme: "background" }}
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
