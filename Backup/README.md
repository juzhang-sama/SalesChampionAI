# 销冠AI教练 (Sales Champion AI Coach)

## 📱 项目简介

销冠AI教练是一款专为房产中介行业定制的移动AI陪练SaaS工具，旨在通过轻量化AI工具提升新人专业性与人效，降低培训成本。

### 🎯 核心目标
- **缩短新人开单周期70%+**
- **降低合规风险80%**
- **7天内复制销冠能力**

### 📊 关键指标
- 话术合规率
- 带看转化率  
- 新人7日留存率

## 🚀 核心功能

### 模块1：新人速成舱
- **AI沙盘话术推演** (P0级)
  - 预置20个高发场景脚本（业主跳价/客户征信异常）
  - 文本交互模拟客户，实时反馈表现得分（0-100）
- **话术熔断器** (P0级)
  - 实时监听通话，识别违规话术
  - 耳机震动提醒并推送合规话术模板
- **带看清单生成** (P1级)
  - 输入小区名称自动输出带看检查项

### 模块2：老员工提效包
- **销冠话术萃取** (P0级)
  - 输入销冠话术→自动提取高光技巧
  - 生成话术模板库
- **微信跟单助手** (P0级)
  - 自动扫描微信聊天记录，标记关键节点
- **极速房源文案** (P1级)
  - 拍摄房源照片→OCR识别→生成吸睛文案

### 模块3：管理驾驶舱
- **风险预警看板** (P0级)
  - 实时显示团队违规话术TOP3人员
- **人效对比图** (P0级)
  - 展示使用前后人均带看量/平均开单周期变化
- **能力资产库** (P1级)
  - 统计销冠话术沉淀量

## 🛠️ 技术架构

### 前端技术栈
- **React Native 0.80.1** - 跨平台移动开发框架
- **TypeScript** - 类型安全的JavaScript
- **React Navigation** - 导航管理
- **React Native Gesture Handler** - 手势处理
- **React Native Safe Area Context** - 安全区域处理

### 核心组件
- **AI引擎层** - 文本分析和评分算法
- **业务逻辑层** - 话术分析和模板生成
- **数据存储层** - 本地SQLite数据库
- **UI组件层** - 自定义React Native组件

### 项目结构
```
SalesChampionAI/
├── src/
│   ├── screens/           # 页面组件
│   │   ├── HomeScreen.tsx
│   │   ├── AISimulationScreen.tsx
│   │   ├── ScriptExtractionScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── data/              # 数据文件
│   │   └── scenarios.ts
│   └── utils/             # 工具函数
│       └── scriptAnalyzer.ts
├── android/               # Android原生代码
├── ios/                   # iOS原生代码
├── App.tsx               # 应用入口
└── package.json          # 依赖配置
```

## 📦 安装指南

### 环境要求
- Node.js 18+
- React Native CLI
- Android Studio (Android开发)
- Xcode (iOS开发，可选)

### 安装步骤

1. **克隆项目**
```bash
git clone [GitHub仓库地址]
cd SalesChampionAI
```

2. **安装依赖**
```bash
npm install
```

3. **Android环境配置**
```bash
# 设置Android SDK路径
echo "sdk.dir=F:\\Android" > android/local.properties
```

4. **启动开发服务器**
```bash
npx react-native start
```

5. **构建Android应用**
```bash
cd android
./gradlew assembleDebug
```

### 构建APK
```bash
cd android
./gradlew assembleRelease
```

## 🎮 使用指南

### AI沙盘话术推演
1. 选择场景（业主跳价、客户征信异常等）
2. 输入你的话术
3. 点击"分析"获得评分
4. 查看AI客户回复和建议

### 销冠话术萃取
1. 输入优秀话术
2. 系统自动分析关键词、结构、情感
3. 生成话术模板
4. 保存到模板库

### 管理驾驶舱
- 查看团队数据统计
- 监控风险预警
- 管理话术资产库

## 🔧 开发指南

### 添加新场景
在 `src/data/scenarios.ts` 中添加新的场景配置：

```typescript
{
  id: 'new_scenario',
  name: '新场景名称',
  description: '场景描述',
  customerResponses: ['客户回复1', '客户回复2'],
  keywords: ['关键词1', '关键词2'],
  scoringRules: {
    priceNegotiation: 25,
    urgencyCreation: 25,
    valueProposition: 25,
    closingTechnique: 25,
  },
  tips: ['技巧1', '技巧2']
}
```

### 自定义评分算法
在 `src/utils/scriptAnalyzer.ts` 中修改评分逻辑。

### 添加新页面
1. 在 `src/screens/` 创建新页面组件
2. 在 `App.tsx` 中添加导航路由
3. 在 `HomeScreen.tsx` 中添加菜单项

## 📱 部署说明

### Android APK
- 开发版本：`android/app/build/outputs/apk/debug/app-debug.apk`
- 发布版本：`android/app/build/outputs/apk/release/app-release.apk`

### 安装方式
1. 通过ADB安装：`adb install app-debug.apk`
2. 手动安装：将APK传输到手机后安装

## 🔒 隐私说明

- 所有语音数据存储在本地
- 提供"一键清理"功能
- 不收集个人敏感信息
- 符合数据保护法规

## 📄 许可证

本项目采用 MIT 许可证。

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 项目Issues
- 邮箱：[联系邮箱]

---

**销冠AI教练** - 让每个房产中介都能成为销冠！
