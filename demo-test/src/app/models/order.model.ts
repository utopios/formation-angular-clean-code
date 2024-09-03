export interface Order {
    id:string,
    products: Product[]
} 

interface Product {
    name:string,
    price: number,
    qty: number
}