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
      "Multiplier, c’est acheter des boîtes de bonbons : A boîtes et B bonbons par boîte, donc A × B bonbons au total.",
    formula: "A × B",
    example: "Ex. A = 3, B = 4 → 3 × 4 = 12 bonbons",
  },
  {
    name: "Division",
    description:
      "Diviser, c’est partager en groupes égaux ou mesurer combien de fois B tient dans A.",
    formula: "A ÷ B",
    example: "Ex. A = 12, B = 3 → 12 ÷ 3 = 4",
  },
];

// ---------- Utils ----------
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function boundsFor(op: OpName) {
  if (op === "Multiplication") return { minA: 1, maxA: 12, minB: 1, maxB: 16 };
  if (op === "Division") return { minA: 1, maxA: 60, minB: 1, maxB: 12 }; // B≥1
  return { minA: 0, maxA: 30, minB: 0, maxB: 30 };
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
    steps.push(`On a ${a} boîte${a > 1 ? "s" : ""} de ${b} bonbon${b > 1 ? "s" : ""} chacune.`);
    result = a * b;
    steps.push(`Total = ${a} × ${b} = ${result} bonbon${Number(result) > 1 ? "s" : ""}.`);
  } else {
    if (b === 0) {
      steps.push("On ne peut pas diviser par 0.");
      result = "Indéfini (division par 0)";
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

// ---------- Stepper commun (− [val] +) ----------
function NumberStepper({
  value,
  setValue,
  min = -9999,
  max = 9999,
  label,
}: {
  value: number;
  setValue: (n: number) => void;
  min?: number;
  max?: number;
  label?: string;
}) {
  const dec = () => setValue(clamp(value - 1, min, max));
  const inc = () => setValue(clamp(value + 1, min, max));

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm font-medium mr-1">{label}</span>}
      <button onClick={dec} className="px-3 py-2 border rounded-md hover:bg-gray-50">−</button>
      <div className="px-4 py-2 border rounded-md min-w-[56px] text-center bg-white">{value}</div>
      <button onClick={inc} className="px-3 py-2 border rounded-md hover:bg-gray-50">+</button>
    </div>
  );
}

// ---------- SVGs ----------
function OperationViz({ op, a, b }: { op: OpName; a: number; b: number }) {
  if (op === "Addition") return <NumberLine a={a} b={b} mode="add" />;
  if (op === "Soustraction") return <NumberLine a={a} b={b} mode="sub" />;
  if (op === "Multiplication") return <CandyBoxes boxes={clamp(a, 1, 12)} perBox={clamp(b, 1, 16)} />;
  return <EqualGroups total={a} groups={b} />;
}

function NumberLine({ a, b, mode }: { a: number; b: number; mode: "add" | "sub" }) {
  const start = 0;
  const end = Math.max(
    a,
    mode === "add" ? a + Math.max(0, b) : a,
    mode === "sub" ? Math.max(0, a - Math.max(0, b)) : a
  );
  const W = 640, H = 160, L = 40, R = 600, Y = 100;
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
          <text x={scale(v)} y={Y + 22} fontSize={12} textAnchor="middle" fill="#111827">{v}</text>
        </g>
      ))}
      <circle cx={scale(a)} cy={Y} r={4} fill="#2563EB" />
      {b !== 0 && (
        <>
          <path
            d={`M ${scale(jumpFrom)} ${Y}
               C ${scale(jumpFrom)} ${arcY}, ${scale(jumpTo)} ${arcY}, ${scale(jumpTo)} ${Y}`}
            fill="none" stroke="#2563EB" strokeWidth={2} markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#2563EB" />
            </marker>
          </defs>
        </>
      )}
      <text x={scale((jumpFrom + jumpTo) / 2)} y={arcY - 6} fontSize={12} textAnchor="middle" fill="#2563EB">
        {mode === "add" ? `+${b}` : `−${b}`}
      </text>
    </svg>
  );
}

