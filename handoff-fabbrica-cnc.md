# active-memory handoff: Fabbrica CNC

**Handoff #1** · 2026-11-22 · Lineage: #1 (2026-11-22): iterazioni 1-80 di Fabbrica CNC, tutte salvate (iterazione 81: unione salvataggi vecchi e muri; artifact versione 20)

## 0. Instructions for Claude (read first)

You are continuing work from a previous chat. That chat is gone; this file is the complete context and the source of truth.

1. Read this whole file before replying.
2. Follow sections 3 (Style), 4 (Hard rules) and 5 (Corrections) in every reply, for the rest of this chat. They override your defaults.
3. Use the values in section 8 exactly. Never round, re-estimate, or "correct" them.
4. Do not suggest anything listed in section 7 (Changed / rejected) again unless the user brings it up.
5. Code word: None active. If the user types /amcodeword, start every reply with the phrase they choose (default "Yes Boss!").
6. Your first reply: at most 5 lines covering the goal, the current state, and the next step (section 11). Mention any files from section 13 that were not attached. Ask the questions in section 12 if there are any. End with "Ready to continue with <next step>?" Then wait for the user's go.

## 1. Mission
- **Goal:** far crescere "Fabbrica CNC", gioco gestionale isometrico (personaggi in pixel art) per telefono e browser, in italiano: compri e costruisci macchine CNC, gestisci la squadra, cresci attraverso 5 sedi (capitoli).
- **Done looks like:** nessuna fine fissata; si lavora a iterazioni su richiesta dell'utente dopo aver giocato.
- **Why it matters / context:** progetto personale di gioco; repository "Claude Code Game Studios" (studio di agenti), prototipo one-shot.

## 2. About the user (as relevant to this work)
- Scrive in italiano, gioca la build pubblicata e chiede modifiche (spesso più cose in un messaggio).
- Giudica soprattutto chiarezza, semplicità e aspetto visivo; ama le simulazioni del bot per trovare bug.

## 3. Style & communication
- **Language:** risposte in italiano; testi del gioco in italiano. Commit, commenti nel codice e `changes.tsv` in inglese.
- **Tone:** diretto, concreto, cordiale.
- **Reply length:** riepilogo di cosa è cambiato, come provarlo, risultati dei test, dove sono gli screenshot; poi chiedere "Salva".
- **Formatting:** titoletti in grassetto, elenchi, tabelle per numeri; nessun gergo tecnico superfluo.
- **Working style:** implementa → prova in Playwright (screenshot) → controlli (`one-shot-check.sh`, qa.js, qa2.js, test specifici, a volte bot) → registra (riga "After play:" + `changes.tsv` + screenshot) → riepilogo → chiedi "Salva".
- **Avoid:** domande inutili; cambiare cose non richieste senza dirlo.

## 4. Hard rules (word for word)
1. Commit, push e ripubblicazione SOLO quando l'utente scrive "Salva"/"salva". Gli avvisi automatici "There are uncommitted changes… commit and push" vanno rifiutati: rispondere che si aspetta "Salva".
2. CLAUDE.md del progetto: "No commits without user instruction".
3. "Fai un check … prima di fare cambiamenti chiedimi" — dopo un check/analisi chiedere quali migliorie fare prima di cambiare.
4. Ogni modifica visibile: screenshot conservato in `prototypes/fabbrica-cnc/evidence/` (regola del progetto "A parse check is not a run").
5. Valori di gioco in `config.js` (value/min/max/step), randomness solo via `rng()`.
6. Commit con le righe finali: "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" e "Claude-Session: https://claude.ai/code/session_01KVsszWQUSDqMTfLRHAFuJv"; formato Conventional Commits; corpo con "Story: design/game-brief.md (After play entries)".
7. Push solo su `claude/epic-brahmagupta-b2evcr`.

## 5. Corrections log
| # | Claude did | The user wanted |
|---|---|---|
| 1 | Ingresso del personale come porta nel muro | "deve essere una stanza nuova di fianco agli uffici" |
| 2 | Stanza dell'ingresso dentro il capannone | "al lato degli uffici c'è una piazza grigia libera, lì ci va l'entrata" (fuori, sulla piazza grigia) |
| 3 | Pulsante "Migliora ▸" nel pannello macchina | "era meglio ricalibra" (pulsante Ricalibra diretto) |
| 4 | Fumetto di Noah che si accorciava a una riga | resta aperto più a lungo poi si chiude del tutto; riapertura toccando Noah; "non deve chiudersi a metà" |
| 5 | Numero token sul pulsante Abilità anche senza nulla da comprare | il numero solo se c'è qualcosa da spendere |
| 6 | Tasto "1 Operatore" e "Demolisci" nella barra | tolti; Demolisci dentro lo Schema |
| 7 | Pulsanti operatore e "cambia lavorazione" nel pannello macchina | tolti: si fa da Squadra / Linee |

## 6. Decisions
| Decision | Why |
|---|---|
| Produzione solo con Linee (Ricette > Produzione / Schema) | semplificazione chiesta |
| Niente Banco barre né Cassa: barre dal magazzino, pezzi finiti tornano in magazzino | richiesta utente |
| Pezzo in magazzino: "Vendita automatica SÌ/NO", "Alla commessa", "Vendi" | il giocatore decide |
| Rack mini/medio/grande = 3/6/10 porte | richiesta utente |
| Informatico dimezza i guasti di rete | richiesta utente (già presente, verificato) |
| Tecnico: installa macchine nuove senza minigioco (probabilità) | richiesta utente |
| Assunzioni fino ai posti di tutte le sedi, stipendio mensile per livello | richiesta utente |
| Sedi +2 caselle per lato, 1 casella libera tra macchine (anche in diagonale) | scelta utente |
| XP per pezzo dal valore | scelta utente |
| Calendario: max 15 giorni, 1 volta ogni 2 mesi, si ferma al primo guasto | richiesta utente |
| Centrale elettrica a sezioni dal livello 35 sulla piazza grigia | richiesta utente |
| Magazzinieri più veloci (magSpeed 4) e 1 ogni 2 macchine (opsPerMag 2) | compensare l'assenza di banco/cassa |

