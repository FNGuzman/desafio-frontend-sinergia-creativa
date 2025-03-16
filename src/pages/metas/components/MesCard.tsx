import { useNavigate } from "react-router-dom";

interface Mes {
    id: number;
    nombre: string;
    resumenVentas: { montoAVender: number };
    ventas?: { monto: number }[];
    totalGanado?: number;
    prospectos?: number;
}

interface Props {
    mes: Mes;
    anio: number;
    navigate: ReturnType<typeof useNavigate>;
}

const MesCard = ({ mes, anio, navigate }: Props) => {
    const totalGanado = mes.totalGanado ?? mes.ventas?.reduce((total, venta) => total + venta.monto, 0) ?? 0;
    const prospectos = mes.prospectos ?? 0;
    const porcentaje = totalGanado > 0 ? (totalGanado / mes.resumenVentas.montoAVender) * 100 : 0;

    return (
        <button
            className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] p-4 rounded-lg shadow-lg text-white flex items-center gap-4 w-full hover:opacity-90 transition"
            onClick={() => navigate(`/ver-mes/${anio}/${mes.id}`)}
        >
            {/* Circular Progress */}
            <div className="relative w-14 h-14">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="8" fill="none" opacity="0.2" />
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="white"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="251.2"
                        strokeDashoffset={(100 - porcentaje) * 2.51}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-in-out"
                    />
                    <text x="50" y="55" fontSize="14" textAnchor="middle" fill="white" fontWeight="bold">
                        {Math.round(porcentaje)}%
                    </text>
                </svg>
            </div>

            {/* Datos del mes */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold capitalize">{mes.nombre}</h3>
                <p className="text-sm opacity-90">
                    <span className="font-bold">${totalGanado.toLocaleString()}</span> / ${mes.resumenVentas.montoAVender.toLocaleString()}
                </p>
                <div className="flex justify-between text-xs opacity-80 mt-1">
                    <p>Prospectos: <span className="font-bold">{prospectos}</span></p>
                    <p>Ventas: <span className="font-bold">{mes.ventas?.length ?? 0}</span></p>
                </div>
            </div>
        </button>
    );
};

export default MesCard;
