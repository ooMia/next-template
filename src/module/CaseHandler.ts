interface Case {
  src: string;
  render: () => void;
}

const CaseHandler = {
  cases: [] as Array<Case>,

  addCase(src: string, render: () => void) {
    this.cases.push({ src, render });
  },

  getCases() {
    return Object.keys(this.cases);
  },
};

export { CaseHandler };
