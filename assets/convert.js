// Función para convertir una imagen a formato WEBP
function convertToWebP(imageFile, callback) {
  // Crear un elemento de imagen para cargar el archivo
  const img = new Image();

  // Leer el archivo de imagen como URL
  const reader = new FileReader();
  reader.onload = function (event) {
    img.src = event.target.result;
  };

  reader.readAsDataURL(imageFile);

  // Cuando la imagen se ha cargado
  img.onload = function () {
    // Crear un canvas para dibujar la imagen
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Ajustar las dimensiones del canvas al tamaño de la imagen
    canvas.width = img.width;
    canvas.height = img.height;

    // Dibujar la imagen en el canvas
    ctx.drawImage(img, 0, 0);

    // Convertir el contenido del canvas a formato WEBP
    canvas.toBlob(function (blob) {
      // Llamar al callback con el archivo en formato WEBP
      callback(blob);
    }, "image/webp");
  };
}

// Ejemplo de uso:
let downloadCounter = 1; // Contador para el nombre de las imágenes

const fileInput = document.getElementById("imageInput");
fileInput.addEventListener("change", function (event) {
  const imageFile = event.target.files[0];

  if (imageFile) {
    convertToWebP(imageFile, function (webpBlob) {
      // Crear un enlace de descarga para la imagen WEBP
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(webpBlob);

      // Establecer el nombre del archivo descargado de manera única
      downloadLink.download = `image${downloadCounter}.webp`;
      downloadLink.classList.add("custom-link");
      downloadLink.textContent = `Descargar ${downloadCounter} imagen convertida a WEBP`;

      // Incrementar el contador para el próximo enlace
      downloadCounter++;

      // Añadir el enlace a la página
      document.body.appendChild(downloadLink);
    });
  }
});

