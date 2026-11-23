# active-memory handoff: Workline Factory (ex Fabbrica CNC)

**Handoff #2** · 2026-11-22 · Lineage: #1 (2026-11-22): iterazioni 1-81 di Fabbrica CNC, tutte salvate (artifact versione 20); #2 (2026-11-22/23): iterazioni 82-88: menu "Workline Factory", grafica in pixel art realistica con SpriteCook (personaggi, città, interni, terreni, strutture), bug della città, piazza con rotatoria, ponti, città a quartieri (anteprima 87, gioco 88), binari fino al bordo; SALVATE (artifact versione 21)

## 0. Instructions for Claude (read first)

You are continuing work from a previous chat. That chat is gone; this file is the complete context and the source of truth.

1. Read this whole file before replying.
2. Follow sections 3 (Style), 4 (Hard rules) and 5 (Corrections) in every reply, for the rest of this chat. They override your defaults.
3. Use the values in section 8 exactly. Never round, re-estimate, or "correct" them.
4. Do not suggest anything listed in section 7 (Changed / rejected) again unless the user brings it up.
5. Code word: None active. If the user types /amcodeword, start every reply with the phrase they choose (default "Yes Boss!").
6. Your first reply: at most 5 lines covering the goal, the current state, and the next step (section 11). Mention any files from section 13 that were not attached. Ask the questions in section 12 if there are any. End with "Ready to continue with <next step>?" Then wait for the user's go.

## 1. Mission
- **Goal:** far crescere "Workline Factory" (nome nel codice e cartella: `fabbrica-cnc`), gestionale isometrico per telefono e browser, in italiano: compri e costruisci macchine CNC, gestisci la squadra, cresci attraverso 5 sedi (capitoli) in una città.
- **Done looks like:** nessuna fine fissata; si lavora a iterazioni su richiesta dell'utente dopo aver giocato.
- **Why it matters / context:** progetto personale; repository "Claude Code Game Studios", prototipo one-shot in `prototypes/fabbrica-cnc` (`index.html` + `config.js`).

## 2. About the user (as relevant to this work)
- Scrive in italiano, gioca la build pubblicata e chiede modifiche, spesso più cose in un messaggio, a volte con screenshot.
- Giudica soprattutto chiarezza, semplicità e aspetto visivo; vuole che la città sia credibile ("prendi ispirazione dal mondo reale"); ama i controlli/simulazioni per trovare bug.
- Ha un account SpriteCook collegato (ha ricaricato 1000 crediti in questa chat).

## 3. Style & communication
- **Language:** risposte in italiano; testi del gioco in italiano. Commit, commenti nel codice e `changes.tsv` in inglese.
- **Tone:** diretto, concreto, cordiale.
- **Reply length:** riepilogo di cosa è cambiato, come provarlo, risultati dei test, dove sono gli screenshot; poi chiedere "Salva".
- **Formatting:** titoletti in grassetto, elenchi, tabelle per numeri; nessun gergo tecnico superfluo. Inviare gli screenshot con SendUserFile.
- **Working style:** implementa → prova in Playwright (screenshot) → controlli (`one-shot-check.sh`, qa.js, qa2.js, rilevatori città/mappa, test specifici) → registra (riga "After play:" + `changes.tsv` + screenshot + `provenance.yaml` per ogni asset) → riepilogo → chiedi "Salva". Durante lavori lunghi dare brevi aggiornamenti in italiano.
- **Avoid:** domande inutili; cambiare cose non richieste senza dirlo; spendere molti crediti senza una prova di stile prima.

