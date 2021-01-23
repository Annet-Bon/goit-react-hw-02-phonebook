import { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from "uuid";
// js
import ContactForm from './ContactForm/index';
import Filter from './Filter/index';
import ContactList from './ContactList/index';
// json
import styles from './app.module.css';

const filterContacts = (contacts, filter) =>
	contacts.filter(contact =>
		contact.name.toLowerCase().includes(filter.toLowerCase()),
	);

export default class App extends Component {
	state = {
		contacts: [
			{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
			{id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
			{id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
			{id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
		],
		filter: ''
	};

	static propTypes = {
		contacts: PropTypes.arrayOf(
			PropTypes.shape({
					id: PropTypes.string.isRequired,
					name: PropTypes.string.isRequired,
					number: PropTypes.string.isRequired,
			}).isRequired,
		).isRequired,
		filter: PropTypes.string,
		value: PropTypes.string,
		onSubmitData: PropTypes.func,
		changeFilter: PropTypes.func,
		onDeleteContact: PropTypes.func,
	};

	changeFilter = e => {
		const { value } = e.target;
		this.setState({ filter: value });
	};

	onDeleteContact = id => {
		this.setState({
			contacts: this.state.contacts.filter(contact => contact.id !== id),
		});
	};

	onSubmitData = (data) => {
		const { contacts } = this.state;

		const addContact = {
			id: uuidv4(),
			name: data.name,
			number: data.number,
		};

		if (contacts.find(contact => contact.name === addContact.name)) {
			alert(`${addContact.name} is already in contacts!`);
			return;
		}
		this.setState({
			contacts: [...contacts, addContact],
		});
	};

	render() {
		const { contacts, filter } = this.state;
		const filteredContacts = filterContacts(contacts, filter);

			return (
					<div>
							<h1 className={styles.title}>Phonebook</h1>
							<ContactForm onSubmitData={this.onSubmitData} />

							{contacts.length === 0
							? <span>There are no contacts</span>
							: (
								<>
									<h2 className={styles.title}>Contacts</h2>
									{contacts.length > 1 && (
										<Filter value={filter} onChangeFilter={this.changeFilter} />
									)}
										<ContactList contacts={filteredContacts} onDeleteContact={this.onDeleteContact} />
								</>
							)}
					</div>
			);
	}
}