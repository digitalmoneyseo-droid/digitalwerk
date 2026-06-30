const defaultProcess = ["Prüfen", "Ordnen", "Bauen", "Verbessern"] as const;

const defaultFaq = [
  {
    question: "Wann ist dieser Bereich der richtige Startpunkt?",
    answer:
      "Wenn hier der größte Engpass zwischen Sichtbarkeit, Vertrauen und Anfrage liegt. Genau das klären wir im Erstgespräch.",
  },
  {
    question: "Verbindet Digitalwerk Planung und Umsetzung?",
    answer:
      "Ja. Am Ende steht kein lose formuliertes Konzept, sondern ein umsetzbarer Plan mit Prioritäten, Verantwortlichkeiten und sauberer Umsetzung.",
  },
] as const;

export const siteContent = {
  brand: {
    name: "Digitalwerk",
    descriptor: "Webdesign, SEO & Ads",
    shortDescriptor: "Websites, SEO und Ads",
    location: "Deutschland",
    addressLine: "Remote deutschlandweit - Vor-Ort-Termine nach Absprache",
    email: "kontakt@digitalwerk.de",
    responseTime: "Antwort innerhalb von 1-2 Werktagen",
  },
  meta: {
    defaultDescription:
      "Digitalwerk plant, schreibt und baut Websites, SEO-Strukturen und Kampagnen für Unternehmen in Deutschland, die online professioneller wirken und mehr passende Anfragen gewinnen wollen.",
  },
  navigation: {
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    servicesLabel: "Leistungen",
    workLabel: "Arbeiten",
    ctaLabel: "Kostenloses Erstgespräch",
  },
  globalCta: {
    eyebrow: "Nächster Schritt",
    title: "Lass uns kurz prüfen, was deine Website besser machen kann.",
    lead:
      "Schick uns deine Website oder beschreibe dein Projekt. Du bekommst eine klare Einschätzung, ob Website, SEO, Ads oder Automatisierung der richtige nächste Schritt ist.",
    primaryLabel: "Kostenloses Erstgespräch anfragen",
    secondaryLabel: "Preise ansehen",
  },
  pricingCards: [
    {
      name: "Website Start",
      lead: "Für einen professionellen Auftritt, der schnell sauber online gehen soll.",
      price: "ab 1.900 €",
      features: [
        "Startseite oder kompakte Website-Struktur",
        "Mobile-first Design für Smartphone, Tablet und Desktop",
        "UX-Texte für Angebot, Vorteile und Kontaktweg",
        "Kontaktformular, technische Basis und Launch-Check",
        "SEO-Grundlagen: Meta-Texte, Struktur, Indexierung",
      ],
      featured: false,
    },
    {
      name: "Relaunch & Wachstum",
      lead: "Für Unternehmen, die Website, SEO und Anfrageführung spürbar verbessern wollen.",
      price: "ab 4.800 €",
      features: [
        "Alles aus Website Start",
        "Individuelles Designsystem und Seitenstruktur",
        "Leistungsseiten für SEO und bessere Orientierung",
        "Conversion-Abschnitte: Beweise, Einwände, Kontaktwege",
        "Tracking-Grundlage für Formulare, Klicks und Kampagnen",
        "Launch-Plan mit Prioritäten nach Veröffentlichung",
      ],
      featured: true,
    },
    {
      name: "Betreuung",
      lead: "Für laufende Optimierung von Website, SEO, Content oder Kampagnen.",
      price: "ab 950 € / Monat",
      features: [
        "Monatliche Prioritäten statt blindem Retainer",
        "SEO-, Content- oder Ads-Optimierung",
        "Landingpage-Tests und Textverbesserungen",
        "Reporting mit verständlichen Empfehlungen",
        "Regelmäßige technische und mobile Checks",
      ],
      featured: false,
    },
  ],
  home: {
    one: {
      routeLabel: "Startseite",
      conceptName: "Homepage",
      heroBadge: "Websites, SEO & Ads für deutsche Unternehmen",
      title: "Websites, die besser aussehen, schneller überzeugen und mehr Anfragen bringen.",
      highlight: "mehr Anfragen bringen",
      lead:
        "Wir planen, schreiben und bauen Websites für Dienstleister, Praxen, Kanzleien, Handwerksbetriebe und B2B-Unternehmen - mit sauberer Technik, klarer Sprache und Kontaktwegen, die Besucher wirklich nutzen.",
      primaryCta: "Kostenloses Erstgespräch anfragen",
      secondaryCta: "Leistungen ansehen",
      audienceLine:
        "Für lokale Anbieter, Dienstleister, Praxen, Kanzleien, Handwerk und B2B.",
      heroProof: [
        "Struktur, Texte, Design und Technik aus einer Hand",
        "Mobile-first Layouts für echte Nutzerwege",
        "Klare Empfehlung statt pauschalem Agenturpaket",
      ],
      heroMetricCard: {
        eyebrow: "Website-Check",
        title: "Was Besucher sofort verstehen müssen",
        items: [
          ["01", "Was bietest du an?"],
          ["02", "Warum sollten Kunden dir vertrauen?"],
          ["03", "Was ist der nächste einfache Schritt?"],
        ],
        result: "Ziel: weniger Reibung, mehr qualifizierte Anfragen",
      },
      trustEyebrow: "Worauf wir optimieren",
      trustTitle: "Dein Auftritt muss nicht lauter sein. Er muss schneller verstanden werden.",
      trustItems: [
        {
          title: "Klarer erster Eindruck",
          text: "Besucher erkennen Angebot, Nutzen und Kontaktweg ohne Suchen.",
        },
        {
          title: "Saubere mobile Nutzung",
          text: "Abschnitte, Buttons und Formulare funktionieren zuerst auf dem Smartphone.",
        },
        {
          title: "Mehr Vertrauen vor dem Kontakt",
          text: "Texte, Leistungen und Belege nehmen Unsicherheit aus der Anfrage.",
        },
      ],
      serviceRunwayTitle: "Was wir für dich umsetzen",
      serviceRunwayLead:
        "Website, Suche, Kampagnen und Automatisierung werden gemeinsam geplant, damit der Weg bis zur Anfrage zusammenpasst.",
      services: [
        {
          title: "Webdesign",
          href: "/leistungen/webdesign",
          text: "Schnelle Websites und Landingpages, die Angebot, Nutzen, Belege und Kontaktweg auf den Punkt bringen.",
        },
        {
          title: "SEO",
          href: "/leistungen/local-seo",
          text: "Leistungsseiten, lokale Signale, Technik und Inhalte für Suchanfragen, die zu deinem Angebot passen.",
        },
        {
          title: "Paid Ads",
          href: "/leistungen/paid-ads",
          text: "Google- und Social-Kampagnen mit passender Landingpage, Messung und Budgetsteuerung.",
        },
        {
          title: "KI & Automation",
          href: "/leistungen/ki-automatisierung",
          text: "Chatbots, Workflows und Inhalte, die wiederkehrende Fragen und Abläufe nachvollziehbar vereinfachen.",
        },
      ],
      serviceFlow: [
        {
          label: "Angebot",
          title: "Erst verstehen, was du verkaufst",
          text: "Wir klären Zielgruppe, Leistung, Einwände und die Entscheidung vor dem Kontakt.",
        },
        {
          label: "Seite",
          title: "Dann den Weg zur Anfrage bauen",
          text: "Struktur, Texte, Design und Formulare führen Besucher ohne Umwege weiter.",
        },
        {
          label: "Traffic",
          title: "Danach passende Nutzer holen",
          text: "SEO und Kampagnen zahlen auf Seiten ein, die schon auf Kontakt ausgelegt sind.",
        },
      ],
      projectTypesTitle: "Arbeiten ohne erfundene Fallstudien",
      projectTypesLead:
        "Solange keine freigegebenen Kundencases vorliegen, zeigen wir anonymisierte Projektmuster. Keine Fantasie-Logos, keine künstlichen Umsatzversprechen.",
      projectTypes: [
        {
          title: "Website-Relaunch",
          tag: "Anonymisiertes Projektmuster",
          image: "/images/website-ux-wireframe-notebook.jpg",
          alt: "Website-Wireframes und Smartphone auf einem Holztisch",
          text: "Relaunch-Konzept mit klarer Startseite, Leistungsseiten, Kontaktwegen und lokaler SEO-Struktur.",
          points: ["Angebot schneller erfassbar", "Mobile Kontaktwege priorisiert", "SEO-Seiten nach Suchintention"],
        },
        {
          title: "SEO- und Reporting-Struktur",
          tag: "Anonymisiertes Projektmuster",
          image: "/images/performance-reporting-growth-tablet.jpg",
          alt: "Tablet mit farbigen Wachstumsdiagrammen für Performance-Reporting",
          text: "Struktur für Leistungsseiten, lokale Suche, Messpunkte und regelmäßige Auswertung.",
          points: ["Suchintention sortiert", "Messpunkte vorbereitet", "Entwicklung klarer sichtbar"],
        },
        {
          title: "Kampagnen- und Landingpage-Setup",
          tag: "Anonymisiertes Projektmuster",
          image: "/images/marketing-strategy-team-table.jpg",
          alt: "Marketingteam prüft Ad-Spend-Berichte und Kampagnendaten an einem Tisch",
          text: "Kampagnenstruktur mit passender Landingpage, Budgetlogik, Tracking und klarer Anfrageführung.",
          points: ["Budget sauberer geführt", "Landingpage auf Anzeigen abgestimmt", "Auswertung von Anfang an mitgedacht"],
        },
      ],
      includedTitle: "Was bei einem guten Webprojekt nicht fehlen darf",
      includedLead:
        "Nicht jede Website braucht den gleichen Umfang. Diese Grundlagen prüfen wir aber immer, weil sie über Wirkung und Nutzbarkeit entscheiden.",
      includedItems: [
        {
          title: "Angebotsstruktur",
          text: "Leistungen, Zielgruppen, Vorteile und Einwände werden so sortiert, dass Besucher nicht raten müssen.",
        },
        {
          title: "UX-Texte",
          text: "Wir schreiben nicht nur Überschriften, sondern die Entscheidungshilfe zwischen erstem Eindruck und Anfrage.",
        },
        {
          title: "Mobile Details",
          text: "Navigation, Buttons, Formulare, Abstände und Lesbarkeit werden für Smartphone-Nutzung priorisiert.",
        },
        {
          title: "SEO-Basis",
          text: "Meta-Texte, Seitenstruktur, interne Verlinkung, Indexierung und Ladezeit gehören zum Launch-Check.",
        },
        {
          title: "Kontaktwege",
          text: "Formular, E-Mail, nächste Schritte und Antwortzeit sind sichtbar, damit der Kontakt leicht fällt.",
        },
        {
          title: "Messpunkte",
          text: "Wichtige Klicks und Formulare werden so vorbereitet, dass spätere Optimierung möglich wird.",
        },
      ],
      whyTitle: "Warum Digitalwerk",
      whyLead:
        "Du bekommst keine lose Sammlung aus Design, SEO und Anzeigen. Wir bauen zuerst die Entscheidungssituation und danach die passenden Kanäle.",
      whyItems: [
        {
          title: "Weniger Agentur-Gerede",
          text: "Wir sagen konkret, was fehlt, was zuerst kommt und was aktuell keinen Sinn ergibt.",
        },
        {
          title: "Mehr Substanz im ersten Fold",
          text: "Angebot, Beweise, Nutzen und Kontaktweg stehen dort, wo Besucher sie brauchen.",
        },
        {
          title: "Ein System statt Einzelteile",
          text: "Website, SEO und Kampagnen greifen ineinander, statt nebeneinander herzulaufen.",
        },
      ],
      reviewTitle: "Echte Belege statt erfundener Stimmen",
      reviewLead:
        "Öffentliche Kundenstimmen und Logos ergänzen wir erst, wenn sie freigegeben sind. Bis dahin bleibt die Seite ehrlich und zeigt, welche Nachweise sinnvoll wären.",
      reviewItems: [
        "Freigegebene Kundenlogos oder Branchen",
        "Vorher-nachher Screenshots aus echten Projekten",
        "Bewertungen aus Google, LinkedIn oder direkter Kundenfreigabe",
      ],
      processTitle: "Ein klarer Plan bis zum Launch",
      processLead:
        "Der Ablauf ist bewusst schlank: erst verstehen, dann ordnen, dann bauen, dann verbessern.",
      process: [
        {
          title: "Website prüfen",
          text: "Wir schauen auf Angebot, Zielgruppe, aktuelle Seite, Kontaktwege und größten Engpass.",
        },
        {
          title: "Einstieg empfehlen",
          text: "Du bekommst eine konkrete Empfehlung: Projekt, Sprint oder laufende Betreuung.",
        },
        {
          title: "Umsetzung führen",
          text: "Struktur, Texte, Design, Technik und Launch werden in überschaubaren Schritten umgesetzt.",
        },
        {
          title: "Nach Launch verbessern",
          text: "Wir prüfen Daten, mobile Nutzung, Suchstruktur und Anfragen und priorisieren die nächsten Verbesserungen.",
        },
      ],
      faqTitle: "Fragen vor dem Erstgespräch",
      faq: [
        {
          question: "Muss ich schon genau wissen, ob ich Website, SEO oder Ads brauche?",
          answer:
            "Nein. Es reicht, wenn du beschreibst, was sich verbessern soll. Wir ordnen ein, welcher Schritt am meisten Wirkung verspricht.",
        },
        {
          question: "Könnt ihr auch nur eine bestehende Website verbessern?",
          answer:
            "Ja. Wenn ein kompletter Relaunch nicht nötig ist, starten wir mit Struktur, Texten, Kontaktwegen, SEO-Grundlagen oder Landingpages.",
        },
        {
          question: "Gibt es echte Referenzen?",
          answer:
            "Öffentliche Referenzen werden nur ergänzt, wenn Kunden sie freigeben. Bis dahin verwenden wir keine erfundenen Reviews oder Logos.",
        },
        {
          question: "Was kostet ein Projekt?",
          answer:
            "Als Orientierung starten kompakte Websites ab 1.900 €, Relaunch-Projekte ab 4.800 € und laufende Betreuung ab 950 € pro Monat.",
        },
      ],
      finalCtaTitle: "Lass uns deine Website kurz prüfen.",
      finalCtaLead:
        "Schick uns deine aktuelle Seite oder beschreibe dein Projekt. Wir melden uns mit einer klaren Einschätzung und einem sinnvollen nächsten Schritt.",
    },
  },
  subpages: [
    {
      href: "/leistungen/webdesign",
      title: "Websites, die nicht nur gut aussehen, sondern Anfragen bringen",
      category: "Webdesign",
      intro:
        "Wir bauen schnelle, mobile Websites und Landingpages, die dein Angebot erklären, Vertrauen aufbauen und den Kontakt leicht machen - ohne Baukasten-Gefühl und ohne unnötige Spielereien.",
      bullets: [
        "Mobile-first Design und klare Seitenstruktur",
        "UX-Texte für Angebot, Vorteile, Beweise und Kontakt",
        "SEO-Grundlagen, Performance, Formular und Launch-Check",
      ],
    },
    {
      href: "/leistungen/local-seo",
      title: "SEO, damit Kunden dich finden, bevor sie vergleichen",
      category: "SEO",
      intro:
        "Wir strukturieren Seiten, Inhalte und lokale Signale so, dass dein Unternehmen bei relevanten Suchanfragen sichtbarer wird - und Besucher danach auch verstehen, warum sie dich kontaktieren sollten.",
      bullets: [
        "Keyword- und Wettbewerbsanalyse für echte Suchintentionen",
        "Leistungsseiten, Standortbezug und interne Verlinkung",
        "Google-Business-Grundlagen, Technik und verständliche Inhalte",
      ],
    },
    {
      href: "/leistungen/paid-ads",
      title: "Paid Ads mit Landingpages, die zum Klick passen",
      category: "Paid Ads",
      intro:
        "Kampagnen funktionieren besser, wenn Anzeige, Zielgruppe, Landingpage und Tracking zusammenpassen. Wir bauen nicht nur Anzeigen, sondern den Weg bis zur Anfrage.",
      bullets: [
        "Kampagnenstruktur für Google, Meta oder passende Kanäle",
        "Landingpage-Abgleich mit Angebot, Suchintention und Einwänden",
        "Conversion-Tracking, Tests und Budgetsteuerung",
      ],
    },
    {
      href: "/leistungen/ki-automatisierung",
      title: "KI und Automatisierung, die echte Arbeit spart",
      category: "KI & Automation",
      intro:
        "Wir helfen dir, wiederkehrende Fragen, interne Abläufe und digitale Inhalte sinnvoll zu automatisieren - praktisch, nachvollziehbar und ohne KI-Hype.",
      bullets: [
        "Chatbots für Website, Beratung oder Support",
        "Workflows für wiederkehrende Aufgaben und interne Prozesse",
        "Inhalte und FAQs, die auch in KI-gestützter Suche verständlich sind",
      ],
    },
    {
      href: "/preise",
      title: "Preise und Einstiegspakete",
      category: "Preise",
      intro:
        "Du bekommst transparente Richtwerte für Website-Projekte, Relaunches und laufende Betreuung. Nach dem Erstgespräch ist klar, welcher Umfang wirklich sinnvoll ist.",
      bullets: [
        "Richtwerte für Projekt und Betreuung",
        "Klare Trennung von Leistung, Tools, Hosting und Media-Budget",
        "Empfehlung für Projekt, Sprint oder laufende Optimierung",
      ],
    },
    {
      href: "/kontakt",
      title: "Lass uns deine Website kurz prüfen",
      category: "Kontakt",
      intro:
        "Schick uns deine Website oder beschreibe dein Projekt. Wir melden uns mit einer klaren Einschätzung, was als nächstes am meisten Sinn ergibt.",
      bullets: [
        "Website oder Projekt kurz beschreiben",
        "Ziel, Problem oder geplante Leistung nennen",
        "Konkrete Empfehlung als nächster Schritt",
      ],
    },
    {
      href: "/agentur",
      title: "Webdesign, SEO und Kampagnen aus einer Hand",
      category: "Agentur",
      intro:
        "Digitalwerk arbeitet für Unternehmen, die online professioneller wirken, besser gefunden werden und mehr passende Anfragen gewinnen wollen - mit klarer Umsetzung statt Agentur-Gerede.",
      bullets: [
        "Website, SEO und Ads gemeinsam gedacht",
        "Klare Empfehlungen ohne Agentur-Gerede",
        "Ein sauberer Plan von Struktur bis Launch",
      ],
    },
  ],
  subpageTemplate: {
    backLabel: "Zur Startseite",
    overviewLabel: "Worum es auf dieser Seite geht",
    detailTitle: "Was wir für dich umsetzen",
    priceTitle: "Passender Einstieg",
    priceText:
      "Nach dem Gespräch bekommst du eine konkrete Empfehlung: Projekt, Sprint oder laufende Betreuung.",
    ctaLabel: "Kostenloses Erstgespräch anfragen",
    notFoundTitle: "Seite nicht gefunden",
    notFoundIntro: "Diese Route existiert nicht in der aktuellen Inhaltsstruktur.",
  },
  pageDetailLabels: {
    problems: "Typische Probleme",
    includes: "Was wir übernehmen",
    process: "So läuft die Arbeit ab",
    outcomes: "Was sich danach verbessert",
    faq: "Häufige Fragen",
  },
  pageDetails: {
    "/leistungen/webdesign": detail(
      "Webdesign, das nicht nur gut aussieht, sondern Anfragen vorbereitet",
      "Viele Websites sehen ordentlich aus, erklären aber Angebot, Nutzen und Kontaktweg zu spät. Wir strukturieren Inhalte, Design und Formulare so, dass Besucher schneller entscheiden können.",
      [
        "Besucher verstehen Angebot und nächsten Schritt nicht schnell genug.",
        "Die Website sieht ordentlich aus, bringt aber zu wenige passende Anfragen.",
        "Mobile Darstellung, Ladezeit, Tracking oder SEO-Grundlagen bremsen Wachstum.",
      ],
      [
        "Klare Seitenstruktur, UX-Texte und Conversion-Flows.",
        "Responsive UI für Smartphone, Tablet und Desktop.",
        "SEO-Grundlagen, Performance, Tracking und Launch-Check.",
      ],
      ["Klarere Website-Struktur", "Mehr Vertrauen in wenigen Sekunden", "Bessere Grundlage für SEO und Ads"],
      ["Website prüfen", "Seitenstruktur planen", "Design und Texte bauen", "Launch vorbereiten"],
    ),
    "/leistungen/local-seo": detail(
      "SEO, die Suchintention und Anfrage zusammendenkt",
      "SEO macht dein Angebot dort sichtbar, wo Menschen bereits nach einer Lösung suchen. Dafür müssen Leistungsseiten, lokale Signale, Technik und Kontaktwege zusammenpassen.",
      [
        "Die Website hat Seiten, aber keine klare Suchstruktur.",
        "Das Google Business Profile ist unvollständig oder nicht auf Leistungen ausgerichtet.",
        "Inhalte beantworten die Fragen der Zielgruppe nicht deutlich genug.",
      ],
      [
        "Keyword- und Wettbewerbsanalyse für relevante Leistungen.",
        "Empfehlung für Seitenstruktur, interne Verlinkung und lokale Signale.",
        "Optimierung von Inhalten, Profilen, Technik und Anfragewegen.",
      ],
      ["Mehr qualifizierte Sichtbarkeit", "Mehr Vertrauen vor dem Erstkontakt", "Bessere Grundlage für Website und Kampagnen"],
      ["Suchintention klären", "Struktur planen", "Inhalte optimieren", "Signale ausbauen"],
    ),
    "/leistungen/paid-ads": detail(
      "Paid Ads brauchen eine passende Zielseite",
      "Paid Ads können schnell Nachfrage erzeugen. Stabil wird der Kanal, wenn Zielgruppe, Anzeige, Landingpage, Tracking und Budgetsteuerung gemeinsam geplant werden.",
      [
        "Budget läuft auf zu breite Zielgruppen oder schwache Suchbegriffe.",
        "Landingpages passen nicht zum Anzeigenversprechen.",
        "Conversions werden falsch oder unvollständig gemessen.",
      ],
      [
        "Kampagnenstruktur für Google, Meta oder passende Kanäle.",
        "Abgleich von Anzeige, Angebot, Suchintention und Landingpage.",
        "Conversion-Tracking, Tests und Budgetsteuerung.",
      ],
      ["Mehr Anfragen pro Budget", "Weniger Streuverlust", "Klarere Entscheidungen für Skalierung"],
      ["Kanal wählen", "Landingpage prüfen", "Kampagne bauen", "Budget steuern"],
    ),
    "/leistungen/ki-automatisierung": detail(
      "KI, die konkrete Arbeit leichter macht",
      "KI lohnt sich nicht als Spielerei, sondern wenn sie Informationen auffindbarer macht, Routinefragen beantwortet oder interne Abläufe beschleunigt.",
      [
        "Anfragen wiederholen sich, werden aber manuell beantwortet.",
        "Expertise ist vorhanden, aber nicht klar auffindbar oder zitierbar.",
        "Automatisierungen entstehen ohne sauberen Prozess und verursachen neue Reibung.",
      ],
      [
        "Chatbots für Website, Support oder Beratung.",
        "Automatisierte Workflows für wiederkehrende Aufgaben.",
        "Inhalte und FAQs, die auch in KI-gestützter Suche verständlich sind.",
      ],
      ["Weniger manuelle Routinearbeit", "Klarere digitale Expertise", "Bessere Vorbereitung auf KI-gestützte Suche"],
      ["Ablauf prüfen", "Use Case auswählen", "Workflow bauen", "Grenzen dokumentieren"],
    ),
    "/preise": detail(
      "Preise brauchen Kontext",
      "Preisorientierung hilft nur, wenn Umfang, Ziel und Verantwortlichkeiten klar sind. Deshalb zeigen wir Richtwerte und klären im Erstgespräch, welcher Rahmen zum echten Problem passt.",
      [
        "Angebote werden verglichen, obwohl Umfang und Erfolgsmessung unterschiedlich sind.",
        "Retainer starten ohne klare Prioritäten.",
        "Projektbudgets vermischen Strategie, Umsetzung, Technik und Media-Budget.",
      ],
      [
        "Kostenloses Erstgespräch als Entscheidungshilfe.",
        "Empfehlung für Projekt, Sprint oder laufende Betreuung.",
        "Klare Trennung zwischen Leistung, Media-Budget, Tools und Betreuung.",
      ],
      ["Bessere Budgetentscheidung", "Kein Retainer ohne Priorität", "Ein Angebot, das zum echten Problem passt"],
    ),
    "/kontakt": detail(
      "So startet die Zusammenarbeit",
      "Ziel ist kein pauschales Verkaufsgespräch. Digitalwerk versteht Angebot, Zielgruppe, aktuelle Kanäle und größten Engpass und empfiehlt danach den passenden nächsten Schritt.",
      [
        "Du bist unsicher, ob Website, SEO, Kampagnen oder Automatisierung zuerst kommt.",
        "Es gibt Marketingaktivität, aber keine klare Priorität.",
        "Website oder Kampagnen fühlen sich nicht mehr passend an.",
      ],
      [
        "Einordnung von Website, Sichtbarkeit, Kampagnen, Angebot und Zielmarkt.",
        "Empfehlung für den ersten sinnvollen Schritt statt pauschalem Paketverkauf.",
        "Klare nächste Schritte: Projekt, Betreuung, Sprint oder ehrliche Absage.",
      ],
      ["Klarheit über den Startpunkt", "Konkrete Empfehlung", "Weniger Risiko vor Budgetentscheidung"],
    ),
    "/agentur": detail(
      "Wofür Digitalwerk steht",
      "Digitalwerk arbeitet für Unternehmen, die Website, Sichtbarkeit und Kampagnen nicht als getrennte Baustellen behandeln wollen. Erst wird geklärt, was Kunden verstehen müssen, danach wird umgesetzt.",
      [
        "Website, Suche und Kampagnen werden getrennt beauftragt.",
        "Es gibt Aktivität, aber keine gemeinsame Priorität.",
        "Marketingentscheidungen hängen an Meinungen statt an einer klaren Einschätzung.",
      ],
      [
        "Einordnung von Website, Sichtbarkeit und Kampagnen.",
        "Priorisierte Empfehlung mit klaren Verantwortlichkeiten.",
        "Umsetzung in fokussierten Schritten mit verständlicher Auswertung.",
      ],
      ["Bessere Marketingentscheidungen", "Weniger Kanal-Silos", "Ein professionellerer digitaler Auftritt"],
    ),
  },
} as const;

function detail(
  whyTitle: string,
  whyText: string,
  problems: readonly string[],
  includes: readonly string[],
  outcomes: readonly string[],
  process: readonly string[] = defaultProcess,
  faq = defaultFaq,
) {
  return {
    whyTitle,
    whyText,
    problems,
    includes,
    process,
    outcomes,
    ctaLabel: "Kostenloses Erstgespräch anfragen",
    faq,
  };
}

export type SiteContent = typeof siteContent;
export type HomeKey = keyof typeof siteContent.home;
export type Subpage = (typeof siteContent.subpages)[number];
