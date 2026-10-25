/* Garden Flora — carga el contenido desde /data/*.json y arma la página.
   Para cambiar textos y fotos NO hace falta tocar este archivo: se editan los .json (con Pages CMS). */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- utilidades ---------- */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') n.className = attrs[k]; else if (k === 'text') n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function get(obj, path) { return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, obj); }
  function clear(n) { while (n && n.firstChild) n.removeChild(n.firstChild); }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function str(v) { return typeof v === 'string' ? v : ''; }
  function wa(num, msg) { return 'https://wa.me/' + encodeURIComponent(String(num || '').replace(/\D/g, '')) + (msg ? '?text=' + encodeURIComponent(msg) : ''); }
  function parrafos(texto, contenedor) {
    str(texto).split(/\n\s*\n/).forEach(function (p) { p = p.trim(); if (p) contenedor.appendChild(el('p', { text: p })); });
  }

  /* Foto de la pieza; si no hay foto (o no carga) se muestra una ilustración */
  function foto(src, alt, i, cls) {
    var fig = el('figure', { 'class': 'foto ' + (cls || '') });
    var img = el('img', { loading: 'lazy' });
    function ilus() {
      img.className = 'ilus'; img.alt = '';
      img.src = 'assets/ilustraciones/ilus-' + ((((i || 0) % 12) + 12) % 12 + 1) + '.svg';
    }
    img.onerror = function () { if (img.className !== 'ilus') ilus(); };
    if (src) { img.alt = alt || ''; img.src = src; } else { ilus(); }
    fig.appendChild(img);
    return fig;
  }

  /* ---------- carga de datos ---------- */
  var ARCHIVOS = { sitio: 'sitio.json', soyflor: 'soy-flor.json', creaciones: 'creaciones.json', flores: 'flores.json',
                   servicios: 'servicios.json', pausa: 'pausa.json', laboratorio: 'laboratorio.json' };
  function cargar() {
    var D = {};
    return Promise.all(Object.keys(ARCHIVOS).map(function (k) {
      return fetch('data/' + ARCHIVOS[k], { cache: 'no-cache' })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (j) { D[k] = j; })
        .catch(function () { D[k] = {}; console.warn('No se pudo leer data/' + ARCHIVOS[k]); });
    })).then(function () { return D; });
  }

  /* ---------- secciones ---------- */
  function textos(D) {
    $$('[data-t]').forEach(function (n) { var v = get(D, n.getAttribute('data-t')); if (typeof v === 'string' && v) n.textContent = v; });
  }
  function inicio(D) {
    var s = D.sitio || {}, ini = s.inicio || {};
    var ul = $('#sellos'); clear(ul); arr(ini.sellos).forEach(function (t) { ul.appendChild(el('li', { text: t })); });
    $('#btnWhatsapp').href = wa(s.whatsapp, 'Hola Flor, vi tu web y quiero consultarte algo.');
    if (ini.foto) {
      var img = el('img', { src: ini.foto, alt: 'Ramo de Garden Flora' });
      img.onerror = function () { img.remove(); };
      $('#portada').appendChild(img);
    }
  }
  function soyFlor(D) {
    var d = D.soyflor || {};
    var c = $('#soyFoto'); clear(c); c.appendChild(foto(d.foto, 'Retrato de Flor, la florista', 9, 'foto-arco'));
    var p = $('#soyParrafos'); clear(p); arr(d.parrafos).forEach(function (t) { if (str(t).trim()) p.appendChild(el('p', { text: t })); });
    if (!str(d.cita)) $('#soy-flor blockquote').remove();
  }
  var PATRON = ['foto-a', 'foto-b', 'foto-b', 'foto-a', 'foto-a', 'foto-b'];
  function creaciones(D) {
    var d = D.creaciones || {}, num = (D.sitio || {}).whatsapp, box = $('#piezas'); clear(box);
    arr(d.piezas).forEach(function (pz, i) {
      if (!pz || !str(pz.titulo)) return;
      var msg = 'Hola Flor, me interesa "' + pz.titulo + '". ¿Me contás cómo trabajás?';
      box.appendChild(el('article', { 'class': 'pieza' }, [
        foto(pz.foto, pz.titulo, i, PATRON[i % PATRON.length]),
        el('h3', { text: pz.titulo }),
        el('p', { text: str(pz.descripcion) }),
        el('a', { 'class': 'link', href: wa(num, msg), target: '_blank', rel: 'noopener', text: d.texto_consulta || 'Consultar por esta pieza' })
      ]));
    });
  }
  function fichas(lista, destino) {
    var ul = $(destino); clear(ul);
    arr(lista).forEach(function (f) {
      if (!f || !str(f.nombre)) return;
      ul.appendChild(el('li', {}, [el('span', { 'class': 'nombre', text: f.nombre }), el('i', { 'class': 'latin', text: str(f.latin) }), el('span', { 'class': 'nota', text: str(f.nota) })]));
    });
  }
  function flores(D) {
    var d = D.flores || {};
    fichas(d.frescas, '#frescas'); fichas(d.secas, '#secas');
    var ul = $('#curiosidades'); clear(ul); arr(d.curiosidades).forEach(function (t) { if (str(t).trim()) ul.appendChild(el('li', { text: t })); });
  }
  function servicios(D) {
    var d = D.servicios || {};
    var a = $('#serviciosLista'); clear(a);
    arr(d.servicios).forEach(function (s) { if (s && str(s.titulo)) a.appendChild(el('article', {}, [el('h3', { text: s.titulo }), el('p', { text: str(s.descripcion) })])); });
    var o = $('#pasos'); clear(o);
    arr(d.pasos).forEach(function (s) { if (s && str(s.titulo)) o.appendChild(el('li', {}, [el('strong', { text: s.titulo }), document.createTextNode(' ' + str(s.descripcion))])); });
  }
  function pausa(D) {
    var d = D.pausa || {}, frases = arr(d.frases).filter(function (t) { return str(t).trim(); }), q = $('#frase'), i = -1;
    var ul = $('#practicas'); clear(ul); arr(d.practicas).forEach(function (t) { if (str(t).trim()) ul.appendChild(el('li', { text: t })); });
    function otra() {
      if (!frases.length) return;
      var n; do { n = Math.floor(Math.random() * frases.length); } while (frases.length > 1 && n === i);
      i = n; q.textContent = frases[i];
    }
    otra();
    $('#otraFrase').onclick = otra;
    if (frases.length < 2) $('#otraFrase').hidden = true;
  }
  function fechaLarga(s) {
    if (!/^\d{4}-\d{2}-\d{2}/.test(str(s))) return '';
    var d = new Date(s.slice(0, 10) + 'T12:00:00');
    return isNaN(d) ? '' : d.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  function laboratorio(D) {
    var d = D.laboratorio || {}, box = $('#entradas'), dlg = $('#entradaDialog'); clear(box);
    var lista = arr(d.entradas).filter(function (e) { return e && str(e.titulo); });
    var todasConFecha = lista.length && lista.every(function (e) { return fechaLarga(e.fecha); });
    if (todasConFecha) lista = lista.slice().sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; });
    lista.forEach(function (e, i) {
      var btn = el('button', { 'class': 'link', type: 'button', text: d.texto_leer || 'Leer entrada' });
      btn.addEventListener('click', function () { abrir(e, i, btn); });
      box.appendChild(el('article', { 'class': 'entrada' }, [
        foto(e.foto, e.titulo, i + 6, 'foto-c'),
        el('div', {}, [
          str(e.etiqueta) ? el('span', { 'class': 'tag', text: e.etiqueta }) : null,
          el('h3', { text: e.titulo }), el('p', { text: str(e.resumen) }), btn])
      ]));
    });
    function abrir(e, i, origen) {
      $('#entradaTag').textContent = str(e.etiqueta);
      $('#entradaTitulo').textContent = e.titulo;
      $('#entradaFecha').textContent = fechaLarga(e.fecha);
      var f = $('#entradaFoto'); clear(f); if (str(e.foto)) f.appendChild(foto(e.foto, e.titulo, i + 6, 'foto-c'));
      var c = $('#entradaCuerpo'); clear(c); parrafos(str(e.texto) || str(e.resumen), c);
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      dlg._origen = origen;
    }
    $('#entradaCerrar').onclick = function () { dlg.close(); };
    dlg.addEventListener('click', function (ev) { if (ev.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () { if (dlg._origen) dlg._origen.focus(); });
  }
  function contacto(D) {
    var s = D.sitio || {}, ul = $('#vias'); clear(ul);
    function via(t, d, href, ext) {
      if (!d) return;
      var a = el('a', { href: href }, [el('span', { 'class': 'via-t', text: t }), el('span', { 'class': 'via-d', text: d })]);
      if (ext) { a.target = '_blank'; a.rel = 'noopener'; }
      ul.appendChild(el('li', {}, [a]));
    }
    via('WhatsApp', s.whatsapp_visible || s.whatsapp, wa(s.whatsapp, 'Hola Flor, quiero hacerte una consulta.'), true);
    var ig = str(s.instagram).replace(/^@/, '');
    if (ig) via('Instagram', '@' + ig, 'https://instagram.com/' + encodeURIComponent(ig), true);
    via('Correo', s.email, 'mailto:' + str(s.email), false);
  }

  /* ---------- comportamiento de la página ---------- */
  function interfaz() {
    var cab = $('#cabecera');
    function onScroll() { cab.classList.toggle('compacta', window.pageYOffset > 60); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    var btn = $('#menuBtn'), menu = $('#menu');
    function cerrar() { menu.classList.remove('abierto'); btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function () { var a = menu.classList.toggle('abierto'); btn.setAttribute('aria-expanded', a ? 'true' : 'false'); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', cerrar); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
    var links = $$('.menu a'), secs = links.map(function (a) { return $(a.getAttribute('href')); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('activo', a.getAttribute('href') === '#' + e.target.id); }); });
      }, { rootMargin: '-35% 0px -55% 0px' });
      secs.forEach(function (s) { if (s) io.observe(s); });
    }
    $('#anio').textContent = new Date().getFullYear();
  }

  interfaz();
  if (location.protocol === 'file:') {
    document.body.insertBefore(el('p', { 'class': 'aviso-local', text: 'Estás abriendo el archivo directamente: el contenido no se carga así. Probalo con un servidor local (ver README, sección "Ver el sitio en tu computadora") o publicado en GitHub Pages.' }), document.body.firstChild);
  }
  cargar().then(function (D) {
    textos(D); inicio(D); soyFlor(D); creaciones(D); flores(D); servicios(D); pausa(D); laboratorio(D); contacto(D);
    var hash = location.hash && $(location.hash); if (hash) hash.scrollIntoView();
  });
})();
