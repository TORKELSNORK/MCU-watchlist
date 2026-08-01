// runtime in minutes: movies = theatrical runtime, series = sum of all episodes
// release: the title's rank in actual theatrical/premiere release order (1 = released first)
const DATA = {
  infinity: {
    label: "The Infinity Saga",
    items: [
      ["Captain America: The First Avenger (2011)", 124, 5],
      ["Captain Marvel (2019)", 123, 21],
      ["Iron Man (2008)", 126, 1],
      ["Iron Man 2 (2010)", 124, 3],
      ["The Incredible Hulk (2008)", 112, 2],
      ["Thor (2011)", 115, 4],
      ["Avengers (2012)", 143, 6],
      ["Thor: The Dark World (2013)", 112, 8],
      ["Iron Man 3 (2013)", 130, 7],
      ["Captain America: The Winter Soldier (2014)", 136, 9],
      ["Guardians of the Galaxy (2014)", 121, 10],
      ["Guardians of the Galaxy Vol. 2 (2017)", 136, 15],
      ["I am Groot (2022-2023)", 25, 37],
      ["Avengers: Age of Ultron (2015)", 141, 11],
      ["Ant-Man (2015)", 117, 12],
      ["Captain America: Civil War (2016)", 147, 13],
      ["Black Widow (2021)", 134, 27],
      ["Black Panther (2018)", 134, 18],
      ["Spider-Man: Homecoming (2017)", 133, 16],
      ["Doctor Strange (2016)", 115, 14],
      ["Thor: Ragnarok (2017)", 130, 17],
      ["Ant-Man and The Wasp (2018)", 118, 20],
      ["Avengers: Infinity War (2018)", 149, 19],
      ["Avengers: Endgame (2019)", 181, 22]
    ]
  },
  multiverse: {
    label: "The Multiverse Saga",
    items: [
      ["Loki (2021-2023)", 600, 26],
      ["Spider-Man: Far From Home (2019)", 129, 23],
      ["Spider-Man: No Way Home (2021)", 148, 32],
      ["What if...? (2021-2024)", 910, 28],
      ["WandaVision (2021)", 320, 24],
      ["Shang-Chi and the Legend of the Ten Rings (2021)", 132, 29],
      ["The Falcon and the Winter Soldier (2021)", 290, 25],
      ["Eternals (2021)", 156, 30],
      ["Doctor Strange in the Multiverse of Madness (2022)", 126, 34],
      ["Hawkeye (2021)", 290, 31],
      ["Moon Knight (2022)", 290, 33],
      ["Black Panther: Wakanda Forever (2022)", 161, 40],
      ["She-Hulk (2022)", 300, 38],
      ["Ms. Marvel (2022)", 210, 35],
      ["Thor: Love and Thunder (2022)", 119, 36],
      ["Ironheart (2025)", 240, 50],
      ["Werewolf by Night (2022)", 55, 39],
      ["Guardians of the Galaxy: Holiday Special (2022)", 44, 41],
      ["Ant-Man and The Wasp: Quantumania (2023)", 125, 42],
      ["Guardians of the Galaxy Vol. 3 (2023)", 150, 43],
      ["Secret Invasion (2023)", 200, 44],
      ["The Marvels (2023)", 105, 45],
      ["Deadpool & Wolverine (2024)", 128, 46],
      ["Agatha All Along (2024)", 340, 47],
      ["Captain America: Brave New World (2025)", 118, 48],
      ["Thunderbolts* (2025)", 127, 49]
    ]
  }
};

const STORAGE_KEY = "mcu-checklist-progress";
const SYNC_CODE_KEY = "mcu-checklist-sync-code";
// Paste your Firebase Realtime Database URL here, e.g. "https://your-project-id-default-rtdb.firebaseio.com"
const FIREBASE_DB_URL = "https://mcu-watchlist-58ea6-default-rtdb.europe-west1.firebasedatabase.app";

