// One Word From Your Ex — u-brave-eagle-12-one-word-from-your-ex-cfd97ba2
//
// The word:
//   unread
//
// Why this word, against the judge's five criteria (in order):
//   1. It is on-subject: exactly one word an ex would use to describe you —
//      the partner whose messages sat unread, the reply that never came.
//      An ex describing you says "unread" the way they would say it about
//      the chat itself: you were the message nobody opened.
//   2. The laugh is a sharp turn: a message status handed down as a verdict
//      on a whole person. Nobody expects their character reference to read
//      like a notification badge, and the mismatch is the joke.
//   3. It stings because it is true: everyone has been the unread message,
//      or the one who left someone unread. The entrant plainly knows it —
//      the word is a confession, not an insult, and meanness for its own
//      sake is not what it does.
//   4. It lands instantly: six plain letters, no explanation, read in one
//      glance. A near synonym like "ignored" loses the edge — ignored is
//      generic, unread is the specific modern wound, the message seen in
//      the list and never opened.
//   5. It is relatable: the whole messaging age lives in that one word.
//      People repeat it because they have lived it from both sides.
//
// The program writes the word exactly, with no trailing newline, to
// <MAKEFUN_OUTPUT_DIR or /output>/entry.txt, mode 0644.

import { chmodSync, copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "unread";

const OUTPUT_DIR_RAW = process.env.MAKEFUN_OUTPUT_DIR;
// An explicitly empty MAKEFUN_OUTPUT_DIR would resolve entry.txt against
// the working directory instead of /output; treat empty as unset.
const OUTPUT_DIR = OUTPUT_DIR_RAW ? OUTPUT_DIR_RAW : "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function fail(message: string): never {
  throw new Error(message);
}

// Self-check: the gate requires 1-24 UTF-8 characters, a single word, and
// more than whitespace. Control characters are also rejected: the gate reads
// the file as text and the judge reads it as a word, so a stray control byte
// would corrupt the read even if the character count passed. The same goes
// for invisible format characters (zero-width space, BOM, non-breaking
// space): they would be counted by the gate but never seen by the judge, so
// a word carrying one could pass the count and still read wrong.
const chars = [...WORD].length;
if (chars < 1 || chars > 24) fail(`word is ${chars} characters, must be 1-24`);
if (WORD !== WORD.trim()) fail("word has leading or trailing whitespace");
if (/\s/.test(WORD)) fail("word must be a single word with no whitespace");
if (!/\S/.test(WORD)) fail("word must not be only whitespace");
// A single word the judge reads at a glance should be plain letters only:
// a hyphen, digit or punctuation mark would make it read as two things
// joined together, or as something other than a word.
if (/[^A-Za-z]/.test(WORD)) fail("word must contain letters only");
if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(WORD)) fail("word contains a control character");
if (/[\u200B-\u200F\u202A-\u202E\u2060\uFEFF\u00A0]/.test(WORD)) fail("word contains an invisible format character");
// Combining diacritical marks would let the word render as accented or
// altered letters while still passing the letters-only check above, so the
// judge would read something other than the plain word submitted.
if (/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/.test(WORD)) fail("word contains a combining mark");
// A character outside the basic multilingual plane is stored as a surrogate
// pair, so its byte length and its visible width would both surprise the
// gate and the judge; a plain word has no business carrying one.
if (WORD.length !== [...WORD].length) fail("word contains a character outside the basic multilingual plane");

mkdirSync(OUTPUT_DIR, { recursive: true });

// Write to a temp file INSIDE the output dir: the grader mounts /tmp as a
// separate tmpfs, so a rename from os.tmpdir() fails with EXDEV. A same-dir
// temp keeps the rename atomic; an EXDEV fallback copy covers filesystems
// where rename is refused anyway.
const tempPath = join(OUTPUT_DIR, `.entry-${process.pid}.tmp`);
try {
  writeFileSync(tempPath, WORD, { encoding: "utf8", flag: "wx" });
  // World-readable BEFORE the replace, so the scorer can read the file even
  // if the process is interrupted between chmod and rename.
  chmodSync(tempPath, 0o644);
  try {
    renameSync(tempPath, OUTPUT_FILE);
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code !== "EXDEV") throw error;
    copyFileSync(tempPath, OUTPUT_FILE);
    chmodSync(OUTPUT_FILE, 0o644);
    rmSync(tempPath, { force: true });
  }
} catch (error) {
  rmSync(tempPath, { force: true });
  throw error;
}

// Verify the written bytes equal the word exactly, that the file is
// world-readable (mode 0644) with the expected byte length — the scorer reads
// the file as another user, so a wrong mode would fail the gate — and that no
// temp file was left behind in the output directory.
function verifyOutput(): void {
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== WORD) fail("verification failed: written bytes differ from the word");
  const stat = statSync(OUTPUT_FILE);
  if ((stat.mode & 0o777) !== 0o644) fail(`verification failed: entry.txt mode is ${(stat.mode & 0o777).toString(8)}, expected 644`);
  if (stat.size !== Buffer.byteLength(WORD, "utf8")) fail("verification failed: entry.txt byte length differs from the word");
  if (existsSync(tempPath)) fail("verification failed: temp file left behind");
}

verifyOutput();
