function setup() {
  canvas = createCanvas(360, 270);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  ia = ml5.imageClassifier("MobileNet", function () {
    console.log("Modelo Cargado")
  })
  frameRate(10)
}
function draw() {
  image(video, 0, 0, 360, 270)
  ia.classify(canvas, resultado)
}
function resultado(error, objeto) {
  if (!error) {
    nombre = objeto[0].label
    precisión = objeto[0].confidence
    precisión = Math.round(precisión * 10000) / 100
    if (precisión > 50) {
      fetch("https://api.mymemory.translated.net/get?q=" + nombre + "&langpair=en|es")
        .then(response => response.json())
        .then(data => {
          traduccion = data.responseData.translatedText;
          document.getElementById("objeto").innerHTML = traduccion
        });
      document.getElementById("precisión").innerHTML = precisión
    }
  }
}

