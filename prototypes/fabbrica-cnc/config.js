// PROTOTYPE - NOT FOR PRODUCTION
// Question: montare, cablare e configurare ogni macchina con i minigiochi, e poi scoprire quale ordine di macchine produce il pezzo migliore, regge come loop rilassante?
// Date: 2026-11-19
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // ---- Economia di partenza ----
  startCoins: { value: 900, min: 0, max: 5000, step: 50 },   // monete all'inizio

  // ---- Macchine: costo (monete) ----
  costT: { value: 200, min: 50, max: 2000, step: 10 },       // Troncatrice CNC
  costL: { value: 450, min: 100, max: 4000, step: 10 },      // Tornio CNC
  costF: { value: 900, min: 200, max: 8000, step: 50 },      // Fresa CNC
  costD: { value: 1600, min: 300, max: 12000, step: 50 },    // Foratrice CNC
  costX: { value: 5000, min: 1000, max: 40000, step: 100 },  // Centro di lavoro 5 assi
  copyMult: { value: 0.5, min: 0, max: 2, step: 0.05 },      // ogni copia in più costa +50%
  sellRefund: { value: 0.5, min: 0, max: 1, step: 0.05 },    // quota rimborsata vendendo una macchina

  // ---- Macchine: livello di sblocco ----
  unlockT: { value: 1, min: 1, max: 50, step: 1 },
  unlockL: { value: 3, min: 1, max: 50, step: 1 },
  unlockF: { value: 6, min: 1, max: 50, step: 1 },
  unlockD: { value: 9, min: 1, max: 50, step: 1 },
  unlockX: { value: 12, min: 1, max: 50, step: 1 },

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
  spawnGap: { value: 1.2, min: 0.3, max: 5, step: 0.1 },     // s tra una barra grezza e la successiva, per Magazzino
  stockCap: { value: 8, min: 1, max: 50, step: 1 },          // pezzi massimi di un tipo nel magazzino interno del capannone
  opsBase: { value: 2, min: 1, max: 10, step: 1 },           // operatori al livello 1
  opsPerLvl: { value: 0.5, min: 0, max: 5, step: 0.25 }, // operatori in più per ogni livello (0,5 = uno ogni due livelli)
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
  xpBase: { value: 80, min: 10, max: 500, step: 5 }, // XP totali per il livello 2
  xpExp: { value: 2.0, min: 1, max: 3, step: 0.05 }, // soglia(L) = xpBase * (L-1)^xpExp: più alto = livelli più lenti
  maxLevel: { value: 50, min: 2, max: 100, step: 1 }, // livello massimo: i token bastano a completare la ragnatela
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
  toolReqW: { value: 4, min: 1, max: 50, step: 1 },          // livello giocatore per Chiave liv. 2
  toolReqC: { value: 6, min: 1, max: 50, step: 1 },          // per Crimpatrice liv. 2
  toolReqT: { value: 8, min: 1, max: 50, step: 1 },          // per Tester liv. 2
  toolReqStep: { value: 5, min: 0, max: 15, step: 1 },        // livelli in più per ogni livello attrezzo

  // ---- Logistica (piazzamento libero) ----
  sourceCost: { value: 300, min: 0, max: 5000, step: 10 },    // Magazzino barre in più
  crateCost: { value: 150, min: 0, max: 5000, step: 10 },     // Cassa vendita in più
  logisticsCopyMult: { value: 0.5, min: 0, max: 2, step: 0.05 }, // ogni Magazzino/Cassa in più costa +50%

  rackCost: { value: 400, min: 0, max: 5000, step: 10 },      // Rack di rete in più (il primo di ogni capannone è gratis)
  // ---- Persone e corrente per sede ----
  staffCap0: { value: 6, min: 1, max: 60, step: 1 }, staffCap1: { value: 10, min: 1, max: 60, step: 1 }, staffCap2: { value: 14, min: 1, max: 60, step: 1 }, // persone che lavorano in ogni sede
  staffCap3: { value: 20, min: 1, max: 60, step: 1 }, staffCap4: { value: 28, min: 1, max: 60, step: 1 },
  power0: { value: 24, min: 1, max: 2000, step: 1 }, power1: { value: 50, min: 1, max: 2000, step: 1 }, power2: { value: 90, min: 1, max: 2000, step: 1 }, // kW di corrente di ogni sede
  power3: { value: 150, min: 1, max: 2000, step: 1 }, power4: { value: 260, min: 1, max: 2000, step: 1 },
  powT: { value: 4, min: 1, max: 100, step: 1 }, powL: { value: 6, min: 1, max: 100, step: 1 }, powF: { value: 8, min: 1, max: 100, step: 1 }, // kW di una macchina Mk I
  powD: { value: 5, min: 1, max: 100, step: 1 }, powX: { value: 12, min: 1, max: 100, step: 1 },
  rackLvl: { value: 5, min: 1, max: 50, step: 1 },           // livello che sblocca Rack di rete e Postazione PC
  pcCost: { value: 300, min: 0, max: 5000, step: 10 },        // Postazione PC in più (la prima di ogni capannone è gratis)
  magSpeed: { value: 2.6, min: 0.3, max: 6, step: 0.1 },      // celle al secondo di un magazziniere
  handTime: { value: 0.2, min: 0, max: 3, step: 0.05 },      // s per prendere o posare un pezzo
  itSpeed: { value: 1.4, min: 0.3, max: 6, step: 0.1 },       // celle al secondo di un informatico
  itCheckMin: { value: 1.5, min: 0, max: 10, step: 0.1 },     // s minimi che passa a controllare una macchina, il rack o il PC
  itCheckMax: { value: 4, min: 0, max: 20, step: 0.1 },       // s massimi
  itMachineOdds: { value: 0.55, min: 0, max: 1, step: 0.05 }, // probabilità di andare a una macchina
  itRackOdds: { value: 0.2, min: 0, max: 1, step: 0.05 },     // probabilità di andare al rack (il resto: torna al PC)
  netBonus: { value: 0.1, min: 0, max: 2, step: 0.01 },       // resa in più di una macchina in rete al 100%, all'inizio (0.1 = +10%)
  netBonusPerLvl: { value: 0.05, min: 0, max: 1, step: 0.01 }, // in più per ogni livello della Crimpatrice oltre il primo

  // ---- Sedi della storia: misura (celle) di ogni sede, livello che la sblocca e costo del trasloco ----
  shed0Cols: { value: 6, min: 3, max: 14, step: 1 },
  shed0Rows: { value: 5, min: 3, max: 10, step: 1 },
  shed1Cols: { value: 8, min: 3, max: 14, step: 1 },
  shed1Rows: { value: 6, min: 3, max: 10, step: 1 },
  shed1Lvl: { value: 6, min: 1, max: 60, step: 1 },
  shed1Cost: { value: 1500, min: 0, max: 90000, step: 100 },
  shed2Cols: { value: 10, min: 3, max: 14, step: 1 },
  shed2Rows: { value: 8, min: 3, max: 16, step: 1 },
  shed2Lvl: { value: 14, min: 1, max: 60, step: 1 },
  shed2Cost: { value: 4000, min: 0, max: 90000, step: 100 },
  shed3Cols: { value: 13, min: 3, max: 20, step: 1 },
  shed3Rows: { value: 9, min: 3, max: 16, step: 1 },
  shed3Lvl: { value: 24, min: 1, max: 60, step: 1 },
  shed3Cost: { value: 9000, min: 0, max: 90000, step: 100 },
  shed4Cols: { value: 16, min: 3, max: 20, step: 1 },
  shed4Rows: { value: 12, min: 3, max: 16, step: 1 },
  shed4Lvl: { value: 34, min: 1, max: 60, step: 1 },
  shed4Cost: { value: 18000, min: 0, max: 90000, step: 100 },

  // ---- Video intro ----
  introLength: { value: 14, min: 4, max: 40, step: 0.5 },     // s del sorvolo sulla città fino alla fabbrica
  moveLength: { value: 9, min: 3, max: 30, step: 0.5 },       // s del volo dalla vecchia sede alla nuova nel trasloco

  // ---- Esterno (usato dal sorvolo e dalle versioni precedenti) ----
  worldCols: { value: 30, min: 10, max: 60, step: 1 },        // larghezza del prato (caselle)
  worldRows: { value: 24, min: 10, max: 60, step: 1 },        // profondità del prato (caselle)
  worldZoom: { value: 1.0, min: 0.4, max: 3, step: 0.05 },    // zoom iniziale all'esterno
  cellCost: { value: 10, min: 0, max: 500, step: 1 },         // monete per cella di capannone (costruire o ingrandire)
  areaBase: { value: 30, min: 9, max: 200, step: 1 },         // celle massime di un capannone (con tutte le sue parti) al livello 1
  areaPerLvl: { value: 12, min: 0, max: 50, step: 1 },        // celle massime in più per ogni livello
  minSide: { value: 3, min: 2, max: 6, step: 1 },             // lato minimo di un capannone
  minGap: { value: 1, min: 1, max: 6, step: 1 },              // caselle di prato libero tra due capannoni separati (anche in diagonale)
  joinWidth: { value: 3, min: 1, max: 6, step: 1 },           // un pezzo attaccato deve toccare il capannone per almeno tante celle di fila
  joinDepth: { value: 2, min: 1, max: 6, step: 1 },           // e sporgere almeno tante celle: un passaggio 3×2 per i nastri
  maxCols: { value: 14, min: 4, max: 14, step: 1 },           // lato massimo (colonne)
  maxRows: { value: 10, min: 4, max: 10, step: 1 },           // lato massimo (file)
  maxBuildings: { value: 4, min: 1, max: 4, step: 1 },        // capannoni separati (quelli attaccati diventano uno solo); building2..4 qui sotto
  building2Lvl: { value: 4, min: 1, max: 10, step: 1 },       // livello per il secondo capannone
  building2Cost: { value: 1000, min: 0, max: 90000, step: 100 }, // permesso di costruzione, oltre alle celle
  building3Lvl: { value: 7, min: 1, max: 10, step: 1 },
  building3Cost: { value: 4000, min: 0, max: 90000, step: 100 },
  building4Lvl: { value: 9, min: 1, max: 10, step: 1 },
  building4Cost: { value: 9000, min: 0, max: 90000, step: 100 },
  cellsPerWorker: { value: 60, min: 4, max: 200, step: 1 },   // un muratore in più ogni tot celle di capannone

  // ---- Obiettivi ----
  goalCoins: { value: 100, min: 0, max: 2000, step: 10 },    // monete premio (x numero obiettivo/3+1)
  goalXp: { value: 20, min: 0, max: 500, step: 5 },          // XP premio per obiettivo

  // ---- Visuale ----
  zoomMin: { value: 0.7, min: 0.3, max: 2, step: 0.05 },
  zoomMax: { value: 2.8, min: 1, max: 5, step: 0.05 },
  zoomStart: { value: 1.75, min: 0.5, max: 3, step: 0.05 },
  panSpeed: { value: 420, min: 50, max: 2000, step: 10 },    // px/s con le frecce
  workerSpeed: { value: 1.3, min: 0.2, max: 5, step: 0.1 },  // celle al secondo
  dayLength: { value: 525, min: 50, max: 3000, step: 5 },   // s reali di una giornata a x1: il turno di 8 ore (08-16) ne è l'80% = 7 minuti; a fine turno il tempo si ferma
  machSpriteFit: { value: 0.96, min: 0.6, max: 1.2, step: 0.01 }, // larghezza degli sprite delle macchine rispetto all'ingombro sullo schermo
  backdropScale: { value: 2.5, min: 1, max: 6, step: 0.1 }, // celle di fabbrica per ogni cella della mappa: quanto è ingrandito il quartiere intorno
  perkSpeed: { value: 0.8, min: 0.3, max: 1, step: 0.05 },   // abilità 'più veloce': tempo per pezzo moltiplicato per questo
  perkQuality: { value: 0.15, min: 0, max: 1, step: 0.05 },  // abilità 'precisione': qualità aggiunta ai pezzi
  pixelInside: { value: 1, min: 1, max: 5, step: 1 },        // grandezza del pixel dentro la fabbrica (1 = nitido)
  pixelTown: { value: 2, min: 1, max: 5, step: 1 },          // grandezza del pixel nella vista della città
  townZoomMin: { value: 0.35, min: 0.2, max: 1, step: 0.05 }, townZoomMax: { value: 2.4, min: 1, max: 4, step: 0.1 },
  townZoom: { value: 1.1, min: 0.3, max: 3, step: 0.05 },    // zoom quando esci dalla fabbrica
  nightDark: { value: 0.4, min: 0, max: 0.8, step: 0.05 },    // quanto si scurisce di notte
  // ---- Calendario, velocità e imprevisti ----
  speedMid: { value: 3, min: 1, max: 20, step: 1 },          // velocità del secondo pulsante
  speedFast: { value: 8, min: 1, max: 40, step: 1 },         // velocità del terzo pulsante
  breakBase: { value: 0.003, min: 0, max: 0.2, step: 0.001 }, // probabilità ogni ora di lavoro che una macchina si guasti (a x1, nuova)
  breakFastMult: { value: 3, min: 1, max: 10, step: 0.5 },    // quanto aumentano i guasti col tempo veloce (alla velocità più alta)
  ageRef: { value: 60, min: 5, max: 400, step: 5 },          // giorni dopo cui una macchina si guasta il doppio
  maxAge: { value: 120, min: 10, max: 1000, step: 5 },        // giorni dopo cui una macchina è troppo vecchia e va sostituita
  replaceCost: { value: 0.6, min: 0, max: 2, step: 0.05 },    // quota del prezzo per sostituire una macchina vecchia
  // ---- Magazzino e ufficio ----
  barsStart: { value: 40, min: 0, max: 500, step: 5 },        // barre in magazzino all'inizio
  barCost: { value: 1, min: 0, max: 100, step: 1 },           // monete per barra ordinata
  barsPerCell: { value: 20, min: 1, max: 100, step: 1 },      // barre che stanno in una cella della zona magazzino
  deliveryHours: { value: 2, min: 0, max: 24, step: 0.5 },    // ore di gioco perché arrivi un ordine
  storeBase: { value: 30, min: 0, max: 500, step: 5 },        // pezzi finiti che il magazzino tiene da parte nella prima sede
  storePerStage: { value: 30, min: 0, max: 500, step: 5 },    // in più per ogni sede successiva
  dialGrace: { value: 0.03, min: 0, max: 0.2, step: 0.01 },  // tolleranza ai bordi della zona verde dei manometri
  unloadTime: { value: 3.5, min: 0.5, max: 15, step: 0.5 }, // secondi reali che il camion impiega a scaricare
  autoBelow: { value: 0.25, min: 0, max: 0.9, step: 0.05 },   // il riordino automatico scatta sotto questa quota del magazzino
  annex0W: { value: 2, min: 1, max: 6, step: 1 }, officeW0: { value: 2, min: 1, max: 8, step: 1 }, office0H: { value: 1, min: 1, max: 6, step: 1 }, // per sede: colonne dell'ala magazzino a destra; larghezza e profondità dell'ufficio staccato davanti
  annex1W: { value: 3, min: 1, max: 6, step: 1 }, officeW1: { value: 3, min: 1, max: 8, step: 1 }, office1H: { value: 1, min: 1, max: 6, step: 1 },
  annex2W: { value: 3, min: 1, max: 6, step: 1 }, officeW2: { value: 3, min: 1, max: 8, step: 1 }, office2H: { value: 2, min: 1, max: 6, step: 1 },
  annex3W: { value: 4, min: 1, max: 6, step: 1 }, officeW3: { value: 4, min: 1, max: 8, step: 1 }, office3H: { value: 2, min: 1, max: 6, step: 1 },
  annex4W: { value: 4, min: 1, max: 6, step: 1 }, officeW4: { value: 5, min: 1, max: 8, step: 1 }, office4H: { value: 2, min: 1, max: 6, step: 1 },
  build1Days: { value: 8, min: 0, max: 200, step: 1 },        // giorni di cantiere della sede del capitolo 2
  build2Days: { value: 14, min: 0, max: 200, step: 1 },
  build3Days: { value: 20, min: 0, max: 200, step: 1 },
  build4Days: { value: 28, min: 0, max: 200, step: 1 },
  workers: { value: 1, min: 0, max: 8, step: 1 },            // muratori che costruiscono le macchine, per capannone
};
