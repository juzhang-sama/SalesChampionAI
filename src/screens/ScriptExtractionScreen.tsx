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
import { extractScriptTemplate, ScriptAnalysis } from '../utils/scriptAnalyzer';

const ScriptExtractionScreen: React.FC = () => {
  const [inputScript, setInputScript] = useState('');
  const [analysis, setAnalysis] = useState<ScriptAnalysis | null>(null);
  const [extractedTemplates, setExtractedTemplates] = useState<Array<{
    id: string;
    script: string;
    analysis: ScriptAnalysis;
    timestamp: Date;
  }>>([]);

  const handleExtract = () => {
    if (!inputScript.trim()) {
      Alert.alert('提示', '请输入要分析的话术');
      return;
    }

    const result = extractScriptTemplate(inputScript);
    setAnalysis(result);

    // 保存到模板库
    const newTemplate = {
      id: Date.now().toString(),
      script: inputScript,
      analysis: result,
      timestamp: new Date(),
    };

    setExtractedTemplates(prev => [newTemplate, ...prev]);
    setInputScript('');
  };

  const getProfessionalismColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const getProfessionalismText = (score: number) => {
    if (score >= 80) return '专业';
    if (score >= 60) return '良好';
    return '需提升';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>销冠话术萃取</Text>
      
      {/* 话术输入 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>输入销冠话术</Text>
        <TextInput
          style={styles.scriptInput}
          multiline
          placeholder="请输入销冠的话术内容..."
          value={inputScript}
          onChangeText={setInputScript}
          numberOfLines={6}
        />
        <TouchableOpacity style={styles.extractButton} onPress={handleExtract}>
          <Text style={styles.extractButtonText}>开始萃取</Text>
        </TouchableOpacity>
      </View>

      {/* 分析结果 */}
      {analysis && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>分析结果</Text>
          
          {/* 专业度评分 */}
          <View style={styles.professionalismContainer}>
            <Text style={styles.professionalismLabel}>专业度评分</Text>
            <Text style={[styles.professionalismScore, { color: getProfessionalismColor(analysis.professionalism) }]}>
              {analysis.professionalism}
            </Text>
            <Text style={[styles.professionalismText, { color: getProfessionalismColor(analysis.professionalism) }]}>
              {getProfessionalismText(analysis.professionalism)}
            </Text>
          </View>

          {/* 关键词提取 */}
          <View style={styles.keywordsContainer}>
            <Text style={styles.keywordsTitle}>提取关键词</Text>
            <View style={styles.keywordsList}>
              {analysis.keywords.map((keyword, index) => (
                <View key={index} style={styles.keywordTag}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 话术结构 */}
          <View style={styles.structureContainer}>
            <Text style={styles.structureTitle}>话术结构</Text>
            <Text style={styles.structureText}>{analysis.structure}</Text>
          </View>

          {/* 情感倾向 */}
          <View style={styles.emotionContainer}>
            <Text style={styles.emotionTitle}>情感倾向</Text>
            <Text style={styles.emotionText}>{analysis.emotion}</Text>
          </View>
        </View>
      )}

      {/* 模板库 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>话术模板库</Text>
        <Text style={styles.templateCount}>已萃取 {extractedTemplates.length} 条话术</Text>
        
        {extractedTemplates.map((template) => (
          <View key={template.id} style={styles.templateCard}>
            <Text style={styles.templateScript}>{template.script}</Text>
            <View style={styles.templateMeta}>
              <View style={styles.templateInfo}>
                <Text style={styles.templateLabel}>专业度:</Text>
                <Text style={[styles.templateValue, { color: getProfessionalismColor(template.analysis.professionalism) }]}>
                  {template.analysis.professionalism}
                </Text>
              </View>
              <View style={styles.templateInfo}>
                <Text style={styles.templateLabel}>结构:</Text>
                <Text style={styles.templateValue}>{template.analysis.structure}</Text>
              </View>
              <View style={styles.templateInfo}>
                <Text style={styles.templateLabel}>情感:</Text>
                <Text style={styles.templateValue}>{template.analysis.emotion}</Text>
              </View>
            </View>
            <Text style={styles.templateTime}>
              {template.timestamp.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
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
  scriptInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  extractButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  extractButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  professionalismContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  professionalismLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  professionalismScore: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  professionalismText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  keywordsContainer: {
    marginBottom: 20,
  },
  keywordsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keywordTag: {
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  keywordText: {
    color: '#1976d2',
    fontSize: 14,
    fontWeight: '500',
  },
  structureContainer: {
    marginBottom: 20,
  },
  structureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  structureText: {
    fontSize: 16,
    color: '#666',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  emotionContainer: {
    marginBottom: 20,
  },
  emotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  emotionText: {
    fontSize: 16,
    color: '#666',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  templateCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  templateCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  templateScript: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  templateMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  templateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  templateLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  templateValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  templateTime: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});

export default ScriptExtractionScreen; 