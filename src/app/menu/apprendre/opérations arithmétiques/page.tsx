"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type OpName = "Addition" | "Soustraction" | "Multiplication" | "Division";
type DivExplainMode = "reste" | "fraction"; // priorité: "reste"

interface Topic {
  name: OpName;
  description: string;
  formula?: string;
  example?: string;
}

const TOPICS: Topic[] = [
  {
    name: "Addition",
    description:
      "Additionner, c’est réunir des quantités. Sur une ligne de nombres, on avance vers la droite.",
    formula: "A + B",
    example: "Ex. A = 3, B = 5 → 3 + 5 = 8",
  },
  {
    name: "Soustraction",
    description:
      "Soustraire, c’est enlever ou comparer. Sur une ligne de nombres, on recule vers la gauche.",
    formula: "A − B",
    example: "Ex. A = 8, B = 5 → 8 − 5 = 3",
  },
  {
    name: "Multiplication",
    description:
      "Multiplier, c’est additionner plusieurs fois la même quantité. Illustration : tableau de points A × B.",
    formula: "A × B",
    example: "Ex. A = 3, B = 4 → 3 × 4 = 12",
  },
  {
    name: "Division",
    description:
      "Diviser, c’est partager entre amis en parts égales ou mesurer combien de fois B tient dans A.",
    // Pas de formule/exemple ici : on privilégie une mise en page adaptée aux enfants
  },
];

// ---------- Utils ----------
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function normalizeNumber(s: string) {
  return s.replace(",", ".").trim();
}
function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}
function toMixedFraction(a: number, b: number) {
  if (b === 0) return { q: 0, r: 0, den: 0, text: "Indéfini" };
  const q = Math.floor(a / b);
  const r0 = a % b;
  if (r0 === 0) return { q, r: 0, den: 1, text: `${q}` };
  const d = gcd(r0, b);
  const r = r0 / d;
  const den = b / d;
  const prettyMap: Record<string, string> = {
    "1/2": "½",
    "1/3": "⅓",
    "2/3": "⅔",
    "1/4": "¼",
    "3/4": "¾",
  };
  const fracStr = `${r}/${den}`;
  const pretty = prettyMap[fracStr] ? `${q} ${prettyMap[fracStr]}` : `${q} + ${r}/${den}`;
  return { q, r, den, text: pretty };
}

// ---------- Calcul + étapes ----------
function compute(op: OpName, a: number, b: number) {
  let result: number | string = 0;
  const steps: string[] = [];

  if (op === "Addition") {
    steps.push(`On part de ${a} et on ajoute ${b}.`);
    result = a + b;
    steps.push(`${a} + ${b} = ${result}.`);
  } else if (op === "Soustraction") {
    steps.push(`On part de ${a} et on enlève ${b}.`);
    result = a - b;
    steps.push(`${a} − ${b} = ${result}.`);
  } else if (op === "Multiplication") {
    steps.push(`On additionne ${a} fois la même quantité ${b} (ou ${b} fois ${a}).`);
    result = a * b;
    steps.push(`${a} × ${b} = ${result}.`);
  } else {
    if (b === 0) {
      steps.push("On ne peut pas diviser par 0.");
      result = "Indéfini (division par 0)";
    } else {
      const q = Math.floor(a / b);
      const r = a % b;
      steps.push(`On partage ${a} billes en ${b} boîtes (amis).`);
      steps.push(`${a} ÷ ${b} = ${q} reste ${r}.`);
      result = r === 0 ? q : `${q} reste ${r}`;
    }
  }
  return { result, steps };
}

// ---------- SVG : commun ----------
function Dot({ cx, cy, r = 5, fill = "#2563EB" }: { cx: number; cy: number; r?: number; fill?: string }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} />;
}

