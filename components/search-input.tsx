'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useUrlParams } from '@/hooks/useUrlParams';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchInputProps } from '@/types/order';

export default function SearchInput({ defaultValue = '' }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { setSearch } = useUrlParams();

  useEffect(() => {
    if (debouncedSearchTerm !== defaultValue) {
      setSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, setSearch, defaultValue]);

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Busque por nome..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
