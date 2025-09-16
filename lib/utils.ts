import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

export function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'Pendente',
    'completed': 'Completo',
    'processing': 'Processando',
    'shipped': 'Enviado',
    'delivered': 'Entregue',
    'cancelled': 'Cancelado'
  };
  
  return statusMap[status] || status;
}
