
let favs = JSON.parse(localStorage.getItem('favs')) || []
let cart = JSON.parse(localStorage.getItem('cart')) || []




// trayendo la id de mi container

const itemscontainer = document.getElementById("items-container")


// declarando mi variable de url de mi json
const products_url = "/products.json"

// haciendo fetch a mi json de manera local para mostrar las cards con los datos
fetch(products_url)
.then(response => response.json())
.then(data => {

    data.forEach(product => {
    
       
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
           <div class="price-container">${product.price}</div>

           <!-- opciones -->
           <div class="options-container">

               <div class="dropdown">
                   <button class="btn btn-secondary dropdown-toggle btn-options" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                   OPCIONES
                   </button>
                   <ul class="dropdown-menu drop-style">
                   <li><a class="dropdown-item" href="#" id="${product.name}">FAVORITOS</a></li>
                   <li><a class="dropdown-item" href="#" id="buy-${product.name}">COMPRAR</a></li>
                   </ul>
               </div>
           </div>
       </div>


       `
// Agregando a favoritos

// seleccionando todos los elementos del dropdown

const dropitems = document.querySelectorAll('.dropdown-item')

dropitems.forEach((btn)=>{

    btn.addEventListener("click", function(event){

        event.preventDefault()

        const id = this.id
        // reemplazamos el string que aparece con un buy adelante para poder buscarlo como clave en nuestro json
        const newId= id.replace("buy-","")


        // identificar si quiere comprar o agregar a favoritos
        const buybtn = id.startsWith('buy-')
        console.log(buybtn)
        const ifbuy = buybtn ? buy : favorites
        ifbuy()

        // const comprar = id.startsWith('.buy') ? buy : favorites

        function favorites(){

             // comprobando si ese fav ya esta en la lista, para evitar que se repita
                if (favs.includes(id)){

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
                    favs.push(id)

                    favs_storage = localStorage.setItem('favs',JSON.stringify(favs))
                    
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

        function buy(){

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

    })

})

})

})
.catch(error => console.log("Error en la carga de datos"))

// seleccionamos todos los checkbox para hacer un filtro
const check = document.querySelectorAll('.checkbox')

// se recorren todos los checkbox con un foreach
check.forEach((check)=>{

    // se usa el evento change para verificar un cambio del estado del checkbox
    check.addEventListener('change',()=>{

        // utilizamos el atributo data filter de nuestros checkbox para obtener el producto que se quiere filtrar
        const filter_product = check.getAttribute('data-filter')
        console.log(filter_product)


        fetch(products_url)
        .then(response => response.json())
        .then(data => {

            // esta linea usa un operador ternario para verificar si el checkbox esta marcado, si esta marcado
            // aplica los filtros, de lo contrario, muestra toda la data traida del json
            const products_filter = check.checked ? data.filter(product => product.type === filter_product) : data
            itemscontainer.innerHTML = ``

            console.log(products_filter)

            products_filter.forEach((product=>{


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
                        <div class="price-container">${product.price}</div>

                        <!-- opciones -->
                        <div class="options-container">

                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle btn-options" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                OPCIONES
                                </button>
                                <ul class="dropdown-menu drop-style">
                                <li><a class="dropdown-item" href="#" id="${product.name}">FAVORITOS</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>`


            }))


        })
        
    })

})

       




