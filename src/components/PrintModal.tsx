import React from 'react';
import {
  SubsystemType,
  LevelType,
  ClassType,
  LessonContent,
  SchoolAdministrativeInfo,
  MonthlyUnit
} from '../types/curriculum';
import { getLevelName, getClassName, generateWeeklySchedule } from '../utils/lessonGenerator';
import { getSubjects, getMonthlyUnit } from '../data/curriculumData';
import { getBloomMeta } from '../utils/bloomsTaxonomy';
import { Printer, X } from 'lucide-react';

interface PrintModalProps {
  subsystem: SubsystemType;
  level: LevelType;
  classType: ClassType;
  monthNumber: number;
  weekNumber: number;
  activeDoc: 'lesson' | 'weekly' | 'monthly' | 'project' | 'timematrix';
  lesson: LessonContent;
  schoolInfo: SchoolAdministrativeInfo;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  subsystem,
  level,
  classType,
  monthNumber,
  weekNumber,
  activeDoc,
  lesson,
  schoolInfo,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const isFrench = subsystem === 'francophone';
  const subjects = getSubjects(subsystem);
  const currentSubject = subjects.find(s => s.id === lesson.subjectId);
  const currentSubComp = currentSubject?.subComponents.find(c => c.id === lesson.subComponentId);
  const monthlyUnit = getMonthlyUnit(subsystem, monthNumber);
  const schedule = generateWeeklySchedule(subsystem, level, monthNumber, weekNumber);
  const bloom = getBloomMeta(lesson.bloomLevel);

