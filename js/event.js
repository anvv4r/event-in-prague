class Event {
	constructor(id, name, date, description, image_url) {
		this.id = id;
		this.name = name;
		this.date = date;
		this.description = description;
		this.image_url = image_url;
	}
}

async function getData() {
	const response = await fetch(
		'https://test-api.codingbootcamp.cz/api/72291a73/events'
	);
	const data = await response.json();

	// Get the last 9 items from data
	const lastNineItems = data.slice(-9);

	// Assuming each item in data is an object with properties that match the parameters of the Event constructor
	const events = lastNineItems.map(
		(item) =>
			new Event(
				item.id,
				item.name,
				item.date,
				item.description,
				item.image_url
			)
	);

	// Now you can use the events array for your widget
	events.forEach((event, index) => {
		let eventElm = document.createElement('div');

		// If this is the first event, create Featured Event, else create the normal list event box
		if (index === 0) {
			eventElm.classList.add('event__main');
			eventElm.innerHTML = `
        <div>
          <h2>Featured Event</h2>
        </div>
        <div class="event__details">
          <div class="event__image">
            <img class="event__img" src="${event.image_url}" alt="${event.name}" />
          </div>
          <div class="event__desc">
            <h3>${event.name}<h3>
            <p>event date: ${event.date}</p>
            <p>${event.description}</p>
            <a href="#openRegisterModal${event.id}" class="register-button">Register</a>
          </div>
        </div>
      </div>
    `;
		} else {
			eventElm.innerHTML = `
     <div class="event__box">
        <div class="event__desc">
          <h3>${event.name}</h3>
          <p>${event.description}</p>
          <a href="#openModal${event.id}" class="button">More</a>
        </div>
    </div>
    `;
		}

		// Create the modal element
		const modalElm = document.createElement('div');
		modalElm.innerHTML = `
    <div id="openModal${event.id}" class="modalbg">
      <div class="dialog">
        <a href="#" title="Close" class="close">X</a>
        <div class="event__desc">
          <h3>${event.name}<h3>
          <p>event date: ${event.date}</p>
          <p>${event.description}</p>
          <a href="#openRegisterModal${event.id}" class="register-button">Register</a>
        </div>
      </div>
    </div>
  `;
		// Create the registration modal element
		const registerModalElm = document.createElement('div');
		registerModalElm.innerHTML = `
    <div id="openRegisterModal${event.id}" class="modalbg">
      <div class="dialog">
        <a href="#" title="Close" class="close">X</a>
        <h2>${event.name}<h2>
        <h3>Registration Form</h3>
        <br>
        <form onSubmit={handleSubmit}>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required  placeholder="example@gmail.com"><br><br>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  `;

		// Append the event element to the appropriate container
		// If this is the last event, append it to .event__feature (index === events.length - 1)
		// If this is the first event, append it to .event__feature (index === 0)
		if (index === 0) {
			document.querySelector('.event__feature').appendChild(eventElm);
			document.body.appendChild(modalElm); // append the modal to the body
			document.body.appendChild(registerModalElm); // append the registration modal to the body
		} else {
			document.querySelector('.event__list').appendChild(eventElm);
			document.body.appendChild(modalElm); // append the modal to the body
			document.body.appendChild(registerModalElm); // append the registration modal to the body
		}
	});
}

document.querySelectorAll('form').forEach((form) => {
	form.addEventListener('submit', function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);

		fetch(
			'https://test-api.codingbootcamp.cz/api/72291a73/events/{event_id}/registrations',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}
		)
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error('Error:', error));
	});
});

getData();

// Open the modal when the event details button is clicked
document.querySelectorAll('.button').forEach((button) => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		document.querySelector(button.getAttribute('href')).style.display =
			'block';
	});
});

// Open the registration modal when the register button is clicked
document.querySelectorAll('.register-button').forEach((button) => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		document.querySelector(button.getAttribute('href')).style.display =
			'block';
	});
});

// Close the modal when the close button is clicked
document.querySelectorAll('.close').forEach((closeButton) => {
	closeButton.addEventListener('click', (e) => {
		e.preventDefault();
		closeButton.closest('.modalbg').style.display = 'none';
	});
});
