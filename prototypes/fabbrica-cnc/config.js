// PROTOTYPE - NOT FOR PRODUCTION
// Question: montare, cablare e configurare ogni macchina con i minigiochi, e poi scoprire quale ordine di macchine produce il pezzo migliore, regge come loop rilassante?
// Date: 2026-11-19
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // ---- Economia di partenza ----
  startCoins: { value: 500, min: 0, max: 5000, step: 50 },   // monete all'inizio

  // ---- Macchine: costo (monete) ----
  costT: { value: 200, min: 50, max: 2000, step: 10 },       // Troncatrice CNC
  costL: { value: 450, min: 100, max: 4000, step: 10 },      // Tornio CNC
  costF: { value: 900, min: 200, max: 8000, step: 50 },      // Fresa CNC
  costD: { value: 1600, min: 300, max: 12000, step: 50 },    // Foratrice CNC
  costX: { value: 5000, min: 1000, max: 40000, step: 100 },  // Centro di lavoro 5 assi
  copyMult: { value: 0.5, min: 0, max: 2, step: 0.05 },      // ogni copia in più costa +50%
  sellRefund: { value: 0.5, min: 0, max: 1, step: 0.05 },    // quota rimborsata vendendo una macchina

  // ---- Macchine: livello di sblocco ----
  unlockT: { value: 1, min: 1, max: 10, step: 1 },
  unlockL: { value: 2, min: 1, max: 10, step: 1 },
  unlockF: { value: 3, min: 1, max: 10, step: 1 },
  unlockD: { value: 5, min: 1, max: 10, step: 1 },
  unlockX: { value: 7, min: 1, max: 10, step: 1 },

  // ---- Macchine: tempo di lavorazione per pezzo (s) ----
  timeT: { value: 1.6, min: 0.3, max: 10, step: 0.1 },
  timeL: { value: 2.4, min: 0.3, max: 10, step: 0.1 },
  timeF: { value: 2.8, min: 0.3, max: 10, step: 0.1 },
  timeD: { value: 2.0, min: 0.3, max: 10, step: 0.1 },
  timeX: { value: 4.0, min: 0.3, max: 15, step: 0.1 },

  // ---- Macchine: bulloni da montare (minigioco Montaggio) ----
  boltsT: { value: 4, min: 2, max: 10, step: 1 },
  boltsL: { value: 5, min: 2, max: 10, step: 1 },
  boltsF: { value: 6, min: 2, max: 10, step: 1 },
  boltsD: { value: 6, min: 2, max: 10, step: 1 },
  boltsX: { value: 8, min: 2, max: 10, step: 1 },

  // ---- Macchine: parametri da tarare (minigioco Configurazione) ----
  dialsT: { value: 2, min: 1, max: 5, step: 1 },
  dialsL: { value: 3, min: 1, max: 5, step: 1 },
  dialsF: { value: 3, min: 1, max: 5, step: 1 },
  dialsD: { value: 3, min: 1, max: 5, step: 1 },
  dialsX: { value: 4, min: 1, max: 5, step: 1 },

  // ---- Linee di produzione ----
  beltSpeed: { value: 1.6, min: 0.3, max: 5, step: 0.1 },    // celle al secondo sul nastro
  spawnGap: { value: 1.2, min: 0.3, max: 5, step: 0.1 },     // s tra una barra grezza e la successiva
  pieceGap: { value: 0.55, min: 0.2, max: 1, step: 0.05 },   // distanza minima tra pezzi (celle)
  qualityBase: { value: 0.5, min: 0, max: 1, step: 0.05 },   // resa = qualityBase + qualità% / 100

  // ---- Ricette: monete per pezzo (prima della qualità) ----
  val_T: { value: 10, min: 1, max: 5000, step: 1 },          // Barra tagliata
  val_TD: { value: 22, min: 1, max: 5000, step: 1 },         // Distanziale forato
  val_TL: { value: 30, min: 1, max: 5000, step: 1 },         // Perno tornito
  val_TF: { value: 34, min: 1, max: 5000, step: 1 },         // Piastra fresata
  val_TFL: { value: 60, min: 1, max: 5000, step: 1 },        // Mozzo
  val_TLF: { value: 85, min: 1, max: 5000, step: 1 },        // Albero scanalato
  val_TLD: { value: 75, min: 1, max: 5000, step: 1 },        // Boccola
  val_TFD: { value: 95, min: 1, max: 5000, step: 1 },        // Flangia forata
  val_TFLD: { value: 160, min: 1, max: 5000, step: 1 },      // Ingranaggio
  val_TLFD: { value: 200, min: 1, max: 5000, step: 1 },      // Albero motore
  val_TX: { value: 150, min: 1, max: 5000, step: 1 },        // Staffa complessa
  val_TFX: { value: 260, min: 1, max: 5000, step: 1 },       // Supporto lavorato
  val_TLX: { value: 320, min: 1, max: 5000, step: 1 },       // Girante turbina
  val_TFDX: { value: 420, min: 1, max: 5000, step: 1 },      // Blocco motore
  val_TLFDX: { value: 900, min: 1, max: 9000, step: 1 },     // Pala aeronautica
  val_scrap: { value: 3, min: 0, max: 100, step: 1 },        // Scarto (ordine sbagliato)

  // ---- Esperienza e livelli ----
  xpBase: { value: 50, min: 10, max: 500, step: 5 },         // XP totali per il livello 2
  xpExp: { value: 1.6, min: 1, max: 3, step: 0.05 },         // soglia(L) = xpBase * (L-1)^xpExp
  maxLevel: { value: 10, min: 2, max: 30, step: 1 },
  xpPerSale: { value: 1, min: 0, max: 20, step: 1 },         // XP per pezzo venduto
  xpRecipe: { value: 40, min: 0, max: 500, step: 5 },        // XP per ricetta scoperta
  xpPerPct: { value: 0.1, min: 0, max: 2, step: 0.01 },      // XP per punto % in un minigioco

  // ---- Minigiochi: percentuale dal tempo ----
  limitMult: { value: 3, min: 1.5, max: 6, step: 0.1 },      // tempo limite = tempo ottimo x questo
  pctFloor: { value: 40, min: 0, max: 90, step: 5 },         // percentuale minima (mai fallimento)
  mgPenalty: { value: 1.0, min: 0, max: 5, step: 0.1 },      // s aggiunti per ogni errore
  // Montaggio
  parBolt: { value: 1.1, min: 0.3, max: 4, step: 0.05 },     // s ottimi per bullone
  boltTurns: { value: 4, min: 1, max: 8, step: 1 },          // giri per bullone con la Chiave liv. 1
  // Rete
  netObstacles: { value: 9, min: 0, max: 20, step: 1 },      // ostacoli sulla griglia
  parCell: { value: 0.28, min: 0.1, max: 1, step: 0.02 },    // s ottimi per cella di cavo
  parCrimp: { value: 1.0, min: 0.2, max: 4, step: 0.1 },     // s ottimi per la crimpatura
  crimpTaps: { value: 4, min: 1, max: 8, step: 1 },          // tocchi di crimpatura con la Crimpatrice liv. 1
  // Configurazione
  parDial: { value: 1.6, min: 0.4, max: 5, step: 0.1 },      // s ottimi per parametro
  zoneBase: { value: 0.13, min: 0.03, max: 0.5, step: 0.01 },// ampiezza zona verde con il Tester liv. 1
  zonePerLvl: { value: 0.05, min: 0, max: 0.2, step: 0.01 }, // zona verde in più per livello
  needleSpeed: { value: 2.4, min: 0.5, max: 8, step: 0.1 },  // velocità ago (rad/s) al liv. 1
  needleSlowPerLvl: { value: 0.15, min: 0, max: 0.3, step: 0.01 }, // rallentamento per livello

  // ---- Attrezzi ----
  toolMax: { value: 4, min: 2, max: 6, step: 1 },
  toolCost2: { value: 400, min: 0, max: 20000, step: 50 },
  toolCost3: { value: 1500, min: 0, max: 50000, step: 50 },
  toolCost4: { value: 5000, min: 0, max: 90000, step: 100 },
  toolReqW: { value: 3, min: 1, max: 10, step: 1 },          // livello giocatore per Chiave liv. 2
  toolReqC: { value: 4, min: 1, max: 10, step: 1 },          // per Crimpatrice liv. 2
  toolReqT: { value: 5, min: 1, max: 10, step: 1 },          // per Tester liv. 2
  toolReqStep: { value: 2, min: 0, max: 5, step: 1 },        // livelli in più per ogni livello attrezzo

  // ---- Capannone (ampliamenti) ----
  line2Cost: { value: 1500, min: 0, max: 50000, step: 100 },
  line2Lvl: { value: 4, min: 1, max: 10, step: 1 },
  longCost: { value: 3000, min: 0, max: 50000, step: 100 },  // linee da 4 a 5 posti
  longLvl: { value: 6, min: 1, max: 10, step: 1 },
  line3Cost: { value: 6000, min: 0, max: 90000, step: 100 },
  line3Lvl: { value: 8, min: 1, max: 10, step: 1 },

  // ---- Obiettivi ----
  goalCoins: { value: 100, min: 0, max: 2000, step: 10 },    // monete premio (x numero obiettivo/3+1)
  goalXp: { value: 20, min: 0, max: 500, step: 5 },          // XP premio per obiettivo

  // ---- Visuale ----
  zoomMin: { value: 0.7, min: 0.3, max: 2, step: 0.05 },
  zoomMax: { value: 2.8, min: 1, max: 5, step: 0.05 },
  zoomStart: { value: 1.75, min: 0.5, max: 3, step: 0.05 },
  panSpeed: { value: 420, min: 50, max: 2000, step: 10 },    // px/s con le frecce
  workerSpeed: { value: 1.3, min: 0.2, max: 5, step: 0.1 },  // celle al secondo
  workers: { value: 3, min: 1, max: 8, step: 1 },            // operai iniziali (+1 per linea aperta)
};
