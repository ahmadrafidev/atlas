import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function IssuesList({ issues }) {
  if (!issues || issues.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-green-600 font-semibold text-lg">
          🎉 Your website is error-free!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {issues.map((issue, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-red-600 font-bold">
              Issue {index + 1}: {issue.description}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Help:</strong> {issue.help}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Impact:</strong> {issue.impact || 'N/A'}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {issue.nodes.map((node, nodeIndex) => (
                <li key={nodeIndex}>
                  <p className="font-medium">{node.failureSummary}</p>
                  <p className="text-sm text-gray-500">
                    <strong>HTML:</strong> <code>{node.html}</code>
                  </p>
                  <p className="text-sm text-gray-500">
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
