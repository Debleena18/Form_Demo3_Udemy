//Using refs we read the value when needed.
//We only read the value once when the form is submitted.
import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');
  const [isValid, setIsValid] = useState(true);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (enteredName.trim() == ''){
      setIsValid(false);
      return;
    }
    setIsValid (true);
    console.log("Name....", enteredName);

    const enteredValue = nameInputRef.current.value; //refs are obj that has current property that holds the value.
    console.log("Value...",enteredValue);

    // nameInputRef.current.value = ''; => To reset ref, it is NOT IDEAL, DON'T MANIPULATE THE DOM
    setEnteredName('');
  };

const nameInputClasses = isValid? 'form-control' : 'form-control invalid';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {!isValid && <p className='error-text'>Name shouldnot be empty</p>}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;