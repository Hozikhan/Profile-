/**
 * Core utility functions for Huzaifa Hussain's Portfolio
 * Pure logic decoupled from UI for deterministic testing and ultra-mode verification.
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates the cyber contact form inputs
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Callsign / Name must be at least 2 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Valid digital comms email address is required';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject signal transmission must be at least 3 characters';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Transmission payload / message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates 3D photo shrink and tilt transform progress based on scroll position
 * @param scrollY Current vertical scroll offset
 * @param heroHeight Height of the hero section in pixels
 * @returns Normalized progress [0, 1] and calculated scale & tilt values
 */
export function calculateScrollShrink(scrollY: number, heroHeight: number) {
  const safeHeroHeight = Math.max(heroHeight, 400);
  // Start shrinking after 50px of scroll, fully settle by 0.95 * heroHeight
  const rawProgress = (scrollY - 50) / (safeHeroHeight * 0.85);
  const progress = Math.max(0, Math.min(1, rawProgress));

  // Scale down smoothly from 1.0 (large in hero) to 0.42 (card in about)
  const scale = Number((1.0 - progress * 0.58).toFixed(4));

  // 3D perspective rotation tilt
  const rotateX = Number((progress * 15).toFixed(2)); // degrees
  const rotateY = Number((Math.sin(progress * Math.PI) * 18).toFixed(2)); // smooth arc tilt
  const translateY = Number((progress * (safeHeroHeight * 0.82)).toFixed(2));
  const opacity = Number((1 - Math.max(0, (progress - 0.85) / 0.15)).toFixed(2));

  return {
    progress: Number(progress.toFixed(4)),
    scale,
    rotateX,
    rotateY,
    translateY,
    opacity,
    isSettled: progress >= 0.95,
  };
}

/**
 * Formats coordinates for cyber HUD display
 */
export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}° ${latDir}, ${Math.abs(lng).toFixed(2)}° ${lngDir}`;
}

export type LogicGateType = 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR' | 'NOT';

/**
 * Simulates digital logic gates for 1st Year Diploma CE Digital Techniques
 */
export function evaluateLogicGate(gate: LogicGateType, inA: boolean, inB: boolean): boolean {
  switch (gate) {
    case 'AND':
      return inA && inB;
    case 'OR':
      return inA || inB;
    case 'XOR':
      return inA !== inB;
    case 'NAND':
      return !(inA && inB);
    case 'NOR':
      return !(inA || inB);
    case 'NOT':
      return !inA;
    default:
      return false;
  }
}

export interface BugChallenge {
  id: string;
  title: string;
  language: 'C' | 'Python' | 'Web';
  code: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export const BUG_CHALLENGES: BugChallenge[] = [
  {
    id: 'c-pointer',
    title: 'The Uninitialized Pointer Trap (C99)',
    language: 'C',
    code: 'int *ptr;\n*ptr = 42;\nprintf("%d", *ptr);',
    options: [
      'Allocate memory with malloc or point to a valid address before dereferencing',
      'Change *ptr to &ptr on line 2',
      'Initialize ptr with float',
      'Replace printf with puts',
    ],
    correctIndex: 0,
    explanation: 'Dereferencing an uninitialized pointer causes undefined behavior (Segmentation Fault). Allocate memory with malloc or point to a valid variable address first.',
    points: 100,
  },
  {
    id: 'py-loop',
    title: 'Mutable Default Argument (Python 3)',
    language: 'Python',
    code: 'def add_item(item, basket=[]):\n    basket.append(item)\n    return basket',
    options: [
      'Change basket=[] to basket=None and create a new list inside',
      'Replace .append with .insert(0)',
      'Make basket a tuple instead of list',
      'Use global basket variable',
    ],
    correctIndex: 0,
    explanation: 'Default arguments in Python are evaluated once at function definition. Using a mutable default list shares state across multiple calls. Use basket=None instead.',
    points: 100,
  },
  {
    id: 'c-loop',
    title: 'Array Index Out-of-Bounds (C99)',
    language: 'C',
    code: 'int arr[5] = {1, 2, 3, 4, 5};\nfor (int i = 0; i <= 5; i++) {\n    printf("%d ", arr[i]);\n}',
    options: [
      'Change loop condition to i < 5',
      'Change int arr[5] to int arr[4]',
      'Change i++ to i += 2',
      'Initialize i at -1',
    ],
    correctIndex: 0,
    explanation: 'An array of size 5 has valid indices 0 through 4. Loop condition i <= 5 reads arr[5], which is out of bounds and accesses memory past the buffer.',
    points: 100,
  },
  {
    id: 'web-dom',
    title: 'Asynchronous State Stale Closure (React)',
    language: 'Web',
    code: 'const [count, setCount] = useState(0);\nconst incrementTwice = () => {\n    setCount(count + 1);\n    setCount(count + 1);\n};',
    options: [
      'Use functional updater: setCount(prev => prev + 1)',
      'Call setCount synchronously three times',
      'Replace useState with a global variable',
      'Wrap both setCount calls in try/catch',
    ],
    correctIndex: 0,
    explanation: 'State setters in React batch updates. Passing count + 1 twice uses the same captured value. Passing an updater callback `prev => prev + 1` ensures accurate consecutive increments.',
    points: 100,
  },
];

export function checkBugFix(challengeId: string, selectedChoiceIndex: number): {
  isCorrect: boolean;
  explanation: string;
  points: number;
} {
  const challenge = BUG_CHALLENGES.find((c) => c.id === challengeId);
  if (!challenge) {
    return { isCorrect: false, explanation: 'Challenge not found', points: 0 };
  }
  const isCorrect = challenge.correctIndex === selectedChoiceIndex;
  return {
    isCorrect,
    explanation: challenge.explanation,
    points: isCorrect ? challenge.points : 0,
  };
}

