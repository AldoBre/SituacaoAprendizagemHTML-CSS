const endpointURL = "http://localhost:3001"


const btnLogin = document.querySelector("#btnLogin")

btnLogin.addEventListener("click", async (event) =>{
    event.preventDefault()

    const username = document.querySelector("#user").value
    const password = document.querySelector("#password").value

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

    console.log(resultJson)
    
    if(!resultJson.token){
        const username = document.querySelector("#user").value = ""
        const password = document.querySelector("#password").value = ""
        alert("Usuário ou senha incorretos")
        return
    }else{
        localStorage.setItem("token", resultJson.token)
        localStorage.setItem("id", resultJson.data.id)
        window.location.href = "home.html"
        console.log("Dados corretos")  
    }
 
  
})