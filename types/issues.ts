export interface IssueNode {
  failureSummary: string;
  html: string;
  target: string[];
}

export interface Issue {
  description: string;
  help: string;
  impact?: string;
  nodes: IssueNode[];
}
