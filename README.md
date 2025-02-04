# Convertir Imágenes a Formato WEBP

Este proyecto contiene una función en JavaScript que permite convertir una imagen a formato WEBP. La imagen se carga a través de un input de archivo y, al procesarse, se genera un enlace para descargar la versión convertida en formato WEBP.

## Ejecución

1. Clone el repositorio de GitHub.
2. Abra el archivo `index.html` en su navegador
3. Listo, puede probar el convertidor de imágenes.

## Funcionalidad

La función principal de este proyecto es `convertToWebP(imageFile, callback)`, que convierte una imagen cargada a través de un input de tipo archivo a formato WEBP y luego ejecuta un callback con el archivo convertido.

### Flujo de trabajo:

1. El usuario selecciona una imagen a través de un input de tipo `file`.
2. La función `convertToWebP` convierte la imagen a formato WEBP utilizando un `<canvas>`.
3. Se genera un enlace de descarga con la imagen convertida, que se puede hacer clic para descargar el archivo.

## Estructura del Código

### `convertToWebP(imageFile, callback)`

Esta función acepta un archivo de imagen y un callback. Convierte la imagen a formato WEBP y llama al callback con el archivo convertido.

- **Parámetros:**
  - `imageFile`: El archivo de imagen que el usuario desea convertir.
  - `callback`: Una función que recibe el archivo en formato WEBP como un `Blob`.

### Ejemplo de uso:

```javascript
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
```

## Este archivo `README.md` proporciona una descripción clara de lo que hace tu código, cómo usarlo y cómo personalizarlo. ¡Espero que te sirva!
