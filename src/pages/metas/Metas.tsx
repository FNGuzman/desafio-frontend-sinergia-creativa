import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import metasData from "../../data/metas.json";
import MesCard from "./components/MesCard";
import { guardarMetas, obtenerMetas } from "../../hooks/metasStorage";

interface Venta {
    productoId: string;
    monto: number;
    comisionPorcentaje: number;
    comisionReal: string;
    comisionGanada: number;
}

interface Mes {
    id: number;
    nombre: string;
    diaInicio?: number;
    resumenVentas: { montoAVender: number };
    ventas?: Venta[];
    totalGanado?: number;
    prospectos?: number;
}

interface Meta {
    id: number;
    anio: number;
    meses: Mes[];
}

const Metas = () => {
    const [metas, setMetas] = useState<Meta[]>([]);
    const [anioSeleccionado, setAnioSeleccionado] = useState<number>(new Date().getFullYear());
    const navigate = useNavigate();

    const anioActual = new Date().getFullYear();
    const mesActual = new Date().getMonth() + 1;

    useEffect(() => {
        const metasGuardadas = obtenerMetas() ?? metasData;
        setMetas(metasGuardadas);
        guardarMetas(metasGuardadas);
    }, []);

    const metasDelAnio = metas.find((meta) => meta.anio === anioSeleccionado) || { meses: [] };
    const existeMetaActual = metasDelAnio.meses.some((mes) => mes.id === mesActual);

    const manejarInicioMeta = () => {
        if (anioSeleccionado < anioActual || (anioSeleccionado === anioActual && existeMetaActual)) {
            toast.error("⚠️ Solo puedes iniciar una meta en el mes actual.");
            return;
        }
        navigate("/iniciar-meta");
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Metas de Ventas</h1>
            <div className="mb-4">
                <label className="text-sm font-semibold">Seleccionar Año</label>
                <select
                    className="border p-2 rounded w-full"
                    value={anioSeleccionado}
                    onChange={(e) => setAnioSeleccionado(Number(e.target.value))}
                >
                    {metas.map((meta) => (
                        <option key={meta.anio} value={meta.anio}>
                            {meta.anio}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-6 mb-6 flex justify-center">
                <button
                    onClick={manejarInicioMeta}
                    className={`text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ${anioSeleccionado < anioActual || existeMetaActual
                        ? "bg-[var(--color-muted)] cursor-not-allowed"
                        : "bg-[var(--color-primary)] hover:bg-[var(--color-secondary)]"
                        }`}
                    disabled={anioSeleccionado < anioActual || existeMetaActual}
                >
                    Iniciar Nueva Meta
                </button>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {metasDelAnio.meses.length > 0 ? (
                    metasDelAnio.meses.map((mes) => <MesCard key={mes.id} mes={mes} anio={anioSeleccionado} navigate={navigate} />)
                ) : (
                    <p className="text-gray-500 text-center col-span-2 sm:col-span-3">No hay metas registradas.</p>
                )}
            </div>


        </div>
    );
};

export default Metas;
