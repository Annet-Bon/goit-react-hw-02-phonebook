import { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from "uuid";
// js

// json

export default class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  static propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
  };

  addContact = (el) => {
    if (this.state.contacts.find((item) => item.name === el.name)) {
      alert(`${el.name} is already in contacts.`)
    } else {
      this.setState((prevState) => {
        const updateState = [...prevState.contacts, el]
        return { contacts: updateState }
      })
    }
  }

  render() {
      return (
          <div>
              <h1>Phonebook</h1>
              <ContactForm onSubmit={this.addContact} />

              <h2>Contacts</h2>
              <Filter value={this.state.filter} onChange={this.changeFilter} />
              <ContactList
                contacts={this.filterContact}
                onDeleteContact={this.deleteContact}
              />
          </div>
      );
  }
}