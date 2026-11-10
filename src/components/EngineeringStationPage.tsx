import React, { useState } from 'react';
import {
  Cpu,
  Gamepad2,
  BookOpen,
  Send,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Check,
  Flame,
  Binary,
  Code2,
  Lightbulb,
  Share2,
} from 'lucide-react';
import {
  evaluateLogicGate,
  LogicGateType,
  BUG_CHALLENGES,
  checkBugFix,
} from '../utils/portfolioLogic';
import { PORTFOLIO_DATA } from '../config/portfolioData';

interface EngineeringStationPageProps {
  onBackToHome: () => void;
  onOpenLabPage: () => void;
  onNavigateToContact: () => void;
  playBlip: () => void;
}

export const EngineeringStationPage: React.FC<EngineeringStationPageProps> = ({
  onBackToHome,
  onOpenLabPage,
  onNavigateToContact,
  playBlip,
}) => {
  // Logic Gate Simulator State
  const [selectedGate, setSelectedGate] = useState<LogicGateType>('AND');
  const [inputA, setInputA] = useState<boolean>(true);
  const [inputB, setInputB] = useState<boolean>(false);

  // Bug Hunter Game State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);

  // Community Tool Suggestion Simulator State
  const [suggestToolName, setSuggestToolName] = useState('');
  const [suggestToolCategory, setSuggestToolCategory] = useState('Code & Dev');
  const [suggestToolDesc, setSuggestToolDesc] = useState('');
  const [submittedTools, setSubmittedTools] = useState<Array<{ name: string; cat: string; desc: string; date: string }>>([
    {
      name: 'v0.dev',
      cat: 'Web & UI',
      desc: 'Generative UI component builder by Vercel for fast frontend prototyping.',
      date: 'Just now',
    },
  ]);
  const [toolSubmittedAlert, setToolSubmittedAlert] = useState(false);

  // Current logic output
  const gateOutput = evaluateLogicGate(selectedGate, inputA, inputB);
  const currentChallenge = BUG_CHALLENGES[currentChallengeIdx];
  const challengeResult =
    quizSubmitted && selectedOption !== null
      ? checkBugFix(currentChallenge.id, selectedOption)
      : null;

  const handleOptionSelect = (idx: number) => {
    if (quizSubmitted) return;
    playBlip();
    setSelectedOption(idx);
  };

  const handleCheckBug = () => {
    if (selectedOption === null) return;
    playBlip();
    setQuizSubmitted(true);
    const res = checkBugFix(currentChallenge.id, selectedOption);
    if (res.isCorrect && !answeredIds.includes(currentChallenge.id)) {
      setScore((prev) => prev + res.points);
      setAnsweredIds((prev) => [...prev, currentChallenge.id]);
    }
  };

  const handleNextChallenge = () => {
    playBlip();
    setSelectedOption(null);
    setQuizSubmitted(false);
    setCurrentChallengeIdx((prev) => (prev + 1) % BUG_CHALLENGES.length);
  };

  const handleResetQuiz = () => {
    playBlip();
    setCurrentChallengeIdx(0);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setScore(0);
    setAnsweredIds([]);
  };

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestToolName.trim() || !suggestToolDesc.trim()) return;
    playBlip();
    setSubmittedTools((prev) => [
      {
        name: suggestToolName.trim(),
        cat: suggestToolCategory,
        desc: suggestToolDesc.trim(),
        date: 'Today',
      },
      ...prev,
    ]);
    setSuggestToolName('');
    setSuggestToolDesc('');
    setToolSubmittedAlert(true);
    setTimeout(() => setToolSubmittedAlert(false), 4000);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Top Breadcrumb & Interconnection Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#111115] border-2 border-white rounded-2xl comic-shadow-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToHome}
            className="px-3 py-1.5 rounded-xl bg-white text-black font-comic font-extrabold text-xs border-2 border-black hover:bg-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PAGE 1: MAIN PORTFOLIO</span>
          </button>
          <button
            type="button"
            onClick={onOpenLabPage}
            className="px-3 py-1.5 rounded-xl bg-[#38bdf8] text-black font-comic font-extrabold text-xs border-2 border-black hover:bg-[#0284c7] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>PAGE 2: CREATIVE LAB</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#facc15] text-black font-comic font-extrabold text-[11px] border border-black shadow-[1px_1px_0px_#000000]">
            PAGE 3: ENGINEERING STATION & ARCADE ★ NEW
          </span>
          <button
            type="button"
            onClick={onNavigateToContact}
            className="px-3 py-1.5 rounded-xl bg-[#4ade80] text-black font-comic font-extrabold text-xs border-2 border-black hover:bg-[#22c55e] transition-colors cursor-pointer"
          >
            CONNECT 💬
          </button>
        </div>
      </div>

      {/* Hero Intro Banner */}
      <div className="relative bg-gradient-to-r from-[#0d131a] via-[#111722] to-[#0a1016] border-4 border-black rounded-3xl p-6 sm:p-10 comic-shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#facc15] text-black font-comic text-xs font-black border-2 border-black">
            <Gamepad2 className="w-4 h-4" />
            <span>HUZAIFA'S DIPLOMA CE WORKSHOP & TECH ARCADE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-comic font-black tracking-wide text-white drop-shadow-[2px_2px_0px_#000000]">
            ENGINEERING STATION & DEV ARCADE 🕹️
          </h1>

          <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
            Welcome to Page 3! This interactive workshop brings to life first-year Diploma in Computer Engineering concepts from{' '}
            <strong className="text-white underline decoration-[#facc15] decoration-2">MMANTC</strong>.
            Simulate digital logic gates (ALU circuits), hunt down tricky C & Python bugs, inspect our semester practical journal, and suggest tools to the{' '}
            <strong className="text-[#38bdf8]">Dedon.ai</strong> directory!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-comic font-extrabold">
            <span className="px-3 py-1 rounded-xl bg-black/60 border border-zinc-700 text-zinc-300">
              ⚡ 1st Year Diploma in Computer Engineering
            </span>
            <span className="px-3 py-1 rounded-xl bg-black/60 border border-zinc-700 text-zinc-300">
              📍 MMANTC Campus • Madhubani
            </span>
            <span className="px-3 py-1 rounded-xl bg-[#38bdf8]/20 border border-[#38bdf8] text-[#38bdf8]">
              🎮 Interactive Logic & Bug Arcade
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: INTERACTIVE LOGIC GATE SIMULATOR (ALU & DIGITAL ELECTRONICS) */}
      {/* ========================================================================= */}
      <section className="bg-[#0f1115] border-4 border-black rounded-3xl p-6 sm:p-8 comic-shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#38bdf8] text-black border-2 border-black flex items-center justify-center font-comic font-extrabold text-2xl comic-shadow-sm">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-comic font-extrabold text-[#38bdf8] uppercase tracking-wider">
                DIGITAL TECHNIQUES & COMPUTER ARCHITECTURE (SEM 2)
              </div>
              <h2 className="text-xl sm:text-2xl font-comic font-black text-white">
                Interactive Logic Gate Simulator ⚡
              </h2>
            </div>
          </div>
          <div className="text-xs font-comic text-zinc-400 bg-black/40 px-3 py-1.5 rounded-xl border border-zinc-800">
            Simulating Boolean Algebra & Transistor Gates
          </div>
        </div>

        {/* Gate Selection Buttons */}
        <div className="space-y-2">
          <div className="text-xs font-comic text-zinc-400 font-bold uppercase tracking-wider">
            Select Logic Gate Architecture:
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {(['AND', 'OR', 'XOR', 'NAND', 'NOR', 'NOT'] as LogicGateType[]).map((gate) => {
              const isSelected = selectedGate === gate;
              return (
                <button
                  key={gate}
                  type="button"
                  onClick={() => {
                    playBlip();
                    setSelectedGate(gate);
                  }}
                  className={`py-2 px-3 rounded-xl font-comic text-xs font-extrabold border-2 transition-all cursor-pointer text-center ${
                    isSelected
                      ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000000] scale-105'
                      : 'bg-[#181a20] text-zinc-300 border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  {gate} GATE
                </button>
              );
            })}
          </div>
        </div>

        {/* Circuit Diagram Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#090a0d] border-2 border-zinc-800 rounded-2xl p-6">
          {/* Left: Input Switches */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-center">
            <div className="text-xs font-comic text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#facc15]" />
              <span>Input Logic Switches</span>
            </div>

            {/* Input A Switch */}
            <div className="p-3 bg-[#13151b] border-2 border-black rounded-xl flex items-center justify-between">
              <div>
                <span className="font-comic font-bold text-sm text-white">Input A:</span>
                <span className="ml-2 font-mono text-xs text-zinc-400">
                  {inputA ? 'HIGH (+5V / 1)' : 'LOW (0V / 0)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playBlip();
                  setInputA(!inputA);
                }}
                className={`px-4 py-1.5 rounded-xl font-comic font-extrabold text-xs border-2 border-black transition-all cursor-pointer ${
                  inputA
                    ? 'bg-[#4ade80] text-black shadow-[2px_2px_0px_#000000]'
                    : 'bg-zinc-800 text-zinc-400 shadow-[1px_1px_0px_#000000]'
                }`}
              >
                {inputA ? '1 (ON)' : '0 (OFF)'}
              </button>
            </div>

            {/* Input B Switch (Disabled if NOT gate) */}
            <div
              className={`p-3 bg-[#13151b] border-2 border-black rounded-xl flex items-center justify-between ${
                selectedGate === 'NOT' ? 'opacity-40 pointer-events-none' : ''
              }`}
            >
              <div>
                <span className="font-comic font-bold text-sm text-white">Input B:</span>
                <span className="ml-2 font-mono text-xs text-zinc-400">
                  {selectedGate === 'NOT'
                    ? 'NOT USED'
                    : inputB
                    ? 'HIGH (+5V / 1)'
                    : 'LOW (0V / 0)'}
                </span>
              </div>
              <button
                type="button"
                disabled={selectedGate === 'NOT'}
                onClick={() => {
                  playBlip();
                  setInputB(!inputB);
                }}
                className={`px-4 py-1.5 rounded-xl font-comic font-extrabold text-xs border-2 border-black transition-all cursor-pointer ${
                  inputB
                    ? 'bg-[#4ade80] text-black shadow-[2px_2px_0px_#000000]'
                    : 'bg-zinc-800 text-zinc-400 shadow-[1px_1px_0px_#000000]'
                }`}
              >
                {inputB ? '1 (ON)' : '0 (OFF)'}
              </button>
            </div>

            <div className="text-[11px] font-sans text-zinc-400">
              💡 Toggle the switches above to observe the live Boolean output logic change across the circuit.
            </div>
          </div>

          {/* Center: Circuit Visualizer Animation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#12141a] border-2 border-black rounded-2xl relative">
            <div className="flex items-center gap-4 w-full justify-between">
              {/* Input Wires */}
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-zinc-400">A</span>
                  <div
                    className={`h-1 flex-1 rounded transition-colors ${
                      inputA ? 'bg-[#4ade80] shadow-[0_0_8px_#4ade80]' : 'bg-zinc-700'
                    }`}
                  />
                </div>
                {selectedGate !== 'NOT' && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-zinc-400">B</span>
                    <div
                      className={`h-1 flex-1 rounded transition-colors ${
                        inputB ? 'bg-[#4ade80] shadow-[0_0_8px_#4ade80]' : 'bg-zinc-700'
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Gate Core Box */}
              <div className="w-24 h-24 rounded-2xl bg-[#1e222d] border-4 border-black flex flex-col items-center justify-center comic-shadow-sm p-2 z-10">
                <span className="font-comic font-black text-lg text-white">
                  {selectedGate}
                </span>
                <span className="text-[9px] font-mono text-[#38bdf8]">
                  74LS{selectedGate === 'AND' ? '08' : selectedGate === 'OR' ? '32' : selectedGate === 'XOR' ? '86' : '04'}
                </span>
              </div>

              {/* Output Wire */}
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`h-1.5 flex-1 rounded transition-colors ${
                    gateOutput ? 'bg-[#38bdf8] shadow-[0_0_12px_#38bdf8]' : 'bg-zinc-700'
                  }`}
                />
                <span className="font-mono text-xs font-bold text-zinc-400">Q</span>
              </div>
            </div>

            {/* Output Indicator Display */}
            <div className="mt-6 flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-full border-4 border-black flex items-center justify-center font-comic font-black text-xl transition-all ${
                  gateOutput
                    ? 'bg-[#38bdf8] text-black shadow-[0_0_25px_#38bdf8] scale-110'
                    : 'bg-zinc-900 text-zinc-600'
                }`}
              >
                {gateOutput ? '1' : '0'}
              </div>
              <div>
                <div className="font-comic font-black text-base text-white">
                  {gateOutput ? 'OUTPUT: HIGH (+5V)' : 'OUTPUT: LOW (0V)'}
                </div>
                <div className="font-mono text-xs text-zinc-400">
                  Boolean Expression: {selectedGate === 'NOT' ? 'Q = ¬A' : selectedGate === 'AND' ? 'Q = A · B' : selectedGate === 'OR' ? 'Q = A + B' : 'Q = A ⊕ B'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Truth Table Highlight */}
          <div className="lg:col-span-3 bg-[#13151b] border-2 border-black rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-comic text-zinc-400 font-bold uppercase tracking-wider mb-2">
                Live Truth Table
              </div>
              <div className="space-y-1 font-mono text-xs">
                <div className="grid grid-cols-3 text-center text-zinc-500 font-bold pb-1 border-b border-zinc-700">
                  <span>A</span>
                  <span>B</span>
                  <span>OUT</span>
                </div>
                {[
                  { a: false, b: false },
                  { a: false, b: true },
                  { a: true, b: false },
                  { a: true, b: true },
                ].map((row, i) => {
                  const out = evaluateLogicGate(selectedGate, row.a, row.b);
                  const isActive =
                    selectedGate === 'NOT'
                      ? inputA === row.a
                      : inputA === row.a && inputB === row.b;

                  return (
                    <div
                      key={i}
                      className={`grid grid-cols-3 text-center py-1 rounded transition-colors ${
                        isActive
                          ? 'bg-[#38bdf8] text-black font-extrabold shadow-[1px_1px_0px_#000000]'
                          : 'text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      <span>{row.a ? '1' : '0'}</span>
                      <span>{selectedGate === 'NOT' ? '-' : row.b ? '1' : '0'}</span>
                      <span>{out ? '1' : '0'}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-800 text-[10px] font-sans text-zinc-400">
              📌 Taught in MMANTC 1st Year Diploma curriculum as the building blocks for Arithmetic Logic Units (ALUs).
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: C & PYTHON BUG HUNTER ARCADE MINI-GAME                         */}
      {/* ========================================================================= */}
      <section className="bg-[#0f1115] border-4 border-black rounded-3xl p-6 sm:p-8 comic-shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#facc15] text-black border-2 border-black flex items-center justify-center font-comic font-extrabold text-2xl comic-shadow-sm">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-comic font-extrabold text-[#facc15] uppercase tracking-wider">
                INTERACTIVE CODING CHALLENGE
              </div>
              <h2 className="text-xl sm:text-2xl font-comic font-black text-white">
                C & Python Bug Hunter Arcade 👾
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#1d222e] border-2 border-black text-[#facc15] font-comic font-extrabold text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#000000]">
              <Trophy className="w-4 h-4 text-[#facc15]" />
              <span>SCORE: {score} XP</span>
            </div>
            <button
              type="button"
              onClick={handleResetQuiz}
              className="p-2 rounded-xl bg-zinc-800 border-2 border-black text-zinc-300 hover:text-white cursor-pointer"
              title="Reset Challenge"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Challenge Box */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-comic font-bold text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#38bdf8] text-black font-extrabold">
                {currentChallenge.language}
              </span>
              <span className="text-white text-sm">
                Mission {currentChallengeIdx + 1} of {BUG_CHALLENGES.length}: {currentChallenge.title}
              </span>
            </div>
            <span className="text-[#facc15]">+{currentChallenge.points} XP REWARD</span>
          </div>

          {/* Snippet Card */}
          <div className="p-4 bg-[#0a0a0d] border-2 border-zinc-800 rounded-2xl font-mono text-sm text-zinc-200 overflow-x-auto relative">
            <div className="absolute top-2 right-3 text-[10px] font-comic text-zinc-500 uppercase">
              Identify the fatal bug:
            </div>
            <pre className="pt-2 leading-relaxed whitespace-pre-wrap">{currentChallenge.code}</pre>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <div className="text-xs font-comic text-zinc-400 font-bold uppercase">
              How would you fix this bug?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentChallenge.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-[#181a20] text-zinc-200 border-zinc-700 hover:border-zinc-500';

                if (isSelected && !quizSubmitted) {
                  btnStyle = 'bg-[#38bdf8] text-black border-black shadow-[2px_2px_0px_#000000]';
                } else if (quizSubmitted) {
                  if (idx === currentChallenge.correctIndex) {
                    btnStyle = 'bg-[#4ade80] text-black border-black font-extrabold shadow-[2px_2px_0px_#000000]';
                  } else if (isSelected && idx !== currentChallenge.correctIndex) {
                    btnStyle = 'bg-red-500 text-white border-black font-extrabold shadow-[2px_2px_0px_#000000]';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={quizSubmitted}
                    onClick={() => handleOptionSelect(idx)}
                    className={`p-3.5 rounded-xl text-left font-sans text-xs sm:text-sm border-2 transition-all cursor-pointer flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <span className="font-comic font-extrabold text-sm opacity-80">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="flex-1">{opt}</span>
                    {quizSubmitted && idx === currentChallenge.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    )}
                    {quizSubmitted && isSelected && idx !== currentChallenge.correctIndex && (
                      <XCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row & Feedback Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            {!quizSubmitted ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleCheckBug}
                className="px-6 py-2.5 rounded-xl bg-[#facc15] text-black font-comic font-black text-sm border-2 border-black shadow-[3px_3px_0px_#ffffff] hover:translate-y-[-2px] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                SUBMIT FIX 🚀
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextChallenge}
                className="px-6 py-2.5 rounded-xl bg-[#38bdf8] text-black font-comic font-black text-sm border-2 border-black shadow-[3px_3px_0px_#ffffff] hover:translate-y-[-2px] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>NEXT BUG CHALLENGE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Explanation Result */}
            {quizSubmitted && challengeResult && (
              <div
                className={`p-3 rounded-xl border-2 border-black flex-1 text-xs font-sans flex items-center gap-2 ${
                  challengeResult.isCorrect
                    ? 'bg-[#4ade80]/20 text-[#4ade80] border-[#4ade80]'
                    : 'bg-red-500/20 text-red-300 border-red-500'
                }`}
              >
                <Lightbulb className="w-4 h-4 shrink-0" />
                <span>
                  <strong>{challengeResult.isCorrect ? 'Correct! ' : 'Not quite. '}</strong>
                  {challengeResult.explanation}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: MMANTC SEMESTER PRACTICAL JOURNAL & SYLLABUS ROADMAP           */}
      {/* ========================================================================= */}
      <section className="bg-[#0f1115] border-4 border-black rounded-3xl p-6 sm:p-8 comic-shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#4ade80] text-black border-2 border-black flex items-center justify-center font-comic font-extrabold text-2xl comic-shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-comic font-extrabold text-[#4ade80] uppercase tracking-wider">
                ACADEMIC DOSSIER & LAB PRACTICALS
              </div>
              <h2 className="text-xl sm:text-2xl font-comic font-black text-white">
                MMANTC 1st Year Engineering Journal 📘
              </h2>
            </div>
          </div>
          <span className="text-xs font-comic text-zinc-300 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700">
            MSBTE / Polytechnic Curriculum Standard
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Semester 1 Practical Card */}
          <div className="p-5 bg-[#12141a] border-2 border-black rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-[#38bdf8] text-black font-comic text-xs font-black">
                SEMESTER 1 (COMPLETED)
              </span>
              <span className="text-xs font-mono text-[#4ade80] font-bold">100% VERIFIED</span>
            </div>
            <h3 className="font-comic font-bold text-base text-white">
              C Programming & Computer Hardware Lab
            </h3>
            <ul className="space-y-2 text-xs font-sans text-zinc-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                <span>Pointers, dynamic memory allocation (`malloc`/`free`), and array algorithms</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                <span>Structures, unions, and file input/output streams</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                <span>Motherboard component identification, BIOS setup, and OS installation</span>
              </li>
            </ul>
          </div>

          {/* Semester 2 Practical Card */}
          <div className="p-5 bg-[#12141a] border-2 border-black rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-[#facc15] text-black font-comic text-xs font-black">
                SEMESTER 2 (ACTIVE & IN PROGRESS)
              </span>
              <span className="text-xs font-mono text-[#facc15] font-bold">IN PROGRESS ⚡</span>
            </div>
            <h3 className="font-comic font-bold text-base text-white">
              Digital Techniques, Web Development & Python
            </h3>
            <ul className="space-y-2 text-xs font-sans text-zinc-300">
              <li className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-[#facc15] shrink-0 mt-0.5" />
                <span>Boolean algebra minimization with Karnaugh Maps (K-Maps) and logic gates</span>
              </li>
              <li className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-[#facc15] shrink-0 mt-0.5" />
                <span>Combinational logic: multiplexers, demultiplexers, half/full adders</span>
              </li>
              <li className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-[#facc15] shrink-0 mt-0.5" />
                <span>Responsive Web client engineering (HTML5, Tailwind, JavaScript)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: DEDON.AI TOOL SUGGESTION PLAYGROUND & SUBMISSION SIMULATOR     */}
      {/* ========================================================================= */}
      <section className="bg-[#0f1115] border-4 border-black rounded-3xl p-6 sm:p-8 comic-shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#38bdf8] text-black border-2 border-black flex items-center justify-center font-comic font-extrabold text-2xl comic-shadow-sm">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-comic font-extrabold text-[#38bdf8] uppercase tracking-wider">
                COMMUNITY DIRECTORY PLAYGROUND
              </div>
              <h2 className="text-xl sm:text-2xl font-comic font-black text-white">
                Suggest an AI Tool to Dedon.ai 🤖
              </h2>
            </div>
          </div>
          <span className="text-xs font-comic text-zinc-400">
            Have a favorite AI tool? Add it to Huzaifa's curation radar!
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Form */}
          <form onSubmit={handleAddTool} className="lg:col-span-6 space-y-4">
            <div>
              <label className="block text-xs font-comic font-bold text-zinc-300 uppercase mb-1">
                AI Tool Name *
              </label>
              <input
                type="text"
                required
                value={suggestToolName}
                onChange={(e) => setSuggestToolName(e.target.value)}
                placeholder="e.g., Cursor IDE, v0.dev, Mistral Large"
                className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border-2 border-zinc-700 focus:border-[#38bdf8] text-white text-sm font-sans outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-comic font-bold text-zinc-300 uppercase mb-1">
                  Category *
                </label>
                <select
                  value={suggestToolCategory}
                  onChange={(e) => setSuggestToolCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#090a0d] border-2 border-zinc-700 focus:border-[#38bdf8] text-white text-xs font-comic outline-none cursor-pointer"
                >
                  <option value="Code & Dev">Code & Dev</option>
                  <option value="Chat & LLMs">Chat & LLMs</option>
                  <option value="Vision & Art">Vision & Art</option>
                  <option value="Research & Web">Research & Web</option>
                  <option value="Web & UI">Web & UI</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-comic font-bold text-zinc-300 uppercase mb-1">
                  Target Audience
                </label>
                <div className="px-3 py-2.5 rounded-xl bg-[#090a0d] border-2 border-zinc-800 text-xs font-sans text-zinc-400">
                  Engineering Students
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-comic font-bold text-zinc-300 uppercase mb-1">
                Short Description / Why Huzaifa should feature it *
              </label>
              <textarea
                required
                rows={3}
                value={suggestToolDesc}
                onChange={(e) => setSuggestToolDesc(e.target.value)}
                placeholder="What makes this AI tool uniquely powerful for student developers?"
                className="w-full px-4 py-2 rounded-xl bg-[#090a0d] border-2 border-zinc-700 focus:border-[#38bdf8] text-white text-sm font-sans outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#38bdf8] text-black font-comic font-black text-sm border-2 border-black shadow-[3px_3px_0px_#ffffff] hover:translate-y-[-2px] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>SUBMIT TOOL TO DEDON.AI QUEUE 🚀</span>
            </button>

            {toolSubmittedAlert && (
              <div className="p-3 rounded-xl bg-[#4ade80]/20 border-2 border-[#4ade80] text-[#4ade80] text-xs font-comic font-bold flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4 h-4" />
                <span>Awesome! Your tool suggestion has been staged for Huzaifa's review!</span>
              </div>
            )}
          </form>

          {/* Right: Live Staged Tool Cards */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-comic text-zinc-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Recently Staged Directory Submissions:</span>
              <span className="text-[#38bdf8]">{submittedTools.length} tools queued</span>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {submittedTools.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#13151b] border-2 border-black rounded-xl space-y-1.5 comic-shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-comic font-black text-sm text-white">
                      {tool.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#facc15] text-black font-comic text-[10px] font-extrabold border border-black">
                      {tool.cat}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    {tool.desc}
                  </p>
                  <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                    <span>Submitted: {tool.date}</span>
                    <span>•</span>
                    <span className="text-[#4ade80]">Ready for Review</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: INTERCONNECTED 3-PAGE PORTALS                                  */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-[#13151d] to-[#0a0a0d] border-4 border-black rounded-3xl p-6 sm:p-8 comic-shadow-lg text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#facc15] text-black font-comic text-xs font-black border-2 border-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERCONNECTED MULTI-PAGE ECOSYSTEM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-comic font-black text-white">
            Where Would You Like to Go Next? 🚀
          </h2>
          <p className="text-xs sm:text-sm font-sans text-zinc-300">
            Switch effortlessly between all 3 interconnected corners of Huzaifa Hussain's portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {/* Card 1: Page 1 */}
          <div
            onClick={onBackToHome}
            className="p-5 rounded-2xl bg-[#161820] border-2 border-white hover:border-[#facc15] comic-shadow-sm hover:translate-y-[-4px] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#facc15] text-black font-comic text-[11px] font-black">
                PAGE 1
              </span>
              <h3 className="font-comic font-extrabold text-base text-white">
                Main Portfolio & 3D Photo Box 📸
              </h3>
              <p className="text-xs font-sans text-zinc-400">
                Experience the 360° touch-to-spin cube, about story, technical skill charts, and 3D photo gallery.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 font-comic text-xs font-extrabold text-[#facc15]">
              <span>OPEN PAGE 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Page 2 */}
          <div
            onClick={onOpenLabPage}
            className="p-5 rounded-2xl bg-[#161820] border-2 border-white hover:border-[#38bdf8] comic-shadow-sm hover:translate-y-[-4px] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#38bdf8] text-black font-comic text-[11px] font-black">
                PAGE 2
              </span>
              <h3 className="font-comic font-extrabold text-base text-white">
                Creative Lab & Terminal 🧪
              </h3>
              <p className="text-xs font-sans text-zinc-400">
                Execute C and Python algorithms live in the console and review the Online Shopping ICT seminar deck.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 font-comic text-xs font-extrabold text-[#38bdf8]">
              <span>OPEN PAGE 2</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Contact */}
          <div
            onClick={onNavigateToContact}
            className="p-5 rounded-2xl bg-[#161820] border-2 border-white hover:border-[#4ade80] comic-shadow-sm hover:translate-y-[-4px] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#4ade80] text-black font-comic text-[11px] font-black">
                DIRECT CONTACT
              </span>
              <h3 className="font-comic font-extrabold text-base text-white">
                Say Hello & Collaborate 💬
              </h3>
              <p className="text-xs font-sans text-zinc-400">
                Send a postcard or message directly to Huzaifa (hozikhan00@gmail.com) in Madhubani, Bihar.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 font-comic text-xs font-extrabold text-[#4ade80]">
              <span>DROP A MESSAGE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
