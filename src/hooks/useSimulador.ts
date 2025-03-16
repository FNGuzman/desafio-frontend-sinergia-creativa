import { useState, useEffect } from "react";
import { DatosAccion } from "../interfaces/simulatorInterfaces";
import { productos, tasaCierre, factoresComision } from "../constants/products";

/** 📌 Props que recibe el hook */
interface UseSimuladorProps {
    objetivo: number | string;
    productoSeleccionado: string;
    comisionSeleccionada: number;
    valorUSD: number;
}

export const useSimulador = ({ objetivo, productoSeleccionado, comisionSeleccionada, valorUSD }: UseSimuladorProps) => {
    const [montoAVender, setMontoAVender] = useState(0);
    const [volumenCarrera, setVolumenCarrera] = useState(0);
    const [totalVentas, setTotalVentas] = useState(0);
    const [gananciaNeta, setGananciaNeta] = useState(0);
    const [ticketPromedio, setTicketPromedio] = useState<number>(1500);
    const nivelVendedor = tasaCierre.find((nivel) => nivel.label === "Semi Senior") || { label: "Desconocido", valor: 1 };
    const factor = factoresComision[comisionSeleccionada] || 1;
    const mes = new Date().toLocaleString("es-ES", { month: "long" });

    useEffect(() => {
        const precioProducto = productos.find((p) => p.nombre === productoSeleccionado)?.precio || 0;
        setGananciaNeta(precioProducto > 0 && comisionSeleccionada > 0 ? (precioProducto / 1.21) * comisionSeleccionada : 0);
    }, [productoSeleccionado, comisionSeleccionada]);

    useEffect(() => {
        const precioProducto = productos.find((p) => p.nombre === productoSeleccionado)?.precio || 0;

        if (objetivo && !isNaN(Number(objetivo)) && Number(objetivo) > 0 && precioProducto && factor) {
            const nuevoMontoAVender = Number(objetivo) * 1.21 * factor;
            const nuevoVolumenCarrera = Number((nuevoMontoAVender / valorUSD).toFixed(3));
            const nuevoTotalVentas = Number((nuevoVolumenCarrera / ticketPromedio).toFixed(2));

            setMontoAVender(nuevoMontoAVender);
            setVolumenCarrera(nuevoVolumenCarrera);
            setTotalVentas(nuevoTotalVentas);
        }
    }, [objetivo, comisionSeleccionada, factor, productoSeleccionado, valorUSD, ticketPromedio]);
    const tasaCierreValor = nivelVendedor?.valor || 1;
    const minPresentacionesMes = Math.ceil(totalVentas / tasaCierreValor);
    const minPresentacionesSemana = Math.ceil(minPresentacionesMes / 4 + 1);

    const datosAccion: DatosAccion[] = [
        { titulo: "Nuevos Datos a Prospectar", valor: Math.ceil(totalVentas * 6), color: "bg-[var(--color-primary)]" },
        { titulo: "Mínimo Presentaciones x Mes", valor: minPresentacionesMes, color: "bg-[var(--color-secondary)]" },
        { titulo: "Mínimo Presentaciones x Sem.", valor: minPresentacionesSemana, color: "bg-[var(--color-accent)]" }
    ];

    return {
        montoAVender,
        volumenCarrera,
        totalVentas,
        gananciaNeta,
        nivelVendedor,
        datosAccion,
        ticketPromedio,
        setTicketPromedio,
        mes
    };
};

