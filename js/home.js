const endpointURL = "http://localhost:3001"

loginToken = localStorage.getItem("token")
if(!loginToken){
    location.href = "index.html"
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
getUser ()

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
getUserDados ()