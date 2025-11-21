

import React from 'react';
import { Agent, AgentCategory, AgentType, MonitoringConfig, ChatbotConfig, ReportingConfig, VentilatorConfig, AgentConfig, KnowledgeSourceType, EMRIntegrationConfig, KnowledgeSource, MedicalLiteratureSearchConfig, BehavioralRule, EvaluationMetricConfig } from './types';

// HeroIcons as React Components
const ChartBarIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.05 1.05 0 0 1-1.485 0l-3.72-3.72a2.11 2.11 0 0 1-1.98-2.193v-4.286c0-.97.616-1.813 1.5-2.097M16.5 6.75v1.875a1.5 1.5 0 0 1-1.5 1.5h-1.5a1.5 1.5 0 0 1-1.5-1.5V6.75m4.5 0a3 3 0 0 0-3-3h-1.5a3 3 0 0 0-3 3m-3.75 0H7.5m9 12.75h3.75m-3.75 0a3 3 0 0 1-3-3V12m-3.75 0V12m-3.75 0a3 3 0 0 0-3 3m0 0h3.75" />
  </svg>
);

const DocumentTextIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const SignalIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.136 12.006a8.25 8.25 0 0 1 13.728 0M2.013 8.948a12.75 12.75 0 0 1 19.974 0M12 18.75h.008v.008H12v-.008Z" />
    </svg>
);


const DEFAULT_EMR_INTEGRATION_CONFIG: EMRIntegrationConfig = {
    enabled: false,
    dataPoints: {}
};

const DEFAULT_LITERATURE_SEARCH_CONFIG: MedicalLiteratureSearchConfig = {
    enabled: false,
    databases: {
        pubmed: true,
        medline: false,
        cochrane: false,
    },
    searchScope: 'abstracts',
    recency: '5y',
};

export const DEFAULT_EVALUATION_METRIC_CONFIG: EvaluationMetricConfig = {
    enabled: false,
    rougeScoreThreshold: 70,
    factualityScoreThreshold: 95,
    evaluationAction: 'flag',
};

const DEFAULT_BEHAVIORAL_RULES: BehavioralRule[] = [
    {
      id: 'system-rule-1',
      condition: '자살, 자해, 죽음',
      matchType: 'any',
      responses: [
        "정신적으로 힘든 시간을 보내고 계신 것 같아 걱정됩니다. 혼자 감당하기 어려운 감정들은 전문가의 도움을 받는 것이 중요해요. 즉시 연락 가능한 24시간 위기 상담 전화번호를 안내해 드릴게요. 1577-0199로 전화하시면 도움을 받으실 수 있습니다."
      ],
      escalation: 'nurse_alert',
      tags: ['crisis_intervention', 'suicide_risk'],
      isDeletable: false,
    },
     {
      id: 'system-rule-2',
      condition: '고마워, 감사',
      matchType: 'any',
      responses: [
        "천만에요. 언제든지 도움이 필요하시면 말씀해주세요.",
        "별말씀을요. 더 궁금한 점이 있으신가요?"
      ],
      escalation: 'none',
      tags: ['positive_feedback'],
      isDeletable: false,
    }
];

export const INITIAL_KNOWLEDGE_SOURCES: KnowledgeSource[] = [
  {
    id: 'kb-1',
    name: '소아 급성 호흡곤란 증후군(PARDS) 프로토콜',
    type: KnowledgeSourceType.PROTOCOL,
    description: '서울아산병원 PICU의 PARDS 관리 프로토콜',
    url: 'https://www.amc.seoul.kr/asan/main.do',
    enabled: true,
    isDeletable: false,
  },
  {
    id: 'kb-2',
    name: '소아 만성 호흡부전 환자 가정간호 가이드라인',
    type: KnowledgeSourceType.GUIDELINE,
    description: '대한소아알레르기호흡기학회(KAPARD)',
    url: 'https://www.kapard.or.kr/',
    enabled: true,
    isDeletable: false,
  },
   {
    id: 'kb-3',
    name: '가정용 인공호흡기 소아 적용 권장사항',
    type: KnowledgeSourceType.RECOMMENDATION,
    description: '미국흉부학회(ATS) 소아 환자 대상 임상 권장사항',
    url: 'https://www.thoracic.org/',
    enabled: true,
    isDeletable: false,
  },
  {
    id: 'kb-4',
    name: '홍창의 소아과학: 호흡기 질환편',
    type: KnowledgeSourceType.TEXTBOOK,
    description: '소아 호흡기 질환의 진단, 치료 및 가정 간호에 대한 교과서',
    url: 'http://www.doctorbook.co.kr/shop/book/Info.asp?Gserial=9788994334032',
    enabled: true,
    isDeletable: false,
  },
  {
    id: 'kb-5',
    name: 'Nelson 소아과학: 호흡기계',
    type: KnowledgeSourceType.TEXTBOOK,
    description: '소아 호흡기 질환 및 관리에 대한 포괄적인 개요',
    url: 'https://www.elsevier.com/books/nelson-textbook-of-pediatrics/kliegman/978-0-323-52950-1',
    enabled: true,
    isDeletable: false,
  },
];


