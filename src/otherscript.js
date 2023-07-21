let events = [];

    flatpickr("#event-start", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      defaultHour: 8,
      defaultMinute: 0,
      time_24hr: true,
    });

    flatpickr("#event-end", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      defaultHour: 9,
      defaultMinute: 0,
      time_24hr: true,
    });

    function addEvent() {
      const name = document.getElementById("event-name").value;
      const day = document.getElementById("event-day").value;
      const start = document.getElementById("event-start").value;
      const end = document.getElementById("event-end").value;
      const location = document.getElementById("event-location").value;

      const event = {
        giorno: day,
        inizio: start,
        fine: end,
        posto: location,
        nome: name
      };

      events.push(event);
      displayEvents();
    }

    function displayEvents() {
      const eventList = document.getElementById("event-list");
      eventList.innerHTML = "";

      events.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");

        const eventName = document.createElement("div");
        eventName.classList.add("event-name");
        eventName.textContent = event.nome;

        const eventTime = document.createElement("div");
        eventTime.classList.add("event-time");
        eventTime.textContent = `${event.giorno}, ${event.inizio}-${event.fine}`;

        const eventLocation = document.createElement("div");
        eventLocation.textContent = `Posto: ${event.posto}`;

        eventDiv.appendChild(eventName);
        eventDiv.appendChild(eventTime);
        eventDiv.appendChild(eventLocation);

        eventList.appendChild(eventDiv);
      });

      updateDownloadLink();
    }

    function updateDownloadLink() {
      const downloadLink = document.getElementById("download-link");
      const jsonData = JSON.stringify(events, null, 2);
      const jsonDataBlob = new Blob([jsonData], { type: "application/json" });
      const jsonDataURL = URL.createObjectURL(jsonDataBlob);
      downloadLink.href = jsonDataURL;
    }