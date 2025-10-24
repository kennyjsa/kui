import { PageWrapper } from "@/components/PageWrapper";

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper
      title="Forms Showcase"
      description="Demonstração completa dos formulários do KUI Framework"
    >
      {children}
    </PageWrapper>
  );
}
