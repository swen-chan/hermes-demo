const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Swen Chan";
pres.title = "Hermes Agent 的搭建和使用";

// ── Palette ──
const BG    = "0F172A";
const CARD  = "1E293B";
const ACC   = "06B6D4";
const TXT   = "F1F5F9";
const MUTED = "94A3B8";
const WARN  = "F59E0B";

// ── Helpers ──
const makeShadow = () => ({ type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.3 });

function addTitleSlide(title, subtitle, notes) {
  const s = pres.addSlide();
  s.background = { color: BG };

  // top accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: ACC } });

  // title
  s.addText(title, {
    x: 0.8, y: 1.5, w: 8.4, h: 1.2,
    fontSize: 40, fontFace: "Georgia", color: TXT, bold: true,
    align: "left", valign: "bottom", margin: 0
  });

  // accent line under title
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.8, w: 2.5, h: 0.04, fill: { color: ACC } });

  // subtitle
  s.addText(subtitle, {
    x: 0.8, y: 3.0, w: 8.4, h: 0.8,
    fontSize: 20, fontFace: "Calibri", color: MUTED, italic: true,
    align: "left", valign: "top", margin: 0
  });

  if (notes) s.addNotes(notes);
  return s;
}

function addContentSlide(title, bullets, notes) {
  const s = pres.addSlide();
  s.background = { color: BG };

  // top accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: ACC } });

  // title
  s.addText(title, {
    x: 0.8, y: 0.4, w: 8.4, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: TXT, bold: true,
    align: "left", valign: "middle", margin: 0
  });

  // accent under title
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.15, w: 1.8, h: 0.03, fill: { color: ACC } });

  // bullet card
  const cardH = 0.5 + bullets.length * 0.55;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.5, w: 8.4, h: cardH,
    fill: { color: CARD }, shadow: makeShadow()
  });

  // bullets
  const bulletItems = bullets.map((b, i) => ({
    text: b,
    options: { bullet: true, breakLine: i < bullets.length - 1, fontSize: 18, color: TXT, fontFace: "Calibri" }
  }));
  s.addText(bulletItems, {
    x: 1.1, y: 1.65, w: 7.9, h: cardH - 0.3,
    paraSpaceAfter: 8, valign: "top", margin: 0
  });

  if (notes) s.addNotes(notes);
  return s;
}

// ══════════════════════════════════════════
// SLIDE 1 — Title
// ══════════════════════════════════════════
addTitleSlide(
  "Hermes Agent 的搭建和使用",
  "这场分享，是 Hermes 自己准备的",
  `大家好，我是 Swen。\n今天分享的主题是 Hermes Agent。\n但注意副标题——这场分享本身，从大纲到 slides，都是 Hermes 帮我准备的。\n我们直接开始。`
);

// ══════════════════════════════════════════
// SLIDE 2 — OpenClaw
// ══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: ACC } });

  // title
  s.addText("第一次接触 AI Agent", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: TXT, bold: true, align: "left", margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.15, w: 1.8, h: 0.03, fill: { color: ACC } });

  // left column: bullet card
  const leftBullets = [
    "OpenClaw 龙虾热：社群现象，也是我的 Agent 启蒙",
    "那时候想：如果 Agent 能帮你处理真实工作，而不是 demo，会怎样？"
  ];
  const leftCardH = 0.4 + leftBullets.length * 0.55;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.5, w: 5.0, h: leftCardH,
    fill: { color: CARD }, shadow: makeShadow()
  });
  const leftItems = leftBullets.map((b, i) => ({
    text: b,
    options: { bullet: true, breakLine: i < leftBullets.length - 1, fontSize: 17, color: TXT, fontFace: "Calibri" }
  }));
  s.addText(leftItems, {
    x: 1.1, y: 1.6, w: 4.5, h: leftCardH - 0.2,
    paraSpaceAfter: 8, valign: "top", margin: 0
  });

  // right column: photo placeholders
  // Placeholder 1
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.2, y: 1.5, w: 3.2, h: 1.6,
    fill: { color: CARD }, line: { color: MUTED, width: 1, dashType: "dash" },
    shadow: makeShadow()
  });
  s.addText("[ 手工填图 ]\nOpenClaw 深圳站", {
    x: 6.2, y: 1.5, w: 3.2, h: 1.6,
    fontSize: 14, fontFace: "Calibri", color: MUTED,
    align: "center", valign: "middle", margin: 0
  });

  // Placeholder 2
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.2, y: 3.3, w: 3.2, h: 1.6,
    fill: { color: CARD }, line: { color: MUTED, width: 1, dashType: "dash" },
    shadow: makeShadow()
  });
  s.addText("[ 手工填图 ]\nOpenClaw 香港站", {
    x: 6.2, y: 3.3, w: 3.2, h: 1.6,
    fontSize: 14, fontFace: "Calibri", color: MUTED,
    align: "center", valign: "middle", margin: 0
  });

  s.addNotes(
    `很多人第一次听说 AI Agent 可能是从各种产品 demo，我是从 OpenClaw 社群开始的。\n深圳站和香港站这两张照片，是我最早接触 Agent 社群的时候。\n当时就在想，能不能有一个 Agent 真正帮我干活，而不是只在 demo 里炫技。\n后来遇到了 Hermes。`
  );
}

