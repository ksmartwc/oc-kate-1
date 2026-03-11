// Kate Hero Layout Generator — Figma Plugin
// Run once on Page 3 to generate the full hero layout

async function run() {
  // Load all fonts we'll use
  const fonts = [
    { family: "Inter", style: "Regular" },
    { family: "Inter", style: "Medium" },
    { family: "Inter", style: "SemiBold" },
    { family: "Inter", style: "Bold" },
  ];
  for (const f of fonts) {
    try { await figma.loadFontAsync(f); } catch(e) {}
  }

  // Helper: hex color -> Figma RGB (0-1 range)
  function rgb(hex) {
    return {
      r: parseInt(hex.slice(1,3),16)/255,
      g: parseInt(hex.slice(3,5),16)/255,
      b: parseInt(hex.slice(5,7),16)/255
    };
  }

  // Helper: solid fill
  function fill(hex, opacity = 1) {
    return [{ type: 'SOLID', color: rgb(hex), opacity }];
  }

  // Navigate to Page 3
  const page3 = figma.root.children.find(p => p.name === "Page 3");
  if (page3) figma.currentPage = page3;

  // ── MAIN HERO FRAME ──────────────────────────────────────
  const hero = figma.createFrame();
  hero.name = "Hero — Dot Cube Template";
  hero.resize(1440, 900);
  hero.x = 0;
  hero.y = 0;
  hero.fills = fill('#060d28');
  hero.clipsContent = true;

  // ── BACKGROUND GLOW (ellipse behind cube) ────────────────
  const glow = figma.createEllipse();
  glow.name = "BG Glow";
  glow.resize(700, 600);
  glow.x = 750;
  glow.y = 150;
  glow.fills = [{
    type: 'RADIAL_GRADIENT',
    gradientTransform: [[0.5, 0, 0.5], [0, 0.5, 0.5]],
    gradientStops: [
      { position: 0, color: { r: 0.18, g: 0.38, b: 0.88, a: 0.20 } },
      { position: 1, color: { r: 0.024, g: 0.051, b: 0.157, a: 0 } }
    ]
  }];
  hero.appendChild(glow);

  // ── NAV BAR ──────────────────────────────────────────────
  const nav = figma.createFrame();
  nav.name = "Nav";
  nav.resize(1440, 72);
  nav.x = 0; nav.y = 0;
  nav.fills = [];
  nav.strokes = fill('#ffffff', 0.05);
  nav.strokeWeight = 1;
  nav.strokeAlign = 'INSIDE';
  hero.appendChild(nav);

  // Logo
  const logo = figma.createText();
  logo.fontName = { family: "Inter", style: "Bold" };
  logo.characters = "dotcube";
  logo.fontSize = 20;
  logo.fills = fill('#ffffff');
  logo.x = 100;
  logo.y = 24;
  nav.appendChild(logo);

  // Nav links
  const navLinks = ["Features", "Demos", "Pricing", "Docs"];
  let nlX = 520;
  for (const link of navLinks) {
    const nl = figma.createText();
    nl.fontName = { family: "Inter", style: "Medium" };
    nl.characters = link;
    nl.fontSize = 14;
    nl.fills = fill('#ffffff', 0.45);
    nl.x = nlX;
    nl.y = 26;
    nav.appendChild(nl);
    nlX += 100;
  }

  // Nav CTA
  const navBtn = figma.createFrame();
  navBtn.name = "Nav CTA";
  navBtn.resize(160, 36);
  navBtn.x = 1180;
  navBtn.y = 18;
  navBtn.cornerRadius = 6;
  navBtn.fills = fill('#3c64ff', 0.15);
  navBtn.strokes = fill('#3c64ff', 0.30);
  navBtn.strokeWeight = 1;
  navBtn.strokeAlign = 'INSIDE';
  nav.appendChild(navBtn);

  const navBtnTxt = figma.createText();
  navBtnTxt.fontName = { family: "Inter", style: "SemiBold" };
  navBtnTxt.characters = "Get Template →";
  navBtnTxt.fontSize = 13;
  navBtnTxt.fills = fill('#6b9fff');
  navBtnTxt.textAlignHorizontal = 'CENTER';
  navBtnTxt.resize(160, 36);
  navBtnTxt.y = 10;
  navBtn.appendChild(navBtnTxt);

  // ── LEFT CONTENT ─────────────────────────────────────────
  const lx = 100;
  let cy = 158;

  // Tag pill
  const tagF = figma.createFrame();
  tagF.name = "Tag Pill";
  tagF.resize(232, 30);
  tagF.x = lx; tagF.y = cy;
  tagF.cornerRadius = 20;
  tagF.fills = fill('#3c64ff', 0.15);
  tagF.strokes = fill('#3c64ff', 0.35);
  tagF.strokeWeight = 1;
  tagF.strokeAlign = 'INSIDE';
  hero.appendChild(tagF);

  const tagTxt = figma.createText();
  tagTxt.fontName = { family: "Inter", style: "SemiBold" };
  tagTxt.characters = "ANIMATED HERO COMPONENT";
  tagTxt.fontSize = 11;
  tagTxt.letterSpacing = { value: 1.5, unit: 'PIXELS' };
  tagTxt.fills = fill('#6b9fff');
  tagTxt.textAlignHorizontal = 'CENTER';
  tagTxt.resize(232, 30);
  tagTxt.y = 8;
  tagF.appendChild(tagTxt);
  cy += 54;

  // Headline
  const lines = [
    { text: "Design that", color: '#ffffff' },
    { text: "moves with", color: '#ffffff' },
    { text: "purpose", color: '#4d8fff' },
  ];
  for (const line of lines) {
    const t = figma.createText();
    t.fontName = { family: "Inter", style: "Bold" };
    t.characters = line.text;
    t.fontSize = 62;
    t.fills = fill(line.color);
    t.x = lx; t.y = cy;
    hero.appendChild(t);
    cy += 70;
  }
  cy += 14;

  // Subtitle
  const sub = figma.createText();
  sub.fontName = { family: "Inter", style: "Regular" };
  sub.characters = "A production-ready animated 3D dot cube for your next\nSaaS, AI, or data product hero section.\nPure Canvas. Zero dependencies.";
  sub.fontSize = 17;
  sub.lineHeight = { value: 28, unit: 'PIXELS' };
  sub.fills = fill('#ffffff', 0.50);
  sub.x = lx; sub.y = cy;
  hero.appendChild(sub);
  cy += 106;

  // Primary button
  const btnPrimary = figma.createFrame();
  btnPrimary.name = "Button — Primary";
  btnPrimary.resize(216, 50);
  btnPrimary.x = lx; btnPrimary.y = cy;
  btnPrimary.cornerRadius = 8;
  btnPrimary.fills = fill('#3b6fd4');
  hero.appendChild(btnPrimary);

  const btnPTxt = figma.createText();
  btnPTxt.fontName = { family: "Inter", style: "SemiBold" };
  btnPTxt.characters = "Buy Template — $29";
  btnPTxt.fontSize = 15;
  btnPTxt.fills = fill('#ffffff');
  btnPTxt.textAlignHorizontal = 'CENTER';
  btnPTxt.resize(216, 50);
  btnPTxt.y = 15;
  btnPrimary.appendChild(btnPTxt);

  // Secondary button
  const btnSec = figma.createFrame();
  btnSec.name = "Button — Secondary";
  btnSec.resize(148, 50);
  btnSec.x = lx + 232; btnSec.y = cy;
  btnSec.cornerRadius = 8;
  btnSec.fills = fill('#ffffff', 0.0);
  btnSec.strokes = fill('#ffffff', 0.12);
  btnSec.strokeWeight = 1;
  btnSec.strokeAlign = 'INSIDE';
  hero.appendChild(btnSec);

  const btnSTxt = figma.createText();
  btnSTxt.fontName = { family: "Inter", style: "Medium" };
  btnSTxt.characters = "▶  Live Preview";
  btnSTxt.fontSize = 15;
  btnSTxt.fills = fill('#ffffff', 0.60);
  btnSTxt.textAlignHorizontal = 'CENTER';
  btnSTxt.resize(148, 50);
  btnSTxt.y = 15;
  btnSec.appendChild(btnSTxt);

  cy += 80;

  // Divider
  const divider = figma.createRectangle();
  divider.name = "Divider";
  divider.resize(440, 1);
  divider.x = lx; divider.y = cy;
  divider.fills = fill('#ffffff', 0.07);
  hero.appendChild(divider);
  cy += 32;

  // Stats
  const stats = [
    { val: "800px", label: "Canvas Size" },
    { val: "3", label: "Color Variants" },
    { val: "0", label: "Dependencies" },
  ];
  let sx = lx;
  for (const s of stats) {
    const sv = figma.createText();
    sv.fontName = { family: "Inter", style: "Bold" };
    sv.characters = s.val;
    sv.fontSize = 26;
    sv.fills = fill('#ffffff');
    sv.x = sx; sv.y = cy;
    hero.appendChild(sv);

    const sl = figma.createText();
    sl.fontName = { family: "Inter", style: "Regular" };
    sl.characters = s.label;
    sl.fontSize = 12;
    sl.fills = fill('#ffffff', 0.35);
    sl.x = sx; sl.y = cy + 34;
    hero.appendChild(sl);

    sx += 130;
  }

  // ── RIGHT — CUBE PLACEHOLDER ──────────────────────────────
  const cube = figma.createFrame();
  cube.name = "🎯 Cube Placeholder — Replace with animated canvas";
  cube.resize(500, 500);
  cube.x = 840;
  cube.y = 200;
  cube.cornerRadius = 12;
  cube.fills = fill('#3b6fd4', 0.04);
  cube.strokes = fill('#3b6fd4', 0.18);
  cube.strokeWeight = 1;
  cube.strokeAlign = 'INSIDE';
  hero.appendChild(cube);

  const cubeHint = figma.createText();
  cubeHint.fontName = { family: "Inter", style: "Medium" };
  cubeHint.characters = "Animated Dot Cube\n(paste canvas screenshot here)";
  cubeHint.fontSize = 14;
  cubeHint.lineHeight = { value: 22, unit: 'PIXELS' };
  cubeHint.fills = fill('#3b6fd4', 0.45);
  cubeHint.textAlignHorizontal = 'CENTER';
  cubeHint.resize(300, 50);
  cubeHint.x = 100;
  cubeHint.y = 225;
  cube.appendChild(cubeHint);

  // Done
  figma.currentPage.selection = [hero];
  figma.viewport.scrollAndZoomIntoView([hero]);
  figma.closePlugin("✅ Hero layout created on Page 3!");
}

run().catch(err => figma.closePlugin("❌ Error: " + err.message));
