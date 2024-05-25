function openModal(event) {
  // Get the modal element (replace '#myModal' with the actual ID of your modal)
  const modal = document.querySelector("#myModal");

  // Get the elements in the modal where you want to display the event details
  const modalTitle = modal.querySelector(".modal-title");
  const modalDescription = modal.querySelector(".modal-description");

  // Set the text of these elements to the event details
  modalTitle.textContent = event.title;
  modalDescription.textContent = event.description;

  // Display the modal
  modal.style.display = "block";
}

// Example usage:
const myEvent = {
  title: "My Event",
  description: "This is a description of my event.",
};

openModal(myEvent);
