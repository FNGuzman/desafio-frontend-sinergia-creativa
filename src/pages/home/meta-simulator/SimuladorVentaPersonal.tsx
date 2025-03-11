import { useState, useEffect } from "react";
const productos = [
    { id: "A", nombre: "Producto A", precio: 10000, tasaCierre: 0.3 },
    { id: "B", nombre: "Producto B", precio: 20000, tasaCierre: 0.35 },
    { id: "C", nombre: "Producto C", precio: 30000, tasaCierre: 0.5 },
    { id: "D", nombre: "Producto D", precio: 40000, tasaCierre: 0.5 },
    { id: "E", nombre: "Producto E", precio: 50000, tasaCierre: 0.5 },
];

const comisiones = [
    { id: "10", porcentaje: 0.10, label: "10%", presentacionesMes: 31 },
    { id: "15", porcentaje: 0.15, label: "15%", presentacionesMes: 18 },
    { id: "20", porcentaje: 0.20, label: "20%", presentacionesMes: 9 },
    { id: "35", porcentaje: 0.35, label: "35%", presentacionesMes: 5 },
    { id: "40", porcentaje: 0.40, label: "40%", presentacionesMes: 3 },
];

const obtenerValorPorComision = (comision: number, valores: Record<string, number>) => {
    switch (comision) {
        case 0.10: return valores.D;
        case 0.15: return valores.E;
        case 0.20: return valores.F;
        case 0.35: return valores.G;
        case 0.40: return valores.H;
        default: return 0;
    }
};

const SimuladorVentaPersonal = () => {
    const [meta, setMeta] = useState<number>(900000);
    const [comisionSeleccionada, setComisionSeleccionada] = useState(comisiones[3]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(productos[4]);
    const [tengoQueVender, setTengoQueVender] = useState(0);
    const [volumenCarrera, setVolumenCarrera] = useState(0);
    const [totalVentasMes, setTotalVentasMes] = useState(0);
    const [nuevosProspectos, setNuevosProspectos] = useState(0);
    const [presentacionesMes, setPresentacionesMes] = useState(0);
    const [presentacionesSemana, setPresentacionesSemana] = useState(0);

    const ticketPromedio = 1100;
    const valorUSD = 1055;
    useEffect(() => {
        const valoresVenta = { D: 10890000, E: 7187400, F: 5445000, G: 3103650, H: 1960200 };
        const valoresPresentaciones = { D: 31, E: 18, F: 9, G: 5, H: 3 };
        const precioProducto = productoSeleccionado.precio;
        const nuevoTengoQueVender = obtenerValorPorComision(comisionSeleccionada.porcentaje, valoresVenta);
        const nuevoVolumenCarrera = Number((nuevoTengoQueVender / valorUSD).toFixed(3));
        const nuevoTotalVentasMes = Number((nuevoVolumenCarrera / precioProducto).toFixed(1));
        const nuevoNuevosProspectos = nuevoTotalVentasMes * 6;
        const nuevoPresentacionesMes = obtenerValorPorComision(comisionSeleccionada.porcentaje, valoresPresentaciones);
        const nuevoPresentacionesSemana = Math.ceil(nuevoPresentacionesMes / 4);

        setTengoQueVender(nuevoTengoQueVender);
        setVolumenCarrera(nuevoVolumenCarrera);
        setTotalVentasMes(nuevoTotalVentasMes);
        setNuevosProspectos(nuevoNuevosProspectos);
        setPresentacionesMes(nuevoPresentacionesMes);
        setPresentacionesSemana(nuevoPresentacionesSemana);
    }, [comisionSeleccionada, productoSeleccionado, meta]);

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">

            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700">¿Cuánto quieres ganar?</label>
                <input
                    type="number"
                    value={meta}
                    onChange={(e) => setMeta(Number(e.target.value))}
                    className="border border-gray-400 rounded p-2 w-full text-sm"
                    placeholder="Ingrese su meta en USD"
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700">Selecciona una Comisión</label>
                <select
                    className="border border-gray-400 rounded p-2 w-full text-sm"
                    value={comisionSeleccionada.id}
                    onChange={(e) =>
                        setComisionSeleccionada(comisiones.find(c => c.id === e.target.value)!)
                    }
                >
                    {comisiones.map((comision) => (
                        <option key={comision.id} value={comision.id}>
                            {comision.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700">Selecciona un Producto</label>
                <select
                    className="border border-gray-400 rounded p-2 w-full text-sm"
                    value={productoSeleccionado.id}
                    onChange={(e) =>
                        setProductoSeleccionado(productos.find(p => p.id === e.target.value)!)
                    }
                >
                    {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                            {producto.nombre} - ${producto.precio}
                        </option>
                    ))}
                </select>
            </div>
            <div className="bg-gray-900 text-white p-4 rounded-lg text-center">
                <h2 className="text-lg font-bold">OBJETIVO</h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-800 p-3 rounded">
                        <p className="text-sm">Tengo que Vender</p>
                        <p className="text-lg font-bold">${tengoQueVender.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                        <p className="text-sm">Volumen Carrera</p>
                        <p className="text-lg font-bold">{volumenCarrera} USD</p>
                    </div>
                </div>
                <div className="mt-4 bg-gray-700 p-3 rounded text-center">
                    <p className="text-sm">Total Ventas en el Mes</p>
                    <p className="text-lg font-bold">{totalVentasMes}</p>
                </div>
            </div>
        </div>
    );
};

export default SimuladorVentaPersonal;
