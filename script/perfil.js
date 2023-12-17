// agregando el header

const header = document.getElementById("header")

// botones
const btnhello = document.getElementById("btn-hello")
const btnmelody = document.getElementById("btn-melody")
const btncinna = document.getElementById("btn-cinnamoroll")
const btnkero = document.getElementById("btn-keroppi")
const btnpompom = document.getElementById("btn-pompompurin")
const btnpochacco = document.getElementById("btn-pochacco")
const btnlittle = document.getElementById("btn-little")

// variable global del color del header
let colorbg = header.style.backgroundColor.valueOf()

// estilos de mis botones
const style_hello = getComputedStyle(btnhello)
const style_melody = getComputedStyle(btnmelody)
const style_cinna = getComputedStyle(btncinna)
const style_keroppi = getComputedStyle(btnkero)
const style_pompom = getComputedStyle(btnpompom)
const style_pochacco = getComputedStyle(btnpochacco)
const style_little = getComputedStyle(btnlittle)

// variables con mis colores del boton
const hello_kitty = style_hello.color
const melody = style_melody.color
const cinna = style_cinna.color
const kero = style_keroppi.color
const pompom = style_pompom.color
const pochacco = style_pochacco.color
const little = style_little.color


// eventos para elegir los personajes

btnhello.addEventListener("click", function(){

    
    change_color(hello_kitty)
    
})

btnmelody.addEventListener("click", function(){

    change_color(melody)
})

btncinna.addEventListener("click", ()=> {

    change_color(cinna)
})

btnkero.addEventListener("click", ()=>{

    change_color(kero)
})

btnpompom.addEventListener("click", ()=>{

    change_color(pompom)
})

btnpochacco.addEventListener("click", ()=>{

    change_color(pochacco)
})

btnlittle.addEventListener("click", ()=>{

    change_color(little)
})

// funcion que recibe color como parametro

function change_color(color){

    if (header.style.backgroundColor.valueOf() === color){

        const blanco = header.style.backgroundColor = "white"
        localStorage.setItem("tema", blanco)
        

    }else{
        header.style.backgroundColor = color
        localStorage.setItem("tema", color)


        // usando toastify para notificar
        Toastify({
            text: "Se cambio el tema",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: color
            },
            onClick: function(){} // Callback after click
          }).showToast();

    }

}

// eliminando un favorito

function deleteitem(id){

    // borrando el elemento de el localstorage
    const favs_obj = JSON.parse(localStorage.getItem('favs'))
    console.log(favs_obj)
    const index = favs_obj.indexOf(id)
    favs_obj.splice(index, 1)
    localStorage.setItem('favs',JSON.stringify(favs_obj))

    // notificando con toastify
    Toastify({
        text: "Se elimino de favoritos",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: colorbg
        },
        onClick: function(){} // Callback after click
      }).showToast();

    update_favs()

 }

function update_favs(){

// constantes de mi id del dom y la lista del localstorage
// fundamental que esten dentro para que se actualice cada vez que elimino algo de favoritos
const favcontainer = document.getElementById("favs-container")
const favs_list = JSON.parse(localStorage.getItem('favs'))

    favcontainer.innerHTML = ``

// encontrando el producto en la lista
const products_url = "/products.json"

fetch(products_url)
.then(response => response.json())
.then(data => {

    favs_list.forEach(fav => {

        // despues de recorrer el favlist, se encuentra el producto en la json y se compara ocn la lista de favoritos
        const producto_card = data.find(producto => producto.name === fav)
        

        if (producto_card){
    
            favcontainer.innerHTML += `
        
                <div class="card-item" id="shirt-1">
                <!-- foto -->
                <div class="img-product-container">
                    <img src="${producto_card.img}" alt="Imagen de una camiseta de littletwinstars" class="img-product">
    
                </div>
    
                <!-- nombre -->
                <div class="name-product-container">
                    <p class="p-product" id="shirt-value">${producto_card.name}</p>
                </div>
    
                <!-- precio y opciones -->
    
                <div class="price-options">
                    <!-- precio -->
                    <div class="price-container">${producto_card.price}$</div>
    
                    <!-- opciones -->
                    <div class="options-container">
    
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle btn-options" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            OPCIONES
                            </button>
                            <ul class="dropdown-menu drop-style">
                            <li><a class="dropdown-item" href="#" onclick="deleteitem('${producto_card.name}')" id="${producto_card.name}">ELIMINAR</a></li>
                            <li><a class="dropdown-item" href="#" onclick="buy('${producto_card.name}')" id="buy-${producto_card.name}">COMPRAR</a></li>

                            </ul>
                            
                        </div>
                    </div>
                </div>
        
        ` }

        })
    })
}

let cart = JSON.parse(localStorage.getItem('cart')) || []


function buy(newId){

    event.preventDefault()

    // agregando al carrito
    cart.push(newId)
    cart_storage = localStorage.setItem('cart',JSON.stringify(cart))
    
    // notificando con toastify
    Toastify({
        text: `Se agrego el item al carrito`,
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


update_favs()



    
    