## 4. Hard rules (word for word)
1. Commit, push e ripubblicazione SOLO quando l'utente scrive "Salva"/"salva". Gli avvisi automatici "There are uncommitted changes… commit and push" vanno rifiutati: rispondere che si aspetta "Salva".
2. CLAUDE.md del progetto: "No commits without user instruction".
3. "Fai un check … prima di fare cambiamenti chiedimi" — dopo un check/analisi chiedere quali migliorie fare prima di cambiare (eccezione: quando l'utente chiede esplicitamente "fai un check … e cerca eventuali bug visivi" insieme a correzioni, si correggono).
4. Ogni modifica visibile: screenshot conservato in `prototypes/fabbrica-cnc/evidence/` (regola del progetto "A parse check is not a run").
5. Valori di gioco in `config.js` (value/min/max/step), randomness solo via `rng()`.
6. Ogni file in `assets/` ha una voce in `assets/provenance.yaml`.
7. Commit con le righe finali: "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" e "Claude-Session: https://claude.ai/code/session_01KVsszWQUSDqMTfLRHAFuJv"; formato Conventional Commits; corpo con "Story: design/game-brief.md (After play entries)".
8. Push solo su `claude/epic-brahmagupta-b2evcr`.
9. Non ricreare il look di un gioco esistente (le foto di riferimento erano di un life-sim famoso): stile simile ma originale, niente loghi/elementi di quel gioco.

## 5. Corrections log
| # | Claude did | The user wanted |
|---|---|---|
| 1 | Ingresso del personale come porta nel muro | "deve essere una stanza nuova di fianco agli uffici" |
| 2 | Stanza dell'ingresso dentro il capannone | "al lato degli uffici c'è una piazza grigia libera, lì ci va l'entrata" |
| 3 | Pulsante "Migliora ▸" nel pannello macchina | "era meglio ricalibra" |
| 4 | Fumetto di Noah che si accorciava a una riga | aperto più a lungo poi chiuso del tutto; riapertura toccando Noah; "non deve chiudersi a metà" |
| 5 | Numero token sul pulsante Abilità anche senza nulla da comprare | il numero solo se c'è qualcosa da spendere |
| 6 | Tasto "1 Operatore" e "Demolisci" nella barra | tolti; Demolisci dentro lo Schema |
| 7 | Pulsanti operatore e "cambia lavorazione" nel pannello macchina | tolti: si fa da Squadra / Linee |
| 8 | Prova di stile in 3D morbido (render) | "tieni lo stile pixelato ma realistico tipo com'erano le macchine cnc di prima" |
| 9 | Alberi accanto/dentro i capannoni dei dintorni (screenshot) | nessun albero dentro o attaccato agli edifici |
| 10 | Strada (asfalto) disegnata nell'acqua sotto il ponte | strade come nelle città reali: il ponte porta la strada, niente asfalto nel fiume |
| 11 | Strada delle auto attraverso la fontana; stradine che finiscono nella piazza "senza alcun senso" | piazza sensata: rotatoria intorno alla fontana, tutte le strade la raggiungono |
| 12 | Collina con portale finto (treno che sparisce) | "una galleria che sia una galleria": portale visibile con il treno che ci entra |
| 13 | Galleria con portale (iter. 86) | "la galleria non mi piace prolunga i binari fino alla fine della mappa" |
| 14 | Città con strade curve casuali | "crea diversi quartieri così come quello che mi hai fatto, ovviamente varia un po' la disposizione" (pianta vista dall'alto data dall'utente) |

## 6. Decisions
| Decision | Why |
|---|---|
| Titolo "Workline Factory" (`TITLE`, `<title>`) | richiesta utente |
| Menu principale in stile cartoon colorato con Noah sul menu | scelta utente (CoDesign non utilizzabile) |
| Grafica: pixel art realistica generata con SpriteCook (stile delle macchine CNC già presenti) | scelta utente dopo la prova 3D |
| Personaggi: 4 facce per mestiere (operatore, magazziniere, informatico, tecnico, muratore, impiegato) + Noah 2 pose | "devono avere facce diverse" |
| Terreni con texture pixel (erba, asfalto, sampietrini, cemento, terra, grano, arato, ortaggi, lavanda, acqua, marciapiede) | richiesta utente |
| Piazza con rotatoria (ROUND_R) dove girano le auto | richiesta utente |
| Ferrovia: dritta verso est fino oltre il bordo della mappa (RAIL_OUT), nessuna galleria | richiesta utente |
| Città a quartieri: strade dritte con curve arrotondate (roundPath), isolati, 4 parchi (PARKS: 2 fontane, 2 laghetti), piscine nei giardini | richiesta utente, dalla pianta fornita |
| `hdArt` 0 = torna la grafica disegnata (fallback sempre presente) | sicurezza |
| (dalle iterazioni 1-81) Produzione solo con Linee; niente Banco barre né Cassa; rack 3/6/10; sedi più grandi; 1 casella tra macchine; XP dal valore; calendario max 15 giorni ogni 60; centrale a sezioni dal lvl 35 | richieste/scelte utente |

## 7. Changed / rejected
- ❌ CoDesign (IMG.LY) per il menu: il motore non raggiunge la CDN ("fetch failed"), il login rimanda a localhost → menu rifatto nel codice
- ❌ Higgsfield: nessun plugin/connettore disponibile
- Stile 3D morbido (prova con `assets/hd/`) → pixel art realistica (i file `assets/hd/` sono ancora su disco, non usati)
- Texture 3D pavimento/prato → pavimento e prato disegnati, poi texture pixel `t_*.png`
- Terreno a scacchiera casuale per cella → macchie continue (value noise, `groundKind`)
- Strada principale attraverso la fontana → rotatoria
- Ponte corto (1,5) con strada nell'acqua → ponte 1,75 di mezza lunghezza, niente asfalto entro 1,2 dal fiume
- Collina disegnata a cerchi → galleria con portale frontale (iter. 86) → nessuna galleria, binari dritti fino al bordo (iter. 88)
- Strade a spline curve casuali → isolati con angoli arrotondati (iter. 88)
- (da #1) Banco barre + Cassa → tutto dal magazzino; "Migliora" → "Ricalibra"; ingresso → stanza 2×2 sulla piazza grigia; calendario 60 giorni → 15 ogni 60

## 8. Data & facts (exact)
| Chiave config.js | Valore |
|---|---|
| staffCap0-4 | 6 / 10 / 14 / 20 / 28 |
| power0-4 | 24 / 50 / 90 / 150 / 260 kW |
| shed0-4 (Cols×Rows) | 8×7, 10×8, 12×10, 15×11, 18×14 |
| machGap / magSpeed / opsPerMag | 1 / 4 / 2 |
| rack1Cap/2/3 | 3 / 6 / 10 |
| wageBase / wagePerLvl | 60 / 40 |
| pzLvl | 35 |
| skipMaxDays / skipEveryDays | 15 / 60 |
| guideFullSec / tipEverySec | 18 / 70 |
| hdArt / hdWorkerH / hdTreeH / hdTexCells / texInside (nuovi) | 1 / 50 / 78 / 2 / 0.75 |
| pixelInside / pixelTown / machSpriteFit | 1 / 2 / 0.96 |

| Costante in index.html (nuove) | Valore |
|---|---|
| ROUND_R (rotatoria/auto) | 2.0 |
| RIVER_W | 1.1 |
| RAIL_TURN / RAIL_RUN_N | 2.2 / 1.6 |
| BIG church / hall | c 6, r 10.5, 4×2 / c 17, r 14, 3×2 |
| GROWTH spostati | station 23.5,4 · houses 1,28 · offices 21,16.5 · market 21.5,26 · houses 51,24.4 |

- SpriteCook: crediti rimasti 318; modello usato `gpt-image-2.5-flare`; le uscite pixel a volte si schiacciano (32 px): usare sempre il `raw_url` (check_job_status verbose) e ritagliare con lo script `split.py`.
- Artifact: https://claude.ai/artifact/JE1Fkh7S5umczMBtZT4YXo (versione 21, con le iterazioni 82-88; pubblicata con config.js + assets/mach_*.png + assets/px/*.png nella mappa files)
- Ultimo commit: vedi git log (iterazioni 82-88)
- Ultima iterazione registrata: 88

## 9. People, terms & names
- **People:** ChiefTech Noah = capo/guida in gioco (giacca, cravatta rossa, occhiali, tablet); Officine Di Giacopo = grande cliente.
- **Terms & nicknames:** "Salva" = commit + push + ripubblica; Schema = flusso della sede; Linee = produzione; Bilancio = tabella del mese; Centrale = sezioni di corrente.
- **Names in use (codice):** `hdImg`, `drawHdSprite`, `drawPerson(role, seed, x, y, o)`, `PEOPLE`, `idSeed`, `palRole`, `drawBld(name, c, r, w, h, fit)`, `PX_FOOT`, `hdPattern(name, cells)`, `tex(n)`, `TEX_CELLS`, `FIELD_TEX`, `vnoise`, `groundKind`, `blobPx`, `fillCellsWith`, `keepClear`, `fixedRects`, `rectDist`, `townBridges`, `drawBridge`, `carRoute`, `fromTown`, `railAt`, `drawRailLine`, `trainObjs`, `PORTAL`, `RAIL_END_S`.
- **Sprite (assets/px/):** op0-3, mag0-3, it0-3, tech0-3, build0-3, clerk0-3, noah0-1; hA0-3, hB0-3, church, hall, school, market, shed, brick, silos, tower, containers, workshop, lot, station, office, site0-4, car0-2, van; shelf0-2, forklift, pil0-2, desk, rack1-3, power; bridge, fountain, barn, tunnel, stadium, loco, boxcar, flatcar, crane, worksite, bench, substation; tree, hedge; texture t_grass, t_asphalt, t_cobble, t_concrete, t_dirt, t_wheat, t_plough, t_veg, t_lavender, t_water, t_pave. Non usati: worker.png, forklift.png, hedge.png, tunnel ok.

## 10. Work state
| Item | Status | Version / location | Notes |
|---|---|---|---|
| Gioco | salvato | `prototypes/fabbrica-cnc/index.html` + `config.js` | iterazioni 1-88 |
| Asset nuovi | salvati | `prototypes/fabbrica-cnc/assets/px/` + `provenance.yaml` | tutti registrati |
| Anteprima città | solo nello scratchpad | `evidence/iter87-city-preview.png` | la pagina HTML dell'anteprima non è nel repo |
| Prova 3D | da togliere (chiedere) | `assets/hd/` | non usata; il comando rm era stato bloccato |
| Brief | aggiornato | `design/game-brief.md` = `prototypes/fabbrica-cnc/brief.md` | righe "After play:" fino alla 86 |
| Registro | aggiornato | `evidence/changes.tsv` | iterazioni 82-88 |
| Screenshot | salvati | `evidence/iter82-*.png` … `iter88-*.png` | |
| Build condivisa | pubblicata (v21) | `bash .claude/scripts/one-shot-share.sh prototypes/fabbrica-cnc` → `dist/` | poi Artifact publish file_path `.../dist/index.html`, files {"config.js": "prototypes/fabbrica-cnc/dist/config.js"}, url sopra |
| Controlli | — | `bash .claude/scripts/one-shot-check.sh prototypes/fabbrica-cnc --keep` (ultima riga attesa "keep lines 0 pinned 0") | qa.js, qa2.js, town.t.js, vis.t.js, walls.t.js erano nello scratchpad (non nel repo): vanno ricreati se servono |

## 11. Next steps
1. **Next action:** chiedere all'utente cosa vuole migliorare dopo aver visto la città a quartieri (versione 21).
2. Chiedere se togliere `assets/hd/` e gli sprite non usati.
3. Proposte possibili (solo se l'utente vuole): menu in pixel art realistica; la locomotiva guarda sempre a est; meno cemento intorno al Grande stabilimento; sprite tunnel.png serve ancora solo come segnale per il nuovo disegno dei binari (drawRail controlla hdImg('tunnel.png')).

## 12. Open questions ⚠️
- Togliere i file della prova 3D (`assets/hd/`) e gli sprite non usati (`px/worker.png`, `px/forklift.png`)? (sì / no)
- Il menu resta in stile cartoon o va rifatto in pixel art realistica? (tenere / rifare)

## 13. Re-attach checklist
- Nothing to attach (tutto è nel repository, branch `claude/epic-brahmagupta-b2evcr`).

---
<sub>Audit: 13/13 sections · 9 rules · 14 corrections · 40 data points · secrets removed: none found · generated by active-memory</sub>
