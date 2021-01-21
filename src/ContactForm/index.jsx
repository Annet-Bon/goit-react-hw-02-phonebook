import styles from './contactForm.module.css';
import React, { Component } from 'react';

export default class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    onChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };
    
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.name || !this.state.number) {
            return;
          }
        this.props.onSubmitData ({ ...this.state });
        this.reset();
    }
    reset () {
        this.setState({
            name: '',
            number: '',
        });
    }

    render() {
        const { name, number } = this.state;

        return (
              <form onSubmit={this.onSubmit}>
                <label>
                    Name
                    <input 
                        type="text" 
                        name="name"
                        value={name}
                        onChange={this.onChange} 
                    />
                </label>
                
                <label>
                    Number
                    <input 
                        type="text" 
                        name="number" 
                        value={number}
                        onChange={this.onChange} 
                    />
                </label>
                
                <button type="submit"> Add new contact </button>
            </form>
        );        
    }
}
