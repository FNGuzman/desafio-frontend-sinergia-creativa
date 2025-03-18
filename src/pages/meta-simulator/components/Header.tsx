import SelectInput from "../../../components/form/SelectInput";
import Avatar from "../../../components/ui/Avatar";

interface HeaderProps {
    nivelVendedor: string;
    gananciaNeta: number;
    mes: string;
    ticketPromedio: number;
    setTicketPromedio?: React.Dispatch<React.SetStateAction<number>>;
    valorUSD: number;
    productoSeleccionado: string;
    setProductoSeleccionado: (value: string) => void;
    comisionSeleccionada: number;
    setComisionSeleccionada: (value: number) => void;
    productos: { nombre: string }[];
    comisiones: { porcentaje: number; label: string }[];
    labelGanancia?: string;
}

const Header = ({
    nivelVendedor,
    gananciaNeta,
    mes,
    ticketPromedio = 0,
    valorUSD,
    productoSeleccionado,
    setProductoSeleccionado,
    comisionSeleccionada,
    setComisionSeleccionada,
    productos,
    comisiones,
    setTicketPromedio,
    labelGanancia = 'Ganancias'
}: HeaderProps) => {
    return (
        <div className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] rounded-2xl text-white p-5">
            <div className="flex items-center space-x-3 mt-4">
                <Avatar size={12} alt="Guzmán Fernando Nahuel" />
                <div>
                    <p className="text-sm text-gray-300 flex items-center gap-1">
                        Nivel {nivelVendedor} <span>👋</span>
                    </p>
                    <h1 className="text-lg font-bold">Guzmán Fernando Nahuel</h1>
                </div>
            </div>
            <div className="mt-4 bg-white/10 p-3 rounded-lg text-sm grid grid-rows-2 grid-cols-3 gap-2 text-center">
                <p className="text-gray-300 font-medium text-xs">Mes</p>
                <p className="text-gray-300 font-medium text-xs">Mi Ticket Promedio</p>
                <p className="text-gray-300 font-medium text-xs">Valor USD</p>
                <p className="font-semibold capitalize">{mes}</p>
                <input
                    type="text"
                    className="font-semibold bg-transparent text-center outline-none focus:ring-0"
                    value={ticketPromedio.toLocaleString("es-ES")}
                    onChange={(e) => {
                        const value = parseFloat(e.target.value.replace(/\D/g, "")) || 0;
                        if (setTicketPromedio) setTicketPromedio(value);
                    }}
                    onBlur={(e) => {
                        if (!e.target.value && setTicketPromedio) setTicketPromedio(1500);
                    }}
                />
                <p className="font-semibold">${valorUSD.toLocaleString("es-ES")}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
                <SelectInput
                    label="Comisión Actual"
                    value={comisionSeleccionada}
                    onChange={(e) => setComisionSeleccionada(Number(e.target.value))}
                    options={[
                        { value: 0, label: "Seleccionar" },
                        ...comisiones.map((c) => ({ value: c.porcentaje, label: c.label }))
                    ]}
                />
                <SelectInput
                    label="Productos"
                    value={productoSeleccionado}
                    onChange={(e) => setProductoSeleccionado(e.target.value)}
                    options={[
                        { value: "", label: "Seleccionar" },
                        ...productos.map((p) => ({ value: p.nombre, label: p.nombre }))
                    ]}
                />
            </div>
            <div className="mt-6 p-4 shadow-md rounded-lg text-xs text-white w-full text-center bg-white/10">
                <p className="text-sm">{labelGanancia}</p>
                <h2 className="text-4xl font-bold">${gananciaNeta.toLocaleString("es-ES")}</h2>
            </div>
        </div>
    );
};

export default Header;
