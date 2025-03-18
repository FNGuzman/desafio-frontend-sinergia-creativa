export interface Producto {
    id: number;
    nombre: string;
    precio: number;
}

export interface TasaCierre {
    label: string;
    valor: number;
}

export interface DatosAccion {
    titulo: string;
    valor: number;
    color: string;
}

export interface Venta {
    id: number;
    dia: number;
    producto: string;
    comision: number;
    monto: number;
    comisionGanada: number;
    productoId?: number;
    comisionPorcentaje?: number;
}

export interface Mes {
    id: number;
    nombre: string;
    resumenVentas: {
        montoAVender: number;
    };
    ventas: Venta[];
}

export interface Meta {
    id: number;
    anio: number;
    meses: Mes[];
}


export interface VentaIniciar {
    productoId: string;
    monto: number;
    comisionPorcentaje: number;
    comisionReal: string;
    comisionGanada: number;
}

export interface MesIniciar {
    id: number;
    nombre: string;
    diaInicio?: number;
    resumenVentas: {
        montoAVender: number;
    };
    ventas: VentaIniciar[];
    totalGanado: number;
    prospectos: number;
}

export interface MetaIniciar {
    id: number;
    anio: number;
    meses: MesIniciar[];
}