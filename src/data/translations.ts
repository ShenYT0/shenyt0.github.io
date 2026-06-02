import { TranslationSet, SupportedLang } from '../types';

export const translations: Record<SupportedLang, TranslationSet> = {
  en: {
    hero: {
      greeting: "Hi, I'm",
      subtitle: 'CS & NLP Student',
      description: 'CS & NLP student from China, based in Paris, France.',
      contactBtn: 'Get in Touch',
      projectsBtn: 'View Projects',
      scroll: 'Scroll down',
    },
    about: {
      title: 'About Me',
      location: { title: 'Location', text: 'Paris, France' },
      education: { title: 'Education', text: 'NLP Master @ Inalco' },
      languages: {
        title: 'Languages',
        zh: 'Chinese', zhLevel: 'Native',
        en: 'English', enLevel: 'B2',
        fr: 'French', frLevel: 'B2',
        ja: 'Japanese', jaLevel: 'N3',
      },
    },
    education: {
      title: 'Education',
      inalco: { title: 'M2 in Natural Language Processing', desc: 'Master 2, Traitement automatique des langues' },
      uga: { title: 'Bachelor in Computer Science', desc: "Bachelor's degree, Informatique" },
      upjv: { title: 'DUT in Computer Science', desc: 'DUT, Informatique' },
    },
    projects: {
      title: 'Projects',
      pdfrag: { desc: 'A full-stack Knowledge Graph-based RAG system that extracts, indexes, and queries information from PDF documents.' },
      jobscanner: { badge: 'Mistral MCP Hackathon — 4th Finalist', desc: 'MCP tools for professional networking: a server that helps users find jobs, customize CVs, and automate applications.' },
    },
    experience: {
      title: 'Work Experience',
      hakatachoten: { title: 'Server & Cook Assistant' },
    },
    contact: {
      title: 'Get in Touch',
      text: "Feel free to reach out! I'm always open to interesting conversations and opportunities.",
    },
    footer: { text: 'Built with care.' },
  },
  fr: {
    hero: {
      greeting: 'Bonjour, je suis',
      subtitle: 'Étudiant en informatique & TALN',
      description: 'Étudiant chinois en informatique et TALN, basé à Paris, France.',
      contactBtn: 'Me Contacter',
      projectsBtn: 'Voir les Projets',
      scroll: 'Défiler',
    },
    about: {
      title: 'À Propos',
      location: { title: 'Localisation', text: 'Paris, France' },
      education: { title: 'Formation', text: 'Master TALN @ Inalco' },
      languages: {
        title: 'Langues',
        zh: 'Chinois', zhLevel: 'Langue maternelle',
        en: 'Anglais', enLevel: 'B2',
        fr: 'Français', frLevel: 'B2',
        ja: 'Japonais', jaLevel: 'N3',
      },
    },
    education: {
      title: 'Formation',
      inalco: { title: 'M2 en Traitement Automatique des Langues', desc: 'Master 2, Traitement automatique des langues' },
      uga: { title: 'Licence en Informatique', desc: "Bachelor's degree, Informatique" },
      upjv: { title: 'DUT en Informatique', desc: 'DUT, Informatique' },
    },
    projects: {
      title: 'Projets',
      pdfrag: { desc: "Un système RAG complet basé sur un graphe de connaissances qui extrait, indexe et interroge des informations à partir de documents PDF." },
      jobscanner: { badge: 'Mistral MCP Hackathon — 4e Finaliste', desc: 'Outils MCP pour les rencontres professionnelles : un serveur qui aide les utilisateurs à trouver un emploi, personnaliser leur CV et automatiser leurs candidatures.' },
    },
    experience: {
      title: 'Expérience Professionnelle',
      hakatachoten: { title: 'Serveur & Assistant Cuisinier' },
    },
    contact: {
      title: 'Me Contacter',
      text: "N'hésitez pas à me contacter ! Je suis toujours ouvert aux conversations et opportunités intéressantes.",
    },
    footer: { text: 'Réalisé avec soin.' },
  },
  zh: {
    hero: {
      greeting: '你好，我是',
      subtitle: '计算机科学 & 自然语言处理 学生',
      description: '来自中国的计算机与自然语言处理学生，现居法国巴黎。',
      contactBtn: '联系我',
      projectsBtn: '查看项目',
      scroll: '向下滚动',
    },
    about: {
      title: '关于我',
      location: { title: '所在地', text: '法国 巴黎' },
      education: { title: '教育背景', text: '自然语言处理硕士 @ Inalco' },
      languages: {
        title: '语言',
        zh: '中文', zhLevel: '母语',
        en: '英语', enLevel: 'B2',
        fr: '法语', frLevel: 'B2',
        ja: '日语', jaLevel: 'N3',
      },
    },
    education: {
      title: '教育经历',
      inalco: { title: '自然语言处理 硕士二年级', desc: 'Master 2, 自动语言处理' },
      uga: { title: '计算机科学 学士', desc: '学士学位, 信息学' },
      upjv: { title: '计算机科学 DUT', desc: 'DUT, 信息学' },
    },
    projects: {
      title: '项目',
      pdfrag: { desc: '一个基于知识图谱的RAG全栈系统，可从PDF文档中提取、索引和查询信息。' },
      jobscanner: { badge: 'Mistral MCP 黑客松 — 第四名决赛选手', desc: '职业社交MCP工具：帮助用户找工作、定制简历和自动申请职位的服务器。' },
    },
    experience: {
      title: '工作经历',
      hakatachoten: { title: '服务员 & 厨师助理' },
    },
    contact: {
      title: '联系我',
      text: '欢迎联系！我一直对有趣的对话和机会持开放态度。',
    },
    footer: { text: '用心打造。' },
  },
  ja: {
    hero: {
      greeting: 'こんにちは、私は',
      subtitle: 'コンピュータサイエンス & NLP 学生',
      description: '中国出身、フランス・パリを拠点とする CS・NLP 学生です。',
      contactBtn: 'お問い合わせ',
      projectsBtn: 'プロジェクトを見る',
      scroll: 'スクロール',
    },
    about: {
      title: '私について',
      location: { title: '所在地', text: 'フランス パリ' },
      education: { title: '学歴', text: 'NLP修士 @ Inalco' },
      languages: {
        title: '言語',
        zh: '中国語', zhLevel: 'ネイティブ',
        en: '英語', enLevel: 'B2',
        fr: 'フランス語', frLevel: 'B2',
        ja: '日本語', jaLevel: 'N3',
      },
    },
    education: {
      title: '学歴',
      inalco: { title: '自然言語処理 修士2年', desc: 'Master 2, 自動言語処理' },
      uga: { title: 'コンピュータサイエンス 学士', desc: '学士号, 情報学' },
      upjv: { title: 'コンピュータサイエンス DUT', desc: 'DUT, 情報学' },
    },
    projects: {
      title: 'プロジェクト',
      pdfrag: { desc: 'PDF文書から情報を抽出・インデックス化・検索する、知識グラフベースのRAGフルスタックシステム。' },
      jobscanner: { badge: 'Mistral MCP ハッカソン — 第4位ファイナリスト', desc: '就職活動のためのMCPツール：求人検索、履歴書のカスタマイズ、応募の自動化を支援するサーバー。' },
    },
    experience: {
      title: '職務経験',
      hakatachoten: { title: 'サーバー & 調理補助' },
    },
    contact: {
      title: 'お問い合わせ',
      text: 'お気軽にご連絡ください！面白い会話や機会にいつでもオープンです。',
    },
    footer: { text: '大切に作られました。' },
  },
};