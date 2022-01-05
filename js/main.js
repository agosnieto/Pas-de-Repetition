
class Carrito{
    constructor(img, title, precio, id){
        this.img = img
        this.title = title
        this.precio = precio
        this.id = id
    }

    comprarProducto(p) {
        p.preventDefault();
        if(p.target.classList.contains('agregarCarrito')){
            const producto = p.target.parentElement.parentElement;
            this.lecturaProductos(producto)
        }
    }
    lecturaProductos(producto){
        const infoProducto ={
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('p').textContent,
            id: producto.querySelector('button').getAttribute('data-id'),
            cantidad: 1,
        }
        this.putOnCarrito(infoProducto)
    }
    putOnCarrito(producto){
        const table = document.createElement('tr');
        table.innerHTML = `
            <td>
                <img src= "${producto.imagen}" widht = 30px>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <button class= "eliminar-producto deleteElement" data-id="${producto.id}"></button>
            </td>
        `;
        listProductos.appendChild(table)
        this.guardarProductosLocalStorage(producto);
    }
    deleteProducto(p){
        p.preventDefault();
        let producto, productoId;
        if(p.target.classList.contains('eliminar-producto')) {
            p.target.parentElement.parentElement.remove();
            producto = p.target.parentElement.parentElement;
            productoId = producto.querySelector('button').getAttribute('data-id');
        }
        this.deleteProductoLS(productoId)
    }
    emptyCarrito(p){
        p.preventDefault();
        while(listProductos.firstChild){
            listProductos.removeChild(listProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }
    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLS();
        productos.push(producto)
        localStorage.setItem('productos', JSON.stringify(productos))
    }
    obtenerProductosLS(){
        let productosLS;
        if(localStorage.getItem('productos')== null) {
            productosLS = [];

        }
        else{
            productosLS = JSON.parse(localStorage.getItem('productos'))
        }
        return productosLS
    }
    deleteProductoLS(productoId){
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function(productoLS,index){
            if (productoLS.id === productoId){
                productosLS.splice(index,1);
            }
        });
        localStorage.setItem('productos',JSON.stringify(productosLS));
    }
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function(producto){
            const table = document.createElement('tr');
            table.innerHTML = `
                <td>
                    <img src= "${producto.imagen}" widht = 30px>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <button class= "eliminar-producto deleteElement" data-id="${producto.id}"></button>
                </td>
            `;
                listProductos.appendChild(table)
        });
    }
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function(producto){
            const table = document.createElement('tr');
            table.innerHTML = `
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                <input type="number" class="form-control" min="1" value="${producto.cantidad}">
                </td>
                <td>${producto.precio * producto.cantidad}</td>
                <td>
                    <button class= "eliminar-producto deleteElement" data-id="${producto.id}"></button>
                </td>
            `;
                listaCompra.appendChild(table)
        });
    }
    vaciarLocalStorage(){
        localStorage.clear();
    }
    procesarPedidos(p){
        p.preventDefault();
        if (this.obtenerProductosLS().length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'El carrito está vacio, agrege algún producto para continuar',
                icon: 'error',
                timer : 2000,
                showConfirmButton : false
            })
        }
        else{
            location.href ="compra.html";
        }
    }
    calcularTotal(){
        let productoLS;
        let total = 0;
        productoLS = this.obtenerProductosLS();
        for (let i = 0; i < productoLS.length; i++) {
            let element = Number.isNaN(productoLS[i].precio*productoLS[i].cantidad)
            total = total + element;
        }
        document.getElementById('total').innerHTML = "$" + total.toFixed(2)
    }
}

let productoA = new Carrito ("https://estaticos.marie-claire.es/media/cache/350x_thumb/uploads/images/gallery/598d69595cafe8394de202fd/987.jpg","Las mil y una noches", "$780", 1)
let productoB = new Carrito ("https://images-na.ssl-images-amazon.com/images/I/61GueyP-2QL.jpg","Hola Mundo", "$680", 2)
let productoC = new Carrito ("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1984-1524221166.jpg?crop=1xw:1xh;center,top&resize=480:*","1984", "$569", 3)
let productoD = new Carrito ("imagenes/planta.jpg", "Mi planta","$546",4)
let productoE = new Carrito ("imagenes/101 dalmatas.jpg", "101 Dalmatas", "$560",5)
let productoF = new Carrito ("imagenes/4 en 1.png"," Metafisica 4 en 1","$1300",6)
let productoG = new Carrito("imagenes/canela.jpg","El rastro de la Canela", "$700",7)
let productoH = new Carrito("imagenes/harry potter.jpg","Harry Potter", "$1250",8)

const cardsProducto = [productoA,productoB,productoC, productoD,productoE,productoF, productoG, productoH]
let lista = document.getElementById('lista')
for(const i of cardsProducto){
    let articulo = document.createElement('div')
        articulo.innerHTML =  `
                <div class="row">
                <div class="col-md-4 p-3">
                <img src="${i.img}" widht="20px" alt="">
                <h4>${i.title}</h4>
                <p>${i.precio}</p>
                <button class="agregarCarrito" data-id="${i.id}">Añadir al Carrito</button>
                </div>
                </div>
                `;

    lista.appendChild(articulo)
}