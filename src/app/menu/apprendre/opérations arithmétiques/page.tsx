"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const PRACTICE_HREF = "/menu/exercices/operations-arithmetiques"; // ⬅️ adapte l'URL si besoin

type OpName = "Addition" | "Soustraction" | "Multiplication" | "Division";

interface Topic {
  name: OpName;
  description: string;
}

const TOPICS: Topic[] = [
  {
    name: "Addition",
    description:
      "Additionner, c’est RASSEMBLER : on met des bonbons ensemble pour en avoir plus.",
  },
  {
    name: "Soustraction",
    description:
      "Soustraire, c’est ENLEVER : on retire des bonbons et il en reste moins.",
  },
  {
    name: "Multiplication",
    description:
      "Multiplier, c’est AVOIR PLUSIEURS BOÎTES identiques de bonbons.",
  },
  {
    name: "Division",
    description:
      "Diviser, c’est PARTAGER en boîtes (ou groupes) égaux.",
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


// ---------- Calcul + étapes (langage enfant) ----------
function compute(op: OpName, a: number, b: number) {
  let result: number | string = 0;
  const steps: string[] = [];

  if (op === "Addition") {
    steps.push(`On a ${a} bonbon${a > 1 ? "s" : ""} sur le plateau A.`);
    steps.push(`On ajoute ${b} bonbon${b > 1 ? "s" : ""} du plateau B.`);
    result = a + b;
    steps.push(`Ça fait ${a} + ${b} = ${result} bonbons.`);
  } else if (op === "Soustraction") {
    steps.push(`On a ${a} bonbon${a > 1 ? "s" : ""}.`);
    const take = Math.max(0, Math.min(b, a));
    steps.push(`On enlève ${take} bonbon${take > 1 ? "s" : ""}.`);
    result = a - take;
    steps.push(`Il reste ${a} − ${take} = ${result} bonbons.`);
  } else if (op === "Multiplication") {
    steps.push(`On a ${a} boîte${a > 1 ? "s" : ""}.`);
    steps.push(`Dans chaque boîte : ${b} bonbon${b > 1 ? "s" : ""}.`);
    result = a * b;
    steps.push(`Total : ${a} × ${b} = ${result} bonbons.`);
  } else {
    if (b === 0) {
      steps.push("On ne peut pas partager en 0 groupe.");
      result = "Indéfini";
    } else {
      steps.push(`On partage ${a} bonbons en ${b} boîtes.`);
      const q = Math.floor(a / b);
      const r = a % b;
      if (r === 0) {
        steps.push(`Chaque boîte reçoit ${q} bonbons, sans reste.`);
        result = q;
      } else {
        steps.push(
          `Chaque boîte reçoit ${q} bonbons et il reste ${r} bonbon${r > 1 ? "s" : ""}.`
        );
        result = `${q} reste ${r}`;
      }
    }
  }
  return { result, steps };
}

// ---------- Stepper (− [val] +) ----------
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

// ---------- VISUELS ----------
function OperationViz({ op, a, b }: { op: OpName; a: number; b: number }) {
  if (op === "Addition") return <AdditionJar a={a} b={b} />; // bocal
  if (op === "Soustraction") return <RemoveBilles a={a} b={b} />;
  if (op === "Multiplication") return <CandyBoxes boxes={clamp(a, 1, 12)} perBox={clamp(b, 1, 16)} />;
  return <EqualGroups total={a} groups={b} />;
}

/** ADDITION — Bocal de bonbons draggable */
function AdditionJar({ a, b }: { a: number; b: number }) {
  const [trayA, setTrayA] = useState<number>(a);
  const [trayB, setTrayB] = useState<number>(b);
  const [jar, setJar] = useState<number>(0);

  // quand A/B changent via steppers, on reset les plateaux proprement
  useEffect(() => {
    setTrayA(a);
    setTrayB(b);
    setJar(0);
  }, [a, b]);

  // drag helpers
  function onDragStart(e: React.DragEvent, source: "A" | "B" | "JAR") {
    e.dataTransfer.setData("text/plain", source);
  }
  function allowDrop(e: React.DragEvent) {
    e.preventDefault();
  }
  function dropToJar(e: React.DragEvent) {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain") as "A" | "B" | "JAR";
    if (src === "A" && trayA > 0) {
      setTrayA((n) => n - 1);
      setJar((n) => n + 1);
    } else if (src === "B" && trayB > 0) {
      setTrayB((n) => n - 1);
      setJar((n) => n + 1);
    }
  }
  function dropToTrayA(e: React.DragEvent) {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain") as "A" | "B" | "JAR";
    if (src === "JAR" && jar > 0) {
      setJar((n) => n - 1);
      setTrayA((n) => n + 1);
    }
  }
  function dropToTrayB(e: React.DragEvent) {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain") as "A" | "B" | "JAR";
    if (src === "JAR" && jar > 0) {
      setJar((n) => n - 1);
      setTrayB((n) => n + 1);
    }
  }

  const colors = ["#3B82F6", "#F59E0B", "#10B981", "#EC4899", "#8B5CF6", "#EF4444"];
  const Candy = ({ color, from }: { color: string; from: "A" | "B" | "JAR" }) => (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, from)}
      className="w-4 h-4 rounded-full"
      style={{ background: color, boxShadow: "0 1px 0 rgba(0,0,0,.15)" }}
      title="Glisse-moi !"
    />
  );
  const grid = (count: number, from: "A" | "B" | "JAR") => (
    <div className="grid grid-cols-8 gap-2 place-items-center">
      {Array.from({ length: count }).map((_, i) => (
        <Candy key={`${from}-${i}`} color={colors[i % colors.length]} from={from} />
      ))}
    </div>
  );
  const JarSVG = () => (
    <svg viewBox="0 0 220 260" className="w-64 h-72">
      <rect x="40" y="14" width="140" height="18" rx="4" fill="#9CA3AF" />
      <rect x="50" y="28" width="120" height="10" rx="3" fill="#6B7280" />
      <path
        d="M60 40 h100 c8 0 12 6 12 14 v140 c0 40-28 52-62 52s-62-12-62-52V54c0-8 4-14 12-14z"
        fill="#F9FAFB"
        stroke="#D1D5DB"
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div
          onDragOver={allowDrop}
          onDrop={dropToTrayA}
          className="bg-white border border-gray-200 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Plateau A</span>
            <span className="text-sm text-gray-500">
              {trayA} bonbon{trayA > 1 ? "s" : ""}
            </span>
          </div>
          {grid(trayA, "A")}
          <div className="mt-3 text-xs text-gray-500">Glisse un bonbon vers le pot</div>
        </div>

        <div
          onDragOver={allowDrop}
          onDrop={dropToJar}
          className="bg-gradient-to-b from-blue-50 to-white border border-blue-200 rounded-2xl p-4 flex flex-col items-center"
        >
          <div className="font-semibold mb-2">Pot</div>
          <div className="relative">
            <JarSVG />
            <div className="absolute left-[28px] top-[70px] w-[164px] h-[150px]">
              <div className="grid grid-cols-8 gap-2 place-items-center">
                {Array.from({ length: jar }).map((_, i) => (
                  <div
                    key={`J-${i}`}
                    className="w-4 h-4 rounded-full"
                    draggable
                    onDragStart={(e) => onDragStart(e, "JAR")}
                    style={{
                      background: colors[i % colors.length],
                      boxShadow: "0 1px 0 rgba(0,0,0,.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2 text-sm">
            Dans le pot : <b>{jar}</b> bonbon{jar > 1 ? "s" : ""}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setTrayA(a);
                setTrayB(b);
                setJar(0);
              }}
              className="px-3 py-1.5 text-sm rounded border hover:bg-gray-50"
            >
              Réinitialiser
            </button>
            <button
              onClick={() => {
                setJar(a + b);
                setTrayA(0);
                setTrayB(0);
              }}
              className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white"
            >
              Remplir (A + B)
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Astuce : tu peux aussi glisser du pot vers A ou B.
          </div>
        </div>

        <div
          onDragOver={allowDrop}
          onDrop={dropToTrayB}
          className="bg-white border border-gray-200 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Plateau B</span>
            <span className="text-sm text-gray-500">
              {trayB} bonbon{trayB > 1 ? "s" : ""}
            </span>
          </div>
          {grid(trayB, "B")}
          <div className="mt-3 text-xs text-gray-500">Glisse un bonbon vers le pot</div>
        </div>
      </div>

      <div className="text-center text-xl font-extrabold">
        Total attendu = {a} + {b} = <span className="text-blue-700">{a + b}</span> bonbons
      </div>
    </div>
  );
}

/** SOUSTRACTION — on enlève des billes (les retirées sont grisées) */
function RemoveBilles({ a, b }: { a: number; b: number }) {
  const start = Math.max(0, a);
  const take = clamp(b, 0, start);
  const left = start - take;

  const cell = 18;
  const pad = 20;
  const groupW = 320;
  const groupH = 160;
  const W = groupW + pad * 2;
  const H = groupH + 70;
  const perRow = 10;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-3xl">
      <rect x={pad} y={16} width={groupW} height={groupH} rx={18} fill="#FFFFFF" stroke="#E5E7EB" />
      <text x={pad + 12} y={16 + 22} fontSize={12} fill="#111827" fontWeight={700}>
        On enlève {take} bonbon{take > 1 ? "s" : ""}.
      </text>
      {Array.from({ length: start }).map((_, k) => {
        const r = Math.floor(k / perRow);
        const c = k % perRow;
        const cx = pad + 24 + c * cell;
        const cy = 16 + 44 + r * cell;
        const removed = k >= start - take;
        return (
          <circle
            key={k}
            cx={cx}
            cy={cy}
            r={6}
            fill={removed ? "#E5E7EB" : "#3B82F6"}
            opacity={removed ? 0.6 : 1}
          />
        );
      })}
      <text x={W / 2} y={groupH + 50} textAnchor="middle" fontSize={18} fill="#111827" fontWeight={800}>
        Il reste {left} bonbons ({start} − {take} = {left})
      </text>
    </svg>
  );
}

/** MULTIPLICATION — boîtes de bonbons */
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
            <rect x={x + 14} y={y + 10} width={110} height={22} rx={11} fill="#F3F4F6" />
            <text x={x + 22} y={y + 26} fontSize={12} fill="#111827" fontWeight={700}>🍬 Boîte {i + 1}</text>
            {Array.from({ length: perBox }).map((__, k) => {
              const rr = Math.floor(k / perRow);
              const cc = k % perRow;
              const cx = x + padding + cc * cell + 8;
              const cy = y + 42 + rr * cell;
              const color = candyColors[(k + i) % candyColors.length];
              return <circle key={k} cx={cx} cy={cy} r={6} fill={color} />;
            })}
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

/** DIVISION — partage en groupes égaux */
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
              Boîte {i + 1}: {dots}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------- PAGE ----------
export default function OperationsLearning() {
  const [selected, setSelected] = useState<Topic | null>(TOPICS[0]);
  const [a, setA] = useState(4);
  const [b, setB] = useState(3);
  const opName = selected?.name ?? "Addition";
  const { minA, maxA, minB, maxB } = boundsFor(opName);

  const { result, steps } = useMemo(() => compute(opName, a, b), [opName, a, b]);

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

        <div className="flex flex-col gap-3 mb-6">
          {TOPICS.map((t) => (
            <button
              key={t.name}
              className={`py-2 px-6 rounded font-bold text-left ${
                selected?.name === t.name
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
              onClick={() => setSelected(t)}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* A / B avec steppers pour toutes les opérations */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex flex-col text-sm gap-1">
            <span className="font-medium">
              {opName === "Multiplication"
                ? "A — boîtes"
                : opName === "Division"
                ? "A — bonbons"
                : "A"}
            </span>
            <NumberStepper value={a} setValue={(v) => setA(clamp(v, minA, maxA))} min={minA} max={maxA} />
          </div>
          <div className="flex flex-col text-sm gap-1">
            <span className="font-medium">
              {opName === "Multiplication"
                ? "B — bonbons/boîte"
                : opName === "Division"
                ? "B — boîtes"
                : "B"}
            </span>
            <NumberStepper value={b} setValue={(v) => setB(clamp(v, minB, maxB))} min={minB} max={maxB} />
          </div>
        </div>

        {/* Bouton Pratique */}
        <Link
          href={PRACTICE_HREF}
          className="block text-center bg-purple-600 text-white py-2 px-4 rounded font-semibold"
        >
          Pratique
        </Link>
      </aside>

      {/* Colonne droite */}
      <section className="w-full md:w-3/4 p-6 md:p-10 flex flex-col items-center overflow-y-auto">
        {selected && (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg mt-10 w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-2">{selected.name}</h2>
            <p className="text-gray-700 mb-4">{selected.description}</p>

            {/* Visuel */}
            <div className="mb-6">
              <OperationViz op={selected.name} a={a} b={b} />
            </div>

            {/* Étapes */}
            <div className="bg-gray-50 rounded p-4">
              <h3 className="text-xl font-semibold mb-2">Étapes</h3>
              <ol className="list-decimal space-y-1 pl-6">
                {steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
              <p className="mt-3">
                Résultat : <span className="font-bold">{typeof result === "number" ? result : result}</span>
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
