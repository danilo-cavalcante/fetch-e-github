import { getUser } from "/src/scripts//services/user.js";
import { getRepositories } from "/src/scripts/services/repositories.js";
 import { getEvents } from "/src/scripts/services/events.js";
import { user } from "/src/scripts/objects/user.js";
import { screen } from "/src/scripts/objects/screen.js";

function validateEmptyInput(username) {
  if (username.length === 0) {
    alert("Preencha o campo com o nome do usuário do GitHub.");
    return true;
  }
}

document.getElementById("btn-search").addEventListener("click", () => {
  const username = document.getElementById("input-search").value;
  if (validateEmptyInput(username)) return;
  getUserData(username);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const username = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    if (validateEmptyInput(username)) return;
    getUserData(username);
  }
});

async function getUserData(username) {
  const userResponse = await getUser(username);
  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }
  const repositoriesResponse = await getRepositories(username);
  const eventsResponse = await getEvents(username);
  const eventsFilter = eventsResponse.filter(
    (event) => event.type === "CreateEvent" || event.type === "PushEvent"
  );
  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);
  user.setEvents(eventsFilter);
  screen.renderUser(user);
}