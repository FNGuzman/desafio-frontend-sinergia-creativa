import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSimuladorContext } from "../context/SimuladorContext";
interface jsPDFWithAutoTable extends jsPDF {
    lastAutoTable?: { finalY: number };
}
export const useGenerarPDF = () => {
    const {
        objetivo,
        productoSeleccionado,
        comisionSeleccionada,
        valorUSD,
        simuladorData: { montoAVender, volumenCarrera, totalVentas, gananciaNeta, datosAccion, nivelVendedor, ticketPromedio, mes }
    } = useSimuladorContext();
    const fechaHoy = new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const fuenteDolar = "Fuente: DolarAPI.com";
    const generarPDF = () => {
        const doc = new jsPDF() as jsPDFWithAutoTable;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Simulación de Metas de Venta", 14, 20);
        doc.setFontSize(12);
        doc.text(`Fecha de generación: ${fechaHoy}`, 14, 30);
        doc.text(`Mes: ${mes}`, 14, 40);
        doc.text(`Ticket Promedio: $${ticketPromedio.toLocaleString()}`, 14, 50);
        doc.text(`Producto: ${productoSeleccionado || "No seleccionado"}`, 14, 60);
        doc.text(`Comisión: ${comisionSeleccionada * 100}%`, 14, 70);
        doc.text(`Nivel de Vendedor: ${nivelVendedor?.label || "Desconocido"}`, 14, 80);
        doc.text(`Objetivo de Ganancia: $${objetivo.toLocaleString()}`, 14, 90);
        doc.text(`Valor del Dólar: $${valorUSD}`, 14, 100);
        doc.setFontSize(10);
        doc.text(fuenteDolar, 14, 108);
        autoTable(doc, {
            startY: 115,
            head: [["Concepto", "Valor"]],
            body: [
                ["Monto a Vender", `$${montoAVender.toLocaleString()}`],
                ["Volumen Carrera", `${volumenCarrera.toLocaleString()} USD`],
                ["Total Ventas", totalVentas.toLocaleString()],
                ["Ganancia Neta", `$${gananciaNeta.toLocaleString()}`],
            ],
            theme: "striped",
        });
        autoTable(doc, {
            startY: doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : 150,
            head: [["Plan de Acción", "Cantidad"]],
            body: datosAccion.map(({ titulo, valor }) => [titulo, valor.toLocaleString()]),
            theme: "grid",
        });
        doc.save(`Simulacion_Metas_${fechaHoy}.pdf`);
    };

    return { generarPDF };
};
