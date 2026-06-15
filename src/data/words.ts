import type { Card } from '../types'

// ---------------------------------------------------------------------------
// 内容库：每条就是 feed 里的一次「上滑」。
//
// 想增删内容，直接改这个数组即可。卡片顺序 = 刷到的顺序，建议把不同 type 交错
// 排列，让 feed 像真实的短视频流一样有节奏感。
// ---------------------------------------------------------------------------

export const CARDS: Card[] = [
  // 0 ── 开场引导
  {
    id: 'intro',
    type: 'intro',
    accent: 'grape',
  },

  // 1 ── abandon（自嘲式开场梗）
  {
    id: 'abandon',
    type: 'mnemonic',
    accent: 'grape',
    word: 'abandon',
    phonetic: '/əˈbændən/',
    pos: 'v.',
    meaning: '放弃；抛弃',
    emoji: '🏳️',
    hook: '背单词永远从我开始',
    story:
      '每个背单词的人都认识 abandon —— 因为它永远是单词书的第一个。然后呢？然后他们就 abandon（放弃）了 😅。这次别放弃，从我开始，一直刷下去 👇',
    example: { en: "Don't abandon your dream.", zh: '别放弃你的梦想。' },
    tags: ['梗·入门'],
  },

  // 2 ── ambulance（经典谐音梗）
  {
    id: 'ambulance',
    type: 'mnemonic',
    accent: 'sunset',
    word: 'ambulance',
    phonetic: '/ˈæmbjələns/',
    pos: 'n.',
    meaning: '救护车',
    emoji: '🚑',
    hook: '俺不能死',
    story:
      '救护车呼啸而过，车里的人拼命大喊：「俺—不—能—死」（am-bu-lance）！记住这股求生欲，这个词你这辈子都忘不掉了。',
    example: { en: 'Call an ambulance, quick!', zh: '快叫救护车！' },
    tags: ['谐音梗'],
  },

  // 3 ── transport（词根拆解）
  {
    id: 'transport',
    type: 'etymology',
    accent: 'ocean',
    word: 'transport',
    phonetic: '/trænsˈpɔːrt/',
    pos: 'v.',
    meaning: '运输；运送',
    emoji: '🚚',
    parts: [
      { text: 'trans', mean: '横跨、穿过（across）' },
      { text: 'port', mean: '搬运、港口（carry）' },
    ],
    family: [
      { word: 'import', meaning: '进口（往里搬）' },
      { word: 'export', meaning: '出口（往外搬）' },
      { word: 'portable', meaning: '便携的（能搬走的）' },
      { word: 'porter', meaning: '搬运工、行李员' },
    ],
    example: {
      en: 'Trucks transport goods across the country.',
      zh: '卡车把货物运往全国各地。',
    },
    tags: ['词根 · port=搬'],
  },

  // 4 ── agony（扎心谐音梗）
  {
    id: 'agony',
    type: 'mnemonic',
    accent: 'candy',
    word: 'agony',
    phonetic: '/ˈæɡəni/',
    pos: 'n.',
    meaning: '（极度的）痛苦、煎熬',
    emoji: '💔',
    hook: '爱过你',
    story:
      '「爱—过—你」（a-go-ny）之后，剩下的只有极度的痛苦。原来分手的痛，英文早就写在单词里了 💔。',
    example: { en: 'She was in agony after the breakup.', zh: '分手后她痛苦不堪。' },
    tags: ['谐音梗', '扎心'],
  },

  // 5 ── 小测验：agony
  {
    id: 'quiz-agony',
    type: 'quiz',
    accent: 'forest',
    word: 'agony',
    phonetic: '/ˈæɡəni/',
    pos: 'n.',
    meaning: '极度痛苦',
    emoji: '🧠',
    question: '「爱过你」之后，剩下的是哪个词？',
    options: [
      { text: 'agony（痛苦）', correct: true },
      { text: 'agent（代理人）', correct: false },
      { text: 'economy（经济）', correct: false },
      { text: 'agree（同意）', correct: false },
    ],
    explain: 'a-go-ny ≈「爱过你」，爱过之后的极度痛苦，就是 agony。',
    tags: ['测验'],
  },

  // 6 ── pregnant（污但好记）
  {
    id: 'pregnant',
    type: 'mnemonic',
    accent: 'candy',
    word: 'pregnant',
    phonetic: '/ˈpreɡnənt/',
    pos: 'adj.',
    meaning: '怀孕的',
    emoji: '🤰',
    hook: '扑来个男的',
    story:
      '为什么会 pregnant（怀孕）？因为「扑—来—个—男—的」（preg-nant）😳。这个谐音有点皮，但你绝对一秒记住。',
    example: { en: 'She is eight months pregnant.', zh: '她怀孕八个月了。' },
    tags: ['谐音梗', '少儿不宜(误)'],
  },

  // 7 ── sting（拟声谐音）
  {
    id: 'sting',
    type: 'mnemonic',
    accent: 'gold',
    word: 'sting',
    phonetic: '/stɪŋ/',
    pos: 'v. & n.',
    meaning: '蜇，刺痛',
    emoji: '🐝',
    hook: '死叮',
    story: '一只蜜蜂「死—叮」（sting）着你不放，那叫一个刺痛 🐝💥。被叮的瞬间，你就记住它了。',
    example: { en: 'A bee can only sting once.', zh: '蜜蜂只能蜇人一次。' },
    tags: ['谐音梗'],
  },

  // 8 ── 配对小游戏：pest
  {
    id: 'match-pest',
    type: 'match',
    accent: 'forest',
    word: 'pest',
    phonetic: '/pest/',
    pos: 'n.',
    meaning: '害虫；讨厌的人',
    prompt: '「拍死它」—— pest 指的是下面哪一个？',
    options: [
      { emoji: '🐛', label: '害虫', correct: true },
      { emoji: '🐶', label: '宠物', correct: false },
      { emoji: '🌼', label: '花朵', correct: false },
      { emoji: '🍎', label: '水果', correct: false },
    ],
    example: { en: 'These pests destroyed the crops.', zh: '这些害虫毁了庄稼。' },
    tags: ['小游戏', '谐音:拍死它'],
  },

  // 9 ── economy（谐音梗）
  {
    id: 'economy',
    type: 'mnemonic',
    accent: 'gold',
    word: 'economy',
    phonetic: '/ɪˈkɑːnəmi/',
    pos: 'n.',
    meaning: '经济',
    emoji: '🌾',
    hook: '依靠农民',
    story:
      'e-co-no-my，谐音「依—靠—农—民」。一个国家的 economy（经济），归根到底要依靠勤劳的人们 🌾。',
    example: { en: 'The economy is growing fast.', zh: '经济正在快速增长。' },
    tags: ['谐音梗'],
  },

  // 10 ── telescope（词根拆解 tele=远）
  {
    id: 'telescope',
    type: 'etymology',
    accent: 'ocean',
    word: 'telescope',
    phonetic: '/ˈtelɪskoʊp/',
    pos: 'n.',
    meaning: '望远镜',
    emoji: '🔭',
    parts: [
      { text: 'tele', mean: '远的（far）' },
      { text: 'scope', mean: '看、观察的工具（watch）' },
    ],
    family: [
      { word: 'telephone', meaning: '电话（远 + 声音）' },
      { word: 'television', meaning: '电视（远 + 影像）' },
      { word: 'telegram', meaning: '电报（远 + 写）' },
      { word: 'teleport', meaning: '瞬移（远 + 搬运）' },
    ],
    example: {
      en: 'He looked at the stars through a telescope.',
      zh: '他用望远镜观察星星。',
    },
    tags: ['词根 · tele=远'],
  },

  // 11 ── ambition（励志谐音）
  {
    id: 'ambition',
    type: 'mnemonic',
    accent: 'sunset',
    word: 'ambition',
    phonetic: '/æmˈbɪʃn/',
    pos: 'n.',
    meaning: '雄心，抱负',
    emoji: '🔥',
    hook: '俺必胜',
    story: '心里默念「俺—必—胜」（am-bi-tion），这股不服输的劲儿，就是雄心壮志该有的样子 🔥。',
    example: { en: 'He is full of ambition.', zh: '他雄心勃勃。' },
    tags: ['谐音梗', '励志'],
  },

  // 12 ── soar（动画场景）
  {
    id: 'soar',
    type: 'scene',
    accent: 'ocean',
    word: 'soar',
    phonetic: '/sɔːr/',
    pos: 'v.',
    meaning: '翱翔；高飞；猛增',
    scene: 'soar',
    caption: '看 —— 让梦想 soar（翱翔）起来 🦅',
    example: { en: 'Prices soared last year.', zh: '去年物价猛涨。' },
    tags: ['动画', '一看就懂'],
  },

  // 13 ── morose（谐音梗）
  {
    id: 'morose',
    type: 'mnemonic',
    accent: 'mono',
    word: 'morose',
    phonetic: '/məˈroʊs/',
    pos: 'adj.',
    meaning: '郁闷的，闷闷不乐的',
    emoji: '😞',
    hook: '莫(没)肉丝',
    story: '今天点的盖饭里「莫（没）—肉—丝」（mo-rose），一整天都闷闷不乐 😞🍚。',
    example: { en: 'He sat in morose silence.', zh: '他闷闷不乐地坐着，一言不发。' },
    tags: ['谐音梗'],
  },

  // 14 ── flee（谐音梗）
  {
    id: 'flee',
    type: 'mnemonic',
    accent: 'forest',
    word: 'flee',
    phonetic: '/fliː/',
    pos: 'v.',
    meaning: '逃跑，逃离',
    emoji: '🏃',
    hook: '飞离',
    story: '危险来临，撒腿就「飞—离」（flee）现场 🏃💨。跑得像飞起来一样，就是 flee。',
    example: { en: 'They had to flee the country.', zh: '他们不得不逃离这个国家。' },
    tags: ['谐音梗'],
  },

  // 15 ── predict（词根 pre+dict）
  {
    id: 'predict',
    type: 'etymology',
    accent: 'grape',
    word: 'predict',
    phonetic: '/prɪˈdɪkt/',
    pos: 'v.',
    meaning: '预言，预测',
    emoji: '🔮',
    parts: [
      { text: 'pre', mean: '前、提前（before）' },
      { text: 'dict', mean: '说（say）' },
    ],
    family: [
      { word: 'dictionary', meaning: '字典（汇集“说的话”）' },
      { word: 'preview', meaning: '预览（提前看）' },
      { word: 'prevent', meaning: '预防（提前挡住）' },
      { word: 'dictate', meaning: '口述、命令（说出来）' },
    ],
    example: {
      en: 'No one can predict the future.',
      zh: '没人能预测未来。',
    },
    tags: ['词根 · dict=说'],
  },

  // 16 ── ponderous（谐音梗）
  {
    id: 'ponderous',
    type: 'mnemonic',
    accent: 'mono',
    word: 'ponderous',
    phonetic: '/ˈpɑːndərəs/',
    pos: 'adj.',
    meaning: '笨重的；沉闷冗长的',
    emoji: '🐘',
    hook: '胖得要死',
    story: '「胖—得—要—死」（pon-der-ous），走起路来又笨又重，每一步都地动山摇 🐘。',
    example: { en: 'The elephant moved with ponderous steps.', zh: '大象迈着笨重的步子。' },
    tags: ['谐音梗'],
  },

  // 17 ── 小测验：ambulance
  {
    id: 'quiz-ambulance',
    type: 'quiz',
    accent: 'sunset',
    word: 'ambulance',
    phonetic: '/ˈæmbjələns/',
    pos: 'n.',
    meaning: '救护车',
    emoji: '🧠',
    question: '出车祸了，「俺不能死」要叫的是？',
    options: [
      { text: 'ambition（雄心）', correct: false },
      { text: 'ambulance（救护车）', correct: true },
      { text: 'abundance（大量）', correct: false },
      { text: 'ambush（埋伏）', correct: false },
    ],
    explain: 'am-bu-lance ≈「俺不能死」—— 这种时候当然是叫救护车 ambulance！',
    tags: ['测验'],
  },

  // 18 ── blossom（动画场景）
  {
    id: 'blossom',
    type: 'scene',
    accent: 'candy',
    word: 'blossom',
    phonetic: '/ˈblɑːsəm/',
    pos: 'v. & n.',
    meaning: '开花，绽放',
    scene: 'blossom',
    caption: '春天到了，它正在 blossom（绽放）🌸',
    example: { en: 'The cherry trees blossom in spring.', zh: '樱花在春天绽放。' },
    tags: ['动画', '一看就懂'],
  },

  // 19 ── 结尾
  {
    id: 'outro',
    type: 'outro',
    accent: 'grape',
  },
]
