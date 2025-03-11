import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MetaSimulatorSimplificado = () => {
    const [meta, setMeta] = useState<number>(900000);
    const ventasNecesarias = Math.ceil(meta / 1200000);
    const volumenCarrera = (meta / 1.08).toFixed(3);
    const totalVentasMes = ventasNecesarias;

    const datosProspectar = ventasNecesarias * 6.22;
    const presentacionesMes = Math.ceil(ventasNecesarias * 1.44);
    const presentacionesSemana = Math.ceil(ventasNecesarias * 0.44);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Reporte de Simulación de Meta", 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [["Variable", "Valor"]],
            body: [
                ["Objetivo de Ganancia", `$${meta.toLocaleString()}`],
                ["Tengo que Vender", `$7.187.400`],
                ["Volumen en carrera", `$6.813USD`],
                ["Total Ventas en el Mes", totalVentasMes],
                ["Nuevos Datos a Prospectar", 37],
                ["Mínimo Presentaciones x Mes", presentacionesMes],
                ["Mínimo Presentaciones x Semana", presentacionesSemana],
            ],
        });

        doc.save("Simulacion_Meta_Simplificada.pdf");
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700">¿Cuánto quieres ganar?</label>
                <input
                    type="number"
                    value={meta}
                    onChange={(e) => setMeta(Number(e.target.value))}
                    className="border border-gray-400 rounded p-2 w-full text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Ingrese su meta en USD"
                />
            </div>
            <div className="bg-gray-900 text-white p-4 rounded-lg text-center">
                <h2 className="text-lg font-bold">OBJETIVO</h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-800 p-3 rounded">
                        <p className="text-sm">Tengo que Vender</p>
                        <p className="text-lg font-bold">$7.187.400</p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                        <p className="text-sm">Volumen Carrera</p>
                        <p className="text-lg font-bold">$6.813USD</p>
                    </div>
                </div>
                <div className="mt-4 bg-gray-700 p-3 rounded text-center">
                    <p className="text-sm">Total Ventas en el Mes</p>
                    <p className="text-lg font-bold">3</p>
                </div>
            </div>
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 text-center">📌 Tu Plan de Acción</h2>
                <div className="mt-4">
                    <div className="flex justify-between py-2 border-b">
                        <p className="text-sm text-gray-600">Nuevos Datos a Prospectar</p>
                        <p className="text-sm font-bold">37</p>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <p className="text-sm text-gray-600">Mínimo Presentaciones x Mes</p>
                        <p className="text-sm font-bold">18</p>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <p className="text-sm text-gray-600">Mínimo Presentaciones x Semana</p>
                        <p className="text-sm font-bold">5</p>
                    </div>
                </div>
                <div className="mt-4 text-xs text-gray-500 text-center">
                    <p>📚 Capacitación mínima recomendada: <strong>20hs semanales</strong></p>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <button
                    onClick={generatePDF}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                >
                    📄 Descargar PDF
                </button>
            </div>
        </div>
    );
};

export default MetaSimulatorSimplificado;
