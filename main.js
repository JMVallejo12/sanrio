// accediendo a el local storage

window.onload = function(){

    // verificando que tema tiene en el local storage
    tema = localStorage.getItem("tema")
    console.log(tema)
    header.style.backgroundColor = tema

    // 

    

}
