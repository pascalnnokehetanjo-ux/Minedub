/**
 * Interactive Quiz Generator & Evaluator
 * Grounded in lesson 'summary content notes', 'SMART objectives', and Bloom's Taxonomy levels
 * Supports Multiple-Choice, True/False, and Short Answer question types
 */

import {
  LessonContent,
  LessonQuiz,
  QuizQuestion,
  QuizAttempt,
  SubsystemType,
  BloomLevel
} from '../types/curriculum';
import { getBloomMeta } from './bloomsTaxonomy';

/**
 * Generate a comprehensive quiz for a lesson plan based on:
 * - summary content notes (title, summary, keyPoints, vocabularyOrFormulas)
 * - SMART objectives (overall, specificItems)
 * - formative evaluation questions & answers
 * - Bloom's Taxonomy level alignment
 */
export function generateQuizForLesson(lesson: LessonContent, subsystem: SubsystemType): LessonQuiz {
  const isFrench = subsystem === 'francophone';
  const questions: QuizQuestion[] = [];
  const bloom = getBloomMeta(lesson.bloomLevel);

  const notes = lesson.chalkboardNotes;
  const objectives = lesson.smartObjectives;
  const keyPoints = notes.keyPoints.length > 0
    ? notes.keyPoints
    : [notes.summary];
  const vocab = notes.vocabularyOrFormulas.length > 0
    ? notes.vocabularyOrFormulas
    : [lesson.topic];

  // Helper for generating deterministic unique IDs
  const qId = (type: string, idx: number) => `q-${lesson.id}-${type}-${idx}`;

  // -------------------------------------------------------------
  // Question 1: Multiple Choice - Remembering (Bloom Level 1)
  // Based on Summary / Key Point
  // -------------------------------------------------------------
  const mainPoint = keyPoints[0] || notes.summary;
  if (isFrench) {
    questions.push({
      id: qId('mcq', 1),
      type: 'multiple_choice',
      prompt: `D'après le résumé de cours sur « ${lesson.topic} », laquelle des affirmations suivantes est tout à fait exacte ?`,
      bloomLevel: 'remembering',
      options: [
        mainPoint,
        `Cette notion n'est jamais appliquée dans la vie courante au Cameroun.`,
        `Il ne faut pas prêter attention aux règles expliquées par le maître.`,
        `Le sujet de la leçon ne concerne ni les élèves ni la classe.`
      ],
      correctAnswer: mainPoint,
      explanation: `D'après les notes essentielles de cours : « ${mainPoint} »`,
      points: 2
    });
  } else {
    questions.push({
      id: qId('mcq', 1),
      type: 'multiple_choice',
      prompt: `According to the summary notes on "${lesson.topic}", which of the following statements is completely true?`,
      bloomLevel: 'remembering',
      options: [
        mainPoint,
        `This concept is never used in everyday life in Cameroon.`,
        `Pupils should ignore the instructions given by the teacher.`,
        `The topic has no connection to classroom learning or rules.`
      ],
      correctAnswer: mainPoint,
      explanation: `According to the blackboard summary notes: "${mainPoint}"`,
      points: 2
    });
  }

  // -------------------------------------------------------------
  // Question 2: True/False - Understanding (Bloom Level 2)
  // Based on Second Key Point or Summary
  // -------------------------------------------------------------
  const secondPoint = keyPoints[1] || keyPoints[0];
  if (isFrench) {
    questions.push({
      id: qId('tf', 2),
      type: 'true_false',
      prompt: `Vrai ou Faux : Selon le résumé de leçon, « ${secondPoint} » ?`,
      bloomLevel: 'understanding',
      options: ['Vrai', 'Faux'],
      correctAnswer: 'Vrai',
      explanation: `Cette affirmation est Vraie car elle correspond exactement à la trace écrite du cours validée au tableau.`,
      points: 2
    });
  } else {
    questions.push({
      id: qId('tf', 2),
      type: 'true_false',
      prompt: `True or False: According to the lesson notes, "${secondPoint}"?`,
      bloomLevel: 'understanding',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: `This statement is True because it is directly grounded in the teacher's chalkboard summary notes.`,
      points: 2
    });
  }

  // -------------------------------------------------------------
  // Question 3: Multiple Choice - Applying (Bloom Level 3)
  // Based on SMART Objective Success Criteria
  // -------------------------------------------------------------
  const targetObjective = objectives.specificItems[0] || objectives.overall;
  if (isFrench) {
    questions.push({
      id: qId('mcq', 3),
      type: 'multiple_choice',
      prompt: `Dans le cadre de l'objectif opérationnel de la leçon, quel comportement observable permet de prouver que l'élève a bien acquis la compétence ?`,
      bloomLevel: 'applying',
      options: [
        targetObjective,
        `Quitter la salle sans recopier le résumé dans son cahier.`,
        `Attendre passivement que son voisin fasse tout le travail.`,
        `Réciter sans comprendre des mots sans lien avec la leçon.`
      ],
      correctAnswer: targetObjective,
      explanation: `L'objectif opérationnel (OPO) précise : « ${targetObjective} ».`,
      points: 2
    });
  } else {
    questions.push({
      id: qId('mcq', 3),
      type: 'multiple_choice',
      prompt: `In alignment with the lesson's SMART learning objective, which observable action demonstrates learner mastery?`,
      bloomLevel: 'applying',
      options: [
        targetObjective,
        `Leaving the classroom without copying the notes into the exercise book.`,
        `Waiting passively for desk-mates to solve all the questions.`,
        `Memorizing words without understanding their practical meaning.`
      ],
      correctAnswer: targetObjective,
      explanation: `The lesson's specific SMART objective requires learners to: "${targetObjective}".`,
      points: 2
    });
  }

  // -------------------------------------------------------------
  // Question 4: True/False - Analyzing/Evaluating (Bloom Level 4 or 5)
  // Contrast question with subtle negative assertion
  // -------------------------------------------------------------
  if (isFrench) {
    questions.push({
      id: qId('tf', 4),
      type: 'true_false',
      prompt: `Vrai ou Faux : L'apprentissage de « ${lesson.topic} » est purement théorique et ne sert à rien dans la société camerounaise contemporaine.`,
      bloomLevel: 'analyzing',
      options: ['Vrai', 'Faux'],
      correctAnswer: 'Faux',
      explanation: `Cette affirmation est Fausse : le curriculum MINEDUB 2018 repose sur l'Approche Par les Compétences (APC) et vise le réinvestissement direct des acquis dans la vie quotidienne.`,
      points: 2
    });
  } else {
    questions.push({
      id: qId('tf', 4),
      type: 'true_false',
      prompt: `True or False: Learning about "${lesson.topic}" is purely theoretical and has no practical value in modern Cameroonian society.`,
      bloomLevel: 'analyzing',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: `This statement is False: the official MINEDUB 2018 curriculum uses the Competence-Based Approach (CBA) to equip pupils with practical life-skills for real-world application.`,
      points: 2
    });
  }

  // -------------------------------------------------------------
  // Question 5: Short Answer - Vocabulary & Key Concepts
  // Based on Keywords / Vocabulary list
  // -------------------------------------------------------------
  const primaryTerm = vocab[0] || lesson.topic;
  if (isFrench) {
    questions.push({
      id: qId('sa', 5),
      type: 'short_answer',
      prompt: `Donne l'un des termes essentiels ou mots-clés inscrits au tableau dans le résumé de cette leçon sur « ${lesson.topic} ».`,
      bloomLevel: 'remembering',
      correctAnswer: primaryTerm,
      acceptableKeywords: vocab.map(v => v.toLowerCase().trim()),
      explanation: `Les mots-clés consignés au tableau pour cette leçon comprennent : ${vocab.join(', ')}.`,
      points: 2
    });
  } else {
    questions.push({
      id: qId('sa', 5),
      type: 'short_answer',
      prompt: `Write down one of the key terms or core vocabulary words listed in the blackboard summary notes for this lesson on "${lesson.topic}".`,
      bloomLevel: 'remembering',
      correctAnswer: primaryTerm,
      acceptableKeywords: vocab.map(v => v.toLowerCase().trim()),
      explanation: `The key terms recorded on the chalkboard for this lesson include: ${vocab.join(', ')}.`,
      points: 2
    });
  }

  // -------------------------------------------------------------
  // Question 6: Short Answer - Formative Evaluation Task
  // From lesson.formativeEvaluation
  // -------------------------------------------------------------
  if (lesson.formativeEvaluation.questions.length > 0) {
    const evalQ = lesson.formativeEvaluation.questions[0];
    const evalAns = lesson.formativeEvaluation.expectedAnswers[0] || '';
    const keywords = evalAns
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3);

    if (isFrench) {
      questions.push({
        id: qId('sa', 6),
        type: 'short_answer',
        prompt: `Question d'application : ${evalQ}`,
        bloomLevel: lesson.bloomLevel,
        correctAnswer: evalAns,
        acceptableKeywords: keywords.length > 0 ? keywords : [evalAns.toLowerCase()],
        explanation: `Réponse officielle attendue : « ${evalAns} »`,
        points: 2
      });
    } else {
      questions.push({
        id: qId('sa', 6),
        type: 'short_answer',
        prompt: `Application question: ${evalQ}`,
        bloomLevel: lesson.bloomLevel,
        correctAnswer: evalAns,
        acceptableKeywords: keywords.length > 0 ? keywords : [evalAns.toLowerCase()],
        explanation: `Official expected answer: "${evalAns}"`,
        points: 2
      });
    }
  }

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return {
    id: `quiz-${lesson.id}`,
    lessonId: lesson.id,
    lessonTitle: lesson.lessonTitle,
    topic: lesson.topic,
    subsystem,
    bloomLevel: lesson.bloomLevel,
    questions,
    totalPoints,
    passingScore: 70 // 70% passing threshold as required by MINEDUB formative standards
  };
}

