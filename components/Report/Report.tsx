import { Button } from '@/components/ui/button'

export default function Report({ issues }) {
  const generateReport = () => {
    let report = '# Accessibility Scan Report\n\n'

    Object.entries(issues).forEach(([severity, severityIssues]) => {
      report += `## ${severity.charAt(0).toUpperCase() + severity.slice(1)}\n\n`
      severityIssues.forEach((issue) => {
        report += `- **${issue.description}**\n  Fix: ${issue.fix}\n\n`
      })
    })

    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'accessibility-report.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button onClick={generateReport}>Export Report</Button>
  )
}

