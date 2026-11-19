# Game Brief: Fabbrica CNC

## In your words
Vorrei creare un gioco per telefono con visuale stile clash of clans ma con la grafica dei personaggi un po pixelata, il main focus del gioco è lavorare in una fabbrica in cui acquisti macchinari cnc da costruire nella tua fabbrica collegarli in rete con vari minigiochi ed un sistema a livelli per migliorare gli attrezzi in uso con cui costruisci i macchinari e li colleghi in rete. Ci saranno diversi macchinari CNC sbloccabili avanzando di livello che ti faranno guadagnare soldi per sbloccare il resto.

1. Catena: è un puzzle e mettendo le macchine in un certo ordine estrapoli un tipo di pezzo differente che ti farà fruttare più o meno soldi
2. Minigiochi: Ci sara un minigioco differente per ogni fase. Tipo uno per il collegamento in rete, uno per montare/costruire la macchina e uno per configurarle
3. Attrezzi: gli attrezzi servono per velocizzare i minigiochi
4. Tempi: Conta la parcentuale di successo nel minigioco in base a quanto tempo ci metti
5. Feel: Calmo e ordinato quasi più simile a Hay Day
6. Difficoltà: niente fallimento solo grinding a diventare la fabbrica più grande
7. Obiettivo: l`obbiettivo sarà nel tempo raggiungendo il massimo livello e la fabbrica più grande
8. Fetta: Fai fin dove riesci con quello che ti ho scritto sopra

**Pitch:** Costruisci la tua fabbrica CNC pezzo per pezzo: monti le macchine, le cabli in rete, le configuri con tre minigiochi, poi le metti in fila nell'ordine giusto per sfornare i pezzi che rendono di più.

**Genre:** management / tycoon con minigiochi (a catena di produzione)

**Controls:** tap per selezionare e piazzare, trascina per muovere la visuale, rotellina o pizzico per lo zoom; nei minigiochi tap e trascinamento *(inferred (strong))*. Col mouse funziona allo stesso modo.

**Question:** montare, cablare e configurare ogni macchina con i minigiochi, e poi scoprire quale ordine di macchine produce il pezzo migliore, regge come loop rilassante per una sessione di 15-20 minuti? *(guessed)*

**Hooks:** l'ordine delle macchine decide il pezzo prodotto (catena = ricetta da scoprire); ogni macchina nasce da tre minigiochi in cui la velocità dà la percentuale di qualità.

**Intent:** no goal to reach *(you said)* · soft or no failure *(you said)*

## Look and references
- Look: fabbrica isometrica in stile base-builder mobile. Il capannone ha pavimento in cemento a piastrelle grigio-azzurre, strisce di sicurezza gialle e nere ai bordi delle celle, muri in mattoni rossi e lucernari. Le macchine CNC sono disegnate come blocchi isometrici con carenatura bianca/grigio chiaro, porta in vetro, pannello di controllo e una spia di stato (verde se lavora, gialla se attende, grigia se spenta). I cavi di rete blu corrono a terra fino al rack del server. Gli operai sono piccoli e in pixel art (sprite 16×16 ingranditi senza sfocatura), con tuta blu e casco giallo, e camminano tra le macchine. Palette: cemento grigio-azzurro (fondo), giallo sicurezza (selezione e accenti), verde (soldi e successo), blu rete (cavi e connessioni), arancione (pezzi in uscita). Dettaglio distintivo: ogni pezzo finito esce dalla macchina e scivola sul nastro fino alla successiva, e sopra l'ultima sale una moneta. Ogni figura è disegnata: niente emoji, niente cerchi semplici.
- References: Clash of Clans (la visuale isometrica della base e gli edifici dettagliati da toccare); Hay Day (il ritmo calmo, le produzioni a catena, la soddisfazione del raccogliere).
- View: 2.5D isometrica · Camera: isometrica dall'alto, trascinamento e zoom.

## First minute
Si apre su un capannone quasi vuoto, con un operaio pixel che saluta e 500 monete. Una freccia indica il negozio: compri la Troncatrice CNC e la piazzi su una cella (il fantasma verde mostra dove va, si sente il "clack"). Parte il minigioco Montaggio: tocchi i bulloni nell'ordine indicato prima che il tempo finisca, e il risultato dà una percentuale, per esempio 92%. Poi il minigioco Rete: trascini il cavo dal rack alla macchina su una griglia, girando intorno agli ostacoli. Poi il minigioco Configurazione: fermi un ago su una zona verde per impostare velocità e avanzamento. La macchina si accende, sforna barre tagliate e salgono le prime monete. Con quei soldi compri il Tornio CNC, lo metti dopo la troncatrice sul nastro e il pezzo cambia in "Perno tornito", che vale il triplo: è qui che si capisce il gioco.

## Challenge
Nessun fallimento *(you said)*. La sfida è di ottimizzazione: verso il 3°-5° minuto sblocchi la terza macchina (la Fresa) e scopri che l'ordine conta. Troncatrice→Tornio→Fresa dà un pezzo diverso (e più prezioso) di Troncatrice→Fresa→Tornio, e alcune combinazioni producono scarti di poco valore. La qualità della macchina (la media dei tre minigiochi) moltiplica quanto rende, quindi un minigioco fatto male si sente nei guadagni. Più avanti gli attrezzi migliori danno più tempo nei minigiochi, le macchine nuove allungano le catene e servono celle e linee in più (ampliamento del capannone).

## Core loop
- Guadagni monete dai pezzi che escono dalle tue linee di produzione
- Compri una nuova macchina CNC (sbloccata dal tuo livello) e la piazzi
- La costruisci con tre minigiochi (montaggio → rete → configurazione): più sei veloce, più alta è la percentuale e meglio rende
- Riordini le macchine sulla linea per scoprire ricette di pezzi più preziosi (ricettario che si riempie)
- Guadagni XP, sali di livello: nuove macchine, ampliamenti, e potenzi gli attrezzi che velocizzano i minigiochi

## Goal & fail state
- Sessione: arrivare a sbloccare tutte le macchine della fetta e scoprire le ricette, verso il livello massimo della fetta e una fabbrica ampliata. A lungo termine: livello massimo e fabbrica più grande *(you said)*.
- Nessun fallimento *(you said)*: si gioca e si cresce, con salvataggio automatico.

## Features
- [x] Capannone isometrico a griglia con trascinamento e zoom, piazzamento con anteprima
- [x] 5 macchine CNC sbloccabili per livello: Troncatrice, Tornio, Fresa, Foratrice, Centro di lavoro 5 assi *(guessed)*
- [x] Linee di produzione: l'ordine delle macchine decide il pezzo (ricette), con un ricettario che si riempie scoprendole
- [x] 3 minigiochi per macchina: Montaggio (bulloni in ordine), Rete (percorso del cavo su griglia), Configurazione (ago nella zona verde); la percentuale dipende dal tempo
- [x] Livelli/XP che sbloccano macchine e ampliamenti del capannone
- [x] Attrezzi potenziabili (Chiave, Crimpatrice, Tester) che danno più tempo nel loro minigioco
- [x] Monete che salgono dai pezzi, entrate al minuto visibili, prossimo obiettivo sempre a schermo
- [x] Operai in pixel art che camminano tra le macchine; salvataggio automatico

## Your systems
- macchinari CNC da acquistare e costruire · in the slice
- collegamento in rete con minigioco · in the slice
- montaggio/costruzione con minigioco · in the slice
- configurazione con minigioco · in the slice
- ordine delle macchine che dà pezzi diversi (puzzle) · in the slice
- sistema a livelli che sblocca le macchine · in the slice
- attrezzi potenziabili che velocizzano i minigiochi · in the slice
- fabbrica sempre più grande · thin stand-in *(guessed)*

## Keep
-

## Avoid
- Fallimento o game over (niente fallimento, solo crescita)
- Fretta e pressione: niente ordini in scadenza, niente guasti a sorpresa

## Out of scope
- Albero di ricerca: grow it
- Più sedi o fabbriche: grow it
- Bilanciamento a lungo termine dell'economia fino al livello massimo: grow it
- Più valute (es. gemme): add it as a feature
- App per gli store (iOS/Android): si costruisce invece un gioco web che gira nel browser del telefono
- Platform: phone: it runs in a phone's browser, with no touch kit yet: touch controls are built from your words, and no check plays them.

## Build order
1. La fetta: capannone, 5 macchine con i tre minigiochi, linee con ricette, livelli, attrezzi, monete e salvataggio. Una sessione completa dal capannone vuoto all'ultima macchina sbloccata, senza fallimento.
2. Ampliamenti del capannone più grandi e altre macchine
3. Bilanciamento a lungo termine verso il livello massimo

---
**Kill condition:** se dopo due giri di modifiche i minigiochi stancano già alla terza macchina. *(guessed)*

**Who it's for / what they feel:** giocatori mobile da sessioni calme, che vogliono la soddisfazione di veder crescere la propria fabbrica. *(guessed)*

**Games you love / don't:** Clash of Clans (la visuale), Hay Day (il ritmo calmo).