/**
 * Evaluates student answers and calculates score, percentage, and feedback
 */
export function evaluateQuizSubmission(
  quiz: LessonQuiz,
  userAnswers: Record<string, string>,
  studentName = 'Learner'
): QuizAttempt {
  const isFrench = quiz.subsystem === 'francophone';
  let totalScore = 0;
  const questionResults: Record<string, boolean> = {};

  quiz.questions.forEach(q => {
    const rawAnswer = (userAnswers[q.id] || '').trim();
    let isCorrect = false;

    if (q.type === 'multiple_choice' || q.type === 'true_false') {
      isCorrect = rawAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
    } else if (q.type === 'short_answer') {
      const cleanInput = rawAnswer.toLowerCase();
      const cleanCorrect = q.correctAnswer.toLowerCase();

      if (cleanInput === cleanCorrect) {
        isCorrect = true;
      } else if (q.acceptableKeywords && q.acceptableKeywords.length > 0) {
        // Lenient matching: matches if user response contains any core keyword or exact match
        const matchesKeyword = q.acceptableKeywords.some(kw => {
          return cleanInput.includes(kw) || kw.includes(cleanInput);
        });
        isCorrect = matchesKeyword && cleanInput.length >= 2;
      }
    }

    questionResults[q.id] = isCorrect;
    if (isCorrect) {
      totalScore += q.points;
    }
  });

  const percentage = Math.round((totalScore / quiz.totalPoints) * 100);
  const passed = percentage >= quiz.passingScore;

  let remediationAdvice = '';
  if (percentage < 70) {
    remediationAdvice = isFrench
      ? `Recommandation de remédiation : Revoir attentivement les points essentiels du résumé de cours et participer à l'atelier d'intégration du vendredi.`
      : `Remediation Recommendation: Review the chalkboard summary notes carefully and attend the Friday afternoon remedial clinic.`;
  } else if (percentage < 90) {
    remediationAdvice = isFrench
      ? `Bonne maîtrise des objectifs d'apprentissage. Consolider le vocabulaire et les applications pratiques.`
      : `Good mastery of SMART objectives. Consolidate vocabulary and practical exercises.`;
  } else {
    remediationAdvice = isFrench
      ? `Excellente maîtrise ! Objectifs taxonomiques de Bloom pleinement atteints (Niveau ${quiz.bloomLevel}). Félicitations !`
      : `Excellent performance! Bloom's Taxonomy learning objectives fully achieved (${quiz.bloomLevel} level). Well done!`;
  }

  return {
    id: `attempt-${Date.now()}`,
    lessonId: quiz.lessonId,
    lessonTitle: quiz.lessonTitle,
    studentName,
    timestamp: Date.now(),
    score: totalScore,
    totalPoints: quiz.totalPoints,
    percentage,
    passed,
    userAnswers,
    questionResults,
    remediationAdvice
  };
}

/**
 * LocalStorage history helpers for tracking student scores
 */
export const QUIZ_STORAGE_KEY = 'cameroon_quiz_attempts_history';

export function getSavedQuizAttempts(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load quiz attempts from storage', e);
    return [];
  }
}

export function saveQuizAttempt(attempt: QuizAttempt): void {
  try {
    const existing = getSavedQuizAttempts();
    const updated = [attempt, ...existing].slice(0, 50); // keep last 50 attempts
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save quiz attempt', e);
  }
}

export function clearQuizAttempts(): void {
  try {
    localStorage.removeItem(QUIZ_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear quiz attempts', e);
  }
}
