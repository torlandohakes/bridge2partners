const fs = require('fs');
const path = '/Users/torlandohakes/bridge2partners/bridge2partners/src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const mainStart = content.indexOf('{/* ================= UNIFIED CONTENT CANVAS OVERLAP ================= */}');
const planStart = content.indexOf('{/* ================= THE PLAN ================= */}');

const prefix = content.substring(0, mainStart);
const mainTagStr = content.substring(mainStart, content.indexOf('{/* ================= VALUE PROP', mainStart));

const valuePropStart = content.indexOf('{/* ================= VALUE PROP (BENTO BOX) ================= */}');
const problemStart = content.indexOf('{/* ================= PROBLEM & STAKES SECTION ================= */}');
const guideStart = content.indexOf('{/* ================= GUIDE & PROOF ================= */}');

const valuePropStr = content.substring(valuePropStart, problemStart);
const problemStr = content.substring(problemStart, guideStart);
const guideStr = content.substring(guideStart, planStart);

const suffix = content.substring(planStart);

const newContent = prefix + mainTagStr + problemStr + guideStr + valuePropStr + suffix;

fs.writeFileSync(path, newContent);
console.log('Reordered successfully.');
