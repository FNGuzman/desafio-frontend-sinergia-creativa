import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ComisionDiaBarChart from "./components/charts/ComisionDiaBarChart";
import Header from "../meta-simulator/components/Header";
import { useSimuladorContext } from "../../context/SimuladorContext";
import { comisiones, productos } from "../../constants/products";
import toast from "react-hot-toast";

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
    const {
        productoSeleccionado,
        setProductoSeleccionado,
        comisionSeleccionada,
        setComisionSeleccionada,
        valorUSD,
        simuladorData,
        simuladorData: {
            gananciaNeta = 0,
            nivelVendedor = { label: "Desconocido" },
            ticketPromedio = 0,
            mes = "",
        }
    } = useSimuladorContext();

    const [meta, setMeta] = useState<Meta | null>(null);
    const [mesSeleccionado, setMesSeleccionado] = useState<Mes | null>(null);
    const [cargando, setCargando] = useState(true);
    console.log(meta)
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
                }
            }
        }
        setCargando(false);
    }, [anioNumero, mesIdNumero]);

    const agregarVenta = () => {
        if (!productoSeleccionado || comisionSeleccionada === 0) {

            toast.error("Selecciona un producto y una comisión.");
            return;
        }

        const nuevaVenta: Venta = {
            id: Date.now(),
            dia: new Date().getDate(),
            producto: productoSeleccionado,
            monto: simuladorData.montoAVender,
            comisionPorcentaje: comisionSeleccionada,
            comision: comisionSeleccionada,
            comisionGanada: gananciaNeta,
        };

        const metasActualizadas = JSON.parse(localStorage.getItem("metas") || "[]");
        const metaIndex = metasActualizadas.findIndex((m: Meta) => m.anio === anioNumero);
        const mesIndex = metasActualizadas[metaIndex]?.meses.findIndex((m: Mes) => m.id === mesIdNumero);

        if (metaIndex !== -1 && mesIndex !== -1) {
            metasActualizadas[metaIndex].meses[mesIndex].ventas.push(nuevaVenta);
            localStorage.setItem("metas", JSON.stringify(metasActualizadas));

            setMesSeleccionado(metasActualizadas[metaIndex].meses[mesIndex]);

            toast.success("Venta registrada con éxito.");
        }
    };

    if (cargando) return <p className="p-5 text-center text-gray-500">Cargando datos...</p>;
    if (!mesSeleccionado) return <p className="p-5 text-center text-red-500">No hay datos para este mes.</p>;

    return (
        <div className="p-5">
            <Header
                nivelVendedor={nivelVendedor?.label || "Desconocido"}
                gananciaNeta={gananciaNeta}
                mes={mes}
                ticketPromedio={ticketPromedio}
                valorUSD={valorUSD}
                productoSeleccionado={productoSeleccionado}
                setProductoSeleccionado={setProductoSeleccionado}
                comisionSeleccionada={comisionSeleccionada}
                setComisionSeleccionada={setComisionSeleccionada}
                comisiones={comisiones}
                productos={productos}
            />
            <div className="flex justify-center mt-6">
                <button
                    onClick={agregarVenta}
                    className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
                >
                    Agregar Venta
                </button>
            </div>
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Comparación de Meta y Ganancia</h2>
                <p className="text-gray-700">
                    Meta de Ventas: ${mesSeleccionado.resumenVentas.montoAVender.toLocaleString()}
                </p>
                <p className="text-gray-700">
                    Ganancias Netas: ${mesSeleccionado.ventas.reduce((total, venta) => total + (venta.comisionGanada ?? venta.monto * venta.comision), 0).toLocaleString()}
                </p>
                <p className={`text-lg font-bold ${gananciaNeta >= mesSeleccionado.resumenVentas.montoAVender ? 'text-green-600' : 'text-red-600'}`}>
                    {gananciaNeta >= mesSeleccionado.resumenVentas.montoAVender ? '¡Meta alcanzada!' : 'Meta no alcanzada'}
                </p>
            </div>
            {mesSeleccionado.ventas.length > 0 && (
                <div className="mt-6">
                    <ComisionDiaBarChart ventas={mesSeleccionado.ventas.map(v => ({
                        dia: v.dia,
                        comisionGanada: v.comisionGanada ?? v.monto * v.comision
                    }))} />
                </div>
            )}
            <div className="overflow-x-auto rounded-lg w-full mt-6 p-2">
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
                                    <td className="p-2 border border-muted">{venta.producto}</td>
                                    <td className="p-2 border border-muted">${venta.monto.toFixed(2).toLocaleString()}</td>
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
