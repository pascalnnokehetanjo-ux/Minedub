import React, { useState, useEffect } from 'react';
import {
  LessonContent,
  LessonQuiz,
  QuizQuestion,
  QuizAttempt,
  SubsystemType
} from '../types/curriculum';
import {
  generateQuizForLesson,
  evaluateQuizSubmission,
  getSavedQuizAttempts,
  saveQuizAttempt,
  clearQuizAttempts
} from '../utils/quizGenerator';
import { getBloomMeta } from '../utils/bloomsTaxonomy';
import {
  X,
  CheckCircle,
  XCircle,
  Award,
  RotateCcw,
  Printer,
  History,
  Sparkles,
  HelpCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  User,
  Trash2
} from 'lucide-react';

interface LessonQuizModalProps {
  lesson: LessonContent;
  subsystem: SubsystemType;
  isOpen: boolean;
  onClose: () => void;
}

export const LessonQuizModal: React.FC<LessonQuizModalProps> = ({
  lesson,
  subsystem,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const isFrench = subsystem === 'francophone';
  const [quiz, setQuiz] = useState<LessonQuiz>(() => generateQuizForLesson(lesson, subsystem));
  const [studentName, setStudentName] = useState('Pupil');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [attemptResult, setAttemptResult] = useState<QuizAttempt | null>(null);
  const [activeTab, setActiveTab] = useState<'take' | 'history' | 'print'>('take');
  const [history, setHistory] = useState<QuizAttempt[]>([]);

  // Reload quiz when lesson changes
  useEffect(() => {
    setQuiz(generateQuizForLesson(lesson, subsystem));
    setUserAnswers({});
    setAttemptResult(null);
  }, [lesson, subsystem]);

  // Load history on mount or view change
  useEffect(() => {
    setHistory(getSavedQuizAttempts().filter(a => a.lessonId === lesson.id));
  }, [lesson.id, activeTab]);

  const handleAnswerChange = (questionId: string, val: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: val
    }));
  };

  const handleSubmitQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const result = evaluateQuizSubmission(quiz, userAnswers, studentName.trim() || 'Learner');
    setAttemptResult(result);
    saveQuizAttempt(result);
    setHistory(getSavedQuizAttempts().filter(a => a.lessonId === lesson.id));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setAttemptResult(null);
  };

  const handleClearHistory = () => {
    clearQuizAttempts();
    setHistory([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-emerald-100 text-emerald-800">
                <HelpCircle className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900">
                {isFrench ? 'Évaluation Formative Interactive de la Leçon' : 'Interactive Formative Lesson Quiz'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lesson.lessonTitle} · <span className="font-semibold text-slate-700">{lesson.topic}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center p-0.5 bg-slate-200/80 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveTab('take')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'take'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isFrench ? 'Passer le Quiz' : 'Take Quiz'}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1 ${
                  activeTab === 'history'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <History className="w-3 h-3" />
                <span>{isFrench ? 'Scores' : 'Scores'}</span>
                {history.length > 0 && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full">
                    {history.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('print')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1 ${
                  activeTab === 'print'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Printer className="w-3 h-3" />
                <span>{isFrench ? 'Imprimer' : 'Printable'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: TAKE QUIZ */}
          {activeTab === 'take' && (
            <div>
              {/* If already submitted, display Immediate Feedback Score Board */}
              {attemptResult ? (
                <div className="space-y-6">
                  {/* Results Hero Card */}
                  <div
                    className={`rounded-xl p-5 border ${
                      attemptResult.passed
                        ? 'bg-emerald-50/80 border-emerald-300'
                        : 'bg-amber-50/80 border-amber-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          {attemptResult.passed ? (
                            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle className="w-6 h-6 text-amber-600 shrink-0" />
                          )}
                          <h3 className="text-lg font-bold text-slate-900">
                            {attemptResult.passed
                              ? isFrench
                                ? `Félicitations, ${attemptResult.studentName} ! Compétence Validée`
                                : `Congratulations, ${attemptResult.studentName}! Objective Mastered`
                              : isFrench
                              ? `Résultat Obtenu, ${attemptResult.studentName}`
                              : `Quiz Completed, ${attemptResult.studentName}`}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-700 mt-1.5">
                          {attemptResult.remediationAdvice}
                        </p>
                      </div>

                      <div className="text-right sm:border-l sm:border-slate-300/80 sm:pl-6 shrink-0">
                        <div className="text-2xl font-black tabular-nums text-slate-900">
                          {attemptResult.percentage}%
                        </div>
                        <div className="text-xs font-semibold text-slate-600">
                          {attemptResult.score} / {attemptResult.totalPoints} {isFrench ? 'points' : 'pts'}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {isFrench ? 'Seuil de réussite: 70%' : 'Pass threshold: 70%'}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-600">
                        {isFrench ? 'Alignement Taxonomique de Bloom : ' : 'Bloom\'s Taxonomy Target: '}
                        <strong className="text-slate-900 uppercase">{quiz.bloomLevel}</strong>
                      </span>
                      <button
                        onClick={handleResetQuiz}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{isFrench ? 'Recommencer le Quiz' : 'Retake Quiz'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Immediate Detailed Feedback for Each Question */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {isFrench ? 'Détail des Réponses & Justifications Pédagogiques' : 'Question Breakdown & Pedagogical Explanations'}
                    </h4>

                    {quiz.questions.map((q, idx) => {
                      const isCorrect = attemptResult.questionResults[q.id];
                      const userAns = attemptResult.userAnswers[q.id] || (isFrench ? '(Non répondu)' : '(No response)');
                      const bloomQ = getBloomMeta(q.bloomLevel);

                      return (
                        <div
                          key={q.id}
                          className={`rounded-xl p-4 border transition-colors ${
                            isCorrect
                              ? 'bg-emerald-50/30 border-emerald-200'
                              : 'bg-rose-50/30 border-rose-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                                  isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                                }`}
                              >
                                {idx + 1}
                              </span>
                              <div>
                                <p className="text-xs font-bold text-slate-900 leading-snug">
                                  {q.prompt}
                                </p>
                                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                                  <span className={`px-1.5 py-0.2 rounded font-semibold ${bloomQ.bgLight}`}>
                                    Bloom: {isFrench ? bloomQ.nameFr : bloomQ.nameEn}
                                  </span>
                                  <span>·</span>
                                  <span>{q.points} {isFrench ? 'points' : 'pts'}</span>
                                  <span>·</span>
                                  <span className="capitalize">{q.type.replace('_', ' ')}</span>
                                </div>
                              </div>
                            </div>

                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                                isCorrect
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {isCorrect ? (isFrench ? 'Correct (+2)' : 'Correct (+2)') : (isFrench ? 'Incorrect (0)' : 'Incorrect (0)')}
                            </span>
                          </div>

                          {/* Student Answer & Correct Answer */}
                          <div className="mt-3 pt-2.5 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="p-2 rounded bg-white border border-slate-200">
                              <span className="font-semibold text-slate-500 block text-[11px]">
                                {isFrench ? 'Ta réponse :' : 'Your response:'}
                              </span>
                              <span className={isCorrect ? 'text-emerald-800 font-bold' : 'text-rose-800 font-semibold'}>
                                {userAns}
                              </span>
                            </div>

                            <div className="p-2 rounded bg-white border border-slate-200">
                              <span className="font-semibold text-slate-500 block text-[11px]">
                                {isFrench ? 'Réponse attendue :' : 'Official correct answer:'}
                              </span>
                              <span className="text-slate-900 font-bold">
                                {q.correctAnswer}
                              </span>
                            </div>
                          </div>

                          {/* Grounded Explanation */}
                          <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200/80">
                            <span className="font-bold text-slate-800">
                              {isFrench ? 'Fondement pédagogique (Résumé / OPO) : ' : 'Pedagogical Explanation: '}
                            </span>
                            <span>{q.explanation}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Interactive Form to Answer Questions */
                <form onSubmit={handleSubmitQuiz} className="space-y-6">
                  {/* Student Name Banner */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-700" />
                      <label className="text-xs font-bold text-slate-800 whitespace-nowrap">
                        {isFrench ? 'Nom de l\'Élève :' : 'Student Name:'}
                      </label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={e => setStudentName(e.target.value)}
                        placeholder={isFrench ? 'Entrer le nom de l\'élève' : 'Enter pupil name'}
                        className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                        required
                      />
                    </div>

                    <div className="text-xs text-slate-500">
                      <span>{quiz.questions.length} {isFrench ? 'questions' : 'questions'}</span>
                      <span className="mx-1.5">·</span>
                      <span>{quiz.totalPoints} {isFrench ? 'points au total' : 'total points'}</span>
                      <span className="mx-1.5">·</span>
                      <span className="text-emerald-800 font-semibold">
                        Bloom: {quiz.bloomLevel}
                      </span>
                    </div>
                  </div>

                  {/* Question Cards */}
                  <div className="space-y-5">
                    {quiz.questions.map((q, idx) => {
                      const bloomQ = getBloomMeta(q.bloomLevel);
                      const currentVal = userAnswers[q.id] || '';

                      return (
                        <div
                          key={q.id}
                          className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <div>
                                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                                  {q.prompt}
                                </h3>
                                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                                  <span className={`px-1.5 py-0.2 rounded font-semibold ${bloomQ.bgLight}`}>
                                    {isFrench ? bloomQ.nameFr : bloomQ.nameEn}
                                  </span>
                                  <span>·</span>
                                  <span>{q.points} {isFrench ? 'points' : 'pts'}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Multiple Choice Options */}
                          {q.type === 'multiple_choice' && q.options && (
                            <div className="grid grid-cols-1 gap-2 pt-1 pl-8">
                              {q.options.map((opt, oIdx) => {
                                const isSelected = currentVal === opt;
                                return (
                                  <label
                                    key={oIdx}
                                    onClick={() => handleAnswerChange(q.id, opt)}
                                    className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                                      isSelected
                                        ? 'bg-emerald-50 border-emerald-500 font-semibold text-emerald-950'
                                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/70 text-slate-800'
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={q.id}
                                      value={opt}
                                      checked={isSelected}
                                      onChange={() => handleAnswerChange(q.id, opt)}
                                      className="mt-0.5 text-emerald-700 focus:ring-emerald-600"
                                    />
                                    <span>{opt}</span>
                                  </label>
                                );
                              })}
                            </div>
                          )}

                          {/* True / False Selector */}
                          {q.type === 'true_false' && (
                            <div className="flex items-center gap-3 pt-1 pl-8">
                              {(isFrench ? ['Vrai', 'Faux'] : ['True', 'False']).map((choice) => {
                                const isSelected = currentVal.toLowerCase() === choice.toLowerCase();
                                return (
                                  <button
                                    key={choice}
                                    type="button"
                                    onClick={() => handleAnswerChange(q.id, choice)}
                                    className={`px-5 py-2 rounded-lg text-xs font-bold border transition-colors ${
                                      isSelected
                                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-2xs'
                                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                    }`}
                                  >
                                    {choice}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Short Answer Input */}
                          {q.type === 'short_answer' && (
                            <div className="pt-1 pl-8">
                              <input
                                type="text"
                                value={currentVal}
                                onChange={e => handleAnswerChange(q.id, e.target.value)}
                                placeholder={isFrench ? 'Écris ta réponse ici...' : 'Type your answer here...'}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                              />
                              <p className="text-[11px] text-slate-400 mt-1 italic">
                                {isFrench
                                  ? 'Réponse courte vérifiée automatiquement d\'après les mots-clés du résumé.'
                                  : 'Short answer will be checked against the teacher\'s summary notes and keywords.'}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Form Submission Button */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {Object.keys(userAnswers).length} / {quiz.questions.length} {isFrench ? 'questions répondues' : 'questions answered'}
                    </span>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs"
                    >
                      <span>{isFrench ? 'Soumettre et Obtenir le Score' : 'Submit Quiz & Check Score'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: SCORE TRACKING & HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isFrench ? 'Historique des Évaluations de la Leçon' : 'Student Quiz Assessment History'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isFrench
                      ? 'Suivi continu des performances des élèves pour cette leçon.'
                      : 'Track student scores and remediation needs across quiz attempts.'}
                  </p>
                </div>

                {history.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-rose-700 hover:text-rose-900 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{isFrench ? 'Effacer l\'historique' : 'Clear History'}</span>
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                  <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p>{isFrench ? 'Aucune tentative enregistrée pour le moment.' : 'No student attempts recorded yet.'}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {isFrench ? 'Passez le quiz pour enregistrer un premier score.' : 'Take the quiz to generate and track a score.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                        <th className="py-2.5 px-3">{isFrench ? 'Date' : 'Date'}</th>
                        <th className="py-2.5 px-3">{isFrench ? 'Élève' : 'Student Name'}</th>
                        <th className="py-2.5 px-3 text-right">{isFrench ? 'Score' : 'Score'}</th>
                        <th className="py-2.5 px-3 text-right">{isFrench ? 'Pourcentage' : 'Percentage'}</th>
                        <th className="py-2.5 px-3 text-center">{isFrench ? 'Statut' : 'Status'}</th>
                        <th className="py-2.5 px-3">{isFrench ? 'Recommandation' : 'Remediation'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {history.map((att) => (
                        <tr key={att.id} className="hover:bg-slate-50/70">
                          <td className="py-2 px-3 text-slate-500 whitespace-nowrap">
                            {new Date(att.timestamp).toLocaleDateString()} {new Date(att.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-2 px-3 font-bold text-slate-900">
                            {att.studentName}
                          </td>
                          <td className="py-2 px-3 text-right font-medium tabular-nums">
                            {att.score} / {att.totalPoints}
                          </td>
                          <td className="py-2 px-3 text-right font-bold tabular-nums">
                            {att.percentage}%
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                att.passed
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {att.passed ? (isFrench ? 'Validé' : 'Passed') : (isFrench ? 'À Remédier' : 'Remediate')}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-slate-600 text-[11px] max-w-xs truncate">
                            {att.remediationAdvice}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRINTABLE TEST SHEET & TEACHER ANSWER KEY */}
          {activeTab === 'print' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isFrench ? 'Fiche de Contrôle Prête pour la Classe (Imprimable)' : 'Printable Classroom Quiz & Marking Scheme'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isFrench
                      ? 'Format officiel pour évaluation en classe ou épreuve sur table.'
                      : 'Official format for paper assessment or teacher grading key.'}
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isFrench ? 'Imprimer cette Fiche' : 'Print Quiz Sheet'}</span>
                </button>
              </div>

              {/* Printable Quiz Layout */}
              <div className="border border-slate-300 p-6 rounded-xl font-serif text-xs space-y-4 bg-white">
                <div className="border-b-2 border-black pb-3 text-center">
                  <div className="font-bold text-sm uppercase">
                    {isFrench ? 'RÉPUBLIQUE DU CAMEROUN · MINISTÈRE DE L\'ÉDUCATION DE BASE' : 'REPUBLIC OF CAMEROON · MINISTRY OF BASIC EDUCATION'}
                  </div>
                  <div className="font-semibold text-xs mt-1">
                    {isFrench ? 'CONTRÔLE DES CONNAISSANCES & OBJECTIFS OPÉRATIONNELS' : 'CLASSROOM FORMATIVE QUIZ & SMART OBJECTIVE CHECK'}
                  </div>
                  <div className="text-[11px] text-slate-700 mt-1">
                    {isFrench ? 'Discipline : ' : 'Subject: '} {lesson.subjectId} · {lesson.topic} · Bloom: {quiz.bloomLevel}
                  </div>
                  <div className="flex justify-between text-[11px] mt-2 pt-2 border-t border-dotted border-black">
                    <span>{isFrench ? 'Nom de l\'Élève : ___________________________' : 'Pupil\'s Name: ___________________________'}</span>
                    <span>{isFrench ? 'Date : ____________' : 'Date: ____________'}</span>
                    <span>{isFrench ? 'Note : _____ / ' : 'Score: _____ / '}{quiz.totalPoints}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {quiz.questions.map((q, idx) => (
                    <div key={q.id} className="space-y-1">
                      <div className="font-bold">
                        {idx + 1}. {q.prompt} ({q.points} {isFrench ? 'pts' : 'pts'})
                      </div>
                      {q.type === 'multiple_choice' && q.options && (
                        <div className="pl-4 space-y-0.5 text-slate-800">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx}>
                              [ &nbsp; ] {String.fromCharCode(65 + oIdx)}. {opt}
                            </div>
                          ))}
                        </div>
                      )}
                      {q.type === 'true_false' && (
                        <div className="pl-4 space-y-0.5">
                          {isFrench ? '[  ] Vrai &nbsp;&nbsp;&nbsp;&nbsp; [  ] Faux' : '[  ] True &nbsp;&nbsp;&nbsp;&nbsp; [  ] False'}
                        </div>
                      )}
                      {q.type === 'short_answer' && (
                        <div className="pl-4 pt-2">
                          <div className="border-b border-dotted border-black w-3/4 h-4"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Teacher's Answer Key Block at Bottom */}
                <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-300 font-sans text-[11px] text-slate-600">
                  <div className="font-bold text-slate-800 mb-1">
                    {isFrench ? 'Corrigé Officiel pour l\'Enseignant :' : 'Teacher\'s Marking Scheme & Answers:'}
                  </div>
                  <ul className="list-disc pl-5 space-y-0.5">
                    {quiz.questions.map((q, idx) => (
                      <li key={idx}>
                        <strong>Q{idx + 1}:</strong> {q.correctAnswer} &nbsp;—&nbsp; <em>{q.explanation}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
