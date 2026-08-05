# Historial del proyecto — akroweb

Notas de decisiones y cambios hechos en el sitio, por si hay que retomarlas más adelante.

## Proyecto

- Sitio web de **Akrosport**, Centro de Entrenamiento en Los Andes, Chile.
- Repo: `barblaze/akroweb` — publicado en `https://barblaze.github.io/akroweb/`.
- Tecnología: HTML + CSS + JS vanilla, sin dependencias (estático, GitHub Pages).
- Páginas: `index.html`, `servicios.html`, `galeria.html`, `contacto.html`.

## Datos de contacto usados en el sitio

- Teléfono / WhatsApp: **+56 9 5619 0853**
- Instagram: **@akrosport_**
- Email: `contacto@akrosport.cl`
- Dirección en el sitio: "Los Andes, Valparaíso, Chile". Fuente externa (`bodychange.cl/akros-sport`) indica dirección real: **Esmeralda 1310, Los Andes** (aún no actualizada en el sitio).

## Cambios realizados

### 1. Logo del sitio (reemplaza la mancuerna)

- Se reemplazó el icono de mancuerna del header/footer por `<img src="assets/img/logo.png">` (46x46) en las 4 páginas (2 por página: header + footer).
- La imagen debe ser la foto de perfil de Instagram `@akrosport_`. Instagram bloquea la descarga anónima, así que la sube el dueño manualmente.
- Mientras `assets/img/logo.png` no exista, `onerror` lo oculta para no mostrar imagen rota.
- CSS: `.logo-icon` adaptado a imagen (46x46, `border-radius:10px`, `object-fit:cover`, sin fondo).
- Las 2 mancuernas de contenido se mantienen: `index.html` L121 (valores) y `servicios.html` L86 (card personalizado).

### 2. Precios de planes

Estructura actual (agosto 2026):

| Plan | Sesiones | Precio |
| --- | --- | --- |
| Entrenamiento personalizado | 8 / mes | $130.000 |
| Entrenamiento personalizado | 12 / mes | $170.000 |
| Sala libre — Plan básico | 8 / mes | $35.000 |
| Sala libre — Plan intermedio | 12 / mes | $45.000 |
| Small group (semipersonalizado) | 8 / mes | $70.000 |
| Small group (semipersonalizado) | 12 / mes | $85.000 |

- La sección "Otras opciones" de `index.html` quedó con 2 sub-bloques (Sala libre y Small groups), cada uno con 2 cards.
- Se eliminó el "Plan grupal" (antes $49.990/mes) y la opción "Entrenamiento libre" mensual ($29.990).
- Los planes personalizados ya no incluyen "Plan nutricional" en sus features.
- Las cards de Sala libre ya no mencionan "duchas": solo "Lockers".
- Se eliminó la sección completa de Promociones ("Ofertas del mes": Promo Verano, Promo Parejas, Plan Anual) y sus estilos CSS. El botón del hero "Ver promociones" ahora es "Ver planes" (`#planes`).
- Select del formulario de `contacto.html` actualizado:
  - Personal 8 sesiones/mes, Personal 12 sesiones/mes
  - Sala libre 8 sesiones/mes, Sala libre 12 sesiones/mes
  - Small group 8 sesiones/mes, Small group 12 sesiones/mes
  - Clases grupales, Otro

### 3. Tema oscuro (consistente en todos los dispositivos)

- El fondo se veía gris/negro en algunos dispositivos (el modo oscuro forzado del navegador invertía la página) y blanco en otros.
- Se optó por un **tema oscuro real**: fondo negro profundo `#0F0F0F`, tarjetas `#181818`, secciones alternas `#141414`, textos claros y acento **dorado** `#D4AF37`.
- Acento unificado en `--gold` (fuente única) con `--neon: var(--gold)`; se eliminaron las variables duplicadas.
- Botones: `.btn-neon` dorado, `.btn-dark` blanco, `.btn-outline` sin cambios.
- Las 4 páginas tienen `<meta name="color-scheme" content="dark">` y `:root` declara `color-scheme: dark` → ningún navegador vuelve a invertir el sitio.

### 4. Definiciones de oferta

- **Clases grupales** = entrenamiento funcional.
- **Small group** = semipersonalizado (máx. 3 personas).
- La card "Small Group" de `servicios.html` ahora dice "Entrenamiento semipersonalizado en grupos de máximo 3 personas".
- La card "Nutrición y Hábitos" de `servicios.html` se mantiene como servicio aparte (no se eliminó).

## Estado pendiente

- **Subir `assets/img/logo.png`** al repo (vía GitHub web: `Add file → Upload files` en `assets/img/`) — es la foto de perfil de Instagram de `@akrosport_`. Al subirlo, Pages se reconstruye (~1 min).
- Dirección exacta (Esmeralda 1310) y email aún son de ejemplo en `contacto.html`.
- Reemplazar imágenes `.svg` de `assets/img/` por fotos reales del gimnasio.

## Notas de seguridad

- Dos tokens de GitHub quedaron expuestos por error fuera del repo y se usaron en los `git push`. Ambos deben revocarse en GitHub → Settings → Developer settings → Personal access tokens y generar uno nuevo. Evitar pegarlos en el historial.
