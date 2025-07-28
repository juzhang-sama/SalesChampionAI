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

export const analyzeScript = (script: string, scenarioKeywords: string[]): ScriptScore => {
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
  });
  
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
}): string[] => {
  const feedback: string[] = [];
  
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
  
  return feedback;
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
    keywords: [...new Set(keywords)], // 去重
    structure,
    emotion,
    professionalism
  };
}; 