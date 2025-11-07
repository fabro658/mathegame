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

// ---------- Calcul + étapes (texte simple) ----------
function compute(op: OpName, a: number, b: number) {
  let result: number | string = 0;
  const steps: string[] = [];

  if (op === "Addition") {
    steps.push(`On a ${a} bonbon${a > 1 ? "s" : ""} sur le plateau A.`);
    steps.push(`On glisse des bonbons dans le pot.`);
    result = a + b; // valeur “attendue”, mais l'enfant comptera dans le pot
    steps.push(`On compte dans le pot pour trouver le total.`);
  } else if (op === "Soustraction") {
    steps.push(`On commence avec ${a} bonbon${a > 1 ? "s" : ""} dans le pot.`);
    const take = Math.max(0, Math.min(b, a));
    steps.push(`On retire ${take} bonbon${take > 1 ? "s" : ""} vers la zone Retrait.`);
    result = a - take; // valeur “attendue”, mais l'enfant comptera ce qu'il reste
    steps.push(`On compte ce qu’il reste dans le pot.`);
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
  if (op === "Addition") return <AdditionJarOneTray a={a} />; // ⬅️ un seul plateau A
  if (op === "Soustraction") return <SubtractionJar a={a} />;  // ⬅️ on retire du pot
  if (op === "Multiplication") return <CandyBoxes boxes={clamp(a, 1, 12)} perBox={clamp(b, 1, 16)} />;
  return <EqualGroups total={a} groups={b} />;
}

// Palette bonbons
const CANDY_COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EC4899", "#8B5CF6", "#EF4444"];

// JAR SVG (réutilisé)
function JarSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 260" className={className}>
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
}

const Candy = ({
  color,
  from,
  onDragStart,
}: {
  color: string;
  from: "A" | "JAR" | "RET";
  onDragStart: (e: React.DragEvent, source: "A" | "JAR" | "RET") => void;
}) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, from)}
    className="w-4 h-4 rounded-full"
    style={{ background: color, boxShadow: "0 1px 0 rgba(0,0,0,.15)" }}
    title="Glisse-moi !"
  />
);

// === ADDITION — UN PLATEAU A -> POT ===
function AdditionJarOneTray({ a }: { a: number }) {
  const [trayA, setTrayA] = useState<number>(a);
  const [jar, setJar] = useState<number>(0);

  // si A change via steppers, on reset proprement
  useEffect(() => {
    setTrayA(a);
    setJar(0);
  }, [a]);

  // DnD helpers
  function onDragStart(e: React.DragEvent, source: "A" | "JAR" | "RET") {
    e.dataTransfer.setData("text/plain", source);
  }
  function allowDrop(e: React.DragEvent) {
    e.preventDefault();
  }
  function dropToJar(e: React.DragEvent) {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain") as "A" | "JAR" | "RET";
    if (src === "A" && trayA > 0) {
      setTrayA((n) => n - 1);
      setJar((n) => n + 1);
    }
  }
  function dropToTrayA(e: React.DragEvent) {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain") as "A" | "JAR" | "RET";
    if (src === "JAR" && jar > 0) {
      setJar((n) => n - 1);
      setTrayA((n) => n + 1);
    }
  }

  // centrement des bonbons dans le pot : grille centrée
  const renderJarCandies = (count: number) => {
    const cols = 8; // densité agréable
    return (
      <div
        className="w-[164px] h-[150px] absolute left-[28px] top-[70px]"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "8px",
          placeItems: "center",
          placeContent: "center", // ⬅️ centre la grille dans le pot
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={`J-${i}`}
            className="w-4 h-4 rounded-full"
            draggable
            onDragStart={(e) => onDragStart(e, "JAR")}
            style={{
              background: CANDY_COLORS[i % CANDY_COLORS.length],
              boxShadow: "0 1px 0 rgba(0,0,0,.15)",
            }}
          />
        ))}
      </div>
    );
  };

  const renderGrid = (count: number, from: "A" | "JAR" | "RET") => (
    <div className="grid grid-cols-8 gap-2 place-items-center">
      {Array.from({ length: count }).map((_, i) => (
        <Candy
          key={`${from}-${i}`}
          color={CANDY_COLORS[i % CANDY_COLORS.length]}
          from={from}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div
          onDragOver={allowDrop}
          onDrop={dropToTrayA}
          className="bg-white border border-gray-200 rounded-2xl p-4 md:col-span-1"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Plateau A</span>
            <span className="text-sm text-gray-500">
              {trayA} bonbon{trayA > 1 ? "s" : ""}
            </span>
          </div>
          {renderGrid(trayA, "A")}
          <div className="mt-3 text-xs text-gray-500">Glisse un bonbon vers le pot</div>
        </div>

        <div
          onDragOver={allowDrop}
          onDrop={dropToJar}
          className="bg-gradient-to-b from-blue-50 to-white border border-blue-200 rounded-2xl p-4 flex flex-col items-center md:col-span-2"
        >
          <div className="font-semibold mb-2">Pot</div>
          <div className="relative">
            <JarSVG className="w-64 h-72" />
            {renderJarCandies(jar)}
          </div>
          <div className="mt-2 text-sm">
            Dans le pot : <b>{jar}</b> bonbon{jar > 1 ? "s" : ""}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setTrayA(a);
                setJar(0);
              }}
              className="px-3 py-1.5 text-sm rounded border hover:bg-gray-50"
            >
              Réinitialiser
            </button>
            <button
              onClick={() => {
                setJar(a);
                setTrayA(0);
              }}
              className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white"
            >
              Remplir (tout A)
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Astuce : tu peux aussi glisser du pot vers A.
          </div>
        </div>
      </div>

      <div className="text-center text-xl font-extrabold">
        Résultat (on COMPTE le pot) : <span className="text-blue-700">{jar}</span> bonbons
      </div>
    </div>
  );
}

