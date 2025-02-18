# Convertir Imágenes a Formato WEBP

Este proyecto contiene una función en JavaScript que permite convertir una imagen a formato WEBP. La imagen se carga a través de botón y al procesarse, se genera un enlace para descargar la versión convertida en formato WEBP.

## Iconos
Este proyecto utiliza iconos proporcionados por [YesIcon](https://yesicon.app/), una plataforma para obtener iconos vectoriales personalizables y gratuitos. Puedes encontrar una amplia variedad de iconos en su sitio web para utilizarlos en tus aplicaciones.

## Ejecución

1. Clone el repositorio de GitHub.
2. Abra el archivo `index.html` en su navegador
3. Listo, puede probar el convertidor de imágenes.

## Funcionalidad

La función principal de este proyecto es `convertToWebP(imageFile, callback)`, que convierte una o más imagenes cargadas a través de un input de tipo archivo a formato WEBP y luego ejecuta un callback con el archivo convertido.

### Flujo de trabajo:

1. El usuario selecciona una imagen a través de un input de tipo `file`.
2. La función `convertToWebP` convierte la imagen a formato WEBP utilizando un `<canvas>`.
3. Una vez hecha la conversión, se descarga con la imagen convertida o en caso de haber seleccionado una carpeta se descagar un archivo .zip con todas las imagenes convertidas.

## Características

- Convierte imágenes al formato WEBP.
- Permite la conversión de imágenes individuales.
- Permite la conversión de múltiples imágenes y empaquetarlas en un archivo ZIP.

## Tecnologías utilizadas

- **JavaScript** (para la manipulación de imágenes y archivos).
- **JSZip** (para generar el archivo ZIP).

## Cómo funciona el código

### 1. Cargar la librería JSZip

```js
const zip = new JSZip();
```

Se inicializa la librería **JSZip** para manejar la compresión de archivos en formato ZIP.

### 2. Función para convertir una imagen a WEBP

```js
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
```

Esta función convierte una imagen a formato WEBP utilizando un **canvas**:

1. **FileReader** lee la imagen y la convierte en una URL base64.
2. Se carga en un elemento `Image`.
3. Se dibuja en un `canvas`.
4. Se convierte en formato WEBP usando `canvas.toBlob()`.

### 3. Manejo de imágenes individuales

```js
const fileInput = document.getElementById("imageInput");
fileInput.addEventListener("change", function (event) {
  const imageFile = event.target.files[0];

  if (imageFile) {
    convertToWebP(imageFile, function (webpBlob, originalName) {
      downloadFile(webpBlob, originalName.replace(/\.[^/.]+$/, ".webp"));
    });
  }
});
```

- Se captura el archivo seleccionado en un input.
- Se convierte a WEBP y se descarga automáticamente.

### 4. Manejo de múltiples imágenes y generación de ZIP

```js
const folderInput = document.getElementById("folderInput");
folderInput.addEventListener("change", function (event) {
  const files = event.target.files;
  if (files.length > 0) {
    zipFiles(files);
  }
});
```

- Se capturan múltiples imágenes de una carpeta.
- Se convierten a WEBP y se empaquetan en un ZIP.

### 5. Función para empaquetar imágenes en un ZIP

```js
function zipFiles(files) {
  const zip = new JSZip();
  let processedCount = 0;

  Array.from(files).forEach((file) => {
    convertToWebP(file, function (webpBlob, originalName) {
      const newFileName = originalName.replace(/\.[^/.]+$/, ".webp");
      zip.file(newFileName, webpBlob);
      processedCount++;

      if (processedCount === files.length) {
        zip.generateAsync({ type: "blob" }).then(function (zipBlob) {
          downloadFile(zipBlob, "imagenes_convertidas.zip");
        });
      }
    });
  });
}
```

- Cada imagen se convierte a WEBP y se agrega al archivo ZIP.
- Cuando todas las imágenes han sido procesadas, se genera el archivo ZIP y se descarga automáticamente.

### 6. Función para descargar archivos

```js
function downloadFile(blob, fileName) {
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
```

Esta función permite descargar cualquier archivo (WEBP o ZIP) generando un enlace temporal y simulando un clic.


## Este archivo `README.md` proporciona una descripción clara de lo que hace tu código, cómo usarlo y cómo personalizarlo. ¡Espero que te sirva!



