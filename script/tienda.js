
let favs = JSON.parse(localStorage.getItem('favs')) || []
let cart = JSON.parse(localStorage.getItem('cart')) || []



// funcion para generar autameticamente los html de los productos
function print_cards(product){
    itemscontainer.innerHTML += `

       <div class="card-item" id="shirt-1">
       <!-- foto -->
       <div class="img-product-container">
           <img src="${product.img}" alt="Imagen de una camiseta de littletwinstars" class="img-product">

       </div>

       <!-- nombre -->
       <div class="name-product-container">
           <p class="p-product" id="shirt-value">${product.name}</p>
       </div>

       <!-- precio y opciones -->

       <div class="price-options">
           <!-- precio -->
           <div class="price-container">${product.price}$</div>

           <!-- opciones -->
           <div class="options-container">

               <div class="dropdown">
                   <button class="btn btn-secondary dropdown-toggle btn-options" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                   OPCIONES
                   </button>
                   <ul class="dropdown-menu drop-style">
                   <li><a class="dropdown-item" href="#" id="${product.name}" onclick="favorites('${product.name}')">FAVORITOS</a></li>
                    <li><a class="dropdown-item" href="#" id="buy-${product.name}" onclick="buy('${product.name}')">COMPRAR</a></li>
                   </ul>
               </div>
           </div>
       </div>


       `
}

// trayendo la id de mi container
const itemscontainer = document.getElementById("items-container")

// declarando mi variable de url de mi json
const products_url = "/products.json"

// haciendo fetch a mi json de manera local para mostrar las cards con los datos
fetch(products_url)
.then(response => response.json())
.then(data => {

    // se coloca este inner para evitar un duplicado de los artculos
    itemscontainer.innerHTML = ``

    data.forEach(product => {
        print_cards(product)
})

})

.catch(error => console.log("Error en la carga de datos"))


// funcion para agregar a favoritos que recibe la id como parametro
function favorites(newId){
    
    // comprobando si ese fav ya esta en la lista, para evitar que se repita
       if (favs.includes(newId)){

           // usando toastify para notificar
           Toastify({
               text: "Ya esta en la lista",
               duration: 3000,
               destination: "https://github.com/apvarun/toastify-js",
               newWindow: true,
               close: true,
               gravity: "bottom", // `top` or `bottom`
               position: "right", // `left`, `center` or `right`
               stopOnFocus: true, // Prevents dismissing of toast on hover
               style: {
               background: localStorage.getItem('tema')
               },
               onClick: function(){} // Callback after click
           }).showToast();

       }else{

           // guardando el favorito en el localstorage
           favs.push(newId)

           localStorage.setItem('favs',JSON.stringify(favs))
           
           // toastify
           Toastify({
               text: "Se agrego a la lista",
               duration: 3000,
               destination: "https://github.com/apvarun/toastify-js",
               newWindow: true,
               close: true,
               gravity: "bottom", // `top` or `bottom`
               position: "right", // `left`, `center` or `right`
               stopOnFocus: true, // Prevents dismissing of toast on hover
               style: {
               background: localStorage.getItem('tema')
               },
               onClick: function(){} // Callback after click
           }).showToast();

       }

}

// funcion para comprar que recibe la id del producto como parametro
function buy(newId){
    
    console.log("comprar")

    // agregando al carrito
    cart.push(newId)
    cart_storage = localStorage.setItem('cart',JSON.stringify(cart))
    
    // notificando con toastify
    Toastify({
        text: `Se agrego ${newId}, al carrito`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: localStorage.getItem('tema')
        },
        onClick: function(){} // Callback after click
    }).showToast();

}

// seleccionamos todos los checkbox para hacer un filtro
const check = document.querySelectorAll('.checkbox')

// se recorren todos los checkbox con un foreach
check.forEach((check)=>{

    // se usa el evento change para verificar un cambio del estado del checkbox
    check.addEventListener('change',()=>{

        // utilizamos el atributo data filter de nuestros checkbox para obtener el producto que se quiere filtrar
        const filter_product = check.getAttribute('data-filter')
        console.log(filter_product)

        // hacieno fetch de el json local y guardandolo en data
        fetch(products_url)
        .then(response => response.json())
        .then(data => {
            
            itemscontainer.innerHTML = ``

            // constante que almacena el array del metodo filter aplicado sobre data
            const product_filter = data.filter((product =>{

                // checkeado si el checkbox esta activo o no
                if(check.checked){

                    // haciendo un switch para cada caso del filtro
                    
                    switch(filter_product){

                        case "shirt":
                            return product.type === "shirt"

                        case "pants":
                            return product.type === "pants"

                        case "dress":
                            return product.type === "dress"

                        case "20":
                            return product.price <= filter_product && product.price >= filter_product / 2

                        case "40":
                            return product.price <= filter_product && product.price >= filter_product / 2

                        case "90":
                            return product.price <= filter_product && product.price >= filter_product / 2

                        case filter_product:
                            return product.name.includes(filter_product)

                        default:
                            break;
                    }
                }else{
                    // en caso de que este apagado el checkbox, muestra toda la data del json
                    return data
                }
        }))

        // hacieno un foreach para recorrer sobre cada producto filtrado y mostrandolo con la funcion print cards
        product_filter.forEach((product) =>{
            print_cards(product)
        })

    })
    .catch(error => console.log("Error"))

})
})

