var fs = require('fs');
var c = fs.readFileSync('c:/Users/Chamy/Desktop/mariage/js/main.js', 'utf8');

// Update Waze link to use specific URL from config if available
c = c.replace(
  'if ($(\"waze\")) $(\"waze\").href = \"https://waze.com/ul?q=\" + mapQuery + \"&navigate=yes\";',
  'var wazeLink = (C.wazeUrl && C.wazeUrl.length > 0) ? C.wazeUrl : (\"https://waze.com/ul?q=\" + mapQuery + \"&navigate=yes\"); if ($(\"waze\")) $(\"waze\").href = wazeLink;'
);

fs.writeFileSync('c:/Users/Chamy/Desktop/mariage/js/main.js', c, 'utf8');
console.log('Waze updated');
