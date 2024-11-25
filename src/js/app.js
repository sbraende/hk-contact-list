// SELECTING ELEMENTS
const form = document.querySelector(".contact-app__form");
const firstnameInput = form.querySelector("[name='firstname']");
const lastnameInput = form.querySelector("[name='lastname']");
const phoneInput = form.querySelector("[name='phone-number']");
const addressInput = form.querySelector("[name='address']");
const submitButton = form.querySelector(".form__submit-button");

// DECLARING VARIABLES
const contacts = JSON.parse(localStorage.getItem("contacts")) || []; // ifs true - start with contacts (parsed data). false it will create [].

const addContacts = (e) => {
  e.preventDefault();
  const contact = {
    id: Date.now(),
    contactFristname: firstnameInput.value,
    contactLastname: lastnameInput.value,
    contactPhone: phoneInput.value,
    contactAddress: addressInput.value,
  };
  contacts.push(contact);
  storeContacts(contacts);
  console.log(contacts);
};

const storeContacts = (contactsArray) => {
  localStorage.setItem("contacts", JSON.stringify(contactsArray));
};

// ADD EVENT LISTENER TO THE FORM TO ADD CONTACTS
form.addEventListener("submit", addContacts);

console.log(contacts);
