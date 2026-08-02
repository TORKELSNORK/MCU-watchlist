// runtime in minutes: movies = theatrical runtime, series episodes = approximate per-episode length
// release: the title's rank in actual theatrical/premiere release order (1 = released first)
// type 'movie' entries: {type,title,mins,rel}
// type 'series' entries: {type,title,rel,seasons:[{n:seasonNumber, eps:[{title,mins}, ...]}]}
const DATA = {
  infinity: {
    label: "The Infinity Saga",
    items: [
      { type:"movie", title:"Captain America: The First Avenger (2011)", mins:124, rel:5 },
      { type:"movie", title:"Captain Marvel (2019)", mins:123, rel:21 },
      { type:"movie", title:"Iron Man (2008)", mins:126, rel:1 },
      { type:"movie", title:"Iron Man 2 (2010)", mins:124, rel:3 },
      { type:"movie", title:"The Incredible Hulk (2008)", mins:112, rel:2 },
      { type:"movie", title:"Thor (2011)", mins:115, rel:4 },
      { type:"movie", title:"Avengers (2012)", mins:143, rel:6 },
      { type:"movie", title:"Thor: The Dark World (2013)", mins:112, rel:8 },
      { type:"movie", title:"Iron Man 3 (2013)", mins:130, rel:7 },
      { type:"movie", title:"Captain America: The Winter Soldier (2014)", mins:136, rel:9 },
      { type:"movie", title:"Guardians of the Galaxy (2014)", mins:121, rel:10 },
      { type:"movie", title:"Guardians of the Galaxy Vol. 2 (2017)", mins:136, rel:15 },
      { type:"series", title:"I am Groot (2022-2023)", rel:37, seasons:[
        { n:1, eps:[
          { title:"Groot's First Steps", mins:4 },
          { title:"The Little Guy", mins:4 },
          { title:"Groot's Pursuit", mins:4 },
          { title:"Groot Takes a Bath", mins:4 },
          { title:"Magnum Opus", mins:4 }
        ]},
        { n:2, eps:[
          { title:"Are You My Groot?", mins:4 },
          { title:"Groot Noses Around", mins:4 },
          { title:"Groot's Snow Day", mins:4 },
          { title:"Groot's Sweet Treat", mins:4 },
          { title:"Groot and the Great Prophecy", mins:4 }
        ]}
      ]},
      { type:"movie", title:"Avengers: Age of Ultron (2015)", mins:141, rel:11 },
      { type:"movie", title:"Ant-Man (2015)", mins:117, rel:12 },
      { type:"movie", title:"Captain America: Civil War (2016)", mins:147, rel:13 },
      { type:"movie", title:"Black Widow (2021)", mins:134, rel:27 },
      { type:"movie", title:"Black Panther (2018)", mins:134, rel:18 },
      { type:"movie", title:"Spider-Man: Homecoming (2017)", mins:133, rel:16 },
      { type:"movie", title:"Doctor Strange (2016)", mins:115, rel:14 },
      { type:"movie", title:"Thor: Ragnarok (2017)", mins:130, rel:17 },
      { type:"movie", title:"Ant-Man and The Wasp (2018)", mins:118, rel:20 },
      { type:"movie", title:"Avengers: Infinity War (2018)", mins:149, rel:19 },
      { type:"movie", title:"Avengers: Endgame (2019)", mins:181, rel:22 }
    ]
  },
  multiverse: {
    label: "The Multiverse Saga",
    items: [
      { type:"series", title:"Loki (2021-2023)", rel:26, seasons:[
        { n:1, eps:[
          { title:"Glorious Purpose", mins:50 },
          { title:"The Variant", mins:50 },
          { title:"Lamentis", mins:50 },
          { title:"The Nexus Event", mins:50 },
          { title:"Journey Into Mystery", mins:50 },
          { title:"For All Time. Always.", mins:50 }
        ]},
        { n:2, eps:[
          { title:"Ouroboros", mins:50 },
          { title:"Breaking Brad", mins:50 },
          { title:"1893", mins:50 },
          { title:"Heart of the TVA", mins:50 },
          { title:"Science/Fiction", mins:50 },
          { title:"Glorious Purpose", mins:50 }
        ]}
      ]},
      { type:"movie", title:"Spider-Man: Far From Home (2019)", mins:129, rel:23 },
      { type:"movie", title:"Spider-Man: No Way Home (2021)", mins:148, rel:32 },
      { type:"series", title:"What if...? (2021-2024)", rel:28, seasons:[
        { n:1, eps:[
          { title:"What If... Captain Carter Were the First Avenger?", mins:35 },
          { title:"What If... T'Challa Became a Star-Lord?", mins:35 },
          { title:"What If... The World Lost Its Mightiest Heroes?", mins:35 },
          { title:"What If... Doctor Strange Lost His Heart Instead of His Hands?", mins:35 },
          { title:"What If... Zombies!?", mins:35 },
          { title:"What If... Killmonger Rescued Tony Stark?", mins:35 },
          { title:"What If... Thor Were an Only Child?", mins:35 },
          { title:"What If... Ultron Won?", mins:35 },
          { title:"What If... The Watcher Broke His Oath?", mins:35 }
        ]},
        { n:2, eps:[
          { title:"What If... Nebula Joined the Nova Corps?", mins:35 },
          { title:"What If... Peter Quill Attacked Earth's Mightiest Heroes?", mins:35 },
          { title:"What If... Happy Hogan Saved Christmas?", mins:35 },
          { title:"What If... Iron Man Crashed Into the Grandmaster?", mins:35 },
          { title:"What If... Captain Carter Fought the Hydra Stomper?", mins:35 },
          { title:"What If... Kahhori Reshaped the World?", mins:35 },
          { title:"What If... Hela Found the Ten Rings?", mins:35 },
          { title:"What If... The Avengers Assembled in 1602?", mins:35 },
          { title:"What If... Strange Supreme Intervened?", mins:35 }
        ]},
        { n:3, eps:[
          { title:"What If... The Hulk Fought the Mech Avengers?", mins:35 },
          { title:"What If... Agatha Went to Hollywood?", mins:35 },
          { title:"What If... The Red Guardian Stopped the Winter Soldier?", mins:35 },
          { title:"What If... Howard the Duck Got Hitched?", mins:35 },
          { title:"What If... The Emergence Destroyed the Earth?", mins:35 },
          { title:"What If... 1872?", mins:35 },
          { title:"What If... The Watcher Disappeared?", mins:35 },
          { title:"What If... What If...?", mins:35 }
        ]}
      ]},
      { type:"series", title:"WandaVision (2021)", rel:24, seasons:[
        { n:1, eps:[
          { title:"Filmed Before a Live Studio Audience", mins:35 },
          { title:"Don't Touch That Dial", mins:35 },
          { title:"Now in Color", mins:35 },
          { title:"We Interrupt This Program", mins:35 },
          { title:"On a Very Special Episode...", mins:35 },
          { title:"All-New Halloween Spooktacular!", mins:35 },
          { title:"Breaking the Fourth Wall", mins:38 },
          { title:"Previously On", mins:35 },
          { title:"The Series Finale", mins:47 }
        ]}
      ]},
      { type:"movie", title:"Shang-Chi and the Legend of the Ten Rings (2021)", mins:132, rel:29 },
      { type:"series", title:"The Falcon and the Winter Soldier (2021)", rel:25, seasons:[
        { n:1, eps:[
          { title:"New World Order", mins:49 },
          { title:"The Star-Spangled Man", mins:47 },
          { title:"Power Broker", mins:53 },
          { title:"The Whole World Is Watching", mins:51 },
          { title:"Truth", mins:60 },
          { title:"One World, One People", mins:50 }
        ]}
      ]},
      { type:"movie", title:"Eternals (2021)", mins:156, rel:30 },
      { type:"movie", title:"Doctor Strange in the Multiverse of Madness (2022)", mins:126, rel:34 },
      { type:"series", title:"Hawkeye (2021)", rel:31, seasons:[
        { n:1, eps:[
          { title:"Never Meet Your Heroes", mins:47 },
          { title:"Hide and Seek", mins:49 },
          { title:"Echoes", mins:44 },
          { title:"Partners, Am I Right?", mins:41 },
          { title:"Ronin", mins:45 },
          { title:"So This Is Christmas?", mins:56 }
        ]}
      ]},
      { type:"series", title:"Moon Knight (2022)", rel:33, seasons:[
        { n:1, eps:[
          { title:"The Goldfish Problem", mins:45 },
          { title:"Summon the Suit", mins:50 },
          { title:"The Friendly Type", mins:50 },
          { title:"The Tomb", mins:51 },
          { title:"Asylum", mins:47 },
          { title:"Gods and Monsters", mins:42 }
        ]}
      ]},
      { type:"movie", title:"Black Panther: Wakanda Forever (2022)", mins:161, rel:40 },
      { type:"series", title:"She-Hulk (2022)", rel:38, seasons:[
        { n:1, eps:[
          { title:"A Normal Amount of Rage", mins:34 },
          { title:"Superhuman Law", mins:30 },
          { title:"The People vs. Emil Blonsky", mins:32 },
          { title:"Is This Not Real Magic?", mins:30 },
          { title:"Mean, Green, and Straight Poured Into These Jeans", mins:31 },
          { title:"Just Jen", mins:31 },
          { title:"The Retreat", mins:35 },
          { title:"Ribbit and Rip It", mins:33 },
          { title:"Whose Show Is This?", mins:32 }
        ]}
      ]},
      { type:"series", title:"Ms. Marvel (2022)", rel:35, seasons:[
        { n:1, eps:[
          { title:"Generation Why", mins:49 },
          { title:"Crushed", mins:40 },
          { title:"Destined", mins:40 },
          { title:"Seeing Red", mins:40 },
          { title:"Time and Again", mins:40 },
          { title:"No Normal", mins:40 }
        ]}
      ]},
      { type:"movie", title:"Thor: Love and Thunder (2022)", mins:119, rel:36 },
      { type:"series", title:"Ironheart (2025)", rel:50, seasons:[
        { n:1, eps:[
          { title:"Take Me Home", mins:41 },
          { title:"Will the Real Natalie Please Stand Up?", mins:40 },
          { title:"We in Danger, Girl", mins:40 },
          { title:"Bad Magic", mins:40 },
          { title:"Karma's a Glitch", mins:40 },
          { title:"The Past Is the Past", mins:39 }
        ]}
      ]},
      { type:"movie", title:"Werewolf by Night (2022)", mins:55, rel:39 },
      { type:"movie", title:"Guardians of the Galaxy: Holiday Special (2022)", mins:44, rel:41 },
      { type:"movie", title:"Ant-Man and The Wasp: Quantumania (2023)", mins:125, rel:42 },
      { type:"movie", title:"Guardians of the Galaxy Vol. 3 (2023)", mins:150, rel:43 },
      { type:"series", title:"Secret Invasion (2023)", rel:44, seasons:[
        { n:1, eps:[
          { title:"Resurrection", mins:43 },
          { title:"Promises", mins:43 },
          { title:"Betrayed", mins:43 },
          { title:"Beloved", mins:43 },
          { title:"Harvest", mins:43 },
          { title:"Home", mins:43 }
        ]}
      ]},
      { type:"movie", title:"The Marvels (2023)", mins:105, rel:45 },
      { type:"movie", title:"Deadpool & Wolverine (2024)", mins:128, rel:46 },
      { type:"series", title:"Agatha All Along (2024)", rel:47, seasons:[
        { n:1, eps:[
          { title:"Seekest Thou the Road", mins:34 },
          { title:"Circle Sewn with Fate / Unlock Thy Hidden Gate", mins:35 },
          { title:"Through Many Miles / Of Tricks and Trials", mins:31 },
          { title:"If I Can't Reach You / Let My Song Teach You", mins:35 },
          { title:"Darkest Hour / Wake Thy Power", mins:41 },
          { title:"Familiar by Thy Side", mins:41 },
          { title:"Death's Hand in Mine", mins:41 },
          { title:"Follow Me My Friend / To Glory at the End", mins:41 },
          { title:"Maiden Mother Crone", mins:42 }
        ]}
      ]},
      { type:"movie", title:"Captain America: Brave New World (2025)", mins:118, rel:48 },
      { type:"movie", title:"Thunderbolts* (2025)", mins:127, rel:49 }
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

function episodeId(sagaKey, seriesTitle, seasonNum, epTitle){
  return sagaKey + ':' + slugify(seriesTitle) + ':s' + seasonNum + ':' + slugify(epTitle);
}

// Normalizes a movie or series entry into a common shape for display/stats.
// For series, "done" means every episode across every season is watched;
// doneMins gives partial credit for whichever episodes are actually checked off.
function entryInfo(sagaKey, entry){
  if(entry.type === 'movie'){
    const id = sagaKey + ':' + slugify(entry.title);
    const done = !!state[id];
    return { id, title: entry.title, mins: entry.mins, rel: entry.rel, done, doneMins: done ? entry.mins : 0, isSeries:false };
  }
  let totalMins = 0, doneMins = 0, totalEp = 0, doneEp = 0;
  entry.seasons.forEach(season => {
    season.eps.forEach(ep => {
      totalMins += ep.mins; totalEp++;
      if(state[episodeId(sagaKey, entry.title, season.n, ep.title)]){ doneMins += ep.mins; doneEp++; }
    });
  });
  return {
    id: sagaKey + ':' + slugify(entry.title),
    title: entry.title, mins: totalMins, rel: entry.rel,
    done: totalEp > 0 && doneEp === totalEp, doneMins, isSeries:true, totalEp, doneEp
  };
}

const expandedSeries = new Set();
const expandedSeasons = new Set();

// Sets every episode of a series (optionally scoped to one season) to a given watched state.
function setSeriesEpisodes(sagaKey, entry, setTo, onlySeasonNum){
  entry.seasons.forEach(season => {
    if(onlySeasonNum !== undefined && season.n !== onlySeasonNum) return;
    season.eps.forEach(ep => {
      state[episodeId(sagaKey, entry.title, season.n, ep.title)] = setTo;
    });
  });
}

function checkSvgSmall(){
  return '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9 18 20 6"></polyline></svg>';
}

function render(){
  const container = document.getElementById('lists');
  container.innerHTML = '';

  const sagasToShow = currentTab === 'all' ? ['infinity','multiverse'] : [currentTab];

  let totalDone = 0, totalCount = 0;
  let minutesDone = 0, minutesTotal = 0;

  // Renders a single movie or series row (plus, if a series is expanded, its nested seasons/episodes).
  function rowHtml(sagaKey, entry, showBadge){
    const info = entryInfo(sagaKey, entry);
    if(info.done) totalDone++;
    totalCount++;
    minutesTotal += info.mins;
    minutesDone += info.doneMins;

    const match = info.title.match(/^(.*)\s(\(.+\))$/);
    const titleText = match ? match[1] : info.title;
    const year = match ? match[2] : '';
    const badge = showBadge
      ? `<div class="saga-badge ${sagaKey}">${sagaKey === 'infinity' ? 'Infinity' : 'Multiverse'}</div>`
      : '';

    if(!info.isSeries){
      return `<li class="item ${info.done ? 'done':''}" data-toggle-id="${info.id}">
          <div class="box">${checkSvg()}</div>
          <div class="title">${titleText} <span class="year">${year}</span></div>
          ${badge}
          <div class="dur">${formatHours(info.mins)}</div>
        </li>`;
    }

    // series row
    const seriesExpanded = expandedSeries.has(info.id);
    const progressText = `${info.doneEp}/${info.totalEp} eps`;
    let seasonsHtml = '';
    if(seriesExpanded){
      seasonsHtml = entry.seasons.map(season => {
        const seasonKey = info.id + ':s' + season.n;
        const seasonDone = season.eps.filter(ep => state[episodeId(sagaKey, entry.title, season.n, ep.title)]).length;
        const seasonAllDone = seasonDone === season.eps.length;
        const seasonExpanded = expandedSeasons.has(seasonKey);
        let episodesHtml = '';
        if(seasonExpanded){
          episodesHtml = season.eps.map(ep => {
            const epId = episodeId(sagaKey, entry.title, season.n, ep.title);
            const epDone = !!state[epId];
            return `<li class="episode-row ${epDone ? 'done':''}" data-toggle-id="${epId}">
                <div class="box box-sm">${checkSvgSmall()}</div>
                <div class="title ep-title">${ep.title}</div>
                <div class="dur">${formatHours(ep.mins)}</div>
              </li>`;
          }).join('');
        }
        return `<li class="season-row ${seasonAllDone ? 'done':''}" data-toggle-season="${sagaKey}|${slugify(entry.title)}|${season.n}">
              <div class="box box-sm">${checkSvgSmall()}</div>
              <div class="title">Season ${season.n}</div>
              <button class="caret-btn-inline" data-expand-season="${seasonKey}" aria-label="Toggle episodes">${seasonExpanded ? '&#9662;' : '&#9656;'}</button>
              <div class="count-mini">${seasonDone}/${season.eps.length}</div>
            </li>
          ${seasonExpanded ? `<ul class="episode-list">${episodesHtml}</ul>` : ''}`;
      }).join('');
    }

    return `<li class="item series-row ${info.done ? 'done':''}" data-toggle-series="${sagaKey}|${slugify(entry.title)}">
        <div class="box">${checkSvg()}</div>
        <div class="title">${titleText} <span class="year">${year}</span></div>
        ${badge}
        <div class="progress-pill">${progressText}</div>
        <button class="caret-btn-inline" data-expand-series="${info.id}" aria-label="Toggle seasons">${seriesExpanded ? '&#9662;' : '&#9656;'}</button>
        <div class="dur">${formatHours(info.mins)}</div>
      </li>
      ${seriesExpanded ? `<ul class="season-list">${seasonsHtml}</ul>` : ''}`;
  }

  if(currentOrder === 'chrono'){
    sagasToShow.forEach(sagaKey => {
      const saga = DATA[sagaKey];
      const sagaEl = document.createElement('div');
      sagaEl.className = 'saga';

      let doneCount = 0, sagaMinDone = 0, sagaMinTotal = 0;
      const listHtml = saga.items.map(entry => {
        const beforeDone = totalDone, beforeMin = minutesDone, beforeTotal = minutesTotal;
        const html = rowHtml(sagaKey, entry, false);
        if(totalDone > beforeDone) doneCount++;
        sagaMinTotal += (minutesTotal - beforeTotal);
        sagaMinDone += (minutesDone - beforeMin);
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
      DATA[sagaKey].items.forEach(entry => {
        flat.push({ sagaKey, entry, rel: entry.rel });
      });
    });
    flat.sort((a, b) => a.rel - b.rel);

    const showBadge = sagasToShow.length > 1;
    const listHtml = flat.map(r => rowHtml(r.sagaKey, r.entry, showBadge)).join('');

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

  // movie rows and episode rows: click toggles watched state directly
  container.querySelectorAll('[data-toggle-id]').forEach(li => {
    li.addEventListener('click', () => {
      const id = li.dataset.toggleId;
      state[id] = !state[id];
      render();
      saveState();
    });
  });

  // series row main area: click toggles every episode in the whole series
  container.querySelectorAll('[data-toggle-series]').forEach(el => {
    el.addEventListener('click', () => {
      const [sagaKey, slug] = el.dataset.toggleSeries.split('|');
      const entry = DATA[sagaKey].items.find(it => it.type === 'series' && slugify(it.title) === slug);
      if(!entry) return;
      const info = entryInfo(sagaKey, entry);
      setSeriesEpisodes(sagaKey, entry, !info.done);
      render();
      saveState();
    });
  });

  // season row main area: click toggles every episode in that season
  container.querySelectorAll('[data-toggle-season]').forEach(el => {
    el.addEventListener('click', () => {
      const [sagaKey, slug, seasonNumStr] = el.dataset.toggleSeason.split('|');
      const seasonNum = parseInt(seasonNumStr, 10);
      const entry = DATA[sagaKey].items.find(it => it.type === 'series' && slugify(it.title) === slug);
      if(!entry) return;
      const season = entry.seasons.find(s => s.n === seasonNum);
      const allDone = season.eps.every(ep => state[episodeId(sagaKey, entry.title, seasonNum, ep.title)]);
      setSeriesEpisodes(sagaKey, entry, !allDone, seasonNum);
      render();
      saveState();
    });
  });

  // caret buttons: expand/collapse only, never toggle watched state
  container.querySelectorAll('[data-expand-series]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const key = btn.dataset.expandSeries;
      if(expandedSeries.has(key)) expandedSeries.delete(key); else expandedSeries.add(key);
      render();
    });
  });
  container.querySelectorAll('[data-expand-season]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const key = btn.dataset.expandSeason;
      if(expandedSeasons.has(key)) expandedSeasons.delete(key); else expandedSeasons.add(key);
      render();
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
      entries: DATA[k].items.map(entry => ({ entry, sagaKey: k }))
    }));
  }
  const flat = [];
  sagasToShow.forEach(k => DATA[k].items.forEach(entry => flat.push({ entry, rel: entry.rel, sagaKey: k })));
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
      const cards = section.entries.map(({ entry, sagaKey }) => {
        const info = entryInfo(sagaKey, entry);
        totalCount++; minutesTotal += info.mins; minutesDone += info.doneMins;
        if(info.done){ totalDone++; doneCount++; }
        sMinDone += info.doneMins;
        sMinTotal += info.mins;
        return { item: info.title, mins: info.mins, done: info.done, sagaKey };
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