  const handlePrintTrigger = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4">
      {/* Container */}
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-4xl w-full max-h-[95vh] flex flex-col overflow-hidden">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="flex items-center justify-between p-3.5 bg-slate-100 border-b border-slate-200 no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">
              {isFrench ? 'Aperçu Avant Impression PDF' : 'Print to PDF Preview'}
            </span>
            <span className="text-xs text-slate-500">
              ({activeDoc === 'lesson'
                ? (isFrench ? 'Fiche Pédagogique' : 'Lesson Plan')
                : activeDoc === 'weekly'
                ? (isFrench ? 'Cahier Hebdomadaire' : 'Weekly Timetable')
                : activeDoc === 'monthly'
                ? (isFrench ? 'Programme Mensuel' : 'Monthly Scheme')
                : (isFrench ? 'Fiche Projet' : 'Project Guide')})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintTrigger}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isFrench ? 'Imprimer / Enregistrer PDF' : 'Print / Save as PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 overflow-y-auto print:p-0 print:overflow-visible text-black text-xs font-serif leading-relaxed">
          {/* Document Content Rendered According to activeDoc */}
          {activeDoc === 'lesson' && (
            <div className="space-y-4">
              {/* Header Letterhead */}
              <div className="border-b-2 border-black pb-3">
                <div className="grid grid-cols-3 text-center text-[10.5pt] leading-tight">
                  <div className="text-left font-serif">
                    <p className="font-bold">{isFrench ? 'RÉPUBLIQUE DU CAMEROUN' : 'REPUBLIC OF CAMEROON'}</p>
                    <p className="italic text-[9.5pt]">{isFrench ? 'Paix – Travail – Patrie' : 'Peace – Work – Fatherland'}</p>
                    <p className="font-semibold mt-1">{isFrench ? 'MINISTÈRE DE L\'ÉDUCATION DE BASE' : 'MINISTRY OF BASIC EDUCATION'}</p>
                    <p className="text-[9pt]">{isFrench ? `Délégation Régionale : ${schoolInfo.region}` : `${schoolInfo.region} Regional Delegation`}</p>
                    <p className="text-[9pt]">{isFrench ? `Délégation Dépt : ${schoolInfo.division}` : `${schoolInfo.division} Divisional Delegation`}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="font-serif font-black text-sm uppercase tracking-wide border-b border-black pb-0.5 mb-1">
                      {isFrench ? 'FICHE PÉDAGOGIQUE OFFICIELLE' : 'OFFICIAL NOTES OF LESSON'}
                    </div>
                    <div className="text-[9pt] font-sans font-bold text-emerald-900">
                      MINEDUB CURRICULUM 2018
                    </div>
                    <div className="text-[8.5pt] italic mt-0.5">
                      {isFrench ? 'Taxonomie Révisée de Bloom' : 'Bloom\'s Taxonomy Aligned'}
                    </div>
                  </div>

                  <div className="text-right font-serif">
                    <p className="font-bold">{schoolInfo.schoolName}</p>
                    <p className="text-[9pt]">{isFrench ? `Année : ${schoolInfo.academicYear}` : `Year: ${schoolInfo.academicYear}`}</p>
                    <p className="text-[9pt]">{isFrench ? `Maître : ${schoolInfo.teacherName}` : `Teacher: ${schoolInfo.teacherName}`}</p>
                    <p className="text-[9pt]">{isFrench ? `Directeur : ${schoolInfo.headTeacherName}` : `Head: ${schoolInfo.headTeacherName}`}</p>
                  </div>
                </div>
              </div>

              {/* Administrative Grid */}
              <div className="border border-black p-2 grid grid-cols-4 gap-2 text-[10pt] font-sans bg-slate-50/50">
                <div><span className="font-bold">{isFrench ? 'Niveau : ' : 'Level: '}</span>{getLevelName(subsystem, level)}</div>
                <div><span className="font-bold">{isFrench ? 'Classe : ' : 'Class: '}</span>{getClassName(subsystem, classType)}</div>
                <div><span className="font-bold">{isFrench ? 'Effectif : ' : 'Roll: '}</span>{schoolInfo.classRoll}</div>
                <div><span className="font-bold">{isFrench ? 'Âge Moyen : ' : 'Avg Age: '}</span>{schoolInfo.averageAge} {isFrench ? 'ans' : 'yrs'}</div>
                <div><span className="font-bold">{isFrench ? 'Discipline : ' : 'Subject: '}</span>{currentSubject?.name}</div>
                <div><span className="font-bold">{isFrench ? 'Sous-composante : ' : 'Sub-comp: '}</span>{currentSubComp?.name}</div>
                <div><span className="font-bold">{isFrench ? 'Durée : ' : 'Duration: '}</span>{lesson.durationMinutes} min</div>
                <div><span className="font-bold">{isFrench ? 'Semaine : ' : 'Week: '}</span>M{lesson.monthNumber} / S{lesson.weekNumber}</div>
              </div>

              {/* Title & Topic */}
              <div className="border border-black p-2 font-sans">
                <div className="text-sm font-bold uppercase">{lesson.lessonTitle}</div>
                <div className="text-[10pt] text-slate-700 mt-0.5">
                  <span className="font-bold">{isFrench ? 'Thème / Notion : ' : 'Topic / Core Idea: '}</span>
                  {lesson.topic} {lesson.subTopic && `( ${lesson.subTopic} )`}
                </div>
              </div>

              {/* Bloom's Classification & SMART Objectives */}
              <div className="border border-black p-2.5 font-sans space-y-1.5">
                <div className="font-bold text-[10.5pt] border-b border-black pb-0.5">
                  {isFrench ? 'I. OBJECTIFS PÉDAGOGIQUES OPÉRATIONNELS (OPO) & TAXONOMIE DE BLOOM' : 'I. BLOOM\'S TAXONOMY & SMART OBJECTIVES'}
                </div>
                <div className="text-[9.5pt]">
                  <span className="font-bold">{isFrench ? 'Niveau Cognitif de Bloom : ' : 'Bloom Cognitive Level: '}</span>
                  {isFrench ? bloom.nameFr : bloom.nameEn} (Verbes d\'action : {lesson.bloomActionVerbs.join(', ')})
                </div>
                <div className="text-[9.5pt]">
                  <span className="font-bold">{isFrench ? 'OPO Général : ' : 'Overall SMART Objective: '}</span>
                  {lesson.smartObjectives.overall}
                </div>
                <ul className="list-disc pl-5 text-[9pt]">
                  {lesson.smartObjectives.specificItems.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>

              {/* Entry Behavior & Didactic Aids */}
              <div className="grid grid-cols-2 gap-2 text-[9.5pt] font-sans">
                <div className="border border-black p-2">
                  <div className="font-bold border-b border-black pb-0.5 mb-1">
                    {isFrench ? 'II. PRÉREQUIS / ENTRÉE' : 'II. PREVIOUS KNOWLEDGE'}
                  </div>
                  <div>{lesson.previousKnowledge}</div>
                </div>
                <div className="border border-black p-2">
                  <div className="font-bold border-b border-black pb-0.5 mb-1">
                    {isFrench ? 'III. MATÉRIEL DIDACTIQUE' : 'III. TEACHING-LEARNING AIDS'}
                  </div>
                  <ul className="list-disc pl-4 text-[9pt]">
                    {lesson.didacticMaterials.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Didactic Progression Table */}
              <div className="border border-black font-sans">
                <div className="p-1.5 font-bold border-b border-black bg-slate-100 text-[10pt]">
                  {isFrench ? 'IV. DÉROULEMENT DIDACTIQUE ET ÉTAPES DE LA LEÇON' : 'IV. DIDACTIC PROGRESSION AND TEACHING STEPS'}
                </div>
                <table className="w-full text-left text-[9pt] border-collapse">
                  <thead>
                    <tr className="border-b border-black bg-slate-50 font-bold">
                      <th className="p-1 border-r border-black w-8 text-center">N°</th>
                      <th className="p-1 border-r border-black w-32">{isFrench ? 'Étape / Durée' : 'Step / Time'}</th>
                      <th className="p-1 border-r border-black">{isFrench ? 'Activités du Maître' : 'Teacher Activities'}</th>
                      <th className="p-1 border-r border-black">{isFrench ? 'Activités des Élèves' : 'Pupil Activities'}</th>
                      <th className="p-1 w-24">{isFrench ? 'Supports' : 'Aids'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lesson.didacticSteps.map((step) => (
                      <tr key={step.stepNumber} className="border-b border-black last:border-b-0">
                        <td className="p-1 border-r border-black text-center font-bold">{step.stepNumber}</td>
                        <td className="p-1 border-r border-black font-semibold">
                          {step.title}
                          <div className="text-[8pt] font-normal">({step.durationMinutes} min)</div>
                        </td>
                        <td className="p-1 border-r border-black">{step.teacherActivity}</td>
                        <td className="p-1 border-r border-black">{step.pupilActivity}</td>
                        <td className="p-1 text-[8pt]">{step.didacticAids}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Blackboard Summary Notes */}
              <div className="border border-black p-2.5 font-sans space-y-1">
                <div className="font-bold border-b border-black pb-0.5 text-[10pt]">
                  {isFrench ? 'V. RÉSUMÉ DE COURS DU MAÎTRE (TRACE ÉCRITE POUR L\'ÉLÈVE)' : 'V. TEACHER\'S CHALKBOARD SUMMARY NOTES (PUPIL NOTEBOOK CONTENT)'}
                </div>
                <div className="text-[9.5pt] font-bold text-center underline uppercase">
                  {lesson.chalkboardNotes.title}
                </div>
                <div className="text-[9pt] italic">
                  {lesson.chalkboardNotes.summary}
                </div>
                <ul className="list-disc pl-5 text-[9pt]">
                  {lesson.chalkboardNotes.keyPoints.map((kp, idx) => (
                    <li key={idx}>{kp}</li>
                  ))}
                </ul>
              </div>

              {/* Evaluation & Differentiation */}
              <div className="grid grid-cols-2 gap-2 text-[9pt] font-sans">
                <div className="border border-black p-2 space-y-1">
                  <div className="font-bold border-b border-black pb-0.5">
                    {isFrench ? 'VI. ÉVALUATION FORMATIVE' : 'VI. FORMATIVE EVALUATION'}
                  </div>
                  {lesson.formativeEvaluation.questions.map((q, idx) => (
                    <div key={idx}>
                      <span className="font-bold">Q{idx + 1}: </span>{q}
                      <div className="italic text-[8.5pt] pl-2 text-slate-800">
                        R: {lesson.formativeEvaluation.expectedAnswers[idx]}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border border-black p-2 space-y-1">
                  <div className="font-bold border-b border-black pb-0.5">
                    {isFrench ? 'VII. DIFFÉRENCIATION & REMÉDIATION' : 'VII. DIFFERENTIATION & REMEDIATION'}
                  </div>
                  <div>
                    <span className="font-bold">{isFrench ? 'Remédiation : ' : 'Remediation: '}</span>
                    {lesson.remediationPlan.forStrugglingPupils}
                  </div>
                  <div>
                    <span className="font-bold">{isFrench ? 'Enrichissement : ' : 'Enrichment: '}</span>
                    {lesson.remediationPlan.forFastLearners}
                  </div>
                </div>
              </div>

              {/* Signatures & Visas */}
              <div className="border border-black p-2 font-sans grid grid-cols-3 gap-4 text-center text-[9pt]">
                <div className="pt-8 border-t border-dotted border-black">
                  <div className="font-bold">{isFrench ? 'Signature de l\'Enseignant' : 'Teacher\'s Signature'}</div>
                </div>
                <div className="pt-8 border-t border-dotted border-black">
                  <div className="font-bold">{isFrench ? 'Visa du Directeur d\'École' : 'Head Teacher\'s Visa & Stamp'}</div>
                </div>
                <div className="pt-8 border-t border-dotted border-black">
                  <div className="font-bold">{isFrench ? 'Visa de l\'Inspecteur Pédagogique' : 'Pedagogical Inspector\'s Visa'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Timetable Document */}
          {activeDoc === 'weekly' && (
            <div className="space-y-4">
              <div className="text-center border-b-2 border-black pb-2">
                <h2 className="text-base font-bold uppercase">
                  {isFrench ? 'RÉPUBLIQUE DU CAMEROUN · MINISTÈRE DE L\'ÉDUCATION DE BASE' : 'REPUBLIC OF CAMEROON · MINISTRY OF BASIC EDUCATION'}
                </h2>
                <h3 className="text-sm font-bold">
                  {schoolInfo.schoolName} — {isFrench ? `Année Scolaire : ${schoolInfo.academicYear}` : `Academic Year: ${schoolInfo.academicYear}`}
                </h3>
                <h4 className="text-sm font-bold text-emerald-900 mt-1 uppercase">
                  {isFrench
                    ? `EMPLOI DU TEMPS & CAHIER JOURNAL : SEMAINE ${weekNumber} (${monthlyUnit?.monthName})`
                    : `WEEKLY TIMETABLE & SCHEME OF WORK: WEEK ${weekNumber} (${monthlyUnit?.monthName})`}
                </h4>
                <div className="text-xs text-slate-700">
                  {getLevelName(subsystem, level)} · {getClassName(subsystem, classType)} · {isFrench ? `Maître : ${schoolInfo.teacherName}` : `Teacher: ${schoolInfo.teacherName}`}
                </div>
              </div>

              <div className="border border-black">
                <table className="w-full text-left text-[8.5pt] border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-black bg-slate-100 font-bold">
                      <th className="p-1 border-r border-black w-20">{isFrench ? 'Horaire' : 'Time'}</th>
                      {schedule.days.map((d, i) => (
                        <th key={i} className="p-1 border-r border-black last:border-r-0">{d.dayName}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.days[0].slots.map((_, timeIdx) => {
                      const sample = schedule.days[0].slots[timeIdx];
                      return (
                        <tr key={timeIdx} className="border-b border-black last:border-b-0">
                          <td className="p-1 border-r border-black font-mono font-medium text-[8pt] whitespace-nowrap">
                            {sample.startTime} - {sample.endTime}
                          </td>
                          {schedule.days.map((day, dayIdx) => {
                            const slot = day.slots[timeIdx];
                            if (slot.isBreak) {
                              return (
                                <td key={dayIdx} className="p-1 text-center font-bold bg-slate-50 border-r border-black last:border-r-0">
                                  {slot.lessonTitle}
                                </td>
                              );
                            }
                            const s = subjects.find(sub => sub.id === slot.subjectId);
                            return (
                              <td key={dayIdx} className="p-1 border-r border-black last:border-r-0">
                                <div className="font-bold text-[8.5pt]">{s?.code || ''}</div>
                                <div className="text-[8pt] text-slate-800">{slot.lessonTitle}</div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="border border-black p-2 font-sans text-[9pt]">
                <div className="font-bold text-emerald-950 uppercase">
                  {isFrench ? 'Vendredi Après-Midi : Activités d\'Intégration & Remédiation' : 'Friday Afternoon: Remedial & Integration Clinic'}
                </div>
                <div className="text-slate-800 mt-0.5">{schedule.fridayIntegration.title} : {schedule.fridayIntegration.description}</div>
              </div>
            </div>
          )}

          {/* Monthly Scheme Document */}
          {activeDoc === 'monthly' && (
            <div className="space-y-4">
              <div className="text-center border-b-2 border-black pb-2">
                <h2 className="text-base font-bold uppercase">
                  {isFrench ? 'RÉPUBLIQUE DU CAMEROUN · MINISTÈRE DE L\'ÉDUCATION DE BASE' : 'REPUBLIC OF CAMEROON · MINISTRY OF BASIC EDUCATION'}
                </h2>
                <h3 className="text-sm font-bold text-emerald-900 mt-1 uppercase">
                  {isFrench
                    ? `PROGRAMME PÉDAGOGIQUE MENSUEL : ${monthlyUnit?.monthName}`
                    : `OFFICIAL MONTHLY SCHEME OF WORK: ${monthlyUnit?.monthName}`}
                </h3>
                <div className="text-xs text-slate-700">
                  {getLevelName(subsystem, level)} · {getClassName(subsystem, classType)} · {schoolInfo.schoolName}
                </div>
              </div>

              <div className="border border-black p-2.5 font-sans space-y-1">
                <div className="font-bold text-[10pt] uppercase text-emerald-900">
                  {isFrench ? 'Thème Intégrateur (ILT) : ' : 'Integrated Learning Theme (ILT): '}
                  « {monthlyUnit?.iltTheme} »
                </div>
                <div className="text-[9pt]">
                  <span className="font-bold">{isFrench ? 'Projet Mensuel : ' : 'Monthly Project: '}</span>
                  {monthlyUnit?.monthlyProject.title} — {monthlyUnit?.monthlyProject.objective}
                </div>
              </div>

              <div className="border border-black font-sans">
                <table className="w-full text-left text-[8.5pt] border-collapse">
                  <thead>
                    <tr className="bg-slate-100 font-bold border-b border-black">
                      <th className="p-1 border-r border-black w-8">#</th>
                      <th className="p-1 border-r border-black">{isFrench ? 'Discipline' : 'Subject'}</th>
                      <th className="p-1 border-r border-black">{isFrench ? 'Sous-composantes' : 'Sub-components'}</th>
                      <th className="p-1 border-r border-black text-right">{isFrench ? 'Quota Hebdo' : 'Weekly Time'}</th>
                      <th className="p-1 text-right">{isFrench ? 'Quota Mensuel' : 'Monthly Time'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((sub, i) => (
                      <tr key={sub.id} className="border-b border-black last:border-b-0">
                        <td className="p-1 border-r border-black font-bold text-center">{i + 1}</td>
                        <td className="p-1 border-r border-black font-bold">{sub.name}</td>
                        <td className="p-1 border-r border-black">{sub.subComponents.map(c => c.name).join(', ')}</td>
                        <td className="p-1 border-r border-black text-right font-semibold">
                          {(level === 'level-1' ? 2.5 : 3.0)} h
                        </td>
                        <td className="p-1 text-right font-bold text-emerald-900">
                          {(level === 'level-1' ? 10.0 : 12.0)} h
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Project Guide Document */}
          {activeDoc === 'project' && monthlyUnit?.monthlyProject && (
            <div className="space-y-4 font-sans">
              <div className="text-center border-b-2 border-black pb-2">
                <h2 className="text-base font-bold uppercase">
                  {isFrench ? 'MINISTÈRE DE L\'ÉDUCATION DE BASE · PROJET PÉDAGOGIQUE' : 'MINISTRY OF BASIC EDUCATION · MONTHLY PROJECT'}
                </h2>
                <h3 className="text-sm font-bold text-emerald-900 mt-1 uppercase">
                  {monthlyUnit.monthlyProject.title}
                </h3>
                <div className="text-xs text-slate-700">
                  {getLevelName(subsystem, level)} · {monthlyUnit.monthName} · {monthlyUnit.iltTheme}
                </div>
              </div>

              <div className="border border-black p-3 space-y-2">
                <div>
                  <span className="font-bold">{isFrench ? 'Objectif du Projet : ' : 'Project Objective: '}</span>
                  {monthlyUnit.monthlyProject.objective}
                </div>
                <div>
                  <span className="font-bold">{isFrench ? 'Tâches Pratiques : ' : 'Practical Tasks: '}</span>
                  <ul className="list-disc pl-5 mt-1">
                    {monthlyUnit.monthlyProject.practicalTasks.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-bold">{isFrench ? 'Matériaux Locaux : ' : 'Local Materials: '}</span>
                  {monthlyUnit.monthlyProject.requiredLocalMaterials.join(', ')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