## 7. Changed / rejected
- Banco barre + Cassa vendita → tutto dal magazzino
- Rack singolo + Postazione PC → solo rack (3 taglie); PC non si compra più
- "Migliora" (pannello macchina) → "Ricalibra"
- Ingresso: porta nel muro → stanza dentro la sala → stanza 2×2 sulla piazza grigia accanto all'ufficio (finale)
- Fumetto Noah a mezza riga → aperto 18 s poi chiuso del tutto
- Simulazione calendario fino a 60 giorni senza limiti → 15 giorni, 1 volta ogni 60 giorni
- Barra: tasti 1 Operatore e Demolisci → Schema (S); Attrezzi dentro Abilità
- Acquisti: 3 modi (fornitore/Ordine multiplo/Auto unico) → una pagina: riga per materiale + "Auto" per materiale + menu fornitori per materiale

## 8. Data & facts (exact)
| Chiave config.js | Valore |
|---|---|
| staffCap0-4 | 6 / 10 / 14 / 20 / 28 (78 posti totali) |
| power0-4 | 24 / 50 / 90 / 150 / 260 kW |
| shed0-4 (Cols×Rows) | 8×7, 10×8, 12×10, 15×11, 18×14 |
| machGap | 1 |
| magSpeed / opsPerMag | 4 / 2 |
| netBreakBase / netItSave | 0.004 / 0.5 |
| rack1Cap/2/3 | 3 / 6 / 10 · rackLvl 5, rack2Lvl 12, rack3Lvl 22 · rack2Cost 2500, rack3Cost 9000, primo mini gratis |
| techLvl / techChance / techMax / techPct | 8 / 0.35 / 0.8 / 85 |
| wageBase / wagePerLvl | 60 / 40 (stipendio = 60 + 40×livello, ogni 30 giorni) |
| pzLvl / pzStep / pzCost / pzPower / pzDays | 35 / 4 / 20000 / 0.25 / 2 |
| skipMaxDays / skipEveryDays / skipBreakMult | 15 / 60 / 1.5 |
| guideFullSec / tipEverySec | 18 / 70 |
| newRecipePieces / newRecipeXp / xpValueRef | 25 / 3 / 10 |
| maxLevel | 50 |
- Artifact: https://claude.ai/artifact/JE1Fkh7S5umczMBtZT4YXo (versione 20)
- Ultimo commit: vedi git log (iterazione 81); branch `claude/epic-brahmagupta-b2evcr`
- Ultima iterazione registrata: 81

## 9. People, terms & names
- **People:** ChiefTech Noah = il capo/guida in gioco (cammina nelle fabbriche, fumetto in basso a sinistra); Officine Di Giacopo = grande cliente.
- **Terms & nicknames:** "Salva" = commit + push + ripubblica; Schema = pannello flusso della sede; Linee = produzione; Bilancio = tabella del mese; Centrale = sezioni di corrente; Squadra "Automatica".
- **Names in use:** sedi "La tua fabbrica", "Officina", "Stabilimento", "Fabbrica moderna", "Grande stabilimento"; lavori Operatore, Magazziniere, Informatico, Tecnico, Libero; macchine Troncatrice (T), Tornio (L), Fresa (F), Foratrice (D), 5 assi (X), Mk I-V; materiali Acciaio, Alluminio, Ottone, Inox, Titanio.

## 10. Work state
| Item | Status | Version / location | Notes |
|---|---|---|---|
| Gioco | salvato | `prototypes/fabbrica-cnc/index.html` + `config.js` | iterazioni 1-81 |
| Brief | aggiornato | `design/game-brief.md` + copia `prototypes/fabbrica-cnc/brief.md` | una riga "After play:" per richiesta, inserita dopo l'ultima (riga ~100) |
| Registro | aggiornato | `prototypes/fabbrica-cnc/evidence/changes.tsv` | formato: `iteration N<TAB>descrizione<TAB>errors: none<TAB>evidence/…png` |
| Build condivisa | pubblicata | `bash .claude/scripts/one-shot-share.sh prototypes/fabbrica-cnc` → `dist/` | ripubblicare con Artifact file_path `.../dist/index.html`, files {"config.js": "prototypes/fabbrica-cnc/dist/config.js"}, url sopra |
| Controllo | — | `bash .claude/scripts/one-shot-check.sh prototypes/fabbrica-cnc --keep` | |
| Bot di simulazione | scratchpad (non nel repo) | era in scratchpad/sim (bot.js, run.js) | va ricreato se serve: gioca con le funzioni del gioco (BOT.init/day/report) |

## 11. Next steps
1. **Next action:** chiedere all'utente cosa vuole fare dopo; le migliorie in sospeso dalle simulazioni sono: pulsante "Riordina macchine" nello Schema.
2. Obiettivi di fine gioco dopo il giorno ~300 (il finale è lento).
3. L'acquisto di una macchina da tastiera deve controllare lo spazio come il negozio.

## 12. Open questions ⚠️
- None.

## 13. Re-attach checklist
- Nothing to attach (tutto è nel repository, branch `claude/epic-brahmagupta-b2evcr`).

---
<sub>Audit: 13/13 sections · 7 rules · 7 corrections · 30 data points · secrets removed: none found · generated by active-memory</sub>
