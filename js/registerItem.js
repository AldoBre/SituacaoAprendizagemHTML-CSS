const endpointURL = "http://localhost:3001"

loginToken = localStorage.getItem("token")
if(!loginToken){
    location.href = "index.html"
}

const buttonAddProduct = document.querySelector("#addProduct")
buttonAddProduct.addEventListener("click", () =>{

    const modal = document.querySelector(".modal")

    if (modal) {
        modal.classList.remove("modal")
    }


})

async function createProduct(newProduct){

    const result = await fetch(`${endpointURL}/product`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginToken}`,
        }),
        body: JSON.stringify(newProduct),
    })

    const resultJson = await result.json()

    console.log("Product Created: ", resultJson.data)
}

/* async function editProduct(productId){
    const { id, ...productInfo } = productId
    console.log(productId)

    const token = localStorage.getItem("token")
    const result = await fetch(`${endpointURL}/product/${productId}`,{
        method: "PUT",
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify(productId),
    })

    const resultJson = await result.json()

    console.log(resultJson) 
} */

async function getProduct(){
    const token = localStorage.getItem("token")

    const allusers = await fetch(`${endpointURL}/product`,{
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        })
    })

    const allUsersJson = await allusers.json()

    return allUsersJson
}

async function renderAllProducts(){
    const allProducts = await getProduct()

    const listItemsArray = allProducts.data.map(
        (product,index) => `
        <tr id="productId-${product.id}">
            <td id="nameTable">${product.name}</td>
            <td id="userNameTable">R$ ${product.price}</td>
            <td id="actionTable">
                <img onclick="deleteProduct(${product.id})" src="./imgs/trash.png" id="deleteUser" alt="">
                <img onclick="getProductModal(${product.id})" src="./imgs/edit.png" alt="">
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

async function deleteProduct(productId){
    const token = localStorage.getItem("token")
    const deleteUser = await fetch(`${endpointURL}/product/${productId}`, {
        method: "DELETE",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        })
    })
    const deleteResultJson = await deleteUser.json()

    if(deleteResultJson.deleteProductCount < 1){
        console.error("Nenhum produto foi deletado")
        return
    }else{
        alert("Produto Deletado")
    }
    const productToBeDeleted = document.getElementById(`productId-${productId}`)
    productToBeDeleted.remove()

    return deleteResultJson
}

async function getProductModal(productId){
    const token = localStorage.getItem("token")

    const modal = document.querySelector(".modal")

    if (modal) {
        modal.classList.remove("modal")
    }

    const user = await fetch(`${endpointURL}/product/${productId}`,{
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        })
    })

    const productJson = await user.json()
    console.log(productJson)

    const id = document.querySelector("#productId")
    const name = document.querySelector("#nameProduct")
    const price = document.querySelector("#priceProduct")

    id.value = productJson.data.id
    name.value = productJson.data.name
    price.value = productJson.data.price

}

const addProduct = document.querySelector(".btn")

addProduct.addEventListener("click", async (e) =>{
    e.preventDefault()

    const id = document.querySelector("#productId").value
    const name = document.querySelector("#nameProduct").value
    const price = document.querySelector("#priceProduct").value
    
    const productInfo = {
        id,
        name,
        price,
      }

        console.log(productInfo)
      if (!id) {
        
        await  createProduct({
            name,
            price,
        })
      

      } else {
        console.log(id)
        const token = localStorage.getItem("token")
        const result = await fetch(`${endpointURL}/product/${id}`,{
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify({
                name,
                price,             
            })
        })
  
        const resultJson = await result.json()
    
        console.log(resultJson)
    }      
})

renderAllProducts()

