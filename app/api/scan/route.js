import puppeteer from 'puppeteer';
import { resolve } from 'path';

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !url.startsWith('http')) {
      return new Response(JSON.stringify({ error: 'Valid URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (error) {
      console.error('Error loading URL:', error);
      return new Response(
        JSON.stringify({ error: `Failed to load URL: ${url}` }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const axePath = resolve(process.cwd(), 'public/axe-core/axe.min.js');
    await page.addScriptTag({ path: axePath });

    const results = await page.evaluate(async () => {
      return await window.axe.run();
    });

    await browser.close();

    const issues = results.violations.map((violation) => ({
      description: violation.description,
      help: violation.help,
      impact: violation.impact,
      nodes: violation.nodes.map((node) => ({
        html: node.html,
        target: node.target,
        failureSummary: node.failureSummary,
      })),
    }));

    console.log('Scan Results:', JSON.stringify(issues, null, 2));
    return new Response(JSON.stringify({ issues }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error during scan:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to scan website' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
