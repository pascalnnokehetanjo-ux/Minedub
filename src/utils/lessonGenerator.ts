/**
 * Lesson Plan & Curriculum Generator Engine
 * Generates coherent Monthly Program, Weekly Timetable/Plan, and Individual Lesson Notes
 * Grounded in MINEDUB 2018 Specifications & Bloom's Taxonomy
 */

import {
  SubsystemType,
  LevelType,
  ClassType,
  BloomLevel,
  LessonContent,
  WeekPlan,
  MonthlyUnit,
  SchoolAdministrativeInfo,
  TimetableSlot
} from '../types/curriculum';
import {
  getSubjects,
  getTimeAllocations,
  getMonthlyUnit
} from '../data/curriculumData';
import { getBloomMeta } from './bloomsTaxonomy';

export interface GenerationInput {
  subsystem: SubsystemType;
  level: LevelType;
  classType: ClassType;
  monthNumber: number;
  weekNumber: number;
  subjectId: string;
  subComponentId: string;
  topic?: string;
  lessonTitle?: string;
  bloomLevel?: BloomLevel;
}

export function getLevelName(subsystem: SubsystemType, level: LevelType): string {
  if (subsystem === 'francophone') {
    switch (level) {
      case 'level-1': return 'Niveau 1 (SIL - CP)';
      case 'level-2': return 'Niveau 2 (CE1 - CE2)';
      case 'level-3': return 'Niveau 3 (CM1 - CM2)';
    }
  }
  switch (level) {
    case 'level-1': return 'Level 1 (Class 1 & 2)';
    case 'level-2': return 'Level 2 (Class 3 & 4)';
    case 'level-3': return 'Level 3 (Class 5 & 6)';
  }
}

export function getClassName(subsystem: SubsystemType, classType: ClassType): string {
  const map: Record<string, string> = {
    'class-1': 'Class 1',
    'class-2': 'Class 2',
    'class-3': 'Class 3',
    'class-4': 'Class 4',
    'class-5': 'Class 5',
    'class-6': 'Class 6',
    'sil': 'Section d\'Initiation au Langage (SIL)',
    'cp': 'Cours Préparatoire (CP)',
    'ce1': 'Cours Élémentaire 1 (CE1)',
    'ce2': 'Cours Élémentaire 2 (CE2)',
    'cm1': 'Cours Moyen 1 (CM1)',
    'cm2': 'Cours Moyen 2 (CM2)'
  };
  return map[classType] || classType;
}

/**
 * Returns the period length in minutes for a given level
 */
export function getPeriodDuration(level: LevelType): number {
  switch (level) {
    case 'level-1': return 30;
    case 'level-2': return 35;
    case 'level-3': return 40;
  }
}

/**
 * Computes statutory hours for a subject per day, per week, and per month
 */
export function getSubjectTimeBreakdown(
  subsystem: SubsystemType,
  level: LevelType,
  subjectId: string
) {
  const allocations = getTimeAllocations(subsystem);
  const found = allocations.find(a => a.subjectId === subjectId);
  const weeklyMinutes = found
    ? (level === 'level-1' ? found.level1WeeklyMinutes : level === 'level-2' ? found.level2WeeklyMinutes : found.level3WeeklyMinutes)
    : 120;

  const weeklyHours = (weeklyMinutes / 60).toFixed(1);
  const monthlyMinutes = weeklyMinutes * 4;
  const monthlyHours = (monthlyMinutes / 60).toFixed(1);
  const dailyAverageMinutes = Math.round(weeklyMinutes / 5);
  const periodsCount = found
    ? (level === 'level-1' ? found.periodsPerWeek.level1 : level === 'level-2' ? found.periodsPerWeek.level2 : found.periodsPerWeek.level3)
    : 4;

  return {
    weeklyMinutes,
    weeklyHours,
    monthlyMinutes,
    monthlyHours,
    dailyAverageMinutes,
    periodsCount,
    dailyDistributionHint: found?.dailyPeriodsHint || 'Distributed Mon-Fri'
  };
}

