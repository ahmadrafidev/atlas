'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

import { scanWebsite } from '../../lib/scanner.ts';
import IssuesList from '../IssuesList/IssuesList';
import KeyboardNavigation from '../KeyboardNavigation/KeyboardNavigation';
import ReportExport from '../Report/Report';

export default function Atlas() {
  const [url, setUrl] = useState('');
  const [issues, setIssues] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [showKeyboardTest, setShowKeyboardTest] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const result = await scanWebsite(url);
      setIssues(result);
    } catch (error) {
      console.error('Scanning error:', error);
    }
    setIsScanning(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex space-x-2 mb-4">
          <Input
            type="url"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleScan} disabled={isScanning}>
            {isScanning ? 'Scanning...' : 'Scan'}
          </Button>
        </div>

        {issues.length > 0 && (
          <>
            <IssuesList issues={issues} />
            <div className="mt-4 space-x-2">
              <Button onClick={() => setShowKeyboardTest(true)}>
                Start Keyboard Navigation Test
              </Button>
              <ReportExport issues={issues} />
            </div>
          </>
        )}

        {showKeyboardTest && <KeyboardNavigation />}
      </CardContent>
    </Card>
  );
}
