class Event {
  constructor(eventName, eventDesc) {
    this.name = eventName;
    this.desc = eventDesc;
  }
}

const events = [
  //   new Event("Feature Event", "Feature Event Desc"),
  new Event("Event 1", "Event 1 Desc"),
  new Event("Event 2", "Event 2 Desc"),
  new Event("Event 3", "Event 3 Desc"),
];

const eventListElm = document.querySelector(".event__list");

events.forEach((event) => {
  const eventElm = document.createElement("div");
  eventElm.className = "event__box";
  eventElm.innerHTML = `
  <div class="event__details">
  <h2>${this.name}</h2>
  <p>${this.desc}</p>
  <button clas="btn-reg">Register</button>
    </div>
  `;

  //   const btnReg = eventElm.querySelector(".btn-reg");

  //   btnReg.addEventListener("click", () => {
  //     event.reg();
  //   });

  eventListElm.appendChild(eventElm);
});

/* <div class="event__box">
  <div class="event__details">
    <h2>Event 1</h2>
    <p>Event 1 Desc</p>
  </div>
</div>; */
