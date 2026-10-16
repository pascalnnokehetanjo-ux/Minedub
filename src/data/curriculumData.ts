/**
 * Official Cameroon Primary School Curriculum (MINEDUB 2018)
 * Comprehensive Data Repository for Anglophone & Francophone Subsystems
 */

import { Subject, SubjectAllocation, MonthlyUnit, SubsystemType, LevelType, ClassType } from '../types/curriculum';

// ==========================================
// 1. STATUTORY TIME ALLOCATIONS (MINEDUB 2018)
// ==========================================

export const ANGLOPHONE_TIME_ALLOCATIONS: SubjectAllocation[] = [
  {
    subjectId: 'eng-lang',
    subjectName: 'English Language',
    level1WeeklyMinutes: 450, // 7.5 hrs/week (15 periods of 30 min)
    level2WeeklyMinutes: 360, // 6.0 hrs/week (10 periods of 36 min)
    level3WeeklyMinutes: 330, // 5.5 hrs/week (8 periods of ~40 min)
    periodsPerWeek: { level1: 15, level2: 10, level3: 8 },
    dailyPeriodsHint: 'Daily (2-3 periods/day)'
  },
  {
    subjectId: 'math',
    subjectName: 'Mathematics',
    level1WeeklyMinutes: 300, // 5.0 hrs/week (10 periods of 30 min)
    level2WeeklyMinutes: 300, // 5.0 hrs/week (8-9 periods)
    level3WeeklyMinutes: 300, // 5.0 hrs/week (7-8 periods)
    periodsPerWeek: { level1: 10, level2: 8, level3: 7 },
    dailyPeriodsHint: 'Daily (Morning 1-2 periods)'
  },
  {
    subjectId: 'sci-tech',
    subjectName: 'Science and Technology',
    level1WeeklyMinutes: 150, // 2.5 hrs/week (5 periods)
    level2WeeklyMinutes: 180, // 3.0 hrs/week (5 periods)
    level3WeeklyMinutes: 180, // 3.0 hrs/week (4-5 periods)
    periodsPerWeek: { level1: 5, level2: 5, level3: 4 },
    dailyPeriodsHint: 'Mon, Tue, Wed, Thu'
  },
  {
    subjectId: 'soc-stud',
    subjectName: 'Social Studies',
    level1WeeklyMinutes: 120, // 2.0 hrs/week (4 periods)
    level2WeeklyMinutes: 150, // 2.5 hrs/week (4 periods)
    level3WeeklyMinutes: 180, // 3.0 hrs/week (4-5 periods)
    periodsPerWeek: { level1: 4, level2: 4, level3: 4 },
    dailyPeriodsHint: 'Mon, Wed, Fri'
  },
  {
    subjectId: 'voc-stud',
    subjectName: 'Vocational Studies / Practical Arts',
    level1WeeklyMinutes: 120, // 2.0 hrs/week (4 periods)
    level2WeeklyMinutes: 150, // 2.5 hrs/week (4 periods)
    level3WeeklyMinutes: 150, // 2.5 hrs/week (4 periods)
    periodsPerWeek: { level1: 4, level2: 4, level3: 4 },
    dailyPeriodsHint: 'Tue, Thu afternoon'
  },
  {
    subjectId: 'phe',
    subjectName: 'Physical and Health Education (PHE)',
    level1WeeklyMinutes: 120, // 2.0 hrs/week (4 periods)
    level2WeeklyMinutes: 120, // 2.0 hrs/week (3 periods)
    level3WeeklyMinutes: 120, // 2.0 hrs/week (3 periods)
    periodsPerWeek: { level1: 4, level2: 3, level3: 3 },
    dailyPeriodsHint: 'Wed, Fri morning/afternoon'
  },
  {
    subjectId: 'arts-crafts',
    subjectName: 'Arts and Crafts / Creative Arts',
    level1WeeklyMinutes: 90,  // 1.5 hrs/week (3 periods)
    level2WeeklyMinutes: 120, // 2.0 hrs/week (3 periods)
    level3WeeklyMinutes: 120, // 2.0 hrs/week (3 periods)
    periodsPerWeek: { level1: 3, level2: 3, level3: 3 },
    dailyPeriodsHint: 'Tue, Thu'
  },
  {
    subjectId: 'ict',
    subjectName: 'Information and Communication Technology (ICT)',
    level1WeeklyMinutes: 60,  // 1.0 hr/week (2 periods)
    level2WeeklyMinutes: 90,  // 1.5 hrs/week (2 periods)
    level3WeeklyMinutes: 120, // 2.0 hrs/week (3 periods)
    periodsPerWeek: { level1: 2, level2: 2, level3: 3 },
    dailyPeriodsHint: 'Wed, Fri'
  },
  {
    subjectId: 'french-2',
    subjectName: 'French (Second Official Language)',
    level1WeeklyMinutes: 90,  // 1.5 hrs/week (3 periods)
    level2WeeklyMinutes: 120, // 2.0 hrs/week (3 periods)
    level3WeeklyMinutes: 120, // 2.0 hrs/week (3 periods)
    periodsPerWeek: { level1: 3, level2: 3, level3: 3 },
    dailyPeriodsHint: 'Mon, Wed, Fri'
  },
  {
    subjectId: 'nlc',
    subjectName: 'National Languages and Cultures (NLC)',
    level1WeeklyMinutes: 60,  // 1.0 hr/week (2 periods)
    level2WeeklyMinutes: 90,  // 1.5 hrs/week (2 periods)
    level3WeeklyMinutes: 90,  // 1.5 hrs/week (2 periods)
    periodsPerWeek: { level1: 2, level2: 2, level3: 2 },
    dailyPeriodsHint: 'Mon, Thu'
  }
];

export const FRANCOPHONE_TIME_ALLOCATIONS: SubjectAllocation[] = [
  {
    subjectId: 'fr-lang',
    subjectName: 'Français (Langue 1)',
    level1WeeklyMinutes: 450, // 7.5 h/sem (15 séances de 30 min)
    level2WeeklyMinutes: 360, // 6.0 h/sem (10 séances)
    level3WeeklyMinutes: 330, // 5.5 h/sem (8 séances)
    periodsPerWeek: { level1: 15, level2: 10, level3: 8 },
    dailyPeriodsHint: 'Tous les jours (2-3 séances/jour)'
  },
  {
    subjectId: 'fr-math',
    subjectName: 'Mathématiques',
    level1WeeklyMinutes: 300, // 5.0 h/sem (10 séances de 30 min)
    level2WeeklyMinutes: 300, // 5.0 h/sem (8 séances)
    level3WeeklyMinutes: 300, // 5.0 h/sem (7 séances)
    periodsPerWeek: { level1: 10, level2: 8, level3: 7 },
    dailyPeriodsHint: 'Tous les jours en matinée'
  },
  {
    subjectId: 'fr-scitech',
    subjectName: 'Sciences et Technologies',
    level1WeeklyMinutes: 150, // 2.5 h/sem (5 séances)
    level2WeeklyMinutes: 180, // 3.0 h/sem (5 séances)
    level3WeeklyMinutes: 180, // 3.0 h/sem (4 séances)
    periodsPerWeek: { level1: 5, level2: 5, level3: 4 },
    dailyPeriodsHint: 'Lundi, Mardi, Mercredi, Jeudi'
  },
  {
    subjectId: 'fr-humaines',
    subjectName: 'Sciences Humaines et Sociales',
    level1WeeklyMinutes: 120, // 2.0 h/sem (4 séances)
    level2WeeklyMinutes: 150, // 2.5 h/sem (4 séances)
    level3WeeklyMinutes: 180, // 3.0 h/sem (4 séances)
    periodsPerWeek: { level1: 4, level2: 4, level3: 4 },
    dailyPeriodsHint: 'Lundi, Mercredi, Vendredi'
  },
  {
    subjectId: 'fr-dev-perso',
    subjectName: 'Développement Personnel et Pratique',
    level1WeeklyMinutes: 120, // 2.0 h/sem (4 séances)
    level2WeeklyMinutes: 150, // 2.5 h/sem (4 séances)
    level3WeeklyMinutes: 150, // 2.5 h/sem (4 séances)
    periodsPerWeek: { level1: 4, level2: 4, level3: 4 },
    dailyPeriodsHint: 'Mardi, Jeudi après-midi'
  },
  {
    subjectId: 'fr-eps',
    subjectName: 'Éducation Physique et Sportive (EPS)',
    level1WeeklyMinutes: 120, // 2.0 h/sem (4 séances)
    level2WeeklyMinutes: 120, // 2.0 h/sem (3 séances)
    level3WeeklyMinutes: 120, // 2.0 h/sem (3 séances)
    periodsPerWeek: { level1: 4, level2: 3, level3: 3 },
    dailyPeriodsHint: 'Mercredi, Vendredi'
  },
  {
    subjectId: 'fr-arts',
    subjectName: 'Arts et Culture',
    level1WeeklyMinutes: 90,  // 1.5 h/sem (3 séances)
    level2WeeklyMinutes: 120, // 2.0 h/sem (3 séances)
    level3WeeklyMinutes: 120, // 2.0 h/sem (3 séances)
    periodsPerWeek: { level1: 3, level2: 3, level3: 3 },
    dailyPeriodsHint: 'Mardi, Jeudi'
  },
  {
    subjectId: 'fr-tic',
    subjectName: 'Technologies de l\'Information et de la Communication (TIC)',
    level1WeeklyMinutes: 60,  // 1.0 h/sem (2 séances)
    level2WeeklyMinutes: 90,  // 1.5 h/sem (2 séances)
    level3WeeklyMinutes: 120, // 2.0 h/sem (3 séances)
    periodsPerWeek: { level1: 2, level2: 2, level3: 3 },
    dailyPeriodsHint: 'Mercredi, Vendredi'
  },
  {
    subjectId: 'fr-anglais-2',
    subjectName: 'Anglais (Langue Seconde)',
    level1WeeklyMinutes: 90,  // 1.5 h/sem (3 séances)
    level2WeeklyMinutes: 120, // 2.0 h/sem (3 séances)
    level3WeeklyMinutes: 120, // 2.0 h/sem (3 séances)
    periodsPerWeek: { level1: 3, level2: 3, level3: 3 },
    dailyPeriodsHint: 'Lundi, Mercredi, Vendredi'
  },
  {
    subjectId: 'fr-lcn',
    subjectName: 'Langues et Cultures Nationales (LCN)',
    level1WeeklyMinutes: 60,  // 1.0 h/sem (2 séances)
    level2WeeklyMinutes: 90,  // 1.5 h/sem (2 séances)
    level3WeeklyMinutes: 90,  // 1.5 h/sem (2 séances)
    periodsPerWeek: { level1: 2, level2: 2, level3: 2 },
    dailyPeriodsHint: 'Lundi, Jeudi'
  }
];

// ==========================================
// 2. THE 10 OFFICIAL SUBJECTS AND SUB-COMPONENTS
// ==========================================

