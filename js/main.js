class Producto{
    constructor(img,id,title,price,category){
        this.img = img
        this.id = id
        this.title = title
        this.price = price
        this.category = category
    }
}

let producto1 = new Producto('img',0,"Oslo",450,"novela")
let producto2 = new Producto('img',1,"Harry Potter",1450,"coleccion")
let producto3 = new Producto('img',2,"Bambi",600,"novela")
let producto4 = new Producto('img',3,"Viaje a las EStrellas",850,"ciencia ficcion")
let producto5 = new Producto('img',4,"Padre Rico, Padre Pobre",700,"emprendedores")
let producto6 = new Producto('img',5,"ww",450,"fantasia")

const productos =[producto1,producto2,producto3,producto4,producto5,producto6]


let categoriaProducto = prompt("Ingrese la categoria de libro a buscar:");
const libroCategoria = productos.filter(producto => producto.category == categoriaProducto.toLowerCase());

function mostrarProductos(libroCategoria) {
    libroCategoria.forEach(i => {
        alert(`Título: ${i.title} Precio: ${i.price} ID:${i.id}`)
    });

}

mostrarProductos(libroCategoria);

let monto = 0
let idLibro = parseInt(prompt("Ingrese ID del libro a comprar"))

function seleccionLibro() {{
        if (libroCategoria.find(function (idLibro) {
            return true})) {
                alert("Libro Agregado")

        } else {
            alert("ID no encontrado")
        }
    }
}

let resultado = seleccionLibro()
