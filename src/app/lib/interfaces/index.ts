export interface Order {
  id: string;
  reference: string;
  provider: string;
  status: string;
  eta: string;
}

export interface OrdersArgs {
  status?: string;
  provider?: string;
}

export interface OrderArgs {
  id: string;
}

export interface UpdateOrderStatusArgs {
  id: string;
  status: string;
}
