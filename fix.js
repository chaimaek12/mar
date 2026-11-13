var fs = require('fs');
var c = fs.readFileSync('c:/Users/Chamy/Desktop/mariage/index.html', 'utf8');

// Noms
c = c.replace(/<span id="n2">3zezna<\/span>/g, '<span id="n2">Hicham</span>');

// Date hero
c = c.replace(/Samedi 19 Juin 2027/g, 'Samedi 19 D\u00e9cembre 2026');

// Footer monogram
c = c.replace(/footMonogram">K &amp; 3</g, 'footMonogram">K &amp; H<');

// Footer hashtag
c = c.replace(/footHashtag">#KenzaEt3zezna</g, 'footHashtag">#KenzaEtHicham<');

// Supprimer section Livre d'Or
var startLd = c.indexOf("<!-- LIVRE D'OR VIRTUEL -->");
var endLd = c.indexOf("<!-- RSVP AVEC ENVOI WHATSAPP -->");
if (startLd !== -1 && endLd !== -1) {
  c = c.slice(0, startLd) + c.slice(endLd);
}

// Supprimer section RSVP
var startRsvp = c.indexOf("<!-- RSVP AVEC ENVOI WHATSAPP -->");
var endMain = c.indexOf("</main>");
if (startRsvp !== -1 && endMain !== -1) {
  c = c.slice(0, startRsvp) + "\n  </main>\n" + c.slice(endMain + 7);
}

fs.writeFileSync('c:/Users/Chamy/Desktop/mariage/index.html', c, 'utf8');
console.log('OK - all done');
