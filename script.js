const CATEGORIAS = {
  Atenção: [
    "bounce",
    "flash",
    "pulse",
    "rubberBand",
    "shakeX",
    "shakeY",
    "headShake",
    "swing",
    "tada",
    "wobble",
    "jello",
    "heartBeat",
  ],
  Entradas: [
    "fadeIn",
    "fadeInUp",
    "fadeInLeft",
    "bounceIn",
    "bounceInDown",
    "zoomIn",
    "slideInLeft",
    "slideInDown",
    "flipInX",
    "flipInY",
    "rotateIn",
    "lightSpeedInRight",
    "backInDown",
    "jackInTheBox",
    "rollIn",
  ],
  Saídas: [
    "fadeOut",
    "fadeOutDown",
    "bounceOut",
    "zoomOut",
    "slideOutRight",
    "flipOutX",
    "rotateOut",
    "hinge",
    "backOutUp",
    "lightSpeedOutLeft",
    "rollOut",
  ],
};
const ATORES = ["🎬", "🎭", "⭐", "🚀", "🦄"];
const $ = (id) => document.getElementById(id);
let cat = "Atenção",
  atual = "bounce";
const titulo = $("titulo");
const letras =
  [..."animate"].map((l) => `<span>${l}</span>`).join("") +
  `<span class="ponto">.</span>` +
  [..."css"].map((l) => `<span class="css">${l}</span>`).join("");
