const CATEGORIAS = {
  "Atenção": ["bounce","flash","pulse","rubberBand","shakeX","shakeY","headShake","swing","tada","wobble","jello","heartBeat"],
  "Entradas": ["fadeIn","fadeInUp","fadeInLeft","bounceIn","bounceInDown","zoomIn","slideInLeft","slideInDown","flipInX","flipInY","rotateIn","lightSpeedInRight","backInDown","jackInTheBox","rollIn"],
  "Saídas": ["fadeOut","fadeOutDown","bounceOut","zoomOut","slideOutRight","flipOutX","rotateOut","hinge","backOutUp","lightSpeedOutLeft","rollOut"]
};
const ATORES = ["🎬","🎭","⭐","🚀","🦄"];
const $ = id => document.getElementById(id);
let cat = "Atenção", atual = "bounce";
const titulo = $("titulo");
const letras = [..."animate"].map(l => `<span>${l}</span>`).join("") +
  `<span class="ponto">.</span>` + [..."css"].map(l => `<span class="css">${l}</span>`).join("");
titulo.innerHTML = letras;
const entradas = ["backInDown","bounceInUp","flipInX","rotateIn","zoomInDown","lightSpeedInLeft","jackInTheBox","rollIn"];
function entradaTitulo(anim){
  [...titulo.children].forEach((s,i)=>{
    s.className = "";
    void s.offsetWidth;
    s.style.setProperty("--animate-delay", (i*0.07)+"s");
    s.classList.add("animate__animated","animate__"+anim);
    s.addEventListener("animationend",()=>s.classList.remove("animate__animated","animate__"+anim),{once:true});
  });
}
const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelector(".hero").classList.add("pronto");
setTimeout(()=>document.querySelector(".hero").classList.add("aberta"), 100);
setTimeout(()=>entradaTitulo("backInDown"), reduz ? 0 : 1300);
titulo.addEventListener("click",()=>entradaTitulo(entradas[Math.floor(Math.random()*entradas.length)]));
[...titulo.children].forEach(s=>s.style.opacity=0);
setTimeout(()=>[...titulo.children].forEach(s=>s.style.opacity=""), reduz ? 0 : 1300);
function desenharAbas(){
  $("abas").innerHTML = Object.keys(CATEGORIAS).map(c =>
    `<button class="aba" role="tab" aria-selected="${c===cat}" data-c="${c}">${c}</button>`).join("");
}
function desenharChips(){
  $("chips").innerHTML = CATEGORIAS[cat].map(a =>
    `<button class="chip" aria-pressed="${a===atual}" data-a="${a}">${a}</button>`).join("");
}
function codigo(){
  const d = $("dur").value, dl = $("del").value, r = $("rep").value;
  let cls = `animate__animated animate__${atual}`;
  if (r === "infinite") cls += " animate__infinite";
  let st = [];
  if (d !== "1") st.push(`--animate-duration: ${d}s`);
  if (dl !== "0") st.push(`--animate-delay: ${dl}s`);
  if (r !== "infinite" && r !== "1") st.push(`--animate-repeat: ${r}`);
  $("codigo").innerHTML = `<button class="copiar" id="copiar">Copiar</button>` +
    `&lt;<b>div</b> <i>class</i>="${cls}"` + (st.length ? `\n     <i>style</i>="${st.join("; ")}"` : "") + `&gt;\n  Meu elemento\n&lt;/<b>div</b>&gt;`;
  $("copiar").onclick = copiar;
}
let textoCopia = "";
function copiar(){
  textoCopia = $("codigo").innerText.replace(/^Copiar\n?/, "");
  const b = $("copiar");
  const ok = () => { b.textContent = "Copiado!"; setTimeout(()=>b.textContent="Copiar",1500); };
  try { navigator.clipboard.writeText(textoCopia).then(ok); } catch(e){ b.textContent = "Selecione e copie"; }
}
function tocar(){
  const a = $("ator");
  a.className = "ator"; void a.offsetWidth;
  const r = $("rep").value;
  a.style.setProperty("--animate-duration", $("dur").value + "s");
  a.style.setProperty("--animate-delay", $("del").value + "s");
  a.style.setProperty("--animate-repeat", r === "infinite" ? 1 : r);
  a.classList.add("animate__animated", "animate__" + atual);
  if (r === "infinite") a.classList.add("animate__infinite");
  else a.addEventListener("animationend", () => a.classList.remove("animate__animated","animate__"+atual), {once:true});
  $("nomeAnim").textContent = atual;
}
$("abas").addEventListener("click", e => {
  const c = e.target.dataset.c; if(!c) return;
  cat = c; desenharAbas(); desenharChips();
});
$("chips").addEventListener("click", e => {
  const a = e.target.dataset.a; if(!a) return;
  atual = a; $("ator").textContent = ATORES[Math.floor(Math.random()*ATORES.length)];
  desenharChips(); codigo(); tocar();
});
["dur","del","rep"].forEach(id => $(id).addEventListener("input", () => {
  $("durO").textContent = $("dur").value + "s";
  $("delO").textContent = $("del").value + "s";
  codigo(); tocar();
}));
$("tocar").onclick = tocar;
$("cena").addEventListener("pointermove", e => {
  const r = $("cena").getBoundingClientRect();
  $("cena").style.setProperty("--x", ((e.clientX-r.left)/r.width*100)+"%");
  $("cena").style.setProperty("--y", ((e.clientY-r.top)/r.height*100)+"%");
});
desenharAbas(); desenharChips(); codigo();
function animar(el, nome){
  return new Promise(ok => {
    const cls = ["animate__animated", "animate__" + nome];
    el.classList.remove(...cls); void el.offsetWidth;
    el.classList.add(...cls);
    const fim = e => {
      if (e.target !== el) return;
      el.removeEventListener("animationend", fim);
      el.classList.remove(...cls); ok();
    };
    el.addEventListener("animationend", fim);
  });
}
const CDN = `§  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">`;
const CDN0 = CDN.slice(1);
const topo = (marca) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
${marca ? CDN : CDN0}
</head>
<body>`;
const ETAPAS = [
  { t:"Importe a biblioteca",
    d:"Dentro do <head>, adicione o link da CDN. É a única “instalação”. Repare que nada se mexe ainda: o animate.css só guarda as animações, você decide quando usá-las.",
    c: topo(true) + `
  <h1>Olá, banca!</h1>
