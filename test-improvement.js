// 测试改进后的分析功能
const { analyzeScript } = require('./src/utils/scriptAnalyzer.ts');

// 测试场景
const testScenarios = [
  {
    id: 'price_jump',
    name: '业主跳价',
    keywords: ['价格', '跳价', '考虑', '其他客户', '涨价'],
    testScript: '您好，这个房子的价格确实有点高，我觉得可以再谈谈。'
  },
  {
    id: 'credit_issue', 
    name: '客户征信异常',
    keywords: ['征信', '逾期', '贷款', '信用', '银行'],
    testScript: '我的征信有点问题，能贷款吗？'
  },
  {
    id: 'competition',
    name: '竞争对手介入', 
    keywords: ['其他中介', '比较', '服务', '价格', '选择'],
    testScript: '其他中介也在联系我，我想比较一下。'
  }
];

console.log('=== 测试改进后的分析功能 ===\n');

testScenarios.forEach((scenario, index) => {
  console.log(`测试场景 ${index + 1}: ${scenario.name}`);
  console.log(`输入话术: ${scenario.testScript}`);
  
  try {
    const result = analyzeScript(scenario.testScript, scenario.keywords, scenario.id);
    console.log(`总分: ${result.total}`);
    console.log(`改进建议:`);
    result.feedback.forEach((advice, i) => {
      console.log(`  ${i + 1}. ${advice}`);
    });
    console.log('\n' + '='.repeat(50) + '\n');
  } catch (error) {
    console.log(`分析出错: ${error.message}\n`);
  }
}); 