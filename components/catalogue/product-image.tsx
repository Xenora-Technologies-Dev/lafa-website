import { ImageBlock } from '@/components/system/image-block';

export function ProductImage({
  name,
  imageUrl,
  variant = 'card',
  priority = false,
}: {
  name: string;
  imageUrl?: string | null;
  variant?: 'card' | 'detail';
  priority?: boolean;
}) {
  return <ImageBlock src={imageUrl} alt={name} priority={priority} fit="contain" ratio={variant === 'detail' ? '1 / 1' : '4 / 3'} />;
}
