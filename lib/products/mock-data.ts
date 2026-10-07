/**
 * The public catalogue no longer ships a sample product list.
 * Categories come from data/categories.json (licence 4630.01–.10 + 4690).
 * Products are read from Neon through lib/products/repository.ts.
 *
 * Grains & cereals and pulses & legumes are not on the food wholesale licence
 * list used for this site, so they are not seeded as catalogue categories.
 * Legacy slug maps live in lib/products/category-meta.ts.
 */
export {};