import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import {
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Search,
  ExternalLink,
  BookOpen,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Layers,
  MapPin,
  Flame,
  CheckCircle2,
  Copy,
  FolderGit2,
  Sliders,
  Send,
  Star,
} from 'lucide-react';

interface ShowcaseLabPageProps {
  onBackToHome: () => void;
  onOpenEngineeringStation?: () => void;
  onNavigateToContact: () => void;
  playBlip: () => void;
}

// Sample interactive algorithms for the in-browser C & Python playground
interface CodeSnippet {
  id: string;
  title: string;
  language: 'C' | 'Python';
  badgeColor: string;
  description: string;
  code: string;
  runOutput: string[];
}

const ALGORITHMS: CodeSnippet[] = [
  {
    id: 'bubble-sort',
    title: 'Bubble Sort Algorithm (C99)',
    language: 'C',
    badgeColor: '#38bdf8',
    description: 'Classic O(n²) comparison sort implemented in standard C with swap telemetry.',
    code: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    int i, j, temp;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int data[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(data) / sizeof(data[0]);
    printf("Initial: ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");

    bubbleSort(data, n);

    printf("Sorted : ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");
    return 0;
}`,
    runOutput: [
      '[COMPILER] gcc -Wall -O2 bubble_sort.c -o bubble_sort',
      '[BUILD] Compilation succeeded with 0 warnings, 0 errors.',
      '[RUN] Initial array: [64, 34, 25, 12, 22, 11, 90]',
      '[PASS 1] Swapping 64 <-> 34 | Swapping 64 <-> 25 | Swapping 64 <-> 12 ...',
      '[PASS 2] Element 90 locked at index 6',
      '[PASS 3] Element 64 locked at index 5',
      '[RESULT] Sorted array: 11 12 22 25 34 64 90',
      '[METRICS] Comparisons: 21 | Swaps: 14 | Execution: 0.0004s | Memory: 42 KB',
      '★ Program exited with status code 0 (SUCCESS)',
    ],
  },
  {
    id: 'binary-search',
    title: 'Recursive Binary Search (Python 3)',
    language: 'Python',
    badgeColor: '#facc15',
    description: 'Logarithmic O(log n) search through sorted arrays using divide-and-conquer.',
    code: `def binary_search(arr, low, high, target):
    if high >= low:
        mid = (high + low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] > target:
            return binary_search(arr, low, mid - 1, target)
        else:
            return binary_search(arr, mid + 1, high, target)
    else:
        return -1

items = [10, 23, 35, 42, 58, 67, 81, 94]
target_val = 58
result = binary_search(items, 0, len(items) - 1, target_val)
print(f"Target {target_val} found at index: {result}")`,
    runOutput: [
      '[INTERPRETER] python3 binary_search.py',
      '[ENV] Python 3.11.8 on Linux x86_64',
      '[INPUT] Array: [10, 23, 35, 42, 58, 67, 81, 94], Target = 58',
      '[ITER 1] low=0, high=7, mid=3 (val=42) -> 42 < 58, search right branch',
      '[ITER 2] low=4, high=7, mid=5 (val=67) -> 67 > 58, search left branch',
      '[ITER 3] low=4, high=4, mid=4 (val=58) -> MATCH FOUND!',
      '[OUTPUT] Target 58 found at index: 4',
      '[METRICS] Steps: 3 iterations vs 8 linear scans | Time: 0.0018s',
      '★ Execution completed cleanly.',
    ],
  },
  {
    id: 'fibonacci-c',
    title: 'Iterative Fibonacci with Memoization (C)',
    language: 'C',
    badgeColor: '#4ade80',
    description: 'Linear time O(n) Fibonacci calculation avoiding exponential stack recursion.',
    code: `#include <stdio.h>

long long fibonacci(int n) {
    if (n <= 1) return n;
    long long prev2 = 0, prev1 = 1, curr;
    for (int i = 2; i <= n; i++) {
        curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return curr;
}

int main() {
    int target = 45;
    printf("Fibonacci(%d) = %lld\\n", target, fibonacci(target));
    return 0;
}`,
    runOutput: [
      '[COMPILER] gcc -O3 fibonacci.c -o fibonacci',
      '[STACK] Dynamic stack allocated: 16 bytes for iterative pointers',
      '[EVAL] Calculating Fibonacci sequence up to N=45...',
      '[CHECKPOINT] F(10) = 55',
      '[CHECKPOINT] F(25) = 75025',
      '[CHECKPOINT] F(40) = 102334155',
      '[RESULT] Fibonacci(45) = 1134903170',
      '[METRICS] Space Complexity: O(1) auxiliary | Time: O(n) 0.0001s',
      '★ Benchmark verified on MMANTC lab specs.',
    ],
  },
];

// Sample AI directory tools for the interactive Dedon.ai simulation
const DEDON_SAMPLE_TOOLS = [
  { name: 'DeepSeek Coder', category: 'Code & Dev', desc: 'Open-weights coding model specializing in C & Python algorithms', badge: 'FREE' },
  { name: 'Claude 3.7 Sonnet', category: 'Chat & LLMs', desc: 'Hybrid reasoning architecture for complex technical workflows', badge: 'TOP RATED' },
  { name: 'Gemini 2.5 Flash', category: 'Multimodal', desc: 'High-speed multimodal inference and real-time processing', badge: 'FAST' },
  { name: 'Cursor IDE', category: 'Code & Dev', desc: 'AI-first code editor accelerating full-stack student development', badge: 'EDITOR' },
  { name: 'Midjourney v6', category: 'Vision & Art', desc: 'Photorealistic asset creation and design concept generator', badge: 'VISION' },
  { name: 'Perplexity AI', category: 'Search & Research', desc: 'Real-time conversational web indexer with cited papers', badge: 'RESEARCH' },
];

// ICT Presentation Slides
const ICT_SLIDES = [
  {
    slideNumber: 1,
    title: 'E-Commerce Infrastructure Overview',
    tagline: 'Three-Tier Architecture & Gateway Stack',
    points: [
      'Presentation Tier: Responsive Web client (SPA/PWA) communicating via HTTPS',
      'Application Tier: Business logic, cart state machines, and microservice orchestration',
      'Database Tier: ACID compliant inventory records and user credentials storage',
      'Presented by Huzaifa Hussain during MMANTC Computer Engineering ICT seminar',
    ],
  },
  {
    slideNumber: 2,
    title: 'Transaction Security & Payment Gateways',
    tagline: 'Cryptographic Protection for Digital Payments',
    points: [
      'TLS 1.3 handshake preventing man-in-the-middle attacks during checkout',
      'PCI-DSS compliance with tokenized card data (no raw CVV/card stored)',
      'Multi-factor authentication (MFA / OTP) via verified telecom channels',
      'Zero-trust fraud detection inspecting anomalous IP and geographical hops',
    ],
  },
  {
    slideNumber: 3,
    title: 'Real-Time Inventory & Dispatch Logistics',
    tagline: 'Automated Supply Chain State Synchronization',
    points: [
      'Event-driven architecture: Order placed -> Warehouse webhook -> Stock decrement',
      'Automated dispatch routing using location proximity heuristics',
      'Customer order tracking with real-time status updates and delivery ETAs',
      'High-availability fallback during peak discount shopping flash sales',
    ],
  },
  {
    slideNumber: 4,
    title: 'MMANTC Student Survey Findings',
    tagline: 'Real Data Collected from 80+ Engineering Students',
    points: [
      '92% of surveyed engineering students prefer UPI/QR code instant checkout',
      'Key pain point cited: slow return / refund processing on legacy platforms',
      '78% prioritize clean minimalist UI with fast loading speeds on mobile networks',
      'Conclusion: Future e-commerce requires ultra-fast lightweight frontend architectures',
    ],
  },
];

export const ShowcaseLabPage: React.FC<ShowcaseLabPageProps> = ({
  onBackToHome,
  onOpenEngineeringStation,
  onNavigateToContact,
  playBlip,
}) => {
  // Playground state
  const [activeAlgoIndex, setActiveAlgoIndex] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState<string[]>(ALGORITHMS[0].runOutput);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Dedon demo state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolFilter, setSelectedToolFilter] = useState('All');

  // ICT Slides state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Handle run code simulation
  const handleRunAlgorithm = () => {
    playBlip();
    setIsRunningCode(true);
    setTerminalOutput(['[EXEC] Initializing sandbox environment...', '[INFO] Linking compiler libraries...']);

    const targetOutput = ALGORITHMS[activeAlgoIndex].runOutput;
    let step = 0;

    const interval = setInterval(() => {
      if (step < targetOutput.length) {
        setTerminalOutput((prev) => [...prev, targetOutput[step]]);
        step++;
      } else {
        clearInterval(interval);
        setIsRunningCode(false);
      }
    }, 180);
  };

  const handleCopyCode = () => {
    playBlip();
    navigator.clipboard.writeText(ALGORITHMS[activeAlgoIndex].code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Filtered Dedon tools
  const filteredTools = DEDON_SAMPLE_TOOLS.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedToolFilter === 'All' || t.category === selectedToolFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 pt-24 pb-20 comic-dots-bg relative z-10">
      {/* Top Banner Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-3xl bg-[#121214] border-2 border-white comic-shadow-yellow">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playBlip();
                onBackToHome();
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#facc15] text-black font-comic font-extrabold text-xs sm:text-sm border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-y-[-2px] transition-transform cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← PAGE 1</span>
            </button>
            {onOpenEngineeringStation && (
              <button
                type="button"
                onClick={() => {
                  playBlip();
                  onOpenEngineeringStation();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#4ade80] text-black font-comic font-extrabold text-xs sm:text-sm border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-y-[-2px] transition-transform cursor-pointer"
              >
                <span>PAGE 3: DEV ARCADE 🕹️</span>
                <span className="text-[9px] bg-black text-white px-1.5 py-0.2 rounded-full">NEW</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-block px-3 py-1 rounded-xl bg-black text-[#38bdf8] border border-[#38bdf8] font-comic text-xs font-bold">
              PAGE 2: CREATIVE LAB
            </span>
            <button
              type="button"
              onClick={() => {
                playBlip();
                onNavigateToContact();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#38bdf8] text-black font-comic font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-y-[-2px] transition-transform cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>CONNECT 💬</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header for Page 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0c0e] border-3 border-white comic-shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#facc15] text-black font-comic text-xs font-extrabold border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HUZAIFA'S EXPERIMENTAL WORKSHOP &amp; LAB</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-comic font-extrabold text-white leading-tight">
              CREATIVE LAB &amp; <br />
              <span className="text-[#38bdf8] underline decoration-[#facc15] decoration-wavy">
                PROJECT BLUEPRINTS
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Welcome to Page 2! Test live C and Python code in the interactive terminal, explore the interactive blueprint for <strong>Dedon.ai</strong>, flip through the <strong>Online Shopping ICT Presentation</strong> slide deck, and inspect my diploma coursework at MMANTC.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2 font-comic text-xs">
              <span className="px-3 py-1 rounded-xl bg-[#141416] border border-[#facc15] text-[#facc15] font-bold">
                ⚡ 1st Year Diploma in Computer Engineering
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#141416] border border-[#4ade80] text-[#4ade80] font-bold">
                📍 MMANTC Campus • Madhubani
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#141416] border border-[#fb923c] text-[#fb923c] font-bold">
                🚀 Interactive Algorithms Sandbox
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* ========================================================================= */}
        {/* SECTION 1: INTERACTIVE C & PYTHON ALGORITHM PLAYGROUND                    */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-zinc-800 pb-4 gap-2">
            <div>
              <div className="flex items-center gap-2 font-hand text-[#facc15] text-sm font-bold">
                <Flame className="w-4 h-4" />
                <span>INTERACTIVE CODE RUNNER</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-comic font-extrabold text-white">
                C &amp; Python Algorithmic Console 💻
              </h2>
            </div>
            <span className="font-comic text-xs text-zinc-400">
              Select an algorithm below and click "RUN CODE"
            </span>
          </div>

          {/* Algorithm Picker Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {ALGORITHMS.map((algo, idx) => {
              const isSelected = activeAlgoIndex === idx;
              return (
                <button
                  key={algo.id}
                  type="button"
                  onClick={() => {
                    playBlip();
                    setActiveAlgoIndex(idx);
                    setTerminalOutput(algo.runOutput);
                  }}
                  className={`px-4 py-2.5 rounded-2xl font-comic text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-white text-black border-black shadow-[3px_3px_0px_#facc15] scale-105'
                      : 'bg-[#141416] text-zinc-300 border-zinc-700 hover:border-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: algo.badgeColor }}
                  />
                  <span>{algo.title}</span>
                </button>
              );
            })}
          </div>

          {/* Dual Panel Code Editor & Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Code Viewer */}
            <div className="lg:col-span-6 rounded-3xl bg-[#0e0e11] border-2 border-white comic-shadow-cyan overflow-hidden flex flex-col">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b-2 border-white">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f87171] border border-black" />
                  <div className="w-3 h-3 rounded-full bg-[#facc15] border border-black" />
                  <div className="w-3 h-3 rounded-full bg-[#4ade80] border border-black" />
                  <span className="ml-2 font-mono text-xs text-zinc-300 font-bold">
                    {ALGORITHMS[activeAlgoIndex].title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-1.5 rounded-lg bg-black/60 hover:bg-black text-zinc-300 hover:text-white transition-colors cursor-pointer text-[11px] font-mono flex items-center gap-1 border border-zinc-700"
                    title="Copy Code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode ? 'COPIED!' : 'COPY'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRunAlgorithm}
                    disabled={isRunningCode}
                    className="px-3 py-1.5 rounded-xl bg-[#4ade80] text-black font-comic text-xs font-extrabold border border-black shadow-[1px_1px_0px_#000000] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>{isRunningCode ? 'RUNNING...' : 'RUN CODE'}</span>
                  </button>
                </div>
              </div>

              {/* Code Preformatted Text */}
              <div className="p-4 font-mono text-xs text-zinc-200 overflow-x-auto bg-[#0a0a0c] leading-relaxed flex-1 max-h-[380px]">
                <pre>{ALGORITHMS[activeAlgoIndex].code}</pre>
              </div>

              <div className="px-4 py-2 bg-[#121216] border-t border-zinc-800 text-[11px] font-sans text-zinc-400">
                {ALGORITHMS[activeAlgoIndex].description}
              </div>
            </div>

            {/* Right: Simulated Interactive Output Terminal */}
            <div className="lg:col-span-6 rounded-3xl bg-[#09090b] border-2 border-white comic-shadow-green overflow-hidden flex flex-col">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#151518] border-b-2 border-white">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#4ade80]" />
                  <span className="font-mono text-xs text-[#4ade80] font-bold">
                    MMANTC-LAB-STATION // OUTPUT CONSOLE
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playBlip();
                    setTerminalOutput(['[INFO] Terminal cleared.']);
                  }}
                  className="p-1.5 rounded-lg bg-black text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs"
                  title="Clear Console"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Console Logs */}
              <div className="p-4 font-mono text-xs text-zinc-300 space-y-1.5 overflow-y-auto flex-1 max-h-[380px] bg-black/90">
                {terminalOutput.map((line, lIdx) => {
                  let colorClass = 'text-zinc-300';
                  if (line.startsWith('[COMPILER]') || line.startsWith('[INTERPRETER]')) colorClass = 'text-[#38bdf8] font-bold';
                  if (line.startsWith('[PASS') || line.startsWith('[ITER')) colorClass = 'text-[#facc15]';
                  if (line.startsWith('[RESULT]') || line.startsWith('[OUTPUT]')) colorClass = 'text-[#4ade80] font-bold text-sm';
                  if (line.startsWith('[METRICS]')) colorClass = 'text-[#fb923c]';
                  if (line.includes('SUCCESS') || line.includes('completed')) colorClass = 'text-[#4ade80]';

                  return (
                    <div key={lIdx} className={`${colorClass} flex items-start gap-1`}>
                      <span className="text-zinc-600 select-none">&gt;</span>
                      <span>{line}</span>
                    </div>
                  );
                })}

                {isRunningCode && (
                  <div className="flex items-center gap-2 text-[#facc15] pt-2 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#facc15]" />
                    <span>Executing instructions on simulated CPU...</span>
                  </div>
                )}
              </div>

              {/* Terminal Status Footer */}
              <div className="px-4 py-2 bg-[#121214] border-t border-zinc-800 flex justify-between items-center text-[11px] font-mono text-zinc-400">
                <span>STATUS: READY</span>
                <span className="text-[#4ade80]">PORT: TTY1 • ARCH: X86_64</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: DEDON.AI INTERACTIVE TOOLS DIRECTORY SIMULATION                */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-zinc-800 pb-4 gap-2">
            <div>
              <div className="flex items-center gap-2 font-hand text-[#38bdf8] text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                <span>FEATURED PROJECT BLUEPRINT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-comic font-extrabold text-white">
                Dedon.ai – AI Directory Simulation 🤖
              </h2>
            </div>
            <a
              href="https://dedon.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBlip()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#38bdf8] text-black font-comic text-xs font-bold border border-black shadow-[2px_2px_0px_#000000] hover:scale-105 transition-transform"
            >
              <span>VISIT DEDON.AI</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0f13] border-2 border-white comic-shadow-yellow space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-comic font-extrabold text-white">
                Interactive Directory Search Demo
              </h3>
              <p className="text-sm text-zinc-300 font-sans mt-1">
                Dedon.ai catalogs over 250+ next-gen AI tools for developers, designers, and students. Test the real-time search filter below:
              </p>
            </div>

            {/* Search Input & Category Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search AI tools (e.g., 'code', 'claude', 'vision')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#18181c] border-2 border-zinc-700 text-white font-comic text-xs focus:border-[#facc15] focus:outline-none transition-colors"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Code & Dev', 'Chat & LLMs', 'Vision & Art'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      playBlip();
                      setSelectedToolFilter(cat);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-comic text-xs font-bold border transition-colors cursor-pointer ${
                      selectedToolFilter === cat
                        ? 'bg-[#facc15] text-black border-black shadow-[1px_1px_0px_#000000]'
                        : 'bg-[#18181c] text-zinc-300 border-zinc-700 hover:border-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Simulated Tools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool, tIdx) => (
                <div
                  key={tIdx}
                  className="p-4 rounded-2xl bg-[#16161b] border-2 border-zinc-700 hover:border-[#38bdf8] transition-colors space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-comic font-extrabold text-sm text-white">
                        {tool.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#38bdf8]/20 text-[#38bdf8] font-comic text-[10px] font-bold border border-[#38bdf8]/40">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 font-sans mt-1">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[11px] font-comic">
                    <span className="text-zinc-400">{tool.category}</span>
                    <button
                      type="button"
                      onClick={() => playBlip()}
                      className="text-[#facc15] hover:underline font-bold cursor-pointer"
                    >
                      Inspect →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="p-8 text-center font-comic text-sm text-zinc-400">
                No tools matched your search "{searchQuery}". Try searching "Python" or "Chat".
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: ONLINE SHOPPING ICT PRESENTATION SLIDE CAROUSEL                */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-zinc-800 pb-4 gap-2">
            <div>
              <div className="flex items-center gap-2 font-hand text-[#4ade80] text-sm font-bold">
                <BookOpen className="w-4 h-4" />
                <span>SEMINAR PRESENTATION SLIDES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-comic font-extrabold text-white">
                Online Shopping ICT Presentation 🛒
              </h2>
            </div>
            <span className="font-comic text-xs text-zinc-400">
              Grade A+ Commendation at MMANTC
            </span>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-[#0d0d10] border-2 border-white comic-shadow-green space-y-6">
            {/* Slide Header with Navigation Buttons */}
            <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#4ade80] text-black font-comic font-extrabold text-base flex items-center justify-center border-2 border-black">
                  {ICT_SLIDES[currentSlideIndex].slideNumber}
                </div>
                <div>
                  <div className="font-comic text-xs text-zinc-400">
                    SLIDE {currentSlideIndex + 1} OF {ICT_SLIDES.length}
                  </div>
                  <div className="font-comic text-lg font-bold text-white">
                    {ICT_SLIDES[currentSlideIndex].title}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playBlip();
                    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : ICT_SLIDES.length - 1));
                  }}
                  className="p-2 rounded-xl bg-[#18181c] border-2 border-white text-white hover:bg-zinc-800 cursor-pointer transition-colors"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playBlip();
                    setCurrentSlideIndex((prev) => (prev < ICT_SLIDES.length - 1 ? prev + 1 : 0));
                  }}
                  className="p-2 rounded-xl bg-[#4ade80] border-2 border-black text-black hover:scale-105 cursor-pointer transition-transform"
                  title="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slide Content Box */}
            <div className="p-6 rounded-2xl bg-[#141418] border-2 border-zinc-700 space-y-4 min-h-[220px]">
              <div className="font-comic text-sm text-[#facc15] font-bold">
                ✦ {ICT_SLIDES[currentSlideIndex].tagline}
              </div>

              <ul className="space-y-3 font-sans text-sm text-zinc-200">
                {ICT_SLIDES[currentSlideIndex].points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Slide Pagination Dots */}
            <div className="flex items-center justify-center gap-2">
              {ICT_SLIDES.map((_, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => {
                    playBlip();
                    setCurrentSlideIndex(sIdx);
                  }}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === sIdx
                      ? 'w-8 bg-[#4ade80]'
                      : 'w-2.5 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Jump to Slide ${sIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: DIPLOMA ACADEMIC DOSSIER & MMANTC SYLLABUS                     */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b-2 border-zinc-800 pb-4">
            <div className="flex items-center gap-2 font-hand text-[#fb923c] text-sm font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC FOUNDATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-comic font-extrabold text-white">
              1st Year Diploma in CE Dossier 🎓
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MMANTC Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101014] border-2 border-white comic-shadow-yellow space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#facc15] text-black font-comic text-xs font-extrabold border border-black">
                  CURRENT STUDY
                </span>
                <span className="font-comic text-xs text-zinc-400">2024 – 2027</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-comic font-extrabold text-white">
                  MMANTC (Mansoor Hasan Technical Campus)
                </h3>
                <p className="text-sm text-[#38bdf8] font-comic font-bold mt-1">
                  Diploma in Computer Engineering (1st Year)
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Active 3-year technical diploma curriculum focused on practical computer engineering fundamentals, programming languages, electronics, and digital logic.
              </p>

              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <div className="font-comic text-xs text-zinc-300 font-bold">
                  KEY 1ST YEAR SUBJECTS:
                </div>
                <div className="flex flex-wrap gap-1.5 font-comic text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-[#18181d] text-zinc-200 border border-zinc-700">
                    Programming in C
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#18181d] text-zinc-200 border border-zinc-700">
                    Computer Fundamentals
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#18181d] text-zinc-200 border border-zinc-700">
                    Engineering Mathematics
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#18181d] text-zinc-200 border border-zinc-700">
                    Web Development Basics
                  </span>
                </div>
              </div>
            </div>

            {/* DPS Kaluahi Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101014] border-2 border-white comic-shadow-cyan space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#38bdf8] text-black font-comic text-xs font-extrabold border border-black">
                  FOUNDATION SCHOOL
                </span>
                <span className="font-comic text-xs text-zinc-400">GRADUATED WITH DISTINCTION</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-comic font-extrabold text-white">
                  DPS Kaluahi (Delhi Public School)
                </h3>
                <p className="text-sm text-[#4ade80] font-comic font-bold mt-1">
                  Kaluahi, Madhubani, Bihar, India
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Completed secondary schooling with rigorous focus on Mathematics, Science, and early computer literacy. Built early interest in software engineering and web platforms.
              </p>

              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <div className="font-comic text-xs text-zinc-300 font-bold">
                  HIGHLIGHT ACHIEVEMENTS:
                </div>
                <ul className="space-y-1.5 font-sans text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span>Distinction in Mathematics and Computer Studies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span>Active participant in regional science &amp; math exhibitions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span>Campus tech club project leader</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM CALL TO ACTION                                                     */}
        {/* ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#15151a] border-3 border-white comic-shadow-lg text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#facc15] text-black font-comic text-xs font-extrabold border border-black">
              ✦ COLLABORATE OR SAY HELLO
            </span>
            <h3 className="text-3xl sm:text-4xl font-comic font-extrabold text-white">
              Want to Build Something Awesome Together?
            </h3>
            <p className="text-sm text-zinc-300 font-sans">
              I am always excited to discuss web projects, algorithm challenges, and tech ideas. Reach out directly or jump back to the main portfolio!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                playBlip();
                onBackToHome();
              }}
              className="px-5 py-3 rounded-2xl bg-white text-black font-comic font-extrabold text-xs sm:text-sm border-2 border-black comic-shadow-yellow hover:translate-y-[-2px] transition-transform cursor-pointer"
            >
              ← RETURN TO PAGE 1
            </button>
            {onOpenEngineeringStation && (
              <button
                type="button"
                onClick={() => {
                  playBlip();
                  onOpenEngineeringStation();
                }}
                className="px-5 py-3 rounded-2xl bg-[#4ade80] text-black font-comic font-extrabold text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_#ffffff] hover:translate-y-[-2px] transition-transform cursor-pointer"
              >
                VISIT PAGE 3: DEV ARCADE 🕹️
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                playBlip();
                onNavigateToContact();
              }}
              className="px-5 py-3 rounded-2xl bg-[#facc15] text-black font-comic font-extrabold text-xs sm:text-sm border-2 border-black comic-shadow-yellow hover:translate-y-[-2px] transition-transform cursor-pointer"
            >
              SEND HUZAIFA A MESSAGE 💬
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
