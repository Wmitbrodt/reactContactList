import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'




class App extends Component {
  state = {
    screen: 'list', // list, create
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

    // Remove contact for the api
    ContactsAPI.remove(contact)
  }
  render() {
    return (
       <div className="app">
         {this.state.screen === 'list' && (
           <ListContacts
             onDeleteContact={this.removeContact}
             contacts={this.state.contacts}
             onNavigate={() => {
               this.setState({ screen: 'create' })
             }}
           />
         )}
         {this.state.screen === 'create' && (
           <CreateContact/>
         )}
       </div>
     )
  }
}

export default App;
