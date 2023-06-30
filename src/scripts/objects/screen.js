const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<section class="info">
                                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                                <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                                <h4>👥 Seguidores: ${user.followers == 0 ? 'nenhum' : user.followers}</h4>
                                                <h4>👥 Seguindo: ${user.following == 0 ? 'nenhum' : user.following}</h4>
                                            </div>
                                        </section>`


        let eventsItems = "";
        user.events.forEach((event) => {
            eventsItems += `<li><a href="${event.repo.url}" target="_blank">${event.repo.name
                }</a> - ${event.payload.commits ? event.payload.commits[0].message : ""
                }</li>`;
        });
        if (user.events.length > 0) {
            this.userProfile.innerHTML +=  `<div class="events-field">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItems}</ul>
                                            </div>`;
        }

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">
                                                                    <div class="repository-name">${repo.name}</div>
                                                                    <div class="repository-info">
                                                                        <span class="item-info">🍴 ${repo.forks_count}</span>  
                                                                        <span class="item-info">⭐️ ${repo.stargazers_count}</span>  
                                                                        <span class="item-info"> 👀 ${repo.watchers_count}</span> 
                                                                        <span class="item-info"> 👨‍💻 ${repo.language}</span>
                                                                    </div>
                                                                </a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<section class="repositories">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>                                                
                                            </section>`
        } else {
            this.userProfile.innerHTML = '<h2>Nenhum repositório</h2>'
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }