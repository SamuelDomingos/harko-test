
import { getOrders } from '@/lib/api';
import { ApiResponse } from '@/types/order';
import OrdersTable from '@/components/orders-table';
import Pagination from '@/components/pagination';
import { PageProps } from '@/types/order';

export default async function OrdersContent({ searchParams }: PageProps) {
  try {
    const ordersData: ApiResponse = await getOrders({
      page: Number(searchParams.page) || 1,
      search: searchParams.search || '',
      status: searchParams.status || '',
      sort: searchParams.sort || 'order_date'
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