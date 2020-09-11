# Node.js & Gulp
### DT173G Moment 2
---
Detta är andra uppgiften i kursen [Webbutveckling III](https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/Sok-kursplan/kursplan/?kursplanid=18690) på mittuniversitet HT -20.

Uppgiften går ut på att skapa automatiseringsprocesser med hjälp av verktygen i Gulp och dess tillägg. Syftet är att lära oss hur man kan automatisera olika processer som att slå samman filer, ta bort onödig information och komprimera innehållet innan publicering för att de ska laddas fortare. För att lösa denna uppgift har jag använt ett antal olika paket:
* gulp - Är själva ramverket för att kunna automatisera processer.
* gulp-concat - slår samman olika filer till en.
* gulp-rename - Används för att döpa om filer.
* gulp-uglify-es - Minifierar JavaScript och tar bort allt onödigt innehåll.
* gulp-clean-css - Minifierar css och tar bort allt onödigt innehåll
* gulp-image - Klarar att komprimera många olika bildformat.
* gulp-sourcemaps - Visar från vilken fil koden härstammar.

Efter att ha installerat ovan paket (npm install) är det bara att skriva gulp i terminalen för att samtliga kommandon ska köras.
Systemet kommer då först att köra ett antal parallella processer:
* Kopiera alla html-filer till publiceringskatalogen.
* Sammanfoga alla JavaScriptsfiler till en, minifiera och rensa filerna på allt onödigt innehåll, döp om filen med tillägget .min och slutligen kopiera den färdiga filen till publiceringskatalogen.
* Samma sak med css-filerna; sammanfoga, minifiera, byt namn samt kopiera till rätt publiceringskatalog.
* Alla bilder som finns i katalogen images komprimeras och kopieras till motsvarande publiceringskatalog.
* Det sista som händer är att systemet sedan lyssnar på förändringar och kommer automatiskt köra dessa processer varje gång en fil ändras.

Att byta namn på filerna var inget krav för denna uppgift men jag tycker det är snyggt att redan i filnamnet visa att detta är en minifierad fil. Likaså var det inget krav att komprimera bilder men jag tycker det är en oerhört användbar funktion så jag ville testa den.
Sourcemaps är väldigt användbart vid felsökning och utveckling eftersom det går att se från vilken fil koden kommer ifrån.