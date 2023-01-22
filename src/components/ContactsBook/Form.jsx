// import { useState } from "react";
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types';
import { Formik, Field, ErrorMessage  } from 'formik';
import * as yup from 'yup';

import { StyleForm } from './Form.styled'

const initialValues = {
  name: '', number: ''
}

const schema = yup.object().shape({
  name: yup.string().required().matches(/(^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$)/),
  number: yup.number().required().matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/),
});

const FormErrorName = ({ name }) => {
  return (
    <ErrorMessage name={name} component='div'
      render={() => <div>Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan</div>} />
  )
}

const FormErrorNumber = ({ name }) => {
  return (
    <ErrorMessage name={name} component='div'
      render={() => <div>Phone number must be digits and can contain spaces, dashes, parentheses and can start with +</div>} />
  )
}

const FormSubmit = ({ onSubmit }) => {
  const handlSubmit = (value, {resetForm}) => {
    const {name, number } = value
    const arrayContact = { id: nanoid(), name, number }

    onSubmit(arrayContact)
    resetForm()
  }

  return (
    <>
      <h2 style={{textAlign: 'center',
                  fontSize: 30,
                  fontWeight:700}}>Phonebook</h2>
        
      <Formik initialValues={initialValues} onSubmit={handlSubmit} validationSchema={schema}>
        <StyleForm>
          <label htmlFor='userName'>Name</label>
          <Field  
          id='userName'
          name="name"
          />
          <FormErrorName name="name"/>
          
          <label htmlFor='userNumber'>Number</label>
          <Field
            id='userNumber'
            name="number"
          />
          <FormErrorNumber name="number"/>
          <button type='submit'>Add Contact</button>
        </StyleForm>
      </Formik>
    </>    
  );
}

FormSubmit.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default FormSubmit;