"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type OpName = "Addition" | "Soustraction" | "Multiplication" | "Division";

interface Topic {
  name: OpName;
  description: string;
  formula: string;
  example: string;
}

const TOPICS: Topic[] = [
  {
    name: "Addition",
    description:
      "Additionner, c’est réunir des quantités. On peut l’illustrer sur une ligne de nombres par des sauts vers la droite.",
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
      "Multiplier, c’est additionner plusieurs fois la même quantité. On l’illustre avec un tableau de points A × B.",
    formula: "A × B",
    example: "Ex. A = 3, B = 4 → 3 × 4 = 12",
  },
  {
    name: "Division",
    description:
      "Diviser, c’est partager en groupes égaux ou mesurer combien de fois une quantité tient dans une autre.",
    formula: "A ÷ B",
    example: "Ex. A = 12, B = 3 → 12 ÷ 3 = 4",
  },
];

// Utils
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Résultat et étapes textuelles
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
    steps.push(
      `On additionne ${a} fois la même quantité ${b} (ou ${b} fois ${a}).`
    );
    result = a * b;
    steps.push(`${a} × ${b} = ${result}.`);
  } else {
    if (b === 0) {
      result = "Indéfini (division par 0)";
      steps.push("On ne peut pas diviser par 0.");
    } else {
      steps.push(`On partage ${a} en ${b} groupes égaux.`);
      const q = Math.floor(a / b);
      const r = a % b;
      steps.push(`${a} ÷ ${b} = ${q} reste ${r}.`);
      result = r === 0 ? q : `${q} reste ${r}`;
    }
  }

  return { result, steps };
}

// Visualisations SVG sans images
function OperationViz({
  op,
  a,
  b,
}: {
  op: OpName;
  a: number;
  b: number;
}) {
  if (op === "Addition") return <NumberLine a={a} b={b} mode="add" />;
  if (op === "Soustraction") return <NumberLine a={a} b={b} mode="sub" />;
  if (op === "Multiplication")
    return <DotArray rows={clamp(a, 1, 12)} cols={clamp(b, 1, 12)} />;
  return <EqualGroups total={a} groups={b} />;
}

// Ligne de nombres avec sauts
function NumberLine({
  a,
  b,
  mode,
}: {
  a: number;
  b: number;
  mode: "add" | "sub";
}) {
  const end = mode === "add" ? a + Math.max(0, b) : a;
  const start = mode === "sub" ? Math.max(0, a - Math.max(0, b)) : 0;
  const maxVal = Math.max(start, end, a);
  const W = 640;
  const H = 160;
  const L = 40;
  const R = 600;
  const Y = 100;
  const scale = (x: number) =>
    L + ((x - start) / Math.max(1, maxVal - start)) * (R - L);

  const jumpFrom = mode === "add" ? a : a;
  const jumpTo = mode === "add" ? a + b : a - b;

  const arcY = 60;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl">
      <line x1={L} y1={Y} x2={R} y2={Y} stroke="#111827" strokeWidth={2} />
      {/* graduations */}
      {Array.from({ length: maxVal - start + 1 }, (_, i) => start + i).map(
        (v) => (
          <g key={v}>
            <line
              x1={scale(v)}
              y1={Y - 6}
              x2={scale(v)}
              y2={Y + 6}
              stroke="#111827"
            />
            <text
              x={scale(v)}
              y={Y + 22}
              fontSize={12}
              textAnchor="middle"
              fill="#111827"
            >
              {v}
            </text>
          </g>
        )
      )}
      {/* position de A */}
      <circle cx={scale(a)} cy={Y} r={4} fill="#2563EB" />
      {/* saut */}
      {b !== 0 && (
        <>
          <path
            d={`M ${scale(jumpFrom)} ${Y}
               C ${scale(jumpFrom)} ${arcY}, ${scale(jumpTo)} ${arcY}, ${scale(
              jumpTo
            )} ${Y}`}
            fill="none"
            stroke="#2563EB"
            strokeWidth={2}
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
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

// Tableau de points pour la multiplication
function DotArray({ rows, cols }: { rows: number; cols: number }) {
  const cell = 24;
  const pad = 24;
  const W = cols * cell + pad * 2;
  const H = rows * cell + pad * 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-xl border border-gray-200 rounded"
    >
      {/* grille légère */}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => (
          <circle
            key={`${r}-${c}`}
            cx={pad + c * cell}
            cy={pad + r * cell}
            r={6}
            fill="#2563EB"
          />
        ))
      )}
      <text
        x={W / 2}
        y={H - 6}
        fontSize={12}
        textAnchor="middle"
        fill="#111827"
      >
        {rows} ligne(s) × {cols} colonne(s) = {rows * cols}
      </text>
    </svg>
  );
}