</body>
</html>` },
  { t:"Adicione as classes",
    d:"Toda animação precisa de duas classes: animate__animated (a base) e animate__nome (qual animação). Aqui usamos bounce.",
    c: topo(false) + `
§  <h1 class="animate__animated animate__bounce">Olá, banca!</h1>
</body>
</html>` },
  { t:"Troque e combine animações",
    d:"Para mudar o efeito, só troque o nome da classe. Cada elemento pode ter a sua animação: o título chama atenção com tada e o parágrafo entra com fadeInUp.",
    c: topo(false) + `
§  <h1 class="animate__animated animate__tada">Olá, banca!</h1>
§  <p class="animate__animated animate__fadeInUp">Esta animação entra de baixo.</p>
</body>
</html>` },
  { t:"Controle tempo e repetição",
    d:"Classes utilitárias controlam atraso (delay-2s) e repetição (repeat-2). A duração muda pela variável CSS --animate-duration, direto no style.",
    c: topo(false) + `
§  <h1 class="animate__animated animate__tada animate__repeat-2"
§      style="--animate-duration: 2s">Olá, banca!</h1>
§  <p class="animate__animated animate__fadeInUp animate__delay-2s">Esta entra 2s depois.</p>
</body>
</html>` },
  { t:"Dispare com JavaScript",
    d:"Para animar com um clique, adicione as classes pelo JS. Ao terminar, o evento animationend remove as classes, deixando o elemento pronto para animar de novo.",
    c: topo(false) + `
  <h1 id="titulo">Olá, banca!</h1>
