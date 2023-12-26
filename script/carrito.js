
// trayendo los productos del local storage
let customer_cart = JSON.parse(localStorage.getItem('cart') ) || []

// trayendo el item conainer
const cart_container = document.getElementById("cart-items")

// haciendo fetch a mi json local

// const products_url = "../products.json"

// variable para el precio total
let total = 0

// funcion para mostrar lo que se tiene en el carrito
function update_cart(){

    // haciendo fetch a el json local
    fetch(products_url)
    .then(response => response.json())
    .then(data =>{
        
        // que se vacie el html actual para proceder a mostrar la informacion que corresponde
        cart_container.innerHTML = ``

        // esto verifica si el largo del carrito es 0, muestra que esta vacio
        if (customer_cart.length === 0){

            cart_container.innerHTML = `
        
                <div class="price-total-container">
                    <h4 class="h4-cart">EL CARRITO ESTA VACIO</h4>
                </div>
        
                `

        }else{
            // de lo contrario se muestra toda la data

            // la variable global total, vuelve a ser 0 para evitar que cuando se vuelvan a cargar los datos
            // no se sumen las variables que quedaron anteriormente cuando se vuelva a llamar a al funcion
            total = 0

            // recorriendo el carrito del cliente
            customer_cart.forEach(productcart => {
                
                // esto trae la informacion de cada objeto del carrito
                const product_true = data.find(product => product.name === productcart)
                
                
                // si el producto existe, entonces se muestra
                if (product_true){

    
                    cart_container.innerHTML += `
        
                        <div class="cart-style">
                            <div class="img-cart-container">
                                <img src="${product_true.img}" alt="Articulo a la venta" class="img-cart">
                            </div>
        
                            <div class="low-cart-info">
                                <h3 class="h3-cart">${product_true.name}</h3>
                                <h4 class="h4-cart">${product_true.price}$</</h4>
                            </div>
        
                            <div class="btn-cart">
                                <button type="submit" class="btn-cart-style" id="${product_true.name}" onclick="cart_delete('${product_true.name}')">ELIMINAR</button>
                            </div>
                            
                        </div>
                
                        `   
                        // sumado el precio de cada articulo que es muestra
                        total += product_true.price
                    

                }
                
            })

            // esto muestra el valor del total de la compra que se muestra debajo del todo
            cart_container.innerHTML += `
        
                <div class="price-total-container">
                    <h4 class="h4-cart-price">PRECIO TOTAL: ${total}</h4>
                    <button type="submit" class="btn-cart-buy" id="btn-cart-buy" onclick="buyalert()">COMPRAR</button>
                </div>
        
                `
        }
    
        

        
    })
    .catch(error => console.log("Error en la carga de datos del carrito"))
    

}


// inicializando el carrito
update_cart()

// funcion para borrar un item, que recibe el nombre como parametro
function cart_delete(name){

    // trayendo la informacion con un fetch
    fetch(products_url)
    .then(response=> response.json())
    .then(data=>{

        // encontrando el producto 
        const find_remove = data.find(product => product.name === name)
        // restando del total, el precio del item borrado
        total = total - find_remove.price
        // encontrando el indice del item en el carrito
        const index = customer_cart.indexOf(name)
        // borrando el item   
        customer_cart.splice(index, 1)
        // guardando la informacione en el localstorage
        localStorage.setItem('cart',JSON.stringify(customer_cart))

        Toastify({
            text: "Item eliminado",
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

        // llamando de vuelta la funcion, para que muestre la informacion actualizada sin necesidad de recargar la pagina
        update_cart()

    })
    .catch(error=> console.log("Error al eliminar un item"))

    
    

}

// alerta de compra
function buyalert(){

    // implementando sweet alert 2
    Swal.fire({
    title: "Estas seguro que queres comprar?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Si",
    denyButtonText: `No`
    }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
        Swal.fire("Felicidades!, has comprado los aritculos con exito!", "", "success");
        // vaciando el carrito
        customer_cart = []
        // guardando el estado actual del carrito en el localstorage
        localStorage.setItem('cart',JSON.stringify(customer_cart))
        // llamando a al funcion para actualizar el estado del carrito
        update_cart()
    } else if (result.isDenied) {
        Swal.fire("Compra cancelada", "", "info");
    }
    });

}