export const ANGLOPHONE_SUBJECTS: Subject[] = [
  {
    id: 'eng-lang',
    code: 'ENG',
    name: 'English Language',
    subsystem: 'anglophone',
    color: '#0284c7',
    pedagogicalDomain: 'Language, Literacy & Communication',
    subComponents: [
      { id: 'eng-listening-speaking', name: 'Listening & Speaking', description: 'Oral dialogues, phonemic awareness, speech rhymes, storytelling' },
      { id: 'eng-reading-phonics', name: 'Reading & Phonics', description: 'Letter sounds, blends, sight words, reading comprehension, fluency' },
      { id: 'eng-writing-penmanship', name: 'Writing & Penmanship', description: 'Letter formation, copy work, handwriting posture, neatness' },
      { id: 'eng-grammar', name: 'Grammar & Structure', description: 'Parts of speech, sentence building, tenses, punctuation' },
      { id: 'eng-vocab-spelling', name: 'Vocabulary & Spelling', description: 'Word families, contextual vocabulary, spelling drills, dictionary use' },
      { id: 'eng-composition', name: 'Composition & Creative Writing', description: 'Guided paragraphs, narrative essays, informal letters, descriptive texts' },
      { id: 'eng-literature-poetry', name: 'Literature & Poetry', description: 'Cameroonian folk tales, moral fables, poetry recitation, dramatization' }
    ]
  },
  {
    id: 'math',
    code: 'MTH',
    name: 'Mathematics',
    subsystem: 'anglophone',
    color: '#059669',
    pedagogicalDomain: 'Mathematical Thinking & Logic',
    subComponents: [
      { id: 'math-numbers', name: 'Numbers & Number Sense', description: 'Counting, place value, Roman numerals, fractions, decimals, percentages' },
      { id: 'math-operations', name: 'Operations & Calculations', description: 'Addition, subtraction, multiplication, division, mental arithmetic' },
      { id: 'math-measurement', name: 'Measurement', description: 'Length, mass/weight, capacity, time, money (FCFA), perimeter & area' },
      { id: 'math-geometry', name: 'Geometry & Spatial Sense', description: 'Lines, 2D shapes, 3D solids, angles, symmetry, compass directions' },
      { id: 'math-statistics', name: 'Statistics & Data Handling', description: 'Tally marks, pictographs, bar charts, mean/average, pie charts' },
      { id: 'math-problem-solving', name: 'Problem Solving & Everyday Math', description: 'Multi-step real-world word problems, commercial arithmetic, profit/loss' }
    ]
  },
  {
    id: 'sci-tech',
    code: 'SCI',
    name: 'Science and Technology',
    subsystem: 'anglophone',
    color: '#0891b2',
    pedagogicalDomain: 'Scientific Inquiry & Technological Discovery',
    subComponents: [
      { id: 'sci-living-things', name: 'Living & Non-Living Things', description: 'Plants, animals, habitats, classification, life cycles in Cameroon' },
      { id: 'sci-human-body', name: 'Human Body, Health & Hygiene', description: 'Body organs, teeth care, personal cleanliness, sanitation, diseases' },
      { id: 'sci-environment', name: 'Environmental Science & Agriculture', description: 'Soil types, water cycle, seasons in Cameroon, conservation, school gardening' },
      { id: 'sci-materials-energy', name: 'Materials, Matter & Energy', description: 'Solids, liquids, gases, heat, light, sound, magnetism, simple circuits' },
      { id: 'sci-technology-tools', name: 'Technology & Simple Machines', description: 'Levers, pulleys, inclined planes, local Cameroonian tools and inventions' }
    ]
  },
  {
    id: 'soc-stud',
    code: 'SOC',
    name: 'Social Studies',
    subsystem: 'anglophone',
    color: '#d97706',
    pedagogicalDomain: 'Humanities, Citizenship & Society',
    subComponents: [
      { id: 'soc-history', name: 'History of Cameroon', description: 'Pre-colonial kingdoms, German/British/French eras, independence, national heroes' },
      { id: 'soc-geography', name: 'Geography of Cameroon & Local Area', description: '10 administrative regions, relief, rivers, climate, maps, natural resources' },
      { id: 'soc-civics', name: 'Civics, Governance & Citizenship', description: 'National symbols (flag, anthem, seal), state institutions, pupil duties' },
      { id: 'soc-human-rights', name: 'Human Rights, Peace & Living Together', description: 'Children\'s rights, tolerance, conflict resolution, gender equality, peace values' },
      { id: 'soc-culture', name: 'Cameroonian Cultural Heritage', description: 'Traditional festivals, customs, marriage, chieftaincies, folklore' }
    ]
  },
  {
    id: 'voc-stud',
    code: 'VOC',
    name: 'Vocational Studies / Practical Arts',
    subsystem: 'anglophone',
    color: '#ca8a04',
    pedagogicalDomain: 'Personal Development & Practical Life Skills',
    subComponents: [
      { id: 'voc-agriculture', name: 'Agriculture & Animal Husbandry', description: 'Seedbed preparation, compost making, poultry, rabbit keeping, crop care' },
      { id: 'voc-home-econ', name: 'Home Economics & Nutrition', description: 'Balanced diet, local food preparation (ndole, achu, eru), kitchen hygiene, table manners' },
      { id: 'voc-handicraft', name: 'Handicraft & Needlework', description: 'Weaving raffia, basketry, basic stitches, mending clothes, beadwork' },
      { id: 'voc-woodwork', name: 'Woodwork & Local Construction', description: 'Basic hand tools, bamboo work, clay brick making, toy crafting' }
    ]
  },
  {
    id: 'phe',
    code: 'PHE',
    name: 'Physical and Health Education (PHE)',
    subsystem: 'anglophone',
    color: '#dc2626',
    pedagogicalDomain: 'Physical Fitness & Well-being',
    subComponents: [
      { id: 'phe-athletics', name: 'Athletics & Gymnastics', description: 'Running sprints, relays, long jump, balancing, rolls, body coordination' },
      { id: 'phe-games', name: 'Team Games & Traditional Sports', description: 'Football, handball, basketball, local Cameroonian childhood games (e.g., kpeke)' },
      { id: 'phe-health-sanitation', name: 'Health Education & School Sanitation', description: 'Clean environment, disease prevention, malaria control, dental care' },
      { id: 'phe-safety-firstaid', name: 'Safety & First Aid', description: 'Playground safety, treating cuts/scrapes, fainting, emergency numbers' }
    ]
  },
  {
    id: 'arts-crafts',
    code: 'ART',
    name: 'Arts and Crafts / Creative Arts',
    subsystem: 'anglophone',
    color: '#9333ea',
    pedagogicalDomain: 'Aesthetic Expression & Cultural Creativity',
    subComponents: [
      { id: 'art-drawing-painting', name: 'Drawing, Painting & Colouring', description: 'Freehand sketching, primary/secondary colors, landscape drawing, collage' },
      { id: 'art-music-singing', name: 'Music & Singing', description: 'National anthem, folk songs, rhythm clapping, traditional percussion (drums, rattles)' },
      { id: 'art-drama-dance', name: 'Drama & Traditional Dance', description: 'Role play, miming, traditional folk dance steps, puppet performance' },
      { id: 'art-traditional-crafts', name: 'Traditional Crafts & Modelling', description: 'Clay modelling, calabash decoration, mask making, papier-mâché' }
    ]
  },
  {
    id: 'ict',
    code: 'ICT',
    name: 'Information and Communication Technology (ICT)',
    subsystem: 'anglophone',
    color: '#4f46e5',
    pedagogicalDomain: 'Digital Literacy & Modern Technology',
    subComponents: [
      { id: 'ict-hardware', name: 'Computer Hardware & Peripherals', description: 'Monitor, system unit, keyboard, mouse, printer, storage drives' },
      { id: 'ict-mouse-keyboard', name: 'Mouse & Keyboard Operations', description: 'Typing posture, home row keys, pointing, clicking, dragging' },
      { id: 'ict-word-proc', name: 'Word Processing & Digital Text', description: 'Opening documents, typing words, formatting text, saving files' },
      { id: 'ict-digital-safety', name: 'Digital Safety & Ethics', description: 'Protecting passwords, screen time limits, care of computer laboratory' }
    ]
  },
  {
    id: 'french-2',
    code: 'FRA',
    name: 'French (Second Official Language)',
    subsystem: 'anglophone',
    color: '#2563eb',
    pedagogicalDomain: 'Official Bilingualism (Langue Seconde)',
    subComponents: [
      { id: 'fra-oral-dialogue', name: 'Expression Orale & Dialogue', description: 'Salutations, se présenter, nommer les objets de la classe et de la maison' },
      { id: 'fra-reading-vocab', name: 'Lecture & Vocabulaire Pratique', description: 'Mots usuels, imagier bilingue, courtes phrases, compréhension' },
      { id: 'fra-writing-copy', name: 'Écriture & Copie', description: 'Graphisme, copie de mots et phrases simples sans fautes' },
      { id: 'fra-grammar-basics', name: 'Structures Grammaticales Usuelles', description: 'Articles définis/indéfinis, genre et nombre, verbes être et avoir' },
      { id: 'fra-songs-rhymes', name: 'Comptines, Chants & Récitations', description: 'Chants patriotiques et comptines enfantines en français' }
    ]
  },
  {
    id: 'nlc',
    code: 'NLC',
    name: 'National Languages and Cultures (NLC)',
    subsystem: 'anglophone',
    color: '#15803d',
    pedagogicalDomain: 'Indigenous Knowledge & Cultural Identity',
    subComponents: [
      { id: 'nlc-oral-tradition', name: 'Oral Traditions & Folk Tales', description: 'Proverbs, riddles, moral legends of Cameroonian ethnic groups' },
      { id: 'nlc-mother-tongue', name: 'Local Language Fundamentals', description: 'Greetings, counting 1-10, naming family members in local language' },
      { id: 'nlc-customs-norms', name: 'Customs, Norms & Chieftaincy', description: 'Respecting elders, royal greetings, sacred shrines, traditional costumes' },
      { id: 'nlc-folk-dances', name: 'Folk Dances & Cultural Values', description: 'Grassfields, Coastal, Forest and Sudano-Sahelian cultural performances' }
    ]
  }
];

