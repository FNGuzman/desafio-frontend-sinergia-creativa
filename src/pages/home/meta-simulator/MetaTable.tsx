import { useState } from "react";
export default function MetaDashboard() {
    const productos = [
        { id: "A", nombre: "Producto A", precio: 10000 },
        { id: "B", nombre: "Producto B", precio: 20000 },
        { id: "C", nombre: "Producto C", precio: 30000 },
        { id: "D", nombre: "Producto D", precio: 40000 },
        { id: "E", nombre: "Producto E", precio: 50000 },
    ];

    const comisiones = [
        { id: "10", porcentaje: 0.10, label: "10%" },
        { id: "15", porcentaje: 0.15, label: "15%" },
        { id: "20", porcentaje: 0.20, label: "20%" },
        { id: "35", porcentaje: 0.35, label: "35%" },
        { id: "40", porcentaje: 0.40, label: "40%" },
    ]
    const [meta, setMeta] = useState<string>("");
    const [productoSeleccionado, setProductoSeleccionado] = useState(productos[0]);
    const [comisionSeleccionada, setComisionSeleccionada] = useState(comisiones[0].porcentaje);

    const metaValue = parseFloat(meta) || 0;
    const ventasNecesarias = Math.ceil(metaValue / (productoSeleccionado.precio * comisionSeleccionada));

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-primary text-center mb-4">🎯 Asistente de Metas</h1>
            <div className="bg-secondary text-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                    <p className="text-sm"><strong>📛 Nombre:</strong> Martin Rodriguez</p>
                    <p className="text-sm"><strong>📅 Mes:</strong> Febrero</p>
                </div>
                <a className="text-light text-3xl" />
            </div>
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <label className="block text-sm font-semibold text-primary">💰 ¿Cuánto quieres ganar?</label>
                <input
                    type="text"
                    value={meta}
                    onChange={(e) => setMeta(e.target.value)}
                    className="border border-muted rounded p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Ingrese su meta en USD"
                />
            </div>
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <label className="block text-sm font-semibold text-primary">🛒 Selecciona un Producto</label>
                <select
                    value={productoSeleccionado.id}
                    onChange={(e) =>
                        setProductoSeleccionado(
                            productos.find((p) => p.id === e.target.value) || productos[0]
                        )
                    }
                    className="border border-muted rounded p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                            {producto.nombre} - ${producto.precio.toLocaleString()}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <label className="block text-sm font-semibold text-primary">📊 Selecciona tu Comisión</label>
                <select
                    value={comisionSeleccionada}
                    onChange={(e) => setComisionSeleccionada(parseFloat(e.target.value))}
                    className="border border-muted rounded p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    {comisiones.map((comision) => (
                        <option key={comision.id} value={comision.porcentaje}>
                            {comision.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-6 bg-primary text-white p-4 rounded-lg shadow-md text-center">
                <a className="text-light text-3xl mx-auto" />
                <h2 className="text-lg font-semibold">Objetivo del Mes</h2>
                <p className="text-xl font-bold">${metaValue.toLocaleString()}</p>
                <p className="text-sm mt-2">🚀 Necesitas vender: <strong>{ventasNecesarias} ventas</strong></p>
            </div>
            <div className="mt-6 bg-secondary text-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">📌 Plan de Acción</h2>
                <ul className="text-sm">
                    <li><a className="inline-block text-light mr-2" /> <strong>Prospectos:</strong> 16</li>
                    <li><a className="inline-block text-light mr-2" /> <strong>Presentaciones por Mes:</strong> 5</li>
                    <li><a className="inline-block text-light mr-2" /> <strong>Presentaciones por Semana:</strong> 2</li>
                    <li><a className="inline-block text-light mr-2" /> <strong>Capacitación Requerida:</strong> 20hs semanales</li>
                </ul>
            </div>
        </div>
    );
}
