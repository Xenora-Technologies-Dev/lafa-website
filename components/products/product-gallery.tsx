import { ImageBlock } from '@/components/system/image-block';
import { imageAlt, imageSrc } from '@/lib/products';
import type { ProductImage } from '@/lib/products/types';

export function ProductGallery({
  image,
  gallery,
  priority = false,
}: {
  image: ProductImage | null;
  gallery: ProductImage[];
  priority?: boolean;
}) {
  const extras = gallery.filter((item) => imageSrc(item) && imageSrc(item) !== imageSrc(image));
  return (
    <div>
      <ImageBlock
        src={imageSrc(image)}
        alt={imageAlt(image, 'Product photograph')}
        ratio="1 / 1"
        fit="cover"
        priority={priority}
        sizes="(min-width: 768px) 40rem, 100vw"
      />
      {extras.length ? (
        <ul className="mt-3 grid grid-cols-3 gap-3">
          {extras.map((item) => (
            <li key={item.src}>
              <ImageBlock src={imageSrc(item)} alt={imageAlt(item, 'Additional product photograph')} ratio="1 / 1" fit="cover" sizes="12rem" />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
