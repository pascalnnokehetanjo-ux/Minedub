import React, { useState } from 'react';
import {
  SubsystemType,
  LevelType,
  ClassType,
  LessonContent,
  SchoolAdministrativeInfo
} from '../types/curriculum';
import { getBloomMeta } from '../utils/bloomsTaxonomy';
import { getLevelName, getClassName } from '../utils/lessonGenerator';
import { getSubjects } from '../data/curriculumData';
import { enrichLessonWithAI, EnrichmentResponse } from '../services/geminiService';
import { Printer, Sparkles, BookOpen, CheckCircle, HelpCircle, Layers, FileText, Award } from 'lucide-react';
import { LessonQuizModal } from './LessonQuizModal';

interface LessonPlanViewProps {
  subsystem: SubsystemType;
  level: LevelType;
  classType: ClassType;
  lesson: LessonContent;
  schoolInfo: SchoolAdministrativeInfo;
  onPrint: () => void;
  onUpdateLesson?: (updated: LessonContent) => void;
}

export const LessonPlanView: React.FC<LessonPlanViewProps> = ({
  subsystem,
  level,
  classType,
  lesson,
  schoolInfo,
  onPrint,
  onUpdateLesson
}) => {
  const isFrench = subsystem === 'francophone';
  const subjects = getSubjects(subsystem);
  const currentSubject = subjects.find(s => s.id === lesson.subjectId);
  const currentSubComp = currentSubject?.subComponents.find(c => c.id === lesson.subComponentId);
  const bloom = getBloomMeta(lesson.bloomLevel);

  const [isEnriching, setIsEnriching] = useState(false);
  const [aiEnrichment, setAiEnrichment] = useState<EnrichmentResponse | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const handleEnrichWithAI = async () => {
    setIsEnriching(true);
    try {
      const result = await enrichLessonWithAI({
        subsystem,
        subjectName: currentSubject?.name || lesson.subjectId,
        subComponentName: currentSubComp?.name || lesson.subComponentId,
        topic: lesson.topic,
        bloomLevel: lesson.bloomLevel,
        className: getClassName(subsystem, classType),
        locality: schoolInfo.division
      });
      setAiEnrichment(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEnriching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Official MINEDUB Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        {/* Inspection Header Layout */}
        <div className="border-b border-slate-200 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left text-xs text-slate-600">
            {/* Left Header */}
            <div>
              <div className="font-bold text-slate-900">
                {isFrench ? 'RÉPUBLIQUE DU CAMEROUN' : 'REPUBLIC OF CAMEROON'}
              </div>
              <div>{isFrench ? 'Paix – Travail – Patrie' : 'Peace – Work – Fatherland'}</div>
              <div className="mt-1 font-semibold text-slate-800">
                {isFrench ? 'MINISTÈRE DE L\'ÉDUCATION DE BASE' : 'MINISTRY OF BASIC EDUCATION'}
              </div>
              <div className="text-slate-500">
                {isFrench ? `Délégation Régionale du ${schoolInfo.region}` : `${schoolInfo.region} Regional Delegation`}
              </div>
              <div className="text-slate-500">
                {isFrench ? `Délégation Départementale du ${schoolInfo.division}` : `${schoolInfo.division} Divisional Delegation`}
              </div>
            </div>

            {/* Center Header: Seal & Title */}
            <div className="text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xl mb-1 shadow-2xs">
                🇨🇲
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-tight">
                {isFrench ? 'FICHE PÉDAGOGIQUE OFFICIELLE' : 'OFFICIAL NOTES OF LESSON'}
              </h1>
              <div className="text-[11px] font-semibold text-emerald-800">
                {isFrench ? 'Curriculum de l\'Enseignement Primaire (MINEDUB 2018)' : 'Primary School Curriculum (MINEDUB 2018)'}
              </div>
            </div>

            {/* Right Header: School & Date */}
            <div className="md:text-right">
              <div className="font-bold text-slate-900">{schoolInfo.schoolName}</div>
              <div>{isFrench ? `Année Scolaire : ${schoolInfo.academicYear}` : `Academic Year: ${schoolInfo.academicYear}`}</div>
              <div>{isFrench ? `Enseignant : ${schoolInfo.teacherName}` : `Teacher: ${schoolInfo.teacherName}`}</div>
              <div>{isFrench ? `Directeur : ${schoolInfo.headTeacherName}` : `Head Teacher: ${schoolInfo.headTeacherName}`}</div>
            </div>
          </div>
        </div>

        {/* Administrative & Contextual Parameters Strip */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <div>
            <span className="text-slate-500 block">{isFrench ? 'Niveau :' : 'Level:'}</span>
            <span className="font-bold text-slate-800">{getLevelName(subsystem, level)}</span>
          </div>
          <div>
            <span className="text-slate-500 block">{isFrench ? 'Classe :' : 'Class:'}</span>
            <span className="font-bold text-slate-800">{getClassName(subsystem, classType)}</span>
          </div>
          <div>
            <span className="text-slate-500 block">{isFrench ? 'Durée :' : 'Duration:'}</span>
            <span className="font-bold text-slate-800">{lesson.durationMinutes} min</span>
          </div>
          <div>
            <span className="text-slate-500 block">{isFrench ? 'Effectif :' : 'Roll:'}</span>
            <span className="font-bold text-slate-800">
              {schoolInfo.classRoll} ({schoolInfo.boysCount}G / {schoolInfo.girlsCount}F)
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">{isFrench ? 'Âge Moyen :' : 'Average Age:'}</span>
            <span className="font-bold text-slate-800">{schoolInfo.averageAge} {isFrench ? 'ans' : 'years'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">{isFrench ? 'Mois / Semaine :' : 'Month / Week:'}</span>
            <span className="font-bold text-emerald-800">M{lesson.monthNumber} · S{lesson.weekNumber}</span>
          </div>
        </div>

        {/* Lesson Administrative Rationale */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold text-white bg-emerald-800">
                {currentSubject?.code || 'DISC'}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {currentSubject?.name} · {currentSubComp?.name}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {lesson.lessonTitle}
            </h2>
            <div className="text-xs text-slate-600 mt-0.5">
              <span className="font-medium">{isFrench ? 'Thème / Notion : ' : 'Topic / Core Idea: '}</span>
              <span>{lesson.topic}</span>
              {lesson.subTopic && (
                <>
                  <span className="mx-1.5 text-slate-400">·</span>
                  <span>{lesson.subTopic}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 no-print">
            {/* Interactive Quiz Trigger Button */}
            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200/90 border border-emerald-300 rounded-lg transition-colors shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isFrench ? 'Quiz Interactif' : 'Interactive Quiz'}</span>
            </button>

            <button
              onClick={handleEnrichWithAI}
              disabled={isEnriching}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>{isEnriching ? (isFrench ? 'Enrichissement...' : 'Enriching...') : (isFrench ? 'Enrichir avec l\'IA' : 'Enrich with AI')}</span>
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isFrench ? 'Imprimer la Fiche' : 'Print Lesson Plan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Pedagogical Enrichment Panel (if triggered) */}
      {aiEnrichment && (
        <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-5 space-y-3 no-print">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
            <Sparkles className="w-4 h-4 text-purple-700" />
            <span>
              {isFrench
                ? 'ENRICHISSEMENT PÉDAGOGIQUE CAMEROUNAIS & BLOOM (CONSEIL DE L\'INSPECTEUR IA)'
                : 'CAMEROON LOCALIZED PEDAGOGICAL & BLOOM ENRICHMENT (AI INSPECTOR)'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-purple-950">
            <div>
              <span className="font-bold block text-purple-900">
                {isFrench ? 'Activité ancrée dans le terroir local :' : 'Culturally Grounded Activity:'}
              </span>
              <p className="mt-0.5 text-slate-700">{aiEnrichment.culturallyContextualizedActivity}</p>

              <span className="font-bold block text-purple-900 mt-2">
                {isFrench ? 'Exemples du quotidien camerounais :' : 'Authentic Cameroonian Examples:'}
              </span>
              <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-slate-700">
                {aiEnrichment.localCameroonianExamples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold block text-purple-900">
                {isFrench ? 'Stratégie de remédiation ciblée :' : 'Differentiated Remediation Strategy:'}
              </span>
              <p className="mt-0.5 text-slate-700">{aiEnrichment.remedialSupportStrategy}</p>

              <span className="font-bold block text-purple-900 mt-2">
                {isFrench ? 'Tâche d\'approfondissement (élèves rapides) :' : 'Advanced Enrichment Task:'}
              </span>
              <p className="mt-0.5 text-slate-700">{aiEnrichment.advancedEnrichmentTask}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bloom's Taxonomy & SMART Objectives Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>
            {isFrench
              ? '1. ANCRAGE TAXONOMIQUE DE BLOOM & OBJECTIFS PÉDAGOGIQUES OPÉRATIONNELS (OPO)'
              : '1. BLOOM\'S TAXONOMY CLASSIFICATION & SMART OBJECTIVES'}
          </span>
        </h3>

        {/* Bloom Classification Pill */}
        <div className={`p-3 rounded-lg border text-xs mb-4 ${bloom.bgLight}`}>
          <div className="flex items-center justify-between">
            <span className="font-bold">
              {isFrench ? 'Niveau cognitif de Bloom ciblé : ' : 'Target Bloom Cognitive Level: '}
              {isFrench ? bloom.nameFr : bloom.nameEn} (Niveau {bloom.order}/6)
            </span>
            <span className="font-mono text-[11px] font-semibold">
              Verbes : {lesson.bloomActionVerbs.join(', ')}
            </span>
          </div>
          <p className="mt-1 text-slate-700">
            {isFrench ? bloom.descriptionFr : bloom.descriptionEn}
          </p>
        </div>

        {/* SMART Objectives Box */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
          <div>
            <span className="text-xs font-bold text-slate-900">
              {isFrench ? 'Objectif Pédagogique Opérationnel Général (OPO) :' : 'Overall SMART Learning Objective:'}
            </span>
            <p className="text-xs text-slate-800 font-medium mt-0.5 italic">
              « {lesson.smartObjectives.overall} »
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-900">
              {isFrench ? 'Composantes Opérationnelles Spécifiques (Critères de Réussite) :' : 'Specific Observable Success Criteria:'}
            </span>
            <ul className="list-disc pl-5 mt-1 text-xs text-slate-700 space-y-1">
              {lesson.smartObjectives.specificItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Previous Knowledge & Didactic Materials */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isFrench ? '2. PRÉREQUIS & COMPORTEMENT D\'ENTRÉE' : '2. ENTRY BEHAVIOR / PREVIOUS KNOWLEDGE'}</span>
          </h3>
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
            {lesson.previousKnowledge}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isFrench ? '3. MATÉRIEL DIDACTIQUE (RESSOURCES LOCALES)' : '3. TEACHING-LEARNING AIDS & LOCAL MATERIALS'}</span>
          </h3>
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700">
            <ul className="list-disc pl-4 space-y-1">
              {lesson.didacticMaterials.map((mat, idx) => (
                <li key={idx}>{mat}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Didactic Progression Table (6 Official Steps) */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {isFrench
              ? '4. DÉROULEMENT DIDACTIQUE ET ÉTAPES PÉDAGOGIQUES DE LA LEÇON'
              : '4. DIDACTIC PROGRESSION & INSTRUCTIONAL STEPS'}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-2.5 px-3 w-12 text-center">Étape</th>
                <th className="py-2.5 px-3 w-40">{isFrench ? 'Étape / Durée' : 'Step / Duration'}</th>
                <th className="py-2.5 px-3">{isFrench ? 'Activités du Maître (Enseignant)' : 'Teacher\'s Activities'}</th>
                <th className="py-2.5 px-3">{isFrench ? 'Activités des Élèves (Apprenants)' : 'Pupil\'s Activities'}</th>
                <th className="py-2.5 px-3 w-36">{isFrench ? 'Matériel / Supports' : 'Aids / Medium'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lesson.didacticSteps.map((step) => (
                <tr key={step.stepNumber} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 tabular-nums">
                    {step.stepNumber}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900 align-top">
                    <div>{step.title}</div>
                    <div className="text-slate-400 font-normal text-[11px] mt-0.5">
                      ~{step.durationMinutes} min
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-800 align-top leading-relaxed">
                    {step.teacherActivity}
                  </td>
                  <td className="py-3 px-3 text-slate-800 align-top leading-relaxed">
                    {step.pupilActivity}
                  </td>
                  <td className="py-3 px-3 text-slate-600 align-top text-[11px]">
                    {step.didacticAids}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher's Chalkboard Summary Content Notes (To copy in pupil notebooks) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-emerald-700" />
          <span>
            {isFrench
              ? '5. RÉSUMÉ DE COURS DU MAÎTRE / TRACE ÉCRITE POUR L\'ÉLÈVE'
              : '5. TEACHER\'S CHALKBOARD SUMMARY NOTES (PUPIL NOTEBOOK CONTENT)'}
          </span>
        </h3>

        {/* Chalkboard Styled Box */}
        <div className="bg-slate-900 text-slate-100 p-5 rounded-lg border-4 border-amber-900/40 shadow-inner font-sans space-y-3">
          <div className="border-b border-slate-700 pb-2 text-center">
            <h4 className="text-sm font-bold tracking-wider text-amber-300 uppercase">
              {lesson.chalkboardNotes.title}
            </h4>
          </div>

          <div className="text-xs text-slate-200 leading-relaxed italic">
            {lesson.chalkboardNotes.summary}
          </div>

          <div>
            <span className="text-xs font-semibold text-emerald-400 block mb-1">
              {isFrench ? 'Points essentiels à retenir :' : 'Key takeaways to remember:'}
            </span>
            <ul className="list-disc pl-5 text-xs text-slate-200 space-y-1">
              {lesson.chalkboardNotes.keyPoints.map((kp, idx) => (
                <li key={idx}>{kp}</li>
              ))}
            </ul>
          </div>

          {lesson.chalkboardNotes.vocabularyOrFormulas.length > 0 && (
            <div className="pt-2 border-t border-slate-700/60">
              <span className="text-[11px] font-semibold text-sky-300 block mb-1">
                {isFrench ? 'Mots clés & vocabulaire :' : 'Keywords & Vocabulary:'}
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {lesson.chalkboardNotes.vocabularyOrFormulas.map((voc, idx) => (
                  <span key={idx} className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700">
                    {voc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Formative Evaluation & Differentiation (Remediation & Enrichment) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Formative Evaluation */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>{isFrench ? '6. ÉVALUATION FORMATIVE & QUESTIONS' : '6. FORMATIVE EVALUATION & ASSESSMENT'}</span>
          </h3>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 text-xs">
            {lesson.formativeEvaluation.questions.map((q, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-bold text-slate-900">
                  Q{idx + 1}: {q}
                </div>
                <div className="text-emerald-900 font-medium pl-3 border-l-2 border-emerald-600">
                  {isFrench ? 'Réponse attendue : ' : 'Expected answer: '}
                  {lesson.formativeEvaluation.expectedAnswers[idx]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Differentiated Remediation & Extension */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>{isFrench ? '7. DIFFÉRENCIATION PÉDAGOGIQUE' : '7. DIFFERENTIATION & REMEDIATION'}</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="font-bold text-amber-900 block mb-0.5">
                {isFrench ? 'Remédiation pour élèves en difficulté :' : 'Remediation for Struggling Pupils:'}
              </span>
              <p className="text-slate-700 leading-relaxed">
                {lesson.remediationPlan.forStrugglingPupils}
              </p>
            </div>

            <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
              <span className="font-bold text-sky-900 block mb-0.5">
                {isFrench ? 'Enrichissement pour apprenants rapides :' : 'Enrichment for Fast Learners:'}
              </span>
              <p className="text-slate-700 leading-relaxed">
                {lesson.remediationPlan.forFastLearners}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inspector / Head Teacher Visa and Stamp Block */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
          {isFrench ? '8. AUTO-ÉVALUATION DE L\'ENSEIGNANT & VISAS DU CONTRÔLE PÉDAGOGIQUE' : '8. TEACHER SELF-CRITIQUE & OFFICIAL VISAS'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs border border-slate-200 rounded-lg p-4 bg-slate-50">
          <div className="space-y-6">
            <span className="font-bold text-slate-900 block">
              {isFrench ? 'Auto-critique de l\'Enseignant :' : 'Teacher\'s Self-Evaluation:'}
            </span>
            <div className="text-slate-400 italic">
              {isFrench ? '(Objectifs atteints / Remédiation reportée)' : '(Objectives achieved / Difficulties encountered)'}
            </div>
            <div className="pt-4 border-t border-slate-300 font-semibold text-slate-700">
              {isFrench ? 'Signature de l\'Enseignant' : 'Teacher\'s Signature'}
            </div>
          </div>

          <div className="space-y-6 border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-4">
            <span className="font-bold text-slate-900 block">
              {isFrench ? 'Visa du Directeur d\'École :' : 'Head Teacher\'s Visa:'}
            </span>
            <div className="text-slate-400 italic">
              {isFrench ? '(Observations pédagogiques et visa)' : '(Pedagogical remarks & approval)'}
            </div>
            <div className="pt-4 border-t border-slate-300 font-semibold text-slate-700">
              {isFrench ? 'Date, Sceau & Signature' : 'Date, Stamp & Signature'}
            </div>
          </div>

          <div className="space-y-6 border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-4">
            <span className="font-bold text-slate-900 block">
              {isFrench ? 'Visa de l\'Inspecteur Pédagogique :' : 'Pedagogical Inspector\'s Visa:'}
            </span>
            <div className="text-slate-400 italic">
              {isFrench ? '(Contrôle de conformité au curriculum 2018)' : '(Inspection conformity check MINEDUB)'}
            </div>
            <div className="pt-4 border-t border-slate-300 font-semibold text-slate-700">
              {isFrench ? 'Visa de l\'Inspection d\'Arrondissement' : 'Sub-Divisional Inspectorate Stamp'}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Quiz Modal */}
      <LessonQuizModal
        lesson={lesson}
        subsystem={subsystem}
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />
    </div>
  );
};
