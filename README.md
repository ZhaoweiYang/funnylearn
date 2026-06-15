# 梗词 · 像刷短视频一样背单词

> 把每一个英文单词，变成一个**段子**、一个**小游戏**、一段**动画**。
> 上滑、上滑、再上滑 —— 在「刷」的快感里，被动地、有趣地记住单词。

灵感来自 [skimmify](https://skimmify.com/tw/) 的「碎片化趣味学习」，交互形态对标 **TikTok / 抖音** 的竖向沉浸式信息流：每一次上滑，都是对某个单词的一种趣味化讲解。

![type: web app](https://img.shields.io/badge/type-web%20app-7c3aed) ![stack](https://img.shields.io/badge/React%2018%20·%20Vite%20·%20TS%20·%20Tailwind%20v4-0ea5e9)

---

## ✨ 核心理念

传统背单词：**主动、枯燥、容易 abandon**。
梗词：**被动、上瘾、像刷视频一样停不下来**。

记忆科学告诉我们，**越离谱、越有情绪、越具象**的联想越难忘。所以这里的每个词，都用最「上头」的方式呈现：

- 🎭 **谐音梗 / 段子** —— `ambulance`（救护车）= 「俺不能死」，`agony`（痛苦）=「爱过你」
- 🧩 **词根拆解** —— 点一点把 `transport` 拆成 `trans`(横跨) + `port`(搬运)，顺手记住一整个家族词
- ❓ **趣味小测验** —— 点一下选项，即时对错反馈 + 彩屑庆祝
- 🎯 **配对小游戏** —— 把单词和图标连起来
- 🎬 **动画场景** —— 用一小段 CSS 动画把 `blossom`(绽放) / `soar`(翱翔) 直接「演」给你看
- 🎥 **影视台词** —— 真实电影台词（《教父》《阿甘正传》《肖申克的救赎》…）+ **YouGlish** 真实视频片段，看这个词到底怎么用

## 🕹️ 交互特点（TikTok 式体验）

- **竖向吸附信息流**：一屏一个词，上滑下一条、下滑回看上一条（移动端原生手势；桌面端支持 `↑ ↓ / 空格 / PageUp / PageDown`）。
- **右侧操作栏**：❤️ 点赞、🔖 收藏到生词本、🔊 发音、🔗 分享。
- **真人发音**：基于浏览器自带的 **Web Speech API**，点单词或例句即可朗读，纯本地、免费、无需联网。
- **进度与战绩**：顶部显示「已学 N 个词」，结尾卡展示本轮点赞 / 收藏统计。
- **本地持久化**：点赞、收藏、已学记录存在 `localStorage`，刷新不丢。
- 移动端优先、暗色沉浸式 UI，并适配「减少动态效果」无障碍偏好。

## 🚀 快速开始

```bash
npm install      # 安装依赖
npm run dev      # 本地开发，默认 http://localhost:5173
npm run build    # 生产构建（含 TypeScript 类型检查）到 dist/
npm run preview  # 本地预览生产构建
```

> 用手机扫码体验更佳：`npm run dev -- --host` 后用同一局域网的手机打开终端给出的 Network 地址。

## 🧩 怎么加一个新单词梗？

所有内容都在 **`src/data/words.ts`** 一个数组里，**改这个文件就能增删内容**，无需动其它代码。数组顺序就是刷到的顺序，建议把不同类型交错排列，让信息流有节奏感。

下面是各种卡片类型的最小示例：

```ts
// 谐音梗 / 段子
{
  id: 'ambulance',
  type: 'mnemonic',
  accent: 'sunset',                 // 配色主题，见 src/lib/themes.ts
  word: 'ambulance',
  phonetic: '/ˈæmbjələns/',
  pos: 'n.',
  meaning: '救护车',
  emoji: '🚑',
  hook: '俺不能死',                 // 谐音钩子
  story: '救护车呼啸而过……「俺—不—能—死」！',
  example: { en: 'Call an ambulance!', zh: '快叫救护车！' },
  tags: ['谐音梗'],
}

// 词根拆解
{
  id: 'transport', type: 'etymology', word: 'transport', phonetic: '/trænsˈpɔːrt/',
  pos: 'v.', meaning: '运输', emoji: '🚚',
  parts: [{ text: 'trans', mean: '横跨' }, { text: 'port', mean: '搬运' }],
  family: [{ word: 'import', meaning: '进口' }, { word: 'export', meaning: '出口' }],
  example: { en: 'Trucks transport goods.', zh: '卡车运送货物。' },
}

// 小测验 / 配对小游戏 / 动画场景 的字段，见 src/types.ts 中的类型定义
```

新加一个类型？三步：在 `src/types.ts` 里加一个 `XxxCard` 接口并并入 `Card` 联合类型 → 写一个 `src/components/cards/XxxCard.tsx` → 在 `src/components/Reel.tsx` 的 `switch` 里挂上。TypeScript 会提示你哪里漏了。

## 📚 用 ECDICT 批量扩充词库

不想一个个手写？用脚本从开源词典 [**ECDICT**](https://github.com/skywind3000/ECDICT)（MIT，约 76 万词条）按「考纲 + 词频」自动导入高频词：

```bash
npm run import:ecdict                 # 默认：下载 ecdict.csv，取 CET4 前 60 个高频词
LIMIT=100 TAG=cet6 npm run import:ecdict   # 也可改成 CET6 / 取更多
```

它会生成 `src/data/cet4.ts`（一批 `movie` 影视台词卡），自动追加到精选卡片之后、并去重。每个导入词都带 **YouGlish** 入口，点开就能看它在真实影视/真人视频里怎么用。

> 🎥 **关于影视画面的版权**：电影视频/截图本身受版权保护，本站**不存储任何视频**，而是通过 YouGlish 内嵌 YouTube 播放（版权由 YouTube/YouGlish 承担），这是合规做法。

## 🗂️ 项目结构

```
src/
├─ data/words.ts          # 👈 内容库：精选单词梗 + 组装最终 feed
├─ data/cet4.ts           # 由 import:ecdict 生成的 CET4 高频词（勿手改）
├─ types.ts               # 卡片数据模型（各种 type）
├─ lib/themes.ts          # 配色主题
├─ hooks/
│  ├─ useLocalStorage.ts  # localStorage 持久化 + 字符串集合（点赞/收藏）
│  └─ useSpeech.ts        # Web Speech API 发音
├─ context/FeedContext.ts # 点赞/收藏/已学 的全局状态
├─ components/
│  ├─ Feed.tsx            # 竖向吸附滚动的信息流 + 键盘翻页
│  ├─ Reel.tsx            # 单条全屏「短视频位」+ 背景 + 操作栏
│  ├─ ActionRail.tsx      # 右侧 点赞/收藏/发音/分享
│  ├─ TopBar.tsx          # 顶部品牌 + 进度 + 战绩
│  ├─ cards/              # 各种卡片：Mnemonic / Etymology / Quiz / Match / Scene / Movie / Intro / Outro
│  └─ ui/                 # WordTitle / ExampleBlock / Confetti / SceneStage / Tags / YouglishPlayer
└─ ...
（仓库根）scripts/import-ecdict.mjs  # 从 ECDICT 按考纲+词频导入生成 cet4.ts
├─ App.tsx                # 注入全局状态
└─ main.tsx               # 入口
```

## 🧪 技术栈

- **React 18 + TypeScript**（`strict` 模式）
- **Vite 5** 构建
- **Tailwind CSS v4**（`@tailwindcss/vite`）
- 零运行时第三方依赖：发音用浏览器原生 **Web Speech API**，动画用 **纯 CSS**，无需后端、无需联网即可运行。

## 🛣️ 后续可扩展方向

- 📈 **遗忘曲线/间隔重复**：把「已学」升级为 SRS，按记忆强度智能插入复习卡。
- 🎞️ **真·短视频**：`scene` 卡已为「视频化讲解」预留位置，可直接换成 `<video>` 或 Lottie 动画。
- 🗃️ **后端 + 账号**：词库、生词本、学习进度上云，多端同步。
- 🧠 **AI 生成梗**：用大模型按用户词表自动生成谐音梗与例句，内容无限扩充。
- 🔀 **个性化 feed**：根据点赞/答题表现，像推荐算法一样调整出词顺序与难度。
- 🌐 **多语种释义**：当前为简体中文，可扩展繁中 / 英英释义。

---

*学一个梗，记一个词。Happy swiping! 🤓*
