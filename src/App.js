import React, { Component } from 'react';



class ContactList extends Component {
  render() {
    const people = this.props.contacts

    return <ol>
      {people.map(person => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ol>
  }
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactList contacts={[
          { name: 'Will' },
          { name: 'John' },
          { name: 'Billy' },
          { name: 'Jack' },
          { name: 'Marge' },
          { name: 'Neil' }
        ]}/>
        <ContactList contacts={[
          { name: 'Moe' },
          { name: 'Lisa' },
          { name: 'Homer'}
        ]}/>
      </div>
    );
  }
}

export default App;
