import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ComisionDiaBarChart from "./components/charts/ComisionDiaBarChart";

interface Venta {
    id: number;
    dia: number;
    producto: string;
    comision: number;
    monto: number;
    comisionGanada: number;
    productoId?: number;
    comisionPorcentaje?: number;

}

interface Mes {
    id: number;
    nombre: string;
    resumenVentas: {
        montoAVender: number;
    };
    ventas: Venta[];
}

interface Meta {
    id: number;
    anio: number;
    meses: Mes[];
}

const VerMes = () => {
    const { anio, mesId } = useParams();
    const anioNumero = Number(anio);
    const mesIdNumero = Number(mesId);

    const [meta, setMeta] = useState<Meta | null>(null);
    const [mesSeleccionado, setMesSeleccionado] = useState<Mes | null>(null);
    const [volumenCarrera, setVolumenCarrera] = useState(0);
    const [totalVentas, setTotalVentas] = useState(0);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        setCargando(true);
        const storedMetas = localStorage.getItem("metas");
        if (storedMetas) {
            const metas: Meta[] = JSON.parse(storedMetas);
            const metaEncontrada = metas.find((m) => m.anio === anioNumero);
            if (metaEncontrada) {
                setMeta(metaEncontrada);
                const mesEncontrado = metaEncontrada.meses.find((m) => m.id === mesIdNumero);
                if (mesEncontrado) {
                    setMesSeleccionado(mesEncontrado);
                    const nuevoVolumenCarrera = mesEncontrado.ventas.reduce(
                        (total, venta) => total + venta.monto * venta.comision,
                        0
                    );
                    const nuevoTotalVentas = mesEncontrado.ventas.length;

                    setVolumenCarrera(nuevoVolumenCarrera);
                    setTotalVentas(nuevoTotalVentas);
                } else {
                    setMesSeleccionado(null);
                }
            }
        }
        setCargando(false);
    }, [anioNumero, mesIdNumero]);
    if (cargando) return <p className="p-5 text-center text-gray-500">Cargando datos...</p>;
    if (!mesSeleccionado) return <p className="p-5 text-center text-red-500">No hay datos para este mes.</p>;
    return (
        <div className="p-5">
            <div className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] rounded-2xl text-white p-5">
                <h1 className="text-xl font-bold text-center capitalize">{mesSeleccionado.nombre} {meta?.anio}</h1>
                <div className="mt-4 bg-white/10 p-3 rounded-lg text-sm flex flex-wrap justify-between items-center gap-x-6 text-center">
                    <div className="flex-1 min-w-[120px]">
                        <p className="text-gray-300 font-medium text-xs">💰 Monto a Vender</p>
                        <p className="font-semibold">${mesSeleccionado.resumenVentas.montoAVender.toLocaleString()}</p>
                    </div>
                    <div className="flex-1 min-w-[120px]">
                        <p className="text-gray-300 font-medium text-xs">📈 Volumen Carrera</p>
                        <p className="font-semibold">{volumenCarrera.toLocaleString()} USD</p>
                    </div>
                    <div className="flex-1 min-w-[120px]">
                        <p className="text-gray-300 font-medium text-xs">🛒 Total Ventas</p>
                        <p className="font-semibold">{totalVentas}</p>
                    </div>
                </div>
            </div>
            {mesSeleccionado.ventas.length > 0 && (
                <div className="mt-6">
                    <ComisionDiaBarChart ventas={mesSeleccionado.ventas
                        .filter(v => v.dia !== undefined)
                        .map(v => ({
                            dia: v.dia,
                            comisionGanada: v.comisionGanada ?? v.monto * v.comision
                        }))}
                    />
                </div>
            )}


            {/* Tabla de Ventas Registradas */}
            <div className="overflow-x-auto rounded-lg  w-full mt-6 p-2">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Ventas Registradas</h2>
                {mesSeleccionado.ventas.length > 0 ? (
                    <table className="w-full border-collapse border border-muted text-center text-xs bg-white text-primary">
                        <thead>
                            <tr className="bg-muted text-white">
                                <th className="p-2 border border-muted">Día</th>
                                <th className="p-2 border border-muted">Producto</th>
                                <th className="p-2 border border-muted">Monto</th>
                                <th className="p-2 border border-muted">Comisión</th>
                                <th className="p-2 border border-muted">Comisión Ganada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mesSeleccionado.ventas.map((venta, index) => (
                                <tr key={`${venta.dia}-${venta.productoId}-${index}`} className="bg-light">
                                    <td className="p-2 border border-muted">{venta.dia}</td>
                                    <td className="p-2 border border-muted">{venta.productoId}</td>
                                    <td className="p-2 border border-muted">${venta.monto.toLocaleString()}</td>
                                    <td className="p-2 border border-muted">
                                        {venta.comisionPorcentaje ? `${(venta.comisionPorcentaje * 100).toFixed(2)}%` : "N/A%"}
                                    </td>
                                    <td className="p-2 border border-muted">${venta.comisionGanada.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 text-center">❌ No hay ventas registradas.</p>
                )}
            </div>



        </div>
    );
};

export default VerMes;
