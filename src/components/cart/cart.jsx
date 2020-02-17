import React from 'react';
import { Field, reduxForm } from 'redux-form';

function Cart(props) {
  console.log(props);
  
  const submit = values => {
    event.preventDefault();
    console.log(values);
  };
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default reduxForm({
  // a unique name for the form
  form: 'cartForm'
})(Cart);
