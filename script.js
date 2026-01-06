/** ===================================================
 *  PORTFÓLIO - JS
 *  - Menu mobile
 *  - Copiar e-mail (Topo + Contato)
 *  - Ano no footer
 *  =================================================== */

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  // Fecha o menu ao clicar em um item
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/** ===================================================
 *  FUNÇÃO UTILITÁRIA - Copiar texto para área de transferência
 *  =================================================== */
async function copyToClipboard(text) {
  // Tenta Clipboard API (precisa de HTTPS ou localhost)
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback para casos onde o clipboard não funciona
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

/** ===================================================
 *  COPIAR E-MAIL (TOPO)
 *  IDs esperados:
 *   - #copyEmail
 *   - #emailText (com data-email="...")
 *  =================================================== */
const copyEmail = document.getElementById("copyEmail");
const emailText = document.getElementById("emailText");

if (copyEmail && emailText) {
  copyEmail.addEventListener("click", async (e) => {
    e.preventDefault();

    const email =
      emailText.getAttribute("data-email") ||
      emailText.textContent.replace("📩", "").trim();

    try {
      await copyToClipboard(email);
      const old = copyEmail.textContent;
      copyEmail.textContent = "E-mail copiado ✅";
      setTimeout(() => (copyEmail.textContent = old || "Copiar e-mail"), 1800);
    } catch {
      alert("Não consegui copiar automaticamente. Copie manualmente: " + email);
    }
  });
}

/** ===================================================
 *  COPIAR E-MAIL (CONTATO)
 *  IDs esperados:
 *   - #copyEmailContato
 *   - #emailContato (com data-email="...")
 *  =================================================== */
const copyEmailContato = document.getElementById("copyEmailContato");
const emailContato = document.getElementById("emailContato");

if (copyEmailContato && emailContato) {
  copyEmailContato.addEventListener("click", async (e) => {
    e.preventDefault();

    const email =
      emailContato.getAttribute("data-email") ||
      emailContato.textContent.replace("📧", "").trim();

    try {
      await copyToClipboard(email);
      const old = copyEmailContato.textContent;
      copyEmailContato.textContent = "Copiado ✅";
      setTimeout(() => (copyEmailContato.textContent = old || "Copiar e-mail"), 1800);
    } catch {
      alert("Não foi possível copiar automaticamente. Copie manualmente: " + email);
    }
  });
}

/** ===================================================
 *  ANO NO FOOTER
 *  =================================================== */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
