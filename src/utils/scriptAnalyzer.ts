export interface ScriptScore {
  total: number;
  priceNegotiation: number;
  urgencyCreation: number;
  valueProposition: number;
  closingTechnique: number;
  feedback: string[];
}

export interface ScriptAnalysis {
  keywords: string[];
  structure: string;
  emotion: string;
  professionalism: number;
}

// 房产中介专业词汇库
const professionalKeywords = [
  '学区房', '地铁房', '精装修', '毛坯房', '南北通透', '采光好',
  '户型方正', '得房率高', '容积率', '绿化率', '物业费', '停车位',
  '首付', '月供', '贷款', '全款', '分期', '过户', '税费', '中介费',
  '看房', '带看', '签约', '成交', '议价', '砍价', '加价', '跳价'
];

// 情感词汇库
const positiveEmotions = ['满意', '喜欢', '不错', '很好', '优质', '理想', '完美'];
const negativeEmotions = ['担心', '犹豫', '怀疑', '不满', '失望', '焦虑', '压力'];

// 话术结构关键词
const structureKeywords = {
  opening: ['您好', '打扰了', '请问', '想了解一下'],
  body: ['这个房子', '这套房源', '这个小区', '这个位置'],
  closing: ['您觉得', '您考虑', '您决定', '您看怎么样']
};

// 场景特定建议模板
const scenarioSpecificAdvice = {
  price_jump: {
    priceNegotiation: [
      '建议强调市场行情，提供近期成交数据对比',
      '可以提及同小区其他房源价格作为参考',
      '建议分析业主心理，说明合理定价的重要性',
      '可以提出分期付款等灵活方案'
    ],
    urgencyCreation: [
      '建议强调房源稀缺性，说明看房客户较多',
      '可以提及其他客户也在关注这套房源',
      '建议说明市场趋势，避免业主犹豫',
      '可以设置看房时间限制，创造紧迫感'
    ],
    valueProposition: [
      '建议详细分析房源优势，如位置、户型、配套等',
      '可以对比同价位其他房源，突出性价比',
      '建议强调投资价值，如租金回报率',
      '可以提及未来升值潜力'
    ],
    closingTechnique: [
      '建议明确表达购买意向，避免业主犹豫',
      '可以提出具体签约时间，增加确定性',
      '建议提供定金方案，锁定房源',
      '可以强调长期合作，建立信任关系'
    ]
  },
  credit_issue: {
    priceNegotiation: [
      '建议了解具体征信问题，提供针对性解决方案',
      '可以推荐合适的贷款银行和产品',
      '建议分析不同付款方式的利弊',
      '可以提出分期付款或全款优惠方案'
    ],
    urgencyCreation: [
      '建议说明征信修复的时间成本',
      '可以强调房价上涨趋势，避免等待',
      '建议提供快速审批的贷款方案',
      '可以设置优惠期限，创造紧迫感'
    ],
    valueProposition: [
      '建议强调房源的投资价值，不受征信影响',
      '可以分析不同付款方式下的实际成本',
      '建议突出房源的稀缺性和升值潜力',
      '可以提供租金收益分析'
    ],
    closingTechnique: [
      '建议提供多种付款方案，增加成交可能性',
      '可以推荐专业的征信修复服务',
      '建议明确表达支持态度，建立信任',
      '可以设置灵活的签约条件'
    ]
  },
  competition: {
    priceNegotiation: [
      '建议突出专业服务优势，而非价格竞争',
      '可以提供独家房源信息',
      '建议强调长期合作关系',
      '可以提供增值服务，如免费评估'
    ],
    urgencyCreation: [
      '建议快速响应客户需求，体现专业效率',
      '可以强调房源稀缺性，避免客户犹豫',
      '建议提供独家优惠，增加竞争优势',
      '可以设置服务承诺，建立信任'
    ],
    valueProposition: [
      '建议详细分析房源优势，提供专业建议',
      '可以对比不同中介的服务差异',
      '建议强调专业能力和成功案例',
      '可以提供市场分析和投资建议'
    ],
    closingTechnique: [
      '建议快速跟进，避免客户流失',
      '可以提供独家服务承诺',
      '建议建立长期合作关系',
      '可以提供后续增值服务'
    ]
  },
  family_dispute: {
    priceNegotiation: [
      '建议了解各家庭成员的具体需求',
      '可以提供多种户型选择',
      '建议分析不同预算下的最优方案',
      '可以提供分期付款等灵活方案'
    ],
    urgencyCreation: [
      '建议组织家庭看房活动，统一意见',
      '可以强调房源适合全家需求',
      '建议提供详细对比分析，帮助决策',
      '可以设置看房时间，避免拖延'
    ],
    valueProposition: [
      '建议详细分析房源对全家的价值',
      '可以提供周边配套和未来发展分析',
      '建议强调居住舒适度和生活便利性',
      '可以提供投资和自住双重价值分析'
    ],
    closingTechnique: [
      '建议协调各家庭成员意见，达成共识',
      '可以提供家庭购房咨询服务',
      '建议明确表达支持态度，建立信任',
      '可以提供后续家庭服务承诺'
    ]
  },
  market_doubt: {
    priceNegotiation: [
      '建议提供详细的市场分析数据',
      '可以分析历史房价走势和未来趋势',
      '建议推荐抗跌性强的房源',
      '可以提供投资价值分析'
    ],
    urgencyCreation: [
      '建议强调当前是购房好时机',
      '可以分析政策利好和市场机遇',
      '建议提供限时优惠，创造紧迫感',
      '可以强调房源稀缺性'
    ],
    valueProposition: [
      '建议详细分析房源的长期投资价值',
      '可以提供租金回报率分析',
      '建议强调房源的稀缺性和不可替代性',
      '可以提供未来发展规划分析'
    ],
    closingTechnique: [
      '建议提供专业的投资建议',
      '可以设置灵活的付款方案',
      '建议明确表达专业支持，建立信任',
      '可以提供后续投资咨询服务'
    ]
  }
};

