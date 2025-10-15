<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1cXyJWBjPlQp10YBkTmZ2gG19JMtUH3dv

## Guía paso a paso (sin saber programar)

Sigue estas instrucciones con calma, como si siguieras una receta. Completa cada paso antes de pasar al siguiente y no necesitas conocimientos técnicos.

💡 **¿Te pierdes en la terminal?** Una vez que tengas Node instalado y abras la carpeta `venki-quality-hub-vercel-final`, puedes escribir `npm run pasos` para que la terminal te muestre estas instrucciones resumidas sin abrir ningún archivo adicional.

### 0. Prepara tu computadora

1. Asegúrate de tener conexión a internet.
2. Ten a mano un navegador (Chrome, Edge, Safari o Firefox).
3. Crea una carpeta vacía en un lugar fácil de encontrar (por ejemplo, el Escritorio). Ahí guardaremos todo.

### 1. Instala lo único necesario

1. Abre <https://nodejs.org/>.
2. Descarga la versión **LTS** (tiene la etiqueta “Recommended for most users”).
3. Abre el archivo descargado y acepta todo con “Siguiente” hasta finalizar. Esto instalará Node.js y una aplicación llamada **Node.js command prompt** o **Terminal**, que usarás para los comandos.
4. Comprueba que quedó instalado correctamente abriendo la ventana de comandos (en Windows, “Node.js command prompt”; en macOS o Linux, “Terminal”) y escribiendo:

   ```bash
   node --version
   ```

   Si ves un número como `v20.11.0`, todo salió bien. (Cierra la ventana para continuar.)

### 2. Consigue el código de la aplicación

1. En esta página de GitHub haz clic en el botón verde **Code** y elige **Download ZIP**.
2. Cuando termine la descarga, abre el archivo ZIP (normalmente se guarda en la carpeta “Descargas”).
3. Haz clic en “Extraer todo” o arrastra la carpeta descomprimida hacia la carpeta que creaste en el paso 0.
4. Abre la carpeta `venki-quality-hub-v3` y dentro verás otra llamada `venki-quality-hub-vercel-final`. Esa carpeta será tu proyecto. No borres ninguna de las subcarpetas ni archivos que contiene.

### 3. Abre una ventana de comandos dentro del proyecto

**En Windows**

1. Abre el menú Inicio, busca “Node.js command prompt” y ejecútalo.
2. Escribe `cd` (significa “cambiar de carpeta”) y después un espacio.
3. Sin cerrar la ventana, arrastra la carpeta `venki-quality-hub-vercel-final` desde el Explorador hacia la ventana de comandos. Se pegará la ruta completa automáticamente.
4. Presiona **Enter**. Deberías ver algo similar a `C:\Users\tu-usuario\Escritorio\venki-quality-hub-v3\venki-quality-hub-vercel-final>`.

**En macOS o Linux**

1. Abre la aplicación “Terminal”.
2. Escribe `cd ` (incluye el espacio final) y arrastra la carpeta `venki-quality-hub-vercel-final` al Terminal para pegar la ruta completa, o escríbela manualmente en formato `/Users/tu-usuario/Escritorio/...`.
3. Presiona **Enter** para entrar a la carpeta.

### 4. Instala la aplicación (solo la primera vez)

1. En la ventana de comandos escribe:

   ```bash
   npm install
   ```

2. Espera a que termine. Este paso descarga las piezas que la app necesita. Sabrás que acabó cuando vuelva a aparecer el símbolo `>` o `#` y no salgan más líneas nuevas.

### 5. (Opcional) Añade tu clave de Gemini

Si cuentas con una API key de Google Gemini, la aplicación podrá generar contenido real. Si no tienes una, puedes saltarte este apartado: la app ya trae datos de demostración.

1. Dentro de la carpeta del proyecto crea un archivo llamado `.env.local`. Puedes abrir el Bloc de notas, pegar el contenido y guardarlo usando la opción “Guardar como…”.
2. Copia y pega esta línea, reemplazando `TU_CLAVE_AQUI` por tu clave real:

   ```env
   VITE_GEMINI_API_KEY=TU_CLAVE_AQUI
   ```

