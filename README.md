# Babel
### DT173G Moment 4
---
Detta är fjärde uppgiften i kursen [Webbutveckling III](https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/Sok-kursplan/kursplan/?kursplanid=18690) på mittuniversitet HT -20.

Uppgiften går ut på att säkerställa funktionallitet i alla webbläsare även i de fall kod utvecklats med ECMAScript 6 eller högre.
Nästan alla webbläsare klarar ECMAScript 5 så därför ska vi skapa en automatisk konvertering till ES5 med hjälp av Babel.
För att lösa det har jag lagt till npm-paketen:
* gulp-babel
* @babel/core
* @babel/preset-env

För att testa är det bara att ladda ner detta repo och skriva gulp i terminalen.