titulo.innerHTML = letras;
const entradas = [
  "backInDown",
  "bounceInUp",
  "flipInX",
  "rotateIn",
  "zoomInDown",
  "lightSpeedInLeft",
  "jackInTheBox",
  "rollIn",
];
function entradaTitulo(anim) {
  [...titulo.children].forEach((s, i) => {
    s.className = "";
    void s.offsetWidth;
    s.style.setProperty("--animate-delay", i * 0.07 + "s");
    s.classList.add("animate__animated", "animate__" + anim);
    s.addEventListener(
      "animationend",
      () => s.classList.remove("animate__animated", "animate__" + anim),
      { once: true },
    );
  });
}
const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelector(".hero").classList.add("pronto");
setTimeout(() => document.querySelector(".hero").classList.add("aberta"), 100);
setTimeout(() => entradaTitulo("backInDown"), reduz ? 0 : 1300);
titulo.addEventListener("click", () =>
  entradaTitulo(entradas[Math.floor(Math.random() * entradas.length)]),
);
[...titulo.children].forEach((s) => (s.style.opacity = 0));
setTimeout(
  () => [...titulo.children].forEach((s) => (s.style.opacity = "")),
  reduz ? 0 : 1300,
);
function desenharAbas() {
  $("abas").innerHTML = Object.keys(CATEGORIAS)
    .map(
      (c) =>
        `<button class="aba" role="tab" aria-selected="${c === cat}" data-c="${c}">${c}</button>`,
    )
    .join("");
}
function desenharChips() {
  $("chips").innerHTML = CATEGORIAS[cat]
    .map(
      (a) =>
        `<button class="chip" aria-pressed="${a === atual}" data-a="${a}">${a}</button>`,
    )
    .join("");
}
function codigo() {
  const d = $("dur").value,
    dl = $("del").value,
    r = $("rep").value;
  let cls = `animate__animated animate__${atual}`;
  if (r === "infinite") cls += " animate__infinite";
  let st = [];
  if (d !== "1") st.push(`--animate-duration: ${d}s`);
  if (dl !== "0") st.push(`--animate-delay: ${dl}s`);
  if (r !== "infinite" && r !== "1") st.push(`--animate-repeat: ${r}`);
  $("codigo").innerHTML =
    `<button class="copiar" id="copiar">Copiar</button>` +
    `&lt;<b>div</b> <i>class</i>="${cls}"` +
    (st.length ? `\n     <i>style</i>="${st.join("; ")}"` : "") +
    `&gt;\n  Meu elemento\n&lt;/<b>div</b>&gt;`;
  $("copiar").onclick = copiar;
}
let textoCopia = "";
function copiar() {
  textoCopia = $("codigo").innerText.replace(/^Copiar\n?/, "");
  const b = $("copiar");
  const ok = () => {
    b.textContent = "Copiado!";
    setTimeout(() => (b.textContent = "Copiar"), 1500);
  };
  try {
    navigator.clipboard.writeText(textoCopia).then(ok);
  } catch (e) {
    b.textContent = "Selecione e copie";
  }
}
function tocar() {
  const a = $("ator");
  a.className = "ator";
  void a.offsetWidth;
  const r = $("rep").value;
  a.style.setProperty("--animate-duration", $("dur").value + "s");
  a.style.setProperty("--animate-delay", $("del").value + "s");
  a.style.setProperty("--animate-repeat", r === "infinite" ? 1 : r);
  a.classList.add("animate__animated", "animate__" + atual);
  if (r === "infinite") a.classList.add("animate__infinite");
  else
    a.addEventListener(
      "animationend",
      () => a.classList.remove("animate__animated", "animate__" + atual),
      { once: true },
    );
  $("nomeAnim").textContent = atual;
}
$("abas").addEventListener("click", (e) => {
  const c = e.target.dataset.c;
  if (!c) return;
  cat = c;
  desenharAbas();
  desenharChips();
});
$("chips").addEventListener("click", (e) => {
  const a = e.target.dataset.a;
  if (!a) return;
  atual = a;
  $("ator").textContent = ATORES[Math.floor(Math.random() * ATORES.length)];
  desenharChips();
  codigo();
  tocar();
});
["dur", "del", "rep"].forEach((id) =>
  $(id).addEventListener("input", () => {
    $("durO").textContent = $("dur").value + "s";
    $("delO").textContent = $("del").value + "s";
    codigo();
    tocar();
  }),
);
$("tocar").onclick = tocar;
$("cena").addEventListener("pointermove", (e) => {
  const r = $("cena").getBoundingClientRect();
  $("cena").style.setProperty(
    "--x",
    ((e.clientX - r.left) / r.width) * 100 + "%",
  );
  $("cena").style.setProperty(
    "--y",
    ((e.clientY - r.top) / r.height) * 100 + "%",
  );
});
desenharAbas();
desenharChips();
codigo();
function animar(el, nome) {
  return new Promise((ok) => {
    const cls = ["animate__animated", "animate__" + nome];
    el.classList.remove(...cls);
    void el.offsetWidth;
    el.classList.add(...cls);
    const fim = (e) => {
      if (e.target !== el) return;
      el.removeEventListener("animationend", fim);
      el.classList.remove(...cls);
      ok();
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
  {
    t: "Importe a biblioteca",
    d: "Dentro do <head>, adicione o link da CDN. É a única “instalação”. Repare que nada se mexe ainda: o animate.css só guarda as animações, você decide quando usá-las.",
    c:
      topo(true) +
      `
  <h1>Olá, mundo!</h1>
</body>
</html>`,
  },
  {
    t: "Adicione as classes",
    d: "Toda animação precisa de duas classes: animate__animated (a base) e animate__nome (qual animação). Aqui usamos bounce.",
    c:
      topo(false) +
      `
§  <h1 class="animate__animated animate__bounce">Olá, mundo!</h1>
</body>
</html>`,
  },
  {
    t: "Troque e combine animações",
    d: "Para mudar o efeito, só troque o nome da classe. Cada elemento pode ter a sua animação: o título chama atenção com tada e o parágrafo entra com fadeInUp.",
    c:
      topo(false) +
      `
§  <h1 class="animate__animated animate__tada">Olá, mundo!</h1>
§  <p class="animate__animated animate__fadeInUp">Esta animação entra de baixo.</p>
</body>
</html>`,
  },
  {
    t: "Controle tempo e repetição",
    d: "Classes utilitárias controlam atraso (delay-2s) e repetição (repeat-2). A duração muda pela variável CSS --animate-duration, direto no style.",
    c:
      topo(false) +
      `
§  <h1 class="animate__animated animate__tada animate__repeat-2"
§      style="--animate-duration: 2s">Olá, mundo!</h1>
§  <p class="animate__animated animate__fadeInUp animate__delay-2s">Esta entra 2s depois.</p>
</body>
</html>`,
  },
  {
    t: "Dispare com JavaScript",
    d: "Para animar com um clique, adicione as classes pelo JS. Ao terminar, o evento animationend remove as classes, deixando o elemento pronto para animar de novo.",
    c:
      topo(false) +
      `
  <h1 id="titulo">Olá, mundo!</h1>
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
</html>`,
  },
  {
    t: "Encadeie uma sequência",
    d: "Transforme o passo anterior em uma função que devolve uma Promise. Com await, uma animação só começa quando a anterior termina. É assim que se monta uma pequena “cena”.",
    c:
      topo(false) +
      `
  <h1 id="titulo">Olá, mundo!</h1>
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
</html>`,
  },
];
const ESTILO_BASE = `<style>body{margin:0;min-height:100vh;display:grid;place-content:center;justify-items:center;gap:14px;background:#2A1850;color:#F5EEFF;font-family:system-ui,sans-serif;text-align:center}h1{font-size:2.6rem;margin:0}p{margin:0}button{padding:10px 22px;border:0;border-radius:99px;background:#FFC857;font-weight:700;cursor:pointer;font-size:1rem}</style>`;
const ESTILO_FORCAR = `<style>.animate__animated{animation-duration:var(--animate-duration,1s)!important;animation-iteration-count:var(--animate-repeat,1)!important}.animate__repeat-1{animation-iteration-count:calc(var(--animate-repeat,1)*1)!important}.animate__repeat-2{animation-iteration-count:calc(var(--animate-repeat,1)*2)!important}.animate__repeat-3{animation-iteration-count:calc(var(--animate-repeat,1)*3)!important}.animate__animated.animate__infinite{animation-iteration-count:infinite!important}.animate__animated[class*="Out"]{opacity:1}</style>`;
let etapa = 0;
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function mostrarEtapa() {
  const e = ETAPAS[etapa];
  $("trilha").innerHTML = ETAPAS.map(
    (x, i) =>
      `<button class="etapa ${i < etapa ? "feita" : ""}" role="tab" aria-selected="${i === etapa}" data-i="${i}"><b>${i + 1}</b>${x.t}</button>`,
  ).join("");
  $("tTitulo").textContent = etapa + 1 + ". " + e.t;
  $("tTexto").textContent = e.d;
  $("tCodigo").innerHTML = e.c
    .split("\n")
    .map((l) =>
      l.startsWith("§")
        ? `<span class="mod">${esc(l.slice(1))}</span>`
        : `<span class="ln">${esc(l)}</span>`,
    )
    .join("");
  $("ant").disabled = etapa === 0;
  $("ant").style.opacity = etapa === 0 ? 0.4 : 1;
  $("prox").textContent =
    etapa === ETAPAS.length - 1 ? "Recomeçar" : "Próxima etapa";
  rodarPrevia();
}
function rodarPrevia() {
  const limpo = ETAPAS[etapa].c.replace(/^§/gm, "");
  $("previa").srcdoc = limpo.replace(
    "</head>",
    ESTILO_BASE +
      (document.documentElement.classList.contains("forcar")
        ? ESTILO_FORCAR
        : "") +
      "</head>",
  );
}
$("trilha").addEventListener("click", (e) => {
  const b = e.target.closest("[data-i]");
  if (b) {
    etapa = +b.dataset.i;
    mostrarEtapa();
  }
});
$("prox").onclick = () => {
  etapa = (etapa + 1) % ETAPAS.length;
  mostrarEtapa();
};
$("ant").onclick = () => {
  if (etapa > 0) {
    etapa--;
    mostrarEtapa();
  }
};
$("rodar").onclick = rodarPrevia;
mostrarEtapa();
$("login").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const em = $("em"),
    sn = $("sn"),
    msg = $("msg");
  const okEmail = /\S+@\S+\.\S+/.test(em.value),
    okSenha = sn.value.length >= 4;
  em.classList.toggle("erro", !okEmail);
  sn.classList.toggle("erro", !okSenha);
  if (!okEmail || !okSenha) {
    msg.textContent = !okEmail
      ? "Digite um e-mail válido, como nome@site.com."
      : "A senha precisa ter pelo menos 4 caracteres.";
    animar($("login"), "shakeX");
    animar(!okEmail ? em : sn, "headShake");
    return;
  }
  msg.textContent = "";
  await animar($("login"), "fadeOutUp");
  $("login").hidden = true;
  $("bemvindo").hidden = false;
  await animar($("bemvindo"), "zoomIn");
  animar($("bvEmoji"), "tada");
});
$("sair").onclick = async () => {
  await animar($("bemvindo"), "fadeOutDown");
  $("bemvindo").hidden = true;
  $("login").hidden = false;
  $("em").value = "";
  $("sn").value = "";
  animar($("login"), "fadeInUp");
};
let curtidas = 0;
$("curtir").onclick = () => {
  $("nCurtir").textContent = ++curtidas;
  animar($("curtir"), "heartBeat");
};
let avisosN = 0;
$("sino").onclick = () => {
  avisosN++;
  const b = $("badge");
  b.textContent = avisosN;
  b.style.display = "block";
  animar($("sino"), "swing");
  animar(b, "bounceIn");
};
const MSG = {
  ok: ["✅", "Trabalho enviado com sucesso!", ""],
  aviso: ["⚠️", "Faltam 2 minutos para a apresentação.", "aviso"],
  erro: ["⛔", "Ops! O professor pediu mais uma animação.", "erro"],
};
document.querySelectorAll("[data-t]").forEach((b) =>
  b.addEventListener("click", () => {
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
      t.addEventListener(
        "animationend",
        () => {
          t.remove();
          if ($("pilha").children.length === 1) $("vazio").style.display = "";
        },
        { once: true },
      );
    }, 3200);
  }),
);