// Groupes égaux pour la division
function EqualGroups({ total, groups }: { total: number; groups: number }) {
  const g = Math.max(1, groups);
  const q = Math.floor(groups === 0 ? 0 : total / g);
  const r = groups === 0 ? total : total % g;

  const cols = Math.min(4, g);
  const rows = Math.ceil(g / cols);
  const boxW = 120;
  const boxH = 100;
  const gap = 16;
  const W = cols * boxW + (cols + 1) * gap;
  const H = rows * boxH + (rows + 1) * gap;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-2xl border border-gray-200 rounded"
    >
      {Array.from({ length: g }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = gap + col * (boxW + gap);
        const y = gap + row * (boxH + gap);
        const dots = q + (i < r ? 1 : 0);
        const perRow = Math.ceil(Math.sqrt(Math.max(dots, 1)));
        const cell = 14;
        const pad = 16;

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={boxW}
              height={boxH}
              rx={10}
              ry={10}
              fill="#F9FAFB"
              stroke="#D1D5DB"
            />
            {Array.from({ length: dots }).map((__, k) => {
              const rr = Math.floor(k / perRow);
              const cc = k % perRow;
              const cx = x + pad + cc * cell;
              const cy = y + pad + rr * cell;
              return <circle key={k} cx={cx} cy={cy} r={4} fill="#2563EB" />;
            })}
            <text
              x={x + boxW / 2}
              y={y + boxH - 8}
              fontSize={12}
              textAnchor="middle"
              fill="#111827"
            >
              Groupe {i + 1}: {dots}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function OperationsLearning() {
  const [selected, setSelected] = useState<Topic | null>(TOPICS[0]);
  const [a, setA] = useState(8);
  const [b, setB] = useState(3);
  const [mode, setMode] = useState<"Apprendre" | "Pratique">("Apprendre");
  const opName = selected?.name ?? "Addition";

  const { result, steps } = useMemo(
    () => compute(opName, a, b),
    [opName, a, b]
  );

  const [answer, setAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  function randomize() {
    if (!selected) return;
    if (selected.name === "Division") {
      const A = randInt(4, 60);
      const B = randInt(2, 9);
      setA(A);
      setB(B);
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
      // On accepte "q" ou "q reste r" pour la division.
      const q = Math.floor(b === 0 ? 0 : a / b);
      const r = b === 0 ? a : a % b;
      const normalized = answer.trim().toLowerCase();
      const ok1 = r === 0 && normalized === String(q);
      const ok2 =
        normalized === `${q} reste ${r}` ||
        normalized === `${q} r ${r}` ||
        normalized === `${q} rem ${r}`;
      setFeedback(ok1 || ok2 ? "Correct." : "À revoir.");
    } else {
      const expected =
        selected.name === "Addition"
          ? a + b
          : selected.name === "Soustraction"
          ? a - b
          : a * b;
      setFeedback(Number(normalizedNumber(answer)) === expected ? "Correct." : "À revoir.");
    }
  }

  function normalizedNumber(s: string) {
    return s.replace(",", ".").trim();
  }

  return (
    <main className="flex min-h-screen bg-gray-100 text-black">
      {/* Barre latérale */}
      <aside className="w-full md:w-1/4 bg-white p-6 shadow-lg relative">
        <Link
          href="/menu/apprendre"
          className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-5 rounded font-bold"
        >
          Retour
        </Link>

        <h1 className="text-3xl font-bold mb-2">Opérations arithmétiques</h1>
        <p className="text-sm text-gray-600 mb-6">
          Choisis une opération et manipule A et B. Les illustrations sont en SVG, sans images.
        </p>

        <div className="flex flex-col gap-2 mb-6">
          {TOPICS.map((t) => (
            <button
              key={t.name}
              className={`py-2 px-4 rounded font-semibold text-left ${
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
          <button
            onClick={randomize}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Random
          </button>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setMode("Apprendre")}
              className={`px-3 py-2 rounded ${
                mode === "Apprendre"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-700"
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
                mode === "Pratique"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-50 text-purple-700"
              }`}
            >
              Pratique
            </button>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <section className="w-full md:w-3/4 p-6 md:p-10 flex flex-col items-center">
        {selected && (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-2">{selected.name}</h2>
            <p className="text-gray-700 mb-4">{selected.description}</p>

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

            {/* Viz sans images */}
            <div className="mb-6">
              <OperationViz op={selected.name} a={a} b={b} />
            </div>

            {/* Étapes pédagogiques */}
            <div className="bg-gray-50 rounded p-4">
              <h3 className="text-xl font-semibold mb-2">Étapes</h3>
              <ol className="list-decimal space-y-1 pl-6">
                {steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
              <p className="mt-3">
                Résultat:{" "}
                <span className="font-bold">
                  {typeof result === "number" ? result : result}
                </span>
              </p>
              {selected.name === "Division" && b !== 0 && typeof result === "string" && (
                <p className="text-sm text-gray-600 mt-1">
                  Pour la division entière, on peut écrire le résultat sous la forme
                  q reste r.
                </p>
              )}
            </div>

            {/* Mode pratique */}
            {mode === "Pratique" && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-xl font-semibold mb-3">Pratique</h3>
                <p className="mb-3">
                  Donne la réponse attendue. Pour la division, tu peux répondre soit
                  uniquement le quotient si le reste est 0, soit au format{" "}
                  <code>q reste r</code>.
                </p>
                <div className="flex gap-3 items-center">
                  <span className="text-lg font-medium">
                    {selected.name === "Addition" && `${a} + ${b} = `}
                    {selected.name === "Soustraction" && `${a} − ${b} = `}
                    {selected.name === "Multiplication" && `${a} × ${b} = `}
                    {selected.name === "Division" && `${a} ÷ ${b} = `}
                  </span>
                  <input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder={
                      selected.name === "Division" ? "ex: 4 reste 2" : "ex: 12"
                    }
                    className="border rounded px-3 py-2 w-56"
                  />
                  <button
                    onClick={checkAnswer}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
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
          </div>
        )}
      </section>
    </main>
  );
}
