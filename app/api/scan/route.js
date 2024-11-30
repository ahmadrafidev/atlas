import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { resolve } from 'path';
import fs from 'fs'; 

export async function POST(req) {
  let browser;

  try {
    const { url } = await req.json();

    if (!url || !url.startsWith('http')) {
      return new Response(JSON.stringify({ error: 'Valid URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isProduction = process.env.NODE_ENV === 'production';

    let executablePath;

    if (!isProduction) {
      console.log('Running in development mode.');

      const developmentChromiumPath = process.env.DEV_CHROMIUM_PATH;
      if (!developmentChromiumPath) {
        throw new Error(
          'DEV_CHROMIUM_PATH is not set. Please configure the environment variable for development.'
        );
      }
      executablePath = developmentChromiumPath;
    } else {
      console.log('Running in production mode.');

      executablePath = await chromium.executablePath;

      if (!fs.existsSync(executablePath)) {
        throw new Error('Chromium binary was not found in /tmp/chromium.');
      }
    }

    console.log('Resolved Chromium Executable Path:', executablePath);

    browser = await puppeteer.launch({
      headless: true,
      args: isProduction ? chromium.args : ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath,
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    );

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (error) {
      console.error('Error loading URL:', error.message);
      return new Response(
        JSON.stringify({ error: `Failed to load URL: ${url}` }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const axePath = resolve(process.cwd(), 'public/axe-core/axe.min.js');
    if (!axePath) {
      throw new Error('Axe-Core path could not be resolved. Ensure axe.min.js exists in public/axe-core.');
    }
    console.log('Resolved Axe-Core Path:', axePath);

    await page.addScriptTag({ path: axePath });

    const results = await page.evaluate(async () => {
      return await window.axe.run();
    });

    const issues = results.violations.map((violation) => ({
      description: violation.description,
      help: violation.help,
      impact: violation.impact || 'N/A',
      nodes: violation.nodes.map((node) => ({
        html: node.html,
        target: node.target.join(', '),
        failureSummary: node.failureSummary,
      })),
    }));

    console.log('Scan Results:', JSON.stringify(issues, null, 2));

    return new Response(JSON.stringify({ issues }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error during scan:', error.message);
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred during the scan.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
