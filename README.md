# Garden Flora — sitio web editable con Pages CMS

Sitio estático (HTML + CSS + un JS corto) que lee **todo su contenido** de los archivos de la carpeta `data/`.
Esos archivos se editan desde un panel amigable (**Pages CMS**) sin tocar código.
No hay tienda, carrito ni base de datos. Hosting gratuito: GitHub Pages (o Cloudflare Pages).

---

## 1. Qué contiene este paquete

```
garden-flora/
├── index.html              Estructura de la página (no tiene textos: salen de data/)
├── .pages.yml              Configuración de Pages CMS (archivo oculto, ¡tiene que subirse!)
├── data/                   El contenido. Es lo que se edita desde Pages CMS
│   ├── sitio.json            Portada, WhatsApp, Instagram, correo, sección Contacto
│   ├── soy-flor.json         Sección "Soy Flor"
│   ├── creaciones.json       Sección "Mis creaciones" (las piezas y sus fotos)
│   ├── flores.json           Sección "Mis flores"
│   ├── servicios.json        Sección "Servicios"
│   ├── pausa.json            Sección "Pausa botánica" (frases)
│   └── laboratorio.json      Blog "Laboratorio Garden Flora"
├── assets/
│   ├── css/style.css         Diseño y colores (la paleta está al principio, en :root)
│   ├── js/main.js            Lee data/*.json y arma la página
│   ├── img/                  Acá van las fotos que se suban
│   └── ilustraciones/        Dibujos que se muestran cuando una pieza todavía no tiene foto
└── docs/pages-cms-copia.yml  Copia visible de .pages.yml (por si no se sube el oculto)
```

---

## 2. Subir el sitio a GitHub (sin saber Git)

1. **Creá una cuenta** en <https://github.com>. Conviene que sea la cuenta de quien va a mantener el sitio (Flor): será la dueña del repositorio.
2. Arriba a la derecha: **+ → New repository**.
   - *Repository name*: `garden-flora`
   - Marcá **Public** (el plan gratuito de GitHub Pages lo necesita así)
   - **No** marques "Add a README" ni otras opciones.
   - Clic en **Create repository**.
3. En la página del repositorio vacío, clic en el enlace **uploading an existing file**.
4. **Descomprimí el zip** en tu computadora y entrá a la carpeta `garden-flora`, hasta ver `index.html`.
   - Seleccioná **todo el contenido** (no la carpeta en sí) y arrastralo a la ventana de GitHub.
   - Ojo con el archivo oculto `.pages.yml`: en **Windows** se ve normalmente; en **Mac** presioná `Cmd + Shift + .` en el Finder para mostrar archivos ocultos antes de seleccionar todo.
   - Esperá a que terminen de subir todos los archivos.
5. Abajo, clic en **Commit changes**.
6. **Verificá** que en la raíz del repositorio se vean: `.pages.yml`, `index.html`, `data`, `assets`, `docs`, `README.md`.
   - Si **falta `.pages.yml`**: clic en **Add file → Create new file**, escribí como nombre `.pages.yml`, abrí `docs/pages-cms-copia.yml`, copiá todo su contenido, pegalo y hacé **Commit changes**.

---

## 3. Publicar con GitHub Pages

1. En el repositorio: **Settings → Pages** (menú de la izquierda).
2. En *Build and deployment* → *Source*: **Deploy from a branch**.
3. En *Branch*: elegí **main** y la carpeta **/ (root)**. Clic en **Save**.
4. Esperá 1 o 2 minutos y recargá esa página: aparece la dirección del sitio, algo como
   `https://TU-USUARIO.github.io/garden-flora/`.
5. Abrila: tenés que ver la web completa. Si ves secciones vacías, andá a la sección 9 (problemas frecuentes).

---

## 4. Conectar Pages CMS

1. Entrá a <https://app.pagescms.org> y elegí **Sign in with GitHub**.
2. Cuando lo pida, **instalá la aplicación de GitHub de Pages CMS** en tu cuenta. Podés darle acceso solo al repositorio `garden-flora` (recomendado).
3. Elegí el repositorio `garden-flora` (rama `main`). Se abre el panel con estas secciones:
   **Portada y contacto · Soy Flor · Mis creaciones · Mis flores · Servicios · Pausa botánica · Laboratorio**.
   - Si en cambio te pregunta si querés *crear* `.pages.yml`, significa que no lo encontró: volvé al paso 2.6.
4. Editá lo que quieras y tocá **Save**. Cada guardado se registra en GitHub y **el sitio se actualiza solo en 1 o 2 minutos**.

> Lo primero que hay que hacer: en **Portada y contacto** reemplazar el WhatsApp, el Instagram y el correo de ejemplo
> (`5491100000000`, `gardenflora`, `hola@gardenflora.com`) por los reales. El número de WhatsApp va solo con dígitos y con código de país, por ejemplo `5491122334455`.

### Tareas de todos los días
- **Agregar una pieza a "Mis creaciones":** *Mis creaciones → Piezas → Add an entry*. Completá nombre y descripción y subí la foto. Las piezas se muestran en el orden de la lista; podés reordenarlas arrastrando.
- **Cambiar una foto:** abrí la pieza, tocá la foto, subí otra y guardá.
- **Nueva entrada del Laboratorio:** *Laboratorio → Entradas → Add an entry*. Completá título, etiqueta, fecha, resumen y texto completo (los párrafos se separan con una línea en blanco). Si **todas** las entradas tienen fecha, se muestran de la más nueva a la más vieja.
- **Quitar algo:** eliminá el elemento de la lista y guardá.
- Si una pieza no tiene foto, se muestra una ilustración botánica en su lugar.

