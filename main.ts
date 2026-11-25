// The Meeting That Should Have Been One Line — entry program (Node 22, stdlib only).
// Writes one original one-line sentence to /output/entry.txt.
// The line: the meeting's entire output in a single sentence — decision, owner,
// budget, and a dissent channel with a deadline — so after it, no one could
// justify holding the meeting at all. The sting: object, or the meeting never happened.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "We're shipping Tuesday, Maya owns it, the budget's signed — object by Friday reply-all, or this meeting never happened.";

// Writes exactly the line, no trailing newline: the gate counts characters
// (1-200), so the file is 119 characters / 121 bytes, byte-identical every run.
// Revision: the line must also be a single sentence on a single line — fail
// loudly if it ever gains a newline or a second sentence, instead of shipping
// a gate-invalid entry.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes('\n') || LINE.trim() !== LINE || (LINE.match(/\./g) ?? []).length !== 1) {
  throw new Error('line must be one sentence on one line');
}
const outFile = join(outDir, 'entry.txt');
writeFileSync(outFile, LINE, 'utf8');
if (readFileSync(outFile, 'utf8') !== LINE) {
  throw new Error('entry.txt round-trip mismatch');
}