§  <button id="btn">Animar</button>
§  <script>
§    const titulo = document.getElementById('titulo');
§    document.getElementById('btn').addEventListener('click', () => {
§      titulo.classList.add('animate__animated', 'animate__rubberBand');
§      titulo.addEventListener('animationend', () => {
§        titulo.classList.remove('animate__animated', 'animate__rubberBand');
§      }, { once: true });
§    });
§  </script>
</body>
</html>` },
  { t:"Encadeie uma sequência",
    d:"Transforme o passo anterior em uma função que devolve uma Promise. Com await, uma animação só começa quando a anterior termina. É assim que se monta uma pequena “cena”.",
    c: topo(false) + `
  <h1 id="titulo">Olá, banca!</h1>
  <button id="btn">Animar</button>
  <script>
§    const animar = (el, nome) => new Promise(ok => {
§      el.classList.add('animate__animated', 'animate__' + nome);
§      el.addEventListener('animationend', () => {
§        el.classList.remove('animate__animated', 'animate__' + nome);
§        ok();
§      }, { once: true });
§    });
§
§    btn.addEventListener('click', async () => {
§      await animar(titulo, 'zoomOut');
§      titulo.textContent = 'Obrigado!';
§      await animar(titulo, 'zoomIn');
§      await animar(titulo, 'tada');
§    });
  </script>
