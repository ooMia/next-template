"use client";

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
        <div className="w-[60vw] p-4 border-2 border-dotted">{Code}</div>
        <div className="w-[40vw] p-4 border-2 border-dotted">{List}</div>
      </div>
    </div>
  );
}
