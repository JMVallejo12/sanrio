


// agregando el header

const header = document.getElementById("header")

// botones
const btnhello = document.getElementById("btn-hello")
const btnmelody = document.getElementById("btn-melody")
const btncinna = document.getElementById("btn-cinnamoroll")

// variable global del color del header
let colorbg = header.style.backgroundColor.valueOf()

// estilos de mis botones
const style_hello = getComputedStyle(btnhello)
const style_melody = getComputedStyle(btnmelody)
const style_cinna = getComputedStyle(btncinna)

// variables con mis colores
const hello_kitty = style_hello.color
const melody = style_melody.color
const cinna = style_cinna.color


// eventos para elegir los personajes

btnhello.addEventListener("click", function(){

    
    change_color(hello_kitty)
    
})

btnmelody.addEventListener("click", function(){

    change_color(melody)
})

btncinna.addEventListener("click", ()=>{

    change_color(cinna)
})





// funcion que recibe color como parametro

function change_color(color){

    if (header.style.backgroundColor.valueOf() === color){

        const blanco = header.style.backgroundColor = "white"
        localStorage.setItem("tema", blanco)
        

    }else{
        header.style.backgroundColor = color
        localStorage.setItem("tema", color)

    }
    
   

}