import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub",
  description: "GitHub activity, contributions, languages, and projects",
};

export default function GitHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
