/**
 * Bloom's Taxonomy Engine for Cameroon Primary Education
 * Grounded in Revised Bloom's Taxonomy & Cameroon Pedagogical Norms
 */

import { BloomLevel, SubsystemType } from '../types/curriculum';

export interface BloomLevelMeta {
  key: BloomLevel;
  nameEn: string;
  nameFr: string;
  order: number;
  color: string;
  bgLight: string;
  descriptionEn: string;
  descriptionFr: string;
  actionVerbsEn: string[];
  actionVerbsFr: string[];
  questionStemsEn: string[];
  questionStemsFr: string[];
}

export const BLOOM_LEVELS: Record<BloomLevel, BloomLevelMeta> = {
  remembering: {
    key: 'remembering',
    order: 1,
    nameEn: 'Remembering (Knowledge)',
    nameFr: 'Connaissance / Mémorisation',
    color: '#0284c7', // Sky Blue
    bgLight: 'bg-sky-50 text-sky-800 border-sky-200',
    descriptionEn: 'Retrieving, recognizing, and recalling relevant knowledge from long-term memory (facts, terms, basic concepts, formulas).',
    descriptionFr: 'Restituer, reconnaître et rappeler des informations, définitions, règles ou faits mémorisés.',
    actionVerbsEn: ['define', 'list', 'name', 'identify', 'recall', 'state', 'match', 'label', 'recite', 'spell'],
    actionVerbsFr: ['définir', 'citer', 'nommer', 'énumérer', 'reconnaître', 'épeler', 'rappeler', 'désigner', 'relier'],
    questionStemsEn: [
      'What is the definition of...?',
      'Can you list the five...?',
      'Who is the founder of...?',
      'Match each tool to its...'
    ],
    questionStemsFr: [
      "Quelle est la définition de... ?",
      "Peux-tu citer les trois parties de... ?",
      "Nomme les éléments constitutifs de...",
      "Relie chaque instrument à son..."
    ]
  },
  understanding: {
    key: 'understanding',
    order: 2,
    nameEn: 'Understanding (Comprehension)',
    nameFr: 'Compréhension',
    color: '#0d9488', // Teal
    bgLight: 'bg-teal-50 text-teal-800 border-teal-200',
    descriptionEn: 'Constructing meaning from instructional messages, explaining ideas or concepts in own words, classifying, summarizing.',
    descriptionFr: 'Construire du sens, expliquer une idée avec ses propres mots, interpréter, reformuler ou classifier.',
    actionVerbsEn: ['explain', 'describe', 'summarize', 'classify', 'distinguish', 'paraphrase', 'illustrate', 'compare'],
    actionVerbsFr: ['expliquer', 'décrire', 'résumer', 'classer', 'distinguer', 'reformuler', 'illustrer', 'comparer'],
    questionStemsEn: [
      'Explain why the plant needs...',
      'How would you describe in your own words...?',
      'Can you classify these animals into...?',
      'What is the main idea of...?'
    ],
    questionStemsFr: [
      "Explique pourquoi la plante a besoin de... ?",
      "Comment décrirais-tu avec tes propres mots... ?",
      "Classe ces animaux selon leur régime...",
      "Quelle est l'idée principale du texte... ?"
    ]
  },
  applying: {
    key: 'applying',
    order: 3,
    nameEn: 'Applying (Application)',
    nameFr: 'Application',
    color: '#16a34a', // Green
    bgLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    descriptionEn: 'Carrying out or using a procedure in a given situation; solving problems by applying acquired rules and facts.',
    descriptionFr: 'Utiliser une règle, un calcul, un procédé ou une démarche dans une situation concrète nouvelle.',
    actionVerbsEn: ['calculate', 'solve', 'apply', 'demonstrate', 'use', 'execute', 'construct', 'measure', 'operate'],
    actionVerbsFr: ['calculer', 'résoudre', 'appliquer', 'démontrer', 'utiliser', 'exécuter', 'construire', 'mesurer', 'pratiquer'],
    questionStemsEn: [
      'Calculate the total cost of buying...',
      'How would you apply this rule to solve...?',
      'Demonstrate how to wash hands using...',
      'Construct a sentence containing...'
    ],
    questionStemsFr: [
      "Calcule le prix total de ces 3 articles...",
      "Applique la règle d'accord pour compléter...",
      "Démontre les gestes pour purifier l'eau avec...",
      "Construis une phrase avec le verbe..."
    ]
  },
  analyzing: {
    key: 'analyzing',
    order: 4,
    nameEn: 'Analyzing (Analysis)',
    nameFr: 'Analyse',
    color: '#d97706', // Amber
    bgLight: 'bg-amber-50 text-amber-800 border-amber-200',
    descriptionEn: 'Breaking material into constituent parts, determining how parts relate to one another and to an overall structure.',
    descriptionFr: 'Décomposer un tout en parties, identifier les liens logiques, comparer et différencier des composantes.',
    actionVerbsEn: ['analyze', 'differentiate', 'categorize', 'compare', 'contrast', 'examine', 'separate', 'infer'],
    actionVerbsFr: ['analyser', 'différencier', 'catégoriser', 'comparer', 'opposer', 'examiner', 'décomposer', 'déduire'],
    questionStemsEn: [
      'What are the similarities and differences between...?',
      'Differentiate between an herbivore and a carnivore in...',
      'Why did this historical event occur in Cameroon...?',
      'Examine the chart and deduce...'
    ],
    questionStemsFr: [
      "Quelles sont les différences majeures entre... ?",
      "Différencie la racine pivotante de la racine fasciculée...",
      "Pourquoi ce traité historique a-t-il été signé au Cameroun ?",
      "Examine le tableau et déduis la cause de..."
    ]
  },
  evaluating: {
    key: 'evaluating',
    order: 5,
    nameEn: 'Evaluating (Evaluation)',
    nameFr: 'Évaluation / Jugement critique',
    color: '#e11d48', // Rose/Red
    bgLight: 'bg-rose-50 text-rose-800 border-rose-200',
    descriptionEn: 'Making judgments based on criteria and standards, checking, critiquing, validating arguments or methods.',
    descriptionFr: 'Porter un jugement argumenté fondé sur des critères précis, vérifier, apprécier la valeur ou la justesse.',
    actionVerbsEn: ['evaluate', 'judge', 'justify', 'assess', 'defend', 'critique', 'verify', 'recommend', 'rate'],
    actionVerbsFr: ['évaluer', 'juger', 'justifier', 'apprécier', 'défendre', 'critiquer', 'vérifier', 'recommander', 'estimer'],
    questionStemsEn: [
      'Do you agree with the character\'s action? Justify...',
      'Assess which hygiene method is most effective for...',
      'Verify whether this calculation is correct and explain why...',
      'Recommend the best farming practice for our region...'
    ],
    questionStemsFr: [
      "Es-tu d'accord avec l'attitude du personnage ? Justifie...",
      "Apprécie quelle méthode de conservation est la plus saine...",
      "Vérifie si ce résultat mathématique est exact et explique...",
      "Recommande la meilleure pratique agricole pour la zone..."
    ]
  },
  creating: {
    key: 'creating',
    order: 6,
    nameEn: 'Creating (Synthesis & Creation)',
    nameFr: 'Création / Synthèse',
    color: '#7c3aed', // Purple
    bgLight: 'bg-purple-50 text-purple-800 border-purple-200',
    descriptionEn: 'Putting elements together to form a coherent whole, generating new ideas, designing a product or plan.',
    descriptionFr: 'Combiner des éléments pour concevoir un tout cohérent, formuler un plan, fabriquer ou inventer.',
    actionVerbsEn: ['design', 'compose', 'construct', 'formulate', 'invent', 'produce', 'devise', 'develop', 'create'],
    actionVerbsFr: ['concevoir', 'composer', 'fabriquer', 'formuler', 'inventer', 'produire', 'élaborer', 'développer', 'créer'],
    questionStemsEn: [
      'Design a poster showing how to protect our local water source...',
      'Compose a short 4-line poem about peace in Cameroon...',
      'Construct a simple model of a bridge using local sticks and bamboo...',
      'Devise an action plan to keep the classroom tidy...'
    ],
    questionStemsFr: [
      "Conçois une affiche montrant comment protéger la source d'eau...",
      "Compose un court poème de 4 vers sur le vivre-ensemble...",
      "Fabrique une maquette d'un grenier avec du raphia et de l'argile...",
      "Élabore un plan d'action pour rendre la cour propre..."
    ]
  }
};

export function getBloomMeta(level: BloomLevel): BloomLevelMeta {
  return BLOOM_LEVELS[level] || BLOOM_LEVELS.understanding;
}

export function formatSmartObjective(
  subsystem: SubsystemType,
  level: BloomLevel,
  actionVerb: string,
  targetTopic: string,
  measurableCriteria: string,
  timeframe = '30 minutes'
): string {
  if (subsystem === 'francophone') {
    return `À la fin de la séance (${timeframe}), l'élève sera capable de : ${actionVerb} ${targetTopic} en respectant ${measurableCriteria}, de manière autonome.`;
  }
  return `By the end of the ${timeframe} lesson, pupils will be able to: ${actionVerb} ${targetTopic} with at least ${measurableCriteria} accuracy.`;
}
