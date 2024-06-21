export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    inStock: boolean;
    images: string[];
}

export interface Backdrop extends Product {
    sizes: string[];
}

export interface Prop extends Product {
    size: string;
    color: string;
    upholstered: boolean;
    upholsteryCount: number;
    upholsteryColor: string | null;
    ageRange: string;
}

export interface Decoration extends Product {
    backdrop: string;
    props: Prop[];
}
