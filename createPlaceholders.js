const fs = require('fs');
const path = require('path');
const https = require('https');

// Load JSON data
const data = require('./libs/zzz/assets-data/src/AssetsData_gen.json');

// Base directory
const baseDir = 'libs/zzz/assets/src/gen';

// Function to download an image from a URL and save it to a file
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(filepath);
      reject(err.message);
    });
  });
}

// Function to create an index.ts file
function createIndexFile(dir, files) {
  const imports = files.map(file => `import ${path.basename(file, '.png')} from './${file}'`).join('\n');
  const dataEntries = files.map(file => path.basename(file, '.png')).join(',\n  ');
  const content = `${imports}

const data = {
  ${dataEntries}
} as const
export default data`;

  fs.writeFileSync(path.join(dir, 'index.ts'), content);
}

// Function to create directories and download images
async function createDirectoriesAndFiles() {
  // Create agent directories and download images
  for (const [agent, assets] of Object.entries(data.agents)) {
    const agentDir = path.join(baseDir, 'agents', agent);
    fs.mkdirSync(agentDir, { recursive: true });
    const files = ['icon.png'];
    await downloadImage(assets.icon, path.join(agentDir, 'icon.png'));
    for (const key of ['basic', 'dodge', 'assist', 'special', 'chain', 'core']) {
      if (assets[key]) {
        for (let i = 0; i < assets[key].length; i++) {
          const filename = `${key}${i + 1}.png`;
          files.push(filename);
          await downloadImage(assets[key][i], path.join(agentDir, filename));
        }
      }
    }
    for (let i = 1; i <= 6; i++) {
      if (assets[`mindscape${i}`]) {
        const filename = `mindscape${i}.png`;
        files.push(filename);
        await downloadImage(assets[`mindscape${i}`], path.join(agentDir, filename));
      }
    }
    createIndexFile(agentDir, files);
  }

  // Create wEngines directories and download images
  for (const [engine, assets] of Object.entries(data.wEngines)) {
    const engineDir = path.join(baseDir, 'wEngines', engine);
    fs.mkdirSync(engineDir, { recursive: true });
    const files = ['icon.png', 'cover.png'];
    await downloadImage(assets.icon, path.join(engineDir, 'icon.png'));
    await downloadImage(assets.cover, path.join(engineDir, 'cover.png'));
    createIndexFile(engineDir, files);
  }

  // Create driveDiscs directories and download images
  for (const [disc, assets] of Object.entries(data.driveDiscs)) {
    const discDir = path.join(baseDir, 'driveDiscs', disc);
    fs.mkdirSync(discDir, { recursive: true });
    const files = [];
    for (let i = 1; i <= 6; i++) {
      if (assets[i]) {
        const filename = `${i}.png`;
        files.push(filename);
        await downloadImage(assets[i], path.join(discDir, filename));
      }
    }
    createIndexFile(discDir, files);
  }

  console.log('Directories, images, and index.ts files created successfully.');
}

// Run the function
createDirectoriesAndFiles().catch(console.error);
