import { ResponsivePie } from "@nivo/pie";
import React from "react";

interface PieChartProps {
  className?: string;
}

const PieChart: React.FC<PieChartProps> = ({ className }) => {
  return (
    <div>
      <div className={className}>
        <ResponsivePie
          data={[
            { id: "Jan", value: 111 },
            { id: "Feb", value: 157 },
            { id: "Mar", value: 129 },
            { id: "Apr", value: 150 },
            { id: "May", value: 119 },
            { id: "Jun", value: 72 },
          ]}
          sortByValue
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          cornerRadius={0}
          padAngle={0}
          borderWidth={1}
          borderColor={"#ffffff"}
          enableArcLinkLabels={false}
          arcLabel={(d) => `${d.id}`}
          arcLabelsTextColor={"#ffffff"}
          arcLabelsRadiusOffset={0.65}
          colors={["#2563eb"]}
          theme={{
            labels: {
              text: {
                fontSize: "18px",
              },
            },
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
          }}
          role="application"
        />
      </div>
    </div>
  );
};

export default PieChart;