let state = {};
let currentTab = "all";
let currentOrder = "chrono";
let storageWarned = false;
let hasCloudStorage = typeof window.storage !== 'undefined';
let syncCode = localStorage.getItem(SYNC_CODE_KEY) || null;
let syncConfigured = FIREBASE_DB_URL && !FIREBASE_DB_URL.startsWith("PASTE_");

function slugify(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

function showModal({ title, message, confirmLabel = 'OK', cancelLabel = null }){
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box">
        <div class="modal-header">${title}</div>
        <div class="modal-body">${message}</div>
        <div class="modal-actions">
          ${cancelLabel ? `<button class="modal-btn ghost" data-action="cancel">${cancelLabel}</button>` : ''}
          <button class="modal-btn" data-action="confirm">${confirmLabel}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    function close(result){
      overlay.remove();
      resolve(result);
    }

    overlay.querySelector('[data-action="confirm"]').addEventListener('click', () => close(true));
    const cancelBtn = overlay.querySelector('[data-action="cancel"]');
    if(cancelBtn) cancelBtn.addEventListener('click', () => close(false));
    overlay.addEventListener('click', e => { if(e.target === overlay) close(false); });
    document.addEventListener('keydown', function onKey(e){
      if(e.key === 'Escape'){ close(false); document.removeEventListener('keydown', onKey); }
    });
  });
}

function customAlert(title, message, okLabel = 'OK'){
  return showModal({ title, message, confirmLabel: okLabel });
}

function customConfirm(title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel'){
  return showModal({ title, message, confirmLabel, cancelLabel });
}

