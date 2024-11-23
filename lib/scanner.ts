export async function scanWebsite(url: string) {
  try {
    const response = await fetch('/api/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', 
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`Failed to scan: ${response.statusText}`);
    }

    const { issues } = await response.json();
    return issues;
  } catch (error) {
    console.error('Error in scanWebsite:', error);
    throw error;
  }
}
