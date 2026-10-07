export type ProductImage = {
  /** Local path or remote URL. An ImageKit URL can replace this string later. */
  src: string;
  alt: string;
};

export type ProductStatus = 'published' | 'draft';

export type ProductCategory = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image: ProductImage;
};

/**
 * Public catalogue product.
 * Specification fields stay null until LAFA supplies them.
 */
export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  image: ProductImage | null;
  gallery: ProductImage[];
  origin: string | null;
  packaging: string | null;
  availability: string | null;
  exportAvailable: boolean | null;
  featured: boolean;
  status: ProductStatus;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductQuery = {
  q?: string;
  category?: string;
  page?: string;
};

export type ProductListResult = {
  products: Product[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  q: string;
  category: ProductCategory | null;
  unknownCategory: boolean;
};
