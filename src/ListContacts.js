import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component { // 4. Because its state has changed, the ListContacts component re-renders.
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  clearQuery = (query) => {
    this.setState({ query: '' })
  }

  updateQuery = (query) => {
    // 3. updateQuery() then calls setState(), merging in the new state to update the component's internal state.
    this.setState({ query: query.trim() })
  }

  render () {
    // object destructuring:
    // basically, created 3 different variables: contacts, onDeleteContact, query
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    let showingContacts
    // 'truthy'
    if (query) {
      // escape regular expressions and ignore uppercase
      const match = new RegExp(escapeRegExp(query), 'i')
      // filter by contact names
      showingContacts = contacts.filter((contact) => match.test(contact.name))
      // 'falsey'
    } else {
      showingContacts = contacts
    }
    // use the sortBy library to easily sort by name
    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search Contacts'
            // 1. The user enters text into the input field.
            value={query}
            // 2. An event listener invokes the updateQuery() function on every onChange event.
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link to="/create"
            onClick={this.props.onNavigate}
            className="add-contact">
            Add Contact
          </Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }

}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts
