import Image from "next/image";

interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export const components = {
  Image: ({ alt = "", ...props }: ImageProps) => (
    <Image
      {...props}
      alt={alt}
      width={props.width || 800}
      height={props.height || 600}
      style={{ width: "100%", height: "auto" }}
      loading={props.loading || "lazy"}
      placeholder={props.placeholder || "blur"}
      blurDataURL={props.blurDataURL}
    />
  ),
};
