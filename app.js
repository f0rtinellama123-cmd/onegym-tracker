const CATALOG = {"equipment": [["Panatta decline chest press", "Chest", "Panatta", "Machine press", "Known at Ryhope", "Independent arms; user-reported machine."], ["Panatta chest press", "Chest", "Panatta", "Machine press", "Known at Ryhope", "User-reported."], ["Panatta shoulder press", "Shoulders", "Panatta", "Machine press", "Known at Ryhope", "User-reported."], ["Panatta seated super incline press", "Chest", "Panatta", "Machine press", "Known at Ryhope", "User-reported; upper-chest emphasis."], ["Panatta multi-station cable", "Back", "Cable station", "Cable", "Known at Ryhope", "User-reported station with pulldown, row and pull-up attachments."], ["Hoist ROC-IT lat pulldown", "Back", "Hoist ROC-IT", "Machine / cable", "Known at Ryhope", "User-reported; moving seat/body carriage and close-grip attachment."], ["Hoist ROC-IT chest press", "Chest", "Hoist ROC-IT", "Machine press", "Known at Ryhope", "User-reported."], ["Atlantis Smith machine", "Full body", "Atlantis", "Smith machine", "Known at Ryhope", "User-reported."], ["Cable crossover / adjustable pulleys", "Full body", "Cable station", "Cable", "Category / confirm on floor", "General cable-station category; exact configuration not verified."], ["Lat pulldown station", "Back", "Cable station", "Cable", "Category / confirm on floor", "General equipment category."], ["Seated cable row", "Back", "Cable station", "Cable", "Category / confirm on floor", "General equipment category."], ["Dumbbells", "Full body", "Free weights", "Free weights", "Category / confirm on floor", "Gym-directory listing."], ["Barbells & plates", "Full body", "Free weights", "Free weights", "Category / confirm on floor", "Gym-directory listing."], ["Squat rack / lifting platform", "Legs", "Free weights", "Rack / platform", "Category / confirm on floor", "Gym-directory listing; exact count not confirmed."], ["Adjustable benches", "Full body", "Free weights", "Bench", "Category / confirm on floor", "General gym category."], ["Treadmill", "Cardio", "Cardio", "Cardio", "Category / confirm on floor", "Gym-directory listing."], ["Stationary bike", "Cardio", "Cardio", "Cardio", "Category / confirm on floor", "Gym-directory listing."], ["Rowing machine", "Cardio", "Cardio", "Cardio", "Category / confirm on floor", "Gym-directory listing."], ["Elliptical / cross trainer", "Cardio", "Cardio", "Cardio", "Category / confirm on floor", "Gym-directory listing."], ["Stepper", "Cardio", "Cardio", "Cardio", "Category / confirm on floor", "Gym-directory listing."], ["Battle ropes", "Conditioning", "Functional training", "Conditioning", "Category / confirm on floor", "Gym-directory listing."], ["Punching bags", "Conditioning", "Functional training", "Conditioning", "Category / confirm on floor", "Member reviews mention boxing bags."], ["Kettlebells", "Full body", "Functional training", "Free weights", "Category / confirm on floor", "OneGym brand markets functional training kit; branch-level presence not verified."], ["Sled / turf / plyo boxes", "Conditioning", "Functional training", "Conditioning", "Category / confirm on floor", "OneGym brand-level equipment categories; branch-level presence not verified."]], "exercises": [["Decline machine press", "Chest", "Triceps; Front delts", "Panatta decline chest press", "Push"], ["Machine chest press", "Chest", "Triceps; Front delts", "Panatta chest press / Hoist ROC-IT chest press", "Push"], ["Seated super incline press", "Upper chest", "Triceps; Front delts", "Panatta seated super incline press", "Push"], ["Shoulder press", "Shoulders", "Triceps", "Panatta shoulder press", "Push"], ["Cable chest fly", "Chest", "Front delts", "Cable station", "Push"], ["Cable lateral raise", "Side delts", "Upper traps", "Cable station", "Shoulders"], ["Triceps cable pushdown", "Triceps", "—", "Cable station", "Arms"], ["Overhead cable extension", "Triceps", "—", "Cable station", "Arms"], ["Lat pulldown", "Lats", "Biceps; Upper back", "Hoist ROC-IT lat pulldown / cable station", "Pull"], ["Close-grip lat pulldown", "Lats", "Biceps", "Hoist ROC-IT lat pulldown", "Pull"], ["Seated cable row", "Upper back", "Lats; Biceps", "Cable station", "Pull"], ["Cable pullover", "Lats", "Long-head triceps", "Cable station", "Pull"], ["Pull-up", "Lats", "Biceps; Upper back", "Pull-up attachment / bodyweight", "Pull"], ["Dumbbell curl", "Biceps", "Forearms", "Dumbbells", "Arms"], ["Cable curl", "Biceps", "Forearms", "Cable station", "Arms"], ["Smith squat", "Quads", "Glutes; Adductors", "Atlantis Smith machine", "Legs"], ["Barbell squat", "Quads", "Glutes; Adductors", "Rack / barbell", "Legs"], ["Romanian deadlift", "Hamstrings", "Glutes; Spinal erectors", "Barbell / dumbbells", "Legs"], ["Deadlift", "Posterior chain", "Glutes; Hamstrings; Back", "Barbell / platform", "Legs"], ["Leg press", "Quads", "Glutes; Hamstrings", "Leg press (confirm machine)", "Legs"], ["Leg extension", "Quads", "—", "Leg extension (confirm machine)", "Legs"], ["Seated leg curl", "Hamstrings", "Calves", "Leg curl (confirm machine)", "Legs"], ["Standing calf raise", "Calves", "—", "Machine / Smith / dumbbells", "Legs"], ["Hip thrust", "Glutes", "Hamstrings", "Barbell / Smith machine", "Legs"], ["Plank", "Abs", "Obliques", "Bodyweight", "Core"], ["Cable crunch", "Abs", "Obliques", "Cable station", "Core"]]};
const MUSCLES = ["Chest","Back","Shoulders","Biceps","Triceps","Quads","Hamstrings","Glutes","Calves","Abs"];
const DEFAULT_HOURS = {Chest:72,Back:72,Shoulders:60,Biceps:48,Triceps:48,Quads:72,Hamstrings:72,Glutes:72,Calves:48,Abs:36};
const STORE_KEY = "onegym-tracker-v1";
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
let state = loadState();
let draft = [];
let toastTimer;

