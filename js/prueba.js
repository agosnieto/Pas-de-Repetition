/*let palabra = "impar"
let numero=parseInt(prompt("ingrese un numero"));

function loopDeImpares (numero,palabra){
  for (let i = 0; i <= 100; i++){
    let suma= i+numero
     if (suma % 2 !==0) {
        console.log(palabra)
     }
      else{
        console.log(suma)
      }
    }
}
loopDeImpares(numero,palabra);*/

let contarde_an = parseInt(prompt('Ingrese un número: '))
let contar_hasta = parseInt(prompt('Ingrese un número: '))

function  contarA_n(contarde_an, contar_hasta){
  for (let i = 1; i <= contar_hasta; i+contarde_an) {
  
    console.log(i)
    
  }
}

contarA_n(contarde_an,contar_hasta);


