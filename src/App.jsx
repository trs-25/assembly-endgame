import { useState } from "react"
import { characters } from "./characters";
import { languages } from "./languages";

const App = () => {

  const [word, setWord] = useState('shinobi')
  const letters = word.split('');

  const [guesses, setGuesses] = useState([]);
  console.log(guesses)

  const isCorrectGuess = (character) => {
    return guesses.includes(character) && letters.includes(character)
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
      key={char} onClick={() => onClickKeyboard(char)} >
      {char.toUpperCase()}
    </button>
  })

  const languageElements = languages.map(l => {

    const style = {
      backgroundColor: l.backgroundColor,
      color: l.color
    }

    return <span key={l.name} style={style} >{l.name}</span>
  })

  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <main>

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