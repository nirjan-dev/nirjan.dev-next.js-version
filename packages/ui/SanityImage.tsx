import sanityClient from "@sanity/client";
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";

const configuredSanityClient = sanityClient({
  projectId: "rl6xlgdh",
  dataset: "production",
  useCdn: true,
});

export const SanityImage = ({
  node,
  ...props
}: {
  node: {
    asset: {
      _ref: string;
    };
  };
}) => {
  const imageProps = useNextSanityImage(configuredSanityClient, node.asset);
  const alt = (node as any).alt || "";
  return (
    <Img
      {...imageProps}
      alt={alt}
      layout="responsive"
      sizes="(max-width: 800px) 100vw, 800px"
    />
  );
};
