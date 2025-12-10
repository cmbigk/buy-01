export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sellerId: string;
  sellerEmail: string;
  sellerName: string;
  sellerAvatar?: string;
  imageIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sellerName?: string;
  sellerAvatar?: string | null;
  imageIds?: string[];
}
