'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { Order } from '@/types/order';
import { useUrlParams } from '@/hooks/useUrlParams';
import { formatCurrency, formatDate, formatStatus } from '@/lib/utils';

interface OrdersTableProps {
  orders: Order[];
  currentSort?: string;
}

export default function OrdersTable({ orders, currentSort }: OrdersTableProps) {
  const { setSort } = useUrlParams();

  const getSortIcon = (field: string) => {
    if (currentSort === field) return <ChevronUp className="w-4" />;
    if (currentSort === `-${field}`) return <ChevronDown className="w-4" />;
    return <ChevronsUpDown className="w-4" />;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Status</TableHead>
          <TableHead 
            className="cursor-pointer" 
            onClick={() => setSort('order_date', currentSort)}
          >
            <div className="flex items-center gap-1">
              Data
              {getSortIcon('order_date')}
            </div>
          </TableHead>
          <TableHead 
            className="text-right cursor-pointer" 
            onClick={() => setSort('amount_in_cents', currentSort)}
          >
            <div className="flex justify-end items-center gap-1">
              Valor
              {getSortIcon('amount_in_cents')}
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer_name}</div>
              <div className="hidden md:inline text-sm text-muted-foreground">
                {order.customer_email}
              </div>
            </TableCell>
            <TableCell>
              <Badge className="text-xs" variant="outline">
                {formatStatus(order.status)}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {formatDate(order.order_date)}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(order.amount_in_cents)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
