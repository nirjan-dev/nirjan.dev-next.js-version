import React from "react";
import Link from "next/link";

export const internalLink = ({ mark, children }) => {
  const { slug, blank } = mark;
  if (!slug?.current) {
    return <span>{children}</span>;
  }
  const href = `https://nirjan.dev/blog/${slug?.current}`;

  return blank ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link passHref href={href}>
      <a>{children}</a>
    </Link>
  );
};
