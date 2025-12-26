"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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
    description: "Diviser, c’est PARTAGER en boîtes (ou groupes) égaux.",
  },
];

const PRACTICE_HREF = "/menu/exercices/operations-arithmetiques";

/* Drag types unifiés */
type DragSrc = "A" | "JAR" | "RET";
type DragPayload = { src: DragSrc; id: number };

/* =========================================================
   Utils
   ========================================================= */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function boundsFor(op: OpName) {
  if (op === "Multiplication") return { minA: 1, maxA: 12, minB: 1, maxB: 16 };
  if (op === "Division") return { minA: 1, maxA: 60, minB: 1, maxB: 12 };
  return { minA: 0, maxA: 30, minB: 0, maxB: 30 };
}

/* =========================================================
   Étapes (texte)
   ========================================================= */
function compute(op: OpName, a: number, b: number) {
  let result: number | string = "Compte le pot 😊";
  const steps: string[] = [];

  if (op === "Addition") {
    steps.push(`Plateau A contient ${a} bonbon${a > 1 ? "s" : ""}.`);
    steps.push("Glisse les bonbons dans le pot.");
    steps.push("On COMPTE ce qu’il y a dans le pot.");
    result = "Compte le pot 😊";
  } else if (op === "Soustraction") {
    steps.push(`Le pot commence avec ${a} bonbon${a > 1 ? "s" : ""}.`);
    steps.push("On RETIRE des bonbons vers la zone Retrait.");
    steps.push("On COMPTE ce qu’il reste dans le pot.");
    result = "Compte le pot 😊";
  } else if (op === "Multiplication") {
    steps.push(`On a ${a} boîte${a > 1 ? "s" : ""}.`);
    steps.push(`Chaque boîte contient ${b} bonbon${b > 1 ? "s" : ""}.`);
    const r = a * b;
    steps.push(`Total : ${a} × ${b} = ${r} bonbons.`);
    result = r;
  } else {
    if (b === 0) {
      steps.push("On ne peut pas partager en 0 groupe.");
      result = "Indéfini";
    } else {
      steps.push(`On partage ${a} bonbons en ${b} boîtes.`);
      const q = Math.floor(a / b);
      const r = a % b;
      steps.push(
        r === 0
          ? `Chaque boîte reçoit ${q} bonbons, sans reste.`
          : `Chaque boîte reçoit ${q} bonbons et il reste ${r} bonbon${r > 1 ? "s" : ""}.`
      );
      result = r === 0 ? q : `${q} reste ${r}`;
    }
  }
  return { result, steps };
}

/* =========================================================
   Stepper commun (− [val] +)
   ========================================================= */
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
      <button onClick={dec} className="px-3 py-2 border rounded-md hover:bg-gray-50">
        −
      </button>
      <div className="px-4 py-2 border rounded-md min-w-[56px] text-center bg-white">
        {value}
      </div>
      <button onClick={inc} className="px-3 py-2 border rounded-md hover:bg-gray-50">
        +
      </button>
    </div>
  );
}

/* =========================================================
   Visuels — Pot + Boîtes
   ========================================================= */

// Zone interne du pot (où on dessine les bonbons) — pour centrer la grille
const JAR_INNER = { left: 58, top: 100, width: 200, height: 220 };

// Pot agrandi
function JarSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 400" className={className}>
      <rect x="70" y="36" width="160" height="22" rx="6" fill="#9CA3AF" />
      <rect x="85" y="56" width="130" height="12" rx="6" fill="#6B7280" />
      <path
        d="
          M90,80 
          h120 
          c12,0 18,9 18,18 
          v210 
          c0,60 -45,80 -78,80 
          s-78,-20 -78,-80 
          V98 
          c0,-9 6,-18 18,-18 
          z"
        fill="#F9FAFB"
        stroke="#D1D5DB"
        strokeWidth="3"
      />
    </svg>
  );
}

// Bonbons persistants
type CandyObj = { id: number; color: string };
const CANDY_PALETTE = [
  "#3B82F6",
  "#F59E0B",
  "#10B981",
  "#EC4899",
  "#8B5CF6",
  "#EF4444",
];

function makeCandies(count: number, seed = 0): CandyObj[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: seed * 100000 + i,
    color: CANDY_PALETTE[i % CANDY_PALETTE.length],
  }));
}

