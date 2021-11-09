import {baseUrl, repositoriesQuantity} from '/src/scripts/variables.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        getUserProfile(userName)
    }
})

async function user(userName) {
    const response = await fetch(`${baseUrl}/${userName}`)
    return await response.json()
}

async function repos(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`)
    return await response.json()
}

function getUserProfile(userName) {
    user(userName).then(UserData => {
        let userInfo = `<div class="info">
                            <img src="${UserData.avatar_url}" alt="foto do perfil do usuario" />
                            <div class="data">
                                <h1>${UserData.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                <p>${UserData.bio ?? 'Não possui bio cadastrado 😥'}</p>
                            </div>
                        </div>
        `
        document.querySelector('.profile-data').innerHTML = userInfo

        getUserRepositories(userName)
    })
}

function getUserRepositories(userName) {
    repos(userName).then(reposData => {
        let repositoriesItens = ""
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
        })
        document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
                                                                <h2>Repositorios</h2>
                                                                <ul>${repositoriesItens}</ul>
                                                              </div>`
    })
}