export const FRANCOPHONE_SUBJECTS: Subject[] = [
  {
    id: 'fr-lang',
    code: 'FR',
    name: 'Français (Langue 1)',
    subsystem: 'francophone',
    color: '#0284c7',
    pedagogicalDomain: 'Langue, Littératie et Communication',
    subComponents: [
      { id: 'fr-com-orale', name: 'Communication Orale / Langage', description: 'Écoute active, prise de parole, dialogues de vie courante, reformulation' },
      { id: 'fr-lecture', name: 'Lecture & Fluence', description: 'Décodage graphie-phonie, lecture courante, compréhension de textes narratifs' },
      { id: 'fr-ecriture', name: 'Écriture & Graphisme', description: 'Tracé des lettres cursives, tenue du stylo, copie de phrases et de poésies' },
      { id: 'fr-prod-ecrit', name: 'Production d\'écrits / Rédaction', description: 'Construction de phrases, paragraphes descriptifs, lettres, comptes rendus' },
      { id: 'fr-grammaire', name: 'Grammaire', description: 'Types de phrases, natures et fonctions des mots, accords sujet-verbe' },
      { id: 'fr-conjugaison', name: 'Conjugaison', description: 'Présent, futur, imparfait, passé composé des verbes usuels du 1er et 2e groupe' },
      { id: 'fr-orthographe', name: 'Orthographe', description: 'Orthographe lexicale et grammaticale, dictées préparées, homophones' },
      { id: 'fr-vocabulaire', name: 'Vocabulaire', description: 'Champs lexicaux, synonymes, antonymes, familles de mots, usage du dictionnaire' },
      { id: 'fr-poesie', name: 'Poésie & Récitation', description: 'Mémorisation et déclamation expressive de poèmes camerounais et francophones' }
    ]
  },
  {
    id: 'fr-math',
    code: 'MAT',
    name: 'Mathématiques',
    subsystem: 'francophone',
    color: '#059669',
    pedagogicalDomain: 'Raisonnement Logique et Mathématique',
    subComponents: [
      { id: 'fr-math-nombres', name: 'Nombres et Calcul', description: 'Numération, numération de position, calcul mental, 4 opérations arithmétiques, fractions' },
      { id: 'fr-math-geometrie', name: 'Espace et Géométrie', description: 'Repérage, droites perpendiculaires/parallèles, polygones, solides, symétrie' },
      { id: 'fr-math-grandeurs', name: 'Grandeurs et Mesures', description: 'Longueurs, masses, capacités, durées, monnaie (FCFA), périmètres et aires' },
      { id: 'fr-math-problemes', name: 'Gestion des Données & Problèmes', description: 'Tableaux, diagrammes, situations-problèmes de la vie courante, proportionnalité' }
    ]
  },
  {
    id: 'fr-scitech',
    code: 'ST',
    name: 'Sciences et Technologies',
    subsystem: 'francophone',
    color: '#0891b2',
    pedagogicalDomain: 'Démarche Scientifique et Découverte Technique',
    subComponents: [
      { id: 'fr-st-vivant', name: 'Le Vivant et son Environnement', description: 'Plantes, animaux du Cameroun, écosystèmes, chaînes alimentaires, biodiversité' },
      { id: 'fr-st-corps-sante', name: 'Le Corps Humain et la Santé', description: 'Appareils locomoteur, digestif, respiratoire; hygiène corporelle et paludisme' },
      { id: 'fr-st-matiere-energie', name: 'Matière et Énergie', description: 'États de la matière, eau, air, lumière, électricité simple, sources d\'énergie' },
      { id: 'fr-st-objets-tech', name: 'Technologies & Objets Techniques', description: 'Outils usuels, leviers, poulies, engrenages, sécurité lors de l\'usage d\'outils' },
      { id: 'fr-st-pratiques-agri', name: 'Pratiques Agro-pastorales Élémentaires', description: 'Techniques de semis, arrosage, compostage, protection des cultures vivrières' }
    ]
  },
  {
    id: 'fr-humaines',
    code: 'SHS',
    name: 'Sciences Humaines et Sociales',
    subsystem: 'francophone',
    color: '#d97706',
    pedagogicalDomain: 'Sciences Humaines, Citoyenneté et Société',
    subComponents: [
      { id: 'fr-shs-histoire', name: 'Histoire du Cameroun', description: 'Grands royaumes traditionnels, protectorat allemand, mandat/tutelle, indépendance' },
      { id: 'fr-shs-geographie', name: 'Géographie du Terroir et du Cameroun', description: '10 régions administratives, relief, fleuves, climats, activités économiques' },
      { id: 'fr-shs-citoyennete', name: 'Éducation à la Citoyenneté et Morale', description: 'Symboles de la République (drapeau, hymne, devise), institutions, devoirs de l\'écolier' },
      { id: 'fr-shs-droits-paix', name: 'Droits de l\'Homme et Vivre-Ensemble', description: 'Droits de l\'enfant, tolérance interethnique, gestion pacifique des conflits' }
    ]
  },
  {
    id: 'fr-dev-perso',
    code: 'DPP',
    name: 'Développement Personnel et Pratique',
    subsystem: 'francophone',
    color: '#ca8a04',
    pedagogicalDomain: 'Développement Personnel et Compétences de Vie',
    subComponents: [
      { id: 'fr-dpp-agropastoral', name: 'Activités Agro-pastorales', description: 'Entretien du jardin scolaire, petit élevage (poules, lapins), respect de la terre' },
      { id: 'fr-dpp-esf', name: 'Économie Sociale et Familiale (ESF)', description: 'Nutrition équilibrée, mets locaux camerounais, hygiène alimentaire et du foyer' },
      { id: 'fr-dpp-artisanat', name: 'Activités Manuelles et Artisanat', description: 'Tressage du raphia, vannerie, modelage d\'argile, bricolage utilitaire' }
    ]
  },
  {
    id: 'fr-eps',
    code: 'EPS',
    name: 'Éducation Physique et Sportive (EPS)',
    subsystem: 'francophone',
    color: '#dc2626',
    pedagogicalDomain: 'Motricité, Santé Corporelle et Sport',
    subComponents: [
      { id: 'fr-eps-athletisme', name: 'Athlétisme & Gymnastique', description: 'Courses de vitesse et relais, sauts, équilibres, roulades et coordination motrice' },
      { id: 'fr-eps-sports-co', name: 'Sports Collectifs & Jeux Traditionnels', description: 'Football, handball, balle au prisonnier, jeux moteurs du patrimoine local' },
      { id: 'fr-eps-hygiene-sport', name: 'Hygiène Sportive et Sécurité', description: 'Échauffement, hydratation, récupération, règles de sécurité sur le terrain' },
      { id: 'fr-eps-secourisme', name: 'Secourisme Élémentaire', description: 'Premiers soins en cas de chute, saignement de nez, alertes d\'urgence' }
    ]
  },
  {
    id: 'fr-arts',
    code: 'AC',
    name: 'Arts et Culture',
    subsystem: 'francophone',
    color: '#9333ea',
    pedagogicalDomain: 'Éducation Artistique et Sensibilité Culturelle',
    subComponents: [
      { id: 'fr-ac-plastiques', name: 'Arts Plastiques et Dessin', description: 'Dessin d\'observation, couleurs primaires et secondaires, peinture, collage' },
      { id: 'fr-ac-musique', name: 'Éducation Musicale et Chants', description: 'Hymne national, chants patriotiques et folkloriques, percussions traditionnelles' },
      { id: 'fr-ac-spectacle', name: 'Arts du Spectacle & Danses Traditionnelles', description: 'Mimes, saynètes, danses folkloriques des quatre grandes aires culturelles' }
    ]
  },
  {
    id: 'fr-tic',
    code: 'TIC',
    name: 'Technologies de l\'Information et de la Communication (TIC)',
    subsystem: 'francophone',
    color: '#4f46e5',
    pedagogicalDomain: 'Culture Numérique et Informatique',
    subComponents: [
      { id: 'fr-tic-materiel', name: 'Environnement Informatique & Périphériques', description: 'Unité centrale, écran, clavier, souris, imprimante, supports de stockage' },
      { id: 'fr-tic-saisie', name: 'Manipulation & Traitement de Texte', description: 'Saisie au clavier, mise en forme de texte simple, enregistrement de fichier' },
      { id: 'fr-tic-securite', name: 'Sensibilisation au Numérique & Sécurité', description: 'Règles de respect du matériel informatique, temps d\'écran, protection de la vie privée' }
    ]
  },
  {
    id: 'fr-anglais-2',
    code: 'ANG',
    name: 'Anglais (Langue Seconde)',
    subsystem: 'francophone',
    color: '#2563eb',
    pedagogicalDomain: 'Bilinguisme Officiel (Langue Seconde)',
    subComponents: [
      { id: 'fr-ang-oral', name: 'Oral Communication & Everyday Life', description: 'Greetings, introducing oneself, classroom objects, family, numbers 1-20' },
      { id: 'fr-ang-reading', name: 'Reading & Picture Vocabulary', description: 'Basic phonics, matching words to pictures, reading short sentences' },
      { id: 'fr-ang-writing', name: 'Writing & Guided Sentences', description: 'Copying words correctly, simple fills-in-the-blank, labeling diagrams' },
      { id: 'fr-ang-rhymes', name: 'Action Songs & Rhymes', description: 'Chanting action rhymes, singing English nursery songs' }
    ]
  },
  {
    id: 'fr-lcn',
    code: 'LCN',
    name: 'Langues et Cultures Nationales (LCN)',
    subsystem: 'francophone',
    color: '#15803d',
    pedagogicalDomain: 'Savoirs Endogènes et Identité Culturelle',
    subComponents: [
      { id: 'fr-lcn-tradition-orale', name: 'Traditions Orales & Contes du Terroir', description: 'Contes, proverbes, devinettes et légendes des chefferies du Cameroun' },
      { id: 'fr-lcn-langue-locale', name: 'Éléments de Langue Maternelle / Locale', description: 'Salutations traditionnelles, numération coutumière, désignation des aînés' },
      { id: 'fr-lcn-coutumes-valeurs', name: 'Us, Coutumes et Valeurs Morales', description: 'Respect de la hiérarchie et des aînés, cérémonies traditionnelles, solidarité' }
    ]
  }
];

// ==========================================
// 3. MONTHLY UNITS (MONTH 1 TO 9) WITH 4-WEEK BREAKDOWNS
// ==========================================

