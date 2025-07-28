export interface Scenario {
  id: string;
  name: string;
  description: string;
  customerResponses: string[];
  keywords: string[];
  scoringRules: {
    priceNegotiation: number;
    urgencyCreation: number;
    valueProposition: number;
    closingTechnique: number;
  };
  tips: string[];
}

export const scenarios: Scenario[] = [
  {
    id: 'price_jump',
    name: '业主跳价',
    description: '业主在谈判过程中突然提高价格',
    customerResponses: [
      '这个价格太低了，我考虑考虑',
      '有其他客户出价更高，我需要时间考虑',
      '我觉得这个房子值更多钱',
      '最近房价涨了，我要调整价格'
    ],
    keywords: ['价格', '跳价', '考虑', '其他客户', '涨价'],
    scoringRules: {
      priceNegotiation: 30,
      urgencyCreation: 25,
      valueProposition: 25,
      closingTechnique: 20
    },
    tips: [
      '强调市场行情和合理定价',
      '创造紧迫感，避免业主犹豫',
      '突出房源优势和价值',
      '提供灵活的付款方案'
    ]
  },
  {
    id: 'credit_issue',
    name: '客户征信异常',
    description: '客户在贷款过程中发现征信问题',
    customerResponses: [
      '我的征信有点问题，能贷款吗？',
      '之前有逾期记录，现在怎么办？',
      '银行说我的信用不好',
      '我需要时间处理征信问题'
    ],
    keywords: ['征信', '逾期', '贷款', '信用', '银行'],
    scoringRules: {
      priceNegotiation: 20,
      urgencyCreation: 15,
      valueProposition: 30,
      closingTechnique: 35
    },
    tips: [
      '了解具体征信问题',
      '推荐合适的贷款方案',
      '提供征信修复建议',
      '考虑全款或分期付款'
    ]
  },
  {
    id: 'competition',
    name: '竞争对手介入',
    description: '有其他中介同时联系客户',
    customerResponses: [
      '其他中介也在联系我',
      '我想比较一下不同中介的服务',
      '其他中介说能给我更好的价格',
      '我需要时间考虑选择哪家中介'
    ],
    keywords: ['其他中介', '比较', '服务', '价格', '选择'],
    scoringRules: {
      priceNegotiation: 25,
      urgencyCreation: 30,
      valueProposition: 25,
      closingTechnique: 20
    },
    tips: [
      '突出专业服务优势',
      '提供独家房源信息',
      '强调长期合作关系',
      '快速响应客户需求'
    ]
  },
  {
    id: 'family_dispute',
    name: '家庭意见分歧',
    description: '客户家庭成员对购房意见不一致',
    customerResponses: [
      '我老婆觉得这个房子太小了',
      '孩子不喜欢这个小区',
      '父母觉得价格太高',
      '家里人意见不统一'
    ],
    keywords: ['家庭', '意见', '分歧', '老婆', '孩子', '父母'],
    scoringRules: {
      priceNegotiation: 20,
      urgencyCreation: 15,
      valueProposition: 35,
      closingTechnique: 30
    },
    tips: [
      '了解各家庭成员需求',
      '推荐适合全家的房源',
      '组织家庭看房活动',
      '提供详细对比分析'
    ]
  },
  {
    id: 'market_doubt',
    name: '市场观望情绪',
    description: '客户担心房价下跌，持观望态度',
    customerResponses: [
      '现在买房是不是时机不对？',
      '房价会不会继续跌？',
      '我想再等等看',
      '现在市场不稳定'
    ],
    keywords: ['时机', '房价', '下跌', '观望', '市场', '不稳定'],
    scoringRules: {
      priceNegotiation: 15,
      urgencyCreation: 20,
      valueProposition: 35,
      closingTechnique: 30
    },
    tips: [
      '提供市场分析数据',
      '强调长期投资价值',
      '分析历史房价走势',
      '推荐抗跌性强的房源'
    ]
  }
];

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id);
};

export const getAllScenarios = (): Scenario[] => {
  return scenarios;
}; 