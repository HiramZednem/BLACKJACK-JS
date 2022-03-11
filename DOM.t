DOM es Documento Objetct Model:

Cuando se coloca document, puedes accede a propiedades del documento y modificarla, las principales para seleccionar un objeto son:

document.querySelector('header');
document.querySelector('.Clase');
document.querySelector('#Id');

Estos que se colocaron solo seleccionaran  el primero que encuentren,, tambien existe el
document.querySelectorAll('Header');

Que sirve para seleccionar todos los que tengan esa etiqueta o clase. (No se coloca ID , por que la id es unica)


Para escribir en pantalla hay dos, para insertarlo tipo HTML e insertarlo tipo texto:

document.querySelector('#GH').innerHTML = '<strong>Hola Mundo</strong>'

document.querySelector('#GH').innerText = 'Hola Mundo'

Uno sirve para instertarlo de manera HTML y la otra para insertarlo como texto normal.