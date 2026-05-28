const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const question = document.getElementById("question");
const answerLine = document.getElementById("answerLine");
const proofLine = document.getElementById("proofLine");
const downloadBtn = document.getElementById("downloadBtn");
const againBtn = document.getElementById("againBtn");
const card = document.getElementById("card");

let noDodges = 0;

function showResult(answer) {
  question.classList.add("hidden");
  result.classList.remove("hidden");

  const now = new Date();
  const stamp = now.toLocaleString("es-CL", { hour12: false });

  if (answer === "sí") {
    answerLine.textContent = "Coni dijo: SÍ 💖✨";
    proofLine.textContent = `Confirmado el ${stamp}. Ahora envíame esta captura 😳`;
  } else {
    answerLine.textContent = "Coni dijo: NO 🙃";
    proofLine.textContent = `Registrado el ${stamp}. (igual te tengo cariño)`;
  }
}

yesBtn.addEventListener("click", () => showResult("sí"));

// Botón NO se mueve (juguetón)
noBtn.addEventListener("mouseenter", () => {
  noDodges += 1;

  const parent = noBtn.parentElement;
  const pr = parent.getBoundingClientRect();
  const br = noBtn.getBoundingClientRect();

  // límites para que no se salga del contenedor
  const maxX = pr.width - br.width;
  const maxY = pr.height - br.height;

  const x = Math.max(0, Math.min(maxX, Math.random() * maxX));
  const y = Math.max(0, Math.min(maxY, Math.random() * maxY));

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  if (noDodges === 3) noBtn.textContent = "¿Segura? 😅";
  if (noDodges === 6) noBtn.textContent = "Ya po… 🙈";
  if (noDodges >= 9) noBtn.textContent = "Ok, te dejo 😌";
});

// Si logra hacer click en NO, igual se registra
noBtn.addEventListener("click", () => showResult("no"));

// Descargar “pantallazo” del card como imagen
downloadBtn.addEventListener("click", async () => {
  // html2canvas viene desde el CDN del index.html
  const canvas = await html2canvas(card, {
    scale: 2,
    backgroundColor: null
  });

  const link = document.createElement("a");
  link.download = "coni-prepololeo.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

againBtn.addEventListener("click", () => {
  // reset simple
  result.classList.add("hidden");
  question.classList.remove("hidden");
  noDodges = 0;
  noBtn.textContent = "No 🙃";
  noBtn.style.position = "static";
  noBtn.style.left = "";
  noBtn.style.top = "";
});