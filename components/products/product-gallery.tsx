'use client';

import { useRef, useState } from 'react';
import { ImageBlock } from '@/components/system/image-block';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';
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
  const frames = [image, ...extras].filter((item): item is ProductImage => Boolean(imageSrc(item)));
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const current = frames[active] ?? image;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      gsap.fromTo('.gallery-frame', { opacity: 0.35 }, { opacity: 1, duration: 0.4, ease: 'power1.out' });
    });
    return () => mm.revert();
  }, { scope: ref, dependencies: [active] });

  return (
    <div ref={ref}>
      <div className="gallery-frame">
        <ImageBlock
          src={imageSrc(current)}
          alt={imageAlt(current, 'Product photograph')}
          ratio="1 / 1"
          fit="cover"
          priority={priority && active === 0}
          sizes="(min-width: 768px) 40rem, 100vw"
        />
      </div>
      {frames.length > 1 ? (
        <ul className="mt-3 grid grid-cols-3 gap-3">
          {frames.map((item, index) => (
            <li key={`${item.src}-${index}`}>
              <button type="button" className="block w-full" aria-current={index === active ? 'true' : undefined} onClick={() => setActive(index)}>
                <ImageBlock src={imageSrc(item)} alt={imageAlt(item, 'Additional product photograph')} ratio="1 / 1" fit="cover" sizes="12rem" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
