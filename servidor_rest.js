var express = require("express");

var app = express();

app.use("/user", express.static("ANGIOPIXEL"));

app.use(express.json());
//app.use(fileUpload);
//app.use(cors);

var datos=require("./datos.js");
var usuarios=datos.usrs;

/*Obtiene el obj con el usuario y la contraseña, con un condicional comprueba que es igual a alguno que tenga en la
lista de médicos y devuelve el id si es el caso. De lo contrario devuelve el error 403.*/
app.post("/user/login",function(req, res){
    for (i=0;i<usuarios.length;i++){
        if (usuarios[i].login == req.body.usuario && usuarios[i].password == req.body.clave){
            res.status(200).json(usuarios[i].id);
            return;
        }
    }
    res.status(403).json("Usuario o contraseña incorrectos");
})

/* Obtiene el obj médico, junto con la lista de médicos se introduce en la función incluir() y esta devuelve un
código. Si es el usuario ya existe en la base de datos se devuelve un 200, de lo contrario un 201.*/
app.post("/user/register",function(req,res){
    var f = incluir(req.body,usuarios);
    if( f == 200){
        res.status(f).json("El usuario ya existe");
    }
    else if (f == 201){
        res.status(f).json("El usuario ha sido creado");
    }
})

app.post("/user/upload",function(req,res){
    res.status(200).json("El archivo "+req.body+" subido correctamente");
})
//----------FUNCIONES---------//
function asigID(lista){
    var id = 0;
    for (i=0;i<lista.length;i++){
        if (id <= lista[i].id){
            id = lista[i].id + 1;//Problemas si se borra un elemento y se pierde una id en el proceso
        }
    }
    return (id);
}

function incluir(objeto,lista){
    for (i=0;i<lista.length;i++){
        if (lista[i].login == objeto.login){
            return (200);
        }
    }
    var o1 = Object.assign({id: asigID(lista)}, objeto);
    usuarios.push(o1);//problema, si se apaga el servidor todo se pierde
    return (201);
}

app.listen(3000);
console.log("Servidor activado. Esta escuchando en el puerto: 3000");