import React from 'react';
import { SubsystemType, LevelType, ClassType } from '../types/curriculum';
import { getMonthlyUnit } from '../data/curriculumData';
import { getLevelName, getClassName } from '../utils/lessonGenerator';
import { Sparkles, Calendar, CheckSquare, Hammer, Layers, Printer } from 'lucide-react';

interface ProjectIltViewProps {
  subsystem: SubsystemType;
  level: LevelType;
  classType: ClassType;
  monthNumber: number;
  onPrint: () => void;
}

export const ProjectIltView: React.FC<ProjectIltViewProps> = ({
  subsystem,
  level,
  classType,
  monthNumber,
  onPrint
}) => {
  const isFrench = subsystem === 'francophone';
  const monthlyUnit = getMonthlyUnit(subsystem, monthNumber);
  const project = monthlyUnit?.monthlyProject;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              {isFrench
                ? 'APPROCHE PAR LES COMPÉTENCES · MINEDUB 2018'
                : 'COMPETENCY-BASED APPROACH · MINEDUB 2018'}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {isFrench
                ? `Thème Intégrateur (ILT) & Projet Pédagogique du Mois ${monthNumber}`
                : `Integrated Learning Theme (ILT) & Monthly Project: Month ${monthNumber}`}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>{getLevelName(subsystem, level)}</span>
              <span aria-hidden="true">·</span>
              <span>{getClassName(subsystem, classType)}</span>
              <span aria-hidden="true">·</span>
              <span>{monthlyUnit?.monthName}</span>
            </div>
          </div>

          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors no-print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isFrench ? 'Imprimer la Fiche Projet' : 'Print Project Guide'}</span>
          </button>
        </div>

        {/* ILT Banner */}
        <div className="mt-4 p-4 rounded-lg bg-emerald-50/70 border border-emerald-200">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{isFrench ? 'THÈME INTÉGRATEUR DU MOIS (ILT)' : 'INTEGRATED LEARNING THEME (ILT)'}</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-emerald-950 mt-1">
            « {monthlyUnit?.iltTheme} »
          </h2>
          <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
            {isFrench
              ? 'Le thème intégrateur constitue le fil conducteur interdisciplinaire qui relie l\'ensemble des 10 disciplines (Langues, Mathématiques, Sciences, Citoyenneté, EPS, Arts, etc.). Chaque semaine, les savoirs disciplinaires convergent pour outiller les élèves vers la réalisation concrète du projet mensuel.'
              : 'The Integrated Learning Theme (ILT) provides the unifying thematic thread linking all 10 primary school disciplines. Across the 4 weeks, individual subject competencies converge to equip learners to accomplish the practical monthly project.'}
          </p>
        </div>
      </div>

      {/* Project Master Card */}
      {project && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
              {isFrench ? 'PROJET PÉDAGOGIQUE MENSUEL' : 'MONTHLY PEDAGOGICAL PROJECT'}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              {project.title}
            </h3>
            <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-medium">
              <span className="font-bold text-slate-900">{isFrench ? 'Objectif terminal : ' : 'Terminal Objective: '}</span>
              {project.objective}
            </p>
          </div>

          {/* Practical Tasks & Required Local Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-2">
                <CheckSquare className="w-4 h-4 text-emerald-700" />
                <span>{isFrench ? 'Tâches Pratiques des Élèves' : 'Practical Pupil Tasks'}</span>
              </div>
              <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1.5">
                {project.practicalTasks.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-2">
                <Hammer className="w-4 h-4 text-amber-700" />
                <span>{isFrench ? 'Matériaux Locaux Requis (Ressources du Terroir)' : 'Required Local Materials'}</span>
              </div>
              <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1.5">
                {project.requiredLocalMaterials.map((mat, idx) => (
                  <li key={idx}>{mat}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4-Week Milestone Tracker */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>{isFrench ? 'JALONS D\'EXÉCUTION HEBDOMADAIRES (SEMAINES 1 À 4)' : 'WEEKLY MILESTONE EXECUTION PATH'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>{isFrench ? 'Semaine 1' : 'Week 1'}</span>
                  <span className="text-[10px] text-slate-400">{isFrench ? 'Sensibilisation' : 'Discovery'}</span>
                </div>
                <p className="mt-1.5 text-slate-700">{project.weeklyMilestones.week1}</p>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>{isFrench ? 'Semaine 2' : 'Week 2'}</span>
                  <span className="text-[10px] text-slate-400">{isFrench ? 'Conception' : 'Drafting'}</span>
                </div>
                <p className="mt-1.5 text-slate-700">{project.weeklyMilestones.week2}</p>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>{isFrench ? 'Semaine 3' : 'Week 3'}</span>
                  <span className="text-[10px] text-slate-400">{isFrench ? 'Fabrication' : 'Production'}</span>
                </div>
                <p className="mt-1.5 text-slate-700">{project.weeklyMilestones.week3}</p>
              </div>

              <div className="p-3.5 rounded-lg border border-amber-300 bg-amber-50/60">
                <div className="font-bold text-amber-900 flex items-center justify-between">
                  <span>{isFrench ? 'Semaine 4' : 'Week 4'}</span>
                  <span className="text-[10px] font-semibold text-amber-700">{isFrench ? 'Finalisation & Éval' : 'Exhibition'}</span>
                </div>
                <p className="mt-1.5 text-slate-700">{project.weeklyMilestones.week4}</p>
              </div>
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-800">
            <span className="font-bold text-slate-900">{isFrench ? 'Livrable attendu : ' : 'Expected Deliverable: '}</span>
            <span className="italic">{project.expectedOutcome}</span>
          </div>
        </div>
      )}
    </div>
  );
};
