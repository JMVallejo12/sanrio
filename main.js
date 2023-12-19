
// accediendo a el local storage

window.onload = function(){
    // verificando que tema tiene en el local storage
    tema = localStorage.getItem("tema")
    console.log(tema)
    header.style.backgroundColor = tema
}

// trayendo la barra de busqueda con el id
const search_bar = document.getElementById("busqueda")
const products_url_main = "products.json"
let show_product

fetch(products_url_main)
.then(response => response.json())
.then(data=>{
    search_bar.addEventListener("keydown",(event)=>{
        if (event.key === "Enter"){
            console.log("entro")
            const result = search_bar.value.toLowerCase()
            console.log(result)
            let show_product = data.filter(product=>product.name.toLowerCase().includes(result.toLowerCase()))
            show_product.forEach((product=>{
            console.log(product)
                    
            }))
            show_product_str = JSON.stringify(show_product)
            localStorage.setItem('search', show_product_str)
            window.location.href = "/pages/result.html"
        }
    })
})
.catch(error => console.log("Error con la carga de data en filtro de busqueda"))


