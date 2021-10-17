let mi_billetera = 15000
let mis_compras = 0
let billetera
let compras

window.onload = function(){

    setUp()
    
}

/*****************FUNCIONES GENERALES**************** */
function setUp(){

    billetera = document.querySelector('#mi_billetera')
    billetera.innerHTML = mi_billetera

    compras = document.querySelector('#mis_compras')
    compras.innerHTML = mis_compras

    //crearMenu(JSON.parse(productos_json))
    crearMenu(productos)

    asignarComportamientoBotones()

}

function crearMenu(productos){

    //Capturo el espacio del menu a completar
    let menu = document.querySelector('#lista')

    //Capturo al elemento modelo
    let elemento_modelo = document.querySelector('.auxiliares').querySelector('.lista-item')

    for(producto of productos){

        let elemento_nuevo = elemento_modelo.cloneNode(true)

        elemento_nuevo.children[1].innerHTML = producto.descripcion
        elemento_nuevo.children[2].innerHTML = 0
        elemento_nuevo.children[3].innerHTML = producto.precio

        menu.insertBefore(elemento_nuevo, menu.querySelector('.footer-contenedor'))

    }

}

function asignarComportamientoBotones(){

    let cajas = document.querySelectorAll('.caja-botones')
    for(caja of cajas){
        let botones = caja.querySelectorAll('div')
        for(boton of botones){
            boton.onclick = function(event){

                let elemento_lista = event.target.parentElement.parentElement
                
                if(event.target.innerHTML =='+'){
                    //alert("Querés Comprar!")
                    comprarProducto(elemento_lista)
                }else{
                    //alert("Querés Vender!")
                    venderProducto(elemento_lista)
                }
                
            }
        }
    }
}

function comprarProducto(elemento_lista){

    let descripcion = elemento_lista.children[1].innerHTML
    let precio = parseInt(elemento_lista.children[3].innerHTML)
    let cantidad = parseInt(elemento_lista.children[2].innerHTML)

    if(precio <= mi_billetera){

        mi_billetera = mi_billetera - precio
        cantidad = cantidad + 1
        mis_compras = mis_compras + precio

        actualizarPantalla(elemento_lista, cantidad)
        agregarAlCarrito(descripcion)

    }else{
        alert("No tenés plata RATONE! Vendé algo!")
    }

}

function venderProducto(elemento_lista){

    let descripcion = elemento_lista.children[1].innerHTML
    let precio = parseInt(elemento_lista.children[3].innerHTML)
    let cantidad = parseInt(elemento_lista.children[2].innerHTML)

    if(cantidad > 0){

        mi_billetera = mi_billetera + precio
        cantidad = cantidad - 1
        mis_compras = mis_compras - precio

        actualizarPantalla(elemento_lista, cantidad)
        quitarDelCarrito(descripcion)

    }else{
        alert("No tenés este producto!")
    }

}

function agregarAlCarrito(descripcion){

    let carrito = document.querySelector('#carrito')
    let item_carrito = document.querySelector('.auxiliares').querySelector('.item')
    let item_nuevo = item_carrito.cloneNode(true)

    let ruta_imagen = 'img/' + obtenerNombreArchivo(descripcion)
    item_nuevo.children[0].setAttribute('src', ruta_imagen )
    item_nuevo.children[1].innerHTML = descripcion

    carrito.appendChild(item_nuevo)

}

function quitarDelCarrito(descripcion){
    let carrito = document.querySelector('#carrito')
    let tarjetas = carrito.querySelectorAll('.item')
    for(tarjeta of tarjetas){
        if(tarjeta.children[1].innerHTML == descripcion){
           tarjeta.remove()
           return 
        }
    }
}

function obtenerNombreArchivo(descripcion){

    for(producto of productos){
        if(producto.descripcion == descripcion){
            return producto.img
        }
    }

}

function actualizarPantalla(elemento_lista, cantidad){
    
    //Actualizo la lista actual
    elemento_lista.children[2].innerHTML = cantidad

    //Actualizo la billetera y compras
    billetera.innerHTML = mi_billetera
    compras.innerHTML = mis_compras
}