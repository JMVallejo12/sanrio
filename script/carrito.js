
// trayendo los productos del local storage
const customer_cart = JSON.parse(localStorage.getItem('cart') )

// trayendo el item conainer
const cart_container = document.getElementById("cart-items")

// haciendo fetch a mi json local

const products_url = "/products.json"

fetch(products_url)
.then(response => response.json())
.then(data =>{

    

    customer_cart.forEach(productCart => {
        

        const product_true = data.find(product => product.name === productCart)
        console.log(product_true)
        console.log(product_true.name)
        console.log(customer_cart)
        console.log(data)

        if (product_true){


            cart_container.innerHTML += `

        
                <div class="cart-style">
                    <img src="${product_true.img}" alt="Articulo a la venta">

                    <div class="low-cart-info">
                        <h3 class="h3-cart">${product_true.name}</h3>
                        <h4 class="h4-cart">${product_true.price}$</</h4>
                    </div>

                    <div class="btn-cart">
                        <button type="submit" class="btn-cart-style" id="${product_true.name}">ELIMINAR</button>
                    </div>
                    
                </div>
        
                `   


        }
       

        
    })

})
// .catch(error => console.log("Error con el carrito"))