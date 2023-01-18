// import React, { Component } from 'react';
import { useState } from "react";

import Form from './ContactsBook/Form';
import ContactList from './ContactsBook/ContactList'
import Filter from './ContactsBook/Filter'
import { useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => 
    JSON.parse(window.localStorage.getItem(key)) ?? defaultValue);

  useEffect(() => window.localStorage.setItem(key, JSON.stringify(state)), [key, state])
  
  return [state, setState]
}
  
  const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (data) => {
    if (!(contacts.filter(contact => contact.name.toLowerCase() === data.name.toLowerCase())).length) {
      setContacts(prevState => [data, ...prevState])
    } else alert(`${data.name} is already in contacts`)
    return contacts
  };

  const deleteContact = (contactID) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactID))
  };

  const changeFilter = (evt) => {
    const { value } = evt.currentTarget
    setFilter(value)
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }
    
  return (
    <>
      <Form onSubmit={addContact} />
      <Filter value={ filter } changeFilter={ changeFilter } />
      <ContactList contacts={ getVisibleContacts() } deleteContact={ deleteContact } />
    </>
  );
}

export default App;