### Invitar a otra persona a editar
Lo más simple es que la persona tenga su propia cuenta de GitHub y agregarla desde el repositorio en
**Settings → Collaborators**. Pages CMS también tiene opciones de invitación; consultá su documentación en <https://pagescms.org/docs>.

---

## 5. Cómo preparar las fotos

- Formato **JPG**, de unos **1600 px de ancho** y que pesen menos de ~500 KB. Las fotos del celular pesan varios MB y vuelven lenta la web.
- Para las piezas conviene que sean **verticales (4:5)**; para el retrato y la portada, también verticales.
- Nombres simples: sin tildes, sin espacios y en minúscula (`ramo-primavera.jpg`). GitHub distingue mayúsculas de minúsculas.
- Herramienta gratuita para achicarlas: <https://squoosh.app>. (No verifiqué si Pages CMS las redimensiona sola; no cuentes con eso.)

---

## 6. Conectar un dominio propio

Primero hay que **tener el dominio registrado** (ese costo es aparte del hosting). Después, elegí una de estas dos vías.

### Opción A — GitHub Pages
1. En el repositorio: **Settings → Pages → Custom domain**, escribí tu dominio (por ejemplo `gardenflora.com`) y **Save**. GitHub crea un archivo `CNAME` en el repositorio: no lo borres.
2. En el panel de tu registrador de dominios (donde lo compraste), creá estos registros DNS:
   - Para el dominio raíz (`gardenflora.com`): cuatro registros **A** apuntando a `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153`.
   - Para `www`: un registro **CNAME** con destino `TU-USUARIO.github.io`.
   - Confirmá estas direcciones en la documentación oficial de GitHub (*docs.github.com → GitHub Pages → custom domain*), porque pueden cambiar.
3. Cuando el DNS se propague (de minutos a 48 horas), volvé a **Settings → Pages** y activá **Enforce HTTPS**.

### Opción B — Cloudflare Pages (también gratis)
1. En Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, y elegí el repositorio `garden-flora`.
2. No es un sitio con compilación: dejá el *build command* vacío y el directorio de salida en `/` (si el panel no lo acepta, probá con `.`).
3. Una vez publicado, en el proyecto: **Custom domains → Set up a custom domain** y seguí los pasos.
4. Pages CMS sigue funcionando igual: guarda en GitHub y Cloudflare vuelve a publicar solo.

> Con **GitHub Pages activado y Cloudflare conectado a la vez** tenés dos copias publicadas. Usá solo una; si elegís Cloudflare, podés desactivar GitHub Pages en *Settings → Pages*.

---

## 7. Ver el sitio en tu computadora (opcional)

Si hacés doble clic en `index.html`, el contenido **no se carga** (el navegador bloquea la lectura de `data/` desde un archivo local) y aparece un aviso. Para probarlo localmente hace falta un servidor:

- Con Python instalado, en la carpeta del sitio: `python3 -m http.server 8000` y abrí <http://localhost:8000>.
- O en Visual Studio Code, con la extensión *Live Server*.

Publicado en GitHub Pages o Cloudflare funciona sin ningún paso extra.

---

## 8. Qué se edita en el panel y qué no

| Se edita en Pages CMS | Se edita a mano en GitHub (lápiz ✏️ sobre el archivo) |
|---|---|
| Todos los textos, listas, frases, fotos, WhatsApp, Instagram, correo, entradas del blog | Colores y tipografías: `assets/css/style.css` (al principio, en `:root`) |
| | Nombres del menú, título de la pestaña y descripción para Google: `index.html` |
| | Las secciones "Frescas" y "Secas" tienen títulos fijos en `index.html` |

---

## 9. Problemas frecuentes

- **Cambié algo y no se ve.** Esperá 1 o 2 minutos y recargá con `Ctrl + F5`. En el repositorio, la pestaña **Actions** muestra si la publicación terminó (círculo verde).
- **Una foto no aparece.** Revisá que el archivo exista en `assets/img/` y que mayúsculas y minúsculas coincidan con el nombre guardado. Si no carga, el sitio muestra la ilustración de respaldo.
- **Una sección aparece vacía.** Abrí el archivo correspondiente en `data/` desde GitHub y buscá errores de formato (comas o comillas de más). Desde Pages CMS esto no debería ocurrir.
- **Pages CMS no muestra el repositorio.** En GitHub: *Settings → Applications → Installed GitHub Apps → Pages CMS → Configure* y dale acceso al repositorio.
- **Aparece el aviso "Estás abriendo el archivo directamente".** Es el caso de la sección 7.

---

## 10. Limitaciones a tener en cuenta

- El contenido se arma en el navegador al abrir la página. Google puede procesarlo, pero si más adelante querés mejorar el posicionamiento, conviene pasar a un generador de sitios estáticos (Eleventy o Astro), que dejan el contenido ya escrito en el HTML. La estructura de `data/` se puede reutilizar.
- Las entradas del Laboratorio se leen en una ventana emergente, no tienen una dirección propia. Si necesitás compartir una entrada puntual, habría que convertirlas en páginas individuales.
- Pages CMS funciona solo con repositorios de GitHub.

---

## Paleta
Oliva `#767B44` (principal) · tierra `#8C6C40` (complementario) · oliva grisáceo `#AAAA91` · rosa tierra `#D2B1A0` · beige cálido `#D7D0C0` · verde salvia `#A0A797` · arena `#D6CEBB` · oliva suave `#B4B6A0` · rosa empolvado `#CEB2A7` · salvia claro `#C7C9B8`. Derivados para texto y fondo: papel `#F6F2EA`, tinta `#2D2B1D`, pie `#3A3B22`.
