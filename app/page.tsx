import { Suspense } from 'react';
import FilterDropdown from '@/components/filter-dropdown';
import SearchInput from '@/components/search-input';
import OrdersContent from '@/components/orders-content';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ModeToggle } from '@/components/ModeToggle';

interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
    status?: string;
    sort?: string;
  };
}

export default function Component({ searchParams }: PageProps) {
  return (
    <main className="container px-1 py-10 md:p-10">
        <div className="flex justify-end mb-4">
          <ModeToggle />
        </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>
          <div className="flex pt-10 gap-4">
            <SearchInput defaultValue={searchParams.search} />
            <FilterDropdown defaultValue={searchParams.status} />
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="p-4 text-center">Carregando pedidos...</div>}>
            <OrdersContent searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
