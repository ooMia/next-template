// 4_x_x means only-code analysis result

export interface CodeOnlyAnalysisResultProps {
  code: string;
  contractName?: string;
  detection: any[];
}

export interface CodeOnlyAnalysisTestLogs {
  severity?: string;
  name?: string;
  description?: string;
}
