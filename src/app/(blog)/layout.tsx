import MainFooter from "@components/MainFooter";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <MainFooter />
    </>
  );
}