export const analyzeScript = (script: string, scenarioKeywords: string[], scenarioId?: string): ScriptScore => {
  const words = script.split(/[\s,，。！？!?]+/);
  const lowerScript = script.toLowerCase();
  
  // 关键词匹配分析
  const keywordScore = analyzeKeywords(words, scenarioKeywords);
  
  // 话术结构分析
  const structureScore = analyzeStructure(lowerScript);
  
  // 情感表达分析
  const emotionScore = analyzeEmotion(lowerScript);
  
  // 专业度分析
  const professionalismScore = analyzeProfessionalism(words);
  
  // 计算各项得分
  const priceNegotiation = Math.min(100, keywordScore * 0.4 + structureScore * 0.3 + emotionScore * 0.3);
  const urgencyCreation = Math.min(100, structureScore * 0.5 + emotionScore * 0.5);
  const valueProposition = Math.min(100, keywordScore * 0.6 + professionalismScore * 0.4);
  const closingTechnique = Math.min(100, structureScore * 0.4 + emotionScore * 0.3 + professionalismScore * 0.3);
  
  const total = Math.round((priceNegotiation + urgencyCreation + valueProposition + closingTechnique) / 4);
  
  // 生成反馈建议
  const feedback = generateFeedback({
    priceNegotiation,
    urgencyCreation,
    valueProposition,
    closingTechnique
  }, script, scenarioId);
  
  return {
    total,
    priceNegotiation: Math.round(priceNegotiation),
    urgencyCreation: Math.round(urgencyCreation),
    valueProposition: Math.round(valueProposition),
    closingTechnique: Math.round(closingTechnique),
    feedback
  };
};

const analyzeKeywords = (words: string[], scenarioKeywords: string[]): number => {
  let score = 0;
  const matchedKeywords: string[] = [];
  
  // 检查场景关键词匹配
  scenarioKeywords.forEach(keyword => {
    if (words.some(word => word.includes(keyword))) {
      score += 20;
      matchedKeywords.push(keyword);
    }
  });
  
  // 检查专业词汇使用
  professionalKeywords.forEach(keyword => {
    if (words.some(word => word.includes(keyword))) {
      score += 10;
    }
  });
  
  return Math.min(100, score);
};

const analyzeStructure = (script: string): number => {
  let score = 0;
  
  // 检查开场白
  if (structureKeywords.opening.some(keyword => script.includes(keyword))) {
    score += 25;
  }
  
  // 检查主体内容
  if (structureKeywords.body.some(keyword => script.includes(keyword))) {
    score += 25;
  }
  
  // 检查结束语
  if (structureKeywords.closing.some(keyword => script.includes(keyword))) {
    score += 25;
  }
  
  // 检查话术长度
  if (script.length > 50 && script.length < 200) {
    score += 25;
  }
  
  return score;
};

const analyzeEmotion = (script: string): number => {
  let score = 50; // 中性情感基础分
  
  // 检查积极情感词汇
  const positiveCount = positiveEmotions.filter(emotion => script.includes(emotion)).length;
  score += positiveCount * 10;
  
  // 检查消极情感词汇
  const negativeCount = negativeEmotions.filter(emotion => script.includes(emotion)).length;
  score -= negativeCount * 5;
  
  return Math.max(0, Math.min(100, score));
};

const analyzeProfessionalism = (words: string[]): number => {
  let score = 0;
  
  // 检查专业词汇使用
  const professionalCount = professionalKeywords.filter(keyword => 
    words.some(word => word.includes(keyword))
  ).length;
  
  score += professionalCount * 15;
  
  // 检查话术礼貌程度
  const politeWords = ['您', '请', '谢谢', '不好意思', '打扰'];
  const politeCount = politeWords.filter(word => 
    words.some(w => w.includes(word))
  ).length;
  
  score += politeCount * 10;
  
  return Math.min(100, score);
};

