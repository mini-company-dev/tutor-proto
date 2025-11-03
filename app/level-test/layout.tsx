export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div>{children}</div>
    </div>
  );
}
