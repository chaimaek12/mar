f = open(r'c:\Users\Chamy\Desktop\mariage\index.html', 'r', encoding='utf-8')
c = f.read()
f.close()

# Noms
c = c.replace('<span id="n2">3zezna</span>', '<span id="n2">Hicham</span>')

# Date hero
c = c.replace('Samedi 19 Juin 2027', 'Samedi 19 Décembre 2026')

# Footer monogram et hashtag
c = c.replace('footMonogram">K &amp; 3<', 'footMonogram">K &amp; H<')
c = c.replace('footHashtag">#KenzaEt3zezna<', 'footHashtag">#KenzaEtHicham<')

# Supprimer section Livre d'Or (livredor)
start_ld = c.find('<!-- LIVRE D\'OR VIRTUEL -->')
end_ld = c.find('<!-- RSVP AVEC ENVOI WHATSAPP -->')
if start_ld != -1 and end_ld != -1:
    c = c[:start_ld] + c[end_ld:]

# Supprimer section RSVP
start_rsvp = c.find('<!-- RSVP AVEC ENVOI WHATSAPP -->')
end_rsvp = c.find('</main>')
if start_rsvp != -1 and end_rsvp != -1:
    c = c[:start_rsvp] + '\n  </main>\n'  + c[end_rsvp+8:]

f = open(r'c:\Users\Chamy\Desktop\mariage\index.html', 'w', encoding='utf-8')
f.write(c)
f.close()
print('OK - all done')