const generateFeedback = (scores: {
  priceNegotiation: number;
  urgencyCreation: number;
  valueProposition: number;
  closingTechnique: number;
}, script: string, scenarioId?: string): string[] => {
  const feedback: string[] = [];
  const words = script.split(/[\s,，。！？!?]+/);
  
  // 场景特定建议
  if (scenarioId && scenarioSpecificAdvice[scenarioId as keyof typeof scenarioSpecificAdvice]) {
    const scenarioAdvice = scenarioSpecificAdvice[scenarioId as keyof typeof scenarioSpecificAdvice];
    
    // 根据得分选择相应的场景建议
    if (scores.priceNegotiation < 70) {
      const advice = scenarioAdvice.priceNegotiation[Math.floor(Math.random() * scenarioAdvice.priceNegotiation.length)];
      feedback.push(advice);
    }
    
    if (scores.urgencyCreation < 70) {
      const advice = scenarioAdvice.urgencyCreation[Math.floor(Math.random() * scenarioAdvice.urgencyCreation.length)];
      feedback.push(advice);
    }
    
    if (scores.valueProposition < 70) {
      const advice = scenarioAdvice.valueProposition[Math.floor(Math.random() * scenarioAdvice.valueProposition.length)];
      feedback.push(advice);
    }
    
    if (scores.closingTechnique < 70) {
      const advice = scenarioAdvice.closingTechnique[Math.floor(Math.random() * scenarioAdvice.closingTechnique.length)];
      feedback.push(advice);
    }
  }
  
  // 话术内容分析建议
  const contentAnalysis = analyzeScriptContent(script, words);
  feedback.push(...contentAnalysis);
  
  // 如果没有场景特定建议，使用通用建议
  if (feedback.length === 0) {
    if (scores.priceNegotiation < 60) {
      feedback.push('建议加强价格谈判技巧，突出房源性价比');
    }
    
    if (scores.urgencyCreation < 60) {
      feedback.push('可以增加紧迫感，强调房源稀缺性');
    }
    
    if (scores.valueProposition < 60) {
      feedback.push('需要更好地突出房源核心价值');
    }
    
    if (scores.closingTechnique < 60) {
      feedback.push('建议改进成交技巧，增加引导性语言');
    }
    
    if (feedback.length === 0) {
      feedback.push('话术表现优秀，继续保持！');
    }
  }
  
  return feedback;
};

// 新增：话术内容分析函数
const analyzeScriptContent = (script: string, words: string[]): string[] => {
  const suggestions: string[] = [];
  
  // 分析话术长度
  if (script.length < 30) {
    suggestions.push('话术过于简短，建议增加更多细节和说服力');
  } else if (script.length > 200) {
    suggestions.push('话术过长，建议精简重点，提高表达效率');
  }
  
  // 分析专业词汇使用
  const professionalCount = professionalKeywords.filter(keyword => 
    words.some(word => word.includes(keyword))
  ).length;
  
  if (professionalCount < 2) {
    suggestions.push('建议增加更多专业词汇，提升话术专业度');
  }
  
  // 分析情感表达
  const positiveCount = positiveEmotions.filter(emotion => script.includes(emotion)).length;
  const negativeCount = negativeEmotions.filter(emotion => script.includes(emotion)).length;
  
  if (negativeCount > positiveCount) {
    suggestions.push('话术情感表达偏消极，建议增加积极正面的表达');
  }
  
  // 分析话术结构
  const hasOpening = structureKeywords.opening.some(keyword => script.includes(keyword));
  const hasBody = structureKeywords.body.some(keyword => script.includes(keyword));
  const hasClosing = structureKeywords.closing.some(keyword => script.includes(keyword));
  
  if (!hasOpening) {
    suggestions.push('建议增加合适的开场白，建立良好沟通氛围');
  }
  
  if (!hasBody) {
    suggestions.push('建议增加房源介绍和优势分析');
  }
  
  if (!hasClosing) {
    suggestions.push('建议增加引导性结束语，促进成交');
  }
  
  // 分析礼貌用语
  const politeWords = ['您', '请', '谢谢', '不好意思', '打扰'];
  const politeCount = politeWords.filter(word => 
    words.some(w => w.includes(word))
  ).length;
  
  if (politeCount < 2) {
    suggestions.push('建议增加礼貌用语，提升话术亲和力');
  }
  
  return suggestions;
};

export const extractScriptTemplate = (script: string): ScriptAnalysis => {
  const words = script.split(/[\s,，。！？!?]+/);
  
  // 提取关键词
  const keywords = words.filter(word => 
    professionalKeywords.some(keyword => word.includes(keyword))
  );
  
  // 分析话术结构
  let structure = '标准结构';
  if (script.length < 30) {
    structure = '简短直接';
  } else if (script.length > 100) {
    structure = '详细说明';
  }
  
  // 分析情感倾向
  let emotion = '中性';
  const positiveCount = positiveEmotions.filter(emotion => script.includes(emotion)).length;
  const negativeCount = negativeEmotions.filter(emotion => script.includes(emotion)).length;
  
  if (positiveCount > negativeCount) {
    emotion = '积极正面';
  } else if (negativeCount > positiveCount) {
    emotion = '谨慎保守';
  }
  
  // 计算专业度
  const professionalism = analyzeProfessionalism(words);
  
  return {
    keywords: Array.from(new Set(keywords)), // 去重
    structure,
    emotion,
    professionalism
  };
}; 