function loadState(){
  try{
    const parsed=JSON.parse(localStorage.getItem(STORE_KEY)||"{}");
    return {sessions:Array.isArray(parsed.sessions)?parsed.sessions:[],customExercises:Array.isArray(parsed.customExercises)?parsed.customExercises:[],recoveryHours:{...DEFAULT_HOURS,...(parsed.recoveryHours||{})}};
  }catch(error){console.warn("Could not read saved tracker data",error);return {sessions:[],customExercises:[],recoveryHours:{...DEFAULT_HOURS}};}
}
function persist(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state));}catch(e){notify("Could not save: device storage may be full.");console.error(e);}}
function notify(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2400);}
function safeText(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function dateToday(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function allExercises(){return [...CATALOG.exercises.map(x=>({name:x[0],primary:x[1],secondary:x[2],equipment:x[3],category:x[4],status:CATALOG.equipment.some(e=>e[0]===x[3]&&e[4]==="Known at Ryhope")?"Known at Ryhope":"Category / confirm on floor"})),...state.customExercises];}
function getExercise(name){return allExercises().find(x=>x.name===name);}
function showView(view){
  $$(".view").forEach(el=>el.classList.toggle("active",el.id===`view-${view}`));
  $$(".nav-btn").forEach(el=>el.classList.toggle("active",el.dataset.view===view));
  const names={dashboard:"Dashboard",workout:"Log workout",recovery:"Muscle recovery",exercises:"Exercise library",history:"Workout history",settings:"Data & settings"};
  $("#page-title").textContent=names[view]||"Dashboard";
  if(view==="dashboard")renderDashboard();if(view==="recovery")renderRecovery();if(view==="exercises")renderLibrary();if(view==="history")renderHistory();if(view==="settings")renderSettings();
  window.scrollTo({top:0,behavior:"smooth"});
}
function totalSets(){return state.sessions.reduce((n,s)=>n+s.exercises.reduce((a,e)=>a+e.sets.length,0),0);}
function volume(){return state.sessions.reduce((n,s)=>n+s.exercises.reduce((a,e)=>a+e.sets.reduce((b,set)=>b+(Number(set.weight)||0)*(Number(set.reps)||0),0),0),0);}
function records(){const out={};state.sessions.forEach(s=>s.exercises.forEach(e=>e.sets.forEach(set=>{const w=Number(set.weight)||0;if(!out[e.name]||w>out[e.name])out[e.name]=w;})));return out;}
function recoveryFor(muscle){
  const now=Date.now();let load=0,last=0;
  state.sessions.forEach(session=>session.exercises.forEach(ex=>{
    const info=getExercise(ex.name);if(!info)return;
    const alias={"Upper chest":"Chest","Front delts":"Shoulders","Side delts":"Shoulders","Upper back":"Back","Lats":"Back","Posterior chain":"Hamstrings","Forearms":"Biceps","Long-head triceps":"Triceps","Adductors":"Quads","Spinal erectors":"Back","Obliques":"Abs"};
    const targets=[info.primary,...String(info.secondary||"").split(";").map(x=>x.trim())].map(x=>alias[x]||x);
    if(!targets.includes(muscle))return;
    const sets=ex.sets.filter(s=>Number(s.reps)>0).length;
    const hard=ex.sets.filter(s=>Number(s.reps)>0 && (s.rir===""||Number(s.rir)<=4)).length;
    const effective=hard+(sets-hard)*0.35;
    if(effective<=0)return;
    const stamp=new Date(session.date+"T12:00:00").getTime();
    const age=Math.max(0,(now-stamp)/3600000);
    const hours=Number(state.recoveryHours[muscle])||DEFAULT_HOURS[muscle]||60;
    const impact=Math.max(0,1-age/hours);
    load+=effective*impact;
    if(stamp>last)last=stamp;
  }));
  // A simple planning estimate: recent hard-set exposure decays over a configurable time window.
  const percent=Math.max(0,Math.min(100,Math.round(100-load/8*100)));
  const status=percent>=85?"Ready estimate":percent>=50?"Recovering":"Recently trained";
  return {percent,status,last};
}
function renderRecoveryBars(target="#dashboard-recovery",limit=5){
  const items=MUSCLES.map(m=>({muscle:m,...recoveryFor(m)})).sort((a,b)=>a.percent-b.percent);
  $(target).innerHTML=items.slice(0,limit).map(x=>`<div class="recovery-row"><b>${safeText(x.muscle)}</b><div class="bar"><span style="width:${x.percent}%;background:${x.percent>=85?"var(--green)":x.percent>=50?"var(--amber)":"var(--red)"}"></span></div><span class="percent">${x.percent}%</span></div>`).join("")||'<p class="muted">Log a workout to see recovery estimates.</p>';
}
function renderDashboard(){
  $("#stat-workouts").textContent=state.sessions.length;
  $("#stat-exercises").textContent=state.sessions.reduce((n,s)=>n+s.exercises.length,0);
  $("#stat-volume").innerHTML=`${Math.round(volume()).toLocaleString("en-GB")} <i>kg</i>`;
  $("#stat-prs").textContent=Object.keys(records()).length;
  renderRecoveryBars();
  const recent=[...state.sessions].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4);
  $("#recent-sessions").innerHTML=recent.length?recent.map(s=>`<div class="recent-item"><div><b>${safeText(s.name)}</b><small>${safeText(s.date)} · ${s.exercises.length} exercises</small></div><strong>${s.exercises.reduce((n,e)=>n+e.sets.length,0)} sets</strong></div>`).join(""):'<p class="muted">No sessions yet. Your first workout will appear here.</p>';
  $("#equipment-strip").innerHTML=CATALOG.equipment.filter(e=>e[4]==="Known at Ryhope").map(e=>`<span class="equipment-chip">${safeText(e[0])}</span>`).join("");
}
function exerciseOptions(selected=""){
  return allExercises().sort((a,b)=>a.name.localeCompare(b.name)).map(e=>`<option value="${safeText(e.name)}" ${e.name===selected?"selected":""}>${safeText(e.name)}</option>`).join("");
}
function addDraftExercise(name=""){
  draft.push({name:name||allExercises()[0]?.name||"",sets:[{weight:"",reps:"",rir:""}]});renderDraft();
}
function renderDraft(){
  $("#workout-exercises").innerHTML=draft.map((ex,i)=>`<div class="exercise-entry" data-index="${i}"><div class="entry-top"><div><strong>Exercise ${i+1}</strong><small>${safeText(getExercise(ex.name)?.equipment||"Select equipment")}</small></div><button class="icon-btn remove-exercise" aria-label="Remove exercise" data-index="${i}">×</button></div><label>Exercise<select class="draft-name" data-index="${i}">${exerciseOptions(ex.name)}</select></label><div style="height:12px"></div><div class="set-head"><span>SET</span><span>WEIGHT (KG)</span><span>REPS</span><span>RIR</span><span></span></div>${ex.sets.map((s,j)=>`<div class="set-row"><span class="set-index">${j+1}</span><input type="number" min="0" step="0.5" placeholder="0" value="${safeText(s.weight)}" data-index="${i}" data-set="${j}" data-field="weight" aria-label="Weight kg"><input type="number" min="0" step="1" placeholder="0" value="${safeText(s.reps)}" data-index="${i}" data-set="${j}" data-field="reps" aria-label="Reps"><input type="number" min="0" max="10" step="1" placeholder="—" value="${safeText(s.rir)}" data-index="${i}" data-set="${j}" data-field="rir" aria-label="Reps in reserve"><button class="mini-btn remove-set" data-index="${i}" data-set="${j}" aria-label="Remove set">×</button></div>`).join("")}<button class="add-set" data-index="${i}">＋ Add set</button></div>`).join("");
  const sets=draft.reduce((n,e)=>n+e.sets.length,0);$("#workout-summary").textContent=`${draft.length} exercises · ${sets} sets`;
}
function saveWorkout(){
  const name=$("#session-name").value.trim()||"Training session",date=$("#session-date").value||dateToday();
  const exercises=draft.map(e=>({name:e.name,sets:e.sets.filter(s=>Number(s.reps)>0).map(s=>({weight:Number(s.weight)||0,reps:Number(s.reps),rir:s.rir===""?"":Number(s.rir)}))})).filter(e=>e.sets.length);
  if(!exercises.length){notify("Add at least one set with reps before saving.");return;}
  state.sessions.push({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name,date,notes:$("#session-notes").value.trim(),exercises,createdAt:new Date().toISOString()});
  persist();draft=[];$("#session-name").value="";$("#session-notes").value="";$("#session-date").value=dateToday();renderDraft();notify("Workout saved.");showView("dashboard");
}
function renderLibrary(){
  const muscles=[...new Set(allExercises().map(e=>e.primary))].sort();const equipment=[...new Set(allExercises().map(e=>e.equipment))].sort();
  const m=$("#muscle-filter"),eq=$("#equipment-filter"),oldM=m.value,oldE=eq.value;
  m.innerHTML='<option value="">All muscle groups</option>'+muscles.map(x=>`<option>${safeText(x)}</option>`).join("");eq.innerHTML='<option value="">All equipment</option>'+equipment.map(x=>`<option>${safeText(x)}</option>`).join("");m.value=oldM;eq.value=oldE;
  const q=$("#exercise-search").value.toLowerCase();
  const filtered=allExercises().filter(e=>(!q||[e.name,e.primary,e.secondary,e.equipment].join(" ").toLowerCase().includes(q))&&(!m.value||e.primary===m.value)&&(!eq.value||e.equipment===eq.value));
  $("#exercise-library").innerHTML=filtered.map(e=>`<article class="exercise-card"><h4>${safeText(e.name)}</h4><p>${safeText(e.equipment)} · ${safeText(e.primary)}${e.secondary&&e.secondary!=="—"?" · "+safeText(e.secondary):""}</p><div class="tag-row"><span class="tag">${safeText(e.primary)}</span><span class="tag ${e.status==="Known at Ryhope"?"known":""}">${safeText(e.status)}</span></div></article>`).join("")||'<p class="muted">No exercises match those filters.</p>';
}
function renderHistory(){
  const sessions=[...state.sessions].sort((a,b)=>b.date.localeCompare(a.date));
  $("#history-list").innerHTML=sessions.length?sessions.map(s=>`<article class="history-card"><div class="history-head"><div><b>${safeText(s.name)}</b><br><small>${safeText(s.date)}</small></div><button class="danger-btn delete-session" data-id="${safeText(s.id)}">Delete</button></div><div class="history-details">${s.exercises.map(e=>`${safeText(e.name)}: ${e.sets.map(x=>`${x.weight}kg × ${x.reps}${x.rir!==""?" @ "+x.rir+" RIR":""}`).join(", ")}`).join("<br>")}${s.notes?"<br>Notes: "+safeText(s.notes):""}</div></article>`).join(""):'<p class="muted">No workouts recorded yet.</p>';
}
function renderRecovery(){
  const el=$("#recovery-full");if(!el)return;
  el.innerHTML=MUSCLES.map(m=>{const r=recoveryFor(m);const color=r.percent>=85?"var(--green)":r.percent>=50?"var(--amber)":"var(--red)";return `<article class="recovery-card"><div class="recovery-card-head"><h4>${m}</h4><strong style="color:${color}">${r.percent}%</strong></div><div class="bar" style="margin:13px 0"><span style="width:${r.percent}%;background:${color}"></span></div><p>${r.status}. ${r.last?`Latest logged exposure: ${new Date(r.last).toLocaleDateString("en-GB")}.`:"No logged training exposure."} Planning estimate only.</p></article>`;}).join("");
}
function renderSettings(){
  $("#recovery-settings").innerHTML=MUSCLES.map(m=>`<label>${m} recovery window (hours)<input type="number" min="12" max="168" step="6" data-muscle="${m}" value="${Number(state.recoveryHours[m])}"></label>`).join("");
}
function exportData(){
  const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),...state},null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`onegym-tracker-backup-${dateToday()}.json`;a.click();URL.revokeObjectURL(url);notify("Backup exported.");
}
function importData(file){
  const reader=new FileReader();reader.onload=()=>{try{const d=JSON.parse(reader.result);if(!Array.isArray(d.sessions)||!Array.isArray(d.customExercises))throw new Error("Invalid backup structure");state={sessions:d.sessions,customExercises:d.customExercises,recoveryHours:{...DEFAULT_HOURS,...(d.recoveryHours||{})}};persist();notify("Backup imported.");showView("dashboard");}catch(e){notify("Import failed: invalid backup file.");}};reader.onerror=()=>notify("Could not read that file.");reader.readAsText(file);
}
function addCustomExercise(){
  const name=$("#custom-name").value.trim();if(!name)return;
  if(allExercises().some(e=>e.name.toLowerCase()===name.toLowerCase())){notify("That exercise already exists.");return;}
  state.customExercises.push({name,primary:$("#custom-muscle").value,secondary:"—",equipment:$("#custom-equipment").value.trim()||"Custom equipment",category:"Custom",status:$("#custom-status").value});
  persist();$("#exercise-modal").close();$("#custom-exercise-form").reset();renderLibrary();notify("Custom exercise added.");
}
function init(){
  $("#session-date").value=dateToday();$("#custom-muscle").innerHTML=MUSCLES.map(m=>`<option>${m}</option>`).join("");
  $("#add-exercise").addEventListener("click",()=>addDraftExercise());
  $("#save-workout").addEventListener("click",saveWorkout);
  $("#add-custom-exercise").addEventListener("click",()=>$("#exercise-modal").showModal());
  $("#custom-submit").addEventListener("click",e=>{e.preventDefault();addCustomExercise();});
  $("#exercise-search").addEventListener("input",renderLibrary);$("#muscle-filter").addEventListener("change",renderLibrary);$("#equipment-filter").addEventListener("change",renderLibrary);
  $("#export-data").addEventListener("click",exportData);$("#history-export").addEventListener("click",exportData);
  $("#import-data").addEventListener("change",e=>{if(e.target.files[0])importData(e.target.files[0]);e.target.value="";});
  $("#clear-data").addEventListener("click",()=>{if(confirm("Delete every locally saved workout and custom exercise? Export a backup first if you want to keep them.")){state={sessions:[],customExercises:[],recoveryHours:{...DEFAULT_HOURS}};persist();showView("dashboard");notify("Local data cleared.");}});
  $("#save-settings").addEventListener("click",()=>{$$("[data-muscle]").forEach(i=>{const v=Number(i.value);if(v>=12&&v<=168)state.recoveryHours[i.dataset.muscle]=v;});persist();notify("Recovery settings saved.");renderRecovery();});
  $("#workout-exercises").addEventListener("change",e=>{const i=Number(e.target.dataset.index);if(e.target.classList.contains("draft-name")){draft[i].name=e.target.value;renderDraft();}});
  $("#workout-exercises").addEventListener("input",e=>{const i=Number(e.target.dataset.index),j=Number(e.target.dataset.set),field=e.target.dataset.field;if(field&&draft[i]?.sets[j])draft[i].sets[j][field]=e.target.value;});
  $("#workout-exercises").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const i=Number(b.dataset.index),j=Number(b.dataset.set);if(b.classList.contains("add-set"))draft[i].sets.push({weight:"",reps:"",rir:""});if(b.classList.contains("remove-exercise"))draft.splice(i,1);if(b.classList.contains("remove-set")){if(draft[i].sets.length>1)draft[i].sets.splice(j,1);else notify("An exercise needs at least one set row.");}renderDraft();});
  $("#history-list").addEventListener("click",e=>{const b=e.target.closest(".delete-session");if(b&&confirm("Delete this workout?")){state.sessions=state.sessions.filter(s=>s.id!==b.dataset.id);persist();renderHistory();renderDashboard();notify("Workout deleted.");}});
  document.addEventListener("click",e=>{const view=e.target.closest("[data-view]");if(view){e.preventDefault();showView(view.dataset.view);}const action=e.target.closest('[data-action="new-workout"]');if(action){draft=[];addDraftExercise();showView("workout");}});
  if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(err=>console.warn("Offline worker unavailable",err));
  renderDraft();renderDashboard();
}
document.addEventListener("DOMContentLoaded",init);
