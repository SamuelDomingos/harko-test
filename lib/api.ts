import { ApiResponse } from '@/types/order';

const API_BASE = 'https://apis.codante.io/api/orders-api';

interface GetOrdersParams {
  page?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getOrders({
  page = 1,
  search = '',
  status = '',
  sortBy = 'order_date',
  sortOrder = 'desc'
}: GetOrdersParams = {}): Promise<ApiResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(search && { search }),
    ...(status && { status }),
    ...(sortBy && { 
      sort: sortOrder === 'desc' ? `-${sortBy}` : sortBy 
    })
  });

  const response = await fetch(`${API_BASE}/orders?${params}`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Falha ao buscar pedidos');
  }
  
  return response.json();
}