// ---------- Division : boîtes d’amis (mode “reste”) ----------
function FriendsBoxesRemainder({ total, friends }: { total: number; friends: number }) {
  const f = Math.max(1, friends);
  const q = Math.floor(friends === 0 ? 0 : total / f);
  const r = friends === 0 ? total : total % f;

  const cols = Math.min(4, f);
  const rows = Math.ceil(f / cols);
  const boxW = 140;
  const boxH = 120;
  const gap = 16;
  const W = cols * boxW + (cols + 1) * gap;
  const H = rows * boxH + (rows + 2) * gap + (r > 0 ? boxH : 0);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-3xl">
      {Array.from({ length: f }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = gap + col * (boxW + gap);
        const y = gap + row * (boxH + gap);

        // Chaque ami reçoit exactement q billes. Le reste va dans une boîte spéciale en bas.
        const dots = q;
        const perRow = Math.ceil(Math.sqrt(Math.max(dots, 1)));
        const cell = 16;
        const padding = 16; 

        return (
          <g key={i}>
            <rect x={x} y={y} width={boxW} height={boxH} rx={14} ry={14} fill="#FFFFFF" stroke="#D1D5DB" />
            {/* Titre */}
            <text x={x + 10} y={y + 20} fontSize={12} fill="#111827" fontWeight={600}>
              Ami {i + 1}
            </text>
            {/* Billes */}
            {Array.from({ length: dots }).map((__, k) => {
              const rr = Math.floor(k / perRow);
              const cc = k % perRow;
              const cx = x + padding + cc * cell;
              const cy = y + 36 + rr * cell;
              return <Dot key={k} cx={cx} cy={cy} r={5} />;
            })}
            {/* Compteur */}
            <text x={x + boxW - 10} y={y + boxH - 10} fontSize={12} fill="#374151" textAnchor="end">
              {dots} bille{dots > 1 ? "s" : ""}
            </text>
          </g>
        );
      })}

      {/* Boîte Reste (si r > 0) */}
      {r > 0 && (
        <g>
          <rect
            x={gap}
            y={rows * (boxH + gap) + gap}
            width={W - 2 * gap}
            height={boxH}
            rx={14}
            ry={14}
            fill="#FFF7ED"
            stroke="#FDBA74"
          />
          <text x={gap + 12} y={rows * (boxH + gap) + gap + 24} fontSize={12} fill="#9A3412" fontWeight={700}>
            Reste
          </text>
          {/* Billes du reste */}
          {Array.from({ length: r }).map((__, k) => {
            const perRow = 16;
            const cell = 16;
            const padding = 16;
            const x0 = gap + 10;
            const y0 = rows * (boxH + gap) + gap + 36;
            const rr = Math.floor(k / perRow);
            const cc = k % perRow;
            const cx = x0 + cc * cell;
            const cy = y0 + rr * cell;
            return <Dot key={k} cx={cx} cy={cy} r={5} fill="#F97316" />;
          })}
          <text
            x={W - gap - 12}
            y={rows * (boxH + gap) + gap + boxH - 10}
            fontSize={12}
            fill="#9A3412"
            textAnchor="end"
          >
            {r} bille{r > 1 ? "s" : ""} à partager
          </text>
        </g>
      )}
    </svg>
  );
}


