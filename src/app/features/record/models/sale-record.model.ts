export interface SaleRecord {
    id: string;
    fecha: string;
    items: Array<{
        productId: string;
        nombre: string;
        precio: number;
        qty: number;
    }>;
    subtotal: number;
    iva: number;
    total: number;
    metodoPago: string;
}
