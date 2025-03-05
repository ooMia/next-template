interface Case {
  src: string;
  render: () => React.ReactNode;
}

class CaseHandler {
  cases: Array<Case> = [];

  addCase(src: string, render: () => React.ReactNode) {
    this.cases.push({ src, render });
  }

  getCases() {
    return this.cases.map((c) => c.src);
  }
}

export { CaseHandler };
