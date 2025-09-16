import { ApiResponse } from '@/types/order';

const API_BASE = 'https://apis.codante.io/api/orders-api';

interface GetOrdersParams {
  page?: number;
  search?: string;
  status?: string;
  sort?: string;
}

export async function getOrders({
  page = 1,
  search = '',
  status = '',
  sort = 'order_date'
}: GetOrdersParams = {}): Promise<ApiResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(search && { search }),
    ...(status && { status }),
    ...(sort && { sort })
  });

  const response = await fetch(`${API_BASE}/orders?${params}`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Falha ao buscar pedidos');
  }
  
  return response.json();
}
