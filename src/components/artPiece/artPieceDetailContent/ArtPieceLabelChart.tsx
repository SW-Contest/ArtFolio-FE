import { FcFlashOn } from "react-icons/fc";
import { ResponsivePie } from "@nivo/pie";
import { AiInfoLabel } from "../../../types/ai.type";

interface ArtPieceLabelChartProps {
  labels: AiInfoLabel[];
}
const ArtPieceLabelChart = ({ labels }: ArtPieceLabelChartProps) => {
  const pieChartData = labels.map((label) => {
    return {
      id: label.name,
      label: label.name,
      value: label.confidence.toFixed(1),
    };
  });

  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center">
        <FcFlashOn size={24} />
        <h3 className="text-sm font-semibold ">AI가 분석한 작품 태그</h3>
      </div>
      <div className="w-full h-64">
        <ResponsivePie
          isInteractive={false}
          margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
          data={pieChartData}
          innerRadius={0.4}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabel={(e) => e.value + "%"}
          arcLinkLabelsDiagonalLength={5}
          arcLabel="id"
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
        />
      </div>
    </article>
  );
};

export default ArtPieceLabelChart;
