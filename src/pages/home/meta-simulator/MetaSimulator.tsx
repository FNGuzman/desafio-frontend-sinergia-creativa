import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { products } from "../../../constants/products";

const MetaSimulator = () => {
    const [meta, setMeta] = useState<string>("");
    const navigate = useNavigate();

    const metaValue = parseFloat(meta) || 0;
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Reporte de Simulación de Meta", 14, 20);
        products.forEach((producto, index) => {
            const ventasNecesarias = Math.ceil(metaValue / (producto.precio * producto.comision));
            doc.text(
                `${producto.nombre} - Precio: $${producto.precio.toLocaleString()} - Comisión: ${producto.comision * 100}% - Ventas Necesarias: ${ventasNecesarias}`,
                14,
                40 + index * 10
            );
        });
        autoTable(doc, {
            startY: 40 + products.length * 10,
            head: [["Producto", "Prospectos", "Presentaciones / Mes", "Presentaciones / Semana"]],
            body: products.map((producto) => {
                const ventasNecesarias = Math.ceil(metaValue / (producto.precio * producto.comision));
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {products.map((producto) => {
                    const ventasNecesarias = Math.ceil(metaValue / (producto.precio * producto.comision));

                    return (
                        <div
                            key={producto.id}
                            className="bg-white p-4 rounded-lg shadow-md text-center text-xs border border-muted w-full"
                        >
                            <h2 className="text-sm font-semibold text-primary">{producto.nombre}</h2>
                            <p className="text-xs text-muted">💰 Precio: ${producto.precio.toLocaleString()}</p>
                            <p className="text-xs text-muted">📊 Comisión: {producto.comision * 100}%</p>
                            <p className="text-lg font-bold mt-2 text-accent">{ventasNecesarias || 0} ventas</p>
                        </div>
                    );
                })}
            </div>
            <div className="mt-6 p-4 bg-secondary shadow-md rounded-lg text-xs text-white w-full">
                <h2 className="text-sm font-bold mb-3">📌 Tu Plan de Acción desde Hoy:</h2>

                {/* Versión de tabla solo en pantallas grandes */}
                <div className="hidden md:block overflow-x-auto rounded-lg shadow w-full">
                    <table className="w-full border-collapse border border-muted text-center text-xs bg-white text-primary max-w-full">
                        <thead>
                            <tr className="bg-muted text-white">
                                <th className="p-2 border border-muted">Producto</th>
                                <th className="p-2 border border-muted">Prospectos</th>
                                <th className="p-2 border border-muted">Presentaciones / Mes</th>
                                <th className="p-2 border border-muted">Presentaciones / Semana</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((producto) => {
                                const ventasNecesarias = Math.ceil(metaValue / (producto.precio * producto.comision));
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
                <div className="md:hidden mt-4 w-full">
                    {products.map((producto) => {
                        const ventasNecesarias = Math.ceil(metaValue / (producto.precio * producto.comision));
                        return (
                            <div key={producto.id} className="bg-light p-3 mb-2 rounded-lg shadow-md border border-muted w-full">
                                <button
                                    onClick={() => { }}
                                    className="w-full text-left font-semibold flex justify-between items-center text-primary"
                                >
                                    {producto.nombre}
                                </button>
                                <div className="mt-2 text-xs text-primary">
                                    <p>📌 Prospectos: <strong>{ventasNecesarias * 5 || 0}</strong></p>
                                    <p>📅 Presentaciones / Mes: <strong>{(ventasNecesarias * 0.7 || 0).toFixed(1)}</strong></p>
                                    <p>📆 Presentaciones / Semana: <strong>{(ventasNecesarias * 0.2 || 0).toFixed(1)}</strong></p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
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
