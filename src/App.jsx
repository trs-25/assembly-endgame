import { useState, useEffect } from "react"
import { characters } from "./characters";
import { languages } from "./languages";
import clsx from "clsx";
import { getRandomWord } from "./words";

const App = () => {


  const [word, setWord] = useState(getRandomWord())
  const letters = word.split('');
  // console.log(word)

  const getHints = () => {
    const totalHints = Math.floor(letters.length / 3)

    let hints = []

    for (let i = 0; i < totalHints; ++i) {
      const random = letters[Math.floor(Math.random() * letters.length)];

      if (!hints.includes(random))
        hints.push(random)
    }

    console.log(hints)


    return hints;
  }



  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
    setGuesses(() => getHints())
  }, [word])


  const maxGuesses = languages.length - 1;
  const incorrectGuesses = guesses.filter(char => {
    return !letters.includes(char)
  }).length;

  const isGuessed = (character) => {
    return guesses.includes(character)
  }

  const isCorrectGuess = (character) => {
    return isGuessed(character) && letters.includes(character)
  }


  const isGameWon = () => {
    return letters.every(l => guesses.includes(l))
  }

  const isGameLost = () => {
    return incorrectGuesses >= maxGuesses
  }

  const lettersElements = letters.map((l, index) => {
    return <span key={index} >
      {isCorrectGuess(l) || isGameLost() ? l.toUpperCase() : ''}
    </span>
  })

  



  const addToGuesses = (character) => {

    if (!guesses.includes(character)) {
      setGuesses(prevGuesses => {
        return [...prevGuesses, character]
      })
    }
  }

  const onClickKeyboard = (character) => {
    // console.log(`${character} clicked`)
    addToGuesses(character)

  }

  const keyboardElements = characters.map(char => {
    return <button
      className={isGuessed(char)
        && clsx(
          { correct: letters.includes(char) },
          { incorrect: !letters.includes(char) }
        )}
      key={char} onClick={() => onClickKeyboard(char)}
      disabled={isGameLost() || isGameWon()} >
      {char.toUpperCase()}
    </button>
  })

  const languageElements = languages.map((l, index) => {

    const style = {
      backgroundColor: l.backgroundColor,
      color: l.color
    }

    const className = clsx(
      { language: true },
      { lost: index < incorrectGuesses })


    return <span key={l.name} style={style}
      className={className} >
      {l.name}
    </span>
  })


  const getStatusMessage = () => {

    if (guesses.length <= 0) return '';


    else if (isGameLost()) {
      return <>
        <h2>You have lost all the high-level languages. </h2>
        <p>Time to learn Assembly!</p>
      </>
    }

    else if (isGameWon()) {
      return <>
        <h2>You have correctly guessed the word. </h2>
        <p> Well done!</p>
      </>
    }

    else if (incorrectGuesses > 0) {
      const lastLanguageLost = languages[incorrectGuesses - 1].name
      // console.log(lastLanguageLost)

      return <>
        <h2>{`${lastLanguageLost} has left the game`}</h2>
      </>
    }




  }

  const startNewGame = () => {

    setWord(() => getRandomWord());
  }

  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <main>

        <section
          className={clsx(
            { 'status': true },
            { 'game-won': isGameWon() },
            { 'game-lost': isGameLost() })}>

          <span>{getStatusMessage()}</span>

        </section>

        <section className="languages">
          {languageElements}
        </section>

        <section className="word">
          {lettersElements}
        </section>

        <section className="keyboard">
          {keyboardElements}
        </section>

        <section className="new-game">
          {(isGameLost() || isGameWon()) &&
            <button onClick={startNewGame}>New Game</button>}
        </section>

      </main>

      <footer></footer>

    </>
  )
}

export default App