document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
})

async function user(userName){
    const response = await fetch(`https://api.github.com/users/${userName}`)
    return await response.json()
}

function getUserProfile(userName){
    user(userName).then(UserData => {
        let userInfo = `<img src="${UserData.avatar_url}" alt="foto do perfil do usuario" />
        <div class="data">
        <h1>${UserData.name ?? 'Não possui nome cadastrado 😥'}</h1>
        <p>${UserData.bio ?? 'Não possui bio cadastrado 😥'}</p>
        </div>
        `
        document.querySelector('.profile-data').innerHTML = userInfo
    })
}