// Bonbon draggable (types unifiés)
const Candy = ({
  item,
  from,
  handleDragStart,
}: {
  item: CandyObj;
  from: DragSrc;
  handleDragStart: (e: React.DragEvent, payload: DragPayload) => void;
}) => (
  <div
    draggable
    onDragStart={(e) => handleDragStart(e, { src: from, id: item.id })}
    className="w-4 h-4 rounded-full"
    style={{ background: item.color, boxShadow: "0 1px 0 rgba(0,0,0,.15)" }}
    title="Glisse-moi !"
  />
);

/* ---------- Multiplication/Division (inchangés) ---------- */
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

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-5xl">
      {Array.from({ length: boxes }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = gap + col * (boxW + gap);
        const y = gap + row * (boxH + gap);
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={boxW}
              height={boxH}
              rx={22}
              ry={22}
              fill="#FFFFFF"
              stroke="#E5E7EB"
            />
            <rect x={x + 14} y={y + 10} width={110} height={22} rx={11} fill="#F3F4F6" />
            <text x={x + 22} y={y + 26} fontSize={12} fill="#111827" fontWeight={700}>
              🍬 Boîte {i + 1}
            </text>
            {Array.from({ length: perBox }).map((__, k) => {
              const rr = Math.floor(k / perRow);
              const cc = k % perRow;
              const cx = x + padding + cc * cell + 8;
              const cy = y + 42 + rr * cell;
              const color = CANDY_PALETTE[(k + i) % CANDY_PALETTE.length];
              return <circle key={k} cx={cx} cy={cy} r={6} fill={color} />;
            })}
            <text
              x={x + boxW - 12}
              y={y + boxH - 12}
              fontSize={13}
              fill="#374151"
              textAnchor="end"
            >
              {perBox} bonbons
            </text>
          </g>
        );
      })}
      <text
        x={W / 2}
        y={H - 14}
        textAnchor="middle"
        fontSize={18}
        fill="#111827"
        fontWeight={800}
      >
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
              Boîte {i + 1}: {dots}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* =========================================================
   ADDITION — Un seul plateau A → Pot
   ========================================================= */
