const fs = require('fs');
const http = require('http');
const https = require('https');
const urlModule = require('url');

function downloadPage(url, callback) {
  const protocol = url.startsWith('https') ? https : http;

  protocol.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      callback(null, data);
    });
  }).on('error', (err) => {
    callback(err);
  });
}

function saveToFile(filename, content, callback) {
  fs.writeFile(filename, content, (err) => {
    callback(err);
  });
}

function processURLs(filename) {
  try {
    const urls = fs.readFileSync(filename, 'utf-8').split('\n').filter(Boolean);

    urls.forEach((url) => {
      const hostname = urlModule.parse(url).hostname;
      const outputFilename = `${hostname}.txt`;

      downloadPage(url, (err, content) => {
        if (err) {
          console.error(`Couldn't download ${url}`);
        } else {
          saveToFile(outputFilename, content, (writeErr) => {
            if (writeErr) {
              console.error(`Couldn't write to ${outputFilename}`);
            } else {
              console.log(`Wrote to ${hostname}`);
            }
          });
        }
      });
    });
  } catch (readErr) {
    console.error(`Couldn't read the original file (${filename})`);
    process.exit(1);
  }
}

if (process.argv.length !== 3) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

const filename = process.argv[2];
processURLs(filename);