// ══════════════════════════════════════════
// SLIDE 3 — 从 OpenClaw 到 Hermes
// ══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: ACC } });

  // title
  s.addText("从 OpenClaw 到 Hermes", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.55,
    fontSize: 30, fontFace: "Georgia", color: TXT, bold: true, align: "left", margin: 0
  });

  // hook
  s.addText("OpenClaw 打开了想象力，结合社区最佳实践进化成了 Hermes。", {
    x: 0.8, y: 0.85, w: 8.4, h: 0.4,
    fontSize: 15, fontFace: "Calibri", color: MUTED, italic: true, align: "left", margin: 0
  });

  // 3 cards
  const cards = [
    { title: "🧠 不只是对话", desc: "SOUL 定义人格，AGENTS 约束边界，\nSkills 积累经验。一次配置，持续生效。", w: 2.5, x: 0.8 },
    { title: "💾 不从头开始", desc: "Memory 跨 session 持久化。\n下次打开不用重新交代\n你是谁、怎么干活。", w: 2.5, x: 3.7 },
    { title: "🛡️ 可控才能持续", desc: "危险操作等你确认。\n信任不是说说——\n是设计出来的。", w: 2.5, x: 6.6 }
  ];

  cards.forEach(c => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 1.5, w: c.w, h: 2.2,
      fill: { color: CARD }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 1.5, w: c.w, h: 0.06, fill: { color: ACC }
    });
    s.addText(c.title, {
      x: c.x + 0.2, y: 1.7, w: c.w - 0.4, h: 0.45,
      fontSize: 15, fontFace: "Calibri", color: ACC, bold: true, margin: 0
    });
    s.addText(c.desc, {
      x: c.x + 0.2, y: 2.2, w: c.w - 0.4, h: 1.3,
      fontSize: 12.5, fontFace: "Calibri", color: MUTED, margin: 0
    });
  });

  // bottom tagline
  s.addText("从想象力到日常。从单次惊艳到持续可用。", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.5,
    fontSize: 16, fontFace: "Calibri", color: TXT, italic: true, align: "center", margin: 0
  });

  s.addNotes(
    `OpenClaw 和 Hermes 本质上是同类工具——都有 SOUL、Memory、Skills、多平台接入。\n区别不在 feature，在哲学：Hermes 是 OpenClaw 社区实践沉淀后的进化版。\n三个关键设计选择：工作系统化（不是一次 prompt）、持久记忆（不从头聊）、可控执行（信任才能持续用）。\n核心理念：你定原则，它干活；你审结果，它改进。`
  );
}

// ══════════════════════════════════════════
// SLIDE 4 — 搭建指南
// ══════════════════════════════════════════
addContentSlide(
  "从零搭建 Hermes",
  [
    "完整指南：03-hermes-guide.md（可独立分发）",
    "关键步骤：安装 → 配置模型 → 定义 SOUL/AGENTS → 接入 Telegram → 开始使用",
    "更多 Agent 搭建、商业化、创业思考 →"
  ],
  `我整理了一份完整的搭建指南，从零到跑通，每一步都有。\n现场打开文档给大家看一眼结构。\n如果你对 Agent 搭建感兴趣，或者想看我分享商业化、创业方向的思考，可以关注我 Twitter。\n我经常在上面发 Agent 实战经验。`
);

