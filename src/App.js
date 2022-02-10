import React from 'react';

import './App.css';
//import Item from "./MyItem";



class FilmItemRow extends React.Component{
  render(){
    return(
      <li>
        <a href={this.props.url}>{this.props.url}</a>
      </li>
    )
  }
}
class StarWars extends React.Component{
  constructor(){
    super()
    this.state = {
      loadedCharacter: false,
      name: null,
      height: null,
      homeworld: null,
      films: [],
      hair_color: null,
    }
  }
  getNewCharacter(){
    const randomNumber = Math.round(Math.random()*82)
    console.log("Get new character from a button")
    const url = `http://swapi.dev/api/people/${randomNumber}/`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loadedCharacter: true,
          name: data.name,
          height: data.height,
          homeworld: data.homeworld,
          films: data.films,
          hair_color: data.hair_color,
        })
      })
    
  }
  
  render(){

    const movies = this.state.films.map((film, i) => {
        return <FilmItemRow key={i} url={film}/>
      })
    
    return(
      <div>
        {
          this.state.loadedCharacter &&
          <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.height}</p>
        <p><a href={this.state.homeworld}>homeworld</a></p>
        <ul>
          {movies}
        </ul>
        <p>Hair Color : {this.state.hair_color}</p>
          </div>
        }
        
        <button type='button' 
        onClick={()=> this.getNewCharacter()} 
        className='btn'
        >
          Randomize character
        </button>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <StarWars />
      </header>
    </div>
  );
}

export default App;
