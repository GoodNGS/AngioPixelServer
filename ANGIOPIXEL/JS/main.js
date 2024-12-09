// rest.get(url, callback)
// rest.post(url, body, callback)
// rest.put(url, body, callback)
// rest.delete(url, callback)
// function callback(estado, respuesta) {...}

const res = require("express/lib/response");

/* Funcion acceder: Actua cuando se pulsa el botón Entrar de "access". Envía los datos del usuario y contraseña al
servidor para confirmar los datos. Pasa de la ventana "access" a "start", da un mensaje de bienvenida con el
nombre del medico, guarda la id del medico, dibuja la tabla con los expedientes correspondientes con el medico.
Requiere: null. Devuelve: "null".
*/
function acceder(){
  var user = document.getElementById("user").value;
  var password = document.getElementById("pass1").value;
  var log = {usuario: user, clave: password};
  var id_user;
  console.log("llego a enviar");
  rest.post("/user/login",log,function(estado,resp){
    if (estado == 403){
      alert(resp);
      return;
    }
    id_user=resp;
    mover('sesion.html');
  })
}

function mover(direccion){
  location.href = direccion;
}
/* Funcion guardar_reg: Actua cuando se pulsa el botón Guardar de "medical_data". Envía los datos del registro del
 medico al servidor para que se guarden. Pasa de la ventana "medical_data" a "access", autocompleta el nombre de
 usuario y contraseña que se hubiera colocado en "medical_data". Requiere: null. Devuelve: "null"
*/
function guardar_reg(){
  var usuario = document.getElementById("user");
  var contra = document.getElementById("pass1");
  var name = document.getElementById("name1").value;
  var lastn = document.getElementById("lastname1").value;
  var user = document.getElementById("login").value;
  var pass = document.getElementById("pass2").value;
  var cent = document.getElementById("center").value;

  var usuario = {nombre: name, apellidos: lastn, login:user, password: pass, centro: cent};
  //Se envía los datos

  rest.post("/user/register",usuario,function(estado,mensaje){
    if (estado != 201){
      alert(mensaje);
      return;
    }
    else{
      alert(mensaje);
      mover("index.html");
    }
  })
}

async function aplicar(){
  var filtro1 = document.getElementById("filtro1").value;
  var filtro2 = document.getElementById("filtro2").value;
  var filtro3 = document.getElementById("filtro3").value;
  var modeloCNN = document.getElementById("CNN1");
 //FALTA IMPLEMENTAR
}

function filtrar(){
  mover("filtros.html");
  CNN();
}

function CNN(){
  // Cambia esto a la ruta real de tu imagen
  const imagePath = "/workspaces/AngioPixelServer/ANGIOPIXEL/Local/p1_v1_00003.png";
  console.log("hola")
  // Llama al servidor para ejecutar el script Python
  fetch('http://localhost:3000/run-python', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imagePath: imagePath }),
   })
  .then((response) => response.json())
  .then((data) => {
       if (data.error) {
          console.error("Error:", data.error);
      } else {
          console.log("Resultado:", data.output);
      }
  })
  .catch((error) => {
      console.error("Error en la solicitud:", error);
  });
}
