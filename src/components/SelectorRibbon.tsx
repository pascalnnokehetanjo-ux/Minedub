import React from 'react';
import {
  SubsystemType,
  LevelType,
  ClassType,
  BloomLevel,
  Subject
} from '../types/curriculum';
import { BLOOM_LEVELS } from '../utils/bloomsTaxonomy';
import { getSubjects } from '../data/curriculumData';

interface SelectorRibbonProps {
  subsystem: SubsystemType;
  onSubsystemChange: (s: SubsystemType) => void;
  level: LevelType;
  onLevelChange: (l: LevelType) => void;
  classType: ClassType;
  onClassChange: (c: ClassType) => void;
  monthNumber: number;
  onMonthChange: (m: number) => void;
  weekNumber: number;
  onWeekChange: (w: number) => void;
  subjectId: string;
  onSubjectChange: (s: string) => void;
  subComponentId: string;
  onSubComponentChange: (c: string) => void;
  topic: string;
  onTopicChange: (t: string) => void;
  lessonTitle: string;
  onLessonTitleChange: (lt: string) => void;
  bloomLevel: BloomLevel;
  onBloomLevelChange: (b: BloomLevel) => void;
  onGenerate: () => void;
}

export const SelectorRibbon: React.FC<SelectorRibbonProps> = ({
  subsystem,
  onSubsystemChange,
  level,
  onLevelChange,
  classType,
  onClassChange,
  monthNumber,
  onMonthChange,
  weekNumber,
  onWeekChange,
  subjectId,
  onSubjectChange,
  subComponentId,
  onSubComponentChange,
  topic,
  onTopicChange,
  lessonTitle,
  onLessonTitleChange,
  bloomLevel,
  onBloomLevelChange,
  onGenerate
}) => {
  const isFrench = subsystem === 'francophone';
  const subjects = getSubjects(subsystem);
  const currentSubject = subjects.find(s => s.id === subjectId) || subjects[0];
  const subComponents = currentSubject?.subComponents || [];

  // Month labels
  const monthLabels = isFrench
    ? [
        { num: 1, name: 'Mois 1 (Septembre)' },
        { num: 2, name: 'Mois 2 (Octobre)' },
        { num: 3, name: 'Mois 3 (Novembre)' },
        { num: 4, name: 'Mois 4 (Décembre)' },
        { num: 5, name: 'Mois 5 (Janvier)' },
        { num: 6, name: 'Mois 6 (Février)' },
        { num: 7, name: 'Mois 7 (Mars)' },
        { num: 8, name: 'Mois 8 (Avril)' },
        { num: 9, name: 'Mois 9 (Mai/Juin)' }
      ]
    : [
        { num: 1, name: 'Month 1 (September)' },
        { num: 2, name: 'Month 2 (October)' },
        { num: 3, name: 'Month 3 (November)' },
        { num: 4, name: 'Month 4 (December)' },
        { num: 5, name: 'Month 5 (January)' },
        { num: 6, name: 'Month 6 (February)' },
        { num: 7, name: 'Month 7 (March)' },
        { num: 8, name: 'Month 8 (April)' },
        { num: 9, name: 'Month 9 (May/June)' }
      ];

  // Classes according to level and subsystem
  const availableClasses = isFrench
    ? level === 'level-1'
      ? [{ id: 'sil', name: 'SIL' }, { id: 'cp', name: 'CP' }]
      : level === 'level-2'
      ? [{ id: 'ce1', name: 'CE1' }, { id: 'ce2', name: 'CE2' }]
      : [{ id: 'cm1', name: 'CM1' }, { id: 'cm2', name: 'CM2' }]
    : level === 'level-1'
    ? [{ id: 'class-1', name: 'Class 1' }, { id: 'class-2', name: 'Class 2' }]
    : level === 'level-2'
    ? [{ id: 'class-3', name: 'Class 3' }, { id: 'class-4', name: 'Class 4' }]
    : [{ id: 'class-5', name: 'Class 5' }, { id: 'class-6', name: 'Class 6' }];

  return (
    <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-2xs no-print">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Row 1: Subsystem, Level, Class, Month, Week */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {/* Subsystem Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isFrench ? 'Sous-système' : 'Subsystem'}
            </label>
            <select
              value={subsystem}
              onChange={e => onSubsystemChange(e.target.value as SubsystemType)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              <option value="anglophone">Anglophone (MINEDUB)</option>
              <option value="francophone">Francophone (MINEDUB)</option>
            </select>
          </div>

          {/* Level Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isFrench ? 'Niveau' : 'Level'}
            </label>
            <select
              value={level}
              onChange={e => onLevelChange(e.target.value as LevelType)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              <option value="level-1">
                {isFrench ? 'Niveau 1 (SIL, CP)' : 'Level 1 (Class 1, 2)'}
              </option>
              <option value="level-2">
                {isFrench ? 'Niveau 2 (CE1, CE2)' : 'Level 2 (Class 3, 4)'}
              </option>
              <option value="level-3">
                {isFrench ? 'Niveau 3 (CM1, CM2)' : 'Level 3 (Class 5, 6)'}
              </option>
            </select>
          </div>

          {/* Class Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isFrench ? 'Classe' : 'Class'}
            </label>
            <select
              value={classType}
              onChange={e => onClassChange(e.target.value as ClassType)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              {availableClasses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Month Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isFrench ? 'Mois Pédagogique' : 'Academic Month'}
            </label>
            <select
              value={monthNumber}
              onChange={e => onMonthChange(Number(e.target.value))}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              {monthLabels.map(m => (
                <option key={m.num} value={m.num}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Week Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isFrench ? 'Semaine du Mois' : 'Week of Month'}
            </label>
            <select
              value={weekNumber}
              onChange={e => onWeekChange(Number(e.target.value))}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              <option value={1}>{isFrench ? 'Semaine 1 (Leçons & Intégration)' : 'Week 1 (Lessons & Integration)'}</option>
              <option value={2}>{isFrench ? 'Semaine 2 (Leçons & Intégration)' : 'Week 2 (Lessons & Integration)'}</option>
              <option value={3}>{isFrench ? 'Semaine 3 (Leçons & Intégration)' : 'Week 3 (Lessons & Integration)'}</option>
              <option value={4} className="font-semibold text-amber-700">
                {isFrench ? 'Semaine 4 (Révision / Éval / Remédiation)' : 'Week 4 (Revision / Eval / Remediation)'}
              </option>
            </select>
          </div>
        </div>

        {/* Row 2: Subject, Sub-component, Bloom's Level */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Subject (1 of 10) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isFrench ? 'Discipline / Matière (10 Matières)' : 'Subject (1 of 10 Subjects)'}
            </label>
            <select
              value={subjectId}
              onChange={e => {
                const newSubId = e.target.value;
                onSubjectChange(newSubId);
                const s = subjects.find(sub => sub.id === newSubId);
                if (s && s.subComponents[0]) {
                  onSubComponentChange(s.subComponents[0].id);
                }
              }}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              {subjects.map((s, idx) => (
                <option key={s.id} value={s.id}>
                  {idx + 1}. {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Sub-component */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isFrench ? 'Sous-composante' : 'Sub-component'}
            </label>
            <select
              value={subComponentId}
              onChange={e => onSubComponentChange(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              {subComponents.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Bloom's Taxonomy Cognitive Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isFrench ? 'Niveau Taxonomique de Bloom' : 'Bloom\'s Taxonomy Cognitive Level'}
            </label>
            <select
              value={bloomLevel}
              onChange={e => onBloomLevelChange(e.target.value as BloomLevel)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              {(Object.keys(BLOOM_LEVELS) as BloomLevel[]).map(key => {
                const b = BLOOM_LEVELS[key];
                return (
                  <option key={key} value={key}>
                    {b.order}. {isFrench ? b.nameFr : b.nameEn}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Row 3: Topic, Lesson Title, and Generate Button */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isFrench ? 'Thème / Notion (Syllabus MINEDUB)' : 'Topic / Core Notion'}
            </label>
            <input
              type="text"
              value={topic}
              onChange={e => onTopicChange(e.target.value)}
              placeholder={isFrench ? 'Ex: Dénombrement de 1 à 10, Les salutations...' : 'Ex: Counting 1 to 10, Polite greetings...'}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isFrench ? 'Titre de la Leçon (Fiche Pédagogique)' : 'Specific Lesson Title'}
            </label>
            <input
              type="text"
              value={lessonTitle}
              onChange={e => onLessonTitleChange(e.target.value)}
              placeholder={isFrench ? 'Ex: Compter et former des collections de 1 à 10' : 'Ex: Counting and forming sets from 1 to 10'}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              onClick={onGenerate}
              className="w-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg py-2 px-3 transition-colors shadow-2xs whitespace-nowrap"
            >
              {isFrench ? 'Générer la Fiche' : 'Generate Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
