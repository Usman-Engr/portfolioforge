const fs = require('fs');
const dotenv = require('dotenv');
try {
    const config = dotenv.parse(fs.readFileSync('.env.local'));
    console.log(JSON.stringify(config, null, 2));
} catch (e) {
    console.error(e);
}
