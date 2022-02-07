
document.addEventListener('DOMContentLoaded',() =>{

    let misDatos =[]
    let carrito=[]
    const divisa = '$'
    const carritoDOM = document.getElementById('carrito');
    const muestraDOM = document.getElementById('muestra');
    const totalDOM = document.getElementById('total');
    const botonVaciarDOM = document.getElementById('vaciar-carrito');
    const botonPagarDOM = document.getElementById('pagar-carrito');
    const myLocalStorage = window.localStorage;

    const URLGET = './datos.json'
    $('body').prepend('<button id="cafes">Mostrar Productos</button>')
    $("#cafes").click(() => {
    $.get(URLGET, function (respuesta, estado) {
    if(estado === "success"){
    misDatos = respuesta;
    renderizarProductos();
    }
    });
    });
    function renderizarProductos() {
        misDatos.forEach((cafes)=>{
    let cards =  document.createElement('div')
    cards.classList.add('card','col-md-4')
    
    const button = document.createElement('button')
    button.classList.add('btn','btn-primary')
    button.textContent = "Agregar al Carrito"
    button.setAttribute('id', cafes.id);
    button.addEventListener('click', addCarrito);
    
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
    })}
    
    function addCarrito(e){
        carrito.push(e.target.getAttribute('id'))
        renderizarCarrito();
        saveLocalStorage();
    }
    function renderizarCarrito() {
        carritoDOM.textContent = '';
        console.log(carrito)
        const carritoNotDuplicate = [...new Set(carrito)]
        console.log(carritoNotDuplicate)
        carritoNotDuplicate.forEach((item)=>{
        const myItem = misDatos.filter((itemProductos)=>{
        return itemProductos.id == parseInt(item);
    })
        const cantidadProductosItem = carrito.reduce((total, itemId)=>{
            return itemId == item ? total +=1 : total;
        },0);
        const nodoCarrito = document.createElement('li');
        nodoCarrito.classList.add('list-group-item')
        nodoCarrito.textContent = `${cantidadProductosItem} x ${myItem[0].name} - ${divisa}${myItem[0].price}`;
    
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-danger','btn-circle')
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
        const myItem = baseDeDatos.filter((itemProductos)=>{
            return itemProductos.id == parseInt(item);
        });
        return total + myItem[0].price;
        },0)
    }
    
    function payCarrito(){
        if(myLocalStorage.getItem('carrito') == null){
            botonPagarDOM.addEventListener('click',Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'Debe añadir algún producto para poder proceguir con la compra!',
                footer: '<a href="">Why do I have this issue?</a>'
              }))
        }
    }
    
    function vaciarCarrito(){
        carrito = [];
        renderizarCarrito();
    }
    botonVaciarDOM.addEventListener('click',vaciarCarrito);
    
    loadLocalStorage();
    renderizarCarrito();
    payCarrito();
} )


