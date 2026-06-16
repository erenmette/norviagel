// Blog content for Norvia Gel Glove.
// Keyword strategy is informed by the Dutch hand protection market, where the
// dominant search term is "vloeibare handschoen" (liquid glove), alongside
// "gel handschoen", "onzichtbare handschoen" and intent terms like
// "verf van handen verwijderen" and "vuile handen voorkomen".
// House style: no em dashes anywhere, use commas, periods or parentheses.

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'cta'; text: string };

export type BlogLocaleContent = {
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  excerpt: string;
  readMinutes: number;
  blocks: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  date: string; // ISO yyyy-mm-dd
  image: string;
  tag: { nl: string; en: string };
  nl: BlogLocaleContent;
  en: BlogLocaleContent;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'vuile-handen-voorkomen-monteur',
    date: '2026-06-10',
    image: '/images/beschermde-hand.png',
    tag: { nl: 'Automotive', en: 'Automotive' },
    nl: {
      title: 'Vuile handen voorkomen: handbescherming voor monteurs',
      metaTitle: 'Handbescherming monteur | Norvia Gel Glove',
      description: 'Vuile handen voorkomen in de werkplaats? Ontdek hoe een vloeibare handschoen voor monteurs olie en vet tegenhoudt tot 4 uur en je huid verzorgt.',
      keywords: ['vuile handen voorkomen', 'handbescherming monteur', 'vloeibare handschoen', 'olie en vet van je handen', 'handen schoonmaken werkplaats', 'gel handschoen monteur'],
      excerpt: 'Olie, vet en vuil horen bij het vak, maar vieze handen niet. Zo voorkom je vuile handen in de werkplaats met een onzichtbare vloeibare handschoen.',
      readMinutes: 6,
      blocks: [
        { type: 'p', text: 'Als monteur ken je het probleem maar al te goed. Aan het einde van een werkdag zitten je handen vol met olie, vet, remstof en hardnekkig vuil dat met gewone zeep nauwelijks weggaat. Vieze handen horen er voor veel mensen gewoon bij in de werkplaats, maar dat hoeft niet. Met de juiste handbescherming voor monteurs voorkom je dat vuil zich in je huid vastzet en bespaar je jezelf elke avond een gevecht bij de wasbak. In dit artikel leggen we uit hoe je vuile handen voorkomt zonder dat je constant met dikke werkhandschoenen aan het sleutelen bent.' },
        { type: 'h2', text: 'Waarom vuile handen voorkomen makkelijker is dan schoonpoetsen' },
        { type: 'p', text: 'Olie en vet van je handen krijgen kost tijd en is slecht voor je huid. Agressieve handreinigers, verfverdunner of staalwol drogen je huid uit en geven op den duur kloven en irritatie. Het is logischer om aan de voorkant te beginnen, namelijk voorkomen dat het vuil zich hecht. Wanneer er een dunne beschermlaag tussen je huid en het vuil zit, blijft het meeste er simpelweg niet aan plakken. Het schoonmaken achteraf gaat daardoor sneller en je hebt veel minder schurende middelen nodig.' },
        { type: 'p', text: 'Daar komt bij dat veel monteurs niet de hele dag met handschoenen kunnen of willen werken. Voor fijn werk aan motoren, kabels of kleine onderdelen heb je gevoel in je vingers nodig. Een oplossing die je huid beschermt maar je tastgevoel intact laat, is dan precies wat je zoekt. Een vloeibare handschoen biedt die combinatie.' },
        { type: 'h2', text: 'Hoe een vloeibare handschoen voor monteurs werkt' },
        { type: 'p', text: 'De Norvia Gel Glove is een transparante gel die je op schone, droge handen aanbrengt. Je wrijft de gel goed uit over je handen, vingers en nagelriemen, en binnen ongeveer twee minuten droogt de gel op tot een onzichtbare beschermlaag. Je voelt en ziet er nauwelijks iets van, maar de laag houdt tot vier uur lang olie, vet, verf, vuil en veel chemicalien tegen. Aan het einde van je klus was je je handen gewoon met water en zeep, en het meeste vuil spoelt mee weg.' },
        { type: 'ul', items: ['Breng de gel aan op schone, droge handen voor je begint met werken.', 'Wrijf goed uit, ook tussen de vingers en rond de nagels.', 'Laat ongeveer twee minuten drogen tot de laag onzichtbaar is.', 'Werk tot vier uur door en breng daarna opnieuw aan indien nodig.', 'Was je handen na het werk met water en zeep.'] },
        { type: 'p', text: 'Omdat de gel siliconenvrij is en hydraterende ingredienten bevat, droogt hij je huid niet uit zoals sommige beschermcremes of agressieve reinigers dat doen. Zo combineer je handbescherming met huidverzorging in een product.' },
        { type: 'h2', text: 'Handen schoonmaken in de werkplaats kost minder moeite' },
        { type: 'p', text: 'Het grote voordeel merk je pas echt aan het einde van de dag. Waar je normaal minutenlang staat te boenen, spoel je nu het grootste deel van het vuil zo weg. Dat scheelt niet alleen tijd, maar ook huidproblemen op de lange termijn. Voor werkplaatsen die op meerdere monteurs draaien, telt die tijdwinst per persoon snel op.' },
        { type: 'p', text: 'De Norvia Gel Glove kost 28,95 euro per stuk, en vanaf twaalf stuks betaal je 26,95 euro per stuk, handig voor een hele werkplaats. Belangrijk om eerlijk te zijn: dit is een aanvulling op goede handhygiene en geen vervanging van verplichte veiligheidshandschoenen. Werk je met gevaarlijke stoffen waarvoor beschermende handschoenen voorgeschreven zijn, draag dan altijd die handschoenen. De gel is bedoeld voor het dagelijkse vuil, vet en olie waar je tijdens normaal werkplaatswerk mee te maken hebt.' },
        { type: 'faq', items: [
          { q: 'Vervangt de Norvia Gel Glove mijn werkhandschoenen?', a: 'Nee. De gel is een aanvulling op goede handhygiene en beschermt tegen dagelijks vuil, vet en olie. Bij werk met gevaarlijke stoffen draag je altijd de voorgeschreven veiligheidshandschoenen.' },
          { q: 'Hoe lang beschermt een laag gel?', a: 'Tot vier uur. Daarna kun je je handen wassen en opnieuw een laag aanbrengen als je verder werkt.' },
          { q: 'Blijft mijn tastgevoel intact?', a: 'Ja. De laag is onzichtbaar en dun, dus je houdt het gevoel in je vingers voor fijn werk aan onderdelen, kabels en motoren.' },
          { q: 'Is de gel slecht voor mijn huid?', a: 'Nee, de gel is siliconenvrij en bevat hydraterende ingredienten, dus hij verzorgt je huid in plaats van hem uit te drogen.' },
        ] },
        { type: 'cta', text: 'Wil je vuile handen voorkomen en aan het einde van de dag sneller klaar zijn? Bekijk de Norvia Gel Glove op de productpagina en probeer de vloeibare handschoen voor monteurs zelf uit.' },
      ],
    },
    en: {
      title: 'Prevent Dirty Hands: Hand Protection for Mechanics',
      metaTitle: 'Hand Protection for Mechanics | Norvia Gel Glove',
      description: 'Prevent dirty hands in the workshop. See how a liquid glove for mechanics blocks oil and grease for up to 4 hours and cares for your skin.',
      keywords: ['prevent dirty hands', 'hand protection mechanic', 'liquid glove', 'oil and grease off your hands', 'cleaning hands in the workshop', 'gel glove for mechanics'],
      excerpt: 'Oil, grease and dirt come with the job, but filthy hands do not. Here is how to prevent dirty hands in the workshop with an invisible liquid glove.',
      readMinutes: 6,
      blocks: [
        { type: 'p', text: 'As a mechanic, you know the problem all too well. At the end of a working day your hands are covered in oil, grease, brake dust and stubborn dirt that ordinary soap barely removes. Many people simply accept dirty hands as part of life in the workshop, but they do not have to. With the right hand protection for mechanics you stop dirt from settling into your skin and save yourself a nightly battle at the sink. In this article we explain how to prevent dirty hands without constantly wrenching in thick work gloves.' },
        { type: 'h2', text: 'Why preventing dirty hands beats scrubbing them clean' },
        { type: 'p', text: 'Getting oil and grease off your hands takes time and is hard on your skin. Aggressive hand cleaners, paint thinner or steel wool dry out your skin and eventually cause cracks and irritation. It makes more sense to start at the front end, namely stopping the dirt from sticking in the first place. When a thin protective layer sits between your skin and the dirt, most of it simply does not cling on. Cleaning afterwards goes faster and you need far fewer abrasive products.' },
        { type: 'p', text: 'On top of that, many mechanics cannot or do not want to wear gloves all day. Detailed work on engines, cables or small parts needs feeling in your fingers. A solution that protects your skin while keeping your sense of touch intact is exactly what you are looking for. A liquid glove offers that combination.' },
        { type: 'h2', text: 'How a liquid glove for mechanics works' },
        { type: 'p', text: 'The Norvia Gel Glove is a transparent gel that you apply to clean, dry hands. You rub the gel evenly over your hands, fingers and cuticles, and within about two minutes it dries into an invisible protective layer. You barely feel or see it, yet the layer holds off oil, grease, paint, dirt and many chemicals for up to four hours. When your job is done, you simply wash your hands with water and soap, and most of the dirt rinses away.' },
        { type: 'ul', items: ['Apply the gel to clean, dry hands before you start working.', 'Rub it in well, including between the fingers and around the nails.', 'Let it dry for about two minutes until the layer is invisible.', 'Work for up to four hours and reapply afterwards if needed.', 'Wash your hands with water and soap after the job.'] },
        { type: 'p', text: 'Because the gel is silicone-free and contains hydrating ingredients, it does not dry out your skin the way some barrier creams or harsh cleaners do. That way you combine hand protection with skin care in a single product.' },
        { type: 'h2', text: 'Cleaning your hands in the workshop takes less effort' },
        { type: 'p', text: 'You really notice the benefit at the end of the day. Where you used to scrub for minutes, you now rinse most of the dirt straight off. That saves time as well as long-term skin problems. For workshops running several mechanics, that time saved per person adds up quickly.' },
        { type: 'p', text: 'The Norvia Gel Glove costs 28.95 euro per unit, and from twelve units you pay 26.95 euro per unit, handy for an entire workshop. To be honest about it: this is a complement to good hand hygiene and not a replacement for mandatory safety gloves. If you work with hazardous substances that require protective gloves, always wear those gloves. The gel is meant for the everyday dirt, grease and oil you deal with during normal workshop tasks.' },
        { type: 'faq', items: [
          { q: 'Does the Norvia Gel Glove replace my work gloves?', a: 'No. The gel is a complement to good hand hygiene and protects against everyday dirt, grease and oil. For work with hazardous substances, always wear the prescribed safety gloves.' },
          { q: 'How long does one layer of gel protect?', a: 'Up to four hours. After that you can wash your hands and apply a fresh layer if you keep working.' },
          { q: 'Does my sense of touch stay intact?', a: 'Yes. The layer is invisible and thin, so you keep the feeling in your fingers for detailed work on parts, cables and engines.' },
          { q: 'Is the gel bad for my skin?', a: 'No, the gel is silicone-free and contains hydrating ingredients, so it cares for your skin instead of drying it out.' },
        ] },
        { type: 'cta', text: 'Want to prevent dirty hands and finish faster at the end of the day? Visit the Norvia Gel Glove product page and try the liquid glove for mechanics yourself.' },
      ],
    },
  },
  {
    slug: 'verf-van-handen-verwijderen-schilder',
    date: '2026-06-12',
    image: '/images/bottle.png',
    tag: { nl: 'Schilders', en: 'Painters' },
    nl: {
      title: 'Handbescherming voor schilders: verf van handen verwijderen',
      metaTitle: 'Handbescherming schilder | Norvia Gel Glove',
      description: 'Handbescherming voor schilders: bescherm je huid tegen verf en lak met Norvia Gel Glove en verwijder verf van je handen met water en zeep.',
      keywords: ['verf van handen verwijderen', 'verf van je huid', 'handbescherming schilder', 'vloeibare handschoen', 'schildershanden beschermen', 'verf voorkomen op handen'],
      excerpt: 'Verf, lak en beits hechten snel aan je huid. Lees hoe je als schilder je handen beschermt en verf achteraf makkelijk verwijdert.',
      readMinutes: 6,
      blocks: [
        { type: 'p', text: 'Als schilder of klusser ken je het probleem maar al te goed: spatten verf, lak of beits belanden op je handen, polsen en onderarmen. Verf hecht zich razendsnel aan je huid en kruipt in de kleine groefjes en rond je nagels. Na een lange werkdag sta je dan te boenen met agressieve middelen die je huid uitdrogen. Norvia Gel Glove biedt een eenvoudige en huidvriendelijke vorm van handbescherming voor de schilder. De gel zorgt dat verf en vuil veel makkelijker loslaten, terwijl je huid verzorgd blijft.' },
        { type: 'h2', text: 'Waarom verf zo moeilijk van je huid gaat' },
        { type: 'p', text: 'Verf, lak en beits bevatten bindmiddelen die juist gemaakt zijn om te blijven plakken. Op je huid grijpt verf zich vast in de kleine lijntjes en rond je nagels. Hoe langer de verf zit, hoe harder die wordt en hoe moeilijker je verf van je huid krijgt. Veel schilders pakken dan terpentine, thinner of agressieve zeep, maar die middelen drogen je handen uit en kunnen irritatie geven. Op den duur leidt dat tot schrale, gebarsten schildershanden die gevoelig worden en sneller scheurtjes vertonen. Het loont dus om verf op handen te voorkomen in plaats van achteraf te schrobben.' },
        { type: 'h2', text: 'Handbescherming voor de schilder met een vloeibare handschoen' },
        { type: 'p', text: 'Norvia Gel Glove is een transparante gel die je op schone, droge handen aanbrengt. De gel vormt een onzichtbare beschermlaag die in ongeveer twee minuten droogt. Daarna kun je gewoon aan het werk en voel je nauwelijks dat de laag er zit. De beschermlaag werkt tot vier uur tegen verf, lak, beits, olie, vet, vuil en veel chemicalien. Belangrijk om te weten: het is een aanvulling op goede handhygiene en op je normale werkwijze, geen vervanging van verplichte veiligheidshandschoenen bij gevaarlijke stoffen. Voor het normale schilderwerk en kluswerk is het een praktische extra laag tussen de verf en je huid.' },
        { type: 'ul', items: ['Breng een dunne laag aan op schone, droge handen en wrijf goed uit, ook rond nagels en knokkels.', 'Laat de gel ongeveer twee minuten drogen tot je huid weer droog aanvoelt.', 'Ga aan het werk: verf en vuil hechten op de laag in plaats van op je huid.', 'Was na afloop je handen met water en zeep, de verf laat dan makkelijker los.', 'Norvia Gel Glove is siliconenvrij en bevat hydraterende ingredienten die je huid verzorgen.'] },
        { type: 'h2', text: 'Verf van handen verwijderen na het klussen' },
        { type: 'p', text: 'Omdat de verf op de beschermlaag blijft zitten en niet diep in je huid trekt, gaat verf van je huid verwijderen een stuk vlotter. Spoel je handen met lauwwarm water en gebruik een milde zeep. In de meeste gevallen laat de verf los zonder dat je hoeft te schrobben met thinner. Zit er toch een hardnekkig plekje, herhaal dan rustig met zeep in plaats van direct naar een oplosmiddel te grijpen. Zo bescherm je niet alleen tegen verf, maar voorkom je ook dat je huid uitdroogt van het schoonmaken. Het resultaat zijn handen die er aan het eind van de dag een stuk beter uitzien.' },
        { type: 'h2', text: 'Verf op handen voorkomen begint bij de voorbereiding' },
        { type: 'p', text: 'De beste manier om verf op handen te voorkomen is een combinatie van goede voorbereiding en de juiste handbescherming. Trek werkkleding met lange mouwen aan, houd een vochtige doek bij de hand voor verse spatten en breng vooraf Norvia Gel Glove aan. Verse verf veeg je het makkelijkst meteen weg, voordat die de kans krijgt om uit te harden. Door je schildershanden op deze manier te beschermen, houd je je huid soepel en bespaar je jezelf veel boenwerk aan het eind van de dag. Een potje gaat lang mee, omdat je per keer maar een dun laagje nodig hebt.' },
        { type: 'faq', items: [
          { q: 'Is Norvia Gel Glove een vervanging voor veiligheidshandschoenen?', a: 'Nee. Het is een aanvulling op goede handhygiene en helpt tegen verf, vet en vuil, maar bij gevaarlijke stoffen blijf je de verplichte veiligheidshandschoenen dragen.' },
          { q: 'Hoe lang beschermt een laag?', a: 'De beschermlaag werkt tot vier uur. Was je tussendoor je handen of doe je zwaar werk, breng dan opnieuw een dun laagje aan.' },
          { q: 'Helpt het echt om verf van je huid te verwijderen?', a: 'Ja. Doordat de verf op de laag blijft en niet in je huid trekt, laat verf veel makkelijker los met water en zeep, vaak zonder thinner.' },
          { q: 'Is de gel geschikt voor een gevoelige huid?', a: 'De gel is siliconenvrij en bevat hydraterende ingredienten. Twijfel je, test dan eerst op een klein stukje huid.' },
        ] },
        { type: 'cta', text: 'Klaar om je handen tijdens het schilderen beter te beschermen? Bekijk de Norvia Gel Glove op de productpagina, per stuk 28,95 euro en vanaf 12 stuks 26,95 euro per stuk.' },
      ],
    },
    en: {
      title: 'Hand protection for painters: remove paint from skin',
      metaTitle: 'Hand protection painter | Norvia Gel Glove',
      description: 'Hand protection for painters: shield your skin from paint and lacquer with Norvia Gel Glove and remove paint from your hands using water and soap.',
      keywords: ['remove paint from hands', 'paint off your skin', 'hand protection painter', 'liquid glove', 'protect painter hands', 'prevent paint on hands'],
      excerpt: 'Paint, lacquer and stain cling fast to your skin. Learn how painters protect their hands and remove paint easily afterwards.',
      readMinutes: 6,
      blocks: [
        { type: 'p', text: 'As a painter or DIY worker you know the problem all too well: splashes of paint, lacquer or stain end up on your hands, wrists and forearms. Paint clings to your skin in seconds and creeps into the small grooves and around your nails. After a long day you are left scrubbing with harsh products that dry out your skin. Norvia Gel Glove offers a simple and skin friendly form of hand protection for the painter. The gel makes paint and dirt release far more easily, while your skin stays cared for.' },
        { type: 'h2', text: 'Why paint is so hard to get off your skin' },
        { type: 'p', text: 'Paint, lacquer and stain contain binders that are designed to keep sticking. On your skin, paint grips onto the fine lines and around your nails. The longer the paint sits, the harder it becomes and the more difficult it is to get paint off your skin. Many painters then reach for turpentine, thinner or aggressive soap, but those products dry out your hands and can cause irritation. Over time this leads to dry, cracked painter hands that become sensitive and split more easily. It pays to prevent paint on hands rather than scrubbing it off afterwards.' },
        { type: 'h2', text: 'Hand protection for the painter with a liquid glove' },
        { type: 'p', text: 'Norvia Gel Glove is a transparent gel that you apply to clean, dry hands. The gel forms an invisible protective layer that dries in about two minutes. After that you can simply get to work and you barely feel the layer is there. The protective layer works for up to four hours against paint, lacquer, stain, oil, grease, dirt and many chemicals. Important to know: it is an addition to good hand hygiene and to your normal way of working, not a replacement for the mandatory safety gloves used with hazardous substances. For everyday painting and DIY jobs it is a practical extra layer between the paint and your skin.' },
        { type: 'ul', items: ['Apply a thin layer to clean, dry hands and rub it in well, including around nails and knuckles.', 'Let the gel dry for about two minutes until your skin feels dry again.', 'Get to work: paint and dirt cling to the layer instead of to your skin.', 'Afterwards, wash your hands with water and soap, the paint then releases more easily.', 'Norvia Gel Glove is silicone free and contains hydrating ingredients that care for your skin.'] },
        { type: 'h2', text: 'Removing paint from hands after the job' },
        { type: 'p', text: 'Because the paint stays on the protective layer and does not soak deep into your skin, removing paint from your skin goes a lot faster. Rinse your hands with lukewarm water and use a mild soap. In most cases the paint releases without you having to scrub with thinner. If there is still a stubborn spot, simply repeat with soap instead of reaching straight for a solvent. This way you not only protect against paint, but you also prevent your skin from drying out during cleaning. The result is hands that look much better at the end of the day.' },
        { type: 'h2', text: 'Preventing paint on hands starts with preparation' },
        { type: 'p', text: 'The best way to prevent paint on hands is a combination of good preparation and the right hand protection. Wear work clothes with long sleeves, keep a damp cloth nearby for fresh splashes and apply Norvia Gel Glove beforehand. Fresh paint is easiest to wipe away straight away, before it has the chance to harden. By protecting your painter hands this way, you keep your skin supple and save yourself a lot of scrubbing at the end of the day. A jar lasts a long time, because you only need a thin layer each time.' },
        { type: 'faq', items: [
          { q: 'Is Norvia Gel Glove a replacement for safety gloves?', a: 'No. It is an addition to good hand hygiene and helps against paint, grease and dirt, but with hazardous substances you keep wearing the mandatory safety gloves.' },
          { q: 'How long does one layer protect?', a: 'The protective layer works for up to four hours. If you wash your hands in between or do heavy work, apply a thin layer again.' },
          { q: 'Does it really help to remove paint from your skin?', a: 'Yes. Because the paint stays on the layer and does not soak into your skin, paint releases much more easily with water and soap, often without thinner.' },
          { q: 'Is the gel suitable for sensitive skin?', a: 'The gel is silicone free and contains hydrating ingredients. If in doubt, test it first on a small patch of skin.' },
        ] },
        { type: 'cta', text: 'Ready to protect your hands better while painting? Take a look at Norvia Gel Glove on the product page, 28.95 euro per unit and 26.95 euro per unit from 12 units.' },
      ],
    },
  },
  {
    slug: 'gel-handschoen-vs-wegwerphandschoenen',
    date: '2026-06-14',
    image: '/images/hand.png',
    tag: { nl: 'Vergelijking', en: 'Comparison' },
    nl: {
      title: 'Vloeibare handschoen of wegwerphandschoenen: de eerlijke vergelijking',
      metaTitle: 'Vloeibare handschoen vs wegwerphandschoenen | Norvia',
      description: 'Vloeibare handschoen of nitril of latex handschoenen? Lees de eerlijke vergelijking met voordelen, nadelen en wanneer je wat het beste gebruikt.',
      keywords: ['vloeibare handschoen', 'gel handschoen', 'onzichtbare handschoen', 'alternatief wegwerphandschoenen', 'nitril of latex handschoenen', 'gel handschoen ervaringen'],
      excerpt: 'Een eerlijke vergelijking tussen de vloeibare handschoen en klassieke latex, nitril en vinyl wegwerphandschoenen, met voor- en nadelen en concrete gebruikssituaties.',
      readMinutes: 7,
      blocks: [
        { type: 'p', text: 'Wie met zijn handen werkt, kent de keuze maar al te goed. Pak je een doos wegwerphandschoenen, of zoek je een oplossing die minder afval geeft en je vingergevoel intact laat. De laatste jaren is er een derde optie bijgekomen: de vloeibare handschoen, ook wel gel handschoen of onzichtbare handschoen genoemd. Dat is geen fysieke handschoen, maar een transparante gel die je op schone, droge handen aanbrengt en die een onzichtbare beschermlaag vormt. In dit artikel vergelijken we deze onzichtbare handschoen eerlijk met klassieke latex, nitril en vinyl handschoenen, zodat je zelf een onderbouwde keuze kunt maken.' },
        { type: 'h2', text: 'Wat is een vloeibare handschoen precies?' },
        { type: 'p', text: 'Een vloeibare handschoen werkt anders dan je gewend bent. Je smeert een dunne laag gel uit over je handen en wrijft die goed in, tot in de huidplooien en rond de nagels. De gel droogt in ongeveer 2 minuten en vormt dan een beschermlaag die olie, vet, verf, vuil en veel chemicalien buiten houdt. Norvia Gel Glove biedt deze bescherming tot 4 uur. De laag is siliconenvrij en huidverzorgend, en je wast hem na het werk gewoon af met water. Het grote verschil met een fysieke handschoen: je voelt en grijpt alles nog volledig, omdat er geen materiaal tussen je vingers en je werk zit.' },
        { type: 'p', text: 'Belangrijk om vooraf helder te hebben: een vloeibare handschoen is een aanvulling op je handhygiene en huidbescherming. Het is geen vervanging van verplichte veiligheidshandschoenen bij gevaarlijke stoffen of op plekken waar normen en voorschriften fysieke bescherming eisen. Zie het dus als een extra laag voor dagelijks vuil werk, niet als beschermmiddel voor de zwaarste risicostoffen.' },
        { type: 'h2', text: 'Nitril of latex handschoenen: de sterke en zwakke punten' },
        { type: 'p', text: 'Klassieke wegwerphandschoenen bestaan er in grofweg drie soorten, en elk heeft een eigen profiel. Het helpt om die naast elkaar te zetten voordat je ze met de onzichtbare handschoen vergelijkt.' },
        { type: 'ul', items: ['Latex handschoenen zitten soepel en geven goed gevoel, maar een deel van de gebruikers en klanten heeft een latexallergie, wat ze in de horeca en zorg vaak ongeschikt maakt.', 'Nitril handschoenen zijn sterker, latexvrij en beter bestand tegen veel chemicalien en olie, waardoor ze populair zijn in werkplaatsen en de zorg, al liggen ze meestal wat hoger in prijs.', 'Vinyl handschoenen zijn het goedkoopst en allergievriendelijk, maar ze scheuren sneller en bieden minder bescherming tegen agressieve stoffen.', 'Alle drie de varianten zijn wegwerpproducten, dus elke wissel kost weer een nieuw paar en levert afval op.'] },
        { type: 'p', text: 'De grote kracht van fysieke handschoenen is dat ze een gecertificeerde, complete barriere vormen en bij veel toepassingen wettelijk vereist zijn. Het nadeel: ze verminderen je tastgevoel en grip, ze gaan zweten bij langer dragen, ze scheuren en moeten dan meteen vervangen worden, en bij fijn werk zoals schroefjes pakken of een kwast precies voeren zijn ze vaak onhandig.' },
        { type: 'h2', text: 'De vergelijking: wanneer kies je een alternatief voor wegwerphandschoenen?' },
        { type: 'p', text: 'De vloeibare handschoen scoort vooral op de punten waar fysieke handschoenen tekortschieten. Je houdt volledig gevoel en grip, je hoeft niet steeds een nieuw paar te pakken bij elke onderbreking, en je produceert geen berg latex- of nitrilafval. Voor schilders, monteurs, kappers en mensen in de bouw die de hele dag met vuil, verf en olie te maken hebben, kan dat een prettig alternatief voor wegwerphandschoenen zijn. Norvia Gel Glove kost 28,95 euro per stuk, en vanaf 12 stuks 26,95 euro per stuk, wat het voor teams en bedrijven interessant maakt.' },
        { type: 'p', text: 'Tegelijk is eerlijkheid hier belangrijk. Een gel laag biedt geen volledige, gecertificeerde barriere tegen de zwaarste chemicalien en beschermt niet tegen scherpe voorwerpen, hitte of mechanische risicos. Op plekken waar de wet of een veiligheidsnorm een specifieke handschoen voorschrijft, blijft die handschoen verplicht. De slimste aanpak is daarom vaak een combinatie: gebruik de onzichtbare handschoen voor dagelijks vuil werk waar gevoel telt, en grijp naar nitril, latex of vinyl wanneer de taak of de regelgeving dat vraagt.' },
        { type: 'p', text: 'Veel gel handschoen ervaringen draaien om comfort en gemak. Gebruikers noemen vaak dat hun handen aan het eind van de dag schoner en minder uitgedroogd zijn, en dat ze sneller doorwerken omdat ze niet telkens handschoenen aan en uit doen. Het went wel aan het idee dat je niets aan je handen ziet, terwijl de bescherming er toch is.' },
        { type: 'faq', items: [
          { q: 'Vervangt een vloeibare handschoen mijn veiligheidshandschoenen?', a: 'Nee. Een vloeibare handschoen is een aanvulling op handhygiene en huidbescherming. Bij gevaarlijke stoffen of waar normen het eisen, blijven gecertificeerde veiligheidshandschoenen verplicht.' },
          { q: 'Hoe lang beschermt Norvia Gel Glove?', a: 'De beschermlaag werkt tot 4 uur tegen olie, vet, verf, vuil en veel chemicalien. Daarna breng je opnieuw een laag aan.' },
          { q: 'Behoud ik mijn vingergevoel met een gel handschoen?', a: 'Ja, dat is juist het grote verschil met fysieke handschoenen. Er zit geen materiaal tussen je vingers en je werk, dus je gevoel en grip blijven volledig behouden.' },
          { q: 'Is de gel moeilijk te verwijderen?', a: 'Nee, de laag is gewoon afwasbaar met water. De gel is bovendien siliconenvrij en huidverzorgend.' },
        ] },
        { type: 'cta', text: 'Benieuwd of de onzichtbare handschoen past bij jouw werk? Bekijk de Norvia Gel Glove productpagina en ontdek de bescherming en de voordelen vanaf 12 stuks.' },
      ],
    },
    en: {
      title: 'Liquid glove or disposable gloves: the honest comparison',
      metaTitle: 'Liquid glove vs disposable gloves | Norvia',
      description: 'Liquid glove or nitrile or latex gloves? Read the honest comparison with pros, cons and clear guidance on when to use which option.',
      keywords: ['liquid glove', 'gel glove', 'invisible glove', 'alternative to disposable gloves', 'nitrile or latex gloves', 'gel glove experiences'],
      excerpt: 'An honest comparison between the liquid glove and classic latex, nitrile and vinyl disposable gloves, with pros, cons and concrete use cases.',
      readMinutes: 7,
      blocks: [
        { type: 'p', text: 'Anyone who works with their hands knows the choice all too well. Do you reach for a box of disposable gloves, or do you look for a solution that creates less waste and keeps your finger feel intact. In recent years a third option has appeared: the liquid glove, also called a gel glove or invisible glove. It is not a physical glove, but a transparent gel that you apply to clean, dry hands and that forms an invisible protective layer. In this article we compare this invisible glove honestly with classic latex, nitrile and vinyl gloves, so you can make a well founded choice yourself.' },
        { type: 'h2', text: 'What exactly is a liquid glove?' },
        { type: 'p', text: 'A liquid glove works differently from what you are used to. You spread a thin layer of gel over your hands and rub it in well, into the skin folds and around the nails. The gel dries in about 2 minutes and then forms a protective layer that keeps out oil, grease, paint, dirt and many chemicals. Norvia Gel Glove offers this protection for up to 4 hours. The layer is silicone free and skin caring, and after work you simply wash it off with water. The big difference with a physical glove: you still feel and grip everything fully, because there is no material between your fingers and your work.' },
        { type: 'p', text: 'It is important to be clear up front: a liquid glove is a complement to your hand hygiene and skin protection. It is not a replacement for mandatory safety gloves when handling hazardous substances or in places where standards and regulations require physical protection. So see it as an extra layer for daily dirty work, not as protective equipment for the heaviest risk substances.' },
        { type: 'h2', text: 'Nitrile or latex gloves: the strong and weak points' },
        { type: 'p', text: 'Classic disposable gloves come in roughly three types, and each has its own profile. It helps to line them up before comparing them with the invisible glove.' },
        { type: 'ul', items: ['Latex gloves are supple and give good feel, but a portion of users and customers have a latex allergy, which often makes them unsuitable in hospitality and healthcare.', 'Nitrile gloves are stronger, latex free and more resistant to many chemicals and oil, which makes them popular in workshops and healthcare, although they usually cost a bit more.', 'Vinyl gloves are the cheapest and allergy friendly, but they tear faster and offer less protection against aggressive substances.', 'All three variants are disposable products, so every change means a new pair and produces waste.'] },
        { type: 'p', text: 'The great strength of physical gloves is that they form a certified, complete barrier and are legally required for many applications. The downside: they reduce your sense of touch and grip, they make hands sweat during longer wear, they tear and then have to be replaced immediately, and for fine work such as picking up screws or guiding a brush precisely they are often awkward.' },
        { type: 'h2', text: 'The comparison: when do you choose an alternative to disposable gloves?' },
        { type: 'p', text: 'The liquid glove scores mainly on the points where physical gloves fall short. You keep full feel and grip, you do not have to grab a new pair at every interruption, and you produce no pile of latex or nitrile waste. For painters, mechanics, hairdressers and people in construction who deal with dirt, paint and oil all day, this can be a pleasant alternative to disposable gloves. Norvia Gel Glove costs 28.95 euro per unit, and from 12 units 26.95 euro per unit, which makes it interesting for teams and companies.' },
        { type: 'p', text: 'At the same time, honesty matters here. A gel layer does not offer a full, certified barrier against the heaviest chemicals and does not protect against sharp objects, heat or mechanical risks. In places where the law or a safety standard prescribes a specific glove, that glove remains mandatory. The smartest approach is therefore often a combination: use the invisible glove for daily dirty work where feel counts, and reach for nitrile, latex or vinyl when the task or the regulations call for it.' },
        { type: 'p', text: 'Many gel glove experiences revolve around comfort and convenience. Users often mention that their hands are cleaner and less dried out at the end of the day, and that they keep working faster because they are not constantly putting gloves on and off. It does take getting used to the idea that you see nothing on your hands, while the protection is there all the same.' },
        { type: 'faq', items: [
          { q: 'Does a liquid glove replace my safety gloves?', a: 'No. A liquid glove is a complement to hand hygiene and skin protection. For hazardous substances or where standards require it, certified safety gloves remain mandatory.' },
          { q: 'How long does Norvia Gel Glove protect?', a: 'The protective layer works for up to 4 hours against oil, grease, paint, dirt and many chemicals. After that you apply a new layer.' },
          { q: 'Do I keep my finger feel with a gel glove?', a: 'Yes, that is precisely the big difference with physical gloves. There is no material between your fingers and your work, so your feel and grip are fully preserved.' },
          { q: 'Is the gel hard to remove?', a: 'No, the layer simply washes off with water. The gel is also silicone free and skin caring.' },
        ] },
        { type: 'cta', text: 'Curious whether the invisible glove suits your work? Take a look at the Norvia Gel Glove product page and discover the protection and the benefits from 12 units.' },
      ],
    },
  },
  {
    slug: 'kappers-handen-beschermen-haarverf',
    date: '2026-06-16',
    image: '/images/beschermde-hand.png',
    tag: { nl: 'Kappers', en: 'Hairdressers' },
    nl: {
      title: 'Kappers handen beschermen tegen haarverf en wassen',
      metaTitle: 'Kappers handen beschermen | Norvia Gel Glove',
      description: 'Ontdek hoe kappers hun handen beschermen tegen haarverf, blondeermiddel en frequent wassen met een onzichtbare, huidverzorgende vloeibare handschoen.',
      keywords: ['kappers handen beschermen', 'haarverf van handen', 'handbescherming kapsalon', 'vloeibare handschoen', 'gevlekte handen kapper', 'droge handen kapper'],
      excerpt: 'Gevlekte en droge handen horen er voor veel kappers bij. Met de juiste handbescherming voorkom je vlekken van haarverf en houd je je huid in conditie.',
      readMinutes: 6,
      blocks: [
        { type: 'p', text: 'Werken in een kapsalon betekent de hele dag met je handen bezig zijn. Haarverf, blondeermiddel, water en reinigingsmiddelen passeren urenlang je vingers. Veel kappers herkennen het resultaat, gevlekte handen, een droge huid en soms ruwe nagelriemen. In dit artikel lees je hoe je als kapper je handen kunt beschermen zonder gevoel en grip te verliezen, en welke rol Norvia Gel Glove daarbij kan spelen.' },
        { type: 'h2', text: 'Waarom kappers hun handen extra moeten beschermen' },
        { type: 'p', text: 'De huid van een kapper krijgt veel te verduren. Haarverf bevat pigmenten die snel in de huid trekken en lastig loslaten. Blondeermiddel en frequent wassen tasten de natuurlijke vetlaag van de huid aan, waardoor droge handen bij de kapper eerder regel dan uitzondering zijn. Op de lange termijn kan dit leiden tot irritatie en een minder comfortabel gevoel tijdens het werk. Goede handbescherming in de kapsalon draait daarom om twee dingen, vlekken voorkomen en de huid in conditie houden.' },
        { type: 'ul', items: ['Pigmenten van haarverf die zich vastzetten rond nagels en nagelriemen', 'Uitdroging door blondeermiddel en veelvuldig handen wassen', 'Verlies van grip bij dunne wegwerphandschoenen tijdens precies werk', 'Minder fijngevoel bij het knippen en kleuren'] },
        { type: 'h2', text: 'Haarverf van handen krijgen, voorkomen werkt beter dan poetsen' },
        { type: 'p', text: 'Veel kappers schrobben na een kleurbehandeling stevig met zeep of aceton om haarverf van hun handen te krijgen. Dat werkt vaak maar half en is belastend voor de huid. Het is slimmer om de vlekken te voorkomen. Norvia Gel Glove is een transparante gel die je aanbrengt op schone, droge handen en die een onzichtbare beschermlaag vormt. Die laag beschermt tot 4 uur tegen vuil, verf en veel chemicalien, en helpt vlekken van haarverf makkelijker loslaten. Zo blijven gevlekte handen bij de kapper grotendeels uit, terwijl je gewoon doorwerkt.' },
        { type: 'h2', text: 'Handbescherming in de kapsalon zonder verlies van grip' },
        { type: 'p', text: 'Het grootste bezwaar tegen handschoenen bij precies werk is het verlies van gevoel. Een dunne laag gel lost dat op. Norvia Gel Glove behoudt volledig gevoel en grip, zodat je een schaar, kam of kwast net zo nauwkeurig hanteert als met blote handen. De gel is siliconenvrij en huidverzorgend, droogt in ongeveer 2 minuten en is daarna gewoon afwasbaar met water. Belangrijk om te weten, de gel is een aanvulling op handhygiene en huidverzorging, geen vervanging van verplichte handschoenen bij het werken met kleurmiddelen waar dat is voorgeschreven.' },
        { type: 'h2', text: 'Zo gebruik je Norvia Gel Glove in de praktijk' },
        { type: 'p', text: 'Het gebruik is eenvoudig en past in de drukke routine van een salon. Met een paar handelingen ben je klaar om aan de slag te gaan.' },
        { type: 'ul', items: ['Was en droog je handen goed voordat je de gel aanbrengt', 'Breng een dunne laag aan over handen en vingers, ook rond de nagels', 'Laat de gel ongeveer 2 minuten drogen tot een onzichtbare laag', 'Werk tot 4 uur door en spoel de laag daarna af met water'] },
        { type: 'p', text: 'Voor wie de hele dag kleurt, kan het lonen om de laag tussendoor te vernieuwen, bijvoorbeeld na een lunchpauze of nadat je je handen hebt gewassen. Zo houd je de bescherming op peil tijdens een volle dag met klanten.' },
        { type: 'h2', text: 'Droge handen bij de kapper voorkomen' },
        { type: 'p', text: 'Droge handen bij de kapper ontstaan vooral door de combinatie van chemische middelen en frequent wassen. Doordat Norvia Gel Glove huidverzorgend en siliconenvrij is, vormt de laag een buffer tussen je huid en de producten waar je dagelijks mee werkt. Je huid komt minder direct in contact met uitdrogende stoffen, wat helpt om je handen soepeler te houden gedurende een lange werkdag. Voor een kapper die week in week uit kleurt en wast, is dat een praktisch verschil. Per stuk kost de gel 28,95 euro, en vanaf 12 stuks betaal je 26,95 euro per stuk, handig voor een salon die meerdere stylisten van bescherming wil voorzien.' },
        { type: 'faq', items: [
          { q: 'Vervangt Norvia Gel Glove mijn wegwerphandschoenen bij het kleuren?', a: 'Nee. De gel is een aanvulling op handhygiene en huidverzorging. Waar handschoenen bij het werken met kleurmiddelen zijn voorgeschreven, blijf je die gewoon gebruiken.' },
          { q: 'Hoe lang beschermt een laag gel?', a: 'Een aangebrachte laag beschermt tot 4 uur tegen vuil, verf en veel chemicalien. Daarna spoel je de laag af met water en breng je indien nodig een nieuwe laag aan.' },
          { q: 'Verlies ik gevoel in mijn vingers tijdens het knippen?', a: 'Nee. Norvia Gel Glove behoudt volledig gevoel en grip, zodat precies werk zoals knippen en kleuren gewoon nauwkeurig blijft.' },
          { q: 'Helpt het echt tegen gevlekte handen van haarverf?', a: 'De beschermlaag helpt vlekken van haarverf makkelijker loslaten, waardoor verkleuring van de huid grotendeels uitblijft en je je handen minder hoeft te schrobben.' },
        ] },
        { type: 'cta', text: 'Klaar om je handen in de salon beter te beschermen? Bekijk Norvia Gel Glove op de productpagina, vanaf 28,95 euro per stuk en 26,95 euro per stuk vanaf 12 stuks.' },
      ],
    },
    en: {
      title: 'Protect hairdresser hands against hair dye and washing',
      metaTitle: 'Protect hairdresser hands | Norvia Gel Glove',
      description: 'Discover how hairdressers protect their hands against hair dye, bleach and frequent washing with an invisible, skin caring liquid glove.',
      keywords: ['protect hairdresser hands', 'hair dye off hands', 'hand protection salon', 'liquid glove', 'stained hands hairdresser', 'dry hands hairdresser'],
      excerpt: 'Stained and dry hands feel inevitable for many hairdressers. With the right hand protection you prevent hair dye stains and keep your skin in good condition.',
      readMinutes: 6,
      blocks: [
        { type: 'p', text: 'Working in a salon means using your hands all day long. Hair dye, bleach, water and cleaning products pass over your fingers for hours. Many hairdressers recognise the result, stained hands, dry skin and sometimes rough cuticles. In this article you will read how, as a hairdresser, you can protect your hands without losing feeling and grip, and what role Norvia Gel Glove can play in that.' },
        { type: 'h2', text: 'Why hairdressers need extra hand protection' },
        { type: 'p', text: 'A hairdresser skin takes a lot of punishment. Hair dye contains pigments that quickly sink into the skin and are hard to remove. Bleach and frequent washing strip the natural oil layer of the skin, which makes dry hands for hairdressers more the rule than the exception. Over time this can lead to irritation and a less comfortable feeling during work. Good hand protection in the salon therefore comes down to two things, preventing stains and keeping the skin in condition.' },
        { type: 'ul', items: ['Hair dye pigments that settle around nails and cuticles', 'Dryness caused by bleach and repeated hand washing', 'Loss of grip with thin disposable gloves during precise work', 'Reduced fine feeling while cutting and colouring'] },
        { type: 'h2', text: 'Getting hair dye off hands, prevention beats scrubbing' },
        { type: 'p', text: 'Many hairdressers scrub hard with soap or acetone after a colour treatment to get hair dye off their hands. That often only half works and is tough on the skin. It is smarter to prevent the stains. Norvia Gel Glove is a transparent gel that you apply to clean, dry hands and that forms an invisible protective layer. This layer protects for up to 4 hours against dirt, paint and many chemicals, and helps hair dye stains release more easily. That way stained hands for the hairdresser largely stay away, while you simply keep working.' },
        { type: 'h2', text: 'Hand protection in the salon without losing grip' },
        { type: 'p', text: 'The biggest objection to gloves during precise work is the loss of feeling. A thin layer of gel solves that. Norvia Gel Glove fully keeps feeling and grip, so you handle scissors, a comb or a brush just as accurately as with bare hands. The gel is silicone free and skin caring, dries in about 2 minutes and is then simply washable with water. Important to know, the gel is an addition to hand hygiene and skin care, not a replacement for mandatory gloves when working with colour products where those are required.' },
        { type: 'h2', text: 'How to use Norvia Gel Glove in practice' },
        { type: 'p', text: 'Using it is simple and fits into the busy routine of a salon. A few steps are enough to get ready for the next client.' },
        { type: 'ul', items: ['Wash and dry your hands well before applying the gel', 'Apply a thin layer over hands and fingers, including around the nails', 'Let the gel dry for about 2 minutes into an invisible layer', 'Keep working for up to 4 hours, then rinse the layer off with water'] },
        { type: 'p', text: 'For anyone colouring all day, it can pay off to renew the layer in between, for example after a lunch break or after washing your hands. That keeps the protection at its best throughout a full day of appointments.' },
        { type: 'h2', text: 'Preventing dry hands for hairdressers' },
        { type: 'p', text: 'Dry hands for hairdressers mainly come from the combination of chemical products and frequent washing. Because Norvia Gel Glove is skin caring and silicone free, the layer forms a buffer between your skin and the products you work with every day. Your skin comes into less direct contact with drying substances, which helps keep your hands supple throughout a long working day. For a hairdresser who colours and washes week after week, that is a practical difference. Per unit the gel costs 28.95 euro, and from 12 units you pay 26.95 euro per unit, handy for a salon that wants to provide several stylists with protection.' },
        { type: 'faq', items: [
          { q: 'Does Norvia Gel Glove replace my disposable gloves when colouring?', a: 'No. The gel is an addition to hand hygiene and skin care. Where gloves are required when working with colour products, you keep using them.' },
          { q: 'How long does one layer of gel protect?', a: 'An applied layer protects for up to 4 hours against dirt, paint and many chemicals. After that you rinse the layer off with water and apply a new layer if needed.' },
          { q: 'Will I lose feeling in my fingers while cutting?', a: 'No. Norvia Gel Glove fully keeps feeling and grip, so precise work such as cutting and colouring stays accurate.' },
          { q: 'Does it really help against stained hands from hair dye?', a: 'The protective layer helps hair dye stains release more easily, so skin discolouration largely stays away and you need to scrub your hands less.' },
        ] },
        { type: 'cta', text: 'Ready to better protect your hands in the salon? Check out Norvia Gel Glove on the product page, from 28.95 euro per unit and 26.95 euro per unit from 12 units.' },
      ],
    },
  },
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | null {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function getPostContent(post: BlogPost, locale: string): BlogLocaleContent {
  return locale === 'en' ? post.en : post.nl;
}
