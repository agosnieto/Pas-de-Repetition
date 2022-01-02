const compra = new Carrito();
const carro = document.getElementById('carrito')
const productos = document.getElementById('lista-productos')
const listProductos = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.getElementById('vaciar-carrito')

cargaEventos();

function cargaEventos(){
    productos.addEventListener('click',(p)=>{compra.comprarProducto(p)})

    carro.addEventListener('click', (p)=>{compra.deleteProducto(p)})

    vaciarCarrito.addEventListener('click',(p)=>{compra.emptyCarrito(p)})


}
