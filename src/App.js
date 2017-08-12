import React, { Component } from 'react';
import ListContacts from './ListContacts';




class App extends Component {
  state = {
    contacts: [
      {
        "id": "ryan",
        "name": "Ryan Florence",
        "email": "ryan@reacttraining.com",
        "avatarURL": "http://localhost:5001/ryan.jpg"
      },
      {
        "id": "michael",
        "name": "Michael Jackson",
        "email": "michael@reacttraining.com",
        "avatarURL": "http://localhost:5001/michael.jpg"
      },
      {
        "id": "tyler",
        "name": "Tyler McGinnis",
        "email": "tyler@reacttraining.com",
        "avatarURL": "http://localhost:5001/tyler.jpg"
      }
    ]
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
