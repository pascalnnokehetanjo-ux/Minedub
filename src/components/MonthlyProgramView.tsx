import React from 'react';
import {
  SubsystemType,
  LevelType,
  ClassType,
  MonthlyUnit
} from '../types/curriculum';
import {
  getSubjects,
  getMonthlyUnit,
  getTimeAllocations
} from '../data/curriculumData';
import { getLevelName, getClassName, getSubjectTimeBreakdown } from '../utils/lessonGenerator';
import { Clock, Calendar, CheckCircle2, AlertCircle, Sparkles, Printer } from 'lucide-react';

interface MonthlyProgramViewProps {
  subsystem: SubsystemType;
  level: LevelType;
  classType: ClassType;
  monthNumber: number;
  onSelectWeek: (weekNum: number) => void;
  onSelectSubject: (subId: string) => void;
  onPrint: () => void;
}

export const MonthlyProgramView: React.FC<MonthlyProgramViewProps> = ({
  subsystem,
  level,
  classType,
  monthNumber,
  onSelectWeek,
  onSelectSubject,
  onPrint
}) => {
  const isFrench = subsystem === 'francophone';
  const subjects = getSubjects(subsystem);
  const monthlyUnit = getMonthlyUnit(subsystem, monthNumber);
  const timeAllocations = getTimeAllocations(subsystem);

  const totalWeeklyMinutes = timeAllocations.reduce((sum, item) => {
    const mins = level === 'level-1' ? item.level1WeeklyMinutes : level === 'level-2' ? item.level2WeeklyMinutes : item.level3WeeklyMinutes;
    return sum + mins;
  }, 0);
  const totalWeeklyHours = (totalWeeklyMinutes / 60).toFixed(1);
  const totalMonthlyHours = ((totalWeeklyMinutes * 4) / 60).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Official Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              {isFrench
                ? 'RÉPUBLIQUE DU CAMEROUN · MINISTÈRE DE L\'ÉDUCATION DE BASE'
                : 'REPUBLIC OF CAMEROON · MINISTRY OF BASIC EDUCATION'}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {isFrench
                ? `Programme Pédagogique Mensuel — ${monthlyUnit?.monthName || `Mois ${monthNumber}`}`
                : `Official Monthly Scheme of Work — ${monthlyUnit?.monthName || `Month ${monthNumber}`}`}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>{getLevelName(subsystem, level)}</span>
              <span aria-hidden="true">·</span>
              <span>{getClassName(subsystem, classType)}</span>
              <span aria-hidden="true">·</span>
              <span>{isFrench ? `Trimestre ${monthlyUnit?.termNumber}` : `Term ${monthlyUnit?.termNumber}`}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors no-print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isFrench ? 'Imprimer ce Programme' : 'Print Monthly Plan'}</span>
            </button>
          </div>
        </div>

        {/* Integrated Learning Theme (ILT) & Monthly Project Banner */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ILT */}
          <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{isFrench ? 'THÈME INTÉGRATEUR DU MOIS (ILT)' : 'INTEGRATED LEARNING THEME (ILT)'}</span>
            </div>
            <p className="text-sm font-semibold text-emerald-950 mt-1">
              {monthlyUnit?.iltTheme || (isFrench ? 'L\'école et son environnement' : 'School & Environment')}
            </p>
            <p className="text-xs text-emerald-800 mt-0.5">
              {isFrench
                ? 'Transversal à l\'ensemble des 10 disciplines pour donner du sens aux apprentissages.'
                : 'Cross-cutting theme unifying competencies across all 10 subjects.'}
            </p>
          </div>

          {/* Monthly Project */}
          <div className="p-3.5 rounded-lg bg-sky-50/60 border border-sky-200">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
              <Calendar className="w-4 h-4 text-sky-700 shrink-0" />
              <span>{isFrench ? 'PROJET PÉDAGOGIQUE DU MOIS' : 'MONTHLY PEDAGOGICAL PROJECT'}</span>
            </div>
            <p className="text-sm font-semibold text-sky-950 mt-1">
              {monthlyUnit?.monthlyProject.title || (isFrench ? 'Projet Mensuel' : 'Monthly Project')}
            </p>
            <p className="text-xs text-sky-800 mt-0.5 line-clamp-2">
              {monthlyUnit?.monthlyProject.objective}
            </p>
          </div>
        </div>
      </div>

      {/* 4-Week Progression Roadmap */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
          {isFrench ? 'Structure des 4 Semaines du Mois' : 'Four-Week Monthly Instructional Flow'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map(wNum => {
            const isWeek4 = wNum === 4;
            const weekObj = monthlyUnit?.weeks.find(w => w.weekNumber === wNum);

            return (
              <div
                key={wNum}
                onClick={() => onSelectWeek(wNum)}
                className={`cursor-pointer rounded-lg p-3.5 border transition-all hover:shadow-xs ${
                  isWeek4
                    ? 'bg-amber-50/50 border-amber-300 hover:border-amber-400'
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {isFrench ? `Semaine ${wNum}` : `Week ${wNum}`}
                  </span>
                  {isWeek4 ? (
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      {isFrench ? 'Révision / Éval' : 'Revision / Eval'}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500">
                      {isFrench ? 'Nouvelles Leçons' : 'Core Units'}
                    </span>
                  )}
                </div>

                <div className="mt-2 text-xs text-slate-700 font-medium">
                  {isWeek4 ? (
                    isFrench
                      ? 'Semaine réservée à la révision mensuelle, l\'évaluation sommative, la remédiation et l\'intégration.'
                      : 'Reserved for monthly revision, summative evaluation, remediation & integration activities.'
                  ) : (
                    weekObj?.themeTitle ||
                    (isFrench
                      ? `Acquisition des savoirs disciplinaires, se terminant le vendredi par l'intégration & remédiation.`
                      : `Instructional units ending on Friday with remedial & integration activities.`)
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs text-emerald-700 font-semibold flex items-center justify-between">
                  <span>{isFrench ? 'Voir la Semaine' : 'View Timetable'}</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statutory Time Allocation & 10 Subjects Monthly Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              {isFrench
                ? 'Répartition Horaire et Didactique des 10 Matières (Normes MINEDUB 2018)'
                : 'Statutory Time & Pedagogical Breakdown for all 10 Subjects (MINEDUB 2018)'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isFrench
                ? `Total statutaire : ${totalWeeklyHours} h / semaine · ${totalMonthlyHours} h / mois`
                : `Total Statutory Requirement: ${totalWeeklyHours} hrs / week · ${totalMonthlyHours} hrs / month`}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{isFrench ? 'Calcul officiel par niveau' : 'Official statutory calculation'}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">{isFrench ? 'Discipline / Matière' : 'Subject'}</th>
                <th className="py-2.5 px-3">{isFrench ? 'Sous-composantes' : 'Sub-components'}</th>
                <th className="py-2.5 px-3 text-right">{isFrench ? 'Temps / Jour' : 'Time / Day'}</th>
                <th className="py-2.5 px-3 text-right">{isFrench ? 'Temps / Semaine' : 'Time / Week'}</th>
                <th className="py-2.5 px-3 text-right">{isFrench ? 'Temps / Mois' : 'Time / Month'}</th>
                <th className="py-2.5 px-3 text-center no-print">{isFrench ? 'Action' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map((subj, index) => {
                const breakdown = getSubjectTimeBreakdown(subsystem, level, subj.id);

                return (
                  <tr key={subj.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-500 tabular-nums">
                      {index + 1}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{subj.name}</div>
                      <div className="text-slate-400 text-xs">{subj.pedagogicalDomain}</div>
                    </td>
                    <td className="py-2.5 px-3 max-w-xs">
                      <div className="text-slate-600 line-clamp-2">
                        {subj.subComponents.map(c => c.name).join(', ')}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-700 font-medium tabular-nums whitespace-nowrap">
                      ~{breakdown.dailyAverageMinutes} min
                      <span className="block text-slate-400 text-xs">{breakdown.dailyDistributionHint}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900 tabular-nums whitespace-nowrap">
                      {breakdown.weeklyHours} h
                      <span className="block text-slate-400 text-xs font-normal">({breakdown.periodsCount} {isFrench ? 'séances' : 'periods'})</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-800 tabular-nums whitespace-nowrap">
                      {breakdown.monthlyHours} h
                    </td>
                    <td className="py-2.5 px-3 text-center no-print whitespace-nowrap">
                      <button
                        onClick={() => onSelectSubject(subj.id)}
                        className="px-2 py-1 text-xs font-medium text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded transition-colors"
                      >
                        {isFrench ? 'Préparer' : 'Plan Lesson'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold text-slate-900 border-t border-slate-200">
                <td colSpan={3} className="py-3 px-3 text-right">
                  {isFrench ? 'TOTAL STATUTAIRE MINEDUB :' : 'MINEDUB STATUTORY TOTAL:'}
                </td>
                <td className="py-3 px-3 text-right tabular-nums">
                  ~{(totalWeeklyMinutes / 5).toFixed(0)} min / {isFrench ? 'jour' : 'day'}
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-emerald-800">
                  {totalWeeklyHours} h / {isFrench ? 'sem' : 'wk'}
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-emerald-900">
                  {totalMonthlyHours} h / {isFrench ? 'mois' : 'mo'}
                </td>
                <td className="no-print"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
