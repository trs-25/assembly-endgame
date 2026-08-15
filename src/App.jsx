import { useState } from "react"
import { characters } from "./characters";
import { languages } from "./languages";
import clsx from "clsx";

const App = () => {

  const [word, setWord] = useState('car')
  const letters = word.split('');

  const [guesses, setGuesses] = useState([]);
  console.log(guesses)

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
    return guesses.length >= maxGuesses
  }

  const lettersElements = letters.map((l, index) => {
    return <span key={index} >
      {isCorrectGuess(l) ? l.toUpperCase() : ''}
    </span>
  })

  const onClickKeyboard = (character) => {
    console.log(`${character} clicked`)
    addToGuesses(character)

  }



  const addToGuesses = (character) => {

    if (!guesses.includes(character)) {
      setGuesses(prevGuesses => {
        return [...prevGuesses, character]
      })
    }
  }

  const keyboardElements = characters.map(char => {
    return <button
      className={isGuessed(char)
        && clsx(
          { correct: letters.includes(char) },
          { incorrect: !letters.includes(char) }
        )}
      key={char} onClick={() => onClickKeyboard(char)} >
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

          <span>Status</span>

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

      </main>

      <footer></footer>

    </>
  )
}

export default App