export const AGENT_TYPE_DETAILS: Record<AgentType, {
  label: string;
  category: AgentCategory;
  icon: React.ComponentType<{ className?: string }>;
  defaultDescription: string;
  defaultConfig: AgentConfig;
}> = {
  [AgentType.MONITORING_VITAL_SIGNS]: {
    label: '실시간 생체 신호 모니터',
    category: AgentCategory.MONITORING,
    icon: ChartBarIcon,
    defaultDescription: 'SpO2, 심박수 등 주요 생체 신호를 실시간으로 모니터링하고 이상 징후 발생 시 알림을 보냅니다.',
    defaultConfig: {
      parameters: {
        spo2: true,
        heartRate: true,
        respRate: true,
        ventilatorPressure: false,
      },
      spo2Threshold: 92,
      alertSensitivity: 'medium',
      emrIntegration: DEFAULT_EMR_INTEGRATION_CONFIG,
    } as MonitoringConfig,
  },
  [AgentType.MONITORING_VENTILATOR]: {
    label: '가정용 인공호흡기 모니터',
    category: AgentCategory.MONITORING,
    icon: SignalIcon,
    defaultDescription: '가정용 인공호흡기의 주요 지표(일회호흡량, 기도압 등)를 모니터링하고, 소아 호흡부전 가이드라인에 기반하여 이상 징후 발생 시 알림을 보냅니다.',
    defaultConfig: {
      parameters: {
        tidalVolume: true,
        peakInspiratoryPressure: true,
        respiratoryRate: true,
        leakPercentage: true,
        peep: true,
        drivingPressure: true,
      },
      lowTidalVolumeThreshold: 4,
      highTidalVolumeThreshold: 8,
      pipThreshold: 35,
      minRespiratoryRateThreshold: 15,
      maxRespiratoryRateThreshold: 40,
      leakThreshold: 25,
      peepThreshold: 5,
      drivingPressureThreshold: 15,
      alertProfile: 'pediatric',
      knowledgeSourceIds: ['kb-1', 'kb-3'],
      emrIntegration: { ...DEFAULT_EMR_INTEGRATION_CONFIG, dataPoints: { vitals: true, ventilatorData: true }},
      literatureSearch: DEFAULT_LITERATURE_SEARCH_CONFIG,
      evaluation: DEFAULT_EVALUATION_METRIC_CONFIG,
    } as VentilatorConfig,
  },
  [AgentType.CONVERSATIONAL_CHATBOT]: {
    label: '홈케어 가이드 챗봇',
    category: AgentCategory.CONVERSATIONAL,
    icon: ChatBubbleLeftRightIcon,
    defaultDescription: '환자 상태와 의료 기록에 기반하여 보호자의 질문에 답변하고, 홈케어 절차를 안내합니다.',
    defaultConfig: {
      persona: 'empathetic',
      knowledgeSourceIds: ['kb-1', 'kb-2', 'kb-3', 'kb-4'],
      rules: DEFAULT_BEHAVIORAL_RULES,
      literatureSearch: DEFAULT_LITERATURE_SEARCH_CONFIG,
      evaluation: DEFAULT_EVALUATION_METRIC_CONFIG,
    } as ChatbotConfig,
  },
  [AgentType.REPORTING_SUMMARY]: {
    label: '일일 요약 보고서',
    category: AgentCategory.REPORTING,
    icon: DocumentTextIcon,
    defaultDescription: '환자의 상태, 주요 이벤트, 보호자 질문 등을 요약하여 매일 아침 보고서를 생성합니다.',
    defaultConfig: {
      frequency: 'daily',
      content: {
        vitalTrends: true,
        alertsLog: true,
        guardianSymptoms: true,
        medicationAdherence: false,
      },
      format: 'narrative',
      emrIntegration: DEFAULT_EMR_INTEGRATION_CONFIG,
      literatureSearch: DEFAULT_LITERATURE_SEARCH_CONFIG,
      evaluation: DEFAULT_EVALUATION_METRIC_CONFIG,
    } as ReportingConfig,
  },
};

