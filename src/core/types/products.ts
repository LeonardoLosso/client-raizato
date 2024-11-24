export interface ProductParams {
    search?: string;
    category_id?: number;
    fornecedor_id?: number;
    low_stock?: boolean;
}

export interface Product {
    id: number;
    name: string;
    code: string;
    description?: string;
    categoryId: number;
    categoryName?: string;
    fornecedorName?: string;
    fornecedorId: number;
    costPrice: number;
    salePrice: number;
    minStock: number;
    stock?: number;
    expiryDate: Date;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}