// ---------- Division : vue fractionnaire ----------
function FriendsFraction({ total, friends }: { total: number; friends: number }) {
  const f = Math.max(1, friends);
  const { q, r, den } = toMixedFraction(total, f);

  // On montre q billes pleines par ami + une barre fractionnaire expliquant r/den pour chacun.
  const cols = Math.min(4, f);
  const rows = Math.ceil(f / cols);
  const boxW = 160;
  const boxH = 140;
  const gap = 16;
  const W = cols * boxW + (cols + 1) * gap;
  const H = rows * boxH + (rows + 1) * gap + 90; // espace barre fraction

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-3xl">
      {Array.from({ length: f }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = gap + col * (boxW + gap);
        const y = gap + row * (boxH + gap);

        // q billes pleines + un petit ruban fractionnaire r/den
        const dots = q;
        const perRow = Math.ceil(Math.sqrt(Math.max(dots, 1)));
        const cell = 16;
        const pad = 16;

        return (
          <g key={i}>
            <rect x={x} y={y} width={boxW} height={boxH} rx={14} ry={14} fill="#FFFFFF" stroke="#D1D5DB" />
            <text x={x + 10} y={y + 20} fontSize={12} fill="#111827" fontWeight={600}>
              Ami {i + 1}
            </text>
            {/* Billes entières */}
            {Array.from({ length: dots }).map((__, k) => {
              const rr2 = Math.floor(k / perRow);
              const cc2 = k % perRow;
              const cx = x + pad + cc2 * cell;
              const cy = y + 36 + rr2 * cell;
              return <Dot key={k} cx={cx} cy={cy} r={5} />;
            })}
            {/* Ruban fractionnaire r/den */}
            {r > 0 && (
              <>
                <rect
                  x={x + pad}
                  y={y + boxH - 28}
                  width={boxW - pad * 2}
                  height={10}
                  rx={5}
                  fill="#E5E7EB"
                />
                {/* on remplit r/den de la barre */}
                <rect
                  x={x + pad}
                  y={y + boxH - 28}
                  width={(boxW - pad * 2) * (r / den)}
                  height={10}
                  rx={5}
                  fill="#60A5FA"
                />
                <text
                  x={x + boxW - pad}
                  y={y + boxH - 34}
                  fontSize={10}
                  fill="#374151"
                  textAnchor="end"
                >
                  + {r}/{den} de bille
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* Légende fraction globale */}
      <g>
        <text x={W / 2} y={H - 60} textAnchor="middle" fontSize={14} fill="#111827" fontWeight={600}>
          Partage équitable des restes : chaque ami reçoit {r === 0 ? "une part entière" : `+ ${r}/${den}`} en plus.
        </text>
        <FractionBar x={W / 2 - 160} y={H - 45} width={320} height={16} r={r} den={den} />
        <text x={W / 2} y={H - 16} textAnchor="middle" fontSize={12} fill="#374151">
          (Représentation du morceau {r}/{den})
        </text>
      </g>
    </svg>
  );
}

function FractionBar({
  x,
  y,
  width,
  height,
  r,
  den,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  r: number;
  den: number;
}) {
  if (den === 0) return null;
  const segW = width / den;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={6} fill="#F3F4F6" stroke="#D1D5DB" />
      {Array.from({ length: den }).map((_, i) => (
        <rect
          key={i}
          x={x + i * segW + 2}
          y={y + 2}
          width={segW - 4}
          height={height - 4}
          fill={i < r ? "#60A5FA" : "#FFFFFF"}
          stroke="#E5E7EB"
        />
      ))}
    </g>
  );
}

// ---------- Autres SVG (addition, soustraction, multiplication) ----------
function NumberLine({
  a,
  b,
  mode,
}: {
  a: number;
  b: number;
  mode: "add" | "sub";
}) {
  const start = 0;
  const end = Math.max(
    a,
    mode === "add" ? a + Math.max(0, b) : a,
    mode === "sub" ? Math.max(0, a - Math.max(0, b)) : a
  );
  const W = 640;
  const H = 160;
  const L = 40;
  const R = 600;
  const Y = 100;
  const scale = (x: number) => L + (x / Math.max(1, end - start)) * (R - L);

  const jumpFrom = a;
  const jumpTo = mode === "add" ? a + b : a - b;
  const arcY = 60;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl">
      <line x1={L} y1={Y} x2={R} y2={Y} stroke="#111827" strokeWidth={2} />
      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((v) => (
        <g key={v}>
          <line x1={scale(v)} y1={Y - 6} x2={scale(v)} y2={Y + 6} stroke="#111827" />
          <text x={scale(v)} y={Y + 22} fontSize={12} textAnchor="middle" fill="#111827">
            {v}
          </text>
        </g>
      ))}
      <circle cx={scale(a)} cy={Y} r={4} fill="#2563EB" />
      {b !== 0 && (
        <>
          <path
            d={`M ${scale(jumpFrom)} ${Y}
               C ${scale(jumpFrom)} ${arcY}, ${scale(jumpTo)} ${arcY}, ${scale(jumpTo)} ${Y}`}
            fill="none"
            stroke="#2563EB"
            strokeWidth={2}
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#2563EB" />
            </marker>
          </defs>
        </>
      )}
      <text
        x={scale((jumpFrom + jumpTo) / 2)}
        y={arcY - 6}
        fontSize={12}
        textAnchor="middle"
        fill="#2563EB"
      >
        {mode === "add" ? `+${b}` : `−${b}`}
      </text>
    </svg>
  );
}

function DotArray({ rows, cols }: { rows: number; cols: number }) {
  const cell = 24;
  const pad = 24;
  const W = cols * cell + pad * 2;
  const H = rows * cell + pad * 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xl border border-gray-200 rounded">
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => (
          <circle key={`${r}-${c}`} cx={pad + c * cell} cy={pad + r * cell} r={6} fill="#2563EB" />
        ))
      )}
      <text x={W / 2} y={H - 6} fontSize={12} textAnchor="middle" fill="#111827">
        {rows} ligne(s) × {cols} colonne(s) = {rows * cols}
      </text>
    </svg>
  );
}

