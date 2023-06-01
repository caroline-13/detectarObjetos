var estatus = false;
var listaObjetos = [];
function preload(){
    imagen = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    imagen.resize(640,420);
    modelo = ml5.objectDetector("cocossd",modeloListo);
}
function draw(){
    image(imagen, 0, 0, 640, 420);
    if(estatus){
        for(var i =0; i <listaObjetos.length;i++){
            objeto = listaObjetos[i].label;
            confianza = listaObjetos[i].confidence;
            confianza = Math.round(confianza*100)
            x= listaObjetos[i].x;
            y = listaObjetos[i].y;
            ancho = listaObjetos[i].width;
            alto= listaObjetos[i].height;
          fill("white")
          text(objeto+" "+confianza+"%",x,y);
          noFill()
          stroke("black")
          rect(x,y,ancho,alto)
        }
        document.getElementById("estatus").innerHTML="objetos Detectados";
    }
}
function modeloListo(){
    console.log("modelo cargado");
    modelo.detect(imagen,resultadoObtenido)
}
function resultadoObtenido(error,resultado){
    if(!error){
        console.log(resultado)
         estatus=true;
         listaObjetos=resultado;
    }
}