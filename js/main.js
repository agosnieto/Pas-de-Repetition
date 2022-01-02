class Carrito{
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












/*let buttonCard = document.querySelectorAll(".addToCart")
buttonCard.forEach(addButton => {
    addButton.addEventListener("click",haceClick)
});

const conteinerCol = document.querySelector(".conteinerCol")

function haceClick(event){
    const buttonComplete = event.target;
    const card = buttonComplete.closest(".card");
    const cardTitle = card.querySelector(".card-title").textContent;
    console.log(cardTitle)
    const cardPrice = card.querySelector(".card-price").textContent;
    console.log(cardPrice)
    const cardImg = card.querySelector(".card-img").src;
    console.log(cardImg)
    addShopping(cardTitle,cardPrice,cardImg)
}
function addShopping(cardTitle,cardPrice,cardImg){
    const shoppingCard = document.createElement('div');
    const visual =
    `<div class="row row-cols-1 row-cols-md-3 g-4 conteinerCol">
        <div class="col">
        <div class="card h-100">
            <img src= ${cardImg} class="card-img" width="40px" alt="...">
            <div class="card-body">
            <h5 class="card-title">${cardTitle}</h5>
            <p class="card-price">${cardPrice}</p>
            <a href="#" class="card-btn addToCart">Añadir al Carrito</a>
            </div>
        </div>
        </div>`
    shoppingCard.innerHTML = visual
    conteinerCol.appendChild(shoppingCard)
shoppinTotal();
}

function shoppinTotal(){
    let totla = 0;
    const cartTotal = document.querySelector('.cartTotal')
    const cards = document.querySelectorAll('.cards')
}*/