export const ANGLOPHONE_MONTHLY_UNITS: MonthlyUnit[] = [
  {
    monthNumber: 1,
    monthName: 'September (Month 1)',
    termNumber: 1,
    subsystem: 'anglophone',
    iltTheme: 'The School & Immediate Environment',
    monthlyProject: {
      title: 'Designing a School Map & Hygiene Rubric',
      objective: 'Pupils collaborate using local cardboard and colored pens to map classroom zones and establish daily school sanitation rules.',
      practicalTasks: [
        'Surveying classroom corners and identifying trash disposal locations',
        'Drawing school layout with key markers: flag post, head teacher office, water point',
        'Creating illustrated classroom hygiene pledge cards'
      ],
      requiredLocalMaterials: ['Recycled carton boards', 'Crayons / colored pencils', 'Local glue (cassava paste)', 'Sticks / raffia pointers'],
      expectedOutcome: 'A framed classroom map and hygiene chart displayed on the didactic wall.',
      weeklyMilestones: {
        week1: 'Class walkabout and listing main school landmarks',
        week2: 'Drafting sketch of the school compound and sanitation points',
        week3: 'Coloring symbols, pasting legend markers, writing hygiene pledges',
        week4: 'Final exhibition, class evaluation, integration presentation to Head Teacher'
      }
    },
    weeks: [
      {
        weekNumber: 1,
        isRevisionWeek: false,
        themeTitle: 'Discovering Our Classroom & School Community',
        subtheme: 'Orientation, Safety & Respectful Greetings',
        fridayIntegrationActivity: {
          title: 'Integrated Class Orientation Role-Play',
          description: 'Pupils demonstrate appropriate polite greetings in English and French, identify school personnel, and calculate total pupils present.',
          competenciesTargeted: 'Oral communication, counting, social awareness, cooperative behavior',
          remediationTask: 'Assisted peer pairing for shy pupils to practice greeting dialogs.'
        },
        lessons: [
          {
            id: 'ang-m1-w1-eng',
            subjectId: 'eng-lang',
            subComponentId: 'eng-listening-speaking',
            topic: 'Polite Greetings and Introductions',
            subTopic: 'Good morning, My name is...',
            lessonTitle: 'Introducing Myself and Greeting Classmates Politely',
            monthNumber: 1,
            weekNumber: 1,
            durationMinutes: 30,
            bloomLevel: 'applying',
            bloomActionVerbs: ['demonstrate', 'introduce', 'respond', 'state'],
            smartObjectives: {
              overall: 'By the end of the 30-minute lesson, pupils will be able to introduce themselves and greet others politely with 100% appropriate gestures.',
              specificItems: [
                'State their full name and age clearly in English',
                'Respond correctly to "Good morning, how are you?" with courteous gestures',
                'Exchange pleasant greetings with at least 3 classmates'
              ]
            },
            previousKnowledge: 'Pupils know their own names and have greeted family members at home.',
            didacticMaterials: ['Pupil name badges', 'Picture flashcards showing polite handshakes', 'Classroom roll chart'],
            didacticSteps: [
              {
                stepNumber: 1,
                title: 'Introduction & Review / Motivation',
                durationMinutes: 5,
                teacherActivity: 'Teacher sings the welcome greeting song: "Good morning, dear teacher, good morning to you!" and smiles.',
                pupilActivity: 'Pupils listen, clap hands rhythmically, and join in repeating the chorus.',
                didacticAids: 'Greeting chart on chalkboard'
              },
              {
                stepNumber: 2,
                title: 'Presentation & Discovery',
                durationMinutes: 8,
                teacherActivity: 'Teacher models: "My name is Mr. Forcha. Good morning, John!" with polite eye contact and smile.',
                pupilActivity: 'Pupils observe closely, note the polite tone, and repeat after the teacher chorally.',
                didacticAids: 'Dialogue flashcard'
              },
              {
                stepNumber: 3,
                title: 'Guided Practice & Rule Explanation',
                durationMinutes: 8,
                teacherActivity: 'Teacher calls pairs of pupils to the front to practice: "What is your name?" - "My name is Mary."',
                pupilActivity: 'Pairs take turns asking and answering with confidence.',
                didacticAids: 'Name tags'
              },
              {
                stepNumber: 4,
                title: 'Independent Practice / Formative Assessment',
                durationMinutes: 5,
                teacherActivity: 'Walks around classroom checking that each child politely greets their desk neighbour.',
                pupilActivity: 'Pupils turn to desk-mates, greet politely, and state their full names.',
                didacticAids: 'Observation checklist'
              },
              {
                stepNumber: 5,
                title: 'Conclusion & Blackboard Summary Notes',
                durationMinutes: 4,
                teacherActivity: 'Writes summary sentence on the board and leads final recitation.',
                pupilActivity: 'Pupils read chorally and copy into their English exercise books.',
                didacticAids: 'Chalkboard and chalk'
              }
            ],
            chalkboardNotes: {
              title: 'ENGLISH: Polite Greetings',
              summary: 'We greet people politely to show respect and friendship.',
              keyPoints: [
                'Good morning: used from morning until 12:00 noon.',
                'My name is: used to tell people who you are.',
                'Always smile and look politely at the person you are greeting.'
              ],
              vocabularyOrFormulas: ['Good morning', 'Name', 'Friend', 'Respect']
            },
            formativeEvaluation: {
              questions: [
                'What do you say when you meet your teacher in the morning?',
                'How do you tell someone your name in complete sentence?'
              ],
              expectedAnswers: [
                'Good morning, Sir / Madam.',
                'My name is [Pupil\'s Name].'
              ]
            },
            remediationPlan: {
              forStrugglingPupils: 'Pair with an expressive peer to repeat dialogue with hand gestures.',
              forFastLearners: 'Practice greeting with additional phrases: "Pleased to meet you, have a nice day!"'
            }
          },
          {
            id: 'ang-m1-w1-math',
            subjectId: 'math',
            subComponentId: 'math-numbers',
            topic: 'Counting Objects in the Classroom',
            subTopic: 'Numbers 1 to 10 with Real Objects',
            lessonTitle: 'Counting Classroom Objects from 1 to 10',
            monthNumber: 1,
            weekNumber: 1,
            durationMinutes: 30,
            bloomLevel: 'applying',
            bloomActionVerbs: ['count', 'identify', 'match', 'write'],
            smartObjectives: {
              overall: 'By the end of the lesson, pupils will be able to accurately count up to 10 classroom objects and match them with numeral cards.',
              specificItems: [
                'Count up to 10 physical counters (bottle tops, pebbles) accurately',
                'Match groups of objects with the written digit (1 to 10)',
                'Write digits 1 to 5 neatly in exercise book'
              ]
            },
            previousKnowledge: 'Pupils can recite number rhymes (One, two, buckle my shoe...).',
            didacticMaterials: ['10 bottle caps / pebbles per desk', 'Large numeral cards 1 to 10', 'Wooden counting sticks'],
            didacticSteps: [
              {
                stepNumber: 1,
                title: 'Introduction & Mental Warm-up',
                durationMinutes: 5,
                teacherActivity: 'Leads number rhyme clapping: "One, two, three, four, five, once I caught a fish alive!"',
                pupilActivity: 'Pupils chant with finger actions showing corresponding numbers.',
                didacticAids: 'Chalkboard count line'
              },
              {
                stepNumber: 2,
                title: 'Presentation & Demonstration',
                durationMinutes: 8,
                teacherActivity: 'Displays 5 books one by one on the table, counting aloud: 1, 2, 3, 4, 5.',
                pupilActivity: 'Pupils count along in unison, pointing their fingers.',
                didacticAids: 'Classroom books and counter sticks'
              },
              {
                stepNumber: 3,
                title: 'Guided Practice',
                durationMinutes: 8,
                teacherActivity: 'Gives each group a tray of bottle tops. Asks pupils to bring out 4 tops, then 7 tops.',
                pupilActivity: 'Pupils manipulate counters, arrange in rows, and count aloud.',
                didacticAids: 'Trays of bottle tops'
              },
              {
                stepNumber: 4,
                title: 'Independent Work & Evaluation',
                durationMinutes: 5,
                teacherActivity: 'Draws 3 apples, 6 stars, and 4 pencils on the board; asks pupils to count and write numerals.',
                pupilActivity: 'Pupils count items and write the corresponding numeral in exercise book.',
                didacticAids: 'Exercise books'
              },
              {
                stepNumber: 5,
                title: 'Summary & Conclusion',
                durationMinutes: 4,
                teacherActivity: 'Recaps number order from 1 to 10; assigns home task.',
                pupilActivity: 'Pupils read number line 1-10 chorally and record homework.',
                didacticAids: 'Chalkboard summary'
              }
            ],
            chalkboardNotes: {
              title: 'MATHEMATICS: Counting 1 to 10',
              summary: 'Numbers help us know how many objects we have.',
              keyPoints: [
                '1, 2, 3, 4, 5, 6, 7, 8, 9, 10.',
                'Each object is counted once only.',
                'The last number counted tells the total quantity.'
              ],
              vocabularyOrFormulas: ['Count', 'Number', 'Numeral', 'Quantity']
            },
            formativeEvaluation: {
              questions: [
                'Count how many fingers are on your right hand.',
                'Look at this picture: count the chairs and tell the number.'
              ],
              expectedAnswers: [
                '5 fingers.',
                '4 chairs.'
              ]
            },
            remediationPlan: {
              forStrugglingPupils: 'Use 1-to-1 tactile touch on large pebbles while counting slowly.',
              forFastLearners: 'Count backwards from 10 to 1 and solve simple bundle problems.'
            }
          }
        ]
      },
      {
        weekNumber: 2,
        isRevisionWeek: false,
        themeTitle: 'School Grounds, Safety & Daily Routine',
        subtheme: 'Living Harmoniously & Following Rules',
        fridayIntegrationActivity: {
          title: 'Compound Inspection & Environmental Care Rally',
          description: 'Pupils tour school compound, classify clean vs dirty areas, practice washing hands at water station, and report findings.',
          competenciesTargeted: 'Hygiene practice, data gathering, team cooperation, civic responsibility',
          remediationTask: 'Demonstrate proper handwashing steps with clean water and soap.'
        },
        lessons: [
          {
            id: 'ang-m1-w2-sci',
            subjectId: 'sci-tech',
            subComponentId: 'sci-environment',
            topic: 'The Classroom and School Compound',
            subTopic: 'Keeping Our School Clean and Safe',
            lessonTitle: 'Identifying Clean and Dirty Areas in School',
            monthNumber: 1,
            weekNumber: 2,
            durationMinutes: 30,
            bloomLevel: 'analyzing',
            bloomActionVerbs: ['identify', 'differentiate', 'classify', 'explain'],
            smartObjectives: {
              overall: 'By the end of the lesson, pupils will be able to distinguish between clean and dirty environments and explain 2 dangers of litter.',
              specificItems: [
                'Identify 3 items that make school compound dirty (sweet wrappers, plastic bags, banana peels)',
                'Place waste items in designated dustbin correctly',
                'State why clean surroundings prevent diseases like malaria and cholera'
              ]
            },
            previousKnowledge: 'Pupils have seen sweepers cleaning the classroom and compound.',
            didacticMaterials: ['Dustbin / waste basket', 'Broom and dustpan', 'Sample clean vs littered compound pictures'],
            didacticSteps: [
              {
                stepNumber: 1,
                title: 'Introduction & Review',
                durationMinutes: 5,
                teacherActivity: 'Points to a paper on the floor and asks: "Does this look nice in our room?"',
                pupilActivity: 'Pupils respond: "No, teacher! It is dirty!"',
                didacticAids: 'Classroom floor'
              },
              {
                stepNumber: 2,
                title: 'Presentation & Contrast Observation',
                durationMinutes: 8,
                teacherActivity: 'Shows two pictures: one of a tidy school yard with flowers, one with scattered rubbish.',
                pupilActivity: 'Pupils compare the pictures and describe which one they prefer to play in.',
                didacticAids: 'Comparative picture posters'
              },
              {
                stepNumber: 3,
                title: 'Guided Hands-on Activity',
                durationMinutes: 8,
                teacherActivity: 'Demonstrates picking dry papers and putting them into the bin without touching dirt.',
                pupilActivity: 'Volunteers demonstrate throwing scrap paper into the waste basket properly.',
                didacticAids: 'Classroom waste basket'
              },
              {
                stepNumber: 4,
                title: 'Independent Evaluation',
                durationMinutes: 5,
                teacherActivity: 'Asks individual pupils to state one rule for keeping our class tidy.',
                pupilActivity: 'Pupils formulate rules: "Do not throw paper on floor", "Sweep after school".',
                didacticAids: 'Oral response check'
              },
              {
                stepNumber: 5,
                title: 'Blackboard Summary & Action Pledge',
                durationMinutes: 4,
                teacherActivity: 'Writes hygiene summary on chalkboard.',
                pupilActivity: 'Pupils copy notes and make collective cleanliness pledge.',
                didacticAids: 'Chalkboard summary'
              }
            ],
            chalkboardNotes: {
              title: 'SCIENCE: A Clean School Compound',
              summary: 'A clean school is a healthy school where pupils learn happily.',
              keyPoints: [
                'Always throw litter inside the dustbin.',
                'Dirty surroundings attract flies, mosquitoes, and cause sickness.',
                'We must wash our hands after sweeping or picking dirt.'
              ],
              vocabularyOrFormulas: ['Clean', 'Dustbin', 'Litter', 'Hygiene', 'Health']
            },
            formativeEvaluation: {
              questions: [
                'Where should you throw your groundnut shells after eating?',
                'Name two sicknesses caused by dirty surroundings.'
              ],
              expectedAnswers: [
                'Into the dustbin.',
                'Cholera and Malaria.'
              ]
            },
            remediationPlan: {
              forStrugglingPupils: 'Direct physical guidance to pick paper and drop in the bin.',
              forFastLearners: 'Draw a poster showing a happy child beside a clean dustbin.'
            }
          }
        ]
      },
      {
        weekNumber: 3,
        isRevisionWeek: false,
        themeTitle: 'School Roles, Civic Values & National Pride',
        subtheme: 'National Symbols & Living Together at School',
        fridayIntegrationActivity: {
          title: 'Flag Ceremony & Civic Solidarity Simulation',
          description: 'Pupils sing Cameroon National Anthem standing at attention, describe flag colors, and perform a sharing activity with classmates.',
          competenciesTargeted: 'Patriotism, civics, active listening, respectful posture',
          remediationTask: 'Sing the anthem phrase by phrase with teacher modeling.'
        },
        lessons: [
          {
            id: 'ang-m1-w3-soc',
            subjectId: 'soc-stud',
            subComponentId: 'soc-civics',
            topic: 'National Symbols of Cameroon',
            subTopic: 'The National Flag of Cameroon',
            lessonTitle: 'The Colours and Yellow Star of Cameroon Flag',
            monthNumber: 1,
            weekNumber: 3,
            durationMinutes: 30,
            bloomLevel: 'understanding',
            bloomActionVerbs: ['identify', 'describe', 'color', 'explain'],
            smartObjectives: {
              overall: 'By the end of the lesson, pupils will be able to describe the 3 vertical stripes and star of the Cameroon national flag and explain what they symbolize.',
              specificItems: [
                'Name the three colors in correct order from left to right: Green, Red, Yellow',
                'Identify the yellow star located in the center of the red stripe',
                'Demonstrate standing at attention during flag-raising'
              ]
            },
            previousKnowledge: 'Pupils attend morning flag assembly every Monday at 7:30 AM.',
            didacticMaterials: ['Actual miniature Cameroon national flag', 'Coloring sheets with flag outline', 'Green, red, yellow crayons'],
            didacticSteps: [
              {
                stepNumber: 1,
                title: 'Introduction & Review',
                durationMinutes: 5,
                teacherActivity: 'Humms opening bars of Cameroon National Anthem: "O Cameroon, thou cradle of our fathers..."',
                pupilActivity: 'Pupils stand up tall with hands beside their thighs at attention.',
                didacticAids: 'Anthem melody'
              },
              {
                stepNumber: 2,
                title: 'Presentation & Flag Analysis',
                durationMinutes: 8,
                teacherActivity: 'Displays national flag. Points to each stripe: Green (forest), Red (unity/blood), Yellow (sun/savannah), Yellow Star (unity).',
                pupilActivity: 'Pupils repeat each color and meaning in proper sequence.',
                didacticAids: 'Fabric Cameroon flag'
              },
              {
                stepNumber: 3,
                title: 'Guided Coloring Activity',
                durationMinutes: 8,
                teacherActivity: 'Guides pupils to color flag template: green on left, red in middle with star, yellow on right.',
                pupilActivity: 'Pupils color their outlines carefully avoiding overlapping colors.',
                didacticAids: 'Flag coloring worksheets'
              },
              {
                stepNumber: 4,
                title: 'Formative Assessment',
                durationMinutes: 5,
                teacherActivity: 'Holds up colored flags and checks correct placement of stripes and yellow star.',
                pupilActivity: 'Pupils present work and explain what color comes first.',
                didacticAids: 'Pupil flag sheets'
              },
              {
                stepNumber: 5,
                title: 'Conclusion & Blackboard Summary',
                durationMinutes: 4,
                teacherActivity: 'Writes flag summary notes on chalkboard.',
                pupilActivity: 'Pupils read and copy notes into Social Studies books.',
                didacticAids: 'Chalkboard summary'
              }
            ],
            chalkboardNotes: {
              title: 'SOCIAL STUDIES: The Cameroon National Flag',
              summary: 'The flag is the supreme symbol of unity and pride for all Cameroonians.',
              keyPoints: [
                'Colors from left to right: Green, Red, Yellow.',
                'There is ONE yellow star in the middle of the red stripe.',
                'Green stands for lush southern forests, Red for unity, Yellow for northern savannah.',
                'We must always stand at attention when the flag is being hoisted.'
              ],
              vocabularyOrFormulas: ['Flag', 'Green', 'Red', 'Yellow', 'Star of Unity', 'Cameroon']
            },
            formativeEvaluation: {
              questions: [
                'What color is on the left side of the Cameroon flag?',
                'Where is the yellow star placed on the flag?'
              ],
              expectedAnswers: [
                'Green.',
                'In the middle of the red stripe.'
              ]
            },
            remediationPlan: {
              forStrugglingPupils: 'Use three pre-colored cardboards to arrange in correct left-to-right order.',
              forFastLearners: 'Explain why the star is called the "Star of Unity" in our history.'
            }
          }
        ]
      },
      {
        weekNumber: 4,
        isRevisionWeek: true,
        themeTitle: 'Monthly Revision, Integration, Evaluation & Remediation',
        subtheme: 'Consolidation of Month 1 Competencies & Project Presentation',
        fridayIntegrationActivity: {
          title: 'Grand Month 1 Exhibition & Remediation Gala',
          description: 'Pupils present the completed School Map & Hygiene Rubric project to school head, undergo diagnostic assessment, and carry out targeted remediation.',
          competenciesTargeted: 'Integrated performance across Language, Math, Science, and Social Studies',
          remediationTask: 'Small-group teacher clinics on counting errors and letter formation.'
        },
        lessons: [
          {
            id: 'ang-m1-w4-rev',
            subjectId: 'eng-lang',
            subComponentId: 'eng-composition',
            topic: 'Monthly Integration & Summative Evaluation',
            subTopic: 'Oral & Written Synthesis of Month 1 Skills',
            lessonTitle: 'Presenting Our School Project and Demonstrating Month 1 Mastery',
            monthNumber: 1,
            weekNumber: 4,
            durationMinutes: 30,
            bloomLevel: 'creating',
            bloomActionVerbs: ['present', 'evaluate', 'demonstrate', 'remedy'],
            smartObjectives: {
              overall: 'By the end of the revision week, pupils will demonstrate mastery of Month 1 competencies with at least 80% passing standard.',
              specificItems: [
                'Present their group school compound map with clear oral explanation',
                'Complete diagnostic evaluation covering greetings, counting, and flag identification',
                'Participate in individualized remediation tasks'
              ]
            },
            previousKnowledge: 'All concepts taught in Weeks 1, 2, and 3.',
            didacticMaterials: ['Completed School Map project', 'Diagnostic test sheets', 'Remedial flashcard sets'],
            didacticSteps: [
              {
                stepNumber: 1,
                title: 'Review & General Orientation',
                durationMinutes: 5,
                teacherActivity: 'Recaps key milestones accomplished during Month 1.',
                pupilActivity: 'Pupils recall topics and share their favorite learning moments.',
                didacticAids: 'Monthly milestone poster'
              },
              {
                stepNumber: 2,
                title: 'Project Presentation & Integration',
                durationMinutes: 10,
                teacherActivity: 'Invites student teams to showcase their school maps and recite sanitation rules.',
                pupilActivity: 'Pupils present maps, point out water points, and state rules.',
                didacticAids: 'School Map posters'
              },
              {
                stepNumber: 3,
                title: 'Diagnostic Summative Check',
                durationMinutes: 10,
                teacherActivity: 'Administers quick formative quiz to identify pupils needing remedial help.',
                pupilActivity: 'Pupils answer oral and short written questions individually.',
                didacticAids: 'Evaluation sheets'
              },
              {
                stepNumber: 4,
                title: 'Differentiated Remediation & Feedback',
                durationMinutes: 5,
                teacherActivity: 'Groups struggling learners for targeted reinforcement; provides enrichment to others.',
                pupilActivity: 'Pupils work on remedial exercises or enrichment puzzles.',
                didacticAids: 'Remediation cards'
              }
            ],
            chalkboardNotes: {
              title: 'MONTH 1 SYNTHESIS: What We Have Mastered',
              summary: 'In Month 1, we learned to respect school rules, greet politely, count to 10, keep clean, and honor our flag.',
              keyPoints: [
                'Polite greetings show good manners.',
                'Clean environment prevents diseases.',
                'The Cameroon flag unites us all in peace.'
              ],
              vocabularyOrFormulas: ['School', 'Cleanliness', 'Unity', 'Progress']
            },
            formativeEvaluation: {
              questions: [
                'Why is Week 4 important at the end of each month?',
                'What is your personal commitment to keeping our school clean next month?'
              ],
              expectedAnswers: [
                'To revise, evaluate our progress, fix mistakes, and finish our project.',
                'Always throw rubbish in the bin and wash hands regularly.'
              ]
            },
            remediationPlan: {
              forStrugglingPupils: 'Dedicated 1-on-1 phonics and counting drills.',
              forFastLearners: 'Assist teacher as peer mentors during remedial practice.'
            }
          }
        ]
      }
    ]
  },
  // Month 2 to 9 templates for Anglophone
  {
    monthNumber: 2,
    monthName: 'October (Month 2)',
    termNumber: 1,
    subsystem: 'anglophone',
    iltTheme: 'The Family, Home & Domestic Safety',
    monthlyProject: {
      title: 'Family Tree Poster & Home Safety Guide',
      objective: 'Pupils chart family members, assign duties, and compile a domestic hazard checklist (fire, sharp objects, clean water storage).',
      practicalTasks: ['Drawing parents, siblings, grandparents', 'Labeling kitchen safety rules', 'Modeling a traditional hut with thatch roof'],
      requiredLocalMaterials: ['Cardboard', 'Bamboo splints', 'Colored threads', 'Clay'],
      expectedOutcome: 'Individual illustrated family albums and home safety wall charts.',
      weeklyMilestones: {
        week1: 'Identifying nuclear and extended family members',
        week2: 'Exploring household chores and mutual help',
        week3: 'Domestic hazard prevention and kitchen safety',
        week4: 'Summative evaluation, project assembly, and remediation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 3,
    monthName: 'November (Month 3)',
    termNumber: 1,
    subsystem: 'anglophone',
    iltTheme: 'Health, Hygiene & Sanitation',
    monthlyProject: {
      title: 'Handwashing & Safe Drinking Water Campaign',
      objective: 'Pupils construct a tippy-tap handwashing device using empty plastic bottles and demonstrate water filtration.',
      practicalTasks: ['Constructing tippy-tap dispenser', 'Practicing 6-step handwashing', 'Learning boiling and decanting water'],
      requiredLocalMaterials: ['Empty 1.5L bottles', 'Twine/string', 'Soap', 'Charcoal and sand filters'],
      expectedOutcome: 'Operational tippy-tap handwash stations outside classrooms.',
      weeklyMilestones: {
        week1: 'Understanding germs and water-borne sicknesses',
        week2: 'Building tippy-tap dispenser models',
        week3: 'School-wide handwashing demonstration',
        week4: 'Term 1 review, project commissioning, and diagnostic remediation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 4,
    monthName: 'December (Month 4)',
    termNumber: 2,
    subsystem: 'anglophone',
    iltTheme: 'Community Trades, Crafts & Occupations',
    monthlyProject: {
      title: 'Local Tradesmen Showcase & Model Workshop',
      objective: 'Pupils interview community craftsmen (farmer, carpenter, tailor, potter) and build miniature model craft tools.',
      practicalTasks: ['Listing community jobs', 'Crafting miniature wooden tools from scrap', 'Mini marketplace roleplay in class'],
      requiredLocalMaterials: ['Scrap wood', 'Fabric scraps', 'Raffia', 'Cardboard boxes'],
      expectedOutcome: 'Classroom exhibition of traditional occupations and handmade models.',
      weeklyMilestones: {
        week1: 'Survey of jobs in the local village/town',
        week2: 'Tools used by carpenters, farmers, and seamstresses',
        week3: 'Commercial exchange role-play using play FCFA money',
        week4: 'Monthly revision, trade show presentation, remediation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 5,
    monthName: 'January (Month 5)',
    termNumber: 2,
    subsystem: 'anglophone',
    iltTheme: 'Transportation & Communication in Cameroon',
    monthlyProject: {
      title: 'Road Safety Board & Traditional Signal Drum',
      objective: 'Pupils fabricate miniature traffic signs and build a model traditional slit wooden drum (talking drum / nkul).',
      practicalTasks: ['Constructing Zebra crossing model', 'Learning traffic warden signals', 'Demonstrating traditional message drums'],
      requiredLocalMaterials: ['Cardboard', 'Bamboo sticks', 'Hollow bamboo', 'Paint'],
      expectedOutcome: 'Pedestrian safety simulation game and cultural sound signaling demonstration.',
      weeklyMilestones: {
        week1: 'Modes of transport in Cameroon (road, rail, air, river)',
        week2: 'Traffic signs, pedestrian rules, and helmet safety',
        week3: 'Traditional vs modern communication devices',
        week4: 'Monthly evaluation, road safety drill, remediation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 6,
    monthName: 'February (Month 6)',
    termNumber: 2,
    subsystem: 'anglophone',
    iltTheme: 'The Natural Environment, Weather & Agriculture',
    monthlyProject: {
      title: 'Weather Station Instrument & School Garden Nursery',
      objective: 'Pupils construct an improvised rain gauge and wind vane, and plant seedbeds for local vegetables.',
      practicalTasks: ['Constructing plastic bottle rain gauge', 'Building cardboard arrow wind vane', 'Nursery seedbed planting of amaranth/tomatoes'],
      requiredLocalMaterials: ['Clear plastic bottles', 'Rulers', 'Straws', 'Rich topsoil', 'Local seeds'],
      expectedOutcome: 'Active daily weather monitoring station and flourishing seedbed.',
      weeklyMilestones: {
        week1: 'Dry season vs rainy season characteristics in Cameroon',
        week2: 'Building weather instruments and daily recording chart',
        week3: 'Preparing compost and planting nursery seeds',
        week4: 'Term 2 revision, agricultural record check, remediation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 7,
    monthName: 'March (Month 7)',
    termNumber: 3,
    subsystem: 'anglophone',
    iltTheme: 'Cameroon, Our Beloved Country (10 Regions)',
    monthlyProject: {
      title: '3D Relief Map of Cameroon & Regional Culture Quilt',
      objective: 'Pupils build a 3D salt-dough map showing the 10 administrative regions and attach regional artifacts.',
      practicalTasks: ['Molding relief of Mount Cameroon and Adamawa plateau', 'Pinning the 10 regional capitals', 'Displaying regional food specialties'],
      requiredLocalMaterials: ['Flour and salt dough / clay', 'Tempera paint', 'Toothpicks and paper flags', 'Cardboard backing'],
      expectedOutcome: 'A large, detailed 3D map of Cameroon installed in the school hallway.',
      weeklyMilestones: {
        week1: 'The 10 regions of Cameroon and their headquarters',
        week2: 'Major landforms: mountains, rivers, savannah, coast',
        week3: 'Cultural diversity, unity in diversity, national symbols',
        week4: 'Monthly integration, regional quiz tournament, remediation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 8,
    monthName: 'April (Month 8)',
    termNumber: 3,
    subsystem: 'anglophone',
    iltTheme: 'Science, Inventions & Practical Technology',
    monthlyProject: {
      title: 'Simple Mechanical Inventions & Solar Food Dryer Model',
      objective: 'Pupils construct working models of levers, pulleys, and an improvised solar fruit dryer.',
      practicalTasks: ['Building balance levers with rulers and fulcrums', 'Rigging a spool pulley for lifting weights', 'Constructing a solar fruit drying box with mesh'],
      requiredLocalMaterials: ['Wooden rulers', 'Empty thread spools', 'Cardboard box', 'Wire mesh / mosquito netting', 'Black paint'],
      expectedOutcome: 'Functional simple machine models demonstrating conservation of effort.',
      weeklyMilestones: {
        week1: 'Principles of levers and pulleys in everyday Cameroonian life',
        week2: 'Building pulley and lever models',
        week3: 'Solar energy utilization and drying local food',
        week4: 'Monthly evaluation, practical efficiency testing, remediation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 9,
    monthName: 'May/June (Month 9)',
    termNumber: 3,
    subsystem: 'anglophone',
    iltTheme: 'Living Together, Peace & Cultural Heritage',
    monthlyProject: {
      title: 'Community Peace Album & Cultural Festival Celebration',
      objective: 'Pupils produce an album of cultural solidarity, recite peace pledges, and stage traditional dances.',
      practicalTasks: ['Composing peace slogans in English, French, and local language', 'Preparing traditional dance costumes from raffia and fabric', 'End-of-year comprehensive portfolio review'],
      requiredLocalMaterials: ['Scrapbook album', 'Raffia skirts', 'Local musical shakers', 'Crayons and markers'],
      expectedOutcome: 'Grand school cultural gala and complete learner achievement dossiers.',
      weeklyMilestones: {
        week1: 'Peaceful conflict resolution and mutual respect',
        week2: 'Rehearsing traditional dances and moral dramatizations',
        week3: 'Compiling year-long project portfolios',
        week4: 'Annual promotion examination, final remediation, and graduation'
      }
    },
    weeks: []
  }
];

export const FRANCOPHONE_MONTHLY_UNITS: MonthlyUnit[] = [
  {
    monthNumber: 1,
    monthName: 'Septembre (Mois 1)',
    termNumber: 1,
    subsystem: 'francophone',
    iltTheme: 'L\'école et son environnement immédiat',
    monthlyProject: {
      title: 'Plan de l\'école et Charte de Propreté Éco-citoyenne',
      objective: 'Les élèves réalisent en commun le plan guidé de l\'école avec légende, et rédigent la charte illustrée de salubrité de la classe.',
      practicalTasks: [
        'Visite méthodique des locaux de l\'école (bureau du directeur, point d\'eau, latrines, cour)',
        'Repérage des poubelles et des zones à nettoyer quotidiennement',
        'Réalisation collective d\'une affiche avec les règles de vie de la classe'
      ],
      requiredLocalMaterials: ['Grands cartons de récupération', 'Crayons de couleur / feutres', 'Colle artisanale (amidon de manioc)', 'Bâtonnets'],
      expectedOutcome: 'Un plan mural officiel de l\'établissement et la charte de propreté affichée au tableau didactique.',
      weeklyMilestones: {
        week1: 'Observation guidée de l\'école et dénombrement des espaces',
        week2: 'Ébauche du plan au sol et repérage des points de propreté',
        week3: 'Coloriage de la légende et rédaction des règles de civisme',
        week4: 'Exposition finale, évaluation diagnostique mensuelle et remédiation'
      }
    },
    weeks: [
      {
        weekNumber: 1,
        isRevisionWeek: false,
        themeTitle: 'Découverte de la classe et civilités d\'usage',
        subtheme: 'Salutations polies, repérage dans l\'espace classe',
        fridayIntegrationActivity: {
          title: 'Activité d\'Intégration : Saynète des Bonnes Manières',
          description: 'Les élèves jouent de petits dialogues de salutation polie (Bonjour monsieur le maître, s\'il vous plaît, merci), comptent les camarades présents et identifient le matériel scolaire.',
          competenciesTargeted: 'Expression orale en français, écoute attentive, calcul élémentaire, savoir-être citoyen',
          remediationTask: 'Atelier de répétition individualisée pour les élèves timides avec gestes guidés.'
        },
        lessons: [
          {
            id: 'fr-m1-w1-lang',
            subjectId: 'fr-lang',
            subComponentId: 'fr-com-orale',
            topic: 'Les Salutations d\'Usage à l\'École',
            subTopic: 'Dire bonjour, se présenter poliment',
            lessonTitle: 'Saluer poliment le maître et ses camarades',
            monthNumber: 1,
            weekNumber: 1,
            durationMinutes: 30,
            bloomLevel: 'applying',
            bloomActionVerbs: ['saluer', 'présenter', 'nommer', 'dialoguer'],
            smartObjectives: {
              overall: 'À la fin de la séance de 30 minutes, l\'élève sera capable de saluer correctement son maître et un camarade selon le moment de la journée, sans hésitation.',
              specificItems: [
                'Employer la formule appropriée : "Bonjour Monsieur/Madame" le matin',
                'Dire clairement son prénom et son nom : "Je m\'appelle..."',
                'Adopter une posture respectueuse (regard franc, sourire, mains calmes)'
              ]
            },
            previousKnowledge: 'L\'enfant sait dire bonjour à ses parents à la maison.',
            didacticMaterials: ['Tableau noir', 'Images représentant des enfants saluant le maître avec courtoisie', 'Badges de prénoms'],
            didacticSteps: [
              {
                stepNumber: 1,
                title: 'Amorce & Révision / Éveil d\'attention',
                durationMinutes: 5,
                teacherActivity: 'Le maître entonne le chant de bienvenue : "Bonjour les amis, bonjour chers camarades !" en souriant.',
                pupilActivity: 'Les élèves écoutent, battent des mains en rythme et reprennent le refrain avec enthousiasme.',
                didacticAids: 'Voix et comptine rythmée'
              },
              {
                stepNumber: 2,
                title: 'Découverte & Observation dirigée',
                durationMinutes: 8,
                teacherActivity: 'Le maître met en scène un dialogue modèle avec un élève : "Bonjour Jean !" - "Bonjour Monsieur le maître !"',
                pupilActivity: 'Les élèves observent l\'attitude correcte (ne pas crier, regarder la personne, sourire).',
                didacticAids: 'Mise en situation réelle'
              },
              {
                stepNumber: 3,
                title: 'Fixation & Institutionnalisation',
                durationMinutes: 8,
                teacherActivity: 'Fait répéter la structure en grand groupe puis en petits groupes : "Bonjour...", "Comment vas-tu ?".',
                pupilActivity: 'Les élèves répètent chorale puis individuellement la bonne intonation.',
                didacticAids: 'Tableau noir'
              },
              {
                stepNumber: 4,
                title: 'Entraînement & Évaluation formative',
                durationMinutes: 5,
                teacherActivity: 'Invite des binômes d\'élèves à se lever et échanger les salutations sous la supervision du groupe.',
                pupilActivity: 'Les binômes jouent la saynète à tour de rôle avec correction bienveillante.',
                didacticAids: 'Grille d\'observation'
              },
              {
                stepNumber: 5,
                title: 'Conclusion & Résumé à copier',
                durationMinutes: 4,
                teacherActivity: 'Écrit la phrase de synthèse au tableau et la fait lire.',
                pupilActivity: 'Les élèves lisent ensemble puis copient soigneusement la note dans leur cahier.',
                didacticAids: 'Tableau noir et craie'
              }
            ],
            chalkboardNotes: {
              title: 'FRANÇAIS : Les Salutations Polies',
              summary: 'Saluer est la première marque de respect et de politesse à l\'école.',
              keyPoints: [
                'Le matin, je dis : « Bonjour Monsieur le maître ! »',
                'À mon camarade, je dis : « Bonjour Paul, comment vas-tu ? »',
                'Je réponds : « Je vais bien, merci ! »'
              ],
              vocabularyOrFormulas: ['Bonjour', 'Monsieur', 'Madame', 'Merci', 'Politesse']
            },
            formativeEvaluation: {
              questions: [
                'Que dis-tu au directeur de l\'école quand tu le rencontres le matin ?',
                'Comment demandes-tu poliment le prénom d\'un nouvel élève ?'
              ],
              expectedAnswers: [
                '« Bonjour Monsieur le Directeur ! »',
                '« Bonjour, comment t\'appelles-tu ? »'
              ]
            },
            remediationPlan: {
              forStrugglingPupils: 'Répétition assistée en tête-à-tête avec un tuteur pair bienveillant.',
              forFastLearners: 'Enrichir le dialogue avec les formules de politesse : « S\'il vous plaît », « Enchanté ».'
            }
          },
          {
            id: 'fr-m1-w1-math',
            subjectId: 'fr-math',
            subComponentId: 'fr-math-nombres',
            topic: 'Dénombrement d\'Objets Usuels',
            subTopic: 'Les nombres de 1 à 10 avec le matériel concret',
            lessonTitle: 'Compter et constituer des collections de 1 à 10 objets',
            monthNumber: 1,
            weekNumber: 1,
            durationMinutes: 30,
            bloomLevel: 'applying',
            bloomActionVerbs: ['compter', 'dénombrer', 'associer', 'écrire'],
            smartObjectives: {
              overall: 'À la fin de la leçon, l\'élève sera capable de dénombrer sans erreur une collection de 1 à 10 objets et d\'écrire les chiffres correspondants.',
              specificItems: [
                'Dénombrer précisément une collection de capsules ou de cailloux (1 à 10)',
                'Associer la quantité d\'objets à l\'écriture chiffrée',
                'Tracer correctement les chiffres de 1 à 5 sur l\'ardoise'
              ]
            },
            previousKnowledge: 'L\'élève sait réciter la comptine numérique orale.',
            didacticMaterials: ['Boîtes de capsules de bouteille', 'Bâtonnets de bambou', 'Cartes-chiffres de 1 à 10'],
            didacticSteps: [
              {
                stepNumber: 1,
                title: 'Rappel & Calcul mental rapide',
                durationMinutes: 5,
                teacherActivity: 'Tape dans les mains 3 fois, puis 5 fois ; demande aux élèves d\'indiquer le nombre de coups.',
                pupilActivity: 'Les élèves écoutent, comptent mentalement et lèvent les doigts correspondants.',
                didacticAids: 'Frappements de mains'
              },
              {
                stepNumber: 2,
                title: 'Situation-problème & Manipulation',
                durationMinutes: 8,
                teacherActivity: 'Pose une poignée de craies sur la table : "Combien de craies y a-t-il exactement ?"',
                pupilActivity: 'Un élève vient compter en déplaçant chaque craie l\'une après l\'autre.',
                didacticAids: 'Craies de couleur'
              },
              {
                stepNumber: 3,
                title: 'Fixation du procédé de dénombrement',
                durationMinutes: 8,
                teacherActivity: 'Explique la règle du dénombrement un à un : pointer l\'objet et énoncer un seul mot-nombre.',
                pupilActivity: 'Chaque rangée compte son lot de bâtonnets en suivant la méthode énoncée.',
                didacticAids: 'Bâtonnets'
              },
              {
                stepNumber: 4,
                title: 'Application sur ardoise & Évaluation',
                durationMinutes: 5,
                teacherActivity: 'Montre 4 doigts ou 7 capsules ; demande d\'écrire le chiffre sur l\'ardoise et lever.',
                pupilActivity: 'Les élèves écrivent le chiffre et lèvent l\'ardoise au signal du maître.',
                didacticAids: 'Ardoises et craies'
              },
              {
                stepNumber: 5,
                title: 'Synthèse & Devoir à domicile',
                durationMinutes: 4,
                teacherActivity: 'Consigne la bande numérique 1-10 au tableau.',
                pupilActivity: 'Lecture collective de gauche à droite et copie dans le cahier de cours.',
                didacticAids: 'Tableau noir'
              }
            ],
            chalkboardNotes: {
              title: 'MATHÉMATIQUES : Les nombres de 1 à 10',
              summary: 'Pour savoir combien il y a d\'objets, on les compte un à un.',
              keyPoints: [
                '1, 2, 3, 4, 5, 6, 7, 8, 9, 10.',
                'Chaque objet ne se compte qu\'une seule fois.',
                'Le dernier nombre prononcé représente la quantité totale.'
              ],
              vocabularyOrFormulas: ['Compter', 'Nombre', 'Chiffre', 'Quantité', 'Collection']
            },
            formativeEvaluation: {
              questions: [
                'Combien de doigts as-tu sur tes deux mains réunies ?',
                'Prends 6 capsules dans ta boîte et montre-les au maître.'
              ],
              expectedAnswers: [
                '10 doigts.',
                'L\'élève isole et montre exactement 6 capsules.'
              ]
            },
            remediationPlan: {
              forStrugglingPupils: 'Aligner les objets sur une ligne droite pour éviter de recompter le même objet.',
              forFastLearners: 'Compter à rebours de 10 à 1 et former des décompositions (ex: 5 c\'est 3 + 2).'
            }
          }
        ]
      },
      {
        weekNumber: 2,
        isRevisionWeek: false,
        themeTitle: 'Hygiène de l\'espace scolaire et préservation de la santé',
        subtheme: 'Tri des déchets et propreté de la cour',
        fridayIntegrationActivity: {
          title: 'Grande Opération Éco-propreté et Lavage des Mains',
          description: 'Mise en pratique collective : inspection de la cour de l\'école, ramassage des sachets plastiques, lavage des mains au savon au point d\'eau.',
          competenciesTargeted: 'Hygiène pratique, écocitoyenneté, protection de l\'environnement, coopération',
          remediationTask: 'Démonstration décomposée des étapes de friction des mains au savon.'
        },
        lessons: [
          {
            id: 'fr-m1-w2-scitech',
            subjectId: 'fr-scitech',
            subComponentId: 'fr-st-corps-sante',
            topic: 'La Propreté de Notre Environnement Scolaire',
            subTopic: 'Pourquoi et comment garder notre école propre',
            lessonTitle: 'Identifier les ordures et utiliser correctement la poubelle',
            monthNumber: 1,
            weekNumber: 2,
            durationMinutes: 30,
            bloomLevel: 'analyzing',
            bloomActionVerbs: ['identifier', 'distinguer', 'classer', 'justifier'],
            smartObjectives: {
              overall: 'À la fin de la séance, l\'élève sera capable de distinguer un espace sain d\'un espace pollué et de jeter systématiquement tout déchet dans la poubelle.',
              specificItems: [
                'Citer au moins 3 types de déchets fréquents à l\'école (emballages, épluchures, papiers)',
                'Expliquer le danger des eaux stagnantes et des immondices (paludisme, mouches)',
                'Faire le geste éco-citoyen de jeter dans la poubelle sans salir le sol'
              ]
            },
            previousKnowledge: 'L\'élève a déjà vu balayer la classe et la cour de la maison.',
            didacticMaterials: ['Poubelle de classe', 'Balai et pelle à ordures', 'Affiches comparatives (cour propre vs cour jonchée de déchets)'],
            didacticSteps: [
              {
                stepNumber: 1,
                title: 'Rappel & Mise en situation',
                durationMinutes: 5,
                teacherActivity: 'Montre un sachet de biscuit jeté sous une table et interroge : "Est-ce là sa place ?"',
                pupilActivity: 'Les élèves réagissent : "Non maître ! Il faut le mettre à la poubelle !"',
                didacticAids: 'Objet témoin dans la salle'
              },
              {
                stepNumber: 2,
                title: 'Observation comparée',
                durationMinutes: 8,
                teacherActivity: 'Affiche deux images : une école fleurie et propre, et une cour avec des flaques et des ordures.',
                pupilActivity: 'Les élèves décrivent les deux images et identifient celle qui attire les moustiques.',
                didacticAids: 'Planches illustrées didactiques'
              },
              {
                stepNumber: 3,
                title: 'Explication & Démonstration du geste citoyen',
                durationMinutes: 8,
                teacherActivity: 'Explique comment les mouches et moustiques transmettent des maladies graves dans les dépotoirs sauvages.',
                pupilActivity: 'Les élèves écoutent, posent des questions et retiennent le lien entre saleté et maladie.',
                didacticAids: 'Schéma au tableau'
              },
              {
                stepNumber: 4,
                title: 'Entraînement pratique',
                durationMinutes: 5,
                teacherActivity: 'Organise le passage des chefs de rangée pour vider les corbeilles au bac central.',
                pupilActivity: 'Les élèves appliquent la consigne dans le calme.',
                didacticAids: 'Poubelles'
              },
              {
                stepNumber: 5,
                title: 'Synthèse & Résumé de cours',
                durationMinutes: 4,
                teacherActivity: 'Consigne le résumé de sciences au tableau noir.',
                pupilActivity: 'Lecture expressive à haute voix et transcription dans le cahier.',
                didacticAids: 'Tableau noir'
              }
            ],
            chalkboardNotes: {
              title: 'SCIENCES : Une École Propre et Saine',
              summary: 'Garder l\'école propre protège notre santé contre les maladies.',
              keyPoints: [
                'Je jette toujours les papiers et sachets dans la poubelle.',
                'Les tas d\'ordures attirent les mouches et les moustiques.',
                'Une cour propre évite le choléra et le paludisme.'
              ],
              vocabularyOrFormulas: ['Poubelle', 'Déchet', 'Hygiène', 'Salubrité', 'Maladie']
            },
            formativeEvaluation: {
              questions: [
                'Où dois-tu jeter la peau de banane après la récréation ?',
                'Quel insecte dangereux se reproduit dans les eaux sales stagnantes ?'
              ],
              expectedAnswers: [
                'Dans la poubelle de l\'école.',
                'Le moustique (anophèle).'
              ]
            },
            remediationPlan: {
              forStrugglingPupils: 'Accompagnement physique direct vers la poubelle avec encouragement.',
              forFastLearners: 'Dessiner sur une feuille un panneau d\'interdiction de jeter les ordures par terre.'
            }
          }
        ]
      },
      {
        weekNumber: 3,
        isRevisionWeek: false,
        themeTitle: 'Les Symboles Républicains et l\'Amour de la Patrie',
        subtheme: 'Le Drapeau du Cameroun et l\'Hymne National',
        fridayIntegrationActivity: {
          title: 'Cérémonie Civique et Rassemblement Patriotique',
          description: 'Simulation de la levée des couleurs : monter le drapeau, se tenir au garde-à-vous, entonner l\'hymne national en chœur, expliquer le rôle de l\'école républicaine.',
          competenciesTargeted: 'Civisme, respect des emblèmes républicains, posture solennelle, chant choral',
          remediationTask: 'Répétition strophe par strophe du refrain de l\'Hymne National.'
        },
        lessons: [
          {
            id: 'fr-m1-w3-shs',
            subjectId: 'fr-humaines',
            subComponentId: 'fr-shs-citoyennete',
            topic: 'Les Emblèmes de la République du Cameroun',
            subTopic: 'Le Drapeau National : Vert, Rouge, Jaune',
            lessonTitle: 'Description et signification des couleurs du drapeau national',
            monthNumber: 1,
            weekNumber: 3,
            durationMinutes: 30,
            bloomLevel: 'understanding',
            bloomActionVerbs: ['décrire', 'identifier', 'colorier', 'expliquer'],
            smartObjectives: {
              overall: 'À la fin de la séance, l\'élève sera capable de décrire avec exactitude le drapeau du Cameroun et d\'expliquer la disposition des trois bandes verticales et de l\'étoile.',
              specificItems: [
                'Nommer les trois couleurs de gauche à droite : Vert, Rouge, Jaune',
                'Localiser l\'étoile d\'or au centre de la bande rouge',
                'Prendre la position du garde-à-vous lors de la montée du drapeau'
              ]
            },
            previousKnowledge: 'L\'élève assiste chaque lundi matin au rassemblement devant le mât du drapeau.',
            didacticMaterials: ['Véritable drapeau du Cameroun en tissu', 'Dessin du drapeau au tableau', 'Crayons de couleur (vert, rouge, jaune)'],
            didacticSteps: [
              {
                stepNumber: 1,
                title: 'Rappel & Éveil civique',
                durationMinutes: 5,
                teacherActivity: 'Demande aux élèves : "Qu\'avons-nous chanté lundi matin devant le mât dans la cour ?"',
                pupilActivity: 'Les élèves répondent : "L\'Hymne National du Cameroun !"',
                didacticAids: 'Référence au rassemblement'
              },
              {
                stepNumber: 2,
                title: 'Observation méthodique de l\'emblème',
                durationMinutes: 8,
                teacherActivity: 'Déploie le drapeau tricolore. Fait observer les trois bandes verticales égales.',
                pupilActivity: 'Les élèves nomment les couleurs : Vert à la hampe, Rouge au milieu, Jaune au battant.',
                didacticAids: 'Drapeau officiel en tissu'
              },
              {
                stepNumber: 3,
                title: 'Signification symbolique & Institutionnalisation',
                durationMinutes: 8,
                teacherActivity: 'Explique : Vert = forêt du Sud ; Rouge = unité et sang des martyrs ; Jaune = soleil et savane du Nord ; Étoile = unité nationale.',
                pupilActivity: 'Les élèves répètent et mémorisent la symbolique de l\'unité.',
                didacticAids: 'Schéma explicatif'
              },
              {
                stepNumber: 4,
                title: 'Exercice pratique de coloriage',
                durationMinutes: 5,
                teacherActivity: 'Distribue les gabarits et vérifie l\'application des bonnes couleurs dans le bon ordre.',
                pupilActivity: 'Les élèves colorient le drapeau sans déborder.',
                didacticAids: 'Fiches de coloriage'
              },
              {
                stepNumber: 5,
                title: 'Synthèse & Prise de notes',
                durationMinutes: 4,
                teacherActivity: 'Écrit le résumé d\'éducation civique au tableau noir.',
                pupilActivity: 'Lecture à l\'unisson et copie dans le cahier de sciences humaines.',
                didacticAids: 'Tableau noir'
              }
            ],
            chalkboardNotes: {
              title: 'CITOYENNETÉ : Le Drapeau du Cameroun',
              summary: 'Le drapeau national est le symbole sacré qui unit tous les Camerounais.',
              keyPoints: [
                'Il est formé de trois bandes verticales égales : Vert, Rouge, Jaune.',
                'Il porte UNE étoile d\'or au milieu de la bande rouge.',
                'Le Vert représente la forêt, le Rouge l\'unité, le Jaune le soleil et la savane.',
                'Devant le drapeau qui monte, je me tiens debout et immobile au garde-à-vous.'
              ],
              vocabularyOrFormulas: ['Drapeau', 'Vert', 'Rouge', 'Jaune', 'Étoile d\'or', 'Unité', 'Patrie']
            },
            formativeEvaluation: {
              questions: [
                'Quelle couleur se trouve tout à fait à gauche près du mât ?',
                'Que trouve-t-on au milieu de la bande rouge ?'
              ],
              expectedAnswers: [
                'La bande verte.',
                'L\'étoile d\'or (jaune).'
              ]
            },
            remediationPlan: {
              forStrugglingPupils: 'Faire manipuler trois bandes de papier couleur pour reconstituer le drapeau.',
              forFastLearners: 'Expliquer pourquoi on dit que le Cameroun est "Une et Indivisible".'
            }
          }
        ]
      },
      {
        weekNumber: 4,
        isRevisionWeek: true,
        themeTitle: 'Semaine d\'Intégration, Révision Mensuelle, Évaluation & Remédiation',
        subtheme: 'Bilan des compétences du Mois 1 et Finalisation du Projet',
        fridayIntegrationActivity: {
          title: 'Grande Restitution du Projet et Remédiation Collective',
          description: 'Présentation officielle du Plan de l\'école et de la Charte de propreté à la direction, passation des épreuves d\'évaluation diagnostique et ateliers de soutien.',
          competenciesTargeted: 'Mobilisation coordonnée des acquis en Français, Mathématiques, Sciences et Citoyenneté',
          remediationTask: 'Groupes de besoin pour consolider la numération et l\'écriture cursive.'
        },
        lessons: [
          {
            id: 'fr-m1-w4-bilan',
            subjectId: 'fr-lang',
            subComponentId: 'fr-prod-ecrit',
            topic: 'Intégration et Évaluation Sommative Mensuelle',
            subTopic: 'Bilan d\'apprentissage du Mois 1',
            lessonTitle: 'Restituer le projet de classe et consolider les apprentissages du Mois 1',
            monthNumber: 1,
            weekNumber: 4,
            durationMinutes: 30,
            bloomLevel: 'creating',
            bloomActionVerbs: ['présenter', 'évaluer', 'consolider', 'remédier'],
            smartObjectives: {
              overall: 'Au terme de la semaine d\'intégration, au moins 85% des élèves maîtriseront les compétences de base du Mois 1 et participeront à la remédiation ciblée.',
              specificItems: [
                'Participer activement à la présentation orale du plan de l\'école',
                'Répondre aux questions de contrôle sommatif mensuel',
                'Bénéficier d\'une remédiation immédiate sur les erreurs diagnostiquées'
              ]
            },
            previousKnowledge: 'Toutes les leçons dispensées aux Semaines 1, 2 et 3.',
            didacticMaterials: ['Maquette du plan de l\'école', 'Fiches d\'évaluation sommative', 'Matériel de remédiation'],
            didacticSteps: [
              {
                stepNumber: 1,
                title: 'Mise en perspective des réalisations du mois',
                durationMinutes: 5,
                teacherActivity: 'Passe en revue avec la classe l\'ensemble du chemin parcouru pendant le Mois 1.',
                pupilActivity: 'Les élèves expriment ce qu\'ils ont appris et ce qu\'ils ont le plus apprécié.',
                didacticAids: 'Affichage des travaux d\'élèves'
              },
              {
                stepNumber: 2,
                title: 'Restitution collective du projet',
                durationMinutes: 10,
                teacherActivity: 'Coordonne l\'accrochage du Plan de l\'école et la lecture collective de la Charte.',
                pupilActivity: 'Les délégués de rangée présentent le plan avec fierté.',
                didacticAids: 'Panneau du projet mensuel'
              },
              {
                stepNumber: 3,
                title: 'Contrôle diagnostique individuel',
                durationMinutes: 10,
                teacherActivity: 'Propose une série de questions ciblées sur ardoise et feuille pour repérer les lacunes.',
                pupilActivity: 'Les élèves répondent individuellement avec sérieux.',
                didacticAids: 'Fiches de contrôle'
              },
              {
                stepNumber: 4,
                title: 'Ateliers de remédiation différenciée',
                durationMinutes: 5,
                teacherActivity: 'Forme des groupes de besoin : atelier graphisme, atelier calcul, atelier langage.',
                pupilActivity: 'Les élèves s\'exercent sur les points à consolider.',
                didacticAids: 'Cahiers et fiches d\'exercices'
              }
            ],
            chalkboardNotes: {
              title: 'BILAN DU MOIS 1 : Nos Grandes Victoires',
              summary: 'Durant ce premier mois, nous sommes devenus de véritables écoliers travailleurs et polis.',
              keyPoints: [
                'Nous savons saluer avec politesse et respecter nos camarades.',
                'Nous savons compter de 1 à 10 et prendre soin de notre matériel.',
                'Nous gardons notre école propre et honorons notre drapeau national.'
              ],
              vocabularyOrFormulas: ['Bilan', 'Réussite', 'Travail', 'Progrès', 'Cameroun']
            },
            formativeEvaluation: {
              questions: [
                'Pourquoi la 4e semaine de chaque mois est-elle si importante dans notre école ?',
                'Quel engagement personnel prends-tu pour le mois prochain ?'
              ],
              expectedAnswers: [
                'Pour réviser, évaluer nos forces et nos faiblesses, corriger nos erreurs et terminer notre projet.',
                'Toujours écouter le maître, être ponctuel et travailler avec ardeur.'
              ]
            },
            remediationPlan: {
              forStrugglingPupils: 'Accompagnement intensif en petits groupes lors des séances de délestage.',
              forFastLearners: 'Tutorat bénévole des camarades en difficulté.'
            }
          }
        ]
      }
    ]
  },
  // Month 2 to 9 templates for Francophone
  {
    monthNumber: 2,
    monthName: 'Octobre (Mois 2)',
    termNumber: 1,
    subsystem: 'francophone',
    iltTheme: 'La famille, la maison et la sécurité domestique',
    monthlyProject: {
      title: 'L\'Arbre Généalogique et Guide de Prévention Domestique',
      objective: 'Chaque élève dresse son arbre généalogique et participe à la confection d\'un guide illustré des dangers de la maison (feu, objets tranchants, médicaments).',
      practicalTasks: ['Dessin des membres de la famille', 'Identification des rôles de chacun', 'Fabrication d\'une case traditionnelle en matériaux locaux'],
      requiredLocalMaterials: ['Cartons', 'Brins de raphia', 'Argile', 'Fils de couleur'],
      expectedOutcome: 'Exposition des arbres généalogiques et maquettes de cases traditionnelles.',
      weeklyMilestones: {
        week1: 'La famille nucléaire et élargie',
        week2: 'Les tâches ménagères et la solidarité',
        week3: 'Prévention des accidents domestiques',
        week4: 'Révision mensuelle, évaluation et finalisation du projet'
      }
    },
    weeks: []
  },
  {
    monthNumber: 3,
    monthName: 'Novembre (Mois 3)',
    termNumber: 1,
    subsystem: 'francophone',
    iltTheme: 'La santé, l\'hygiène et l\'assainissement',
    monthlyProject: {
      title: 'Dispositif Tippy-Tap et Campagne Eau Potable',
      objective: 'Construction d\'un lave-mains écologique à pédale (tippy-tap) à partir de bidons recyclés pour promouvoir l\'hygiène corporelle.',
      practicalTasks: ['Perçage et suspension de bidons plastiques', 'Démonstration des 6 étapes de lavage des mains', 'Filtration de l\'eau avec sable et charbon'],
      requiredLocalMaterials: ['Bidons de 5L', 'Cordes', 'Savon local', 'Bâtons de bois'],
      expectedOutcome: 'Points de lavage des mains fonctionnels devant chaque bloc de classes.',
      weeklyMilestones: {
        week1: 'Les microbes et les maladies hydriques',
        week2: 'Montage des stations de lavage des mains',
        week3: 'Campagne de sensibilisation à l\'eau potable',
        week4: 'Bilan du Trimestre 1, évaluation sommative et remédiation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 4,
    monthName: 'Décembre (Mois 4)',
    termNumber: 2,
    subsystem: 'francophone',
    iltTheme: 'Le village, la communauté et les métiers',
    monthlyProject: {
      title: 'Exposition des Artisans et Maquette d\'un Atelier',
      objective: 'Enquêter sur les métiers du village (menuisier, forgeron, couturière, agriculteur) et fabriquer des outils miniatures en bois et raphia.',
      practicalTasks: ['Interviews des parents sur leurs professions', 'Fabrication de maquettes d\'outils', 'Jeu de rôle du marché au village avec monnaie factice'],
      requiredLocalMaterials: ['Chutes de bois', 'Bouts de tissu', 'Boîtes d\'allumettes', 'Graines'],
      expectedOutcome: 'Mini-musée des métiers du terroir camerounais en classe.',
      weeklyMilestones: {
        week1: 'Les professions et métiers d\'utilité publique',
        week2: 'Les outils et matières premières des artisans',
        week3: 'Le commerce équitable et les échanges en FCFA',
        week4: 'Évaluation mensuelle, salon des métiers et remédiation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 5,
    monthName: 'Janvier (Mois 5)',
    termNumber: 2,
    subsystem: 'francophone',
    iltTheme: 'Les moyens de transport et de communication',
    monthlyProject: {
      title: 'Panneau de Sécurité Routière et Tambour d\'Alerte Traditionnel',
      objective: 'Confection de panneaux de signalisation pour piétons et fabrication d\'un tambour à fente traditionnel (nkul) pour la communication de village.',
      practicalTasks: ['Tracé de passages piétons dans la cour', 'Apprentissage des feux tricolores', 'Démonstration des messages codés du tambour traditionnel'],
      requiredLocalMaterials: ['Cartons rigides', 'Tiges de bambou', 'Bambou creux', 'Peinture'],
      expectedOutcome: 'Parcours d\'éducation routière balisé et tambour de communication sonorisé.',
      weeklyMilestones: {
        week1: 'Les modes de transport au Cameroun',
        week2: 'La sécurité routière et la traversée de la chaussée',
        week3: 'Instruments de communication traditionnels et modernes',
        week4: 'Révision mensuelle, circuit routier et remédiation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 6,
    monthName: 'Février (Mois 6)',
    termNumber: 2,
    subsystem: 'francophone',
    iltTheme: 'La nature, les saisons et l\'agriculture',
    monthlyProject: {
      title: 'Pluviomètre Artisanal et Pépinière Maraîchère Scolaire',
      objective: 'Construction d\'un pluviomètre avec une bouteille graduée et semis de graines maraîchères (gombo, amarante/foléré) dans des godets.',
      practicalTasks: ['Graduation de bouteilles transparentes', 'Relevé quotidien des précipitations', 'Préparation du compost et semis en pépinière'],
      requiredLocalMaterials: ['Bouteilles plastiques lisses', 'Règles graduées', 'Terreau fertile', 'Graines de semence'],
      expectedOutcome: 'Station météo d\'école fonctionnelle et pépinière prête au repiquage.',
      weeklyMilestones: {
        week1: 'Saison sèche et saison des pluies au Cameroun',
        week2: 'Fabrication du pluviomètre et de la girouette',
        week3: 'Semis et entretien des jeunes pousses maraîchères',
        week4: 'Bilan du Trimestre 2, évaluation pratique et remédiation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 7,
    monthName: 'Mars (Mois 7)',
    termNumber: 3,
    subsystem: 'francophone',
    iltTheme: 'Le Cameroun, mon beau pays (10 Régions)',
    monthlyProject: {
      title: 'Carte en Relief du Cameroun et Fresque des 10 Régions',
      objective: 'Modelage d\'une grande carte en pâte à sel avec les reliefs (Mont Cameroun, falaise de Ngaoundéré), fleuves (Sanaga, Bénoué) et chefs-lieux régionaux.',
      practicalTasks: ['Malaxage de la pâte à modeler', 'Modelage des massifs et plaines', 'Positionnement des fanions des 10 capitales régionales'],
      requiredLocalMaterials: ['Farine, sel, eau', 'Gouaches de couleur', 'Plaque de contreplaqué ou carton fort', 'Cure-dents'],
      expectedOutcome: 'Grande carte géographique en relief exposée dans la salle polyvalente.',
      weeklyMilestones: {
        week1: 'Les 10 régions administratives et leurs chefs-lieux',
        week2: 'Le relief, les fleuves et les climats du Cameroun',
        week3: 'Les richesses agricoles et minières nationales',
        week4: 'Grand tournoi de questions régionales, évaluation et remédiation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 8,
    monthName: 'Avril (Mois 8)',
    termNumber: 3,
    subsystem: 'francophone',
    iltTheme: 'Les sciences, les inventions et les techniques',
    monthlyProject: {
      title: 'Machines Simples et Séchoir Solaire Alimentaire',
      objective: 'Réalisation d\'un modèle réduit de séchoir solaire pour fruits et d\'un système de poulie pour monter des charges.',
      practicalTasks: ['Fabrication d\'un levier avec pivot en bois', 'Montage d\'une poulie avec bobine de fil', 'Conception d\'un séchoir à banane et mangue'],
      requiredLocalMaterials: ['Boîtes en carton', 'Plastique transparent', 'Moustiquaire fine', 'Bobines et ficelles'],
      expectedOutcome: 'Appareils mécaniques fonctionnels démontrant le travail de l\'énergie solaire.',
      weeklyMilestones: {
        week1: 'Les machines simples (levier, plan incliné, poulie)',
        week2: 'Montage du système de poulie et mesure des efforts',
        week3: 'L\'énergie du soleil et la conservation des aliments',
        week4: 'Évaluation mensuelle, mise en fonctionnement et remédiation'
      }
    },
    weeks: []
  },
  {
    monthNumber: 9,
    monthName: 'Mai/Juin (Mois 9)',
    termNumber: 3,
    subsystem: 'francophone',
    iltTheme: 'La paix, le vivre-ensemble et le patrimoine culturel',
    monthlyProject: {
      title: 'Le Grand Livre de la Paix et Festival des Danses Patrimoniales',
      objective: 'Création d\'un recueil collectif de poèmes et proverbes sur la paix et prestation de danses traditionnelles lors de la fête de fin d\'année.',
      practicalTasks: ['Rédaction de devises de tolérance et de paix', 'Fabrication de masques et costumes en raphia', 'Répétition de danses traditionnelles'],
      requiredLocalMaterials: ['Feuilles à dessin', 'Fibres de raphia', 'Graines sonores', 'Crayons et gouache'],
      expectedOutcome: 'Livre d\'or de la fraternité et spectacle culturel de fin d\'année scolaire.',
      weeklyMilestones: {
        week1: 'La résolution non-violente des différends',
        week2: 'Les contes et légendes des quatre aires culturelles',
        week3: 'Répétition générale du festival des arts',
        week4: 'Examens de fin d\'année, évaluation sommative finale et palmarès'
      }
    },
    weeks: []
  }
];

// Helper to retrieve monthly unit
export function getMonthlyUnit(subsystem: SubsystemType, monthNumber: number): MonthlyUnit | undefined {
  const list = subsystem === 'anglophone' ? ANGLOPHONE_MONTHLY_UNITS : FRANCOPHONE_MONTHLY_UNITS;
  return list.find(m => m.monthNumber === monthNumber);
}

// Helper to retrieve subjects for subsystem
export function getSubjects(subsystem: SubsystemType): Subject[] {
  return subsystem === 'anglophone' ? ANGLOPHONE_SUBJECTS : FRANCOPHONE_SUBJECTS;
}

// Helper to retrieve time allocations for subsystem
export function getTimeAllocations(subsystem: SubsystemType): SubjectAllocation[] {
  return subsystem === 'anglophone' ? ANGLOPHONE_TIME_ALLOCATIONS : FRANCOPHONE_TIME_ALLOCATIONS;
}
