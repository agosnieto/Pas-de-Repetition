const comprar = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carroCompra = document.getElementById('carrito');

cargarEventosCompra();

function cargarEventosCompra(){
        document.addEventListener('DOMContentLoaded', comprar.leerLocalStorageCompra());
        carroCompra.addEventListener('click', (p)=>{comprar.deleteProducto(p)});
        comprar.calcularTotal();
}