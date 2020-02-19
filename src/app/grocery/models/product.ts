export interface Product {
  id: string;
  image_url: string;
  stock: number;
  productName: string;
  price: number;
  productDescription: string;
  favorite: number;
  numItems?: number;
}
