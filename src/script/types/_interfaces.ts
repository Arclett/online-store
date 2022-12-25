export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    [key: string]: string | number | string[];
}

export interface IProductCard {
    product: IProduct;
    renderCard(): void;
}

export interface IFilters {
    category: string[];
    brand: string[];
    price: string[];
    stock: string[];
}
