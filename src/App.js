import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { Table, Container, Navbar, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaRegEnvelope,
  FaPlus,
  FaUserAlt,
  FaPhoneAlt,
  FaTrashAlt
} from "react-icons/fa";

export default function App() {
  const [contact, setContact] = useState({
    name: "",
    phone: ""
  });
  const [contacts, setContacts] = useState([]);

  const addContact = e => {
    e.preventDefault();
    const { name, phone } = contact;
    const formValid =
      name && /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(phone);
    if (!formValid) {
      return;
    }
    setContacts(contacts => [...contacts, { id: uuidv4(), name, phone }]);
  };

  const deleteContact = index => {
    setContacts(contacts => contacts.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <Navbar>
        <Navbar.Brand href="#home">
          <FaRegEnvelope className="App-logo" /> My UT Phone Book
        </Navbar.Brand>
      </Navbar>
      <div className="App">
        <form onSubmit={addContact}>
          <div className="row pb-5 border border-1 mb-5">
            <div className=" col-12 text-title pb-3">
              <h2 className="bg-secondary text-white">Add New Contact</h2>{" "}
            </div>
            <div className="col">
              <input
                class="form-control"
                placeholder="Name"
                value={contact.name}
                onChange={e =>
                  setContact(contact => ({ ...contact, name: e.target.value }))
                }
              />
            </div>
            <div className="col">
              <input
                class="form-control"
                placeholder="Phone Number"
                value={contact.phone}
                onChange={e =>
                  setContact(contact => ({ ...contact, phone: e.target.value }))
                }
              />{" "}
            </div>
            <div className="col-auto">
              <Button variant="secondary" type="submit">
                <FaPlus /> Add
              </Button>
            </div>
          </div>
          <Table className="table">
            <tbody>
              {contacts.map((contact, index) => {
                return (
                  <tr key={contact.id}>
                    <td>
                      <FaUserAlt />
                      {contact.name}
                    </td>
                    <td>
                      <FaPhoneAlt />
                      {contact.phone}
                    </td>
                    <td>
                      <FaTrashAlt onClick={() => deleteContact(index)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </form>
      </div>
    </Container>
  );
}
