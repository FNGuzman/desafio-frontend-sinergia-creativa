// Lista de productos con sus precios
export const productos = [
    { id: "A", nombre: "Producto A", precio: 700000 },
    { id: "B", nombre: "Producto B", precio: 900000 },
    { id: "C", nombre: "Producto C", precio: 1100000 },
    { id: "D", nombre: "Producto D", precio: 1300000 },
    { id: "E", nombre: "Producto E", precio: 1500000 },
    { id: "F", nombre: "Producto F", precio: 1700000 },
    { id: "J", nombre: "Producto J", precio: 1900000 },
    { id: "H", nombre: "Producto H", precio: 2100000 },
];
//Lista de comisiones disponibles
export const comisiones = [
    { id: "10", porcentaje: 0.10, label: "10%" },
    { id: "15", porcentaje: 0.15, label: "15%" },
    { id: "20", porcentaje: 0.20, label: "20%" },
    { id: "35", porcentaje: 0.35, label: "35%" },
    { id: "40", porcentaje: 0.40, label: "40%" },
];
//Lista de valores de dolar
export const valorDolar = [
    { id: "1", label: "Oficial", valor: 1055 },
]
//Lista de tasas de cierre
export const tasaCierre = [
    { id: "1", label: "Junior", valor: 0.3 },
    { id: "2", label: "Semi Senior", valor: 0.35 },
    { id: "3", label: "Senior", valor: 0.5 },
]

export const factoresComision: { [key: number]: number } = {
    0.10: 10,
    0.15: 6.6,
    0.20: 5,
    0.35: 2.85,
    0.40: 1.8,
};