window.addEventListener("load", () => {
  const raiz = document.documentElement;
  const sonda = document.createElement("div");
  sonda.className = "animate__animated animate__bounce";
  sonda.style.cssText = "position:absolute;left:-9999px";
  document.body.appendChild(sonda);
  const carregou = getComputedStyle(sonda).animationName === "bounce";
  sonda.remove();
  const aviso = $("aviso"),
    btn = $("avisoBtn");
  if (!carregou) {
    $("avisoTxt").textContent =
      "O animate.css não carregou da CDN. Confira a internet ou se algum bloqueador está ativo.";
    btn.hidden = true;
    aviso.hidden = false;
    return;
  }
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $("avisoTxt").textContent =
      "Seu sistema está com movimento reduzido, e o animate.css encurta tudo para 1 milissegundo.";
    aviso.hidden = false;
    btn.onclick = () => {
      raiz.classList.add("forcar");
      aviso.hidden = true;
      entradaTitulo("backInDown");
      tocar();
      rodarPrevia();
      atualizarNota();
    };
  }
});

/* ===== Mini jogo ===== */
const PERGUNTAS = [
  {
    p: "Quais são as duas classes que toda animação precisa?",
    o: [
      "animate__animated + animate__nome",
      "animate__start + animate__nome",
      "animate__play + animate__loop",
      "animate__base + animate__go",
    ],
    e: "A base <code>animate__animated</code> liga o motor e a segunda escolhe a animação.",
  },
  {
    p: "Qual evento JavaScript avisa que a animação terminou?",
    o: ["animationend", "animationstop", "transitionend", "onfinish"],
    e: "É o <code>animationend</code>, ideal para remover as classes ou encadear a próxima animação.",
  },
  {
    p: "Como fazer uma animação repetir para sempre?",
    o: [
      "animate__infinite",
      "animate__forever",
      "animate__loop",
      "animate__repeat-all",
    ],
    e: "A classe <code>animate__infinite</code> deixa a animação em loop.",
  },
  {
    p: "Qual variável CSS muda a duração de uma animação?",
    o: [
      "--animate-duration",
      "--animation-time",
      "--animate-speed",
      "--duration-animate",
    ],
    e: "Use <code>--animate-duration</code>, direto no style do elemento.",
  },
  {
    p: "Qual classe faz a animação começar só depois de 2 segundos?",
    o: [
      "animate__delay-2s",
      "animate__wait-2s",
      "animate__after-2s",
      "animate__later-2s",
    ],
    e: "As classes <code>animate__delay-1s</code> a <code>5s</code> controlam o atraso.",
  },
  {
    p: "Como instalar o animate.css sem baixar nada?",
    o: [
      "Com um link de CDN no <head>",
      "Só com npm install",
      "Copiando o JavaScript da biblioteca",
      "Não existe como usar sem baixar",
    ],
    e: "Um <code>&lt;link&gt;</code> da CDN no <code>&lt;head&gt;</code> já basta.",
  },
  {
    p: "Qual animação combina com um erro de formulário?",
    o: ["shakeX", "fadeInUp", "zoomIn", "backInRight"],
    e: "O <code>shakeX</code> balança de um lado para o outro, como um “não” com a cabeça.",
  },
  {
    p: "Qual é o prefixo das classes na versão 4 do animate.css?",
    o: ["animate__", "anim-", "ac-", "animated-"],
    e: "Desde a v4 todas as classes começam com <code>animate__</code>.",
  },
  {
    p: "O que a função animar() devolve para permitir o uso de await?",
    o: ["Uma Promise", "Um número", "Um array", "Um evento"],
    e: "Com uma <code>Promise</code> resolvida no animationend, o await espera a animação acabar.",
  },
  {
    p: "Qual classe deixa a animação mais lenta?",
    o: ["animate__slow", "animate__long", "animate__easy", "animate__soft"],
    e: "Existem <code>animate__slow</code>, <code>slower</code>, <code>fast</code> e <code>faster</code>.",
  },
  {
    p: "O que o animate.css faz quando o sistema pede movimento reduzido?",
    o: [
      "Encurta as animações para quase nada",
      "Troca por animações mais suaves",
      "Nada, ignora a configuração",
      "Bloqueia o carregamento da página",
    ],
    e: "Com <code>prefers-reduced-motion</code> as animações duram 1 milissegundo.",
  },
  {
    p: "Para uma animação de saída, qual par de classes está certo?",
    o: [
      "animate__animated animate__fadeOut",
      "animate__out animate__fade",
      "animate__animated animate__exit",
      "animate__leave animate__fade",
    ],
    e: "As saídas terminam em <code>Out</code>, como <code>fadeOut</code> e <code>bounceOut</code>.",
  },
];
const TOTAL = 8,
  TEMPO = 15;
