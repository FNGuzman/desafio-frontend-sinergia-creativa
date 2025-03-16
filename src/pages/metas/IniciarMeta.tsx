import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import metasData from "../../data/metas.json";

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
    resumenVentas: {
        montoAVender: number;
    };
    ventas: Venta[];
    totalGanado: number;
    prospectos: number;
}

interface Meta {
    id: number;
    anio: number;
    meses: Mes[];
}

const IniciarMeta = () => {
    const [metas, setMetas] = useState<Meta[]>([]);
    const [montoAVender, setMontoAVender] = useState<number | "">("");
    const navigate = useNavigate();
    const anioActual = new Date().getFullYear();
    const mesActual = new Date().getMonth() + 1;
    const diaHoy = new Date().getDate();
    const nombreMes = new Date().toLocaleString("es-ES", { month: "long" });
    useEffect(() => {
        const storedMetas = localStorage.getItem("metas");

        if (storedMetas) {
            setMetas(JSON.parse(storedMetas));
        } else {
            setMetas(metasData);
            localStorage.setItem("metas", JSON.stringify(metasData));
        }
    }, []);
    const iniciarMeta = () => {
        if (montoAVender === "" || Number(montoAVender) <= 0) {
            toast.error("⚠️ Ingrese un monto válido.");
            return;
        }

        const nuevaMeta: Mes = {
            id: mesActual,
            nombre: nombreMes,
            diaInicio: diaHoy,
            resumenVentas: {
                montoAVender: Number(montoAVender),
            },
            ventas: [],
            totalGanado: 0,
            prospectos: 0,
        };

        let metaExistente = false;
        let metasActualizadas = metas.map((meta) => {
            if (meta.anio === anioActual) {
                if (meta.meses.some((mes) => mes.id === nuevaMeta.id)) {
                    toast.error("⚠️ Ya existe una meta para este mes.");
                    metaExistente = true;
                    return meta;
                }
                return { ...meta, meses: [...meta.meses, nuevaMeta] };
            }
            return meta;
        });
        if (!metas.some((meta) => meta.anio === anioActual)) {
            metasActualizadas = [
                ...metas,
                {
                    id: metas.length + 1,
                    anio: anioActual,
                    meses: [nuevaMeta],
                },
            ];
        }

        if (metaExistente) return;

        setMetas(metasActualizadas);
        localStorage.setItem("metas", JSON.stringify(metasActualizadas));
        toast.success(`Meta iniciada para ${nombreMes} con objetivo de $${montoAVender}`);
        setTimeout(() => navigate("/metas"), 1000);
    };

    return (
        <div className="p-5">
            <div className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] rounded-2xl text-white p-5">
                <h1 className="text-xl font-bold">Iniciar Nueva Meta</h1>
                <div className="mt-4 bg-white/10 p-3 rounded-lg text-sm grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                    <div>
                        <p className="text-gray-300 font-medium text-xs">Mes</p>
                        <p className="font-semibold capitalize">{nombreMes}</p>
                    </div>
                    <div>
                        <p className="text-gray-300 font-medium text-xs">Día de Inicio</p>
                        <p className="font-semibold">{diaHoy}</p>
                    </div>
                </div>
            </div>
            <label className="block text-sm font-semibold mt-6">¿Cuánto quiero ganar?</label>
            <input
                type="number"
                value={montoAVender}
                onChange={(e) => setMontoAVender(e.target.value === "" ? "" : Number(e.target.value))}
                className="border p-2 rounded w-full mt-2"
                placeholder="Ingrese monto en $"
            />

            <button
                onClick={iniciarMeta}
                className="bg-[var(--color-primary)] text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-[var(--color-secondary)] transition duration-300 mt-4 w-full"
            >
                Iniciar
            </button>
        </div>
    );
};

export default IniciarMeta;
