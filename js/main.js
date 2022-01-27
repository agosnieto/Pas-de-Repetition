const productos=[
    {id: 0,
    name:"Kona",
    origin:"Hawai",
    taste:"Hierbas dulces y florales, con matices de frutos secos.",
    price:800,
    imagen:"https://cdn.shopify.com/s/files/1/0263/4471/8394/products/Kona_Extra_FancyVelvetBlueBagNewLabel_645f380b-577d-49be-9870-09531be8fd01_1024x1024.png?v=1615723150"},

{id: 1,
    name:"Blue Mountain",
    origin:"Jamaica",
    taste:"Hierbas dulces y florales, con matices de frutos secos.",
    price:800,
    imagen:"https://m.media-amazon.com/images/I/71gmxuqAwrL._SY879_.jpg"},
{   id: 2,
    name:"Kenia AA",
    origin:"Kenia",
    taste:"notas de fruta dulce, una acidez vitivinícola y un cuerpo almibarado.",
    price:650,
    imagen:"https://m.media-amazon.com/images/I/61q9p3J2i7L._SL1114_.jpg"
    },
{   id: 3,
    name:"Guisante de Tanzania",
    origin:"Tanzania",
    taste:"una acidez más brillante, cuerpo medio y notas de azúcar moreno y sutiles notas frutales",
    price:600,
    imagen:"https://cafemalist.com/wp-content/uploads/2020/03/Tanzanian-benas-228x300.png"
    },
{   id: 4,
    name:"Sumatra Asados Oscuros de Indonesia",
    origin:"Sumatra,Indonesia",
    taste:"menor acidez con un cuerpo dulce y suave",
    price:620,
    imagen:"https://cafemalist.com/wp-content/uploads/2020/03/Bolsas-de-caf%C3%A9-Sumatra.jpg"
    },
{   id: 5,
    name:"Sulawesi Toraja de Indonesia",
    origin:"Sulawesi, Indonesia",
    taste:"muy dulce y complejo, con baja acidez, cuerpo completo y algunas notas terrosas y herbales..",
    price:670,
    imagen:"https://www.lajoyadelcafe.com/wp-content/uploads/2018/05/caf%C3%A9-de-sulawesi8.jpg"
    },
{   id: 6,
    name:"Geisha Centroamericanos",
    origin:"América Central",
    taste:"cuerpo similar al té natural, sabores brillantes como cítricos, mango, durazno y jazmín",
    price:500,
    imagen:"https://rceni.com/wp-content/uploads/2018/05/image-2018-05-28-1-1.jpg"}
]

let carrito=[]
const divisa = '$'
const carritoDOM = document.getElementById('carrito');
const muestraDOM = document.getElementById('muestra');
const totalDOM = document.getElementById('total');
const botonVaciarDOM = document.getElementById('vaciar-carrito');
const myLocalStorage = window.localStorage;

function renderizarProductos() {
    for (const cafes of productos) {
        //Cuerpo principal
        let cards =  document.createElement('div')
        cards.classList.add('card','col-md-4')
        //Boton
        const button = document.createElement('button')
        button.classList.add('btn','btn-primary')
        button.textContent = "Agregar al Carrito"
        button.setAttribute('id', cafes.id);
        button.addEventListener('click', addCarrito);
        // Cards

        let cardsBody = document.createElement('div')
        cardsBody.classList.add('card-body')
        cardsBody.innerHTML = `
        <img src="${cafes.imagen}" class= "imgCarrito" alt="">
        <h4 class="card-title">Nombre:${cafes.name}<h4>
        <h6 class="card-title">Origen:${cafes.origin}<h6>
        <p class="card-text">Sabor:${cafes.taste}<p>
        <p class="card-text">Precio:${divisa}${cafes.price}<p>
        `
        cardsBody.appendChild(button);
        muestraDOM.appendChild(cardsBody);
    }
}

function addCarrito(e){
    carrito.push(e.target.getAttributte('id'));
    renderizarCarrito();
    saveLocalStorage();
}
function renderizarCarrito() {
    carritoDOM.textContent = '';
    console.log(carrito)
    const carritoNotDuplicate = [...new Set(carrito)]
    console.log(carritoNotDuplicate)
    carritoNotDuplicate.forEach((item)=>{
    const myItem = productos.filter((itemProductos)=>{
    return itemProductos.id == parseInt(item);
})
    const cantidadProductosItem = carrito.reduce((total, itemId)=>{
        return itemId == item ? total +=1 : total;
    });
    const nodoCarrito = document.createElement('li');
    nodoCarrito.classList.add('list-group-item')
    nodoCarrito.textContent = `${cantidadProductosItem} x ${myItem[0].name} - ${myItem[0].price}${divisa}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "X";
    deleteButton.dataset.item = item;
    deleteButton.addEventListener('click',deleteItemCarrito);

    
    nodoCarrito.appendChild(deleteButton);
    carritoDOM.appendChild(nodoCarrito);
});
    totalDOM.textContent = calcularTotal();
}

function deleteItemCarrito(e){
    const id = e.target.dataset.item;
    carrito = carrito.filter((idCarrito)=>{
        return idCarrito !== id;
    });
    renderizarCarrito();
    saveLocalStorage();
}

function saveLocalStorage() {
    myLocalStorage.setItem('carrito',JSON.stringify(carrito));
}

function loadLocalStorage(){
    if (myLocalStorage.getItem('carrito') !== null){
        carrito = JSON.parse(myLocalStorage.getItem('carrito'));
    }
}
function calcularTotal(){
    return carrito.reduce((total, item)=>{
    const myItem = productos.filter((itemProductos)=>{
        return itemProductos.id == parseInt(item);
    });
    return total + myItem[0].price;
    },0)
}

function vaciarCarrito(){
    carrito = [];
    renderizarCarrito();
}

botonVaciarDOM.addEventListener('click',vaciarCarrito);

loadLocalStorage();
renderizarProductos();
renderizarCarrito();

