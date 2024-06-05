import { Item } from "../clients/interfaces/client.interface";

export interface ImagenesPromocionale {
    id:          string;
    url:         string;
    descripcion: string;
}

export interface Pedido {
    id:        string;
    usuarioId: string;
    fecha:     Date;
    total:     number;
    items:     Item[];
    estado:    string;
}

export interface Producto {
    id:           string;
    nombre:       string;
    precio:       number;
    categoria:    string;
    subcategoria: string;
    descripcion:  string;
    imagenes:     string[];
}