import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience as Full Stack Developer",
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
