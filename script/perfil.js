


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

    }
    
   

}