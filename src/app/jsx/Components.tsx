import { CaseHandler } from "@/module/CaseHandler";

const JsxCase = new CaseHandler();

// ------------------------------ Case A ------------------------------

const srcCaseA = `const amazingThings = [
    { id: 1, label: '햇살' },
    { id: 2, label: '바람' },
    { id: 3, label: '비' },
    { id: 4, label: '눈' },
];

const MyComponent = () => (
    <section id="list">
        <h1>내가 만든 목록!</h1>
        <p>대단하지 않나요? 멋진 것들이 모여 있습니다!</p>
        <ul>
            {amazingThings.map(t => <li key={t.id}>{t.label}</li>)}
        </ul>
    </section>
)`;
const renderCaseA = () => {
  const amazingThings = [
    { id: 1, label: "햇살" },
    { id: 2, label: "바람" },
    { id: 3, label: "비" },
    { id: 4, label: "눈" },
  ];

  return (
    <section id="list">
      <h1>내가 만든 목록!</h1>
      <p>대단하지 않나요? 멋진 것들이 모여 있습니다!</p>
      <ul>
        {amazingThings.map((t) => (
          <li key={t.id}>{t.label}</li>
        ))}
      </ul>
    </section>
  );
};
JsxCase.addCase(srcCaseA, renderCaseA);

// ------------------------------ Case B ------------------------------

const srcCaseB = `const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="p-2 border border-dashed">{children}</div>
);

const a = 1;
const b = 2;

const MyComponent = () => (
  <Box>b가 a보다 큽니까? {b > a ? "네" : "아니오"}</Box>
);
`;
const renderCaseB = () => {
  const Box = ({ children }: { children: React.ReactNode }) => (
    <div className="p-2 border border-dashed">{children}</div>
  );

  const a = 1;
  const b = 2;

  return <Box>b가 a보다 큽니까? {b > a ? "네" : "아니오"}</Box>;
};
JsxCase.addCase(srcCaseB, renderCaseB);

// ------------------------------ Export ------------------------------

export { JsxCase };