function AdditionJarOneTray({ a }: { a: number }) {
  const [trayA, setTrayA] = useState<CandyObj[]>(() => makeCandies(a, 1));
  const [jar, setJar] = useState<CandyObj[]>([]);
  const [jarPop, setJarPop] = useState(false);

  useEffect(() => {
    setTrayA(makeCandies(a, 1));
    setJar([]);
  }, [a]);

  function handleDragStart(e: React.DragEvent, payload: DragPayload) {
    e.dataTransfer.setData("application/json", JSON.stringify(payload));
  }
  function allowDrop(e: React.DragEvent) {
    e.preventDefault();
  }

  function dropToJar(e: React.DragEvent) {
    e.preventDefault();
    try {
      const { src, id } = JSON.parse(e.dataTransfer.getData("application/json")) as DragPayload;
      if (src === "A") {
        const idx = trayA.findIndex((c) => c.id === id);
        if (idx >= 0) {
          const item = trayA[idx];
          setTrayA((prev) => prev.filter((c) => c.id !== id));
          setJar((prev) => [...prev, item]);
          setJarPop(true);
          setTimeout(() => setJarPop(false), 180);
        }
      }
    } catch {}
  }

  function dropToTrayA(e: React.DragEvent) {
    e.preventDefault();
    try {
      const { src, id } = JSON.parse(e.dataTransfer.getData("application/json")) as DragPayload;
      if (src === "JAR") {
        const idx = jar.findIndex((c) => c.id === id);
        if (idx >= 0) {
          const item = jar[idx];
          setJar((prev) => prev.filter((c) => c.id !== id));
          setTrayA((prev) => [...prev, item]);
          setJarPop(true);
          setTimeout(() => setJarPop(false), 180);
        }
      }
    } catch {}
  }

  function JarGrid({ items }: { items: CandyObj[] }) {
    const cols = Math.min(10, Math.max(4, Math.ceil(Math.sqrt(items.length))));
    return (
      <div
        className="absolute"
        style={{
          left: JAR_INNER.left,
          top: JAR_INNER.top,
          width: JAR_INNER.width,
          height: JAR_INNER.height,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 8,
          placeItems: "center",
          placeContent: "center",
        }}
      >
        {items.map((it) => (
          <Candy key={it.id} item={it} from="JAR" handleDragStart={handleDragStart} />
        ))}
      </div>
    );
  }

  const TrayGrid = ({ items }: { items: CandyObj[] }) => (
    <div className="grid grid-cols-8 gap-2 place-items-center">
      {items.map((it) => (
        <Candy key={it.id} item={it} from="A" handleDragStart={handleDragStart} />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Plateau A */}
        <div
          onDragOver={allowDrop}
          onDrop={dropToTrayA}
          className="bg-white border border-gray-200 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Plateau A</span>
            <span className="text-sm text-gray-500">
              {trayA.length} bonbon{trayA.length > 1 ? "s" : ""}
            </span>
          </div>
          <TrayGrid items={trayA} />
          <div className="mt-3 text-xs text-gray-500">Glisse un bonbon vers le pot</div>
        </div>

        {/* Pot */}
        <div
          onDragOver={allowDrop}
          onDrop={dropToJar}
          className="bg-gradient-to-b from-blue-50 to-white border border-blue-200 rounded-2xl p-4 flex flex-col items-center md:col-span-2"
        >
          <div className="font-semibold mb-2">Pot</div>
          <div
            className="relative"
            style={{
              transition: "transform 180ms ease-out",
              transform: jarPop ? "scale(1.06)" : "scale(1)",
            }}
          >
            <JarSVG className="w-80 h-[420px]" />
            <JarGrid items={jar} />
          </div>
          <div className="mt-2 text-sm">
            Dans le pot : <b>{jar.length}</b> bonbon{jar.length > 1 ? "s" : ""}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setTrayA(makeCandies(a, 1));
                setJar([]);
              }}
              className="px-3 py-1.5 text-sm rounded border hover:bg-gray-50"
            >
              Réinitialiser
            </button>
            <button
              onClick={() => {
                setJar(makeCandies(a, 1));
                setTrayA([]);
                setJarPop(true);
                setTimeout(() => setJarPop(false), 180);
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
        Résultat (on COMPTE le pot) :{" "}
        <span className="text-blue-700">{jar.length}</span> bonbons
      </div>
    </div>
  );
}

/* =========================================================
   SOUSTRACTION — Pot → Retrait
   ========================================================= */
function SubtractionJar({ a }: { a: number }) {
  const [jar, setJar] = useState<CandyObj[]>(() => makeCandies(a, 2));
  const [ret, setRet] = useState<CandyObj[]>([]);
  const [jarPop, setJarPop] = useState(false);
  const [retPop, setRetPop] = useState(false);

  useEffect(() => {
    setJar(makeCandies(a, 2));
    setRet([]);
  }, [a]);

  function handleDragStart(e: React.DragEvent, payload: DragPayload) {
    e.dataTransfer.setData("application/json", JSON.stringify(payload));
  }
  function allowDrop(e: React.DragEvent) {
    e.preventDefault();
  }

  function dropToRet(e: React.DragEvent) {
    e.preventDefault();
    try {
      const { src, id } = JSON.parse(e.dataTransfer.getData("application/json")) as DragPayload;
      if (src === "JAR") {
        const idx = jar.findIndex((c) => c.id === id);
        if (idx >= 0) {
          const item = jar[idx];
          setJar((p) => p.filter((c) => c.id !== id));
          setRet((p) => [...p, item]);
          setJarPop(true);
          setRetPop(true);
          setTimeout(() => setJarPop(false), 180);
          setTimeout(() => setRetPop(false), 180);
        }
      }
    } catch {}
  }
  function dropToJar(e: React.DragEvent) {
    e.preventDefault();
    try {
      const { src, id } = JSON.parse(e.dataTransfer.getData("application/json")) as DragPayload;
      if (src === "RET") {
        const idx = ret.findIndex((c) => c.id === id);
        if (idx >= 0) {
          const item = ret[idx];
          setRet((p) => p.filter((c) => c.id !== id));
          setJar((p) => [...p, item]);
          setJarPop(true);
          setRetPop(true);
          setTimeout(() => setJarPop(false), 180);
          setTimeout(() => setRetPop(false), 180);
        }
      }
    } catch {}
  }

  function JarGrid({ items }: { items: CandyObj[] }) {
    const cols = Math.min(10, Math.max(4, Math.ceil(Math.sqrt(items.length))));
    return (
      <div
        className="absolute"
        style={{
          left: JAR_INNER.left,
          top: JAR_INNER.top,
          width: JAR_INNER.width,
          height: JAR_INNER.height,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 8,
          placeItems: "center",
          placeContent: "center",
        }}
      >
        {items.map((it) => (
          <Candy key={it.id} item={it} from="JAR" handleDragStart={handleDragStart} />
        ))}
      </div>
    );
  }

  const Grid = ({ items }: { items: CandyObj[] }) => (
    <div className="grid grid-cols-8 gap-2 place-items-center">
      {items.map((it) => (
        <Candy key={it.id} item={it} from="RET" handleDragStart={handleDragStart} />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Pot */}
        <div
          onDragOver={allowDrop}
          onDrop={dropToJar}
          className="bg-gradient-to-b from-blue-50 to-white border border-blue-200 rounded-2xl p-4 flex flex-col items-center md:col-span-2"
        >
          <div className="font-semibold mb-2">Pot</div>
          <div
            className="relative"
            style={{
              transition: "transform 180ms ease-out",
              transform: jarPop ? "scale(1.06)" : "scale(1)",
            }}
          >
            <JarSVG className="w-80 h-[420px]" />
            <JarGrid items={jar} />
          </div>
          <div className="mt-2 text-sm">
            Dans le pot : <b>{jar.length}</b> bonbon{jar.length > 1 ? "s" : ""}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setJar(makeCandies(a, 2));
                setRet([]);
              }}
              className="px-3 py-1.5 text-sm rounded border hover:bg-gray-50"
            >
              Réinitialiser
            </button>
            <button
              onClick={() => {
                if (jar.length > 0) {
                  const item = jar[jar.length - 1];
                  setJar((p) => p.slice(0, -1));
                  setRet((p) => [...p, item]);
                  setJarPop(true);
                  setRetPop(true);
                  setTimeout(() => setJarPop(false), 180);
                  setTimeout(() => setRetPop(false), 180);
                }
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

        {/* Retrait */}
        <div
          onDragOver={allowDrop}
          onDrop={dropToRet}
          className="bg-white border border-gray-200 rounded-2xl p-4"
          style={{
            transition: "transform 180ms ease-out",
            transform: retPop ? "scale(1.04)" : "scale(1)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Retrait</span>
            <span className="text-sm text-gray-500">
              {ret.length} bonbon{ret.length > 1 ? "s" : ""}
            </span>
          </div>
          <Grid items={ret} />
          <div className="mt-3 text-xs text-gray-500">Glisse ici pour enlever du pot</div>
        </div>
      </div>

      <div className="text-center text-xl font-extrabold">
        Résultat (ce qu’il reste dans le pot) :{" "}
        <span className="text-blue-700">{jar.length}</span> bonbons
      </div>
    </div>
  );
}

/* =========================================================
   Sélecteur du visuel selon l’opération
   ========================================================= */
function OperationViz({ op, a, b }: { op: OpName; a: number; b: number }) {
  if (op === "Addition") return <AdditionJarOneTray a={a} />;
  if (op === "Soustraction") return <SubtractionJar a={a} />;
  if (op === "Multiplication")
    return <CandyBoxes boxes={clamp(a, 1, 12)} perBox={clamp(b, 1, 16)} />;
  return <EqualGroups total={a} groups={b} />;
}

/* =========================================================
   Page
   ========================================================= */
export default function OperationsLearning() {
  const [selected, setSelected] = useState<Topic | null>(TOPICS[0]);
  const [a, setA] = useState(4);
  const [b, setB] = useState(3); // b : utilisé pour × et ÷ uniquement
  const opName = selected?.name ?? "Addition";
  const { minA, maxA, minB, maxB } = boundsFor(opName);

  const { result, steps } = useMemo(() => compute(opName, a, b), [opName, a, b]);

  return (
    <main className="flex h-screen overflow-y-auto bg-gray-100 text-black relative">
      {/* Retour */}
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

        {/* A / B — B masqué pour + et − */}
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
            <NumberStepper
              value={a}
              setValue={(v) => setA(clamp(v, minA, maxA))}
              min={minA}
              max={maxA}
            />
          </div>

          {(opName === "Multiplication" || opName === "Division") && (
            <div className="flex flex-col text-sm gap-1">
              <span className="font-medium">
                {opName === "Multiplication" ? "B — bonbons/boîte" : "B — boîtes"}
              </span>
              <NumberStepper
                value={b}
                setValue={(v) => setB(clamp(v, minB, maxB))}
                min={minB}
                max={maxB}
              />
            </div>
          )}
        </div>

        <Link
          href={PRACTICE_HREF}
            href="/menu/primaire/niveaux/niveau1"
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
                Résultat (observe le visuel) :{" "}
                <span className="font-bold">{String(result)}</span>
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
