import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Issue } from '@/types/issues';

interface IssuesListProps {
  issues: Issue[];
}

export default function IssuesList({ issues }: IssuesListProps) {
  if (!issues || issues.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-green-600 font-semibold text-lg">
          Your website is error-free! 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6 max-w-3xl mx-auto">
      {issues.map((issue, index) => (
        <Card
          key={index}
          className="border border-gray-300 shadow-lg rounded-lg"
        >
          <CardHeader className="pb-4 border-b border-gray-200">
            <CardTitle className="text-lg font-bold text-red-600">
              Issue {index + 1}: {issue.description}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-700 mb-3">
              <strong>Help:</strong> {issue.help}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Impact:</strong> {issue.impact || 'N/A'}
            </p>
            <ul className="list-disc pl-5 space-y-3 text-justify">
              {issue.nodes.map((node, nodeIndex) => (
                <li key={nodeIndex} className="text-sm text-gray-800">
                  <p className="font-medium text-gray-800">
                    {node.failureSummary}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>HTML:</strong> <code>{node.html}</code>
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Target:</strong> {node.target.join(', ')}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
