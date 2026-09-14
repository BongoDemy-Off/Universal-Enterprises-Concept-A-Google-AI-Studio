import mockData from './prototype-data.json';

export interface Product {
  id: string;
  slug: string;
  name_en: string;
  name_bn: string | null;
  brand: string;
  category: string;
  product_type: string;
  sku: string;
  part_number: string;
  oem_number: string;
  regular_price: number;
  sale_price: number | null;
  currency: string;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  stock_qty: number;
  image: string;
  gallery: string[];
  short_description: string;
  specifications: Record<string, string>;
  warranty: string;
  rating_demo: number;
  reviews_count_demo: number;
  fitment_state_demo: 'confirmed_fit' | 'check_fitment' | 'multi_model_fit' | 'universal_fit' | 'nonmatch_example';
  fitments_demo: any[];
  universal_fit_demo: boolean;
  demoOnly: boolean;
}

export interface Brand {
  name: string;
  confirmedAnchor: boolean;
  models: string[];
}

export interface Bike {
  id: string;
  brand: string;
  model: string;
  year: string;
  cc: string;
  variant: string;
  demoOnly: boolean;
}

// Repository Adapter Pattern
export const DataRepository = {
  getProducts: (): Product[] => {
    return mockData.products as Product[];
  },
  getProductBySlug: (slug: string): Product | undefined => {
    return mockData.products.find(p => p.slug === slug) as Product | undefined;
  },
  getBrands: (): Brand[] => {
    return mockData.brands as Brand[];
  },
  getCategories: (): string[] => {
    return mockData.categories as string[];
  },
  getDemoBikes: (): Bike[] => {
    return mockData.demoBikes as Bike[];
  },
  getLocations: () => {
    return mockData.locations;
  },
  searchProducts: (query: string): Product[] => {
    const q = query.toLowerCase();
    return (mockData.products as Product[]).filter(p => 
      p.name_en.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q) ||
      p.part_number?.toLowerCase().includes(q) ||
      p.oem_number?.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
};
