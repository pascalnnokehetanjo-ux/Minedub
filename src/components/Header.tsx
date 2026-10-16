import React from 'react';
import { SubsystemType } from '../types/curriculum';
import { Printer, Settings, BookOpen, Clock, FolderKanban } from 'lucide-react';

interface HeaderProps {
  subsystem: SubsystemType;
  onSubsystemChange: (newSubsystem: SubsystemType) => void;
  activeTab: 'monthly' | 'weekly' | 'lesson' | 'project' | 'timematrix';
  onTabChange: (tab: 'monthly' | 'weekly' | 'lesson' | 'project' | 'timematrix') => void;
  onOpenSettings: () => void;
  onPrintCurrent: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  subsystem,
  onSubsystemChange,
  activeTab,
  onTabChange,
  onOpenSettings,
  onPrintCurrent
}) => {
  const isFrench = subsystem === 'francophone';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Wordmark, Nav Links, Primary CTA */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-xs">
              🇨🇲
            </div>
            <a href="/" className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              {isFrench ? 'MINEDUB Planificateur 2018' : 'MINEDUB Planner 2018'}
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onTabChange('monthly')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'monthly' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700' : ''
              }`}
            >
              {isFrench ? 'Programme Mensuel' : 'Monthly Program'}
            </button>
            <button
              onClick={() => onTabChange('weekly')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'weekly' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700' : ''
              }`}
            >
              {isFrench ? 'Cahier Hebdomadaire' : 'Weekly Timetable'}
            </button>
            <button
              onClick={() => onTabChange('lesson')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'lesson' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700' : ''
              }`}
            >
              {isFrench ? 'Fiche Pédagogique' : 'Lesson Plan & Notes'}
            </button>
            <button
              onClick={() => onTabChange('project')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'project' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700' : ''
              }`}
            >
              {isFrench ? 'Projet & Thème (ILT)' : 'Project & ILT'}
            </button>
            <button
              onClick={() => onTabChange('timematrix')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'timematrix' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700' : ''
              }`}
            >
              {isFrench ? 'Grille Horaire' : 'Time Matrix'}
            </button>
          </nav>

          {/* Zone 3: Primary Action & Subsystem Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Subsystem Switcher */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-semibold">
              <button
                onClick={() => onSubsystemChange('anglophone')}
                className={`px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  subsystem === 'anglophone'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Anglophone Subsystem"
              >
                Anglophone
              </button>
              <button
                onClick={() => onSubsystemChange('francophone')}
                className={`px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  subsystem === 'francophone'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Passer au Sous-système Francophone"
              >
                Francophone
              </button>
            </div>

            {/* School Info Settings Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title={isFrench ? 'Paramètres d\'école et enseignant' : 'School & Teacher Settings'}
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Print Document Button */}
            <button
              onClick={onPrintCurrent}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors whitespace-nowrap shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isFrench ? 'Imprimer PDF' : 'Print PDF'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav strip */}
        <div className="flex md:hidden overflow-x-auto gap-2 py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => onTabChange('monthly')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'monthly' ? 'bg-emerald-100 text-emerald-900 font-semibold' : 'text-slate-600'
            }`}
          >
            {isFrench ? 'Programme Mensuel' : 'Monthly'}
          </button>
          <button
            onClick={() => onTabChange('weekly')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'weekly' ? 'bg-emerald-100 text-emerald-900 font-semibold' : 'text-slate-600'
            }`}
          >
            {isFrench ? 'Emploi du Temps' : 'Weekly'}
          </button>
          <button
            onClick={() => onTabChange('lesson')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'lesson' ? 'bg-emerald-100 text-emerald-900 font-semibold' : 'text-slate-600'
            }`}
          >
            {isFrench ? 'Fiche Leçon' : 'Lesson Plan'}
          </button>
          <button
            onClick={() => onTabChange('project')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'project' ? 'bg-emerald-100 text-emerald-900 font-semibold' : 'text-slate-600'
            }`}
          >
            {isFrench ? 'Projet Mensuel' : 'Project/ILT'}
          </button>
          <button
            onClick={() => onTabChange('timematrix')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'timematrix' ? 'bg-emerald-100 text-emerald-900 font-semibold' : 'text-slate-600'
            }`}
          >
            {isFrench ? 'Grille Horaire' : 'Time Matrix'}
          </button>
        </div>
      </div>
    </header>
  );
};
