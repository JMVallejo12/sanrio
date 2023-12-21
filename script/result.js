
// convirtiendo el localstorage de la busqueda
show_product = JSON.parse(localStorage.getItem('search'))
console.log(show_product)

// mostrando los resultados de la busqueda

const results = document.getElementById("results")

// funcion que busca los resultados
function search_result(){

    // verifica si el largo del arreglo es cero para saber si se encontraron resulados o no
    if (show_product.length === 0){

        results.innerHTML = `
            <h1 class="h1-result">NO SE ENCONTRARON RESULTADOS CON SU BUSQUEDA</h1>

        `        

    }else{
        // se hace un bucle con for y se muestran todos los productos encontrados
        show_product.forEach(product => {
            results.innerHTML += `
    
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
                        <li><a class="dropdown-item" href="#" onclick="buy('${product.name}')" id="buy-${product.name}">COMPRAR</a></li>
    
                        </ul>
                        
                    </div>
                </div>
            </div>
    
            `
    
            
        });
    }

    
}

// funcion de comprar que recibe id como parametro
function buy(newId){

    event.preventDefault()

    let cart = JSON.parse(localStorage.getItem('cart'))
    
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

search_result()