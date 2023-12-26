
// accediendo a el local storage

window.onload = function(){
    // verificando que tema tiene en el local storage
    tema = localStorage.getItem("tema")
    console.log(tema)
    header.style.backgroundColor = tema
}

// trayendo la barra de busqueda con el id
const search_bar = document.getElementById("busqueda")
// const products_url = "../products.json"
let show_product

// haciendo fetch al json local
fetch(products_url)
.then(response => response.json())
.then(data=>{
    // haciendo un evento keydown para que cuando aprete el enter se ejecute
    search_bar.addEventListener("keydown",(event)=>{
        if (event.key === "Enter"){
            // aca se guarda el valor de la busqueda del usuario
            const result = search_bar.value.toLowerCase()
            // se utiliza el metodo filter para filtrar todos los productos que incluyan lo que el usuario ingreso
            let show_product = data.filter(product=>product.name.toLowerCase().includes(result.toLowerCase()))
            // este foreach es para comprobar en la consola el funcionamiento de la funcion
            show_product.forEach((product=>{
            console.log(product)
                    
            }))
            // guarda todo lo encontrado en el localstorage para mostrarlo desde otro html
            show_product_str = JSON.stringify(show_product)
            localStorage.setItem('search', show_product_str)
            // redirecciona al html de resultados
            window.location.href = "../pages/result.html"
        }
    })
})
.catch(error => console.log("Error con la carga de data en filtro de busqueda"))