3. Guarda el archivo y ciérralo.

### 6. Enciende la aplicación en modo “en vivo”

1. Regresa a la ventana de comandos (la misma donde ejecutaste `npm install`).
2. Escribe:

   ```bash
   npm run dev
   ```

3. La terminal mostrará varias líneas. Espera a que aparezca un mensaje que incluya una dirección parecida a `http://localhost:5173/`.
4. **No cierres la ventana de comandos**. Piensa en ella como el motor del auto: si la cierras, la app deja de funcionar.

### 7. Abre la app en tu navegador

1. Copia la dirección que viste (`http://localhost:5173/`).
2. Pégala en la barra de direcciones de tu navegador y presiona **Enter**.
3. ¡Listo! Ya puedes explorar la aplicación. Si no configuraste la clave de Gemini, los datos de ejemplo te permitirán probar todas las pantallas sin errores.

### 8. Guarda la dirección para la próxima vez

1. Si te gustó el resultado, crea un acceso directo: en el navegador presiona `Ctrl + D` (o `Cmd + D` en macOS) para añadir la página a tus favoritos.
2. La próxima vez solo necesitas repetir los pasos 3, 6 y 7 (abrir la carpeta en la terminal, ejecutar `npm run dev` y abrir el enlace en el navegador).

### 9. Cuando termines

1. Vuelve a la ventana de comandos.
2. Presiona **Ctrl + C** (o `Cmd + C` en macOS). Si te pregunta “¿Deseas terminar el proceso?”, escribe `y` y presiona **Enter**.
3. Cierra la ventana de comandos una vez que la app se detenga.

### 10. ¿Y si quiero compartirla con alguien más rápido?

1. En lugar de `npm run dev`, puedes ejecutar:

   ```bash
   npm run demo
   ```

2. Este comando construye la app, la deja lista para mostrarse y abre automáticamente la dirección `http://localhost:4173/` en tu navegador. También puedes copiar ese enlace y compartirlo con otra persona en tu misma red.

### 11. Problemas frecuentes y cómo solucionarlos

| Mensaje en pantalla | Qué significa | Cómo solucionarlo |
| --- | --- | --- |
| `npm: command not found` | Node.js no quedó instalado o la ventana se abrió antes de instalarlo. | Repite el paso 1, reinicia la computadora y vuelve a abrir la ventana de comandos. |
| `Error: listen EADDRINUSE: address already in use 5173` | Ya tienes otra app usando el mismo puerto. | Cierra otras ventanas que usen `npm run dev` o cambia temporalmente de puerto ejecutando `npm run dev -- --port 5174`. |
| La página carga pero se ve en blanco | Falta terminar la instalación o cerraste la terminal. | Asegúrate de que `npm install` terminó sin errores y que la terminal sigue abierta ejecutando `npm run dev`. |
| El navegador no abre el enlace automáticamente tras `npm run demo` | Algunas computadoras bloquean la apertura automática. | Copia manualmente `http://localhost:4173/` desde la terminal y pégalo en el navegador. |

## Run Locally (resumen para usuarios con experiencia)

**Prerequisites:** Node.js

1. Instala dependencias:
   `npm install`
2. Configura `VITE_GEMINI_API_KEY` en [.env.local](.env.local) con tu clave de Gemini.
3. Arranca en modo desarrollo:
   `npm run dev`

Si prefieres revisar exactamente el mismo paquete que se despliega en producción:

1. Genera el build optimizado:
   `npm run build`
2. Arranca la vista previa estática:
   `npm run preview`
