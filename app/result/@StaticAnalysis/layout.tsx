export default function StaticAnalysisLayout({
  children,
  Code,
  List,
}: {
  children: React.ReactNode;

  Code: React.ReactNode;
  List: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {children}

      <div className="flex">
        {Code}
        {List}
      </div>
      {/* add here */}
    </div>
  );
}
