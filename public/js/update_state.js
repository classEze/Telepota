document.addEventListener("DOMContentLoaded", getAvailability)

document.querySelector('#trully').addEventListener('click', (e) => {
  return send_availability("trully")
})
document.querySelector('#falsely').addEventListener('click', (e) => {
  return send_availability("falsely")
})


function send_availability(identity) {
  document.querySelectorAll("button").forEach(button => button.classList.remove("trully"))
  const options = {
    method: "PATCH",
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ available: identity }),
    withCredentials: true
  }
  fetch('/availability/driver', options).then(res => res.json()).then(parsed => {
    console.log(parsed)
    set_availability(parsed.availability)
  }).catch(err => console.log(err))
}

function getAvailability() {
  localStorage.getItem("available") == "trully" ?
    document.querySelector("#trully").classList.add("trully") :
    document.querySelector("#falsely").classList.add("trully")
}

 function set_availability(status) {
  document.querySelector(`#${status}`).classList.add('trully');
  localStorage.setItem("available", status)
}
