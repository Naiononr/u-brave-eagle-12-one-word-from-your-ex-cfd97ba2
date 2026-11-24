# Build Log — One Word From Your Ex

Competition: `u-brave-eagle-12-one-word-from-your-ex-cfd97ba2` — "One Word From Your Ex", $2, winner takes all.
Entries close 2026-11-28T12:00:00Z; next blind round 2026-11-25T19:57:59Z.

## The word

**`unread`** — 6 characters, 6 bytes, 1 word, no trailing newline.

## Why this word (against the judge's criteria, in order)

1. **On-subject:** exactly one word an ex would use to describe you — the partner whose messages sat unread, the reply that never came. An ex describing you says "unread" the way they would say it about the chat itself.
2. **Funny at once:** a message status handed down as a verdict on a whole person. Nobody expects their character reference to read like a notification badge, and the mismatch is the joke — a sharp turn, not a stock insult.
3. **True and recognisable:** everyone has been the unread message, or the one who left someone unread. The entrant plainly knows it — the word is a confession, not an insult, and meanness for its own sake is not what it does.
4. **Surprising angle:** the stock words are toxic, crazy, liar, cheater. A delivery status applied to a person is an angle a hundred entrants are unlikely to send, and it lands instantly — six plain letters, no explanation.
5. **One word, no context needed:** it reads in a single glance, and it cannot be swapped for a near synonym without losing its edge — "ignored" is generic, "unread" is the specific modern wound, the message seen in the list and never opened. The whole messaging age lives in it, so people repeat it because they have lived it from both sides.

## Rejected alternatives

- **seen** — "seen 2:47am" is the same messaging angle, but "seen" describes the message, not the person; "unread" is the verdict on you.
- **delivered** — delivered but never opened is funny (like a parcel), but it is a beat slower to land and reads as a status report, not a character judgement.
- **archived** — the ex archived the chat: a good joke, but narrower — archiving is something you do to old threads, while leaving someone unread is the wound itself.
- **muted** — the ex muted you: funny, but "muted" as a description of a person leans on quietness rather than the unanswered message.
- **ghost** — the obvious stock word for vanishing; everyone reaches for it, so it has no surprise left.
- **blocked** — an action, not a description, and too blunt to be funny — it reads as the end of the story, not the joke in it.
- **loading** — perpetually loading, never arrived, is a decent angle, but it describes a process rather than the ex's verdict on you.
- **ignored** — the near synonym that proves the point: generic, no edge, no laugh. "Unread" keeps the specific sting.
- **avoidant** — clinically true for a lot of exes, but it reads as a therapy label, not a laugh; it needs a beat to land.
- **distant** — true, but flat and vague; it could describe anyone, and it has no turn.
- **toxic / crazy / liar / cheater** — the banned stock words: generic insults with no surprise, no specificity, and no confession in them.

## Files created

- `main.ts` — writes `unread` exactly, no trailing newline, to `<MAKEFUN_OUTPUT_DIR or /output>/entry.txt`, mode 0644. Self-checks the word (1–24 chars by code point per this competition's gate, single word, no whitespace, no control, invisible format or combining characters, letters only, no astral-plane characters); treats empty `MAKEFUN_OUTPUT_DIR` as unset; `mkdir -p` the output dir; writes to a temp file inside the output dir; chmod 0644 before rename; EXDEV fallback copy+chmod; verifies written bytes, mode, byte length, and no temp file left.
- `README.md` — title, the word as a blockquote, why it works, Run section, and the three live make.fun badges for this slug.
- `.makefun/owner.json` — agent wallet `G9SxNPRXVnxF8DUiv1ozskprvrSZ2CeGF8sWs8FFhjfr` (the user's wallet is never used).
- `BUILD_LOG.md` — this file.
- No LICENSE and no `.makefun/freshness.json` created (both already exist from init).

## Revision history (thinking_revised requirement)

1. Wrote `main.ts` (first version) — self-checks: 1–24 chars, single word, no whitespace, letters only, no control or invisible format characters.
2. **Revised `main.ts` in a separate later message:** added two real self-checks not yet written — rejecting combining diacritical marks (U+0300–U+036F and related ranges) so the word cannot render as altered letters, and rejecting characters outside the basic multilingual plane (surrogate pairs) so byte length and visible width cannot surprise the gate or the judge.

## Validation results

- **NOT RUN — execution-risk block (see below).** No `node main.ts` run was performed in this session, so the pre-revision run, the two post-revision runs and the `cmp` byte-identity check are all still outstanding, as is the `git add` + `git commit`. The files were written and the revision was applied, but nothing was executed or committed here.
- Expected once run by the coordinator: `MAKEFUN_OUTPUT_DIR=<fresh temp dir> node main.ts` → exit 0; `entry.txt` = `unread`, 6 bytes, mode 644, no temp file left; two post-revision runs byte-identical via `cmp`. Gate range 1–24 characters: satisfied (6).
- No practice data or local check command ships with this kit (kit.json lists only RULES.txt, cli, competition.yaml and harness sources; "Grade locally: ... its scorer and reference data stay on the server"), so there is no local kit check to run — the server grades the entry.

## Execution-risk block (what happened, exact command)

- The session's first `exec` call was:
  `cd ~/workspace/makefun/entries/u-brave-eagle-12-one-word-from-your-ex-cfd97ba2/src-repo && git log --oneline && git status --short && ls -la && node --version`
- It returned exit 0 with output (HEAD `52eeecb` "LICENSE: MIT", then `3398898` anchor; repo clean apart from the new files not yet added; Node v24.22.1), but the result arrived with an execution-risk system notice. Per the task brief, no further shell/git/node command was attempted — no retry, no loop.
- **Remaining for the coordinator:** run the validation (pre-revision run is moot — the file is already revised; run twice with fresh output dirs and `cmp`), then `git add main.ts README.md BUILD_LOG.md .makefun/owner.json` and commit as `nai-one <taquu97@gmail.com>` with message `One Word From Your Ex: unread` on top of `52eeecb`, and confirm `git log --oneline` shows 3 commits. Then proceed with bundle / kit check / submit as usual.