// === SOUSTRACTION — LE POT -> RETRAIT ===
function SubtractionJar({ a }: { a: number }) {
  const [jar, setJar] = useState<number>(a);
  const [ret, setRet] = useState<number>(0); // zone Retrait

  useEffect(() => {
    setJar(a);
    setRet(0);
  }, [a]);

  function onDragStart(e: React.DragEvent, source: "A" | "JAR" | "RET") {
    e.dataTransfer.setData("text/plain", source);
  }
  function allowDrop(e: React.DragEvent) {
    e.preventDefault();
  }
  function dropToRet(e: React.DragEvent) {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain") as "A" | "JAR" | "RET";
    if (src === "JAR" && jar > 0) {
      setJar((n) => n - 1);
      setRet((n) => n + 1);
    }
  }
  function dropToJar(e: React.DragEvent) {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain") as "A" | "JAR" | "RET";
    if (src === "RET" && ret > 0) {
      setRet((n) => n - 1);
      setJar((n) => n + 1);
    }
  }

  const renderJarCandies = (count: number) => {
    const cols = 8;
    return (
      <div
        className="w-[164px] h-[150px] absolute left-[28px] top-[70px]"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "8px",
          placeItems: "center",
          placeContent: "center",
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={`J-${i}`}
            className="w-4 h-4 rounded-full"
            draggable
            onDragStart={(e) => onDragStart(e, "JAR")}
            style={{
              background: CANDY_COLORS[i % CANDY_COLORS.length],
              boxShadow: "0 1px 0 rgba(0,0,0,.15)",
            }}
          />
        ))}
      </div>
    );
  };

  const renderGrid = (count: number, from: "A" | "JAR" | "RET") => (
    <div className="grid grid-cols-8 gap-2 place-items-center">
      {Array.from({ length: count }).map((_, i) => (
        <Candy
          key={`${from}-${i}`}
          color={CANDY_COLORS[i % CANDY_COLORS.length]}
          from={from}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Pot au centre (col-span-2 sur md) */}
        <div
          onDragOver={allowDrop}
          onDrop={dropToJar}
          className="bg-gradient-to-b from-blue-50 to-white border border-blue-200 rounded-2xl p-4 flex flex-col items-center md:col-span-2"
        >
          <div className="font-semibold mb-2">Pot</div>
          <div className="relative">
            <JarSVG className="w-64 h-72" />
            {renderJarCandies(jar)}
          </div>
          <div className="mt-2 text-sm">
            Dans le pot : <b>{jar}</b> bonbon{jar > 1 ? "s" : ""}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setJar(a);
                setRet(0);
              }}
              className="px-3 py-1.5 text-sm rounded border hover:bg-gray-50"
            >
              Réinitialiser
            </button>
            <button
              onClick={() => {
                const m = Math.min(jar, 1);
                setJar((n) => n - m);
                setRet((n) => n + m);
              }}
              className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white"
            >
              Retirer 1
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Astuce : glisse un bonbon du pot vers « Retrait ».
          </div>
        </div>

        {/* Zone Retrait */}
        <div
          onDragOver={allowDrop}
          onDrop={dropToRet}
          className="bg-white border border-gray-200 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Retrait</span>
            <span className="text-sm text-gray-500">
              {ret} bonbon{ret > 1 ? "s" : ""}
            </span>
          </div>
          {renderGrid(ret, "RET")}
          <div className="mt-3 text-xs text-gray-500">Glisse ici pour enlever du pot</div>
        </div>
      </div>

      <div className="text-center text-xl font-extrabold">
        Résultat (ce qu’il reste dans le pot) :{" "}
        <span className="text-blue-700">{jar}</span> bonbons
      </div>
    </div>
  );
}

/** MULTIPLICATION — boîtes de bonbons (inchangé) */
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
  const candyColors = CANDY_COLORS;

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

/** DIVISION — partage en groupes égaux (inchangé) */
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
  const [b, setB] = useState(3); // b sert encore pour × et ÷ uniquement
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

        {/* A / B avec steppers (B masqué pour + et −) */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex flex-col text-sm gap-1">
            <span className="font-medium">
              {opName === "Multiplication"
                ? "A — boîtes"
                : opName === "Division"
                ? "A — bonbons"
                : opName === "Addition"
                ? "A — bonbons"
                : "A — bonbons dans le pot"}
            </span>
            <NumberStepper value={a} setValue={(v) => setA(clamp(v, minA, maxA))} min={minA} max={maxA} />
          </div>

          {/* Affiche B seulement pour × et ÷ */}
          {(opName === "Multiplication" || opName === "Division") && (
            <div className="flex flex-col text-sm gap-1">
              <span className="font-medium">
                {opName === "Multiplication" ? "B — bonbons/boîte" : "B — boîtes"}
              </span>
              <NumberStepper value={b} setValue={(v) => setB(clamp(v, minB, maxB))} min={minB} max={maxB} />
            </div>
          )}
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
                Résultat (à observer dans le visuel) :{" "}
                <span className="font-bold">
                  {typeof result === "number" ? result : result}
                </span>
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
