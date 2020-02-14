import React, { Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      pickedCountries: [],
      pickedCountry: '',
      answer: '',
      button: 'Guess'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  pickCountries = (arr, n) => {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { button } = this.state;
    if(button === 'Guess') {
      if (e.target.country.value === this.state.pickedCountry.name){
        this.setState({ answer: `Correct answer! The answer is ${this.state.pickedCountry.name}` });
      } else {
        this.setState({ answer: `Wrong answer! The answer is ${this.state.pickedCountry.name}` });
      }
      this.setState({ pickedCountries: [], button: 'Next' });
    } else {
      this.setState({ pickedCountry: '', answer: '', button: 'Guess', });
      this.newGame();
    }
  }

  async componentDidMount() {
    const countryAPI = 'https://restcountries.eu/rest/v2/all';

    await fetch(countryAPI)
      .then(data => data.json())
      .then(countries => this.setState({countries}));

    this.newGame();
  }

  newGame() {
    const { countries } = this.state;
    const pickedCountries = this.pickCountries(countries, 4);
    this.setState({pickedCountries});
    const pickedCountry = (pickedCountries[Math.floor(Math.random() * 4)]);
    this.setState({pickedCountry})
  }

  render() {
    let lists = <div>Loading...</div>,
        flag = <div>Loading...</div>;
    const { countries, pickedCountries, pickedCountry, answer, button } = this.state;

    if (countries && countries.length > 0) {
      lists = pickedCountries.map((c, id) => (
        <li style={{marginLeft: "5px"}} key={id}>
          <input style={{marginRight: "5px"}} type="radio" value={c.name} name="country" />
          {c.name}
        </li>
      ));

      flag = <img style={{width: "500px"}} src={pickedCountry.flag} alt={pickedCountry.name} />
    } else {
      lists = <div>Loading...</div>;
      flag = <div>Loading...</div>;
    }

    return (
      <div className="App" style={{}}>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <div className="container text-center">
          <h2>Guess Flag Game</h2>
          
          <form onSubmit={this.handleSubmit}>
            <ul style={{listStyleType: "none", display: "inline-flex", padding: "0"}}>
              {lists}
              <div>{answer}</div>
            </ul>
            <button style={{marginLeft: "5px"}}>{button}</button><br />
            {flag}
          </form>
        </div>
        
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin />
        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossorigin
        />
        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin
        />
        <script>var Alert = ReactBootstrap.Alert;</script>
      </div>
    );
  }
}

export default App;