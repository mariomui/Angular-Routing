/* Defines the product entity */
export class Product {
  id: number;
  productName: string;
  productCode: string;
  category: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;

  constructor() {
    Object.assign(this, {
      id: 0,
      productName: 'string',
      productCode: 'string',
      category: 'string',
      tags: [],
      releaseDate: 'string',
      price: 0,
      description: 'string',
      starRating: 0,
      imageUrl: 'string'
    });
  };
}

export class ProductResolved {
  product: Product;
  error?: any;
  constructor() {
    this.product = new Product();
  }
}
