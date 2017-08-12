import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'




class App extends Component {
  state = {
    contacts: []
  }
  // Add a lifecycle event to retrieve contacts from the API
  componentDidMount(){
    // when the Component mounts, we make an API request
    // when that api request gets resolved, we get the contacts and update the state
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  // when removeContact is invoked, it's going to be passed the specific contact that was clicked on
  removeContact = (contact) => {
    this.setState((state) => ({
      // then we're going to filter the current contacts on our state
      // and we're going to remove where the state's c.id is not equal to the contact's id that was clicked on
      contacts: state.contacts.filter((c) => c.id !== contact.id)
      // will return a new contacts array, with the specific contact that was clicked on filtered out
    }))
  }
  render() {
    return (
       <div>
         <ListContacts
           onDeleteContact={this.removeContact}
           contacts={this.state.contacts}
         />
       </div>
     )
  }
}

export default App;
