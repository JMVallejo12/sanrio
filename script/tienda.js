let favs = JSON.parse(localStorage.getItem('favs')) || []

// trayendo la id de mi container

const itemscontainer = document.getElementById("items-container")

// creando la lista de objetos

const products = [

    {name:"LittleTwinStars Classic Logo T-Shirt", type: "shirt", price: "19$", img: "../assets/shirt-1.webp"},
    {name:"LittleTwinStars Sanrio Original Graphic Tee", type: "shirt", price: "22$", img: "../assets/shirt-2.jpg"},
    {name:"Hello Kitty Cowboy Hat Tee", type: "shirt", price: "15$", img: "../assets/shirt-3.webp"},
    {name:"Hello Kitty Wild West Tee", type: "shirt", price: "19.99$", img: "../assets/shirt-4.webp"},
    {name:"Hello Kitty x Dumbgood Butterfly Glitter Sweatpants", type: "pants", price: "90$", img:"../assets/pants-1.webp"},

]


// convertir el array de obj

const products_save = localStorage.setItem('productos',JSON.stringify(products))


// convirtiendo el array a una lista de objetos de vuelta para utilizarlo

const products_obj = JSON.parse(localStorage.getItem('productos'))

   products_obj.forEach(product => {
    
         // generando las cards usando la informacion del localstorage
        
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
        </div>


        `

   })

//    comenzando a guadar los articulos en favoritos




// seleccionando todos los elementos del dropdown


const dropitems = document.querySelectorAll('.dropdown-item')


dropitems.forEach((btn)=>{

    btn.addEventListener("click", function(event){

        event.preventDefault()

        const id = this.id

        // comprobando si ese fav ya esta en la lista, para evitar que se repita
        if (favs.includes(id)){

            // arreglar con un sweet alert
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
            console.log(favs)

            favs_storage = localStorage.setItem('favs',JSON.stringify(favs))
            
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

       

    })

})


// seleccionamos todos los checkbox para hacer un filtro

const check = document.querySelectorAll('.checkbox')

// se recorren todos los checkbox con un foreach

check.forEach((check)=>{

    // se usa el evento change para verificar un cambio del estado del checkbox
    check.addEventListener('change',()=>{

        // utilizamos el atributo data filter de nuestros checkbox para obtener el producto que se quiere filtrar
        const filter_product = check.getAttribute('data-filter')
        console.log(filter_product)

        // mostrando los articulos

        itemscontainer.innerHTML = ""

        products_filter = JSON.parse(localStorage.getItem('productos'))
        console.log(products_filter)
        
    })

})

       