3. Abre [http://localhost:4173](http://localhost:4173) en tu navegador para ver la aplicación ya compilada.

> Si aún no cuentas con una clave de Gemini, la aplicación seguirá funcionando en modo demostración y mostrará fórmulas Pantone
> y consejos de calidad de ejemplo para que puedas explorar cada módulo sin errores.

### ¿Necesitas un enlace directo inmediato?

Ejecuta `npm run demo` y espera a que Vite te muestre el enlace listo para copiar y pegar. El comando construye el paquete y lanza la vista previa en `http://localhost:4173`, además de abrirla automáticamente en tu navegador predeterminado (si tu entorno lo permite).

> También puedes compartir el enlace mostrado en la terminal (`http://localhost:4173`) con otras personas dentro de tu red local gracias a la opción `--host 0.0.0.0` incluida en el script `demo`.

## Despliegue con Docker

Si prefieres empaquetar la aplicación en un contenedor listo para ejecutar en cualquier servidor (o en tu propia máquina), ya c
uentas con una configuración Docker preparada:

1. Construye la imagen (puedes pasar la clave de Gemini si quieres incluirla en el build):
   ```bash
   cd venki-quality-hub-vercel-final
   docker compose build \
     --build-arg VITE_GEMINI_API_KEY="tu_clave_opcional"
   ```
2. Levanta el contenedor y expone el sitio en el puerto `4173`:
   ```bash
   docker compose up
   ```
3. Abre [http://localhost:4173](http://localhost:4173) para ver la app desplegada con Nginx.

> Si no proporcionas una clave durante el build, la aplicación seguirá usando las respuestas de demostración que ya incluye.

Para desplegarlo en un servidor remoto solo necesitas copiar el contenido de la carpeta `venki-quality-hub-vercel-final`, ejecu
tar los mismos comandos y exponer el puerto `4173` (o ajustarlo en `docker-compose.yaml`).

## Código listo para Google AI Studio

Si quieres probar las mismas solicitudes que usa la aplicación directamente en
[Google AI Studio](https://aistudio.google.com/app/prompts), copia el contenido
de [`services/googleAiStudioSnippet.ts`](services/googleAiStudioSnippet.ts).
Ese archivo es autocontenido y expone:

- Los prompts y esquemas para obtener fórmulas Pantone o consejos de calidad.
- `createGeminiClient(apiKey)` para inicializar el SDK con tu clave.
- `fetchPantoneFormulaRaw` y `fetchQualityTipRaw` para ejecutar las consultas y
  recuperar el texto devuelto por Gemini.

Ejemplo de uso rápido en Node o en la pestaña **Código** de AI Studio:

```ts
import {
  fetchPantoneFormulaRaw,
  fetchQualityTipRaw,
} from "./googleAiStudioSnippet";

const apiKey = process.env.GEMINI_API_KEY!;

const formulaJson = await fetchPantoneFormulaRaw(apiKey, "PANTONE 185 C");
console.log(JSON.parse(formulaJson ?? "{}"));

const tip = await fetchQualityTipRaw(apiKey, "Reducir desperdicio de tinta");
console.log(tip);
```

> **Importante:** AI Studio solo ejecutará correctamente el código si has
> configurado tu clave de Gemini en la sección **API key** del proyecto o si
> defines la variable `GEMINI_API_KEY` al ejecutar el script en Node.

## Resumen de los ajustes recientes

Para que puedas compartir y probar la aplicación sin contratiempos, se implementaron varias mejoras clave:

- **Cliente de Gemini robusto:** ahora la aplicación reutiliza una sola instancia del SDK, valida que la clave `VITE_GEMINI_API_KEY` exista antes de llamar a la API y ofrece respuestas de demostración cuando trabajas sin credenciales.
- **Prompts y utilidades unificados:** los generadores de mensajes y validadores de fórmulas Pantone se centralizaron en un módulo reutilizable que también puedes copiar directamente en Google AI Studio.
- **Experiencia de demostración lista para copiar:** se añadió el script `npm run demo`, que compila el proyecto, habilita acceso desde tu red local (`--host 0.0.0.0`) y abre automáticamente la vista previa en el navegador para que solo tengas que compartir el enlace `http://localhost:4173`.
- **Estilos garantizados en producción:** las reglas de estilo globales se movieron a `public/index.css`, asegurando que la versión compilada conserve el diseño "glassmorphism" sin depender de inyecciones dinámicas en el `index.html`.

Con estos cambios, la aplicación funciona tanto en entornos con acceso a Gemini como en demostraciones sin conexión, y dispones de instrucciones claras para ejecutarla o integrarla en AI Studio.