</body>
</html>` }
];
const ESTILO_BASE = `<style>body{margin:0;min-height:100vh;display:grid;place-content:center;justify-items:center;gap:14px;background:#2A1850;color:#F5EEFF;font-family:system-ui,sans-serif;text-align:center}h1{font-size:2.6rem;margin:0}p{margin:0}button{padding:10px 22px;border:0;border-radius:99px;background:#FFC857;font-weight:700;cursor:pointer;font-size:1rem}</style>`;
const ESTILO_FORCAR = `<style>.animate__animated{animation-duration:var(--animate-duration,1s)!important;animation-iteration-count:var(--animate-repeat,1)!important}.animate__repeat-1{animation-iteration-count:calc(var(--animate-repeat,1)*1)!important}.animate__repeat-2{animation-iteration-count:calc(var(--animate-repeat,1)*2)!important}.animate__repeat-3{animation-iteration-count:calc(var(--animate-repeat,1)*3)!important}.animate__animated.animate__infinite{animation-iteration-count:infinite!important}.animate__animated[class*="Out"]{opacity:1}</style>`;
let etapa = 0;
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function mostrarEtapa(){
  const e = ETAPAS[etapa];
  $("trilha").innerHTML = ETAPAS.map((x,i) =>
    `<button class="etapa ${i<etapa?"feita":""}" role="tab" aria-selected="${i===etapa}" data-i="${i}"><b>${i+1}</b>${x.t}</button>`).join("");
  $("tTitulo").textContent = (etapa+1) + ". " + e.t;
  $("tTexto").textContent = e.d;
  $("tCodigo").innerHTML = e.c.split("\n").map(l =>
    l.startsWith("§") ? `<span class="mod">${esc(l.slice(1))}</span>` : `<span class="ln">${esc(l)}</span>`).join("");
  $("ant").disabled = etapa === 0; $("ant").style.opacity = etapa === 0 ? .4 : 1;
  $("prox").textContent = etapa === ETAPAS.length-1 ? "Recomeçar" : "Próxima etapa";
  rodarPrevia();
}
function rodarPrevia(){
  const limpo = ETAPAS[etapa].c.replace(/^§/gm, "");
  $("previa").srcdoc = limpo.replace("</head>", ESTILO_BASE + (document.documentElement.classList.contains("forcar") ? ESTILO_FORCAR : "") + "</head>");
}
$("trilha").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if(b){ etapa = +b.dataset.i; mostrarEtapa(); }});
$("prox").onclick = () => { etapa = (etapa+1) % ETAPAS.length; mostrarEtapa(); };
$("ant").onclick = () => { if(etapa>0){ etapa--; mostrarEtapa(); } };
$("rodar").onclick = rodarPrevia;
mostrarEtapa();
$("login").addEventListener("submit", async ev => {
  ev.preventDefault();
  const em = $("em"), sn = $("sn"), msg = $("msg");
  const okEmail = /\S+@\S+\.\S+/.test(em.value), okSenha = sn.value.length >= 4;
  em.classList.toggle("erro", !okEmail); sn.classList.toggle("erro", !okSenha);
  if (!okEmail || !okSenha){
    msg.textContent = !okEmail ? "Digite um e-mail válido, como nome@site.com." : "A senha precisa ter pelo menos 4 caracteres.";
    animar($("login"), "shakeX");
    animar(!okEmail ? em : sn, "headShake");
    return;
  }
  msg.textContent = "";
  await animar($("login"), "fadeOutUp");
  $("login").hidden = true; $("bemvindo").hidden = false;
  await animar($("bemvindo"), "zoomIn");
  animar($("bvEmoji"), "tada");
});
$("sair").onclick = async () => {
  await animar($("bemvindo"), "fadeOutDown");
  $("bemvindo").hidden = true; $("login").hidden = false;
  $("em").value = ""; $("sn").value = "";
  animar($("login"), "fadeInUp");
};
let curtidas = 0;
$("curtir").onclick = () => { $("nCurtir").textContent = ++curtidas; animar($("curtir"), "heartBeat"); };
let avisosN = 0;
$("sino").onclick = () => {
  avisosN++; const b = $("badge");
  b.textContent = avisosN; b.style.display = "block";
  animar($("sino"), "swing"); animar(b, "bounceIn");
};
const MSG = {
  ok:["✅","Trabalho enviado com sucesso!",""],
  aviso:["⚠️","Faltam 2 minutos para a apresentação.","aviso"],
  erro:["⛔","Ops! O professor pediu mais uma animação.","erro"]
};
document.querySelectorAll("[data-t]").forEach(b => b.addEventListener("click", () => {
  const [ico, txt, cls] = MSG[b.dataset.t];
  const t = document.createElement("div");
  t.className = `toast ${cls} animate__animated animate__backInRight`;
  t.innerHTML = `<span>${ico}</span><span>${txt}</span>`;
  $("vazio").style.display = "none";
  $("pilha").appendChild(t);
  if ($("pilha").children.length > 5) $("pilha").children[1].remove();
  setTimeout(() => {
    t.classList.remove("animate__backInRight");
    t.classList.add("animate__backOutRight");
    t.addEventListener("animationend", () => {
      t.remove();
      if ($("pilha").children.length === 1) $("vazio").style.display = "";
    }, {once:true});
  }, 3200);
}));

window.addEventListener("load", () => {
  const raiz = document.documentElement;
  const sonda = document.createElement("div");
  sonda.className = "animate__animated animate__bounce";
  sonda.style.cssText = "position:absolute;left:-9999px";
  document.body.appendChild(sonda);
  const carregou = getComputedStyle(sonda).animationName === "bounce";
  sonda.remove();
  const aviso = $("aviso"), btn = $("avisoBtn");
  if (!carregou) {
    $("avisoTxt").textContent = "O animate.css não carregou da CDN. Confira a internet ou se algum bloqueador está ativo.";
    btn.hidden = true;
    aviso.hidden = false;
    return;
  }
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $("avisoTxt").textContent = "Seu sistema está com movimento reduzido, e o animate.css encurta tudo para 1 milissegundo.";
    aviso.hidden = false;
    btn.onclick = () => {
      raiz.classList.add("forcar");
      aviso.hidden = true;
      entradaTitulo("backInDown");
      tocar();
      rodarPrevia();
    };
  }
});