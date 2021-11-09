async function user(){
    const response = await fetch('https://api.github.com/users/cadudias')
    return await response.json()
}

console.log(await user())