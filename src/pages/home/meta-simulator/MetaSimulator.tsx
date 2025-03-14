import Avatar from '../../../components/ui/Avatar';
import { useState, useEffect } from 'react';
import { FaBullseye, FaChartLine } from 'react-icons/fa';
import { comisiones, productos, valorDolar, tasaCierre } from '../../../constants/products';

export default function SimuladorMetas() {
    const [objetivo, setObjetivo] = useState<number | string>("");
    const [productoSeleccionado, setProductoSeleccionado] = useState<string>("");
    const [comisionSeleccionada, setComisionSeleccionada] = useState<number>(0);

    const nivelVendedor = tasaCierre.find((nivel) => nivel.label === "Semi Senior");

    const valorUSD = valorDolar[0].valor;
    const ticketPromedio = 1500;

    const mes = new Date().toLocaleString("es-ES", { month: "long" });
    const fechaHoy = new Date().toLocaleDateString();

    const factoresComision: { [key: number]: number } = {
        0.10: 10,
        0.15: 6.6,
        0.20: 5,
        0.35: 2.85,
        0.40: 1.8,
    };

    const [montoAVender, setMontoAVender] = useState(0);
    const [volumenCarrera, setVolumenCarrera] = useState(0);
    const [totalVentas, setTotalVentas] = useState(0);
    const [gananciaNeta, setGananciaNeta] = useState(0);

    const factor = factoresComision[comisionSeleccionada] || 1;
    const producto = productos.find((p) => p.nombre === productoSeleccionado);
    const precioProducto = producto ? producto.precio : 0;

    useEffect(() => {
        setGananciaNeta(precioProducto && comisionSeleccionada ? (precioProducto / 1.21) * comisionSeleccionada : 0);
    }, [productoSeleccionado, comisionSeleccionada]);

    useEffect(() => {
        if (objetivo && !isNaN(Number(objetivo)) && Number(objetivo) > 0 && precioProducto && factor) {
            const nuevoMontoAVender = Number(objetivo) * 1.21 * factor;
            const nuevoVolumenCarrera = Number((nuevoMontoAVender / valorUSD).toFixed(3));
            const nuevoTotalVentas = Number((nuevoVolumenCarrera / ticketPromedio).toFixed(2));

            setMontoAVender(nuevoMontoAVender);
            setVolumenCarrera(nuevoVolumenCarrera);
            setTotalVentas(nuevoTotalVentas);
        }
    }, [objetivo, precioProducto, factor]);


    const tasaCierreValor = nivelVendedor?.valor || 0;
    const minPresentacionesMes = Math.ceil(totalVentas / tasaCierreValor);
    const minPresentacionesSemana = Math.ceil(minPresentacionesMes / 4 + 1);
    const datosAccion = [
        { titulo: "Nuevos Datos a Prospectar", valor: Math.ceil(totalVentas * 6), color: "bg-[var(--color-primary)]" },
        { titulo: "Mínimo Presentaciones x Mes", valor: minPresentacionesMes, color: "bg-[var(--color-secondary)]" },
        { titulo: "Mínimo Presentaciones x Sem.", valor: minPresentacionesSemana, color: "bg-[var(--color-accent)]" }
    ];

    return (
        <div className="p-1">
            <div className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] rounded-2xl text-white p-5">
                <div className="flex items-center space-x-3 mt-4">
                    <Avatar size={12} alt="Guzmán Fernando Nahuel" />
                    <div>
                        <p className="text-sm text-gray-300 flex items-center gap-1">
                            Nivel {nivelVendedor?.label} <span>👋</span>
                        </p>
                        <h1 className="text-lg font-bold">Guzmán Fernando Nahuel</h1>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="w-full">
                        <label className="text-sm font-semibold text-gray-300 block">Comisión Actual</label>
                        <div className="relative">
                            <select
                                className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] text-white p-3 pr-10 rounded-xl text-sm outline-none w-full shadow-md border border-white/20 focus:ring-2 focus:ring-white hover:opacity-90 appearance-none"
                                value={comisionSeleccionada}
                                onChange={(e) => setComisionSeleccionada(Number(e.target.value))}
                            >
                                <option className="bg-gray-900 text-white" value="0">Seleccionar</option>
                                {comisiones.map((comision) => (
                                    <option className="bg-gray-900 text-white" key={comision.id} value={comision.porcentaje}>
                                        {comision.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-semibold text-gray-300 block">Productos</label>
                        <div className="relative">
                            <select
                                className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] text-white p-3 pr-10 rounded-xl text-sm outline-none w-full shadow-md border border-white/20 focus:ring-2 focus:ring-white hover:opacity-90 appearance-none"
                                value={productoSeleccionado}
                                onChange={(e) => setProductoSeleccionado(e.target.value)}
                            >
                                <option className="bg-gray-900 text-white" value="">Seleccionar</option>
                                {productos.map((prod) => (
                                    <option className="bg-gray-900 text-white" key={prod.id} value={prod.nombre}>{prod.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
                <div className="mt-4 bg-white/10 p-3 rounded-lg text-sm grid grid-rows-2 grid-cols-3 gap-2 text-center">
                    <p className="text-gray-300 font-medium text-xs">Mes</p>
                    <p className="text-gray-300 font-medium text-xs">Mi Ticket Promedio</p>
                    <p className="text-gray-300 font-medium text-xs">Valor USD</p>
                    <p className="font-semibold capitalize">{mes}</p>
                    <p className="font-semibold">${ticketPromedio}</p>
                    <p className="font-semibold">${valorUSD}</p>
                </div>
                <div className="mt-6 p-4 shadow-md rounded-lg text-xs text-white w-full text-center">
                    <p className="text-sm">Tu Ganancia Neta Hoy</p>
                    <h2 className="text-4xl font-bold">${gananciaNeta.toLocaleString("es-ES")}</h2>
                </div>
            </div>
            <div className="p-3">
                <label className="text-sm font-semibold text-gray-700 block">¿Cuánto quiero ganar este mes en mi Venta Personal?</label>
                <input type="number" value={objetivo} onChange={(e) => setObjetivo(e.target.value)}
                    className="bg-gray-200 p-2 rounded-lg text-sm outline-none w-full mt-1 text-right font-semibold" placeholder="Ingrese su objetivo en $" />
            </div>
            <div className="p-3">
                <div className="bg-white shadow-lg rounded-lg p-5 min-h-28">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <FaChartLine className="text-blue-500 text-xl" />
                            <h3 className="text-md font-semibold text-gray-700">Resumen de Ventas</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        <div><p className="text-gray-400 text-xs">Tengo que vender</p><h2 className="text-lg font-bold">${montoAVender.toLocaleString("es-ES")}</h2></div>
                        <div><p className="text-gray-400 text-xs">Volumen Carrera</p><h2 className="text-lg font-bold">{volumenCarrera.toLocaleString("es-ES")} USD</h2></div>
                        <div><p className="text-gray-400 text-xs">Total Ventas</p><h2 className="text-lg font-bold">{totalVentas.toLocaleString("es-ES")}</h2></div>
                    </div>
                </div>
            </div>
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
                                className={`bg-gradient-to-r ${item.color} text-white p-5 rounded-lg shadow-md flex flex-col justify-between min-w-[120px]`}
                            >
                                <p className="text-sm">{item.titulo}</p>
                                <h2 className="text-2xl font-bold">{item.valor}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
