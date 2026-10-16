import React, { useState, useEffect } from 'react';
import {
  SubsystemType,
  LevelType,
  ClassType,
  BloomLevel,
  LessonContent,
  SchoolAdministrativeInfo,
  TimetableSlot
} from './types/curriculum';
import {
  getSubjects,
  getMonthlyUnit
} from './data/curriculumData';
import {
  generateIndividualLessonPlan,
  getDefaultSchoolInfo
} from './utils/lessonGenerator';
import { Header } from './components/Header';
import { SelectorRibbon } from './components/SelectorRibbon';
import { MonthlyProgramView } from './components/MonthlyProgramView';
import { WeeklyPlanView } from './components/WeeklyPlanView';
import { LessonPlanView } from './components/LessonPlanView';
import { ProjectIltView } from './components/ProjectIltView';
import { TimeMatrixView } from './components/TimeMatrixView';
import { SchoolSettingsModal } from './components/SchoolSettingsModal';
import { PrintModal } from './components/PrintModal';

export default function App() {
  // 1. Subsystem state
  const [subsystem, setSubsystem] = useState<SubsystemType>(() => {
    const saved = localStorage.getItem('cameroon_subsystem');
    return (saved === 'francophone' || saved === 'anglophone') ? saved : 'anglophone';
  });

  // 2. Curricular parameters
  const [level, setLevel] = useState<LevelType>('level-1');
  const [classType, setClassType] = useState<ClassType>('class-1');
  const [monthNumber, setMonthNumber] = useState<number>(1);
  const [weekNumber, setWeekNumber] = useState<number>(1);

  // 3. Subject and Lesson parameters
  const subjects = getSubjects(subsystem);
  const [subjectId, setSubjectId] = useState<string>(subjects[0].id);
  const [subComponentId, setSubComponentId] = useState<string>(subjects[0].subComponents[0].id);
  const [topic, setTopic] = useState<string>('Polite Greetings and Introductions');
  const [lessonTitle, setLessonTitle] = useState<string>('Introducing Myself and Greeting Classmates Politely');
  const [bloomLevel, setBloomLevel] = useState<BloomLevel>('applying');

  // 4. Active view tab
  const [activeTab, setActiveTab] = useState<'monthly' | 'weekly' | 'lesson' | 'project' | 'timematrix'>('monthly');

  // 5. School information
  const [schoolInfo, setSchoolInfo] = useState<SchoolAdministrativeInfo>(() => {
    const saved = localStorage.getItem(`cameroon_school_info_${subsystem}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return getDefaultSchoolInfo(subsystem);
  });

  // 6. Generated Lesson Plan
  const [currentLessonPlan, setCurrentLessonPlan] = useState<LessonContent>(() => {
    return generateIndividualLessonPlan({
      subsystem,
      level,
      classType,
      monthNumber,
      weekNumber,
      subjectId,
      subComponentId,
      topic,
      lessonTitle,
      bloomLevel
    });
  });

  // 7. Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  // Persist subsystem
  useEffect(() => {
    localStorage.setItem('cameroon_subsystem', subsystem);
  }, [subsystem]);

  // Persist school info
  useEffect(() => {
    localStorage.setItem(`cameroon_school_info_${subsystem}`, JSON.stringify(schoolInfo));
  }, [schoolInfo, subsystem]);

  // Handle Subsystem Switch: change defaults
  const handleSubsystemChange = (newSub: SubsystemType) => {
    setSubsystem(newSub);
    const newSubjects = getSubjects(newSub);
    const defaultSubject = newSubjects[0];
    const defaultSubComp = defaultSubject.subComponents[0];

    setSubjectId(defaultSubject.id);
    setSubComponentId(defaultSubComp.id);

    if (newSub === 'francophone') {
      setClassType(level === 'level-1' ? 'sil' : level === 'level-2' ? 'ce1' : 'cm1');
      setTopic('Les Salutations d\'Usage à l\'École');
      setLessonTitle('Saluer poliment le maître et ses camarades');
      setSchoolInfo(getDefaultSchoolInfo('francophone'));
    } else {
      setClassType(level === 'level-1' ? 'class-1' : level === 'level-2' ? 'class-3' : 'class-5');
      setTopic('Polite Greetings and Introductions');
      setLessonTitle('Introducing Myself and Greeting Classmates Politely');
      setSchoolInfo(getDefaultSchoolInfo('anglophone'));
    }
  };

  // Handle Level Change: adapt classType
  const handleLevelChange = (newLevel: LevelType) => {
    setLevel(newLevel);
    if (subsystem === 'francophone') {
      if (newLevel === 'level-1') setClassType('sil');
      else if (newLevel === 'level-2') setClassType('ce1');
      else setClassType('cm1');
    } else {
      if (newLevel === 'level-1') setClassType('class-1');
      else if (newLevel === 'level-2') setClassType('class-3');
      else setClassType('class-5');
    }
  };

  // Regeneration helper
  const handleGeneratePlan = () => {
    const plan = generateIndividualLessonPlan({
      subsystem,
      level,
      classType,
      monthNumber,
      weekNumber,
      subjectId,
      subComponentId,
      topic,
      lessonTitle,
      bloomLevel
    });
    setCurrentLessonPlan(plan);
    setActiveTab('lesson');
  };

  // When clicking on a slot in the Weekly Timetable
  const handleSelectWeeklySlot = (slot: TimetableSlot) => {
    if (slot.isBreak) return;

    if (slot.isRemedialIntegration) {
      setWeekNumber(4);
      setActiveTab('weekly');
      return;
    }

    setSubjectId(slot.subjectId);
    if (slot.subComponentId) {
      setSubComponentId(slot.subComponentId);
    }
    setTopic(slot.lessonTitle);
    setLessonTitle(slot.lessonTitle);

    const plan = generateIndividualLessonPlan({
      subsystem,
      level,
      classType,
      monthNumber,
      weekNumber,
      subjectId: slot.subjectId,
      subComponentId: slot.subComponentId,
      topic: slot.lessonTitle,
      lessonTitle: slot.lessonTitle,
      bloomLevel
    });
    setCurrentLessonPlan(plan);
    setActiveTab('lesson');
  };

  // When clicking on a subject in the Monthly breakdown
  const handleSelectMonthlySubject = (subId: string) => {
    const subj = subjects.find(s => s.id === subId);
    if (subj) {
      setSubjectId(subId);
      if (subj.subComponents[0]) {
        setSubComponentId(subj.subComponents[0].id);
      }
      setTopic(subj.subComponents[0]?.name || subj.name);
      setLessonTitle(`${subj.name}: ${subj.subComponents[0]?.name || ''}`);
      handleGeneratePlan();
    }
  };

  const isFrench = subsystem === 'francophone';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* 1. Header with Top Bar Contract */}
      <Header
        subsystem={subsystem}
        onSubsystemChange={handleSubsystemChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onPrintCurrent={() => setIsPrintOpen(true)}
      />

      {/* 2. Interactive Selector Ribbon (Subsystem, Level, Class, Month, Week, Subject, Topic, Bloom) */}
      <SelectorRibbon
        subsystem={subsystem}
        onSubsystemChange={handleSubsystemChange}
        level={level}
        onLevelChange={handleLevelChange}
        classType={classType}
        onClassChange={setClassType}
        monthNumber={monthNumber}
        onMonthChange={setMonthNumber}
        weekNumber={weekNumber}
        onWeekChange={setWeekNumber}
        subjectId={subjectId}
        onSubjectChange={setSubjectId}
        subComponentId={subComponentId}
        onSubComponentChange={setSubComponentId}
        topic={topic}
        onTopicChange={setTopic}
        lessonTitle={lessonTitle}
        onLessonTitleChange={setLessonTitle}
        bloomLevel={bloomLevel}
        onBloomLevelChange={setBloomLevel}
        onGenerate={handleGeneratePlan}
      />

      {/* 3. Main Pedagogical Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'monthly' && (
          <MonthlyProgramView
            subsystem={subsystem}
            level={level}
            classType={classType}
            monthNumber={monthNumber}
            onSelectWeek={(wNum) => {
              setWeekNumber(wNum);
              setActiveTab('weekly');
            }}
            onSelectSubject={handleSelectMonthlySubject}
            onPrint={() => setIsPrintOpen(true)}
          />
        )}

        {activeTab === 'weekly' && (
          <WeeklyPlanView
            subsystem={subsystem}
            level={level}
            classType={classType}
            monthNumber={monthNumber}
            weekNumber={weekNumber}
            onSelectSlot={handleSelectWeeklySlot}
            onPrint={() => setIsPrintOpen(true)}
          />
        )}

        {activeTab === 'lesson' && (
          <LessonPlanView
            subsystem={subsystem}
            level={level}
            classType={classType}
            lesson={currentLessonPlan}
            schoolInfo={schoolInfo}
            onPrint={() => setIsPrintOpen(true)}
            onUpdateLesson={setCurrentLessonPlan}
          />
        )}

        {activeTab === 'project' && (
          <ProjectIltView
            subsystem={subsystem}
            level={level}
            classType={classType}
            monthNumber={monthNumber}
            onPrint={() => setIsPrintOpen(true)}
          />
        )}

        {activeTab === 'timematrix' && (
          <TimeMatrixView
            subsystem={subsystem}
            onPrint={() => setIsPrintOpen(true)}
          />
        )}
      </main>

      {/* 4. Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-slate-700">
              {isFrench
                ? 'Curriculum de l\'Enseignement Primaire Camerounais (MINEDUB 2018)'
                : 'Cameroon Official Primary School Curriculum (MINEDUB 2018)'}
            </span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{isFrench ? 'Sous-systèmes Anglophone & Francophone Dédiés' : 'Dedicated Anglophone & Francophone Subsystems'}</span>
          </div>
          <div className="text-slate-400">
            {isFrench
              ? 'Taxonomie Révisée de Bloom · Intégration · Remédiation · Projets ILT'
              : 'Revised Bloom\'s Taxonomy · Integration · Remediation · Monthly ILT'}
          </div>
        </div>
      </footer>

      {/* 5. Modals */}
      <SchoolSettingsModal
        subsystem={subsystem}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        initialInfo={schoolInfo}
        onSave={setSchoolInfo}
      />

      <PrintModal
        subsystem={subsystem}
        level={level}
        classType={classType}
        monthNumber={monthNumber}
        weekNumber={weekNumber}
        activeDoc={activeTab}
        lesson={currentLessonPlan}
        schoolInfo={schoolInfo}
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
      />
    </div>
  );
}
