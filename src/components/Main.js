/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";

function Main() {
  const [allMemes, setAllMemes] = React.useState([]);

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  function getMeme() {
    const randNumb = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randNumb].url;
    setMeme((prevState) => ({...prevState, randomImage: url}));
  }

  function handleChange(event) {
    const {name, value} = event.target;
    setMeme((prevState) => ({...prevState, [name]: value}));
  }

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  return (
    <main>
      <div className='main-container'>
        <div className='form'>
          <input
            type='text'
            className='form-input'
            placeholder='Top Text'
            value={meme.topText}
            name='topText'
            onChange={handleChange}
          />
          <input
            type='text'
            className='form-input'
            placeholder='Bottom Text'
            value={meme.bottomText}
            name='bottomText'
            onChange={handleChange}
          />
          <button className='form-button' onClick={getMeme}>
            Get a new meme image
            <FontAwesomeIcon icon={faImage} className='icon' />
          </button>
        </div>
        <div className='meme'>
          <img src={meme.randomImage} className='meme-image' alt='' />
          <h2 className='meme-text-top'>{meme.topText}</h2>
          <h2 className='meme-text-bottom'>{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  );
}

export default Main;
