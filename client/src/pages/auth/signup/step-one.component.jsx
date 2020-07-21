import React from 'react';
import InputBox from '../../../components/input/inputBox.component';
import Arrow from '../../../assets/arrow.svg';

const StepOne = () => {
  const handleSubmit = () => {
    console.log('submited');
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__group">
          <div className="form__group--0">
            <div className="form__group--0__A">
              <h1>Let's start with your profile first!</h1>
              <p>it only takes basic information</p>
            </div>
            <div className="form__group--0__B">
              <p>
                <strong>Note: </strong>*Required field to be completed
              </p>
            </div>
          </div>
          <div className="form__group--1">
            <InputBox label="First Name" required="true" type="text" />
            <InputBox label="Middle Name" required="false" type="text" />
            <InputBox label="LastName Name" required="true" type="text" />
          </div>
          <div className="form__group--2">
            <InputBox label="Email Name" required="true" type="email" />
            <InputBox label="Last Name" required="true" type="number" />
          </div>
          <div className="form__group--3">
            <button type="submit" className=" submit_btn btn">
              <p>previous</p>
            </button>
            <button type="submit" className=" submit_btn btn btn--green">
              <div>
                <p>Next</p>
                <img src={Arrow} alt="" />
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
