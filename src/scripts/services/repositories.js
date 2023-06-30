import { baseUrl, repositoriesQuantity } from "./../variables.js";

async function getRepositories(username) {
  const response = await fetch(
    `${baseUrl}/${username}/repos?per_page=${repositoriesQuantity}`
  );
  return response.json();
}

export { getRepositories };