const endpointURL = "http://localhost:3001"

async function login(username, password) {
    const result = await fetch(`${endpointURL}/user/login`, {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({
            username,
            password,
        }),
    })

    const resultJson = await result.json()

    if (resultJson.error) {
        console.error(resultJson.error)
        return
    }

    localStorage.setItem("token", resultJson.token)
}

async function createUser(newUser) {
    const token = localStorage.getItem("token")

    const result = await fetch(`${endpointURL}/user`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify(newUser),
    })

    const resultJson = await result.json()

}

const saveUserButton = document.querySelector("#saveUser")

saveUserButton.addEventListener("click", async (event) => {
    event.preventDefault()

    const addres = {
        "address": document.querySelector("#inputAddress").value,
        "district": document.querySelector("#inputDistrict").value,
        "numberHouse": document.querySelector("#inputNumHouse").value
    }

    const name = document.querySelector("#inputName").value
    const username = document.querySelector("#inputUserName").value
    const password = document.querySelector("#inputPass").value
    const cpf = document.querySelector("#inputCpf").value
    const birthDate = document.querySelector("#inputDataNasc").value
    const phoneNumber = document.querySelector("#inputTel").value
    const address = `${addres.address}, ${addres.district}, ${addres.numberHouse}`

    await createUser({
        name,
        username,
        password,
        cpf,
        birthDate,
        phoneNumber,
        address,
    })

    window.location.href = "login.html"

})

