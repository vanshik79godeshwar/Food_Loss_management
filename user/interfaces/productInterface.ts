import { ObjectId } from "mongoose";

export interface ProductInterface {
  name: string;             // Name of the product
  price: number;            // Price of the product
  expiry_date: Date;        // Expiry date of the product
  discount?: number;        // Discount on the product (optional, defaults to 0)
  retailer_id: ObjectId;    // ID of the retailer (referencing the User model)
  product_image?: string;   // URL of the product image (optional)
  category: string;         // Category of the product
  quantity: number;         // Quantity of the product
  createdAt?: Date;         // Automatically added by timestamps
  updatedAt?: Date;         // Automatically added by timestamps
}
