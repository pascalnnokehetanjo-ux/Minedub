/**
 * Type definitions for Cameroon Official Primary School Curriculum 2018
 * Ministry of Basic Education (MINEDUB) & Bloom's Taxonomy of Educational Objectives
 */

export type SubsystemType = 'anglophone' | 'francophone';

export type LevelType = 'level-1' | 'level-2' | 'level-3';

export type AnglophoneClass = 'class-1' | 'class-2' | 'class-3' | 'class-4' | 'class-5' | 'class-6';
export type FrancophoneClass = 'sil' | 'cp' | 'ce1' | 'ce2' | 'cm1' | 'cm2';

export type ClassType = AnglophoneClass | FrancophoneClass;

export type BloomLevel = 
  | 'remembering' 
  | 'understanding' 
  | 'applying' 
  | 'analyzing' 
  | 'evaluating' 
  | 'creating';

export interface SubjectAllocation {
  subjectId: string;
  subjectName: string;
  level1WeeklyMinutes: number; // in minutes per week
  level2WeeklyMinutes: number;
  level3WeeklyMinutes: number;
  periodsPerWeek: {
    level1: number;
    level2: number;
    level3: number;
  };
  dailyPeriodsHint: string;
}

export interface SubComponent {
  id: string;
  name: string;
  description: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  subsystem: SubsystemType;
  color: string;
  subComponents: SubComponent[];
  pedagogicalDomain: string; // e.g. "Language and Communication", "Science and Technology"
}

export interface DidacticStep {
  stepNumber: number;
  title: string;
  durationMinutes: number;
  teacherActivity: string;
  pupilActivity: string;
  didacticAids: string;
}

export interface LessonContent {
  id: string;
  lessonTitle: string;
  subTopic: string;
  topic: string;
  subComponentId: string;
  subjectId: string;
  monthNumber: number;
  weekNumber: number; // 1, 2, 3, or 4
  durationMinutes: number;
  bloomLevel: BloomLevel;
  bloomActionVerbs: string[];
  smartObjectives: {
    overall: string;
    specificItems: string[];
  };
  previousKnowledge: string;
  didacticMaterials: string[];
  didacticSteps: DidacticStep[];
  chalkboardNotes: {
    title: string;
    summary: string;
    keyPoints: string[];
    vocabularyOrFormulas: string[];
  };
  formativeEvaluation: {
    questions: string[];
    expectedAnswers: string[];
  };
  remediationPlan: {
    forStrugglingPupils: string;
    forFastLearners: string;
  };
}

export interface WeekPlan {
  weekNumber: number;
  isRevisionWeek: boolean;
  themeTitle: string;
  subtheme: string;
  fridayIntegrationActivity: {
    title: string;
    description: string;
    competenciesTargeted: string;
    remediationTask: string;
  };
  lessons: LessonContent[];
}

export interface MonthlyUnit {
  monthNumber: number;
  monthName: string;
  termNumber: 1 | 2 | 3;
  subsystem: SubsystemType;
  iltTheme: string; // Integrated Learning Theme
  monthlyProject: {
    title: string;
    objective: string;
    practicalTasks: string[];
    requiredLocalMaterials: string[];
    expectedOutcome: string;
    weeklyMilestones: {
      week1: string;
      week2: string;
      week3: string;
      week4: string;
    };
  };
  weeks: WeekPlan[];
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi';
  startTime: string;
  endTime: string;
  durationMinutes: number;
  subjectId: string;
  subComponentId: string;
  lessonTitle: string;
  isBreak?: boolean;
  isRemedialIntegration?: boolean;
}

export interface SchoolAdministrativeInfo {
  schoolName: string;
  region: string;
  division: string;
  subDivision: string;
  teacherName: string;
  headTeacherName: string;
  academicYear: string;
  classRoll: number;
  boysCount: number;
  girlsCount: number;
  averageAge: number;
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  bloomLevel: BloomLevel;
  options?: string[]; // 4 options for MCQ
  correctAnswer: string;
  acceptableKeywords?: string[]; // for short answer flexible checking
  explanation: string; // Explaining why based on summary notes / SMART objectives
  points: number;
}

export interface LessonQuiz {
  id: string;
  lessonId: string;
  lessonTitle: string;
  topic: string;
  subsystem: SubsystemType;
  bloomLevel: BloomLevel;
  questions: QuizQuestion[];
  totalPoints: number;
  passingScore: number; // e.g. 70
}

export interface QuizAttempt {
  id: string;
  lessonId: string;
  lessonTitle: string;
  studentName: string;
  timestamp: number;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  userAnswers: Record<string, string>;
  questionResults: Record<string, boolean>;
  remediationAdvice?: string;
}

