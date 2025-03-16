import { FaChartLine } from "react-icons/fa";

interface VentaResumenProps {
    montoAVender: number;
    volumenCarrera: number;
    totalVentas: number;
    gananciaNeta: number;
}

const VentaResumen = ({ montoAVender, volumenCarrera, totalVentas }: VentaResumenProps) => {
    return (
        <div className="p-3">
            <div className="bg-white shadow-lg rounded-lg p-5 min-h-28">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <FaChartLine className="text-blue-500 text-xl" />
                        <h3 className="text-md font-semibold text-gray-700">Resumen de Ventas</h3>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                        <p className="text-gray-400 text-xs">Tengo que vender</p>
                        <h2 className="text-lg font-bold">${montoAVender.toLocaleString("es-ES")}</h2>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs">Volumen Carrera</p>
                        <h2 className="text-lg font-bold">{volumenCarrera.toLocaleString("es-ES")} USD</h2>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs">Total Ventas</p>
                        <h2 className="text-lg font-bold">{totalVentas.toLocaleString("es-ES")}</h2>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default VentaResumen;
