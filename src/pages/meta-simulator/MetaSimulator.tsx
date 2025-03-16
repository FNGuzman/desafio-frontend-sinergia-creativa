import { comisiones, productos } from "../../constants/products";
import { useSimuladorContext } from "../../context/SimuladorContext";
import BotonDescargarPDF from "./components/BotonDescargarPDF";
import Header from "./components/Header";
import PlanAccion from "./components/PlanAccion";
import VentaResumen from "./components/VentaResumen";


const MetaSimulator = () => {
    const {
        objetivo,
        setObjetivo,
        productoSeleccionado,
        setProductoSeleccionado,
        comisionSeleccionada,
        setComisionSeleccionada,
        valorUSD,
        loading,
        simuladorData: { montoAVender, volumenCarrera, totalVentas, gananciaNeta, datosAccion, nivelVendedor, ticketPromedio, mes }
    } = useSimuladorContext();

    return (
        <div className="p-1">
            {loading ? (
                <p className="text-center text-gray-500">Cargando datos...</p>
            ) : (
                <>
                    <Header
                        nivelVendedor={nivelVendedor?.label || "Desconocido"}
                        gananciaNeta={gananciaNeta}
                        mes={mes}
                        ticketPromedio={ticketPromedio}
                        valorUSD={valorUSD}
                        productoSeleccionado={productoSeleccionado}
                        setProductoSeleccionado={setProductoSeleccionado}
                        comisionSeleccionada={comisionSeleccionada}
                        setComisionSeleccionada={setComisionSeleccionada}
                        productos={productos}
                        comisiones={comisiones}
                    />

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
                    <VentaResumen
                        montoAVender={montoAVender}
                        volumenCarrera={volumenCarrera}
                        totalVentas={totalVentas}
                        gananciaNeta={gananciaNeta}
                    />
                    <PlanAccion datosAccion={datosAccion} />
                    <BotonDescargarPDF />

                </>
            )}
        </div>
    );
};

export default MetaSimulator;
