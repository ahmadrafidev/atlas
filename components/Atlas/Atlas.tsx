'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { scanWebsite } from '../../lib/scanner';
import IssuesList from '../IssuesList/IssuesList';
import { Issue } from '@/types/issues';

export default function Atlas() {
  const [url, setUrl] = useState<string>('');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const result: Issue[] = await scanWebsite(url);
      setIssues(result);
    } catch (error) {
      console.error('Scanning error:', error);
    }
    setIsScanning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <header className="absolute top-4 left-6 flex items-center space-x-2 text-black">
        <div className="text-3xl font-bold">Atlas</div>
      </header>

      <main className="flex flex-col items-center w-full max-w-5xl px-4 text-center my-12">
        <h1 className="text-3xl font-bold text-black mb-2">
          Website Accessibility Analysis <span className="italic">Simplified</span>
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Effortlessly analyze your websites accessibility.
        </p>

        <div className="flex w-full space-x-2">
          <Input
            type="url"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 text-lg py-3 px-4 rounded-lg border border-gray-300"
          />
          <Button
            onClick={handleScan}
            disabled={isScanning}
            className="px-6 py-3 text-lg bg-black text-white rounded-lg"
          >
            {isScanning ? 'Scanning...' : 'Scan'}
          </Button>
        </div>

        {issues.length > 0 && (
          <div className="mt-8">
            <IssuesList issues={issues} />
          </div>
        )}
      </main>
    </div>
  );
}
