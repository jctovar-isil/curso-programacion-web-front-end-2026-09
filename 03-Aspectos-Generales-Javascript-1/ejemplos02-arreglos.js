/*
-----------------------------------------------------------------------------------------------------------------------
PARTE 2: ARREGLOS BASICOS, ESTRUCTURADOS Y OPERACIONES
-----------------------------------------------------------------------------------------------------------------------
*/

//Arreglos (Arrays) - Basicos

let alumnos = [ "Xiomara Rosario", "Anthony Fredy", "Gael Gregorio", "Juan Angel", "Omar Joao", "Victor Bonifacio", "Zoila Lastenia" ];
console.log(alumnos);

alumnos.push("Juan Perez");   //-- Agrega al final del arreglo
console.log(alumnos);

let ultimoAlumnoIngresado = alumnos.pop();   //-- Obtiene el ultimo elemento del arreglo, PERO tambien lo elimina
console.log(ultimoAlumnoIngresado);
console.log(alumnos);

alumnos.unshift("Juan Perez");   //-- Agrega al inicio del arreglo
console.log(alumnos);

let primerAlumnoIngresado = alumnos.shift();   //-- Obtiene el primer elemento del arreglo, PERO tambien lo elimina
console.log(primerAlumnoIngresado);
console.log(alumnos);

alumnos.splice(2, 0, "Maria Lopez"); //-- Agrega a la alumna en la posicion 3 (indice 2, ya que los arreglos inician en indice 0), el segundo parametro se pone en 0 para no eliminar elementos
console.log(alumnos);


//Arreglos (Arrays) - Estructurados (JSON)

let cursos = [
  { "nombre": "Programacion Web Front-End", "precio": 1500, "complejidad": 7 },
  { "nombre": "Introduccion a Excel", "precio": 1500, "complejidad": 4 },
  { "nombre": "Programacion Back-End", "precio": 1800, "complejidad": 7 },
  { "nombre": "Ciencia de Datos y ML", "precio": 2500, "complejidad": 10 }
];
//console.log(cursos);

//-- Recorrido (Bucles) - Clasica
console.log("Bucle Clasico");
for (var i=0; i<cursos.length; i++) {
  curso = cursos[i];
  console.log(curso);
}

//-- Recorrido (Bucles) - ForEach
console.log("Bucle ForEach");
cursos.forEach(curso => console.log(curso)); //-- Todo el curso
cursos.forEach(curso => console.log(curso.nombre));  //-- El campo nombre

//-- Filtrado: Quiero los cursos menores de 1800 soles
let cursosEconomicos = cursos.filter(curso => curso.precio < 1800);
console.log("Lista de Cursos Economicos (menores de 1,800 Soles):");
console.log(cursosEconomicos);

//-- Busqueda: Quiero buscar el curso llamado "Ciencia de Datos y ML"
//-- OJO: Solo trae el primero que encuentra (si hay mas de 1 solo el 1ro)
let cursoCienciaDatosML = cursos.find(curso => curso.nombre == "Ciencia de Datos y ML");
console.log("Busqueda de Curso de Ciencia de Datos y ML");
console.log(cursoCienciaDatosML);

let cursoDe1500 = cursos.find(curso => curso.precio == 1500);
console.log("Busqueda de Curso de Precio: 1500");
console.log(cursoDe1500);

//-- Validar existencia de Curso Complejo (Booleano): Considerando 0-10 el rango de complejidad

//-- ** Existe un curso super complejo (o sea igual a 10 en Complejidad)
let existeCursoComplejo = cursos.some(curso => curso.complejidad == 10);
console.log(existeCursoComplejo);  //-- true

//-- ** Existe un curso super facil que sea menor a 3
let existeCursoBienSencillo = cursos.some(curso => curso.complejidad < 3);
console.log(existeCursoBienSencillo);  //-- false


