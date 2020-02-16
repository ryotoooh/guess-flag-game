import React, { Component} from 'react';
import FlagQuestion from './FlagQuestion.js';

class CountryGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      pickedCountries: [],
      pickedCountry: '',
      stage: 'Guess',
      answer: false,
      totalPlay: 0,
      correctAnswer: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  async componentDidMount() {
    const countryAPI = 'https://restcountries.eu/rest/v2/all';

    await fetch(countryAPI)
      .then(data => data.json())
      .then(countries => this.setState({countries}))
      .catch(console.warn);

    this.newGame();
  }

  handleSubmit(e) {
    e.preventDefault();
    const {stage, totalPlay, correctAnswer} = this.state;
    if(stage === 'Guess') {
      if (e.currentTarget.value === this.state.pickedCountry.name) {
        this.setState({correctAnswer: correctAnswer + 1})
        this.setState({answer: true}) 
      } else {
        this.setState({answer: false});
      }
      this.setState({
        stage: 'Next',
        totalPlay: totalPlay + 1,
      });
    } else {
      this.newGame();
    }
  }

  newGame() {
    const {countries} = this.state;
    const pickedCountries = this.pickCountries(countries, 4);
    const pickedCountry = (pickedCountries[Math.floor(Math.random() * 4)]);
    this.setState({
      pickedCountries, 
      pickedCountry,
      stage: 'Guess',
      answer: '', 
    });
  }

  pickCountries = (countries, howMany) => {
    let options = [];
    if (howMany > countries.length) {
      throw new RangeError("getRandom: more elements taken than available");
    }
    let tries = 0;
    while (options.length < howMany && tries < 15) {
      let option = Math.floor(Math.random() * countries.length);
      if (options.indexOf(option) === -1 ) {
        options.push(option);
      } else {
        tries++;
      }
    }
    return options.map(num => (countries[num]));
  }

  render() {
    let {
      countries, 
      pickedCountries, 
      pickedCountry, 
      stage,
      answer,
      totalPlay,
      correctAnswer,
    } = this.state;

    let output = <div>Loading...</div>;

    if (countries !== undefined) {
      output = (
        <FlagQuestion
          pickedCountries={pickedCountries}
          pickedCountry={pickedCountry}
          stage={stage}
          answer={answer}
          handleSubmit={this.handleSubmit}
        />
      );
    }

    return (
      <div>
        <h2 className="text-muted">Your score is {correctAnswer} out of {totalPlay}.</h2>
        {output}
      </div>
    );
  }
}

export default CountryGame;