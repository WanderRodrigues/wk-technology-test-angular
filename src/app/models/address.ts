export interface Address {
  postCode: string
  street: string
  number: string
  neighborhood: string
  complement?: string | null
  city: string
}