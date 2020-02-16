import React, {Component} from 'react';
import FlagChoices from './FlagChoices'
import FlagAnswer from './FlagAnswer';

class FlagQuestion extends Component {
  static defaultProps = {
    pickedCountries: [],
    pickedCountry: '',
    stage: 'Guess',
    answer: false,
  }

  render() {
    const {
      pickedCountry,
      pickedCountries,
      stage,
      answer,
      handleSubmit
    } = this.props;

    let lists = pickedCountries.map((c, id) => {
      return {
        id,
        name: c.name,
      };
    });

    let output = stage === 'Guess' ? 
      (<FlagChoices lists={lists}
                    handleSubmit={handleSubmit} />) : 
      (<FlagAnswer name={pickedCountry.name}
                   stage={stage}
                   answer={answer}
                   handleSubmit={handleSubmit} />);

    return (
      <div>
        <img 
          style={{
            width: "auto", 
            maxWidth: "100%", 
            maxHeight: "300px", 
            boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)"
          }} 
          src={pickedCountry.flag} 
          alt="Guess the flag" />
        {output}
      </div>
    );
  }
}

export default FlagQuestion;