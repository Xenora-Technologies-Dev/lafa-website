export type { Product, ProductCategory, ProductImage, ProductListResult, ProductQuery, ProductStatus } from '@/lib/products/types';
export { imageAlt, imageSrc } from '@/lib/products/images';
export { resolveCatalogueImage, categoryImage } from '@/lib/products/category-meta';
export {
  PRODUCT_PAGE_SIZE,
  canonicalCategorySlug,
  canonicalProductSlug,
  exportAvailabilityLabel,
  getProductBySlug,
  getProductCategory,
  listFeaturedProducts,
  listProductCategories,
  listPublishedProducts,
  listRelatedProducts,
  productListHref,
  productPath,
  queryProducts,
  specificationValue,
} from '@/lib/products/repository';
