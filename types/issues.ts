export interface Issue {
  description: string;
  help: string;
  impact: string | null;
  nodes: {
    failureSummary: string;
    html: string;
    target: string[] | string;
  }[];
}