let jogo = null;
const emb = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const k = Math.floor(Math.random() * (i + 1));
    [a[i], a[k]] = [a[k], a[i]];
  }
  return a;
};
const movimentoOk = () =>
  !reduz || document.documentElement.classList.contains("forcar");
function atualizarNota() {
  $("jNota").hidden = movimentoOk();
}
function recorde() {
  try {
    return +localStorage.getItem("animate-recorde") || 0;
  } catch (e) {
    return 0;
  }
}
function salvarRecorde(v) {
  try {
    localStorage.setItem("animate-recorde", v);
  } catch (e) {}
}
function textoRecorde() {
  const r = recorde();
  return r ? "Seu recorde: " + r + " pontos" : "";
}
function mostrarTela(id) {
  ["telaIni", "telaJogo", "telaFim"].forEach((t) => ($(t).hidden = t !== id));
  animar($(id), "fadeIn");
}
function montarRodada() {
  const txt = emb(
    PERGUNTAS.map((q) => ({
      tipo: "txt",
      p: q.p,
      certa: q.o[0],
      opcoes: emb([...q.o]),
      e: q.e,
    })),
  );
  if (!movimentoOk()) return txt.slice(0, TOTAL);
  const pares = emb(
    Object.entries(CATEGORIAS).flatMap(([c, ns]) => ns.map((n) => [c, n])),
  ).slice(0, TOTAL / 2);
  const anim = pares.map(([c, n]) => ({
    tipo: "anim",
    p: "Que animação é essa?",
    certa: n,
    anim: n,
    opcoes: emb([n, ...emb(CATEGORIAS[c].filter((x) => x !== n)).slice(0, 3)]),
    e: `Era <code>${n}</code>, da categoria ${c}.`,
  }));
  return emb([...anim, ...txt.slice(0, TOTAL / 2)]);
}
function iniciar() {
  jogo = {
    lista: montarRodada(),
    i: 0,
    pts: 0,
    seq: 0,
    acertos: 0,
    resp: false,
    rel: null,
  };
  $("jPts").textContent = 0;
  $("jSeq").textContent = 0;
  mostrarTela("telaJogo");
  mostrarPerg();
}
function mostrarPerg() {
  const q = jogo.lista[jogo.i];
  jogo.resp = false;
  $("jN").textContent = jogo.i + 1;
  $("jPerg").textContent = q.p;
  $("jPalco").hidden = q.tipo !== "anim";
  $("jOpc").innerHTML = q.opcoes
    .map(
      (o, k) =>
        `<button class="opc ${q.tipo === "anim" ? "cod" : ""}" type="button" data-k="${k}"><kbd>${k + 1}</kbd><span>${esc(o)}</span></button>`,
    )
    .join("");
  $("jFb").innerHTML = "";
  $("jProx").hidden = true;
  animar($("jQuadro"), "fadeInRight");
  if (q.tipo === "anim")
    setTimeout(() => {
      if (jogo && jogo.lista[jogo.i] === q) animar($("jAtor"), q.anim);
    }, 450);
  $("arena").focus({ preventScroll: true });
  clearInterval(jogo.rel);
  jogo.fim = Date.now() + TEMPO * 1000;
  jogo.rest = TEMPO;
  $("jTempo").style.width = "100%";
  $("jTempo").classList.remove("urgente");
  jogo.rel = setInterval(() => {
    jogo.rest = Math.max(0, (jogo.fim - Date.now()) / 1000);
    $("jTempo").style.width = (jogo.rest / TEMPO) * 100 + "%";
    $("jTempo").classList.toggle("urgente", jogo.rest < 5);
    if (jogo.rest <= 0) responder(-1);
  }, 100);
}
function responder(k) {
  if (!jogo || jogo.resp) return;
  const q = jogo.lista[jogo.i],
    btns = [...$("jOpc").children];
  if (k >= btns.length) return;
  jogo.resp = true;
  clearInterval(jogo.rel);
  const certaK = q.opcoes.indexOf(q.certa);
  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === certaK) b.classList.add("certa");
    else if (i === k) b.classList.add("errada");
  });
  let fb;
  if (k === certaK) {
    jogo.seq++;
    jogo.acertos++;
    const pts =
      100 +
      Math.round(jogo.rest) * 5 +
      (jogo.seq > 1 ? (jogo.seq - 1) * 25 : 0);
    jogo.pts += pts;
    fb = `<b class="ok">Certo! +${pts} pontos.</b> ${q.e}`;
    animar(btns[k], "pulse");
    animar($("jSeqPill"), "heartBeat");
  } else {
    jogo.seq = 0;
    fb =
      (k === -1
        ? `<b class="no">Tempo esgotado.</b> `
        : `<b class="no">Quase!</b> `) + q.e;
    if (k >= 0) animar(btns[k], "shakeX");
    animar(btns[certaK], "pulse");
  }
  $("jPts").textContent = jogo.pts;
  $("jSeq").textContent = jogo.seq;
  $("jFb").innerHTML = fb;
  const ultima = jogo.i === jogo.lista.length - 1;
  $("jProx").textContent = ultima ? "Ver resultado" : "Próxima";
  $("jProx").hidden = false;
  $("jProx").focus({ preventScroll: true });
}
function proxima() {
  if (jogo.i < jogo.lista.length - 1) {
    jogo.i++;
    mostrarPerg();
  } else fimJogo();
}
function fimJogo() {
  const n = jogo.lista.length,
    a = jogo.acertos,
    r = a / n;
  const rank =
    r === 1
      ? "Mestre do palco!"
      : r >= 0.75
        ? "Estrela da cena"
        : r >= 0.5
          ? "Coadjuvante em ascensão"
          : "Figurante curioso";
  const antigo = recorde(),
    novo = jogo.pts > antigo;
  if (novo) salvarRecorde(jogo.pts);
  $("jRank").textContent = rank;
  $("jRes").textContent = `Você acertou ${a} de ${n} e fez ${jogo.pts} pontos.`;
  $("jRecFim").textContent = novo ? "Novo recorde!" : textoRecorde();
  mostrarTela("telaFim");
  animar($("trofeu"), novo || r >= 0.75 ? "tada" : "bounceIn");
  $("jIniciar").textContent = "Jogar de novo";
  $("jRecIni").textContent = textoRecorde();
}
$("jIniciar").onclick = iniciar;
$("jDeNovo").onclick = iniciar;
$("jProx").onclick = proxima;
$("jRepetir").onclick = () => {
  const q = jogo && jogo.lista[jogo.i];
  if (q && q.anim) animar($("jAtor"), q.anim);
};
$("jOpc").addEventListener("click", (e) => {
  const b = e.target.closest("[data-k]");
  if (b) responder(+b.dataset.k);
});
$("arena").addEventListener("keydown", (e) => {
  if ($("telaJogo").hidden || !/^[1-4]$/.test(e.key)) return;
  responder(+e.key - 1);
});
$("jRecIni").textContent = textoRecorde();
atualizarNota();
