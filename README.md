# akroweb

Sitio web de Akrosport, Centro de Entrenamiento en Los Andes. Estático, sin dependencias: HTML + CSS + JS vanilla.

## Páginas

- `index.html` — portada con slider, planes y promociones
- `servicios.html` — servicios que ofrecemos
- `galeria.html` — fotos del lugar
- `contacto.html` — contacto, formulario y mapa

Los iconos se manejan desde `assets/img/icons.svg` (sprite con `<use>`), así no se repite el SVG en cada página.

## Correr en local

```bash
python3 -m http.server 8080
```

y abrir http://localhost:8080. Importante: abrir con servidor y no directo con `file://`, porque el sprite de iconos y el mapa necesitan http.

## Pendiente

- Datos reales de contacto (teléfono, email, dirección exacta) — ahora hay valores de ejemplo en los HTML y en `contacto.html`
- Precios finales de planes y promociones
- Reemplazar las imágenes `.svg` de `assets/img/` por fotos del gimnasio
