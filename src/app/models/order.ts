import { Client } from "./client";
import { Product } from "./product";

export interface Order {
  id: string | null
  client: Client
  products: Product[]
  total: string
  createdAt: Date
}
