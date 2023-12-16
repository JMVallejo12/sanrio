
// trayendo los productos del local storage
const customer_cart = JSON.parse(localStorage.getItem('cart') )

// trayendo el item conainer
const cart_container = document.getElementById("cart-items")

// haciendo fetch a mi json local

const products_url = "/products.json"

function update_cart(){



    fetch(products_url)
    .then(response => response.json())
    .then(data =>{
    
        cart_container.innerHTML = ``
    
        customer_cart.forEach(productCart => {
            
    
            const product_true = data.find(product => product.name === productCart)
    
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
    
    
            }else{

                cart_container.innerHTML = `
        
                <div class="price-total-container">
                    <h4 class="h4-cart">El carrito esta vacio</h4>
                </div>
        
                `
            }


           
    
            
        })

        cart_container.innerHTML += `
        
                <div class="price-total-container">
                    <h4 class="h4-cart">precio total</h4>
                    <button type="submit" class="btn-cart-buy" id="btn-cart-buy">COMPRAR</button>
                </div>
        
                `

    
    })
    // .catch(error => console.log("Error con el carrito"))
    

}

update_cart()


function cart_delete(name){

    const index = customer_cart.indexOf(name)
    customer_cart.splice(index, 1)
    localStorage.setItem('cart',JSON.stringify(customer_cart))
    console.log(customer_cart)
    update_cart()
    

}