// Cargar la librería JSZip para manejar el archivo ZIP
const zip = new JSZip();

// Función para convertir una imagen a formato WEBP
function convertToWebP(imageFile, callback) {
  const img = new Image();
  const reader = new FileReader();

  reader.onload = function (event) {
    img.src = event.target.result;
  };

  reader.readAsDataURL(imageFile);

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(function (blob) {
      callback(blob, imageFile.name);
    }, "image/webp");
  };
}

// Manejo de archivos individuales
const fileInput = document.getElementById("imageInput");
fileInput.addEventListener("change", function (event) {
  const imageFile = event.target.files[0];

  if (imageFile) {
    convertToWebP(imageFile, function (webpBlob, originalName) {
      downloadFile(webpBlob, originalName.replace(/\.[^/.]+$/, ".webp"));
    });
  }
});

// Manejo de carpetas (múltiples imágenes)
const folderInput = document.getElementById("folderInput");
folderInput.addEventListener("change", function (event) {
  const files = event.target.files;

  if (files.length > 0) {
    zipFiles(files);
  }
});

// Función para empaquetar imágenes en un ZIP
function zipFiles(files) {
  const zip = new JSZip();
  let processedCount = 0;

  Array.from(files).forEach((file) => {
    convertToWebP(file, function (webpBlob, originalName) {
      const newFileName = originalName.replace(/\.[^/.]+$/, ".webp");

      zip.file(newFileName, webpBlob);
      processedCount++;

      // Si todas las imágenes se han convertido, generar el ZIP
      if (processedCount === files.length) {
        zip.generateAsync({ type: "blob" }).then(function (zipBlob) {
          downloadFile(zipBlob, "imagenes_convertidas.zip");
        });
      }
    });
  });
}

// Función para descargar un archivo
function downloadFile(blob, fileName) {
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
