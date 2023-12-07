// trayendo la id de mi container

const itemscontainer = document.getElementById("items-container")

// creando la lista de objetos

const products = [

    {name:"LittleTwinStars Classic Logo T-Shirt", type: "shirt", price: "19$", img: "../assets/shirt-1.webp"},
    {name:"LittleTwinStars Sanrio Original Graphic Tee", type: "shirt", price: "22$", img: "../assets/shirt-2.jpg"},
    {name:"Hello Kitty Cowboy Hat Tee", type: "shirt", price: "15$", img: "../assets/shirt-3.webp"},
    {name:"Hello Kitty Wild West Tee", type: "shirt", price: "19.99$", img: "../assets/shirt-4.webp"},

]

// haciendo un for para guardar todos los productos
products.forEach((product)=>{

    product_str = JSON.stringify(product)
    localStorage.setItem(product.name,product_str)

})

Object.keys(localStorage).forEach((product) =>{

    const obj = JSON.parse(localStorage.getItem(product))


        // generando las cards usando la informacion del localstorage

        itemscontainer.innerHTML += `

        <div class="card-item" id="shirt-1">
        <!-- foto -->
        <div class="img-product-container">
            <img src="${obj.img}" alt="Imagen de una camiseta de littletwinstars" class="img-product">

        </div>

        <!-- nombre -->
        <div class="name-product-container">
            <p class="p-product" id="shirt-value">${obj.name}</p>
        </div>

        <!-- precio y opciones -->

        <div class="price-options">
            <!-- precio -->
            <div class="price-container">${obj.price}</div>

            <!-- opciones -->
            <div class="options-container">

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle btn-options" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    OPCIONES
                    </button>
                    <ul class="dropdown-menu drop-style">
                    <li><a class="dropdown-item" href="#">COMPRAR</a></li>
                    <li><a class="dropdown-item" href="#" id="fav-shirt-1">FAVORITOS</a></li>
                    </ul>
                </div>
            </div>
        </div>


        `

})


