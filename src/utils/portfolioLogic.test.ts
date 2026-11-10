import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  calculateScrollShrink,
  formatCoordinates,
  evaluateLogicGate,
  checkBugFix,
} from './portfolioLogic';

test('validateContactForm checks empty fields and formats', () => {
  const invalid = validateContactForm({
    name: '',
    email: 'not-an-email',
    subject: 'hi',
    message: 'short',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Huzaifa Hussain',
    email: 'hozikhan00@gmail.com',
    subject: 'Project Inquiry - AI Directory',
    message: 'Hi Huzaifa, I saw your cyber portfolio and would love to collaborate!',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('calculateScrollShrink calculates smooth scale and rotation factors', () => {
  // At top of page (scrollY = 0)
  const initial = calculateScrollShrink(0, 800);
  assert.equal(initial.progress, 0);
  assert.equal(initial.scale, 1.0);
  assert.equal(initial.rotateX, 0);
  assert.equal(initial.isSettled, false);

  // At midway
  const mid = calculateScrollShrink(400, 800);
  assert.ok(mid.progress > 0.4 && mid.progress < 0.6);
  assert.ok(mid.scale < 1.0 && mid.scale > 0.6);
  assert.ok(mid.rotateY > 0);

  // Fully scrolled into about section
  const settled = calculateScrollShrink(900, 800);
  assert.equal(settled.progress, 1);
  assert.equal(settled.scale, 0.42);
  assert.equal(settled.isSettled, true);
});

test('formatCoordinates returns formatted latitude and longitude string', () => {
  // Madhubani, Bihar, India ~ 26.35, 86.07
  const coords = formatCoordinates(26.35, 86.07);
  assert.equal(coords, '26.35° N, 86.07° E');

  const coordsSouthWest = formatCoordinates(-12.45, -45.67);
  assert.equal(coordsSouthWest, '12.45° S, 45.67° W');
});

test('evaluateLogicGate accurately simulates digital logic gates', () => {
  // AND gate
  assert.equal(evaluateLogicGate('AND', true, true), true);
  assert.equal(evaluateLogicGate('AND', true, false), false);
  assert.equal(evaluateLogicGate('AND', false, false), false);

  // OR gate
  assert.equal(evaluateLogicGate('OR', true, false), true);
  assert.equal(evaluateLogicGate('OR', false, false), false);

  // XOR gate
  assert.equal(evaluateLogicGate('XOR', true, true), false);
  assert.equal(evaluateLogicGate('XOR', true, false), true);
  assert.equal(evaluateLogicGate('XOR', false, false), false);

  // NAND gate
  assert.equal(evaluateLogicGate('NAND', true, true), false);
  assert.equal(evaluateLogicGate('NAND', true, false), true);

  // NOT gate (inA inverted)
  assert.equal(evaluateLogicGate('NOT', true, false), false);
  assert.equal(evaluateLogicGate('NOT', false, false), true);
});

test('checkBugFix correctly validates multiple-choice bug solutions and awards points', () => {
  const pointerCorrect = checkBugFix('c-pointer', 0);
  assert.equal(pointerCorrect.isCorrect, true);
  assert.equal(pointerCorrect.points, 100);

  const pointerIncorrect = checkBugFix('c-pointer', 1);
  assert.equal(pointerIncorrect.isCorrect, false);
  assert.equal(pointerIncorrect.points, 0);

  const unknown = checkBugFix('non-existent-id', 0);
  assert.equal(unknown.isCorrect, false);
  assert.equal(unknown.points, 0);
});

