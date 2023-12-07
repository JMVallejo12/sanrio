


// agregando el header

const header = document.getElementById("header")

// boton de hello kitty
const btnhello = document.getElementById("btn-hello")

// variable global del color del header
let colorbg = header.style.backgroundColor.valueOf()

// variables con mis colores
const hello_kitty = "rgb(195, 1, 1)"

btnhello.addEventListener("click", function(){

    
    change_color(hello_kitty)
    
})


function change_color(color){

    if (header.style.backgroundColor.valueOf() === color){

        const blanco = header.style.backgroundColor = "white"
        localStorage.setItem("tema", blanco)

    }else{
        header.style.backgroundColor = color
        localStorage.setItem("tema", color)


    }
    
   

}