export interface FileScope {
  file_name: string;
  license: string;
  solc_version: string;
  imports: string[];
  contract_scope: ContractScope;
  function_scopes: FunctionScope[];
}

export interface ContractScope {
  name: string;
  variable: Variable[];
  functions: string[];
  libraries: string[];
}

export interface Variable {
  name: string;
  signature: string;
  type: string;
  location: string;
  visibility: string | null;
  scope: string;
  mutability: string;
}

export type Parameter = Variable;

export interface FunctionScope {
  name: string;
  variable: Variable[];
  parameters: Parameter[];
  purity: string | null;
  visibility: string | null;
  payable: boolean;
  override: boolean;
  modifier: string[];
  returns: Return[];
  body: string;
  access_control: AccessControl[];
}

export interface Return {
  name: string;
  signature: string;
  type: string;
  location: string;
  visibility: any;
  scope: string;
  mutability: string;
}

export interface AccessControl {
  method: string;
  logic: string;
}
