import { Address } from "./address";

export interface Client {
  id: string | null
  name: string
  document: string
  address: Address
  email: string
  birth: Date
}
