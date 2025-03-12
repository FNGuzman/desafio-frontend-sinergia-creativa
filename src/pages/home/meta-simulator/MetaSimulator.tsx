import Avatar from '../../../components/ui/Avatar';
import { useState } from 'react';
import { FaBullseye, FaChartLine, FaInfoCircle } from 'react-icons/fa'; // Íconos para el título

export default function SimuladorMetas() {
    const [objetivo, setObjetivo] = useState<number | string>("");
    const balance = 14463;
    const mes = "Febrero";
    const ticketPromedio = 1100;
    const valorUSD = 1055;
    const ventaObjetivo = 3103650;
    const volumenCarrera = 2942;
    const totalVentas = 3;
    const fechaHoy = new Date().toLocaleDateString(); // Obtiene la fecha actual
    const datosAccion = [
        { titulo: "Nuevos Datos a Prospectar", valor: 16, color: "bg-[var(--color-primary)]" },
        { titulo: "Mínimo Presentaciones x Mes", valor: 5, color: "bg-[var(--color-secondary)]" },
        { titulo: "Mínimo Presentaciones x Sem.", valor: 2, color: "bg-[var(--color-accent)]" }
    ];
    return (
        <div className="p-1">
            <div className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] rounded-2xl text-white p-5">
                <div className="flex items-center space-x-3 mt-4">
                    <Avatar size={12} alt="Guzmán Fernando Nahuel" />
                    <div>
                        <p className="text-sm text-gray-300 flex items-center gap-1">
                            Bienvenido <span>👋</span>
                        </p>
                        <h1 className="text-lg font-bold">Guzmán Fernando Nahuel</h1>
                    </div>
                </div>
                <div className="mt-6 p-4 shadow-md rounded-lg text-xs text-white w-full text-center">
                    <p className="text-sm">Tu Ganancia Neta Hoy</p>
                    <h2 className="text-4xl font-bold">${balance.toLocaleString()}</h2>
                </div>
                <div className="mt-4 bg-white/10 p-3 rounded-lg text-center text-sm grid grid-cols-3 gap-2">
                    <div>
                        <p className="text-gray-300">Mes</p>
                        <p className="font-semibold">{mes}</p>
                    </div>
                    <div>
                        <p className="text-gray-300">Mi Ticket Promedio</p>
                        <p className="font-semibold">${ticketPromedio}</p>
                    </div>
                    <div>
                        <p className="text-gray-300">Valor USD</p>
                        <p className="font-semibold">${valorUSD}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-3">
                <div className="w-full">
                    <label className="text-sm font-semibold text-gray-700 block">Comisión Actual</label>
                    <select className="bg-gray-200 p-2 rounded-lg text-sm outline-none w-full">
                        <option>Seleccionar</option>
                        <option>10%</option>
                        <option>15%</option>
                        <option>35%</option>
                        <option>40%</option>
                        <option>45%</option>
                    </select>
                </div>
                <div className="w-full">
                    <label className="text-sm font-semibold text-gray-700 block">Producto</label>
                    <select className="bg-gray-200 p-2 rounded-lg text-sm outline-none w-full">
                        <option>Seleccionar</option>
                        <option>Producto</option>
                        <option>Producto A</option>
                        <option>Producto B</option>
                        <option>Producto E</option>
                    </select>
                </div>
            </div>
            <div className="p-3">
                <label className="text-sm font-semibold text-gray-700 block">
                    ¿Cuánto quiero ganar este mes en mi Venta Personal?
                </label>
                <input
                    type="number"
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                    className="bg-gray-200 p-2 rounded-lg text-sm outline-none w-full mt-1 text-right font-semibold"
                    placeholder="Ingrese su objetivo en $"
                />
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
                        <div className="flex flex-col justify-between">
                            <p className="text-gray-400 text-sm h-6 flex items-center justify-center">
                                Tengo que vender
                            </p>
                            <h2 className="text-lg font-bold">${ventaObjetivo.toLocaleString()}</h2>
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="text-gray-400 text-sm h-6 flex items-center justify-center">
                                Volumen Carrera
                            </p>
                            <h2 className="text-lg font-bold">{volumenCarrera.toLocaleString()} USD</h2>
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="text-gray-400 text-sm h-6 flex items-center justify-center">
                                Total Ventas
                            </p>
                            <h2 className="text-lg font-bold">{totalVentas}</h2>
                        </div>
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
