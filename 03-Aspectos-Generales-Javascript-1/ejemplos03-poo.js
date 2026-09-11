/*
-----------------------------------------------------------------------------------------------------------------------
PARTE 3: POO (PROGRAMACION ORIENTADA A OBJETOS)
-----------------------------------------------------------------------------------------------------------------------
*/

//Clases: Forma Tradicional

//-- Funcion Constructora
function CursoTradicional(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

//-- El uso de la funcion prototype: Convertir funciones en "clases", en realidad lo que hace es definir funciones dentro de otra, y de esa forma simula una clase
CursoTradicional.prototype.obtenerFicha = function() {
  return `Curso: ${this.nombre} --> Precio: ${this.precio}`;
}

//-- Instanciar: Crear objetos a partir de una clase
let curso1 = new CursoTradicional("Introduccion a Excel", 1500);
console.log(curso1.obtenerFicha());

//Clases: Forma Moderna (Actual) - ES6+

class CursoModerno {
  //-- ** Constructor de la clase (es quien instancia los objetos)
  constructor(nombre, precio, complejidad) {
     this.nombre = nombre;
     this.precio = precio;
     this.complejidad = complejidad;
  }
  //-- ** Metodos de la clase (funciones internas)
  obtenerFicha() {
    return `Curso: ${this.nombre} --> Precio: ${this.precio} y Complejidad es ${this.complejidad}`;
  }
}

//-- Instanciar: Crear objetos a partir de una clase
let curso2 = new CursoModerno("Programacion Web Front-End", 1600, 7);
console.log(curso2.obtenerFicha());



