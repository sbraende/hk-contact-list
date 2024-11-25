// SELECTING ELEMENTS
const form = document.querySelector(".contact-app__form");
const firstnameInput = form.querySelector("[name='firstname']");
const lastnameInput = form.querySelector("[name='lastname']");
const phoneInput = form.querySelector("[name='phone-number']");
const addressInput = form.querySelector("[name='address']");
const submitButton = form.querySelector(".form__submit-button");
const contactList = document.querySelector(".contacts__list");
const searchInput = document.querySelector(".search__input");
const searchOption = document.querySelector(".search__filter");

// DECLARING VARIABLES
const contacts = JSON.parse(localStorage.getItem("contacts")) || []; // ifs true - start with contacts (parsed data). false it will create []. Refered to as shortcircuting.
let editContactId = null;

// RENDERING CONTACTS WHEN THE PAGE FIRST LOADED
document.addEventListener("DOMContentLoaded", () => renderContacts(contacts)); // Anonymous function, it will only be called when the domISLoaded.

// FUNCTION FOR ADDING CONTACTS TO THE LIST
const addContacts = (e) => {
  e.preventDefault();
  const contact = {
    id: editContactId || Date.now(),
    contactFristname: firstnameInput.value,
    contactLastname: lastnameInput.value,
    contactPhone: phoneInput.value,
    contactAddress: addressInput.value,
  };

  if (editContactId) {
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === editContactId
    );
    if (contactIndex !== -1) {
      contacts[contactIndex] = contact;
    }
    editContactId = null;
  } else {
    contacts.push(contact);
  }

  storeContacts(contacts);
  renderContacts(contacts);
  form.reset();
};

// FUNCTION FOR STORING CONTACTS IN LOCAL STORAGE
const storeContacts = (contactsArray) => {
  localStorage.setItem("contacts", JSON.stringify(contactsArray));
};

// FUNCTION FOR DELETING CONTACTS FROM THE LIST
const deleteContacts = (id) => {
  const contacts = JSON.parse(localStorage.getItem("contacts"));
  const remainingContacts = contacts.filter((contact) => contact.id !== id);
  storeContacts(remainingContacts);
  renderContacts(remainingContacts);
};

// FUNCTION FOR EDITING CONTACTS
const editContacts = (e, id) => {
  const contactToEdit = contacts.find((contact) => contact.id === id);
  const contactRow = e.target.closest(".contacts-item"); // Go up through parents to this search.
  if (contactToEdit) {
    firstnameInput.value = contactToEdit.contactFristname;
    lastnameInput.value = contactToEdit.contactLastname;
    phoneInput.value = contactToEdit.contactPhone;
    addressInput.value = contactToEdit.contactAddress;

    editContactId = id;
    submitButton.textContent = "Update Contact";
    contactRow.style.backgroundColor = "#ffffff";
  } else {
    submitButton.textContent = "Add Contact";
    contactRow.style.backgroundColor = "#7ab2d3";
  }
};

// FUNCTION FOR RENDERING THE CONTACTS ON THE DOM
const renderContacts = (contactsArray) => {
  contactList.textContent = ""; // Clears every element inside contactList
  contactsArray.forEach((contact, index) => {
    // CREATE ELEMENTS
    const contactItem = document.createElement("li");
    const contactListNumber = document.createElement("span");
    const contactFullname = document.createElement("span");
    const contactPhone = document.createElement("span");
    const contactAddress = document.createElement("span");
    const contactTools = document.createElement("span");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    // APPEND ELEMENTS
    contactList.append(contactItem);
    contactItem.append(
      contactListNumber,
      contactFullname,
      contactPhone,
      contactAddress,
      contactTools
    );
    contactTools.append(deleteButton, editButton);

    // INSERT CONTENT INTO ELEMENTS
    contactListNumber.textContent = `${index + 1}.`;
    contactFullname.textContent = `${contact.contactFristname} ${contact.contactLastname}`;
    contactPhone.textContent = `${contact.contactPhone}`;
    contactAddress.textContent = `${contact.contactAddress}`;
    deleteButton.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
    editButton.innerHTML = "<i class='fa-solid fa-pencil'></i>";

    // ADDING CLASS TO ELEMENTS
    contactItem.classList.add("contacts-item");
    contactListNumber.classList.add("contacts-item__list-number");
    contactFullname.classList.add("contacts-item__fullname");
    contactPhone.classList.add("contacts-item__phone");
    contactAddress.classList.add("contacts-item__address");
    contactTools.classList.add("contacts-item__controls");

    // ADD EVENT LISTENERES TO DELETE AND EDIT BUTTON
    deleteButton.addEventListener("click", () => deleteContacts(contact.id));
    editButton.addEventListener("click", (e) => editContacts(e, contact.id));
  });
};

// ADD EVENT LISTENER TO THE FORM TO ADD CONTACTS
form.addEventListener("submit", addContacts);

// ADD EVENT LISTENER TO THE SEARCH INPUT AND MAKE IT FUNCTIONAL
searchInput.addEventListener("input", (e) => {
  const searchQuary = e.target.value.toLowerCase();
  const searchOptionValue = searchOption.value;
  const filteredArray = contacts.filter((contact) => {
    if (searchOptionValue === "firstname") {
      return contact.contactFristname.toLowerCase().includes(searchQuary);
    } else if (searchOptionValue === "lastname") {
      return contact.contactLastname.toLowerCase().includes(searchQuary);
    } else if (searchOptionValue === "phone") {
      return contact.contactPhone.toLowerCase().includes(searchQuary);
    } else {
      return;
    }
  });
  renderContacts(filteredArray);
});
