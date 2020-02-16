import React from 'react';

const FlagChoices = props => {
  let lists = props.lists || []
  const {handleSubmit} = props;
  let inputs = lists.map(country => (
    <input key={country.id}
           type="button" 
           name="country"
           value={country.name} 
           className="btn btn-outline-secondary btn-lg btn-block" 
           onClick={handleSubmit} />
  ))

  return (
    <div className="mt-4">
      {inputs}
    </div>
  )
}

export default FlagChoices;