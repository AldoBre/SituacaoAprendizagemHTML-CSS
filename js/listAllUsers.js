const endpointURL = "http://localhost:3001"

loginToken = localStorage.getItem("token")
if(!loginToken){
    location.href = "index.html"
}

async function deleteUser(userId){
    const token = localStorage.getItem("token")
    const deleteUser = await fetch(`${endpointURL}/user/${userId}`, {
        method: "DELETE",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        })
    })
    const deleteResultJson = await deleteUser.json()

    if(deleteResultJson.deleteUserCount < 1){
        console.error("Nenhum usuário foi deletado")
        return
    }
    const userToBeDeleted = document.getElementById(`userId-${userId}`)
    userToBeDeleted.remove()

    return deleteResultJson
}

async function getUser () {
    const token = localStorage.getItem("token")

    const allusers = await fetch(`${endpointURL}/user`,{
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        })
    })

    const allUsersJson = await allusers.json()

    return allUsersJson
}

async function getUserModal(userId){
    const token = localStorage.getItem("token")

    const modal = document.querySelector(".modal")

    if (modal) {
        modal.classList.remove("modal")
    }

    const user = await fetch(`${endpointURL}/user/${userId}`,{
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        })
    })

    const userJson = await user.json()

    const id = document.querySelector("#inputId")
    const name = document.querySelector("#inputName")
    const username = document.querySelector("#inputUserName")
    const password = document.querySelector("#inputPass")
    const cpf = document.querySelector("#inputCpf")
    const birthDate = document.querySelector("#inputDataNasc")
    const phoneNumber = document.querySelector("#inputTel")

    id.value = userJson.data.id
    name.value = userJson.data.name
    username.value = userJson.data.username
    password.value = userJson.data.password
    cpf.value = userJson.data.cpf
    birthDate.value = userJson.data.birthDate
    phoneNumber.value = userJson.data.phoneNumber

}



async function editUser(){
    const token = localStorage.getItem("token")
    const id = document.querySelector("#inputId").value
    const name = document.querySelector("#inputName").value
    const username = document.querySelector("#inputUserName").value
    const cpf = document.querySelector("#inputCpf").value
    const birthDate = document.querySelector("#inputDataNasc").value
    const phoneNumber = document.querySelector("#inputTel").value

    const result = await fetch(`${endpointURL}/user/${id}`,{
        method: "PUT",
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify({
            name,
            username,
            cpf,
            birthDate,
            phoneNumber,
        })
    })

    const resultJson = await result.json()
}

async function renderAllUsers(){
    const allUsers = await getUser()

    const listItemsArray = allUsers.data.map (
        (user,index) => `
        <tr id="userId-${user.id}">
            <td id="userIndex-${user.id}">${user.id}</td>
            <td id="nameTable">${user.name}</td>
            <td id="userNameTable">${user.username}</td>
            <td id="cpfTable">${user.cpf}</td>
            <td id="birthDateTable">${user.birthDate}</td>
            <td id="telTable">${user.phoneNumber}</td>
            <td id="addressTable">${user.address}</td>
            <td id="actionTable">
                <img onclick="deleteUser(${user.id})" src="./imgs/trash.png" id="deleteUser" alt="">
                <img onclick="getUserModal(${user.id})" src="./imgs/edit.png" alt="">
            </td>
         </tr>

        `
    )

    const listItemsUnique = listItemsArray.reduce(
        (accumulatedValue, currentValue) => accumulatedValue + currentValue, ""
    )

    const listWrapperElement = document.createElement("tbody")
    listWrapperElement.innerHTML = listItemsUnique

    const tableElement = document.querySelector("table")
    tableElement.append(listWrapperElement)

}

async function getUserDados () {
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")

    const allusers = await fetch(`${endpointURL}/user/${id}`,{
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        })
    })

    const allUsersJson = await allusers.json()

    console.log(allUsersJson)


    const userLogin = document.querySelector("#userLogin").innerHTML = allUsersJson.data.name
   

}

getUserDados()    
renderAllUsers()
