const fs = require('fs');

function loadJsonFile(path) {
    try {
        return JSON.parse(fs.readFileSync(path).toString());
    } catch (e) {
        throw e;
    }
}

// Load and parse config.json
const configJson = loadJsonFile('./config.json');

// Update the name property with "Cornerstone-{{timestamp}}" (e.g. Cornerstone-2021-05-12T20:25)
const timestamp = new Date().toISOString().split(':').slice(0, 2).join(':');
configJson.name = `Cornerstone-${timestamp}`;

// Write out the changes to the file
fs.writeFileSync('./config.json', `${JSON.stringify(configJson, null, 2)}\n`);
