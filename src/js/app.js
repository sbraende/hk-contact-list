// SELECTING ELEMENTS
const form = document.querySelector(".contact-app__form");
const firstnameInput = form.querySelector("[name='firstname']");
const lastnameInput = form.querySelector("[name='lastname']");
const phoneInput = form.querySelector("[name='phone']");
const addressInput = form.querySelector("[name='address']");
const submitButton = form.querySelector(".form__submit-button");

// DECLARING VARIABLES
const contacts = [];

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
  console.log(contacts);
};

form.addEventListener("submit", addContacts);