/**
 * Generates an authentic individual lesson plan grounded in MINEDUB 2018
 */
export function generateIndividualLessonPlan(input: GenerationInput): LessonContent {
  const {
    subsystem,
    level,
    monthNumber,
    weekNumber,
    subjectId,
    subComponentId,
    topic,
    lessonTitle,
    bloomLevel = 'applying'
  } = input;

  const subjects = getSubjects(subsystem);
  const subject = subjects.find(s => s.id === subjectId) || subjects[0];
  const subComponent = subject.subComponents.find(c => c.id === subComponentId) || subject.subComponents[0];
  const duration = getPeriodDuration(level);
  const bloom = getBloomMeta(bloomLevel);

  const effectiveTopic = topic?.trim() || (subsystem === 'francophone' ? `Notion fondamentale de ${subComponent.name}` : `Core Concepts in ${subComponent.name}`);
  const effectiveTitle = lessonTitle?.trim() || (subsystem === 'francophone' ? `Étude pratique et application de : ${effectiveTopic}` : `Practical Study and Application of ${effectiveTopic}`);

  if (weekNumber === 4) {
    // Week 4 is reserved for Monthly Revision, Evaluation, Remediation, and Integration
    if (subsystem === 'francophone') {
      return {
        id: `plan-${subsystem}-${monthNumber}-w4-${subjectId}`,
        lessonTitle: `Bilan Mensuel, Intégration et Remédiation : ${subject.name}`,
        subTopic: 'Consolidation des acquis du mois et remédiation diagnostique',
        topic: `Révision Générale du Mois ${monthNumber}`,
        subComponentId: subComponent.id,
        subjectId: subject.id,
        monthNumber,
        weekNumber: 4,
        durationMinutes: duration,
        bloomLevel: 'evaluating',
        bloomActionVerbs: ['évaluer', 'diagnostiquer', 'justifier', 'consolider', 'remédier'],
        smartObjectives: {
          overall: `À la fin de la séance d'intégration (${duration} min), l'élève sera capable d'évaluer ses connaissances sur les thèmes du Mois ${monthNumber} et de corriger ses erreurs avec succès.`,
          specificItems: [
            `Résoudre les situations d'intégration transversales portant sur ${subComponent.name}`,
            'Identifier ses points de blocage et réaliser les exercices de remédiation ciblés',
            'Démontrer la maîtrise des compétences du mois à au moins 80%'
          ]
        },
        previousKnowledge: 'Toutes les notions abordées au cours des Semaines 1, 2 et 3.',
        didacticMaterials: ['Épreuves d\'intégration diagnostique', 'Fiches de remédiation par niveau', 'Ardoises et matériel concret'],
        didacticSteps: [
          {
            stepNumber: 1,
            title: 'Rappel des acquis majeurs du mois',
            durationMinutes: Math.round(duration * 0.15),
            teacherActivity: `Passe en revue au tableau les notions clés enseignées en ${subject.name} durant le mois.`,
            pupilActivity: 'Les élèves participent au questionnement oral et rappellent les règles apprises.',
            didacticAids: 'Tableau synthétique du mois'
          },
          {
            stepNumber: 2,
            title: 'Passation de la situation d\'intégration',
            durationMinutes: Math.round(duration * 0.35),
            teacherActivity: 'Propose la situation-problème d\'intégration contextualisée au Cameroun.',
            pupilActivity: 'Les élèves mobilisent leurs acquis de manière autonome pour résoudre la tâche.',
            didacticAids: 'Fiche d\'évaluation'
          },
          {
            stepNumber: 3,
            title: 'Diagnostic immédiat et catégorisation des erreurs',
            durationMinutes: Math.round(duration * 0.20),
            teacherActivity: 'Dépouille rapidement les productions et identifie les difficultés récurrentes.',
            pupilActivity: 'Auto-évaluation et confrontation par les pairs sous guidage.',
            didacticAids: 'Grille critériée MINEDUB'
          },
          {
            stepNumber: 4,
            title: 'Ateliers de remédiation différenciée',
            durationMinutes: Math.round(duration * 0.20),
            teacherActivity: 'Anime le groupe de besoin en difficulté ; confie des tâches d\'approfondissement aux avancés.',
            pupilActivity: 'Travail en ateliers ciblés : remédiation ou enrichissement.',
            didacticAids: 'Fiches de soutien'
          },
          {
            stepNumber: 5,
            title: 'Bilan et encouragement',
            durationMinutes: Math.round(duration * 0.10),
            teacherActivity: 'Félicite les progrès réalisés et consigne les annotations au cahier journal.',
            pupilActivity: 'Les élèves recopient les corrections définitives dans leur cahier.',
            didacticAids: 'Cahiers'
          }
        ],
        chalkboardNotes: {
          title: `RÉVISION MENSUELLE & INTÉGRATION : ${subject.name.toUpperCase()}`,
          summary: `Ce mois-ci, nous avons approfondi nos compétences en ${subComponent.name} pour devenir autonomes et rigoureux.`,
          keyPoints: [
            'L\'évaluation nous permet de mesurer nos progrès et d\'apprendre de nos erreurs.',
            'La remédiation nous donne une seconde chance de réussir pleinement.',
            'L\'intégration prouve que nous savons utiliser nos connaissances dans la vie quotidienne.'
          ],
          vocabularyOrFormulas: ['Révision', 'Intégration', 'Remédiation', 'Compétence', 'Progrès']
        },
        formativeEvaluation: {
          questions: [
            `Quelle règle essentielle de ${subComponent.name} as-tu corrigée aujourd'hui ?`,
            'Comment utiliseras-tu ce savoir dans ta famille ou ton quartier ?'
          ],
          expectedAnswers: [
            'L\'élève formule avec précision la règle ou le calcul rectifié.',
            'Explication concrète d\'une application pratique dans l\'environnement immédiat.'
          ]
        },
        remediationPlan: {
          forStrugglingPupils: 'Exercices d\'étayage pas-à-pas avec recours aux réglettes et matériel concret.',
          forFastLearners: 'Élaboration de situations-problèmes inédites pour leurs camarades.'
        }
      };
    } else {
      return {
        id: `plan-${subsystem}-${monthNumber}-w4-${subjectId}`,
        lessonTitle: `Monthly Review, Integration & Diagnostic Remediation: ${subject.name}`,
        subTopic: 'Consolidation of Month Skills & Diagnostic Remediation',
        topic: `General Review of Month ${monthNumber}`,
        subComponentId: subComponent.id,
        subjectId: subject.id,
        monthNumber,
        weekNumber: 4,
        durationMinutes: duration,
        bloomLevel: 'evaluating',
        bloomActionVerbs: ['evaluate', 'assess', 'remedy', 'integrate', 'justify'],
        smartObjectives: {
          overall: `By the end of this ${duration}-minute integration session, pupils will be able to assess their mastery of Month ${monthNumber} competencies and successfully solve remedial tasks.`,
          specificItems: [
            `Solve cross-cutting integration problems relating to ${subComponent.name}`,
            'Identify personal learning gaps and complete targeted remedial exercises',
            'Achieve at least 80% accuracy on the monthly diagnostic assessment grid'
          ]
        },
        previousKnowledge: 'All lessons taught throughout Weeks 1, 2, and 3 of the month.',
        didacticMaterials: ['Diagnostic integration question sheets', 'Differentiated remedial task cards', 'Chalkboard summary grid'],
        didacticSteps: [
          {
            stepNumber: 1,
            title: 'Recap of Key Monthly Competencies',
            durationMinutes: Math.round(duration * 0.15),
            teacherActivity: `Summarizes key learning targets covered in ${subject.name} during the month.`,
            pupilActivity: 'Pupils respond to rapid recall questions and state core rules learned.',
            didacticAids: 'Monthly learning chart'
          },
          {
            stepNumber: 2,
            title: 'Diagnostic Integration Challenge',
            durationMinutes: Math.round(duration * 0.35),
            teacherActivity: 'Administers the authentic Cameroonian context problem task.',
            pupilActivity: 'Pupils tackle the challenge independently, applying learned skills.',
            didacticAids: 'Task sheets'
          },
          {
            stepNumber: 3,
            title: 'Error Analysis & Grouping',
            durationMinutes: Math.round(duration * 0.20),
            teacherActivity: 'Rapidly monitors responses and groups learners according to specific error patterns.',
            pupilActivity: 'Pupils review their working steps and participate in guided correction.',
            didacticAids: 'Marking rubric'
          },
          {
            stepNumber: 4,
            title: 'Targeted Remediation & Extension Clinics',
            durationMinutes: Math.round(duration * 0.20),
            teacherActivity: 'Guides struggling group with scaffolded tactile cues; assigns extension puzzle to fast finishers.',
            pupilActivity: 'Learners engage in differentiated practice.',
            didacticAids: 'Remediation worksheets'
          },
          {
            stepNumber: 5,
            title: 'Synthesis & Encouragement',
            durationMinutes: Math.round(duration * 0.10),
            teacherActivity: 'Affirms learner efforts and records formative diagnostic observations.',
            pupilActivity: 'Pupils write corrections neatly in their exercise books.',
            didacticAids: 'Exercise books'
          }
        ],
        chalkboardNotes: {
          title: `MONTHLY REVIEW & INTEGRATION: ${subject.name.toUpperCase()}`,
          summary: `This month we consolidated our knowledge in ${subComponent.name} to become self-reliant and competent learners.`,
          keyPoints: [
            'Regular review helps us retain knowledge permanently.',
            'Remediation gives everyone the chance to succeed.',
            'Integration helps us use classroom knowledge in our daily lives.'
          ],
          vocabularyOrFormulas: ['Review', 'Integration', 'Remediation', 'Competence', 'Success']
        },
        formativeEvaluation: {
          questions: [
            `What core concept in ${subComponent.name} did you correct during remediation?`,
            'Give a real-life example where you will use this knowledge at home.'
          ],
          expectedAnswers: [
            'Clear statement of the clarified rule or calculation.',
            'Practical real-world application in local community.'
          ]
        },
        remediationPlan: {
          forStrugglingPupils: 'One-on-one guided practice using concrete counters and visual models.',
          forFastLearners: 'Design real-world math or language puzzles for peer challenge.'
        }
      };
    }
  }

  // Weeks 1 to 3 regular lesson plans
  if (subsystem === 'francophone') {
    return {
      id: `plan-${subsystem}-${monthNumber}-w${weekNumber}-${subjectId}`,
      lessonTitle: effectiveTitle,
      subTopic: `Approfondissement : ${effectiveTopic}`,
      topic: effectiveTopic,
      subComponentId: subComponent.id,
      subjectId: subject.id,
      monthNumber,
      weekNumber,
      durationMinutes: duration,
      bloomLevel,
      bloomActionVerbs: bloom.actionVerbsFr.slice(0, 4),
      smartObjectives: {
        overall: `À la fin de la séance de ${duration} minutes, l'élève sera capable de : ${bloom.actionVerbsFr[0]} ${effectiveTopic} avec au moins 80% de réussite.`,
        specificItems: [
          `${bloom.actionVerbsFr[0].charAt(0).toUpperCase() + bloom.actionVerbsFr[0].slice(1)} avec clarté les éléments constitutifs de : ${effectiveTopic}`,
          `${bloom.actionVerbsFr[1].charAt(0).toUpperCase() + bloom.actionVerbsFr[1].slice(1)} la démarche appropriée dans au moins 3 exercices pratiques`,
          'Collaborer activement avec ses pairs en respectant les consignes de travail'
        ]
      },
      previousKnowledge: 'L\'élève a déjà observé ce phénomène dans son environnement familial ou scolaire immédiat.',
      didacticMaterials: ['Tableau noir', 'Planches murales et affiches MINEDUB', 'Objets réels et matériel de récupération local'],
      didacticSteps: [
        {
          stepNumber: 1,
          title: 'Amorce & Rappel des prérequis / Motivation',
          durationMinutes: Math.round(duration * 0.15),
          teacherActivity: `Pose une question d'éveil liée au vécu quotidien des enfants au Cameroun en rapport avec ${effectiveTopic}.`,
          pupilActivity: 'Les élèves écoutent avec curiosité, formulent leurs représentations initiales et participent.',
          didacticAids: 'Question orale stimulante'
        },
        {
          stepNumber: 2,
          title: 'Découverte & Observation dirigée / Problématisation',
          durationMinutes: Math.round(duration * 0.25),
          teacherActivity: `Présente la situation-problème concrète ou le texte support illustré. Guide l'observation.`,
          pupilActivity: 'Les élèves observent, manipulent le matériel et émettent des hypothèses.',
          didacticAids: 'Matériel didactique concret'
        },
        {
          stepNumber: 3,
          title: 'Fixation & Institutionnalisation de la règle',
          durationMinutes: Math.round(duration * 0.25),
          teacherActivity: `Dégage la notion clé avec les élèves et écrit la règle claire au tableau noir.`,
          pupilActivity: 'Les élèves répètent, reformulent avec leurs propres mots et intègrent la démarche.',
          didacticAids: 'Tableau noir'
        },
        {
          stepNumber: 4,
          title: 'Entraînement guidé & Travail sur ardoise',
          durationMinutes: Math.round(duration * 0.20),
          teacherActivity: `Propose une série d'exercices d'application graduelle ; contrôle l'exécution sur ardoise.`,
          pupilActivity: 'Les élèves réalisent les exercices, lèvent leurs ardoises et s\'auto-corrigent.',
          didacticAids: 'Ardoises et craies'
        },
        {
          stepNumber: 5,
          title: 'Synthèse, Évaluation formative & Résumé à copier',
          durationMinutes: Math.round(duration * 0.15),
          teacherActivity: `Fait faire la synthèse orale, valide le résumé et dicte le devoir à faire à la maison.`,
          pupilActivity: 'Les élèves lisent le résumé en chœur et le copient soigneusement dans leur cahier.',
          didacticAids: 'Cahiers de cours'
        }
      ],
      chalkboardNotes: {
        title: `${subject.name.toUpperCase()} : ${effectiveTopic.toUpperCase()}`,
        summary: `La maîtrise de ${effectiveTopic} est indispensable pour réussir nos activités scolaires et quotidiennes.`,
        keyPoints: [
          `Définition et rôle : ${effectiveTopic} s'applique selon les règles vues en classe.`,
          'Précautions et méthode : toujours procéder avec soin, étape par étape.',
          'Conséquence : un travail rigoureux garantit la réussite de l\'écolier.'
        ],
        vocabularyOrFormulas: [effectiveTopic, 'Règle', 'Application', 'Cameroun', 'Exemple']
      },
      formativeEvaluation: {
        questions: [
          `Cite les deux règles principales à respecter concernant ${effectiveTopic}.`,
          'Résous l\'exercice d\'application n°1 inscrit au tableau.'
        ],
        expectedAnswers: [
          'Réponse attendue conforme aux points de la règle institutionnalisée.',
          'Résolution exacte avec justification de la méthode.'
        ]
      },
      remediationPlan: {
        forStrugglingPupils: 'Accompagnement individualisé avec fiches simplifiées et support visuel.',
        forFastLearners: 'Proposer un exercice d\'enrichissement ou une situation de recherche autonome.'
      }
    };
  }

  // Anglophone regular lesson plan
  return {
    id: `plan-${subsystem}-${monthNumber}-w${weekNumber}-${subjectId}`,
    lessonTitle: effectiveTitle,
    subTopic: `In-depth Study of ${effectiveTopic}`,
    topic: effectiveTopic,
    subComponentId: subComponent.id,
    subjectId: subject.id,
    monthNumber,
    weekNumber,
    durationMinutes: duration,
    bloomLevel,
    bloomActionVerbs: bloom.actionVerbsEn.slice(0, 4),
    smartObjectives: {
      overall: `By the end of the ${duration}-minute lesson, pupils will be able to: ${bloom.actionVerbsEn[0]} ${effectiveTopic} with at least 80% accuracy.`,
      specificItems: [
        `${bloom.actionVerbsEn[0].charAt(0).toUpperCase() + bloom.actionVerbsEn[0].slice(1)} key facts and terms associated with ${effectiveTopic}`,
        `${bloom.actionVerbsEn[1].charAt(0).toUpperCase() + bloom.actionVerbsEn[1].slice(1)} the acquired procedure in 3 practice exercises independently`,
        'Demonstrate disciplined participation and respect for classroom rules'
      ]
    },
    previousKnowledge: 'Pupils have had basic exposure to this concept through everyday community observations in Cameroon.',
    didacticMaterials: ['Chalkboard and colored chalk', 'MINEDUB approved textbook / syllabus guide', 'Real concrete teaching aids and local samples'],
    didacticSteps: [
      {
        stepNumber: 1,
        title: 'Introduction / Review & Motivation',
        durationMinutes: Math.round(duration * 0.15),
        teacherActivity: `Engages pupils with an interactive local real-world prompt related to ${effectiveTopic}.`,
        pupilActivity: 'Pupils listen actively, share initial experiences, and connect to prior knowledge.',
        didacticAids: 'Real-life hook'
      },
      {
        stepNumber: 2,
        title: 'Presentation & Discovery Stage',
        durationMinutes: Math.round(duration * 0.25),
        teacherActivity: `Presents concrete teaching aids or reads problem scenario; models the correct procedure.`,
        pupilActivity: 'Pupils observe demonstrative actions, ask clarifying questions, and participate.',
        didacticAids: 'Didactic charts and models'
      },
      {
        stepNumber: 3,
        title: 'Guided Practice & Institutionalization',
        durationMinutes: Math.round(duration * 0.25),
        teacherActivity: `Explains the governing rules and guides the whole class through sample problems.`,
        pupilActivity: 'Pupils work in pairs or groups, explain steps to peers, and confirm rules.',
        didacticAids: 'Chalkboard illustrations'
      },
      {
        stepNumber: 4,
        title: 'Independent Practice / Formative Check',
        durationMinutes: Math.round(duration * 0.20),
        teacherActivity: `Assigns short individual exercises and conducts rounds to check progress.`,
        pupilActivity: 'Pupils solve problems in exercise books or on slates and present for quick marking.',
        didacticAids: 'Pupil exercise books'
      },
      {
        stepNumber: 5,
        title: 'Conclusion, Summary Notes & Assignment',
        durationMinutes: Math.round(duration * 0.15),
        teacherActivity: `Writes summary blackboard notes, recaps main takeaway, and gives homework.`,
        pupilActivity: 'Pupils read blackboard notes chorally and transcribe neatly into notebooks.',
        didacticAids: 'Chalkboard notes'
      }
    ],
    chalkboardNotes: {
      title: `${subject.name.toUpperCase()}: ${effectiveTopic.toUpperCase()}`,
      summary: `Understanding ${effectiveTopic} helps pupils develop essential academic and life competencies.`,
      keyPoints: [
        `Key rule: Apply ${effectiveTopic} systematically as demonstrated.`,
        'Observation: Pay attention to details and check your work carefully.',
        'Practical value: This knowledge helps solve practical problems at school and at home.'
      ],
      vocabularyOrFormulas: [effectiveTopic, 'Concept', 'Practice', 'Solution', 'Cameroon']
    },
    formativeEvaluation: {
      questions: [
        `State the main principle governing ${effectiveTopic}.`,
        'Solve the question written on the chalkboard.'
      ],
      expectedAnswers: [
        'Pupils state the correct rule clearly in their own words.',
        'Accurate solution following step-by-step methodology.'
      ]
    },
    remediationPlan: {
      forStrugglingPupils: 'Guided step-by-step re-explanation with tactile counters or flashcards.',
      forFastLearners: 'Extension challenge task involving critical reasoning or peer teaching.'
    }
  };
}