// ---------- Page ----------
export default function OperationsLearning() {
  const [selected, setSelected] = useState<Topic | null>(TOPICS[0]);
  const [a, setA] = useState(8);
  const [b, setB] = useState(3);
  const [mode, setMode] = useState<"Apprendre" | "Pratique">("Apprendre");
  const [divExplain, setDivExplain] = useState<DivExplainMode>("reste"); // priorité “reste”

  const opName = selected?.name ?? "Addition";
  const { result, steps } = useMemo(() => compute(opName, a, b), [opName, a, b]);

  const [answer, setAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  function randomize() {
    if (!selected) return;
    if (selected.name === "Division") {
      setA(randInt(4, 60));
      setB(randInt(2, 9));
    } else if (selected.name === "Multiplication") {
      setA(randInt(2, 12));
      setB(randInt(2, 12));
    } else {
      setA(randInt(0, 30));
      setB(randInt(0, 30));
    }
    setFeedback("");
    setAnswer("");
  }

  function checkAnswer() {
    if (!selected) return;
    if (selected.name === "Division") {
      const q = Math.floor(b === 0 ? 0 : a / b);
      const r = b === 0 ? a : a % b;
      const normalized = answer.trim().toLowerCase();
      const mf = toMixedFraction(a, b);
      const okRemainder =
        (r === 0 && normalized === String(q)) ||
        normalized === `${q} reste ${r}` ||
        normalized === `${q} r ${r}` ||
        normalized === `${q} rem ${r}`;
      const okFraction =
        normalized === mf.text.replace(" + ", " ").replace(" ", " ").toLowerCase() ||
        normalized === `${q} + ${mf.r}/${mf.den}`.toLowerCase() ||
        normalized === `${q} ${mf.r}/${mf.den}`.toLowerCase();
      setFeedback(okRemainder || okFraction ? "Correct." : "À revoir.");
    } else {
      const expected =
        selected.name === "Addition" ? a + b : selected.name === "Soustraction" ? a - b : a * b;
      setFeedback(Number(normalizeNumber(answer)) === expected ? "Correct." : "À revoir.");
    }
  }

  return (
    <main className="flex h-screen overflow-y-auto bg-gray-100 text-black relative">
      {/* Bouton Retour */}
      <Link
        href="/menu/apprendre"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Colonne gauche */}
      <aside className="w-full md:w-1/4 bg-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Opérations arithmétiques</h1>
        <p className="text-lg mb-6">
          Sélectionne une opération et manipule A et B. Illustrations 100% SVG.
        </p>

        <div className="flex flex-col gap-3 mb-6">
          {TOPICS.map((t) => (
            <button
              key={t.name}
              className={`py-2 px-6 rounded font-bold text-left ${
                selected?.name === t.name
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
              onClick={() => {
                setSelected(t);
                setFeedback("");
                setAnswer("");
              }}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <label className="flex flex-col text-sm">
            <span className="mb-1 font-medium">A</span>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              className="border rounded px-2 py-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            <span className="mb-1 font-medium">B</span>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="border rounded px-2 py-1"
            />
          </label>
        </div>

        <div className="flex gap-2">
          <button onClick={randomize} className="bg-gray-800 text-white px-4 py-2 rounded">
            Random
          </button>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setMode("Apprendre")}
              className={`px-3 py-2 rounded ${
                mode === "Apprendre" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700"
              }`}
            >
              Apprendre
            </button>
            <button
              onClick={() => {
                setMode("Pratique");
                setFeedback("");
                setAnswer("");
              }}
              className={`px-3 py-2 rounded ${
                mode === "Pratique" ? "bg-purple-600 text-white" : "bg-purple-50 text-purple-700"
              }`}
            >
              Pratique
            </button>
          </div>
        </div>
      </aside>

      {/* Colonne droite */}
      <section className="w-full md:w-3/4 p-6 md:p-10 flex flex-col items-center overflow-y-auto">
        {selected && (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg mt-10 w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-2">{selected.name}</h2>
            <p className="text-gray-700 mb-4">{selected.description}</p>

            {/* --- Division : Mise en page spéciale enfants --- */}
            {selected.name === "Division" ? (
              <>
                {/* Étapes EN HAUT */}
                <div className="bg-gray-50 rounded p-4 mb-6">
                  <h3 className="text-xl font-semibold mb-2">Étapes</h3>
                  <ol className="list-decimal space-y-1 pl-6">
                    {/* On réécrit les étapes pour la division avec un wording enfant */}
                    {b === 0 ? (
                      <>
                        <li>On ne peut pas partager en 0 amis.</li>
                        <li>La division par 0 est impossible.</li>
                      </>
                    ) : divExplain === "reste" ? (
                      <>
                        <li>On crée {b} boîtes, une pour chaque ami.</li>
                        <li>On met la même quantité de billes dans chaque boîte.</li>
                        <li>Les billes qui restent vont dans la boîte “Reste”.</li>
                      </>
                    ) : (
                      <>
                        <li>On partage d’abord des billes entières également.</li>
                        <li>On coupe les billes restantes en {b} parts égales.</li>
                        <li>Chaque ami reçoit la même petite part en plus.</li>
                      </>
                    )}
                  </ol>

                  {/* Résultat selon le mode d’explication */}
                  <div className="mt-3">
                    {b === 0 ? (
                      <p className="text-red-700 font-semibold">Résultat : Indéfini (division par 0)</p>
                    ) : divExplain === "reste" ? (
                      (() => {
                        const q = Math.floor(a / b);
                        const r = a % b;
                        return (
                          <p>
                            Résultat : <span className="font-bold">{q} reste {r}</span>
                          </p>
                        );
                      })()
                    ) : (
                      (() => {
                        const mf = toMixedFraction(a, b);
                        return (
                          <p>
                            Résultat :{" "}
                            <span className="font-bold">{mf.text}</span>{" "}
                            <span className="text-gray-500">(soit {a}/{b})</span>
                          </p>
                        );
                      })()
                    )}
                  </div>

                  {/* Choix de l’explication */}
                  <div className="mt-4 flex gap-2">
                    <button
                      className={`px-3 py-2 rounded ${
                        divExplain === "reste" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700"
                      }`}
                      onClick={() => setDivExplain("reste")}
                    >
                      Partage avec reste (priorité)
                    </button>
                    <button
                      className={`px-3 py-2 rounded ${
                        divExplain === "fraction" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700"
                      }`}
                      onClick={() => setDivExplain("fraction")}
                    >
                      Nombre fractionnaire
                    </button>
                  </div>
                </div>

                {/* VISUELS */}
                <div className="mb-2">
                  {b > 0 &&
                    (divExplain === "reste" ? (
                      <FriendsBoxesRemainder total={a} friends={b} />
                    ) : (
                      <FriendsFraction total={a} friends={b} />
                    ))}
                </div>

                {/* Mode pratique pour Division */}
                {mode === "Pratique" && (
                  <div className="mt-6 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-3">Pratique</h3>
                    <p className="mb-3">
                      Réponds avec <code>q reste r</code>, ou en nombre mixte (ex. <code>2 ⅔</code>).
                    </p>
                    <div className="flex flex-wrap gap-3 items-center">
                      <span className="text-lg font-medium">
                        {a} ÷ {b} ={" "}
                      </span>
                      <input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder={"ex: 2 reste 1  •  ou  2 1/3"}
                        className="border rounded px-3 py-2 w-64"
                      />
                      <button onClick={checkAnswer} className="bg-blue-600 text-white px-4 py-2 rounded">
                        Vérifier
                      </button>
                      {feedback && (
                        <span
                          className={
                            feedback === "Correct."
                              ? "text-emerald-700 font-semibold"
                              : "text-red-700 font-semibold"
                          }
                        >
                          {feedback}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              // --- Autres opérations (structure précédente) ---
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded p-4">
                    <h3 className="text-xl font-semibold mb-2">Formule</h3>
                    <p className="text-lg">{selected.formula}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-4">
                    <h3 className="text-xl font-semibold mb-2">Exemple</h3>
                    <p className="text-lg">{selected.example}</p>
                  </div>
                </div>

                {/* Viz */}
                <div className="mb-6">
                  {selected.name === "Addition" && <NumberLine a={a} b={b} mode="add" />}
                  {selected.name === "Soustraction" && <NumberLine a={a} b={b} mode="sub" />}
                  {selected.name === "Multiplication" && (
                    <DotArray rows={clamp(a, 1, 12)} cols={clamp(b, 1, 12)} />
                  )}
                </div>

                {/* Étapes calcul simples */}
                <div className="bg-gray-50 rounded p-4">
                  <h3 className="text-xl font-semibold mb-2">Étapes</h3>
                  <ol className="list-decimal space-y-1 pl-6">
                    {steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                  <p className="mt-3">
                    Résultat :{" "}
                    <span className="font-bold">
                      {typeof result === "number" ? result : result}
                    </span>
                  </p>
                </div>

                {/* Pratique (autres opérations) */}
                {mode === "Pratique" && (
                  <div className="mt-6 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-3">Pratique</h3>
                    <div className="flex flex-wrap gap-3 items-center">
                      <span className="text-lg font-medium">
                        {selected.name === "Addition" && `${a} + ${b} = `}
                        {selected.name === "Soustraction" && `${a} − ${b} = `}
                        {selected.name === "Multiplication" && `${a} × ${b} = `}
                      </span>
                      <input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder={"ex: 12"}
                        className="border rounded px-3 py-2 w-56"
                      />
                      <button onClick={checkAnswer} className="bg-blue-600 text-white px-4 py-2 rounded">
                        Vérifier
                      </button>
                      {feedback && (
                        <span
                          className={
                            feedback === "Correct."
                              ? "text-emerald-700 font-semibold"
                              : "text-red-700 font-semibold"
                          }
                        >
                          {feedback}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
