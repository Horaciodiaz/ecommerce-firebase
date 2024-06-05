export interface Usuario {
    id:        string;
    nombre:    string;
    correo:    string;
    direccion: string;
    telefono:  string;
    carrito:   Carrito;
    pedidos:   UsuarioPedido[];
}

export interface Item {
    productoId: string;
    cantidad:   number;
}

export interface Carrito {
    items: Item[];
}

export interface UsuarioPedido {
    pedidoId: string;
    fecha:    Date;
    total:    number;
    items:    Item[];
    estado:   string;
}