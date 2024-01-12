const { spawn } = require('child_process');
const readline = require('readline');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion(query, defaultValue = '') {
    return new Promise((resolve) => {
        const defaultStr = defaultValue ? ` (Default: ${defaultValue})` : '';
      rl.question(`${query} ${defaultStr} `, (answer) => {
        resolve(answer && answer.length > 0 ? answer : defaultValue);
      });
    });
}

function checkPrerequisites() {
  try {
    execSync('node -v', { stdio: 'ignore' });
    execSync('npm -v', { stdio: 'ignore' });
    execSync('tsc -v', { stdio: 'ignore' });
    execSync('ng version', { stdio: 'ignore' });
  } catch (error) {
    console.error('Missing prerequisites. Please make sure Node.js, npm, TypeScript, and Angular CLI are installed before attempting to setup MemberJunction.');
    process.exit(1);
  }
}


async function main() {
  // Questions for .env and config.json
  checkPrerequisites();
  console.log("Setting up MemberJunction Distribution...");
  console.log(">>> Please answer the following questions to setup the .env files for CodeGen. After this process you can manually edit the .env file in CodeGen as desired.");
  const dbUrl = await askQuestion('Enter the database URL: ');
  const dbDatabase = await askQuestion('Enter the database name on that server: ');
  const dbPort = await askQuestion('Enter the port the database server listens on: ', 1433);
  const codeGenLogin = await askQuestion('Enter the database login for CodeGen: ');
  const codeGenPwD = await askQuestion('Enter the database password for CodeGen: ');
  console.log(">>> Please answer the following questions to setup the .env files for MJAPI. After this process you can manually edit the .env file in CodeGen as desired.");
  const mjAPILogin = await askQuestion('Enter the database login for MJAPI: ');
  const mjAPIPwD = await askQuestion('Enter the database password for MJAPI: ');
  const graphQLPort = await askQuestion('Enter the port to use for the GraphQL API: ', 4000);

  // Process GeneratedEntities
  console.log('\nBootstrapping GeneratedEntities...');
  process.chdir('GeneratedEntities');
  console.log('Running npm install...');
  execSync('npm install', { stdio: 'inherit' });
  process.chdir('..');

  // Process CodeGen
  console.log('\nProcessing CodeGen...');
  process.chdir('CodeGen');
  console.log('Running npm install...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('Running npm link...');
  execSync('npm link ../GeneratedEntities', { stdio: 'inherit' });

  console.log('Setting up .env and config.json...');
  const codeGenENV = `#Database Setup
DB_HOST='${dbUrl}'
DB_PORT=${dbPort}
DB_USERNAME='${codeGenLogin}'
DB_PASSWORD='${codeGenPwD}'
DB_DATABASE='${dbDatabase}'

#OUTPUT CODE is used for output directories like SQL Scripts
OUTPUT_CODE='${dbDatabase}'

# Name of the schema that MJ has been setup in. This defaults to admin
MJ_CORE_SCHEMA=admin

#CONFIG_FILE is the name of the file that has the configuration parameters for CodeGen
CONFIG_FILE='config.json'
  `
  fs.writeFileSync('.env', codeGenENV);

  // Process MJAPI
  process.chdir('..');
  console.log('\nBootstrapping MJAPI...');
  process.chdir('MJAPI');
  console.log('Running npm install...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('Setting up MJAPI .env file...');
  const mjAPIENV = `#Database Setup
DB_HOST='${dbUrl}'
DB_PORT=${dbPort}
DB_USERNAME='${mjAPILogin}'
DB_PASSWORD='${mjAPIPwD}'
DB_DATABASE='${dbDatabase}'
GRAPHQL_PORT=${graphQLPort}

UPDATE_USER_CACHE_WHEN_NOT_FOUND=1
UPDATE_USER_CACHE_WHEN_NOT_FOUND_DELAY=5000

# AUTHENTICATION SECTION
# If you are using MSAL for Authentication with the server, fill in these values
WEB_CLIENT_ID=
TENANT_ID=

# If you are using Auth0 for Authentication, fill in these vaaluse
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_DOMAIN=

# Name of the schema that MJ has been setup in. This defaults to admin
MJ_CORE_SCHEMA=admin

# If you are using MJAI library, provide your API KEYS here for the various services
OPEN_AI_API_KEY = ''
ANTHROPIC_API_KEY = ''

# Skip API URL, KEY and Org ID
BOT_EXTERNAL_API_URL = 'https://tasioskipapi.azurewebsites.net/report'
BOT_SCHEMA_ORGANIZATION_ID = -1

CONFIG_FILE='config.json'
`
  fs.writeFileSync('.env', mjAPIENV);
  console.log('Running npm link...');
  execSync('npm link ../GeneratedEntities', { stdio: 'inherit' });
  process.chdir('..');

  console.log('Running CodeGen...');
  process.chdir('CodeGen');

  renameFolderToMJ_BASE(dbDatabase);

  // next, run CodeGen
  // We do not manually run the compilation for GeneratedEntities because CodeGen handles that, but notice above that we did npm install for GeneratedEntities otherwise when COdeGen attempts to compile it, it will fail.
  execSync('npx ts-node-dev src/index.ts', { stdio: 'inherit' });
  process.chdir('..');

  // Process MJExplorer
  console.log('\nProcessing MJExplorer...');
  process.chdir('MJExplorer');
  console.log('Running npm install...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('Running npm link...');
  execSync('npm link ../GeneratedEntities', { stdio: 'inherit' });
  process.chdir('..');
  
  // Close readline interface
  rl.close();
}

main().catch((error) => {
  console.error('An error occurred:', error);
});

function renameFolderToMJ_BASE(dbDatabase) {
    // rename the MJ_BASE set of SQL Scripts to our new dbname
    try {
      // Define the old and new folder paths
      const oldFolderPath = path.join(__dirname, 'SQL Scripts', 'generated', 'MJ_BASE');
      const newFolderPath = path.join(__dirname, 'SQL Scripts', 'generated', dbDatabase); // Assuming dbDatabase holds the new name
    
      //check if the new Direcotry exists
      const isNewFolderExists = fs.existsSync(newFolderPath);
      if (!isNewFolderExists) {
        fs.mkdirSync(newFolderPath);
      }
      const files = fs.readdirSync(oldFolderPath);
      files.forEach((file) => {
        const sourceFile = path.join(oldFolderPath, file);
        const destFile = path.join(newFolderPath, file);
        fs.renameSync(sourceFile, destFile);
      });
      fs.rmdirSync(oldFolderPath);
  
      console.log('Renamed SQL Scripts/generated/MJ_BASE to SQL Scripts/generated/' + dbDatabase + ' successfully.');
    } catch (err) {
      console.error('An error occurred while renaming the SQL Scripts/generated/MJ_BASE folder:', err);
    }
}