// Add Twitter handle on slide 4
{
  const lastSlide = pres.slides[pres.slides.length - 1];
  // card for twitter
  lastSlide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.7, w: 8.4, h: 0.6,
    fill: { color: CARD }
  });
  lastSlide.addText("🐦 Twitter/X:  @swen_chan", {
    x: 0.8, y: 3.7, w: 8.4, h: 0.6,
    fontSize: 18, fontFace: "Calibri", color: ACC, bold: true,
    align: "center", valign: "middle", margin: 0
  });
}

// ══════════════════════════════════════════
// SLIDE 5 — Live Demo
// ══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: ACC } });

  s.addText("Live Demo：真实交互", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: TXT, bold: true, align: "left", margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.15, w: 1.8, h: 0.03, fill: { color: ACC } });

  // video placeholder
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.5, w: 8.4, h: 2.6,
    fill: { color: "000000" }, line: { color: ACC, width: 2 },
    shadow: makeShadow()
  });
  s.addText("🎬 播放 Demo 视频\n（压缩剪辑，1.5min）", {
    x: 0.8, y: 1.5, w: 8.4, h: 2.6,
    fontSize: 24, fontFace: "Calibri", color: MUTED,
    align: "center", valign: "middle", margin: 0
  });

  // Meta-Demo explanation below
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.3, w: 8.4, h: 0.9,
    fill: { color: CARD }, shadow: makeShadow()
  });
  s.addText([
    { text: "Meta-Demo 逻辑：", options: { bold: true, color: ACC, fontSize: 14, fontFace: "Calibri", breakLine: true } },
    { text: "这场分享的每一份文件，都是 Hermes 在真实对话中一步步生成的。", options: { color: TXT, fontSize: 13, fontFace: "Calibri", breakLine: true } },
    { text: "你看到的不是「我做了一个 Agent」，而是「Agent 帮我做了这件事」。", options: { color: MUTED, fontSize: 13, fontFace: "Calibri", italic: true } }
  ], {
    x: 1.1, y: 4.35, w: 7.8, h: 0.8,
    paraSpaceAfter: 4, valign: "middle", margin: 0
  });

  s.addNotes(
    `现在放一段压缩剪辑，是我和 Hermes 的完整交互。\n就是你现在看到的这些 slides、大纲、指南，都是刚才那 1 分半里 Hermes 帮我写的。\n"我用 Hermes 准备了这场关于 Hermes 的分享"——这就是今天这场分享的 meta 层。\n回到刚才副标题：这场分享，是 Hermes 自己准备的。`
  );
}

// ══════════════════════════════════════════
// SLIDE 6 — 联系方式
// ══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: ACC } });

  s.addText("谢谢，保持联系", {
    x: 0.8, y: 1.0, w: 8.4, h: 1.0,
    fontSize: 42, fontFace: "Georgia", color: TXT, bold: true,
    align: "center", valign: "middle", margin: 0
  });

  // contact cards
  const contacts = [
    { icon: "💬", label: "微信", value: "swen_chan" },
    { icon: "🐦", label: "Twitter/X", value: "@swen_chan" },
    { icon: "🐙", label: "GitHub", value: "swen-chan" }
  ];

  contacts.forEach((c, i) => {
    const cx = 1.2 + i * 2.7;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 2.5, w: 2.3, h: 1.5,
      fill: { color: CARD }, shadow: makeShadow()
    });
    s.addText(c.icon, {
      x: cx, y: 2.55, w: 2.3, h: 0.5,
      fontSize: 28, align: "center", valign: "middle", margin: 0
    });
    s.addText(c.label, {
      x: cx, y: 3.0, w: 2.3, h: 0.35,
      fontSize: 13, fontFace: "Calibri", color: MUTED,
      align: "center", valign: "middle", margin: 0
    });
    s.addText(c.value, {
      x: cx, y: 3.35, w: 2.3, h: 0.45,
      fontSize: 15, fontFace: "Calibri", color: TXT, bold: true,
      align: "center", valign: "middle", margin: 0
    });
  });

  s.addNotes(`最后一页，拍照就行。\n有任何问题欢迎随时交流。\n谢谢大家。`);
}

// ── Write ──
const outPath = "/Users/Zhuanz/Desktop/Hermes-Demo/assets/Hermes-Demo.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("✅ Written: " + outPath);
}).catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