/** Multiplication — Boîtes de bonbons (plus friendly) */
function CandyBoxes({ boxes, perBox }: { boxes: number; perBox: number }) {
  const cols = Math.min(4, boxes);
  const rows = Math.ceil(boxes / cols);
  const boxW = 180;
  const boxH = 140;
  const gap = 24;
  const W = cols * boxW + (cols + 1) * gap;
  const H = rows * boxH + (rows + 1) * gap + 48;

  const perRow = Math.ceil(Math.sqrt(Math.max(perBox, 1)));
  const cell = 18;
  const padding = 20;
  const candyColors = ["#2563EB", "#EC4899", "#8B5CF6", "#10B981", "#F59E0B"];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-5xl">
      {Array.from({ length: boxes }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = gap + col * (boxW + gap);
        const y = gap + row * (boxH + gap);

        return (
          <g key={i}>
            <rect x={x} y={y} width={boxW} height={boxH} rx={22} ry={22} fill="#FFFFFF" stroke="#E5E7EB" />
            {/* étiquette avec 🍬 */}
            <rect x={x + 14} y={y + 10} width={100} height={22} rx={11} fill="#F3F4F6" />
            <text x={x + 22} y={y + 26} fontSize={12} fill="#111827" fontWeight={700}>
              🍬 Boîte {i + 1}
            </text>
            {/* bonbons */}
            {Array.from({ length: perBox }).map((__, k) => {
              const rr = Math.floor(k / perRow);
              const cc = k % perRow;
              const jitterX = (k % 2) * 0.6;
              const jitterY = ((k + i) % 2) * 0.6;
              const cx = x + padding + cc * cell + 8 + jitterX;
              const cy = y + 42 + rr * cell + jitterY;
              const color = candyColors[(k + i) % candyColors.length];
              return <circle key={k} cx={cx} cy={cy} r={6} fill={color} />;
            })}
            {/* compteur */}
            <text x={x + boxW - 12} y={y + boxH - 12} fontSize={13} fill="#374151" textAnchor="end">
              {perBox} bonbons
            </text>
          </g>
        );
      })}
      <text x={W / 2} y={H - 14} textAnchor="middle" fontSize={18} fill="#111827" fontWeight={800}>
        Total = {boxes} × {perBox} = {boxes * perBox} bonbons
      </text>
    </svg>
  );
}

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
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl border border-gray-200 rounded">
      {Array.from({ length: g }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = gap + col * (boxW + gap);
        const y = gap + row * (boxH + gap);
        const dots = q + (i < r ? 1 : 0);
        const perRow = Math.ceil(Math.sqrt(Math.max(dots, 1)));
        const cell = 14;
        const padding = 16;

        return (
          <g key={i}>
            <rect x={x} y={y} width={boxW} height={boxH} rx={10} ry={10} fill="#F9FAFB" stroke="#D1D5DB" />
            {Array.from({ length: dots }).map((__, k) => {
              const rr = Math.floor(k / perRow);
              const cc = k % perRow;
              const cx = x + padding + cc * cell;
              const cy = y + padding + rr * cell;
              return <circle key={k} cx={cx} cy={cy} r={4} fill="#2563EB" />;
            })}
            <text x={x + boxW / 2} y={y + boxH - 8} fontSize={12} textAnchor="middle" fill="#111827">
              Groupe {i + 1}: {dots}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------- Page ----------
export default function OperationsLearning() {
  const [selected, setSelected] = useState<Topic | null>(TOPICS[0]);
  const [a, setA] = useState(4);
  const [b, setB] = useState(8);
  const [mode, setMode] = useState<"Apprendre" | "Pratique">("Apprendre");
  const opName = selected?.name ?? "Addition";
  const { minA, maxA, minB, maxB } = boundsFor(opName);

  const { result, steps } = useMemo(() => compute(opName, a, b), [opName, a, b]);

  // Réponses via steppers
  const [ans, setAns] = useState<number>(0);     // +, −, ×
  const [ansQ, setAnsQ] = useState<number>(0);   // ÷ quotient
  const [ansR, setAnsR] = useState<number>(0);   // ÷ reste
  const [feedback, setFeedback] = useState<string>("");

  function randomize() {
    if (!selected) return;
    if (selected.name === "Division") {
      setA(randInt(4, 60));
      setB(randInt(1, 9)); // B≥1
      setAnsQ(0); setAnsR(0);
    } else if (selected.name === "Multiplication") {
      setA(randInt(1, 6)); setB(randInt(1, 10)); setAns(0);
    } else {
      setA(randInt(0, 30)); setB(randInt(0, 30)); setAns(0);
    }
    setFeedback("");
  }

  function checkAnswer() {
    if (!selected) return;
    if (selected.name === "Division") {
      const q = Math.floor(b === 0 ? 0 : a / b);
      const r = b === 0 ? a : a % b;
      setFeedback(ansQ === q && ansR === r ? "Correct." : "À revoir.");
    } else {
      const expected =
        selected.name === "Addition" ? a + b :
        selected.name === "Soustraction" ? a - b :
        a * b;
      setFeedback(ans === expected ? "Correct." : "À revoir.");
    }
  }

  return (
    <main className="flex h-screen overflow-y-auto bg-gray-100 text-black relative">
      {/* Retour */}
      <Link href="/menu/apprendre" className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold z-10">
        Retour
      </Link>

      {/* Colonne gauche */}
      <aside className="w-full md:w-1/4 bg-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Opérations arithmétiques</h1>

        <div className="flex flex-col gap-3 mb-6">
          {TOPICS.map((t) => (
            <button
              key={t.name}
              className={`py-2 px-6 rounded font-bold text-left ${selected?.name === t.name ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
              onClick={() => {
                setSelected(t);
                setFeedback("");
                setAns(0); setAnsQ(0); setAnsR(0);
              }}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* A / B avec steppers pour TOUTES les opérations */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="flex flex-col text-sm gap-1">
            <span className="font-medium">{opName === "Multiplication" ? "A — boîtes" : "A"}</span>
            <NumberStepper value={a} setValue={(v) => setA(clamp(v, minA, maxA))} min={minA} max={maxA} />
          </div>
          <div className="flex flex-col text-sm gap-1">
            <span className="font-medium">{opName === "Multiplication" ? "B — bonbons/boîte" : "B"}</span>
            <NumberStepper value={b} setValue={(v) => setB(clamp(v, minB, maxB))} min={minB} max={maxB} />
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={randomize} className="bg-gray-800 text-white px-4 py-2 rounded">Random</button>
          <div className="ml-auto flex gap-2">
            <button onClick={() => setMode("Apprendre")} className={`px-3 py-2 rounded ${mode === "Apprendre" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700"}`}>Apprendre</button>
            <button onClick={() => { setMode("Pratique"); setFeedback(""); }} className={`px-3 py-2 rounded ${mode === "Pratique" ? "bg-purple-600 text-white" : "bg-purple-50 text-purple-700"}`}>Pratique</button>
          </div>
        </div>
      </aside>

      {/* Colonne droite */}
      <section className="w-full md:w-3/4 p-6 md:p-10 flex flex-col items-center overflow-y-auto">
        {selected && (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg mt-10 w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-2">{selected.name}</h2>
            <p className="text-gray-700 mb-4">{selected.description}</p>

            {/* Viz */}
            <div className="mb-6">
              <OperationViz op={selected.name} a={a} b={b} />
            </div>

            {/* Étapes */}
            <div className="bg-gray-50 rounded p-4">
              <h3 className="text-xl font-semibold mb-2">Étapes</h3>
              <ol className="list-decimal space-y-1 pl-6">
                {steps.map((s, i) => (<li key={i}>{s}</li>))}
              </ol>
              <p className="mt-3">Résultat : <span className="font-bold">{typeof result === "number" ? result : result}</span></p>
            </div>

            {/* Pratique */}
            {mode === "Pratique" && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-xl font-semibold mb-3">Pratique</h3>

                <div className="flex flex-wrap gap-4 items-center">
                  <span className="text-lg font-medium">
                    {selected.name === "Addition" && `${a} + ${b} = `}
                    {selected.name === "Soustraction" && `${a} − ${b} = `}
                    {selected.name === "Multiplication" && `${a} × ${b} = `}
                    {selected.name === "Division" && `${a} ÷ ${b} = `}
                  </span>

                  {selected.name !== "Division" ? (
                    <NumberStepper value={ans} setValue={setAns} />
                  ) : (
                    <div className="flex items-center gap-4">
                      <NumberStepper label="q" value={ansQ} setValue={setAnsQ} min={0} />
                      <span className="text-gray-500">reste</span>
                      <NumberStepper label="r" value={ansR} setValue={setAnsR} min={0} />
                    </div>
                  )}

                  <button onClick={checkAnswer} className="bg-blue-600 text-white px-4 py-2 rounded">Vérifier</button>
                  {feedback && (
                    <span className={feedback === "Correct." ? "text-emerald-700 font-semibold" : "text-red-700 font-semibold"}>
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
