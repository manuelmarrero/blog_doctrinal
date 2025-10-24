// js/admin.js
import { db, ref, onValue, push, remove, set, update } from "./firebase-config.js";

// Navegación de tabs
const tabs = document.querySelectorAll(".admin-nav a");
const sections = document.querySelectorAll(".tab");
tabs.forEach((t) => {
  t.addEventListener("click", (e) => {
    e.preventDefault();
    tabs.forEach(a => a.classList.remove("active"));
    t.classList.add("active");
    const id = t.getAttribute("href");
    sections.forEach(s => s.classList.remove("visible"));
    const target = document.querySelector(id);
    if (target) target.classList.add("visible");
  });
});

// Etiquetas
const tagsListEl = document.getElementById("tagsList");
const addTagBtn = document.getElementById("addTagBtn");
const newTagInput = document.getElementById("newTag");
const tagsRef = ref(db, "etiquetas");
onValue(tagsRef, (snap) => {
  const data = snap.val() || {};
  tagsListEl.innerHTML = "";
  Object.entries(data).forEach(([id, name]) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${name}</span>
      <button class="button" data-id="${id}" data-action="delete">Eliminar</button>
    `;
    tagsListEl.appendChild(li);
  });
});
addTagBtn.addEventListener("click", async () => {
  const name = (newTagInput.value || "").trim();
  if (!name) return;
  await push(tagsRef, name);
  newTagInput.value = "";
});
tagsListEl.addEventListener("click", (e) => {
  if (e.target.matches("button[data-action='delete']")) {
    const id = e.target.getAttribute("data-id");
    remove(ref(db, `etiquetas/${id}`));
  }
});

// Blog: crear nueva entrada
const tagsSelectEl = document.getElementById("tagsSelect");
const postForm = document.getElementById("newPostForm");
const postStatus = document.getElementById("postStatus");
onValue(tagsRef, (snap) => {
  const data = snap.val() || {};
  tagsSelectEl.innerHTML = "";
  Object.entries(data).forEach(([id, name]) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.textContent = name;
    chip.dataset.value = name;
    chip.addEventListener("click", () => chip.classList.toggle("selected"));
    tagsSelectEl.appendChild(chip);
  });
});

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const titulo = document.getElementById("postTitle").value.trim();
  const resumen = document.getElementById("postSummary").value.trim();
  const contenido = document.getElementById("postContent").value.trim();
  const etiquetas = Array.from(tagsSelectEl.querySelectorAll(".chip.selected"))
    .map(ch => ch.dataset.value);

  if (!titulo || !contenido) {
    postStatus.textContent = "Completa el título y el contenido.";
    return;
  }

  const payload = { titulo, resumen, contenido, etiquetas, fecha: new Date().toISOString() };
  try {
    await push(ref(db, "entradas"), payload);
    postStatus.textContent = "Entrada publicada ✅";
    postForm.reset();
    tagsSelectEl.querySelectorAll(".chip.selected").forEach(ch => ch.classList.remove("selected"));
  } catch (err) {
    console.error(err);
    postStatus.textContent = "Error al publicar.";
  }
});

// Entradas publicadas (listar y eliminar)
const postsListEl = document.getElementById("postsList");
const postsRef = ref(db, "entradas");
onValue(postsRef, (snap) => {
  const data = snap.val() || {};
  postsListEl.innerHTML = "";
  Object.entries(data).reverse().forEach(([id, p]) => {
    const date = new Date(p.fecha || Date.now()).toLocaleString("es-VE");
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${p.titulo}</strong><br>
        <span class="muted">${date}</span>
      </div>
      <div>
        <a class="button" href="../articulo.html?id=${encodeURIComponent(id)}" target="_blank">Ver</a>
        <button class="button" data-id="${id}" data-action="delete">Eliminar</button>
      </div>
    `;
    postsListEl.appendChild(li);
  });
});
postsListEl.addEventListener("click", (e) => {
  if (e.target.matches("button[data-action='delete']")) {
    const id = e.target.getAttribute("data-id");
    remove(ref(db, `entradas/${id}`));
  }
});


// Mensajes (listar y eliminar)
const messagesListEl = document.getElementById("messagesList");
const messagesRef = ref(db, "mensajes");
onValue(messagesRef, (snap) => {
  const data = snap.val() || {};
  messagesListEl.innerHTML = "";
  Object.entries(data).reverse().forEach(([id, m]) => {
    const date = new Date(m.fecha || Date.now()).toLocaleString("es-VE");
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${m.nombre}</strong> (${m.correo})<br>
        <em>${m.asunto}</em><br>
        <span class="muted">${date}</span><br>
        <p>${m.mensaje}</p>
      </div>
      <div>
        <button class="button" data-id="${id}" data-action="delete">Eliminar</button>
      </div>
    `;
    messagesListEl.appendChild(li);
  });
});
messagesListEl.addEventListener("click", (e) => {
  if (e.target.matches("button[data-action='delete']")) {
    const id = e.target.getAttribute("data-id");
    remove(ref(db, `mensajes/${id}`));
  }
});

// Configuración del sitio
const configForm = document.getElementById("configForm");
const configStatus = document.getElementById("configStatus");
const configRef = ref(db, "config");
onValue(configRef, (snap) => {
  const c = snap.val() || {};
  const get = id => document.getElementById(id);
  if (get("siteName")) get("siteName").value = c.siteName || "Maestro Manuel Marrero";
  if (get("footerTextInput")) get("footerTextInput").value = c.footerText || "© 2024 Legado Doctrinal...";
  if (get("primaryColor")) get("primaryColor").value = c.primaryColor || "100 100% 12%";
  if (get("secondaryColor")) get("secondaryColor").value = c.secondaryColor || "0 0% 100%";
  if (get("accentColor")) get("accentColor").value = c.accentColor || "207 89% 61%";
  if (get("facebookUrl")) get("facebookUrl").value = c.facebookUrl || "https://facebook.com/";
  if (get("instagramUrl")) get("instagramUrl").value = c.instagramUrl || "https://instagram.com/";
  if (get("tiktokUrl")) get("tiktokUrl").value = c.tiktokUrl || "https://tiktok.com/";
  if (get("twitterUrl")) get("twitterUrl").value = c.twitterUrl || "https://twitter.com/";
});

configForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    siteName: document.getElementById("siteName").value.trim(),
    footerText: document.getElementById("footerTextInput").value.trim(),
    primaryColor: document.getElementById("primaryColor").value.trim(),
    secondaryColor: document.getElementById("secondaryColor").value.trim(),
    accentColor: document.getElementById("accentColor").value.trim(),
    facebookUrl: document.getElementById("facebookUrl").value.trim(),
    instagramUrl: document.getElementById("instagramUrl").value.trim(),
    tiktokUrl: document.getElementById("tiktokUrl").value.trim(),
    twitterUrl: document.getElementById("twitterUrl").value.trim()
  };
  try {
    await set(configRef, payload);
    configStatus.textContent = "Configuración guardada ✅";
    // Aplicar inmediatamente a la UI (solo admin)
    document.documentElement.style.setProperty("--primary", `hsl(${payload.primaryColor})`);
    document.documentElement.style.setProperty("--secondary", `hsl(${payload.secondaryColor})`);
    document.documentElement.style.setProperty("--accent", `hsl(${payload.accentColor})`);
  } catch (err) {
    console.error(err);
    configStatus.textContent = "Error al guardar.";
  }
});


