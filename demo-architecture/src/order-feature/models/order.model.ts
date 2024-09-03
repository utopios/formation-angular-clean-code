export interface Order {
    id: number;
    product: string;
    quantity: number;
    total: number;
    status: 'Pending' | 'Shipped' | 'Delivered';
  }