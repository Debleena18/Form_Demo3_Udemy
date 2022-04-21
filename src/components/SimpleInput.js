//Using refs we read the value when needed.
//We only read the value once when the form is submitted.
import { useEffect, useRef, useState } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false); //this state is when user touch the input field
  // const [isValid, setIsValid] = useState(true);
  // Here setting the above state as "true" might create an error when we have an useEffect working specially with true value.
  // this will make useEffect run even before the user input any value. 

  useEffect(() => {
    if(isValid){
      console.log("Input is valid");
    }
  }, [isValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched (true);

    if (enteredName.trim() == ''){
      setIsValid(false);
      return;
    }
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);

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

  const nameInputIsInvalid = !isValid && enteredNameTouched;
  const nameInputClasses = nameInputIsInvalid? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur= {nameInputBlurHandler} //Built-in event which fires whenever i/p looses focus
          value={enteredName}
        />
        {nameInputIsInvalid && <p className='error-text'>Name shouldnot be empty</p>}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;