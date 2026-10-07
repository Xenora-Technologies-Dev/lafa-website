export type CategoryWeight = 'primary' | 'secondary';

export type Category = {
  id: string;
  title: string;
  slug: string;
  description: string;
  sortOrder: number;
  weight: CategoryWeight;
  licenceCode?: string;
  productCount: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  imageFileId?: string;
  packSize?: string;
  origin?: string;
  categoryId: string;
  categorySlug: string;
  categoryTitle: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  imageUrl?: string;
  imageFileId?: string;
  publishedAt?: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Enquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  market?: string;
  interest?: string;
  message: string;
  createdAt: string;
};

export type Catalogue = {
  categories: Category[];
  products: Product[];
  posts: Post[];
};

export type ProductInput = {
  name: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  imageFileId: string | null;
  packSize: string | null;
  origin: string | null;
  categoryId: string;
  published: boolean;
};

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  imageUrl: string | null;
  imageFileId: string | null;
  publishedAt: string | null;
  published: boolean;
};

export type CategoryInput = {
  title: string;
  slug: string;
  description: string;
  sortOrder: number;
  weight: CategoryWeight;
  licenceCode: string | null;
};

export type EnquiryInput = {
  name: string;
  company: string;
  email: string;
  phone: string | null;
  market: string | null;
  interest: string | null;
  message: string;
};
