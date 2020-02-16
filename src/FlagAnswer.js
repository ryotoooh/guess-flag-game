import React from 'react';

const FlagAnswer = ({ name, stage, answer, handleSubmit }) => {
  let result = answer ? 
    (<h3 className="text-primary">Correct answer!</h3>) : 
    (<h3 className="text-danger">Wrong answer!</h3>);
  return (
    <div className="mt-4">
      <div>
        {result}
        <h4>{`The answer is ${name}`}</h4>
      </div>
      <button className="btn btn-light btn-lg btn-block" onClick={handleSubmit}>{stage}</button>
    </div>
  )
};

export default FlagAnswer;