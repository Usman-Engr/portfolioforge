
const fs = require('fs');
const dotenv = require('dotenv');
try {
    const config = dotenv.parse(fs.readFileSync('.env.local'));
    console.log('Keys found in .env.local:');
    console.log(Object.keys(config).join('\n'));
} catch (e) {
    console.error(e);
}
