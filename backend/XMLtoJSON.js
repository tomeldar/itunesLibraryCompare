const parseString = require('xml2js').parseString;
const fs = require('fs');

function convertXML(libraryPath) {
    let result;

    const data = fs.readFileSync(libraryPath);

    parseString(data, (err2, res) => {
        result = res;
    });

    return result;
}

module.exports = convertXML;