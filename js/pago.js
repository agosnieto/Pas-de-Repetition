const tableProductosDOM = document.querySelector('.row')



function payTable () {
    productos.forEach((x)=>{
        const productosFilas = document.createElement('td')
        tableProductosDOM.appendChild(productosFilas)
    })

  
}