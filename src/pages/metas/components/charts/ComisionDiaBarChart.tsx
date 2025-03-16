import { ResponsiveBar } from "@nivo/bar";

interface Venta {
    dia: number;
    comisionGanada: number;
}

interface ComisionDiaBarChartProps {
    ventas: Venta[];
}

const ComisionDiaBarChart = ({ ventas }: ComisionDiaBarChartProps) => {
    const data = ventas.map((venta) => ({
        dia: venta.dia.toString(),
        comision: venta.comisionGanada,
    }));

    return (
        <div className="h-64 w-full bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Ganancias Por Día</h2>
            <ResponsiveBar
                data={data}
                keys={["comision"]}
                indexBy="dia"
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                padding={0.3}
                enableLabel={false}
                borderRadius={5}
                enableGridY={false}
                axisTop={null}
                axisRight={null}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={"var(--color-primary)"}
                borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Día del Mes",
                    legendPosition: "middle",
                    legendOffset: 40,
                }}

                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                animate={true}
                motionConfig="gentle"
            />
        </div>
    );
};

export default ComisionDiaBarChart;
