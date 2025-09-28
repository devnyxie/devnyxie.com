import fetch from "node-fetch";
import xml2js from "xml2js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let isCompiling = false;
const requestQueue = [];

const INTEVAL_MS = 250; // Interval value to process requests

async function smartPreload(url) {
  if (isCompiling) {
    console.log(`⏳ Queuing ${url} (Next.js is compiling...)`);
    requestQueue.push(url);
    return;
  }

  try {
    const res = await fetch(url, { redirect: 'manual' });
    console.log(`⚡ Pre-loaded ${url}: ${res.status}`);
  } catch (err) {
    console.error(`❌ Error visiting ${url}:`, err.message);
  }
}

async function processQueue() {
  while (requestQueue.length > 0) {
    if (!isCompiling) {
      const url = requestQueue.shift();
      await smartPreload(url);
      await sleep(200);
    } else {
      await sleep(100);
    }
  }
}

function waitForNextJsReady() {
  return new Promise((resolve) => {    
    const checkTerminal = () => {
      const testConnection = async () => {
        try {
          const response = await fetch("http://localhost:3000", { 
            method: 'HEAD',
            timeout: 1000
          });
          if (response.ok || response.status < 500) {
            console.log("✅ Next.js server detected as ready!");
            resolve();
            return true;
          }
        } catch (err) {
          // Server not ready yet
        }
        return false;
      };
      
      testConnection().then(ready => {
        if (!ready) {
          setTimeout(checkTerminal, 500);
        }
      });
    };
    
    checkTerminal();
  });
}

async function preloadPages() {
  try {
    await waitForNextJsReady();
    await sleep(2000);

    const res = await fetch("http://localhost:3000/sitemap.xml");
    const xml = await res.text();
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);
    const urls = result.urlset.url.map((u) => u.loc[0]);

    console.log(`🔁 Starting to preload ${urls.length} pages...`);

    for (const url of urls) {
      await smartPreload(url);
      await sleep(100);
    }
    setInterval(processQueue, INTEVAL_MS);

  } catch (err) {
    console.error("❌ Failed to preload pages:", err);
  }
}

preloadPages();
