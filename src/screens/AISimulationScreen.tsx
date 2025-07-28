import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { scenarios, Scenario } from '../data/scenarios';
import { analyzeScript, ScriptScore } from '../utils/scriptAnalyzer';

const AISimulationScreen: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [userScript, setUserScript] = useState('');
  const [score, setScore] = useState<ScriptScore | null>(null);
  const [currentCustomerResponse, setCurrentCustomerResponse] = useState('');

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setUserScript('');
    setScore(null);
    setCurrentCustomerResponse('');
  };

  const handleAnalyze = () => {
    if (!selectedScenario || !userScript.trim()) {
      Alert.alert('提示', '请选择场景并输入话术');
      return;
    }

    const analysisResult = analyzeScript(userScript, selectedScenario.keywords, selectedScenario.id);
    setScore(analysisResult);

    // 随机选择客户回复
    const randomResponse = selectedScenario.customerResponses[
      Math.floor(Math.random() * selectedScenario.customerResponses.length)
    ];
    setCurrentCustomerResponse(randomResponse);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return '优秀';
    if (score >= 60) return '良好';
    return '需改进';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI沙盘话术推演</Text>
      
      {/* 场景选择 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>选择场景</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {scenarios.map((scenario) => (
            <TouchableOpacity
              key={scenario.id}
              style={[
                styles.scenarioCard,
                selectedScenario?.id === scenario.id && styles.selectedScenario
              ]}
              onPress={() => handleScenarioSelect(scenario)}
            >
              <Text style={styles.scenarioName}>{scenario.name}</Text>
              <Text style={styles.scenarioDesc}>{scenario.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 话术输入 */}
      {selectedScenario && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>输入您的话术</Text>
          <TextInput
            style={styles.scriptInput}
            multiline
            placeholder="请输入您要说的内容..."
            value={userScript}
            onChangeText={setUserScript}
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze}>
            <Text style={styles.analyzeButtonText}>开始分析</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 分析结果 */}
      {score && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>分析结果</Text>
          
          {/* 总分 */}
          <View style={styles.totalScoreContainer}>
            <Text style={styles.totalScoreLabel}>总分</Text>
            <Text style={[styles.totalScore, { color: getScoreColor(score.total) }]}>
              {score.total}
            </Text>
            <Text style={[styles.totalScoreText, { color: getScoreColor(score.total) }]}>
              {getScoreText(score.total)}
            </Text>
          </View>

          {/* 详细评分 */}
          <View style={styles.detailScores}>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>价格谈判</Text>
              <Text style={[styles.scoreValue, { color: getScoreColor(score.priceNegotiation) }]}>
                {score.priceNegotiation}
              </Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>紧迫感</Text>
              <Text style={[styles.scoreValue, { color: getScoreColor(score.urgencyCreation) }]}>
                {score.urgencyCreation}
              </Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>价值主张</Text>
              <Text style={[styles.scoreValue, { color: getScoreColor(score.valueProposition) }]}>
                {score.valueProposition}
              </Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>成交技巧</Text>
              <Text style={[styles.scoreValue, { color: getScoreColor(score.closingTechnique) }]}>
                {score.closingTechnique}
              </Text>
            </View>
          </View>

          {/* 反馈建议 */}
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>改进建议</Text>
            {score.feedback.map((item, index) => (
              <Text key={index} style={styles.feedbackItem}>• {item}</Text>
            ))}
          </View>
        </View>
      )}

      {/* AI客户回复 */}
      {currentCustomerResponse && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI客户回复</Text>
          <View style={styles.customerResponseContainer}>
            <Text style={styles.customerResponseText}>{currentCustomerResponse}</Text>
          </View>
        </View>
      )}

      {/* 场景提示 */}
      {selectedScenario && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>场景提示</Text>
          {selectedScenario.tips.map((tip, index) => (
            <Text key={index} style={styles.tipItem}>• {tip}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  scenarioCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    minWidth: 120,
  },
  selectedScenario: {
    backgroundColor: '#007AFF',
  },
  scenarioName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  scenarioDesc: {
    fontSize: 12,
    color: '#666',
  },
  scriptInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  analyzeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalScoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalScoreLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  totalScore: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  totalScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailScores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  feedbackItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  customerResponseContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  customerResponseText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
  },
  tipItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
});

export default AISimulationScreen; 