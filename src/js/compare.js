// JavaScript Guess a random number copied from https://guess-the-number-project.netlify.app/

function compareGuess() {
    const userGuess = Number(document.getElementById("inputBox").value);
    userGuesses.push(" " + userGuess);
    document.getElementById("guesses").innerHTML = userGuesses;
    attempts++;
    document.getElementById("attempts").innerHTML = attempts;
  
    if (attempts < maxGuesses) {
      if (userGuess > computerGuess) {
        // for progress bar- eg- user low/high is 20/ 80 so sets progress bar
        // if they then choose 90- this widens the progress bar, even though we dont want that
        // this restricts this-also see opposite in else if section
        if (userGuess < high) high = userGuess;
        document.getElementById("textOutput").innerHTML =
          "Du gissade för högt";
        document.getElementById("inputBox").value = "";
      } else if (userGuess < computerGuess) {
        if (userGuess > low) low = userGuess;
        document.getElementById("textOutput").innerHTML = "Du gissade för lågt";
        document.getElementById("inputBox").value = "";
      } else {
        document.getElementById("textOutput").innerHTML =
          "Grattis du gissade rätt på " + attempts + " försök";
        gameEnded();
      }
    } else {
      // else userGuesses.length === maxGuesses
  
      if (userGuess > computerGuess) {
        document.getElementById("textOutput").innerHTML =
          "Du förlorade!, <br> Rätt nummer är " + computerGuess;
  
        gameEnded();
      } else if (userGuess < computerGuess) {
        document.getElementById("textOutput").innerHTML =
          "Du förlorade!, <br> Rätt nummer är " + computerGuess;
        gameEnded();
      } else {
        document.getElementById("textOutput").innerHTML =
          "Grattis du gissade rätt på " + attempts + " försök";
        gameEnded();
      }
    }
    updateRange();
  } // compareGuess()