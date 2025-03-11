import { ResponsiveBar } from "@nivo/bar";
const data = [
    {
        "country": "AD",
        "hot dog": 193,
        "hot dogColor": "hsl(15, 70%, 50%)",
        "burger": 27,
        "burgerColor": "hsl(301, 70%, 50%)",
        "sandwich": 92,
        "sandwichColor": "hsl(49, 70%, 50%)",
        "kebab": 99,
        "kebabColor": "hsl(320, 70%, 50%)",
        "fries": 25,
        "friesColor": "hsl(283, 70%, 50%)",
        "donut": 151,
        "donutColor": "hsl(333, 70%, 50%)"
    },
    {
        "country": "AE",
        "hot dog": 149,
        "hot dogColor": "hsl(158, 70%, 50%)",
        "burger": 33,
        "burgerColor": "hsl(315, 70%, 50%)",
        "sandwich": 197,
        "sandwichColor": "hsl(188, 70%, 50%)",
        "kebab": 17,
        "kebabColor": "hsl(231, 70%, 50%)",
        "fries": 113,
        "friesColor": "hsl(52, 70%, 50%)",
        "donut": 63,
        "donutColor": "hsl(220, 70%, 50%)"
    },
    {
        "country": "AF",
        "hot dog": 50,
        "hot dogColor": "hsl(29, 70%, 50%)",
        "burger": 187,
        "burgerColor": "hsl(46, 70%, 50%)",
        "sandwich": 47,
        "sandwichColor": "hsl(262, 70%, 50%)",
        "kebab": 156,
        "kebabColor": "hsl(135, 70%, 50%)",
        "fries": 6,
        "friesColor": "hsl(134, 70%, 50%)",
        "donut": 139,
        "donutColor": "hsl(132, 70%, 50%)"
    },
    {
        "country": "AG",
        "hot dog": 30,
        "hot dogColor": "hsl(246, 70%, 50%)",
        "burger": 111,
        "burgerColor": "hsl(292, 70%, 50%)",
        "sandwich": 37,
        "sandwichColor": "hsl(70, 70%, 50%)",
        "kebab": 121,
        "kebabColor": "hsl(16, 70%, 50%)",
        "fries": 8,
        "friesColor": "hsl(193, 70%, 50%)",
        "donut": 151,
        "donutColor": "hsl(59, 70%, 50%)"
    },
    {
        "country": "AI",
        "hot dog": 52,
        "hot dogColor": "hsl(73, 70%, 50%)",
        "burger": 121,
        "burgerColor": "hsl(267, 70%, 50%)",
        "sandwich": 20,
        "sandwichColor": "hsl(87, 70%, 50%)",
        "kebab": 193,
        "kebabColor": "hsl(39, 70%, 50%)",
        "fries": 19,
        "friesColor": "hsl(245, 70%, 50%)",
        "donut": 178,
        "donutColor": "hsl(88, 70%, 50%)"
    },
    {
        "country": "AL",
        "hot dog": 181,
        "hot dogColor": "hsl(138, 70%, 50%)",
        "burger": 197,
        "burgerColor": "hsl(337, 70%, 50%)",
        "sandwich": 91,
        "sandwichColor": "hsl(212, 70%, 50%)",
        "kebab": 131,
        "kebabColor": "hsl(234, 70%, 50%)",
        "fries": 77,
        "friesColor": "hsl(266, 70%, 50%)",
        "donut": 197,
        "donutColor": "hsl(149, 70%, 50%)"
    },
    {
        "country": "AM",
        "hot dog": 0,
        "hot dogColor": "hsl(196, 70%, 50%)",
        "burger": 106,
        "burgerColor": "hsl(98, 70%, 50%)",
        "sandwich": 39,
        "sandwichColor": "hsl(349, 70%, 50%)",
        "kebab": 129,
        "kebabColor": "hsl(254, 70%, 50%)",
        "fries": 117,
        "friesColor": "hsl(34, 70%, 50%)",
        "donut": 78,
        "donutColor": "hsl(42, 70%, 50%)"
    }
]
const BarChart = () => {
    return (
        <>
            <ResponsiveBar
                data={data}
                keys={[
                    'hot dog',

                ]}
                enableGridY={false}
                indexBy="country"
                margin={{ top: 50, right: 10, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                enableLabel={false}
                borderRadius={5}
                axisTop={null}
                axisRight={null}

                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}

                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />
        </>)
        ;
};

export default BarChart;
