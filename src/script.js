function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
  }

  function getCurrentDay() {
    var days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    var now = new Date();
    var dayIndex = now.getDay();
    return days[dayIndex];
  }

  function updateCurrentTime() {
    var currentTimeDiv = document.getElementById('current-time');
    currentTimeDiv.textContent = 'Current time: ' + getCurrentTime();
  }



function compareAppointments(appointments) {
var currentTime = new Date();
var currentDay = currentTime.getDay();
var appointmentsDiv = document.getElementById('appointments');
appointmentsDiv.innerHTML = '';

appointments.sort(function(a, b) {
  var dayComparison = getDayValue(a.giorno) - getDayValue(b.giorno);
  if (dayComparison === 0) {
    var timeA = getTimeValue(a.inizio);
    var timeB = getTimeValue(b.inizio);
    return timeA - timeB;
  }
  return dayComparison;
});

var currentAppointment = null;
var nextAppointment = null;

for (var i = 0; i < appointments.length; i++) {
  var appointment = appointments[i];

  var appointmentDay = getDayValue(appointment.giorno);
  var appointmentStart = getTimeValue(appointment.inizio);
  var appointmentEnd = getTimeValue(appointment.fine);

  if (currentDay === appointmentDay && currentTime >= appointmentStart && currentTime <= appointmentEnd) {
    currentAppointment = appointment;
    if (i + 1 < appointments.length) {
      nextAppointment = appointments[i + 1];
    }
    break;
  }

  if (currentDay < appointmentDay || (currentDay === appointmentDay && currentTime < appointmentStart)) {
    nextAppointment = appointment;
    break;
  }
}

if (currentAppointment) {
  var currentAppointmentDiv = document.createElement('div');
  currentAppointmentDiv.classList.add('current-appointment');

  currentAppointmentDiv.innerHTML = 
    '<p>Impegno corrente: ' + currentAppointment.nome + '</p>' +
    '<p>Inizio: ' + currentAppointment.inizio + '</p>' +
    '<p>Fine: ' + currentAppointment.fine + '</p>' +
    '<p>Posto: ' + currentAppointment.posto + '</p>' +
    '<p>Giorno: ' + currentAppointment.giorno + '</p>';

  appointmentsDiv.appendChild(currentAppointmentDiv);
}

if (nextAppointment) {
  var nextAppointmentDiv = document.createElement('div');
  nextAppointmentDiv.classList.add('next-appointment');

  nextAppointmentDiv.innerHTML =
    '<p>Prossimo impegno: ' + nextAppointment.nome + '</p>' +
    '<p>Inizio: ' + nextAppointment.inizio + '</p>' +
    '<p>Fine: ' + nextAppointment.fine + '</p>' +
    '<p>Posto: ' + nextAppointment.posto + '</p>' +
    '<p>Giorno: ' + nextAppointment.giorno + '</p>';

  appointmentsDiv.appendChild(nextAppointmentDiv);
}
}

function getDayValue(day) {
var days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
return days.indexOf(day);
}

function getTimeValue(time) {
var [hours, minutes] = time.split(':');
var date = new Date();
date.setHours(hours, minutes);
return date;
}


function getDayValue(day) {
var days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
return days.indexOf(day);
}

function getTimeValue(time) {
var [hours, minutes] = time.split(':');
var date = new Date();
date.setHours(hours, minutes);
return date;
}

  document.getElementById('json-file').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      try {
        var json = JSON.parse(e.target.result);
        compareAppointments(json);
      } catch (error) {
        console.error('Errore durante la lettura del file JSON:', error);
        alert("Errore durante la lettura del file JSON: ", error);
      }
    };

    reader.readAsText(file);
  });

  setInterval(function() {
    updateCurrentTime();
  }, 1000);
