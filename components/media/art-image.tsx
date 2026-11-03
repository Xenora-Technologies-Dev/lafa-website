import { getImageProps } from 'next/image';

export function ArtImage({
  desktop,
  mobile,
  alt,
  priority = false,
  sizes = '100vw',
  className,
  width = 1600,
  height = 900,
  mobileWidth = 900,
  mobileHeight = 1125,
}: {
  desktop: string;
  mobile?: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
}) {
  const shared = { alt, sizes, priority };
  const { props: desktopProps } = getImageProps({ ...shared, src: desktop, width, height });
  const mobileProps = mobile
    ? getImageProps({ ...shared, src: mobile, width: mobileWidth, height: mobileHeight }).props
    : null;

  return (
    <picture className="block h-full w-full">
      {mobileProps?.srcSet ? <source media="(max-width: 1023px)" srcSet={mobileProps.srcSet} /> : null}
      <img {...desktopProps} className={className ?? 'h-full w-full object-cover'} alt={alt} />
    </picture>
  );
}