/**
 * Generates an official weekly timetable & schedule drawn directly from the monthly plan
 */
export function generateWeeklySchedule(
  subsystem: SubsystemType,
  level: LevelType,
  monthNumber: number,
  weekNumber: number
): {
  days: {
    dayName: string;
    slots: TimetableSlot[];
  }[];
  fridayIntegration: {
    title: string;
    description: string;
    competenciesTargeted: string;
    remediationTask: string;
  };
} {
  const isFrench = subsystem === 'francophone';
  const subjects = getSubjects(subsystem);
  const periodDuration = getPeriodDuration(level);

  const dayNames = isFrench
    ? ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const monthlyUnit = getMonthlyUnit(subsystem, monthNumber);
  const monthWeeks = monthlyUnit?.weeks || [];
  const currentWeek = monthWeeks.find(w => w.weekNumber === weekNumber);

  // Time periods starting at 08:00 AM
  const periodTimes = [
    { start: '08:00', end: '08:35' },
    { start: '08:35', end: '09:10' },
    { start: '09:10', end: '09:45' },
    { start: '09:45', end: '10:15', isBreak: true }, // Recess
    { start: '10:15', end: '10:50' },
    { start: '10:50', end: '11:25' },
    { start: '11:25', end: '12:00' },
    { start: '12:00', end: '12:30', isBreak: true }, // Lunch / Rest
    { start: '12:30', end: '13:05' },
    { start: '13:05', end: '13:40' },
    { start: '13:40', end: '14:30', isSpecial: true } // Friday remedial / practical
  ];

  // Distribution pattern across the 10 subjects
  const subjectGridMap: string[][] = [
    // Monday
    [subjects[0]?.id, subjects[1]?.id, subjects[2]?.id, subjects[3]?.id, subjects[8]?.id, subjects[9]?.id, subjects[0]?.id],
    // Tuesday
    [subjects[1]?.id, subjects[0]?.id, subjects[4]?.id, subjects[6]?.id, subjects[1]?.id, subjects[2]?.id, subjects[4]?.id],
    // Wednesday
    [subjects[0]?.id, subjects[1]?.id, subjects[2]?.id, subjects[5]?.id, subjects[7]?.id, subjects[8]?.id, subjects[3]?.id],
    // Thursday
    [subjects[1]?.id, subjects[0]?.id, subjects[3]?.id, subjects[4]?.id, subjects[6]?.id, subjects[9]?.id, subjects[2]?.id],
    // Friday
    [subjects[0]?.id, subjects[1]?.id, subjects[5]?.id, subjects[7]?.id, subjects[8]?.id, 'remedial-session', 'integration-session']
  ];

  const days = dayNames.map((dayName, dayIndex) => {
    const slots: TimetableSlot[] = [];
    const subjectsForDay = subjectGridMap[dayIndex] || [];
    let subjectPointer = 0;

    periodTimes.forEach((pt, timeIndex) => {
      if (pt.isBreak) {
        slots.push({
          id: `slot-${dayIndex}-${timeIndex}`,
          day: dayName as any,
          startTime: pt.start,
          endTime: pt.end,
          durationMinutes: 30,
          subjectId: 'break',
          subComponentId: 'recess',
          lessonTitle: isFrench ? (timeIndex === 3 ? 'Récréation & Goûter' : 'Grande Pause & Détente') : (timeIndex === 3 ? 'Morning Recess' : 'Lunch Break'),
          isBreak: true
        });
      } else if (dayIndex === 4 && timeIndex >= 9) {
        // Friday afternoon Remedial and Integration Activities
        slots.push({
          id: `slot-${dayIndex}-${timeIndex}`,
          day: dayName as any,
          startTime: pt.start,
          endTime: pt.end,
          durationMinutes: 45,
          subjectId: 'integration-remedial',
          subComponentId: 'integration-remedial',
          lessonTitle: isFrench
            ? (weekNumber === 4 ? 'Évaluation Sommative & Bilan du Mois' : 'Activités d\'Intégration et Remédiation Hebdomadaires')
            : (weekNumber === 4 ? 'Monthly Summative Assessment & Remediation' : 'Weekly Remedial and Integration Activities'),
          isRemedialIntegration: true
        });
      } else {
        const subId = subjectsForDay[subjectPointer % subjectsForDay.length] || subjects[0]?.id;
        subjectPointer++;
        const subj = subjects.find(s => s.id === subId) || subjects[0];
        const subComp = subj.subComponents[timeIndex % subj.subComponents.length];

        let lessonTitle = isFrench
          ? `Séance ${timeIndex + 1} : ${subComp?.name}`
          : `Period ${timeIndex + 1}: ${subComp?.name}`;

        if (weekNumber === 4) {
          lessonTitle = isFrench
            ? `Révision & Intégration : ${subComp?.name}`
            : `Review & Integration: ${subComp?.name}`;
        }

        slots.push({
          id: `slot-${dayIndex}-${timeIndex}`,
          day: dayName as any,
          startTime: pt.start,
          endTime: pt.end,
          durationMinutes: periodDuration,
          subjectId: subj.id,
          subComponentId: subComp?.id || '',
          lessonTitle
        });
      }
    });

    return {
      dayName,
      slots
    };
  });

  const fridayIntegration = currentWeek?.fridayIntegrationActivity || {
    title: isFrench
      ? (weekNumber === 4 ? 'Bilan Mensuel et Remédiation Pédagogique' : 'Intégration Hebdomadaire et Remédiation')
      : (weekNumber === 4 ? 'Monthly Synthesis & Pedagogical Remediation' : 'Weekly Integration & Remedial Session'),
    description: isFrench
      ? 'Séance dédiée à la mobilisation coordonnée des acquis de la semaine et à la prise en charge immédiate des élèves en difficulté.'
      : 'Dedicated session for cross-subject integration of skills and direct targeted remediation for pupils requiring extra support.',
    competenciesTargeted: isFrench ? 'Compétences transversales de communication et résolution de problèmes' : 'Cross-cutting communication and problem-solving skills',
    remediationTask: isFrench ? 'Ateliers de soutien différencié par groupes de besoin' : 'Differentiated support workshops by learner needs'
  };

  return {
    days,
    fridayIntegration
  };
}

/**
 * Default school administrative info for Cameroon MINEDUB
 */
export function getDefaultSchoolInfo(subsystem: SubsystemType): SchoolAdministrativeInfo {
  if (subsystem === 'francophone') {
    return {
      schoolName: 'École Publique d\'Application de Bastos',
      region: 'Centre',
      division: 'Mfoundi',
      subDivision: 'Yaoundé II',
      teacherName: 'M. NKOLO Jean-Paul',
      headTeacherName: 'Mme ATANGANA Marie-Claire',
      academicYear: '2025/2026',
      classRoll: 48,
      boysCount: 23,
      girlsCount: 25,
      averageAge: 7
    };
  }
  return {
    schoolName: 'Government Practising School (GPS) Commercial Avenue',
    region: 'North West',
    division: 'Mezam',
    subDivision: 'Bamenda II',
    teacherName: 'Mr. TANJO Pascal N.',
    headTeacherName: 'Mrs. LUM Che Beatrice',
    academicYear: '2025/2026',
    classRoll: 46,
    boysCount: 22,
    girlsCount: 24,
    averageAge: 7
  };
}
