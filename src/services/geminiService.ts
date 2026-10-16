/**
 * Gemini AI Educational Enhancer Service
 * Generates culturally authentic Cameroonian pedagogical enrichment
 * Grounded in MINEDUB 2018 specifications & Bloom's Taxonomy
 */

import { GoogleGenAI } from '@google/genai';
import { SubsystemType, BloomLevel } from '../types/curriculum';

export interface EnrichmentRequest {
  subsystem: SubsystemType;
  subjectName: string;
  subComponentName: string;
  topic: string;
  bloomLevel: BloomLevel;
  className: string;
  locality?: string; // e.g., "Yaoundé", "Bamenda", "Douala", "Garoua", "Maroua", "Bafoussam"
}

export interface EnrichmentResponse {
  culturallyContextualizedActivity: string;
  localCameroonianExamples: string[];
  remedialSupportStrategy: string;
  advancedEnrichmentTask: string;
  bloomAssessmentQuestions: string[];
}

export async function enrichLessonWithAI(request: EnrichmentRequest): Promise<EnrichmentResponse> {
  const isFrench = request.subsystem === 'francophone';
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');

  // Default fallback if offline or no key available
  const defaultFallback: EnrichmentResponse = {
    culturallyContextualizedActivity: isFrench
      ? `Mise en situation concrète dans le marché local ou la cour d'école pour observer et manipuler les éléments réels de "${request.topic}".`
      : `Real-life practical scenario set in the local Cameroon market or school garden exploring "${request.topic}".`,
    localCameroonianExamples: isFrench
      ? [
          'Exemple concret au marché de Mokolo / Mfoundi avec prix en FCFA',
          'Étude d\'un cas pratique avec les cultures vivrières locales (manioc, plantain, maïs)',
          'Scène de dialogue respectant les formules de politesse des communautés camerounaises'
        ]
      : [
          'Practical calculation using Cameroon FCFA notes and coins (500F, 1000F, 50F)',
          'Local food crops illustration (plantains, cocoa, cassava, groundnuts)',
          'Cultural dialogue respecting traditional community elders in Cameroon'
        ],
    remedialSupportStrategy: isFrench
      ? 'Guidage pas-à-pas avec manipulation de matériel concret (capsules, bâtonnets) et étayage par les pairs.'
      : 'Concrete tactile manipulation with bottle caps, counting sticks, and peer tutor pairing.',
    advancedEnrichmentTask: isFrench
      ? 'Inviter l\'élève à formuler une situation-problème inédite pour ses pairs ou à dessiner une affiche explicative.'
      : 'Invite the pupil to formulate an original word problem for peers or sketch an informative educational poster.',
    bloomAssessmentQuestions: isFrench
      ? [
          `Niveau Connaissance : Définis avec tes propres mots ce qu'est "${request.topic}".`,
          `Niveau Application : Utilise cette règle pour résoudre le problème posé au tableau.`,
          `Niveau Analyse : Compare ce cas avec la situation observée hier.`
        ]
      : [
          `Knowledge Level: State the main meaning of "${request.topic}".`,
          `Application Level: Demonstrate how to apply this rule in our classroom.`,
          `Analysis Level: Compare and contrast these two examples.`
        ]
  };

  if (!apiKey) {
    return defaultFallback;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = isFrench
      ? `Tu es un Inspecteur Pédagogique Principal de l'Enseignement Primaire au Cameroun (MINEDUB, Curriculum officiel de 2018).
Enrichis cette fiche pédagogique pour la classe de ${request.className} :
- Matière : ${request.subjectName}
- Sous-composante : ${request.subComponentName}
- Sujet/Thème : ${request.topic}
- Niveau taxonomique de Bloom : ${request.bloomLevel}

Fournis une réponse au format JSON strict avec les clés suivantes :
1. "culturallyContextualizedActivity": Une activité pratique hautement ancrée dans le terroir camerounais (marché, village, chefferie, éco-gestes, 10 régions).
2. "localCameroonianExamples": Une liste de 3 exemples concrets issus du quotidien camerounais (monnaie FCFA, faune/flore, expressions courantes, villes comme Yaoundé, Douala, Bafoussam, Garoua, etc.).
3. "remedialSupportStrategy": Une stratégie concrète de remédiation pour les élèves éprouvant des difficultés.
4. "advancedEnrichmentTask": Une tâche stimulante pour les élèves rapides.
5. "bloomAssessmentQuestions": 3 questions d'évaluation graduées selon la taxonomie de Bloom.`
      : `You are a Senior Primary Pedagogical Inspector in Cameroon (MINEDUB, Official 2018 Primary School Curriculum).
Enrich this lesson plan for ${request.className}:
- Subject: ${request.subjectName}
- Sub-component: ${request.subComponentName}
- Topic: ${request.topic}
- Bloom's Taxonomy Cognitive Level: ${request.bloomLevel}

Provide your response in strict JSON format with the following keys:
1. "culturallyContextualizedActivity": A practical hands-on activity rooted in authentic Cameroonian life (markets, school compound, 10 regions, local crops, culture).
2. "localCameroonianExamples": An array of 3 realistic Cameroonian examples (FCFA currency, local foodstuffs like plantains/cassava, towns like Bamenda, Limbe, Buea, Yaoundé, local proverbs).
3. "remedialSupportStrategy": Concrete differentiated remediation strategy for struggling pupils.
4. "advancedEnrichmentTask": An engaging extension task for fast finishers.
5. "bloomAssessmentQuestions": 3 graded assessment questions aligned with Bloom's Taxonomy.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);
      return {
        culturallyContextualizedActivity: parsed.culturallyContextualizedActivity || defaultFallback.culturallyContextualizedActivity,
        localCameroonianExamples: Array.isArray(parsed.localCameroonianExamples) ? parsed.localCameroonianExamples : defaultFallback.localCameroonianExamples,
        remedialSupportStrategy: parsed.remedialSupportStrategy || defaultFallback.remedialSupportStrategy,
        advancedEnrichmentTask: parsed.advancedEnrichmentTask || defaultFallback.advancedEnrichmentTask,
        bloomAssessmentQuestions: Array.isArray(parsed.bloomAssessmentQuestions) ? parsed.bloomAssessmentQuestions : defaultFallback.bloomAssessmentQuestions
      };
    }
    return defaultFallback;
  } catch (error) {
    console.warn('Gemini API enrichment skipped or unavailable, using grounded curriculum data:', error);
    return defaultFallback;
  }
}
