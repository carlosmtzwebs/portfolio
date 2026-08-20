# Carlos Mtz — Portfolio Web

Portafolio oficial de **Carlos Eduardo Martínez Alvarado**, desarrollador web frontend. Sitio estático (HTML, CSS y JavaScript) enfocado en rendimiento, SEO y conversión.

🔗 **Sitio en vivo:** https://www.carlosmtzwebs.com

## Contenido

- **`index.html`** — Página de inicio: hero, sobre mí, servicios, tecnologías, proceso, proyectos destacados, testimonios y contacto.
- **`portfolio.html`** — Portafolio con proyecto filtrables (Landing Pages, Sitios Web, Tiendas Online, WordPress, Shopify, Código Limpio).
- **`planes.html`** — Planes y precios (Web informativa, Landing Page, E-commerce) con tres niveles: Starter, Business y Premium.
- **`404.html`** — Página 404 personalizada con el estilo de la marca.

## SEO y despliegue

- **`robots.txt`** — Permite el rastreo completo y referencia el sitemap.
- **`sitemap.xml`** — Sitemap con las 3 URLs principales en `www.carlosmtzwebs.com`.
- **`_redirects`** — Redirige `/index.html` → `/` (evita contenido duplicado en Netlify).
- **`_headers`** — Cabeceras de seguridad y caché de navegador para Netlify (1 año en assets, sin caché en HTML).
- Metadatos SEO (`canonical`, Open Graph, Twitter Card y Schema.org Person) en `index.html` y `portfolio.html`.

> Nota: el sitio se despliega en **Netlify**, por eso no incluye `.htaccess` (Netlify lo ignora). La HTTPS y los redirects se gestionan con `_redirects` / `_headers`.

## Recursos técnicos

- HTML5 semántico y accesible (ARIA, `skip-link`)
- CSS con variables de diseño (tokens), layout responsive y revelado al hacer scroll
- JavaScript vanilla (menú móvil, filtros del portafolio, contadores, formulario con Netlify Forms)
- Fonts: Google Fonts (Manrope + Inter)

## Contacto

- WhatsApp: [+52 (1) 33 4821 7208](https://wa.me/523348217208)
- Correo: [info@carlosmtzwebs.com](mailto:info@carlosmtzwebs.com)
- Instagram: [@carlos.mtz.webs](https://www.instagram.com/carlos.mtz.webs/)
- Facebook: [Carlos Mtz](https://www.facebook.com/profile.php?id=61592552905246)

## Cómo desplegar en Netlify

1. Sube el contenido de esta carpeta a un repositorio o arrastra la carpeta a [app.netlify.com](https://app.netlify.com) (deploy por drag & drop).
2. Netlify sirve automáticamente `index.html`, `robots.txt`, `sitemap.xml`, `_redirects` y `_headers`.
3. Verifica en el navegador: `robots.txt`, `sitemap.xml` y una URL inexistente (debe mostrar `404.html`).
4. En [Google Search Console](https://search.google.com/search-console) agrega la propiedad y envía `sitemap.xml` en la sección **Sitemaps**.

## Licencia

© 2026 Carlos Mtz. Todos los derechos reservados.