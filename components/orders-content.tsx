
import { getOrders } from '@/lib/api';
import { ApiResponse } from '@/types/order';
import OrdersTable from '@/components/orders-table';
import Pagination from '@/components/pagination';

interface OrdersContentProps {
  searchParams: {
    page?: string;
    search?: string;
    status?: string;
    sort?: string;
  };
}

export default async function OrdersContent({ searchParams }: OrdersContentProps) {
  try {
    const ordersData: ApiResponse = await getOrders({
      page: Number(searchParams.page) || 1,
      search: searchParams.search || '',
      status: searchParams.status || '',
      sortBy: searchParams.sort?.replace(/^-/, '') || 'order_date',
      sortOrder: searchParams.sort?.startsWith('-') ? 'desc' : 'asc'
    });

    return (
      <>
        <OrdersTable 
          orders={ordersData.data} 
          currentSort={searchParams.sort}
        />
        <div className="mt-8">
          <Pagination 
            currentPage={ordersData.meta.current_page}
            totalPages={ordersData.meta.last_page}
            hasNext={!!ordersData.links.next}
            hasPrev={!!ordersData.links.prev}
          />
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-2">Erro ao carregar pedidos</p>
      </div>
    );
  }
}