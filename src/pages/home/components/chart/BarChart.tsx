import { ResponsiveBar } from "@nivo/bar";

const data = [
    { dia: 1, ganancias: 1000 },
    { dia: 2, ganancias: 9000 },
    { dia: 3, ganancias: 2000 },
    { dia: 4, ganancias: 2500 },
    { dia: 5, ganancias: 8000 },
    { dia: 6, ganancias: 8500 },
    { dia: 7, ganancias: 7000 },
    { dia: 8, ganancias: 4500 },
    { dia: 9, ganancias: 5000 },
    { dia: 10, ganancias: 5500 },
    { dia: 11, ganancias: 6000 },
    { dia: 12, ganancias: 6500 },
    { dia: 13, ganancias: 7000 },
    { dia: 14, ganancias: 7500 },
    { dia: 15, ganancias: 3000 },
    { dia: 16, ganancias: 8500 },
    { dia: 17, ganancias: 5500 }
];

const BarChart = () => {
    return (
        <>
            <ResponsiveBar
                data={data}
                keys={['ganancias']}
                indexBy="dia"
                margin={{ top: 50, right: 10, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                enableLabel={false}
                borderRadius={5}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 45,
                    legend: 'Día',
                    legendPosition: 'middle',
                    legendOffset: 40,

                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Ganancias',
                    legendPosition: 'middle',
                    legendOffset: -40,

                }}
                labelSkipWidth={12}
                labelSkipHeight={12}

                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fill: '#ffffff'
                            }
                        },
                        legend: {
                            text: {
                                fill: '#ffffff'
                            }
                        }
                    },
                    labels: {
                        text: {
                            fill: '#ffffff'
                        }
                    }
                }}
                role="application"
                ariaLabel="Gráfico de ganancias diarias en marzo"
                barAriaLabel={e => `${e.indexValue}: ${e.value} ganancias`}
            />
        </>
    );
};

export default BarChart;