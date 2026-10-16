import React from 'react';
import {
  SubsystemType,
  LevelType,
  ClassType,
  TimetableSlot
} from '../types/curriculum';
import { generateWeeklySchedule, getLevelName, getClassName } from '../utils/lessonGenerator';
import { getSubjects, getMonthlyUnit } from '../data/curriculumData';
import { Clock, Calendar, AlertCircle, Sparkles, Printer, ArrowRight } from 'lucide-react';

interface WeeklyPlanViewProps {
  subsystem: SubsystemType;
  level: LevelType;
  classType: ClassType;
  monthNumber: number;
  weekNumber: number;
  onSelectSlot: (slot: TimetableSlot) => void;
  onPrint: () => void;
}

export const WeeklyPlanView: React.FC<WeeklyPlanViewProps> = ({
  subsystem,
  level,
  classType,
  monthNumber,
  weekNumber,
  onSelectSlot,
  onPrint
}) => {
  const isFrench = subsystem === 'francophone';
  const subjects = getSubjects(subsystem);
  const monthlyUnit = getMonthlyUnit(subsystem, monthNumber);
  const schedule = generateWeeklySchedule(subsystem, level, monthNumber, weekNumber);
  const isWeek4 = weekNumber === 4;

  return (
    <div className="space-y-6">
      {/* Official Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              {isFrench
                ? 'CAHIER DE CHARGES & RÉPARTITION HEBDOMADAIRE · MINEDUB 2018'
                : 'WEEKLY SCHEME OF WORK & TIMETABLE · MINEDUB 2018'}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {isFrench
                ? `Emploi du Temps et Répartition : Semaine ${weekNumber} (${monthlyUnit?.monthName})`
                : `Weekly Timetable & Lesson Schedule: Week ${weekNumber} (${monthlyUnit?.monthName})`}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>{getLevelName(subsystem, level)}</span>
              <span aria-hidden="true">·</span>
              <span>{getClassName(subsystem, classType)}</span>
              <span aria-hidden="true">·</span>
              <span>
                {isWeek4
                  ? (isFrench ? 'Semaine d\'Intégration & Révision Mensuelle' : 'Monthly Revision & Remediation Week')
                  : (isFrench ? 'Apprentissages Ponctuels & Intégration' : 'Core Instructional & Integration Week')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors no-print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isFrench ? 'Imprimer l\'Emploi du Temps' : 'Print Weekly Schedule'}</span>
            </button>
          </div>
        </div>

        {/* Coherence Notification Box */}
        <div className={`mt-4 p-3.5 rounded-lg border text-xs ${
          isWeek4
            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
            : 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
        }`}>
          <div className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {isFrench ? 'Principe de Cohérence Curriculaire MINEDUB :' : 'Curricular Coherence Mandate:'}
            </span>
          </div>
          <p className="mt-1 text-slate-700">
            {isFrench
              ? 'Toute leçon enseignée en classe découle directement de ce cahier hebdomadaire, lequel est extrait du programme mensuel. Les vendredis après-midi sont statutairement consacrés aux activités d\'intégration et de remédiation.'
              : 'Every lesson taught in class is drawn directly from this weekly plan, which is extracted from the monthly scheme. Friday afternoons are statutorily reserved for remedial and integration activities.'}
          </p>
        </div>
      </div>

      {/* Monday - Friday Schedule Grid */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            {isFrench ? 'Grille Pédagogique Quotidienne (Lundi - Vendredi)' : 'Daily Pedagogical Schedule (Monday - Friday)'}
          </h2>
          <span className="text-xs text-slate-500">
            {isFrench ? 'Cliquez sur une leçon pour générer la fiche détaillée' : 'Click any slot to open full Lesson Plan'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-2.5 px-3 w-28">{isFrench ? 'Horaire' : 'Time Slot'}</th>
                {schedule.days.map((d, idx) => (
                  <th key={idx} className="py-2.5 px-3 min-w-44">
                    {d.dayName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schedule.days[0].slots.map((_, timeIndex) => {
                const sampleSlot = schedule.days[0].slots[timeIndex];
                const isBreak = sampleSlot.isBreak;
                const isRemedial = sampleSlot.isRemedialIntegration;

                return (
                  <tr
                    key={timeIndex}
                    className={
                      isBreak
                        ? 'bg-amber-50/40 text-amber-900 font-semibold'
                        : isRemedial
                        ? 'bg-emerald-50/40'
                        : 'hover:bg-slate-50/70'
                    }
                  >
                    {/* Time Slot Column */}
                    <td className="py-2.5 px-3 font-medium text-slate-500 tabular-nums whitespace-nowrap align-top border-r border-slate-100">
                      <div>{sampleSlot.startTime} - {sampleSlot.endTime}</div>
                      <div className="text-[10px] text-slate-400">({sampleSlot.durationMinutes} min)</div>
                    </td>

                    {/* Day Columns */}
                    {schedule.days.map((day, dayIndex) => {
                      const slot = day.slots[timeIndex];
                      if (!slot) return <td key={dayIndex} className="py-2.5 px-3"></td>;

                      if (slot.isBreak) {
                        return (
                          <td
                            key={dayIndex}
                            className="py-2 px-3 text-center text-xs font-semibold text-amber-800 bg-amber-50/30"
                          >
                            ☕ {slot.lessonTitle}
                          </td>
                        );
                      }

                      if (slot.isRemedialIntegration) {
                        return (
                          <td
                            key={dayIndex}
                            onClick={() => onSelectSlot(slot)}
                            className="py-2.5 px-3 cursor-pointer bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 transition-colors"
                          >
                            <div className="font-bold text-emerald-900 text-xs">
                              ⭐ {slot.lessonTitle}
                            </div>
                            <div className="text-[10px] text-emerald-700 mt-0.5">
                              {isFrench ? 'Intégration & Remédiation' : 'Integration & Remediation'}
                            </div>
                          </td>
                        );
                      }

                      const subj = subjects.find(s => s.id === slot.subjectId);

                      return (
                        <td
                          key={dayIndex}
                          onClick={() => onSelectSlot(slot)}
                          className="py-2.5 px-3 cursor-pointer hover:bg-emerald-50/40 transition-colors border-r border-slate-100/60 align-top group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-[11px] group-hover:text-emerald-800">
                              {subj?.name || slot.subjectId}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              {subj?.code}
                            </span>
                          </div>
                          <div className="text-slate-600 text-xs mt-0.5 font-medium line-clamp-2">
                            {slot.lessonTitle}
                          </div>
                          <div className="text-[10px] text-emerald-600 mt-1 opacity-0 group-hover:opacity-100 flex items-center gap-0.5">
                            <span>{isFrench ? 'Préparer fiche' : 'Open Plan'}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Friday Remedial & Integration Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
          <AlertCircle className="w-4 h-4 text-emerald-700" />
          <span>
            {isFrench
              ? 'ACTIVITÉ D\'INTÉGRATION ET REMÉDIATION DE FIN DE SEMAINE (VENDREDI APRÈS-MIDI)'
              : 'FRIDAY REMEDIAL & INTEGRATION PEDAGOGICAL CLINIC (OFFICIAL MINEDUB SPECIFICATION)'}
          </span>
        </div>

        <div className="mt-3 p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
          <h3 className="text-sm font-bold text-slate-900">
            {schedule.fridayIntegration.title}
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            {schedule.fridayIntegration.description}
          </p>
          <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-semibold text-slate-900">
                {isFrench ? 'Compétences ciblées : ' : 'Targeted Competencies: '}
              </span>
              <span className="text-slate-600">{schedule.fridayIntegration.competenciesTargeted}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-900">
                {isFrench ? 'Dispositif de remédiation : ' : 'Remediation Task: '}
              </span>
              <span className="text-slate-600">{schedule.fridayIntegration.remediationTask}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