export const INITIAL_AGENTS: Agent<any>[] = [
  {
    id: 'agent-1',
    name: '소아 생체 신호 모니터',
    description: '민준이의 산소포화도, 심박수, 호흡수를 PARDS 프로토콜에 따라 모니터링합니다.',
    category: AgentCategory.MONITORING,
    type: AgentType.MONITORING_VITAL_SIGNS,
    icon: ChartBarIcon,
    config: {
      parameters: {
        spo2: true,
        heartRate: true,
        respRate: true,
        ventilatorPressure: false,
      },
      spo2Threshold: 92,
      alertSensitivity: 'high',
      emrIntegration: { ...DEFAULT_EMR_INTEGRATION_CONFIG, enabled: true, dataPoints: { vitals: true } },
    } as MonitoringConfig,
    enabled: true,
  },
  {
    id: 'agent-2',
    name: '인공호흡기 (PARDS) 모니터',
    description: '민준이의 가정용 인공호흡기 상태를 PARDS 가이드라인에 맞춰 모니터링합니다.',
    category: AgentCategory.MONITORING,
    type: AgentType.MONITORING_VENTILATOR,
    icon: SignalIcon,
    config: {
      parameters: {
        tidalVolume: true,
        peakInspiratoryPressure: true,
        respiratoryRate: true,
        leakPercentage: true,
        peep: true,
        drivingPressure: true,
      },
      lowTidalVolumeThreshold: 5,
      highTidalVolumeThreshold: 7,
      pipThreshold: 30,
      minRespiratoryRateThreshold: 18,
      maxRespiratoryRateThreshold: 35,
      leakThreshold: 25,
      peepThreshold: 8,
      drivingPressureThreshold: 14,
      alertProfile: 'pediatric',
      knowledgeSourceIds: ['kb-1', 'kb-3'],
      emrIntegration: { ...DEFAULT_EMR_INTEGRATION_CONFIG, enabled: true, dataPoints: { vitals: true, ventilatorData: true }},
      literatureSearch: { ...DEFAULT_LITERATURE_SEARCH_CONFIG, enabled: true },
      evaluation: { ...DEFAULT_EVALUATION_METRIC_CONFIG, enabled: true },
    } as VentilatorConfig,
    enabled: true,
  },
  {
    id: 'agent-3',
    name: '소아 호흡기 홈케어 챗봇',
    description: '민준이 보호자의 질문에 답변하고 PARDS 관리 절차를 안내합니다.',
    category: AgentCategory.CONVERSATIONAL,
    type: AgentType.CONVERSATIONAL_CHATBOT,
    icon: ChatBubbleLeftRightIcon,
    config: {
      persona: 'empathetic',
      knowledgeSourceIds: ['kb-1', 'kb-2', 'kb-3', 'kb-4'],
      rules: DEFAULT_BEHAVIORAL_RULES,
      literatureSearch: { ...DEFAULT_LITERATURE_SEARCH_CONFIG, enabled: true, recency: '1y' },
      evaluation: { ...DEFAULT_EVALUATION_METRIC_CONFIG, enabled: true, factualityScoreThreshold: 98, evaluationAction: 'alert' },
    } as ChatbotConfig,
    enabled: true,
  },
  {
    id: 'agent-4',
    name: '경과 요약 보고서',
    description: '의료진을 위해 민준이의 PARDS 경과를 요약하여 매일 아침 보고서를 생성합니다.',
    category: AgentCategory.REPORTING,
    type: AgentType.REPORTING_SUMMARY,
    icon: DocumentTextIcon,
    config: {
      frequency: 'daily',
      content: {
        vitalTrends: true,
        alertsLog: true,
        guardianSymptoms: true,
        medicationAdherence: true,
      },
      format: 'narrative',
      emrIntegration: { ...DEFAULT_EMR_INTEGRATION_CONFIG, enabled: true, dataPoints: { vitals: true, consultationNotes: true, medications: true } },
       literatureSearch: DEFAULT_LITERATURE_SEARCH_CONFIG,
       evaluation: { ...DEFAULT_EVALUATION_METRIC_CONFIG, enabled: true, rougeScoreThreshold: 80 },
    } as ReportingConfig,
    enabled: true,
  },
];
