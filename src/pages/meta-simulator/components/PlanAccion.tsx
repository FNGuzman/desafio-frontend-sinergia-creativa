import { FaBullseye } from "react-icons/fa";

interface PlanAccionProps {
    datosAccion: { titulo: string; valor: number; color: string }[];
}

const PlanAccion = ({ datosAccion }: PlanAccionProps) => {
    const fechaHoy = new Date().toLocaleDateString("es-ES");

    return (
        <div className="p-3">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaBullseye className="text-red-500 text-2xl" />
                    TU PLAN DE ACCIÓN desde HOY :
                </h2>
                <span className="text-gray-600 text-sm">{fechaHoy}</span>
            </div>
            <div className="overflow-x-auto p-1">
                <div className="grid grid-cols-3 gap-3 min-w-[380px]">
                    {datosAccion.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] text-white p-5 rounded-lg shadow-md flex flex-col justify-between min-w-[120px]`}
                        >
                            <p className="text-sm">{item.titulo}</p>
                            <h2 className="text-2xl font-bold">{item.valor}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlanAccion;
