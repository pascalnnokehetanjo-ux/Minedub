import React from 'react';
import { SubsystemType, LevelType } from '../types/curriculum';
import { getTimeAllocations, getSubjects } from '../data/curriculumData';
import { Clock, BookOpen, Layers, Printer } from 'lucide-react';

interface TimeMatrixViewProps {
  subsystem: SubsystemType;
  onPrint: () => void;
}

export const TimeMatrixView: React.FC<TimeMatrixViewProps> = ({
  subsystem,
  onPrint
}) => {
  const isFrench = subsystem === 'francophone';
  const allocations = getTimeAllocations(subsystem);
  const subjects = getSubjects(subsystem);

  // Totals for Level 1, 2, 3
  const totalL1WeeklyMins = allocations.reduce((acc, a) => acc + a.level1WeeklyMinutes, 0);
  const totalL2WeeklyMins = allocations.reduce((acc, a) => acc + a.level2WeeklyMinutes, 0);
  const totalL3WeeklyMins = allocations.reduce((acc, a) => acc + a.level3WeeklyMinutes, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              {isFrench
                ? 'GRILLE HORAIRE OFFICIELLE NATIONALE · MINEDUB CURRICULUM 2018'
                : 'OFFICIAL NATIONAL STATUTORY TIME ALLOCATIONS · MINEDUB 2018'}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {isFrench
                ? 'Volume Horaire Statutaire des 10 Matières (Jour / Semaine / Mois)'
                : 'Statutory Time Matrix for 10 Subjects (Day / Week / Month)'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isFrench
                ? 'Conformité stricte aux arrêtés ministériels MINEDUB régissant l\'organisation du temps scolaire au Cameroun.'
                : 'Strict alignment with Cameroon Ministerial Orders governing pedagogical time distribution.'}
            </p>
          </div>

          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors no-print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isFrench ? 'Imprimer la Grille' : 'Print Time Matrix'}</span>
          </button>
        </div>

        {/* Global Summary KPI strip */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 block">
              {isFrench ? 'Niveau 1 (SIL, CP / Class 1, 2) :' : 'Level 1 (Class 1 & 2):'}
            </span>
            <div className="text-lg font-bold text-slate-900 mt-0.5 tabular-nums">
              {(totalL1WeeklyMins / 60).toFixed(1)} h / {isFrench ? 'semaine' : 'week'}
            </div>
            <div className="text-[11px] text-slate-500">
              ~{(totalL1WeeklyMins / 5).toFixed(0)} min / {isFrench ? 'jour' : 'day'} · {((totalL1WeeklyMins * 4) / 60).toFixed(1)} h / {isFrench ? 'mois' : 'month'}
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 block">
              {isFrench ? 'Niveau 2 (CE1, CE2 / Class 3, 4) :' : 'Level 2 (Class 3 & 4):'}
            </span>
            <div className="text-lg font-bold text-slate-900 mt-0.5 tabular-nums">
              {(totalL2WeeklyMins / 60).toFixed(1)} h / {isFrench ? 'semaine' : 'week'}
            </div>
            <div className="text-[11px] text-slate-500">
              ~{(totalL2WeeklyMins / 5).toFixed(0)} min / {isFrench ? 'jour' : 'day'} · {((totalL2WeeklyMins * 4) / 60).toFixed(1)} h / {isFrench ? 'mois' : 'month'}
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 block">
              {isFrench ? 'Niveau 3 (CM1, CM2 / Class 5, 6) :' : 'Level 3 (Class 5 & 6):'}
            </span>
            <div className="text-lg font-bold text-slate-900 mt-0.5 tabular-nums">
              {(totalL3WeeklyMins / 60).toFixed(1)} h / {isFrench ? 'semaine' : 'week'}
            </div>
            <div className="text-[11px] text-slate-500">
              ~{(totalL3WeeklyMins / 5).toFixed(0)} min / {isFrench ? 'jour' : 'day'} · {((totalL3WeeklyMins * 4) / 60).toFixed(1)} h / {isFrench ? 'mois' : 'month'}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            {isFrench
              ? 'Ventilation Détaillée par Discipline & par Niveau'
              : 'Detailed Subject Hourly Quotas by Level'}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">{isFrench ? 'Matière / Discipline' : 'Subject'}</th>
                <th className="py-2.5 px-3 text-center" colSpan={2}>
                  {isFrench ? 'Niveau 1 (SIL - CP)' : 'Level 1 (Class 1-2)'}
                </th>
                <th className="py-2.5 px-3 text-center" colSpan={2}>
                  {isFrench ? 'Niveau 2 (CE1 - CE2)' : 'Level 2 (Class 3-4)'}
                </th>
                <th className="py-2.5 px-3 text-center" colSpan={2}>
                  {isFrench ? 'Niveau 3 (CM1 - CM2)' : 'Level 3 (Class 5-6)'}
                </th>
                <th className="py-2.5 px-3">{isFrench ? 'Répartition Journalière' : 'Daily Pacing'}</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium text-[11px]">
                <th></th>
                <th></th>
                <th className="py-1.5 px-2 text-right">{isFrench ? 'Hebdo' : 'Weekly'}</th>
                <th className="py-1.5 px-2 text-right">{isFrench ? 'Mensuel' : 'Monthly'}</th>
                <th className="py-1.5 px-2 text-right">{isFrench ? 'Hebdo' : 'Weekly'}</th>
                <th className="py-1.5 px-2 text-right">{isFrench ? 'Mensuel' : 'Monthly'}</th>
                <th className="py-1.5 px-2 text-right">{isFrench ? 'Hebdo' : 'Weekly'}</th>
                <th className="py-1.5 px-2 text-right">{isFrench ? 'Mensuel' : 'Monthly'}</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allocations.map((alloc, idx) => {
                const subj = subjects.find(s => s.id === alloc.subjectId);

                return (
                  <tr key={alloc.subjectId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-400 tabular-nums">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{alloc.subjectName}</div>
                      <div className="text-slate-400 text-[11px]">{subj?.pedagogicalDomain}</div>
                    </td>

                    {/* Level 1 */}
                    <td className="py-2.5 px-2 text-right font-medium text-slate-800 tabular-nums">
                      {(alloc.level1WeeklyMinutes / 60).toFixed(1)} h
                    </td>
                    <td className="py-2.5 px-2 text-right font-semibold text-emerald-800 tabular-nums">
                      {((alloc.level1WeeklyMinutes * 4) / 60).toFixed(1)} h
                    </td>

                    {/* Level 2 */}
                    <td className="py-2.5 px-2 text-right font-medium text-slate-800 tabular-nums">
                      {(alloc.level2WeeklyMinutes / 60).toFixed(1)} h
                    </td>
                    <td className="py-2.5 px-2 text-right font-semibold text-emerald-800 tabular-nums">
                      {((alloc.level2WeeklyMinutes * 4) / 60).toFixed(1)} h
                    </td>

                    {/* Level 3 */}
                    <td className="py-2.5 px-2 text-right font-medium text-slate-800 tabular-nums">
                      {(alloc.level3WeeklyMinutes / 60).toFixed(1)} h
                    </td>
                    <td className="py-2.5 px-2 text-right font-semibold text-emerald-800 tabular-nums">
                      {((alloc.level3WeeklyMinutes * 4) / 60).toFixed(1)} h
                    </td>

                    <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                      {alloc.dailyPeriodsHint}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold text-slate-900 border-t border-slate-300">
                <td colSpan={2} className="py-3 px-3 text-right">
                  {isFrench ? 'TOTAL OFFICIEL MINEDUB :' : 'TOTAL OFFICIAL MINEDUB:'}
                </td>
                <td className="py-3 px-2 text-right text-emerald-900 tabular-nums">
                  {(totalL1WeeklyMins / 60).toFixed(1)} h
                </td>
                <td className="py-3 px-2 text-right text-emerald-900 tabular-nums">
                  {((totalL1WeeklyMins * 4) / 60).toFixed(1)} h
                </td>
                <td className="py-3 px-2 text-right text-emerald-900 tabular-nums">
                  {(totalL2WeeklyMins / 60).toFixed(1)} h
                </td>
                <td className="py-3 px-2 text-right text-emerald-900 tabular-nums">
                  {((totalL2WeeklyMins * 4) / 60).toFixed(1)} h
                </td>
                <td className="py-3 px-2 text-right text-emerald-900 tabular-nums">
                  {(totalL3WeeklyMins / 60).toFixed(1)} h
                </td>
                <td className="py-3 px-2 text-right text-emerald-900 tabular-nums">
                  {((totalL3WeeklyMins * 4) / 60).toFixed(1)} h
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
