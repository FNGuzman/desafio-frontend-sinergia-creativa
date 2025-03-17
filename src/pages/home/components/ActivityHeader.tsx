import { useState } from "react";
import CustomFormSelect from "../../../components/form/CustomFormSelect";
import BarChart from "./chart/BarChart";

const ActivityHeader = () => {
    const [selectedLabel, setSelectedLabel] = useState<string>("Este Mes")
    const options = [
        { id: "3", label: "Este Mes" },
    ];

    const handleSelect = (selectedId: string | null) => {
        const selectedOption = options.find((option) => option.id === selectedId);
        setSelectedLabel(selectedOption ? selectedOption.label : "Este Mes");
    };

    return (
        <>
            <div className="w-full max-w-screen-lg mx-auto flex items-center justify-between px-4 py-4">
                <h1 className="text-xl font-bold sm:text-3xl">Mi Actividad</h1>
                <div className="w-auto min-w-[150px] sm:min-w-[180px]">
                    <CustomFormSelect options={options} onSelect={handleSelect} />
                </div>
            </div>
            <div className="relative flex flex-col min-w-0 bg-white shadow-md rounded-2xl p-4">
                <div className="mb-4">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        Ganancias <span className="font-semibold">{selectedLabel}</span> 🤑
                    </p>
                    <h1 className="text-lg font-bold">$ 15.569,22</h1>
                </div>

                {/* Gráfico de barras */}
                <div className="pr-1 m-1 md:m-5 bg-gradient-to-tl from-gray-900 to-slate-800 rounded-xl">
                    <div className="h-[300px] w-full">
                        <BarChart />
                    </div>
                </div>

                {/* Tarjetas de productos */}
                <div className="w-full px-6 mx-auto max-w-screen-2xl rounded-xl">
                    <div className="flex flex-wrap -mx-3">

                    </div>
                </div>
            </div>
        </>
    );
};

export default ActivityHeader;
