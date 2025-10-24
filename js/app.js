// js/app.js
import { db, ref, onValue, push } from "./firebase-config.js";

// Util: cargar configuración del sitio para colores, footer y redes
function applySiteConfig() {
  const cfgRef = ref(db, "config");
  onValue(cfgRef, (snap) => {
    const cfg = snap.val() || {};
    // Footer text
    if (cfg.footerText) {
      const el = document.getElementById("footerText");
      if (el) el.textContent = cfg.footerText;
    }
    // Redes sociales
    const map = {
      socialFacebook: cfg.facebookUrl,
      socialInstagram: cfg.instagramUrl,
      socialTikTok: cfg.tiktokUrl,
      socialTwitter: cfg.twitterUrl
    };
    Object.entries(map).forEach(([id, url]) => {
      const el = document.getElementById(id);
      if (el && url) el.href = url;
    });
    // Colores HSL
    const root = document.documentElement;
    if (cfg.primaryColor) root.style.setProperty("--primary", `hsl(${cfg.primaryColor})`);
    if (cfg.secondaryColor) root.style.setProperty("--secondary", `hsl(${cfg.secondaryColor})`);
    if (cfg.accentColor) root.style.setProperty("--accent", `hsl(${cfg.accentColor})`);
  });
}

// Página: Enseñanzas (listado)
function loadPostsList() {
  const grid = document.getElementById("postsGrid");
  const noPosts = document.getElementById("noPosts");
  if (!grid) return;

  const postsRef = ref(db, "entradas");
  onValue(postsRef, (snap) => {
    const data = snap.val() || {};
    grid.innerHTML = "";
    const keys = Object.keys(data);
    if (!keys.length) {
      if (noPosts) noPosts.style.display = "block";
      return;
    } else {
      if (noPosts) noPosts.style.display = "none";
    }

    keys.reverse().forEach((id) => {
      const p = data[id];
      const card = document.createElement("article");
      card.className = "card";
      const date = new Date(p.fecha || Date.now()).toLocaleDateString("es-VE");
      const tagsText = Array.isArray(p.etiquetas) ? p.etiquetas.join(", ") : "";
      card.innerHTML = `
        <h3>${p.titulo || "Entrada"}</h3>
        <p class="muted">${date} · ${tagsText}</p>
        <p>${p.resumen || ""}</p>
        <a class="button" href="./articulo.html?id=${encodeURIComponent(id)}">Leer más →</a>
      `;
      grid.appendChild(card);
    });
  });
}

// Página: Artículo (detalle)
function loadArticle() {
  const titleEl = document.getElementById("articleTitle");
  const dateEl = document.getElementById("articleDate");
  const tagsEl = document.getElementById("articleTags");
  const contentEl = document.getElementById("articleContent");
  if (!titleEl) return;

  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  if (!id) {
    titleEl.textContent = "Artículo no encontrado";
    return;
  }

  const postRef = ref(db, `entradas/${id}`);
  onValue(postRef, (snap) => {
    const p = snap.val();
    if (!p) {
      titleEl.textContent = "Artículo no encontrado";
      return;
    }
    titleEl.textContent = p.titulo;
    dateEl.textContent = new Date(p.fecha || Date.now()).toLocaleDateString("es-VE");
    tagsEl.textContent = Array.isArray(p.etiquetas) ? p.etiquetas.join(", ") : "";
    // Render básico con saltos de párrafo
    contentEl.innerHTML = (p.contenido || "")
      .split(/\n{2,}/g)
      .map(par => `<p>${par.replace(/\n/g, "<br>")}</p>`)
      .join("");
  });
}

// Página: Libros
function loadBooks() {
  const grid = document.getElementById("booksGrid");
  const noBooks = document.getElementById("noBooks");
  if (!grid) return;

  const booksRef = ref(db, "libros");
  onValue(booksRef, (snap) => {
    const data = snap.val() || {};
    grid.innerHTML = "";
    const keys = Object.keys(data);
    if (!keys.length) {
      if (noBooks) noBooks.style.display = "block";
      return;
    } else {
      if (noBooks) noBooks.style.display = "none";
    }

    keys.forEach((id) => {
      const b = data[id];
      const card = document.createElement("article");
      card.className = "card";
      const img = b.imagen || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80";
      card.innerHTML = `
        <img src="${img}" alt="${b.titulo}" style="border-radius:8px; margin-bottom:10px;" />
        <h3>${b.titulo}</h3>
        <p class="muted">$${Number(b.precio || 0).toFixed(2)}</p>
        <p>${b.descripcion || ""}</p>
        <a class="button" href="#">Comprar</a>
      `;
      grid.appendChild(card);
    });
  });
}

// Página: Contacto
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("contactStatus");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !correo || !asunto || !mensaje) {
      statusEl.textContent = "Completa todos los campos.";
      return;
    }

    const payload = { nombre, correo, asunto, mensaje, fecha: new Date().toISOString() };
    try {
      await push(ref(db, "mensajes"), payload);
      statusEl.textContent = "Mensaje enviado correctamente ✅";
      form.reset();
    } catch (err) {
      statusEl.textContent = "Error al enviar el mensaje.";
      console.error(err);
    }
  });
}

// Init per page
applySiteConfig();
loadPostsList();
loadArticle();
loadBooks();
setupContactForm();