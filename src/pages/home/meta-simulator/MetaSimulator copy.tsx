import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const productos = [
    { id: "A", nombre: "Producto A", precio: 10000, tasaCierre: 0.3 },
    { id: "B", nombre: "Producto B", precio: 20000, tasaCierre: 0.35 },
    { id: "C", nombre: "Producto C", precio: 30000, tasaCierre: 0.5 },
    { id: "D", nombre: "Producto D", precio: 40000, tasaCierre: 0.5 },
    { id: "E", nombre: "Producto E", precio: 50000, tasaCierre: 0.5 },
];

const comisiones = [
    { id: "10", porcentaje: 0.10, label: "10%" },
    { id: "15", porcentaje: 0.15, label: "15%" },
    { id: "20", porcentaje: 0.20, label: "20%" },
    { id: "35", porcentaje: 0.35, label: "35%" },
    { id: "40", porcentaje: 0.40, label: "40%" },
];

const MetaSimulator = () => {
    const [meta, setMeta] = useState<string>("");
    const [comisionSeleccionada, setComisionSeleccionada] = useState<number>(comisiones[0].porcentaje);
    const navigate = useNavigate();

    const metaValue = parseFloat(meta) || 0;

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Reporte de Simulación de Meta", 14, 20);

        productos.forEach((producto, index) => {
            const ventasNecesarias = Math.ceil(metaValue / (producto.precio * comisionSeleccionada));
            doc.text(
                `${producto.nombre} - Precio: $${producto.precio.toLocaleString()} - Comisión: ${(comisionSeleccionada * 100).toFixed(0)}% - Ventas Necesarias: ${ventasNecesarias}`,
                14,
                40 + index * 10
            );
        });

        autoTable(doc, {
            startY: 40 + productos.length * 10,
            head: [["Producto", "Prospectos", "Presentaciones / Mes", "Presentaciones / Semana"]],
            body: productos.map((producto) => {
                const ventasNecesarias = Math.ceil(metaValue / (producto.precio * comisionSeleccionada));
                return [
                    producto.nombre,
                    ventasNecesarias * 5 || 0,
                    (ventasNecesarias * 0.7 || 0).toFixed(1),
                    (ventasNecesarias * 0.2 || 0).toFixed(1),
                ];
            }),
        });

        doc.save("Simulacion_Meta.pdf");
    };

    const startMeta = () => {
        navigate(`/meta-simulator?meta=${metaValue}`);
    };

    return (
        <div className="w-full max-w-full mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-primary">Simulador de Meta</h1>

            {/* Entrada de cuánto quieres ganar */}
            <div className="mb-4 w-full">
                <label className="block text-sm font-semibold text-primary">¿Cuánto quieres ganar?</label>
                <input
                    type="text"
                    value={meta}
                    onChange={(e) => setMeta(e.target.value)}
                    className="border border-muted rounded p-2 w-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Ingrese su meta en USD"
                />
            </div>

            {/* Selección de comisión */}
            <div className="mb-4 w-full">
                <label className="block text-sm font-semibold text-primary">Selecciona tu porcentaje de comisión</label>
                <select
                    value={comisionSeleccionada}
                    onChange={(e) => setComisionSeleccionada(parseFloat(e.target.value))}
                    className="border border-muted rounded p-2 w-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    {comisiones.map((comision) => (
                        <option key={comision.id} value={comision.porcentaje}>
                            {comision.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Muestra de cálculos */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {productos.map((producto) => {
                    const ventasNecesarias = Math.ceil(metaValue / (producto.precio * comisionSeleccionada));

                    return (
                        <div key={producto.id} className="bg-white p-4 rounded-lg shadow-md text-center text-xs border border-muted w-full">
                            <h2 className="text-sm font-semibold text-primary">{producto.nombre}</h2>
                            <p className="text-xs text-muted">💰 Precio: ${producto.precio.toLocaleString()}</p>
                            <p className="text-xs text-muted">📊 Comisión: {(comisionSeleccionada * 100).toFixed(0)}%</p>
                            <p className="text-lg font-bold mt-2 text-accent">{ventasNecesarias || 0} ventas</p>
                        </div>
                    );
                })}
            </div>

            {/* Plan de acción */}
            <div className="mt-6 p-4 bg-secondary shadow-md rounded-lg text-xs text-white w-full">
                <h2 className="text-sm font-bold mb-3">📌 Tu Plan de Acción desde Hoy:</h2>

                <div className="overflow-x-auto rounded-lg shadow w-full">
                    <table className="w-full border-collapse border border-muted text-center text-xs bg-white text-primary">
                        <thead>
                            <tr className="bg-muted text-white">
                                <th className="p-2 border border-muted">Producto</th>
                                <th className="p-2 border border-muted">Prospectos</th>
                                <th className="p-2 border border-muted">Presentaciones / Mes</th>
                                <th className="p-2 border border-muted">Presentaciones / Semana</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => {
                                const ventasNecesarias = Math.ceil(metaValue / (producto.precio * comisionSeleccionada));
                                return (
                                    <tr key={producto.id} className="bg-light">
                                        <td className="p-2 border border-muted">{producto.nombre}</td>
                                        <td className="p-2 border border-muted">{ventasNecesarias * 5 || 0}</td>
                                        <td className="p-2 border border-muted">{(ventasNecesarias * 0.7 || 0).toFixed(1)}</td>
                                        <td className="p-2 border border-muted">{(ventasNecesarias * 0.2 || 0).toFixed(1)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Botones */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
                <button
                    onClick={generatePDF}
                    className="w-full md:w-auto px-4 py-2 text-white bg-accent rounded shadow hover:bg-muted transition"
                >
                    📄 Descargar PDF
                </button>
                <button
                    onClick={startMeta}
                    className="w-full md:w-auto px-4 py-2 text-white bg-secondary rounded shadow hover:bg-primary transition"
                >
                    🚀 Iniciar Meta
                </button>
            </div>
        </div>
    );
};

export default MetaSimulator;
