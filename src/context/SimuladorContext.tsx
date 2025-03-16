import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSimulador } from "../hooks/useSimulador";
import { DolarAPIResponse } from "../interfaces/dolar";
interface SimuladorContextType {
    objetivo: number | string;
    setObjetivo: (value: number | string) => void;
    productoSeleccionado: string;
    setProductoSeleccionado: (value: string) => void;
    comisionSeleccionada: number;
    setComisionSeleccionada: (value: number) => void;
    valorUSD: number;
    loading: boolean;
    simuladorData: ReturnType<typeof useSimulador>;
}
const SimuladorContext = createContext<SimuladorContextType | undefined>(undefined);
export const SimuladorProvider = ({ children }: { children: ReactNode }) => {
    const [objetivo, setObjetivo] = useState<number | string>("");
    const [productoSeleccionado, setProductoSeleccionado] = useState<string>("");
    const [comisionSeleccionada, setComisionSeleccionada] = useState<number>(0);
    const [valorUSD, setValorUSD] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchDolar = async () => {
            try {
                const response = await fetch("https://dolarapi.com/v1/dolares/oficial");
                const data: DolarAPIResponse = await response.json();
                setValorUSD(data.compra);
            } catch (error) {
                console.error("Error al obtener el valor del dólar:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDolar();
    }, []);
    const simuladorData = useSimulador({ objetivo, productoSeleccionado, comisionSeleccionada, valorUSD });
    return (
        <SimuladorContext.Provider value={{
            objetivo, setObjetivo,
            productoSeleccionado, setProductoSeleccionado,
            comisionSeleccionada, setComisionSeleccionada,
            valorUSD, loading, simuladorData
        }}>
            {children}
        </SimuladorContext.Provider>
    );
};
export const useSimuladorContext = () => {
    const context = useContext(SimuladorContext);
    if (!context) throw new Error("useSimuladorContext debe usarse dentro de un SimuladorProvider");
    return context;
};