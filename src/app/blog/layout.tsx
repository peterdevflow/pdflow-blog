import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest posts and updates",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
