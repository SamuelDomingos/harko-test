export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  order_date: string;
  amount_in_cents: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
    status?: string;
    sort?: string;
  };
}

export interface ApiResponse {
  data: Order[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface FilterDropdownProps {
  defaultValue?: string;
}

export interface SearchInputProps {
  defaultValue?: string;
}

export interface OrdersTableProps {
  orders: Order[];
  currentSort?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}