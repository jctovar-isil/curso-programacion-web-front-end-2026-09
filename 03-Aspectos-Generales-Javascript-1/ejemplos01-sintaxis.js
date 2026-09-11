/*
-----------------------------------------------------------------------------------------------------------------------
PARTE 1: ASPECTOS DE SINTAXIS Y FUNCIONES
-----------------------------------------------------------------------------------------------------------------------
*/

//Comentario de una sola linea
/*
ISIL - Sesion 3 - Javascript
Comentario de bloque
Autor: Juan Carlos Tovar
*/

//Imprimir en la consola (se imprime dentro al utilizar el Inspeccionar)

//-- Forma 1: Interna (desde la herramienta Inspeccionar)
console.log("Bienvenidos a la sesion 3 de Programacion Front End.");

//-- Forma 2: Alertas (popup)
alert("Bienvenidos a la sesion 3 de Programacion Front End.");

//Variables
const nombreInstituto = "ISIL";  //-- Constantes (no puede cambiar mas abajo)
let nombreCurso = "Programacion Web Front-End";  //-- Variable (puede cambiar)
nombreCurso = "Programacion Full-Stack";

//--- Todos los tipos de datos en JS
var texto1 = "Alumnos";   //-- Cadena (String)
var numero1 = 8;   //-- Numero
var esClaseActiva = true;  //-- Boolean (Verdadero o Falso)
var noTieneValor = null;   //-- NULL (sin valor)
var noDefinido;            //-- undefined (es diferente a NULL)
var idUnico = Symbol("id");  //-- Symbol valor unico

console.log(texto1);
console.log(numero1);
console.log(esClaseActiva);
console.log(noTieneValor);
console.log(noDefinido);
console.log(idUnico);

// Operadores Matematicos, Logicos y Relacionales
let sum1 = 10;
let sum2 = 20;
//-- Matematicos
let sumaTotal = sum1 + sum2;    //-- 30
console.log(sumaTotal);
sumaTotal += 10;                //-- 40
console.log(sumaTotal);
sumaTotal *= 4;                 //-- 160
console.log(sumaTotal);
sumaTotal /= 16;                //-- 10
console.log(sumaTotal);
//-- Logicos
let estaAprobado = true;
let estaCanceladoCurso = true;

//-- Si esta aprobado Y (&&) esta pagado el curso
if (estaAprobado && estaCanceladoCurso) {
  console.log("Emitir el Certificado del Curso...");
} else {
  console.log("El Certificado del Curso está en Proceso de Validacion...");
}

//Funciones

//-- Forma 1: Basica Estandar
function calcularNotaFinal(pc1, pc2, nfp) {
  let notaFinalCurso = (0.4 * (pc1 + pc2)/2) + (0.6 * nfp);
  return notaFinalCurso; //-- No es obligatorio, pero casi siempre esta
}

let notaAlumno1 = calcularNotaFinal(12, 8, 20);
console.log("La nota final del curso de Pepito es: " + notaAlumno1);

//-- Forma 2: Funcion resumida (corta)
const calcularNotaFinalAlternativa = (pc1, pc2, nfp) => (0.4 * (pc1 + pc2)/2) + (0.6 * nfp);
console.log("La nota final del curso de Pepito (alternativa) es: " + calcularNotaFinalAlternativa(12, 8, 20));
