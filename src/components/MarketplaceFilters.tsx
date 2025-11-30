import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, X } from "lucide-react";

export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  minKwh: number;
  maxKwh: number;
  searchTerm: string;
  sortBy: string;
}

interface MarketplaceFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export const MarketplaceFilters = ({ onFilterChange, onReset }: MarketplaceFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 10000,
    minKwh: 0,
    maxKwh: 100000,
    searchTerm: '',
    sortBy: 'recent',
  });

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [kwhRange, setKwhRange] = useState([0, 100000]);

  const handleApplyFilters = () => {
    const updatedFilters = {
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minKwh: kwhRange[0],
      maxKwh: kwhRange[1],
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      minPrice: 0,
      maxPrice: 10000,
      minKwh: 0,
      maxKwh: 100000,
      searchTerm: '',
      sortBy: 'recent',
    };
    setFilters(resetFilters);
    setPriceRange([0, 10000]);
    setKwhRange([0, 100000]);
    onReset();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <CardTitle>Filtros</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <X className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        </div>
        <CardDescription>
          Refine sua busca por tokens de energia
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Buscar Fazenda ou Cooperativa</Label>
          <Input
            id="search"
            placeholder="Ex: Fazenda Solar Nordeste..."
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          />
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Faixa de Preço Total</Label>
          <div className="px-2">
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              R$ {priceRange[0].toLocaleString('pt-BR')}
            </span>
            <span className="text-muted-foreground">
              R$ {priceRange[1].toLocaleString('pt-BR')}
            </span>
          </div>
        </div>

        {/* kWh Range */}
        <div className="space-y-3">
          <Label>Quantidade de Energia (kWh)</Label>
          <div className="px-2">
            <Slider
              min={0}
              max={100000}
              step={1000}
              value={kwhRange}
              onValueChange={setKwhRange}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {kwhRange[0].toLocaleString('pt-BR')} kWh
            </span>
            <span className="text-muted-foreground">
              {kwhRange[1].toLocaleString('pt-BR')} kWh
            </span>
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label htmlFor="sortBy">Ordenar por</Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
          >
            <SelectTrigger id="sortBy" className="bg-background">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="recent">Mais Recentes</SelectItem>
              <SelectItem value="price-asc">Menor Preço</SelectItem>
              <SelectItem value="price-desc">Maior Preço</SelectItem>
              <SelectItem value="kwh-asc">Menor Quantidade</SelectItem>
              <SelectItem value="kwh-desc">Maior Quantidade</SelectItem>
              <SelectItem value="discount">Maior Desconto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full" 
          onClick={handleApplyFilters}
        >
          <Filter className="w-4 h-4 mr-2" />
          Aplicar Filtros
        </Button>
      </CardContent>
    </Card>
  );
};
