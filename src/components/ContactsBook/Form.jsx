import { useState } from "react";
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types';

import { StyleForm } from './Form.styled'

const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handlChange = (evt) => {
    const {name, value} = evt.currentTarget

    switch(name) {
      case 'name':
        setName(value)
        break;

      case 'number':
        setNumber(value)
        break;

      default:
        return;
    }
  }

  const handlSubmit = (evt) => {
    evt.preventDefault()
    const arrayContact = {id: nanoid(), name: name, number: number}
    onSubmit(arrayContact)
    resetForm()
  }
    
  const resetForm = () => {
    setName('')
    setNumber('')
  }

  return (
    <>
      <h2 style={{textAlign: 'center',
                  fontSize: 30,
                  fontWeight:700}}>Phonebook</h2>
        
      <StyleForm onSubmit={handlSubmit}>
        <label htmlFor='userName'>Name</label>
        <input
          id='userName'
          type="text"
          name="name"
          value={name}
          onChange={handlChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
          
        <label htmlFor='userNumber'>Number</label>
        <input
          id='userNumber'
          type="tel"
          name="number"
          value={number}
          onChange={handlChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          />
        <button type='submit'>Add Contact</button>
      </StyleForm>
    </>    
  );
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Form;