export default function Layout({
  children,
  gas,
  token,
}: {
  children: React.ReactNode;
  gas: React.ReactNode;
  token: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-pink-600">
      {children}
      {gas}
      {token}
    </div>
  );
}
