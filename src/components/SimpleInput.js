//Using refs we read the value when needed.
//We only read the value once when the form is submitted.
import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    console.log("Name....", enteredName);

    const enteredValue = nameInputRef.current.value; //refs are obj that has current property that holds the value.
    console.log("Value...",enteredValue);

    // nameInputRef.current.value = ''; => To reset ref, it is NOT IDEAL, DON'T MANIPULATE THE DOM
    setEnteredName('');
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;