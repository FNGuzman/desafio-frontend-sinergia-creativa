import { useState } from "react";
import CustomFormSelect from "../../../components/form/CustomFormSelect";
import BarChart from "./chart/BarChart";

const ActivityHeader = () => {
    const [selectedLabel, setSelectedLabel] = useState<string>("Esta Semana");

    const options = [
        { id: "1", label: "Hoy" },
        { id: "2", label: "Esta Semana" },
        { id: "3", label: "Este Mes" },
        { id: "4", label: "Este Año" },
    ];

    const handleSelect = (selectedId: string | null) => {
        const selectedOption = options.find((option) => option.id === selectedId);
        setSelectedLabel(selectedOption ? selectedOption.label : "Esta Semana");
    };

    return (
        <>
            {/* Header con título y selector */}
            <div className="w-full max-w-screen-lg mx-auto flex items-center justify-between px-4 py-4">
                <h1 className="text-xl font-bold sm:text-3xl">Mi Actividad</h1>
                <div className="w-auto min-w-[150px] sm:min-w-[180px]">
                    <CustomFormSelect options={options} onSelect={handleSelect} />
                </div>
            </div>

            {/* Contenedor principal */}
            <div className="relative flex flex-col min-w-0 bg-white shadow-md rounded-2xl p-4">

                {/* Sección de ganancias */}
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
                        {[
                            { name: "Producto A", value: "$36", progress: 60 },
                            { name: "Producto B", value: "$2", progress: 90 },
                            { name: "Producto C", value: "$435", progress: 30 },
                            { name: "Producto D", value: "$43", progress: 50 },
                        ].map((product, index) => (
                            <div key={index} className="flex-none w-1/4 max-w-full py-4 px-3">
                                <div className="flex mb-2">
                                    <p className="mt-1 font-semibold text-xs">{product.name}</p>
                                </div>
                                <h4 className="font-bold">{product.value}</h4>
                                <div className="text-xs h-1.5 flex w-3/4 bg-gray-200 rounded-lg overflow-hidden">
                                    <div
                                        className="bg-slate-700 text-center text-white transition-all"
                                        style={{
                                            width: `${product.progress}%`,
                                            height: "100%",
                                        }}
                                        role="progressbar"
                                        aria-valuenow={product.progress}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActivityHeader;
