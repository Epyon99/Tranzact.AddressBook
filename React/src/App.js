import './App.css';
import React, { useEffect, useRef } from "react";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const service_url = process.env.REACT_APP_SERVICE_URL;
export const API = {
  LoadContacts(url) {
    return fetch(url)
      .then(res => res.json())
  },
  LoadSingleContact(url) {
    return fetch(url)
      .then(res => res.json())
  },
  AddContact(url, contact) {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(contact)
    }).then(data => data.json());
  },
  DeleteContact(url) {
    return fetch(url, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
  },
  UpdateContact(url, contact) {
    fetch(url, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(contact)
    }).then(data => data.json())
  },
  ClearContact() {
    return {
      contactName: "",
      email: "",
      mobilePhone: "",
      isPublic: false,
      formErrors: { email: '', contactName: '' },
      emailValid: false,
      mobileValid: false,
      contactNameValid: false,
      formValid: false
    }
  }
}

function App() {
  const [alert, setAlert] = React.useState(false);
  const [value, setValue] = React.useState(API.ClearContact());
  const [contacts, setContacts] = React.useState([]);
  let mounted = useRef(true);
  let isEdit = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (contacts.length && !alert) {
      return;
    }
    if (mounted.current) {
      loadContacts();
    }
    return () => mounted.current = false;
  }, [alert, contacts])
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (mounted.current) {
          setAlert(false);
        }
      }, 1000)
    }
  }, [alert])
  const loadContacts = () => {
    API.LoadContacts(service_url + '/Contacts')
      .then((data) => {
        if (data != undefined) {
          setContacts(data);
        }
        isEdit.current = false;
      })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    // Aqui va el post.
    let contact = {
      ContactName: value.contactName,
      Email: value.email,
      MobilePhone: value.mobilePhone,
      IsPublic: value.isPublic
    };
    API.AddContact(service_url + '/Contacts', contact)
    if (mounted) {
      setValue(API.ClearContact());
      setAlert(true)
    }
  };
  const handleEditSubmit = (e, contactId) => {
    e.preventDefault();
    if (!value) return;
    // Aqui va el post.
    let contact = {
      ContactId: value.contactId,
      ContactName: value.contactName,
      Email: value.email,
      MobilePhone: value.mobilePhone,
      IsPublic: value.isPublic
    };
    API.UpdateContact(service_url + '/Contacts', contact)
    if (mounted) {
      setValue(API.ClearContact());
      setAlert(true);
      isEdit.current = false;
    }
  };

  const handleCheck = evt => {
    setValue({
      ...value,
      [evt.target.name]: evt.target.checked
    })
  }
  const handleChange = evt => {
    const v = evt.target.value;


    let fieldValidationErrors = value.formErrors;
    let emailValid = value.emailValid;
    let contactNameValid = value.contactNameValid;
    let mobileValid = value.mobileValid;
    switch (evt.target.name) {
      case 'email':
        emailValid = v.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'contactName':
        contactNameValid = v.match(/^[A-Za-z]*$/i);;
        fieldValidationErrors.contactName = contactNameValid ? '' : ' is invalid';
        break;
      case 'mobilePhone':
        mobileValid = v.match(/^[0-9]*$/i);
        fieldValidationErrors.mobilePhone = mobileValid ? '' : ' is invalid';
        break;
      default:
        break;
    }

    setValue({
      ...value,
      [evt.target.name]: v,
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      mobileValid: mobileValid,
      contactNameValid: contactNameValid,
      formValid: emailValid && contactNameValid && mobileValid
    });
  }

  const updateContact = index => {
    isEdit.current = true;
    API.LoadSingleContact(service_url + '/Contacts/single?contactId=' + index).then((data) => {
      setValue({
        ...data,
        formErrors: false,
        emailValid: true,
        mobileValid: true,
        contactNameValid: true,
        formValid: true
      });
    })
  };
  const removeContact = index => {
    API.DeleteContact(service_url + '/Contacts?contact=' + index).then((data) => {
      setValue(API.ClearContact());
      setAlert(true);
    })
  };
  return (
    <div className="app">
      <div className="container">
        <div>
          {alert && <h2> Action Successful</h2>}
        </div>
        <div className="row">
          <div data-testid="contact-list" className="col">

            <h1 className="text-center mb-4">Contact List</h1>
            {contacts.map((contact, index) => (
              <Card key={contact.contactId}>
                <Card.Body>
                  <h5 className="card-title">Contact Name: {contact.contactName}</h5>
                  <h6>Email: {contact.email}</h6>
                  <h6>Mobile Phone: {contact.mobilePhone}</h6>
                  <a data-testid={contact.contactId + "_update"} href="#" onClick={(e) => { e.preventDefault(); updateContact(contact.contactId); }} className="card-link">Edit</a>
                  <a data-testid={contact.contactId + "_delete"} href="#" onClick={(e) => { e.preventDefault(); removeContact(contact.contactId); }} className="card-link">Delete</a>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div className="col">
            <h1 className="text-center mb-4">{!isEdit.current ? "Add new" : "Edit"} Contact</h1>

            <Form onSubmit={!isEdit.current ? handleSubmit : handleEditSubmit}>
              <Form.Group>
                <div className="panel panel-default" hidden={!(value == undefined || !value.formValid)}>
                  {Object.keys(value.formErrors).map((fieldName, i) => (
                    value.formErrors[fieldName] != '' &&
                    <p key={i} > {fieldName} {value.formErrors[fieldName]}</p>
                  ))}
                </div>
                <Form.Label><b>Add Contact</b></Form.Label>
                <Form.Control data-testid="name-input" type="text" name="contactName" className="input" value={value.contactName} onChange={handleChange} placeholder="Contact Name" />
                <Form.Control data-testid="email-input" type="text" name="email" className="input" value={value.email} onChange={handleChange} placeholder="Email" />
                <Form.Control data-testid="mobilePhone-input" type="text" name="mobilePhone" className="input" value={value.mobilePhone} onChange={handleChange} placeholder="MobilePhone" />
              </Form.Group>
              <Button data-testid="create-btn" variant="primary mb-3" type="submit" disabled={!value.formValid}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
