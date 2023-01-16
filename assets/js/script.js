// ENLASANDO HTML CON JS CON EL .CONTENT PODEMOS INGRESAR

const templateCard = document.getElementById("templateCard").content
const templateCarrito = document.getElementById("templateCarrito").content
const templateFooter = document.getElementById("templateFooter").content
const cards = document.getElementById("cards")
const items = document.getElementById("items")
const footer = document.getElementById("footer")
// PARA QUE SE CARGUE
const fragment = document.createDocumentFragment()

let carrito ={}

//A TRABAJAR EN EL DOM CON LA API
document.addEventListener("DOMContentLoaded", () => {
    llamandoApi()
});

cards.addEventListener("click", (evento)=>{
    agregarCarro(evento)
});

items.addEventListener("click", evento =>{
    btnAccion(evento)
});




const llamandoApi = async()=>{
    try {
        const respApi = await fetch("api.json")
        const data = await respApi.json()
        dibujandoCards(data)
    } catch (error) {
        console.log("error", error)
    }
}

const dibujandoCards = data=>{}
    console.log(data)
    data.forEach( producto => {console.log("producto")
        templateCard.querySelector("h5").textContent = producto.nombre;
        templateCard.querySelector("p").textContent = producto.precio;
        templateCard.querySelector("img").setAttribute("src", producto.imagen)
        templateCard.querySelector(".btn-dark").dataset.id = producto.id
        
        
        const clone = templateCard.cloneNode(true);
            fragment.appendChild(clone);
            
    });
    cards.appendChild(fragment)

}
//funcion para Agregar al CArro
const agregarCarro = (event) =>{
// console.log(event.target.classList.contains("btn-dark"))
if(event.target.classList.contains("btn-dark")){
    setCarro(event.target.parentElement)
console.log(event.target.parentElement)
}
event.stopPropagation()
}

//FUNCION MANIPULAR CARRO Y MOSTRAR EN UNA TABLA

const setCarro = objeto => {
    console.log("objeto")
const producto = {
    id: objeto.querySelector(".btn-dark").dataset.id,
    nombre: objeto.querySelector("h5").textContent,
    precio: objeto.querySelector("p").textContent,
    cantidad:1    
};
// console.log(producto)
//FORMA DE ACCEDER A UN OBJETO AGREGANDO AL CARRO
if(carrito.hasOwnProperty(producto.id)){
    producto.cantidad = carrito[producto.id].cantidad+1;
}

// AQUI VAMOS SOBREESCRIBIENDO EL CARRO Y SUBA LA CANTIDAD SIN DUPLICARLO EN LA LISTA
carrito[producto.id] = {...producto};
// console.log(producto);
sumarCarrito ();
};

const sumarCarrito = ()=> {
    console.log(Object.values(carrito))
    Object.values(carrito).forEach((producto) => {
        items.innerHTML = "";
        templateCarrito.querySelector("th").textContent = producto.id;
        templateCarrito.querySelectorAll("td")[0].textContent = producto.nombre;
        // templateCarrito.querySelector(".titulo").textContent = producto.nombre;
        templateCarrito.querySelector(".cantidad").textContent = producto.cantidad;
        templateCarrito.querySelector(".btn-info ").dataset.id = producto.id;
        templateCarrito.querySelector(".btn-danger ").dataset.id = producto.id;
        templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio;
    
        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
      });
      items.appendChild(fragment); 
      dibujarFooter();
    }
const dibujarFooter = () => {    
//         footer.innerHTML = "";
        if (Object.keys(carrito).length === 0) {
          footer.innerHTML = ` <th scope="row" colspan="5"><h3> Carrito vacío ! </h3> </th>`;
          return;
        }
        
        //Sumando las cantidades de los productos y sumar totales
        const nCantidad = Object.values(carrito).reduce((acu, {cantidad})=>
          acu + cantidad, 0
        );
        const nPrecio = Object.values(carrito).reduce((acu, { cantidad, precio }) => acu + cantidad * precio, 0
               
        );
             console.log(nCantidad)
            console.log(nPrecio)

        templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
        templateFooter.querySelector("span").textContent = nPrecio;
        // document.querySelector("#cantidad-productos").innerText = nCantidad;
        const clone = templateFooter.cloneNode(true);
        fragment.appendChild(clone);
        document.getElementById("footer").innerHTML = "";
        footer.appendChild(fragment);
         /* Boton Vaciar el carrito */
  
};

function vaciarCarro(){
  alert("vaciando carro.")
  items.innerHTML = "";
  footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío !</th>';

  carrito = [];
}

const btnAccion = (event) => {
    if (event.target.classList.contains("btn-info")) {
      const producto = carrito[event.target.dataset.id]
    //  producto.cantidad++;
        producto.cantidad = carrito[event.target.dataset.id].cantidad + 1
      carrito[event.target.dataset.id] = { ...producto };
      dibujarCarro();
    }
    if (event.target.classList.contains("btn-danger")) {
      const producto = carrito[event.target.dataset.id];
      producto.cantidad--;
      if (producto.cantidad === 0) delete carrito[event.target.dataset.id];
      dibujarCarrito();
    }
  
    event.stopPropagation();
}