function genSyncCode(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars
  let out = '';
  for(let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

async function fetchCloudState(code){
  const res = await fetch(`${FIREBASE_DB_URL}/mcu-checklists/${code}.json`);
  if(!res.ok) throw new Error('cloud fetch failed: ' + res.status);
  return await res.json(); // null if nothing saved yet under this code
}

async function pushCloudState(code, data){
  const res = await fetch(`${FIREBASE_DB_URL}/mcu-checklists/${code}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if(!res.ok) throw new Error('cloud push failed: ' + res.status);
}

async function loadState(){
  if(syncConfigured && syncCode){
    try{
      const cloudData = await fetchCloudState(syncCode);
      if(cloudData){
        state = cloudData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return;
      }
      // nothing saved under this code yet: fall through and seed it from whatever's local
    }catch(e){
      showStorageWarning("Couldn't reach the sync server just now, so showing your last saved progress on this device instead.");
    }
  }
  if(hasCloudStorage){
    try{
      const res = await window.storage.get(STORAGE_KEY);
      state = res ? JSON.parse(res.value) : {};
      return;
    }catch(e){
      // fall through to local storage below
    }
  }
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    state = raw ? JSON.parse(raw) : {};
  }catch(e){
    state = {};
  }
}

function showStorageWarning(text){
  if(storageWarned) return;
  storageWarned = true;
  const banner = document.createElement('div');
  banner.textContent = text;
  banner.style.cssText = "background:#3a2a12;color:#f0c98a;border:2px solid #000;border-radius:6px;padding:8px 12px;font-size:12.5px;margin-top:12px;";
  document.querySelector('.hero').after(banner);
}

async function saveState(retries = 2){
  // always keep a local cache so the app works offline / instantly on next load
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}

  if(syncConfigured && syncCode){
    for(let attempt = 0; attempt <= retries; attempt++){
      try{
        await pushCloudState(syncCode, state);
        return;
      }catch(e){
        if(attempt < retries){
          await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
        }else{
          showStorageWarning("Couldn't sync to the cloud just now. Your changes are saved on this device and will sync next time it's reachable.");
        }
      }
    }
    return;
  }

  if(hasCloudStorage){
    for(let attempt = 0; attempt <= retries; attempt++){
      try{
        await window.storage.set(STORAGE_KEY, JSON.stringify(state));
        return;
      }catch(e){
        if(attempt < retries){
          await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
        }
      }
    }
    showStorageWarning("Saving to Claude's cloud storage isn't working right now, so progress is being kept in this browser instead. It'll persist here but won't follow you to another device.");
  }
}

function checkSvg(){
  return '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9 18 20 6"></polyline></svg>';
}

function formatHours(minutes){
  const h = minutes / 60;
  if(h < 10) return (Math.round(h*10)/10) + 'h';
  return Math.round(h) + 'h';
}

function render(){
  const container = document.getElementById('lists');
  container.innerHTML = '';

  const sagasToShow = currentTab === 'all' ? ['infinity','multiverse'] : [currentTab];

  let totalDone = 0, totalCount = 0;
  let minutesDone = 0, minutesTotal = 0;

  function rowHtml(sagaKey, item, mins, showBadge){
    const id = sagaKey + ':' + slugify(item);
    const isDone = !!state[id];
    if(isDone) totalDone++;
    totalCount++;
    minutesTotal += mins;
    if(isDone) minutesDone += mins;
    const match = item.match(/^(.*)\s(\(.+\))$/);
    const title = match ? match[1] : item;
    const year = match ? match[2] : '';
    const badge = showBadge
      ? `<div class="saga-badge ${sagaKey}">${sagaKey === 'infinity' ? 'Infinity' : 'Multiverse'}</div>`
      : '';
    return `<li class="item ${isDone ? 'done':''}" data-id="${id}">
        <div class="box">${checkSvg()}</div>
        <div class="title">${title} <span class="year">${year}</span></div>
        ${badge}
        <div class="dur">${formatHours(mins)}</div>
      </li>`;
  }

  if(currentOrder === 'chrono'){
    sagasToShow.forEach(sagaKey => {
      const saga = DATA[sagaKey];
      const sagaEl = document.createElement('div');
      sagaEl.className = 'saga';

      let doneCount = 0, sagaMinDone = 0, sagaMinTotal = 0;
      const listHtml = saga.items.map(([item, mins]) => {
        const before = totalDone, beforeMin = minutesDone;
        const html = rowHtml(sagaKey, item, mins, false);
        if(totalDone > before) doneCount++;
        sagaMinTotal += mins;
        if(totalDone > before) sagaMinDone += mins;
        return html;
      }).join('');

      sagaEl.innerHTML = `
        <div class="saga-head">
          <span>${saga.label}</span>
          <span class="count">${doneCount} / ${saga.items.length} &middot; ${formatHours(sagaMinDone)} / ${formatHours(sagaMinTotal)}</span>
        </div>
        <ul class="list">${listHtml}</ul>
      `;
      container.appendChild(sagaEl);
    });
  }else{
    // release date order: flatten across the selected saga(s) and sort by release rank
    const flat = [];
    sagasToShow.forEach(sagaKey => {
      DATA[sagaKey].items.forEach(([item, mins, rel]) => {
        flat.push({ sagaKey, item, mins, rel });
      });
    });
    flat.sort((a, b) => a.rel - b.rel);

    const showBadge = sagasToShow.length > 1;
    const listHtml = flat.map(r => rowHtml(r.sagaKey, r.item, r.mins, showBadge)).join('');

    const sagaEl = document.createElement('div');
    sagaEl.className = 'saga';
    sagaEl.innerHTML = `
      <div class="saga-head">
        <span>Release date order</span>
        <span class="count">${totalDone} / ${totalCount} &middot; ${formatHours(minutesDone)} / ${formatHours(minutesTotal)}</span>
      </div>
      <ul class="list">${listHtml}</ul>
    `;
    container.appendChild(sagaEl);
  }

  document.getElementById('statDone').textContent = totalDone;
  document.getElementById('statLeft').textContent = totalCount - totalDone;
  const pct = totalCount ? Math.round((totalDone/totalCount)*100) : 0;
  document.getElementById('statPct').textContent = pct + '%';
  document.getElementById('barFill').style.width = pct + '%';
  document.getElementById('hoursDone').textContent = formatHours(minutesDone);
  document.getElementById('hoursLeft').textContent = formatHours(minutesTotal - minutesDone);

  container.querySelectorAll('.item').forEach(li => {
    li.addEventListener('click', () => {
      const id = li.dataset.id;
      state[id] = !state[id];
      render();
      saveState();
    });
  });
}

document.querySelectorAll('.tab[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab[data-tab]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTab = btn.dataset.tab;
    render();
  });
});

document.querySelectorAll('.order-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.order-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentOrder = btn.dataset.order;
    render();
  });
});

document.getElementById('resetBtn').addEventListener('click', async () => {
  const ok = await customConfirm(
    'Reset all progress?',
    'This clears every checked-off title on this device' + ((syncConfigured && syncCode) ? ', and updates your synced cloud copy too.' : '.'),
    'Reset all',
    'Cancel'
  );
  if(ok){
    state = {};
    await saveState();
    render();
  }
});

function updateSyncUI(){
  const statusEl = document.getElementById('syncStatus');
  const stopBtn = document.getElementById('syncStopBtn');
  const input = document.getElementById('syncInput');

  if(!syncConfigured){
    statusEl.textContent = "Sync isn't set up on this page yet (needs a Firebase database URL).";
    statusEl.classList.remove('on');
    stopBtn.style.display = 'none';
    return;
  }
  if(syncCode){
    statusEl.textContent = `Syncing with code: ${syncCode} — enter this same code on your other devices`;
    statusEl.classList.add('on');
    stopBtn.style.display = '';
    input.value = '';
    input.placeholder = syncCode;
  }else{
    statusEl.textContent = "Not syncing — progress stays on this device only";
    statusEl.classList.remove('on');
    stopBtn.style.display = 'none';
  }
}

async function connectWithCode(code){
  code = code.trim().toUpperCase();
  if(!code) return;
  syncCode = code;
  localStorage.setItem(SYNC_CODE_KEY, syncCode);
  updateSyncUI();
  try{
    const cloudData = await fetchCloudState(syncCode);
    if(cloudData){
      state = cloudData;
    }else{
      // brand new code: seed the cloud with whatever's on this device right now
      await pushCloudState(syncCode, state);
    }
    render();
  }catch(e){
    showStorageWarning("Couldn't reach the sync server to connect. Check the code and your connection, then try again.");
  }
}

document.getElementById('syncConnectBtn').addEventListener('click', async () => {
  if(!syncConfigured){
    await customAlert('Sync not set up', 'This page needs a Firebase database URL added before syncing will work. See the setup instructions.');
    return;
  }
  const val = document.getElementById('syncInput').value;
  if(!val.trim()){
    await customAlert('Enter a code', 'Type a code first, or use "Generate new code" to create one.');
    return;
  }
  connectWithCode(val);
});

document.getElementById('syncGenerateBtn').addEventListener('click', async () => {
  if(!syncConfigured){
    await customAlert('Sync not set up', 'This page needs a Firebase database URL added before syncing will work. See the setup instructions.');
    return;
  }
  connectWithCode(genSyncCode());
});

document.getElementById('syncStopBtn').addEventListener('click', async () => {
  const ok = await customConfirm(
    'Stop syncing?',
    "This device keeps its current progress, but won't send or receive updates anymore.",
    'Stop syncing',
    'Cancel'
  );
  if(ok){
    syncCode = null;
    localStorage.removeItem(SYNC_CODE_KEY);
    updateSyncUI();
  }
});

// pull latest from the cloud whenever the tab regains focus, so changes made on another device show up
document.addEventListener('visibilitychange', async () => {
  if(document.visibilityState === 'visible' && syncConfigured && syncCode){
    try{
      const cloudData = await fetchCloudState(syncCode);
      if(cloudData) { state = cloudData; render(); }
    }catch(e){ /* stay on last known state if offline */ }
  }
});

// ---------- PNG export ----------

function truncateText(ctx, text, maxWidth){
  if(ctx.measureText(text).width <= maxWidth) return text;
  let t = text;
  while(t.length > 1 && ctx.measureText(t + '\u2026').width > maxWidth){
    t = t.slice(0, -1);
  }
  return t + '\u2026';
}

function currentSectionsForExport(){
  const sagasToShow = currentTab === 'all' ? ['infinity','multiverse'] : [currentTab];
  if(currentOrder === 'chrono'){
    return sagasToShow.map(k => ({
      label: DATA[k].label,
      entries: DATA[k].items.map(([item, mins]) => ({ item, mins, sagaKey: k }))
    }));
  }
  const flat = [];
  sagasToShow.forEach(k => DATA[k].items.forEach(([item, mins, rel]) => flat.push({ item, mins, rel, sagaKey: k })));
  flat.sort((a, b) => a.rel - b.rel);
  return [{ label: 'Release date order', entries: flat }];
}

function rr(ctx, x, y, w, h, r){
  ctx.beginPath();
  if(ctx.roundRect){ ctx.roundRect(x, y, w, h, r); }
  else{
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
  }
}

async function generateProgressImage(){
  const btn = document.getElementById('exportBtn');
  btn.disabled = true;
  const originalLabel = btn.textContent;
  btn.textContent = 'Generating\u2026';

  try{
    if(document.fonts && document.fonts.ready) await document.fonts.ready;

    const sections = currentSectionsForExport();
    const sideBySide = sections.length > 1;

    const W = sideBySide ? 1040 : 900;
    const PAD = 26;
    const midGap = 24;
    const cols = sideBySide ? 3 : 4;
    const cellGap = 7;
    const cellH = 32;
    const cellR = 2;
    const sectionHeaderH = 26;
    const sectionGap = 16;
    const footerH = 30;

    const blockW = sideBySide ? (W - PAD * 2 - midGap) / 2 : (W - PAD * 2);
    const cellW = (blockW - cellGap * (cols - 1)) / cols;

    const titleZoneH = 96;
    const chipsH = 56;
    const chipsGapAbove = 14;
    const barH = 14;
    const barGapAbove = 12;
    const heroPadBottom = 18;
    const heroH = titleZoneH + chipsGapAbove + chipsH + barGapAbove + barH + heroPadBottom;
    const headerH = heroH + 20;

    let totalDone = 0, totalCount = 0, minutesDone = 0, minutesTotal = 0;
    const laidOut = sections.map(section => {
      let doneCount = 0, sMinDone = 0, sMinTotal = 0;
      const cards = section.entries.map(({ item, mins, sagaKey }) => {
        const id = sagaKey + ':' + slugify(item);
        const done = !!state[id];
        totalCount++; minutesTotal += mins;
        if(done){ totalDone++; minutesDone += mins; doneCount++; sMinDone += mins; }
        sMinTotal += mins;
        return { item, mins, done, sagaKey };
      });
      const rows = Math.ceil(cards.length / cols);
      const sectionH = sectionHeaderH + rows * cellH + (rows - 1) * cellGap;
      return { label: section.label, doneCount, total: cards.length, sMinDone, sMinTotal, cards, rows, sectionH };
    });

    const contentH = sideBySide
      ? Math.max(laidOut[0].sectionH, laidOut[1].sectionH)
      : laidOut.reduce((s, sec) => s + sec.sectionH, 0) + sectionGap * (laidOut.length - 1);
    const totalH = headerH + contentH + footerH + PAD;
    const pct = totalCount ? Math.round((totalDone / totalCount) * 100) : 0;

    const scale = 2; // crisper output
    const canvas = document.createElement('canvas');
    canvas.width = W * scale;
    canvas.height = totalH * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // background
    const bgGrad = ctx.createRadialGradient(W * 0.2, 0, 0, W * 0.2, 0, totalH * 0.9);
    bgGrad.addColorStop(0, '#262626');
    bgGrad.addColorStop(1, '#121212');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, totalH);

    // ---- hero (red banner containing title + stats + bar, like the website) ----
    ctx.save();
    rr(ctx, 0, 0, W, heroH, 6);
    ctx.clip();
    const bannerGrad = ctx.createLinearGradient(0, 0, W, heroH);
    bannerGrad.addColorStop(0, '#e0222f');
    bannerGrad.addColorStop(1, '#a8161f');
    ctx.fillStyle = bannerGrad;
    ctx.fillRect(0, 0, W, heroH);
    ctx.fillStyle = 'rgba(255,255,255,0.13)';
    for(let dy = 6; dy < heroH; dy += 9){
      for(let dx = (dy % 18 === 6 ? 6 : 11); dx < W; dx += 11){
        ctx.beginPath();
        ctx.arc(dx, dy, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const sheen = ctx.createLinearGradient(0, 0, W * 0.5, heroH);
    sheen.addColorStop(0, 'rgba(255,255,255,0.16)');
    sheen.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, W, heroH);
    ctx.restore();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    rr(ctx, 1.5, 1.5, W - 3, heroH - 3, 6);
    ctx.stroke();

    ctx.font = '800 12px Rubik, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText('MARVEL CINEMATIC UNIVERSE', PAD, 26);

    ctx.lineJoin = 'round';
    ctx.font = '38px Bangers, cursive';
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.lineWidth = 5;
    ctx.strokeText('My MCU Progress', PAD, 62);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('My MCU Progress', PAD, 62);

    const viewLabel = (currentTab === 'all' ? 'All titles' : (currentTab === 'infinity' ? 'Infinity Saga' : 'Multiverse Saga'))
      + ' \u00b7 ' + (currentOrder === 'chrono' ? 'Chronological order' : 'Release date order');
    ctx.font = '600 11.5px Rubik, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText(viewLabel, PAD, 82);

    // ---- stat chips (styled like the website's .stat boxes) ----
    const chips = [
      [`${totalDone}`, 'WATCHED'],
      [`${totalCount - totalDone}`, 'TO GO'],
      [`${pct}%`, 'COMPLETE'],
      [formatHours(minutesDone), 'HRS LOGGED'],
      [formatHours(minutesTotal - minutesDone), 'HRS LEFT']
    ];
    const chipY = titleZoneH + chipsGapAbove;
    const chipW = (W - PAD * 2 - 8 * (chips.length - 1)) / chips.length;
    chips.forEach((c, i) => {
      const x = PAD + i * (chipW + 8);
      rr(ctx, x, chipY, chipW, chipsH, 4);
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '22px Bangers, cursive';
      ctx.fillStyle = '#e8b13a';
      ctx.fillText(c[0], x + 11, chipY + 30);
      ctx.font = '700 8.5px Rubik, sans-serif';
      ctx.fillStyle = '#f1e3c6';
      ctx.fillText(c[1], x + 11, chipY + 44);
    });

    // ---- progress bar (styled like the website's .bar-track / .bar-fill) ----
    const barY = chipY + chipsH + barGapAbove;
    rr(ctx, PAD, barY, W - PAD * 2, barH, barH / 2);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    const barFillW = Math.max(barH, (W - PAD * 2) * (pct / 100));
    const barGrad = ctx.createLinearGradient(PAD, 0, PAD + barFillW, 0);
    barGrad.addColorStop(0, '#e8b13a');
    barGrad.addColorStop(1, '#fff2c9');
    rr(ctx, PAD, barY, barFillW, barH, barH / 2);
    ctx.fillStyle = barGrad;
    ctx.fill();

    // ---- sections ----
    function drawSection(section, x, yStart){
      ctx.fillStyle = '#e8b13a';
      ctx.font = '16px Bangers, cursive';
      ctx.fillText(section.label, x, yStart + 17);
      ctx.font = '600 10.5px Rubik, sans-serif';
      ctx.fillStyle = '#8a8577';
      const countText = `${section.doneCount}/${section.total}  \u00b7  ${formatHours(section.sMinDone)}/${formatHours(section.sMinTotal)}`;
      const countW = ctx.measureText(countText).width;
      ctx.fillText(countText, x + blockW - countW, yStart + 17);
      const gridY = yStart + sectionHeaderH;

      section.cards.forEach((card, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = x + col * (cellW + cellGap);
        const cy = gridY + row * (cellH + cellGap);
        const accent = card.sagaKey === 'infinity' ? '#e0222f' : '#c9a13a';

        // card body: always paper background, like the website's .item rows
        rr(ctx, cx, cy, cellW, cellH, cellR);
        ctx.fillStyle = card.done ? '#ece2c9' : '#f3ede0';
        ctx.fill();
        ctx.strokeStyle = '#d9d0b8';
        ctx.lineWidth = 1;
        ctx.stroke();

        // saga accent as a small dot instead of a full bar (keeps it close to the site look)
        ctx.beginPath();
        ctx.arc(cx + cellW - 7, cy + 7, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.fill();

        // checkbox styled like the website's .box: ink border, red fill + white check when done
        const boxSize = 13;
        const boxX = cx + 9, boxY = cy + (cellH - boxSize) / 2;
        rr(ctx, boxX, boxY, boxSize, boxSize, 2.5);
        if(card.done){
          ctx.fillStyle = '#d21f2f';
          ctx.fill();
          ctx.strokeStyle = '#8f1420';
          ctx.lineWidth = 1.4;
          ctx.stroke();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.8;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(boxX + 2.8, boxY + 7);
          ctx.lineTo(boxX + 5.5, boxY + 10);
          ctx.lineTo(boxX + 10.3, boxY + 3.3);
          ctx.stroke();
        }else{
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.strokeStyle = '#1b1b1b';
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }

        const midY = cy + cellH / 2 + 3.5;
        ctx.font = '400 8.5px Rubik, sans-serif';
        const durText = formatHours(card.mins);
        const durW = ctx.measureText(durText).width;
        const durX = cx + cellW - 8 - durW;

        const textX = boxX + boxSize + 6;
        const textMaxW = durX - 6 - textX;
        const label = truncateText(ctx, card.item, textMaxW);
        ctx.font = '500 9.5px Rubik, sans-serif';
        ctx.fillStyle = card.done ? '#7a7568' : '#1b1b1b';
        ctx.fillText(label, textX, midY);
        if(card.done){
          const labelW = ctx.measureText(label).width;
          ctx.strokeStyle = '#7a7568';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(textX, midY - 3.5);
          ctx.lineTo(textX + labelW, midY - 3.5);
          ctx.stroke();
        }

        ctx.font = '400 8.5px Rubik, sans-serif';
        ctx.fillStyle = card.done ? '#9a9689' : '#7a7568';
        ctx.fillText(durText, durX, midY);
      });
    }

    let y = headerH;
    if(sideBySide){
      drawSection(laidOut[0], PAD, y);
      drawSection(laidOut[1], PAD + blockW + midGap, y);
      y += contentH;
    }else{
      laidOut.forEach(section => {
        drawSection(section, PAD, y);
        y += section.sectionH + sectionGap;
      });
    }

    // footer
    ctx.fillStyle = '#5a5a5a';
    ctx.font = '9.5px Rubik, sans-serif';
    const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    ctx.fillText(`Generated ${dateStr}`, PAD, totalH - 10);

    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mcu-progress-${new Date().toISOString().slice(0,10)}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }, 'image/png');
  }catch(e){
    await customAlert('Couldn\'t generate the image', 'Something went wrong creating the PNG. Please try again.');
  }finally{
    btn.disabled = false;
    btn.textContent = originalLabel;
  }
}

document.getElementById('exportBtn').addEventListener('click', generateProgressImage);

(async () => {
  updateSyncUI();
  await loadState();
  render();
})();
