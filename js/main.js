
class Carrito{
    constructor(img, title, price, id){
        this.img = img
        this.title = title
        this.price = price
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
            titulo: producto.querySelector('h2').textContent,
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
    }
    deleteProducto(p){
        p.preventDefault();
        let producto, productoId;
        if(p.target.classList.contains('eliminar-producto')) {
            p.target.parentElement.parentElement.remove();
            producto = p.target.parentElement.parentElement;
            productoId = producto.querySelector('button').getAttribute('data-id');
        }
    }
    emptyCarrito(p){
        p.preventDefault();
        while(listProductos.firstChild){
            listProductos.removeChild(listProductos.firstChild);
        }
        return false;
    }
}

let productoA = new Carrito ("https://estaticos.marie-claire.es/media/cache/350x_thumb/uploads/images/gallery/598d69595cafe8394de202fd/987.jpg","Las mil y una noches", "$780", 7)
let productoB = new Carrito ("https://images-na.ssl-images-amazon.com/images/I/61GueyP-2QL.jpg","Hola Mundo", "$680", 8)
let productoC = new Carrito ("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1984-1524221166.jpg?crop=1xw:1xh;center,top&resize=480:*","1984", "$569", 9)

const cardsProducto = [productoA,productoB,productoC]
let lista = document.getElementById('lista')
for(const i of cardsProducto){
    let articulo = document.createElement('div')
        articulo.innerHTML =  `
        <div class="container" id="lista-productos">
            <div class="row">
            <div class="col-md-4 p-3">
            <img src="${i.img}" alt="">
            <h2>${i.title}</h2>
            <p>${i.price}</p>
            <button class="agregarCarrito" data-id="${i.id}">Añadir al Carrito</button>
            </div>
            </div>
        </div>`

    lista.appendChild(articulo)
}