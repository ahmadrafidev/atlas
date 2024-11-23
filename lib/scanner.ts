export async function scanWebsite(url) {
  try {
    const response = await fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
