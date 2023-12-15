
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
           <div class="price-container">${product.price}$</div>

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

// funcion que recorre el dropdrown para obtener la id, y poder utilizarla para las diferentes funciones
function select_btns(){

    dropitems.forEach((btn)=>{

        btn.addEventListener("click", function(event){
    
            event.preventDefault()
    
            const id = this.id
            // reemplazamos el string que aparece con un buy adelante para poder buscarlo como clave en nuestro json
            const newId= id.replace("buy-","")
    
    
            // identificar si quiere comprar o agregar a favoritos
            const buybtn = id.startsWith('buy-')
            console.log(buybtn)
            let ifbuy = buybtn ? buy : favorites
            ifbuy(newId)


        })
    
    })

}
// se llama a la funcion para hacer funcionar los botones respectivamente
select_btns()





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


        fetch(products_url)
        .then(response => response.json())
        .then(data => {

            // esta linea usa un operador ternario para verificar si el checkbox esta marcado, si esta marcado
            // aplica los filtros, de lo contrario, muestra toda la data traida del json
            const products_filter = check.checked ? data.filter(product => product.type === filter_product) : data
            
            // en esta linea, a diferencia de la anterior, se tiene que filtrar dentro de un rango de precios
            // como los precios que se dividen, se filtra usando el valor maximo, y con un condicional para botener un minimo
            // desde un numero que no es cero, se divide el maximo obtenido a la mitad, para generar un numero minimo para filtrar
            const filter_price = check.checked ? data.filter(product => product.price <= filter_product && product.price >= filter_product / 2) : data
            

            console.log(products_filter)
            console.log(filter_price)
            console.log(filter_product)
            // para que se eliminen todos los articulos generados y se generen solamente los filtrados
            itemscontainer.innerHTML = ``

            

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
                                // Se utiliza la funcion onlick, para poder llamar a las funciones de buy y favorites respectivamente
                                // se hizo de esta manera, ya que daba error al tratar de agregar o comprar un item, luego de haberlo filtrado con los checkbox
                                </ul>   
                            </div>
                        </div>
                    </div>`

            }))

            filter_price.forEach((product =>{


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
                                // Se utiliza la funcion onlick, para poder llamar a las funciones de buy y favorites respectivamente
                                // se hizo de esta manera, ya que daba error al tratar de agregar o comprar un item, luego de haberlo filtrado con los checkbox
                                </ul>   
                            </div>
                        </div>
                    </div>`


            }))
        })
        .catch(error => console.log("Error"))
    })

})




       




