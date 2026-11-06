(function(){
'use strict';
var PALETTE={red:'#FF3B30',orange:'#FF9500',yellow:'#FFCC00',green:'#34C759',mint:'#00C7BE',teal:'#30B0C7',cyan:'#32ADE6',blue:'#007AFF',indigo:'#5856D6',purple:'#AF52DE',pink:'#FF2D55',brown:'#A2845E',gray:'#8E8E93'};
var CKEYS=Object.keys(PALETTE);
var EMPTY={idea:'Capture the next idea',active:'Drag a project here to start it',done:'Finished projects land here',dropped:"Projects you've decided against"};
var REASONS={done:['Launched','Making money','Handed off','Lesson learned'],dropped:['Not profitable','No time','Better opportunity','Market changed','Too risky']};
var DAY=86400000;var NOTIFY_SINCE=Date.UTC(2026,10,6,18,0);var NOTIFY_DELAY=120000;
var I={
 plus:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg>',
 search:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="7" cy="7" r="4.6"/><path d="M10.5 10.5 14 14"/></svg>',
 x:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 3l8 8M11 3l-8 8"/></svg>',
 xs:'<svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 3l8 8M11 3l-8 8"/></svg>',
 bolt:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9.2 1 3 9.1h4.3L6.6 15 13 6.8H8.6z"/></svg>',
 gear:'<svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="10" cy="10" r="2.6"/><path d="M10 1.8v2.4M10 15.8v2.4M18.2 10h-2.4M4.2 10H1.8M15.8 4.2l-1.7 1.7M5.9 14.1l-1.7 1.7M15.8 15.8l-1.7-1.7M5.9 5.9 4.2 4.2" stroke-linecap="round"/></svg>',
 cal:'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1.5" y="2.3" width="9" height="8.2" rx="1.8"/><path d="M1.5 5h9M4 1v2.4M8 1v2.4" stroke-linecap="round"/></svg>',
 list:'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 3.2l1.2 1.2L4.8 2.2M1.5 8.2l1.2 1.2 2.1-2.2M7 3.5h3.5M7 8.5h3.5"/></svg>',
 link:'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 7a2.3 2.3 0 0 0 3.3 0l1.6-1.6a2.3 2.3 0 0 0-3.3-3.3l-.6.6M7 5a2.3 2.3 0 0 0-3.3 0L2.1 6.6a2.3 2.3 0 0 0 3.3 3.3l.6-.6"/></svg>',
 flag:'<svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><path d="M2.4 1.2a.6.6 0 0 1 .6.6v.2c2.4-1.1 4 .9 6.6-.2v5.6c-2.6 1.1-4.2-.9-6.6.2v3.4a.6.6 0 0 1-1.2 0V1.8a.6.6 0 0 1 .6-.6z"/></svg>',
 check:'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.3 5 8.8l4.5-5.3"/></svg>',
 checkc:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm3 4.6a.7.7 0 0 0-1 0L7.1 8.9 6 7.8a.7.7 0 1 0-1 1l1.6 1.6c.3.3.7.3 1 0L11 6.6a.7.7 0 0 0 0-1z"/></svg>',
 eye:'<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z"/><circle cx="8" cy="8" r="2"/></svg>',
 up:'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.5 6 4.5l3 3"/></svg>',
 down:'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4.5l3 3 3-3"/></svg>',
 trash:'<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2.5 4h9M5.5 4V2.5h3V4M3.6 4l.6 7.6c0 .5.5.9 1 .9h3.6c.5 0 1-.4 1-.9l.6-7.6"/></svg>',
 arrow:'<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7h9M8 3.5 11.5 7 8 10.5"/></svg>',
 spark:'<svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor"><path d="M7 1.2 8.3 5.7 12.8 7 8.3 8.3 7 12.8 5.7 8.3 1.2 7l4.5-1.3z"/></svg>',
 bell:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 11.5V7a4 4 0 0 1 8 0v4.5l1.2 1.3H2.8z"/><path d="M6.5 14a1.6 1.6 0 0 0 3 0" stroke-linecap="round"/></svg>',
 belloff:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 11.5V7a4 4 0 0 1 6.4-3.2M12 7v4.5l1.2 1.3H5"/><path d="M2.5 2.5l11 11" stroke-linecap="round"/></svg>',
 pencil:'<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2.5l2 2L5 11l-2.6.6L3 9z"/></svg>',
 clock:'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="6" cy="6" r="4.6"/><path d="M6 3.4V6l1.8 1.2"/></svg>',
 quote:'<svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor"><path d="M2 7.4C2 5 3.3 3.3 5.3 2.6l.4.8C4.5 4 3.9 4.9 3.9 5.8h1.6V9.5H2zm4.6 0c0-2.4 1.3-4.1 3.3-4.8l.4.8c-1.2.6-1.8 1.5-1.8 2.4h1.6V9.5H6.6z"/></svg>'
};

function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function uid(p){return (p||'')+Math.random().toString(36).slice(2,10)}
function hex(k){return PALETTE[k]||PALETTE.gray}
function clone(o){return JSON.parse(JSON.stringify(o))}
var reduceMotion=false; try{reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
function lsGet(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}

/* ---------- State (filled from the shared database) ---------- */
var DEFAULT_META={name:'Projects',eyebrow:'',staleDays:14,columns:[{id:'ideas',name:'Ideas',color:'indigo',kind:'idea'},{id:'doing',name:'In Progress',color:'blue',kind:'active'},{id:'done',name:'Done',color:'green',kind:'done'},{id:'scrapped',name:'Scrapped',color:'gray',kind:'dropped'}],tags:[]};
var meta=clone(DEFAULT_META);
var cards={};
var activity=[];
var loaded={meta:false,cards:false};
var db=null,user=null,myId=null,names={};
var myNotes=[];
var sb=null,session=null,members=[],myRole=null,authMode='signin',started=false,checking=false;
var mode='pending'; // pending | live | readonly | signedout | noaccess | config
function editable(){return mode==='live'}
var ui={open:null,drawer:false,settings:false,outcome:null,tag:null,person:null,stale:false,q:'',quickAdd:null,quickDraft:'',newTag:false,collapsed:lsGet('mvb-collapsed',{})};

function normMeta(m){m=m||{};var o=clone(DEFAULT_META);['name','eyebrow'].forEach(function(k){if(typeof m[k]==='string')o[k]=m[k]});if(typeof m.staleDays==='number')o.staleDays=m.staleDays;if(Array.isArray(m.columns)&&m.columns.length)o.columns=m.columns;if(Array.isArray(m.tags))o.tags=m.tags;return o}
function normCard(c){c.people=Array.isArray(c.people)?c.people:[];c.checklist=Array.isArray(c.checklist)?c.checklist:[];['title','notes','tag','priority','due','link'].forEach(function(k){if(typeof c[k]!=='string')c[k]=''});if(typeof c.pos!=='number')c.pos=0;c.created=c.created||Date.now();c.updated=c.updated||c.created;if(!c.outcome||typeof c.outcome.text!=='string')c.outcome=null;if(typeof c.budget!=='number'||!isFinite(c.budget))c.budget=0;if(c.budgetPeriod!=='month')c.budgetPeriod='total';if(typeof c.announced!=='boolean')c.announced=c.created<NOTIFY_SINCE;return c}
function cardBody(c){var b=clone(c);delete b.id;return b}

function cardList(){return Object.keys(cards).map(function(k){return cards[k]})}
function colById(id){for(var i=0;i<meta.columns.length;i++)if(meta.columns[i].id===id)return meta.columns[i];return {id:id,name:'Removed column',color:'gray',kind:'active'}}
function colExists(id){return meta.columns.some(function(c){return c.id===id})}
function tagById(id){if(!id)return null;for(var i=0;i<meta.tags.length;i++)if(meta.tags[i].id===id)return meta.tags[i];return null}
function cardById(id){return cards[id]||null}
function colOf(c){return colExists(c.col)?c.col:meta.columns[0].id}
function cardsIn(col){return cardList().filter(function(c){return colOf(c)===col}).sort(function(a,b){return a.pos-b.pos})}
function allPeople(){var m={};cardList().forEach(function(c){c.people.forEach(function(p){var k=p.toLowerCase();if(!m[k])m[k]={name:p,n:0};m[k].n++})});return Object.keys(m).map(function(k){return m[k]}).sort(function(a,b){return b.n-a.n||a.name.localeCompare(b.name)})}
function initials(n){var p=String(n).trim().split(/\s+/);return ((p[0]||'')[0]||'?').toUpperCase()+(p[1]?p[1][0].toUpperCase():'')}
function personColor(n){var h=0,s=String(n).toLowerCase();for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;var ks=['blue','indigo','purple','pink','orange','teal','green','red','brown','cyan'];return hex(ks[h%ks.length])}
function stalledDays(c){var d=meta.staleDays;if(!d||colById(colOf(c)).kind!=='active')return 0;var n=Math.floor((Date.now()-c.updated)/DAY);return n>=d?n:0}
function stalledCards(){return cardList().filter(stalledDays).sort(function(a,b){return a.updated-b.updated})}
function matches(c){
  if(ui.tag&&c.tag!==ui.tag)return false;
  if(ui.person&&!c.people.some(function(p){return p.toLowerCase()===ui.person}))return false;
  if(ui.stale&&!stalledDays(c))return false;
  if(ui.q){var q=ui.q.toLowerCase();var t=tagById(c.tag);var hay=(c.title+' '+c.notes+' '+(t?t.name:'')+' '+c.people.join(' ')+' '+(c.outcome?c.outcome.text:'')+' '+c.checklist.map(function(x){return x.text}).join(' ')).toLowerCase();if(hay.indexOf(q)<0)return false}
  return true;
}
function lastUpdated(){var t=0;cardList().forEach(function(c){if(c.updated>t)t=c.updated});if(activity[0]&&activity[0].t>t)t=activity[0].t;return t}

/* ---------- Time ---------- */
var MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function dayStart(d){var x=new Date(d);x.setHours(0,0,0,0);return x.getTime()}
function ago(t){if(!t)return 'never';var s=(Date.now()-t)/1000;if(s<45)return 'just now';if(s<3600)return Math.round(s/60)+'m ago';if(s<86400&&dayStart(t)===dayStart(Date.now()))return Math.round(s/3600)+'h ago';var d=(dayStart(Date.now())-dayStart(t))/DAY;if(d<=1)return 'Yesterday';if(d<7)return DAYS[new Date(t).getDay()];var x=new Date(t);return MONTHS[x.getMonth()]+' '+x.getDate()}
function parseDue(s){if(!s)return null;var p=s.split('-');if(p.length!==3)return null;return new Date(+p[0],+p[1]-1,+p[2]).getTime()}
function fmtDue(s){var t=parseDue(s);if(t==null)return '';var d=Math.round((t-dayStart(Date.now()))/DAY);if(d===0)return 'Today';if(d===1)return 'Tomorrow';if(d===-1)return 'Yesterday';var x=new Date(t);return MONTHS[x.getMonth()]+' '+x.getDate()+(x.getFullYear()!==new Date().getFullYear()?', '+x.getFullYear():'')}
function fmtDate(t){var x=new Date(t);return MONTHS[x.getMonth()]+' '+x.getDate()+', '+x.getFullYear()}
function clock(t){var tm=new Date(t),hh=tm.getHours(),mm=tm.getMinutes();return ((hh%12)||12)+':'+(mm<10?'0':'')+mm+(hh<12?' AM':' PM')}

/* ---------- Writes: one at a time per document, coalesced per pause ---------- */
var Q={},statusKind='';
function queue(path,data,delay){
  if(!db||mode!=='live')return;
  var q=Q[path]||(Q[path]={});q.data=data;q.del=data===null;q.has=true;
  clearTimeout(q.timer);q.timer=setTimeout(function(){flush(path)},delay==null?400:delay);updateStatus();
}
function flush(path){
  var q=Q[path];if(!q||q.busy||!q.has)return;clearTimeout(q.timer);
  var data=q.data,del=q.del;q.has=false;q.busy=true;updateStatus();
  var ref;try{ref=db.doc(path)}catch(e){delete Q[path];updateStatus();return}
  (del?ref.delete():ref.set(data)).then(function(){
    q.busy=false;q.retry=0;if(q.has)flush(path);else delete Q[path];updateStatus();
  },function(e){
    q.busy=false;var code=e&&e.code;
    if(!q.has){q.has=true;q.data=data;q.del=del}
    if(code==='invalid_argument'||code==='revoked'||code==='not_granted'||code==='capability_disabled'||code==='capability_removed'){goReadonly();return}
    if(code==='quota_exceeded'){delete Q[path];updateStatus();toast('The board is full. Delete a few old projects, then try again.');return}
    q.retry=(q.retry||0)+1;
    if(q.retry>4){setStatus('error');toast('Couldn’t save. Check your connection.',{label:'Retry',fn:function(){q.retry=0;flush(path)}});return}
    q.timer=setTimeout(function(){flush(path)},700*q.retry+Math.random()*900);updateStatus();
  });
}
function flushAll(){Object.keys(Q).forEach(flush)}
function pendingFor(path){var q=Q[path];return !!(q&&(q.has||q.busy))}
function updateStatus(){if(mode!=='live')return;var any=Object.keys(Q).some(function(k){return Q[k].has||Q[k].busy});setStatus(any?'saving':'saved')}
function goReadonly(){if(mode==='readonly')return;mode='readonly';Q={};renderAll();toast('You’re viewing this board. Only admins can make changes.')}
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')flushAll()});

function saveCard(c,delay,keepTime){if(!keepTime)c.updated=Date.now();queue('cards/'+c.id,cardBody(c),delay)}
function saveMeta(delay){queue('board/meta',clone(meta),delay==null?500:delay)}
function addActivity(e){
  e.id=uid('a');e.t=Date.now();if(myId)e.by=myId;activity.unshift(e);
  queue('activity/'+e.id,(function(){var b=clone(e);delete b.id;return b})(),0);
  if(activity.length>300){activity.slice(300).forEach(function(a){queue('activity/'+a.id,null,0)});activity=activity.slice(0,300)}
  return e;
}
function saveActivity(a,delay){var b=clone(a);delete b.id;queue('activity/'+a.id,b,delay)}

/* ---------- Status pill ---------- */
function setStatus(k){statusKind=k;var el=$('#status');if(!el)return;
  var map={saved:'Saved',saving:'Saving…',error:'Not saved',readonly:'View only'};
  if(!map[k]){el.hidden=true;return}
  el.hidden=false;el.className='status '+k;
  el.innerHTML=(k==='readonly'?I.eye:'<i></i>')+'<span>'+map[k]+'</span>';
}

/* ---------- Shell ---------- */
function shell(){
  $('#app').innerHTML=
  '<div class="app">'+
   '<header class="top">'+
    '<div class="top-row">'+
     '<div class="titles"><p class="eyebrow" id="eyebrow" hidden></p><h1 id="board-name"></h1><p class="sub" id="board-sub"></p></div>'+
     '<div class="actions">'+
      '<label class="search">'+I.search+'<input id="q" type="search" placeholder="Search projects" autocomplete="off" aria-label="Search projects"><kbd>/</kbd></label>'+
      '<span class="status" id="status" hidden></span>'+
      '<span class="acct-wrap"><button class="icon-btn acct" id="btn-acct" hidden aria-haspopup="true" aria-expanded="false" aria-label="Account"></button><div class="acct-menu" id="acct-menu" hidden></div></span>'+
      '<button class="icon-btn bell" id="btn-bell" hidden aria-label="Notifications" title="Notifications">'+I.bell+'<span class="badge" hidden></span></button>'+
      '<button class="icon-btn" id="btn-activity" aria-label="What’s moving" title="What’s moving">'+I.bolt+'</button>'+
      '<button class="icon-btn" id="btn-settings" aria-label="Board settings" title="Board settings" hidden>'+I.gear+'</button>'+
      '<button class="primary" id="btn-new" hidden>'+I.plus+'<span class="lbl-long">New project</span><span class="lbl-short">New</span></button>'+
     '</div>'+
    '</div>'+
    '<div class="meter" id="meter"></div>'+
    '<div class="chips" id="chips" role="toolbar" aria-label="Filter projects"></div>'+
   '</header>'+
   '<main class="board" id="board" aria-label="Project board"></main>'+
  '</div>'+
  '<div id="layer-root"></div><div id="toast-root"></div>';
}
function ready(){return loaded.meta&&loaded.cards}
function renderHeader(){
  $('#eyebrow').textContent=meta.eyebrow||'';$('#eyebrow').hidden=!meta.eyebrow;
  $('#board-name').textContent=meta.name||'Projects';
  var list=cardList(),total=list.length;
  var active=list.filter(function(c){return colById(colOf(c)).kind==='active'}).length;
  var st=stalledCards().length;
  $('#board-sub').textContent=ready()||total?total+(total===1?' project':' projects')+' · '+active+' in motion'+(st?' · '+st+' stalled':'')+(function(){var b=0;list.forEach(function(c){var k=colById(colOf(c)).kind;if((k==='idea'||k==='active')&&c.budget&&c.budgetPeriod!=='month')b+=c.budget});return b?' · '+money(b,true)+' budgeted':''})()+' · Updated '+ago(lastUpdated()):(mode==='signedout'||mode==='standalone'?'':'Loading…');
  var meM=members.filter(function(x){return x.email===myId})[0];if(meM&&meM.role!=='admin'&&meM.scope&&meM.scope!=='all'&&ready())$('#board-sub').textContent+=' · Showing projects shared with you';
  $('#btn-new').hidden=!editable();$('#btn-settings').hidden=!editable();
  var gated=mode==='signedout'||mode==='noaccess'||mode==='config'||mode==='pending';
  $('.app').classList.toggle('gated',gated);
  $('#btn-activity').hidden=gated;
  var bb=$('#btn-bell');if(bb){bb.hidden=gated||!session;var un=visibleNotes().filter(function(n){return !n.read}).length;var bd=bb.querySelector('.badge');bd.textContent=un>9?'9+':String(un);bd.hidden=!un;bb.classList.toggle('on',!!ui.bell);bb.setAttribute('aria-label',un?un+' unread notifications':'Notifications')}
  var acct=$('#btn-acct');acct.hidden=!session||gated;
  if(session){var mm=members.filter(function(x){return x.email===myId})[0];var nm=(mm&&mm.name)||myId;acct.textContent=initials(nm);acct.style.setProperty('--c',personColor(nm));
    $('#acct-menu').innerHTML='<div class="acct-who"><b>'+esc((mm&&mm.name)||myId.split('@')[0])+'</b><small>'+esc(myId)+'</small><small>'+(myRole==='admin'?'Admin · can change anything':'Viewer · can look, not change')+'</small></div><button class="acct-item" data-signout>Sign out</button>'}
  $('#btn-activity').classList.toggle('on',ui.drawer);
  if(mode==='readonly')setStatus('readonly');else if(mode==='live')setStatus(statusKind==='error'?'error':(Object.keys(Q).length?'saving':'saved'));else setStatus('');
  var cols=meta.columns.map(function(c){return {c:c,n:list.filter(function(x){return colOf(x)===c.id}).length}});
  $('#meter').innerHTML='<div class="meter-bar" role="img" aria-label="'+esc(cols.map(function(x){return x.c.name+' '+x.n}).join(', '))+'">'+cols.map(function(x){return '<span style="flex:'+x.n+' 1 0;--c:'+hex(x.c.color)+'"></span>'}).join('')+'</div>'+
   '<div class="legend">'+cols.map(function(x){return '<button data-jump="'+esc(x.c.id)+'" style="--c:'+hex(x.c.color)+'"><i></i>'+esc(x.c.name)+'<b>'+x.n+'</b></button>'}).join('')+'</div>';
}
function renderChips(){
  var h='<button class="chip'+(!ui.tag&&!ui.person&&!ui.stale?' on':'')+'" data-filter-all>All</button>';
  var st=stalledCards().length;
  if(st||ui.stale)h+='<button class="chip stale'+(ui.stale?' on':'')+'" data-filter-stale>'+I.clock+'Stalled<small>'+st+'</small></button>';
  meta.tags.forEach(function(t){var n=cardList().filter(function(c){return c.tag===t.id}).length;h+='<button class="chip'+(ui.tag===t.id?' on':'')+'" data-filter-tag="'+esc(t.id)+'" style="--c:'+hex(t.color)+'"><i></i>'+esc(t.name)+'<small>'+n+'</small></button>'});
  var ppl=allPeople();
  if(ppl.length){h+='<span class="chip-sep"></span>';ppl.forEach(function(p){var k=p.name.toLowerCase();h+='<button class="chip'+(ui.person===k?' on':'')+'" data-filter-person="'+esc(k)+'"><span class="av mini" style="--c:'+personColor(p.name)+'">'+esc(initials(p.name))+'</span>'+esc(p.name)+'</button>'})}
  $('#chips').innerHTML=h;
}
function cardHTML(c){
  var col=colById(colOf(c)),t=tagById(c.tag);
  var top='';
  if(t)top+='<span class="tag" style="--c:'+hex(t.color)+'">'+esc(t.name)+'</span>';
  top+='<span class="grow"></span>';
  if(c.priority==='high')top+='<span class="prio high" title="High priority">'+I.flag+'</span>';
  else if(c.priority==='med')top+='<span class="prio" title="Medium priority">'+I.flag+'</span>';
  var meta2='';var sd=stalledDays(c);
  if(sd)meta2+='<span class="meta-chip stale" title="No changes in '+sd+' days">'+I.clock+'Stalled '+sd+'d</span>';
  if(c.due){var dt=parseDue(c.due);var late=dt!=null&&dt<dayStart(Date.now())&&(col.kind==='active'||col.kind==='idea');meta2+='<span class="meta-chip'+(late?' late':'')+'" title="Due">'+I.cal+esc(fmtDue(c.due))+'</span>'}
  if(c.budget)meta2+='<span class="meta-chip money" title="Ad budget">'+esc(budgetLabel(c,true))+'</span>';
  if(c.checklist.length){var d=c.checklist.filter(function(x){return x.done}).length;meta2+='<span class="meta-chip'+(d===c.checklist.length?' ok':'')+'" title="Checklist">'+I.list+d+'/'+c.checklist.length+'</span>'}
  if(c.link)meta2+='<span class="meta-chip" title="Has a link">'+I.link+'</span>';
  if(c.people.length){meta2+='<span class="avs">'+c.people.slice(0,3).map(function(p){return '<span class="av" style="--c:'+personColor(p)+'" title="'+esc(p)+'">'+esc(initials(p))+'</span>'}).join('')+(c.people.length>3?'<span class="av" style="--c:var(--fg3)">+'+(c.people.length-3)+'</span>':'')+'</span>'}
  var showOutcome=(col.kind==='done'||col.kind==='dropped')&&c.outcome&&c.outcome.text;
  return '<article class="card k-'+col.kind+(sd?' is-stale':'')+'" data-id="'+esc(c.id)+'" tabindex="0" aria-label="'+esc(c.title)+'">'+
    ((t||c.priority)?'<div class="card-top">'+top+'</div>':'')+
    '<h3 class="card-title">'+(col.kind==='done'?'<span class="ok">'+I.checkc+'</span>':'')+'<span>'+esc(c.title||'Untitled')+'</span></h3>'+
    (showOutcome?'<p class="card-outcome">'+I.quote+'<span>'+esc(c.outcome.text)+'</span></p>':(c.notes?'<p class="card-notes">'+esc(c.notes)+'</p>':''))+
    (meta2?'<div class="card-meta">'+meta2+'</div>':'')+
    '<button class="card-more" data-more="'+esc(c.id)+'" tabindex="-1" aria-label="More actions for '+esc(c.title)+'">⋯</button>'+
  '</article>';
}
function columnHTML(col){
  var all=cardsIn(col.id),vis=all.filter(matches),filtered=vis.length!==all.length;
  var collapsed=!!ui.collapsed[col.id];
  var tot=0,mo=0;all.forEach(function(x){if(x.budget){if(x.budgetPeriod==='month')mo+=x.budget;else tot+=x.budget}});
  var colMoney=(tot?money(tot,true):'')+(tot&&mo?' + ':'')+(mo?money(mo,true)+'/mo':'');
  var ed=editable();
  var h='<section class="column'+(collapsed?' collapsed':'')+'" data-col="'+esc(col.id)+'" style="--c:'+hex(col.color)+'">'+
   '<header class="col-head"><button class="col-toggle" data-collapse="'+esc(col.id)+'" aria-expanded="'+(!collapsed)+'" title="'+(collapsed?'Expand':'Collapse')+' '+esc(col.name)+'"><i class="dot"></i><h2>'+esc(col.name)+'</h2><span class="count">'+(filtered?vis.length+'/'+all.length:all.length)+'</span>'+(colMoney?'<span class="col-money" title="Ad budget in this column">'+esc(colMoney)+'</span>':'')+'</button>'+
   (ed?'<button class="icon-btn sm" data-add="'+esc(col.id)+'" aria-label="Add project to '+esc(col.name)+'">'+I.plus+'</button>':'')+'</header>'+
   '<div class="list" data-col="'+esc(col.id)+'" data-empty="'+esc(filtered&&all.length?'No matches here':(EMPTY[col.kind]||'Nothing here yet'))+'">'+vis.map(cardHTML).join('')+'</div>';
  if(ed){
    if(ui.quickAdd===col.id) h+='<form class="quick" data-quick="'+esc(col.id)+'"><textarea id="quick-input" rows="2" placeholder="Project name" aria-label="New project name">'+esc(ui.quickDraft||'')+'</textarea><div class="quick-row"><button type="submit" class="primary sm">Add</button><button type="button" class="ghost" data-quick-cancel>Cancel</button><span class="hint">Return adds · Esc closes</span></div></form>';
    else h+='<button class="add-row" data-add="'+esc(col.id)+'">'+I.plus+'Add project</button>';
  }
  return h+'</section>';
}
function gateHTML(){
  if(mode==='signedout')return authHTML();
  if(mode==='noaccess')return '<div class="auth"><div class="auth-card">'+markHTML()+'<h2>You’re not on this board yet</h2><p class="auth-sub">'+esc(myId)+' hasn’t been added. Ask an admin to add you under People in Settings, then reload this page.</p><button class="ghost auth-switch" data-signout>Sign out</button></div></div>';
  if(mode==='config')return '<div class="auth"><div class="auth-card">'+markHTML()+'<h2>Almost there</h2><p class="auth-sub">This board isn’t connected to its database yet. Add the Supabase project URL and anon key to config.js.</p></div></div>';
  if(mode==='pending')return '<div class="auth"><div class="auth-card loading">'+markHTML()+'</div></div>';
  return null;
}
function markHTML(){return '<div class="auth-mark" aria-hidden="true">'+['indigo','blue','green','gray'].map(function(k){return '<i style="--c:'+hex(k)+'"></i>'}).join('')+'</div>'}
function authHTML(){
  var up=authMode==='signup';
  return '<div class="auth"><form class="auth-card" id="auth-form" novalidate>'+markHTML()+
  '<h2>'+(up?'Create your password':'Sign in')+'</h2>'+
  '<p class="auth-sub">'+(up?'Use the email address you were added with.':esc(meta.name&&meta.name!=='Projects'?meta.name:'Projects, ideas and what’s moving.'))+'</p>'+
  '<label class="auth-field"><span>Email</span><input id="auth-email" type="email" autocomplete="email" inputmode="email" value="'+esc(lsGet('mvb-email',''))+'"></label>'+
  '<label class="auth-field"><span>Password</span><input id="auth-pass" type="password" autocomplete="'+(up?'new-password':'current-password')+'" placeholder="'+(up?'At least 8 characters':'')+'"></label>'+
  '<p class="auth-msg" id="auth-msg" role="alert"></p>'+
  '<button class="primary auth-go" id="auth-go" type="submit">'+(up?'Create password':'Sign in')+'</button>'+
  '<button type="button" class="ghost auth-switch" data-auth-mode="'+(up?'signin':'signup')+'">'+(up?'I already have a password':'First time here? Create your password')+'</button>'+
  '</form></div>';
}
function authMsg(text,busy){var m=$('#auth-msg'),b=$('#auth-go');if(m)m.textContent=text||'';if(b){b.disabled=!!busy;b.textContent=busy?'One moment…':(authMode==='signup'?'Create password':'Sign in')}}
function doAuth(){
  var email=($('#auth-email').value||'').trim().toLowerCase(),pass=$('#auth-pass').value||'';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){authMsg('Enter your email address.');$('#auth-email').focus();return}
  if(pass.length<8){authMsg('Passwords are at least 8 characters.');$('#auth-pass').focus();return}
  lsSet('mvb-email',email);authMsg('',true);
  var p;
  if(authMode==='signup'){
    p=sb.rpc('is_invited',{check_email:email}).then(function(r){
      if(r.error)throw r.error;if(!r.data)throw {message:'not_invited'};
      return sb.auth.signUp({email:email,password:pass,options:{emailRedirectTo:location.origin+location.pathname}});
    }).then(function(r){if(r.error)throw r.error;if(!r.data||!r.data.session){authMode='signin';renderBoard();authMsg('If you already set a password, sign in with it. Otherwise check your inbox to confirm your email first.')}});
  }else p=sb.auth.signInWithPassword({email:email,password:pass}).then(function(r){if(r.error)throw r.error});
  p.catch(function(e){var m=(e&&e.message)||'';
    authMsg(m==='not_invited'?'That email hasn’t been added to this board yet. Ask an admin to add you.':/invalid login/i.test(m)?'That email and password don’t match.':/already registered/i.test(m)?'You already have a password. Sign in instead.':/not confirmed/i.test(m)?'Confirm your email first. Check your inbox.':/rate limit|too many/i.test(m)?'Too many tries. Wait a minute and try again.':'Couldn’t sign in. '+m);
    var pe=$('#auth-pass');if(pe)pe.focus()});
}
function skeletonHTML(){return meta.columns.map(function(col){return '<section class="column" style="--c:'+hex(col.color)+'"><header class="col-head"><span class="col-toggle"><i class="dot"></i><h2>'+esc(col.name)+'</h2></span></header><div class="list skel">'+'<div class="sk"></div><div class="sk short"></div>'+'</div></section>'}).join('')+(offlineNote?'<p class="offline">'+esc(offlineNote)+'</p>':'')}
var offlineNote='';
function rects(){var m={};$$('#board .card').forEach(function(el){m[el.dataset.id]=el.getBoundingClientRect()});return m}
var needBoard=false;
function renderBoard(opt){
  opt=opt||{};if(drag){needBoard=true;return}
  var b=$('#board');var g=gateHTML();
  if(g){if(b.dataset.gate!==mode+authMode){b.innerHTML=g;b.dataset.gate=mode+authMode;var ae=$('#auth-email');if(ae)(ae.value?$('#auth-pass'):ae).focus()}return}
  delete b.dataset.gate;
  if(!ready()){b.innerHTML=skeletonHTML();return}
  var prev=(!reduceMotion&&opt.animate!==false)?rects():null;
  var sl=b.scrollLeft,ls={};$$('.list',b).forEach(function(l){ls[l.dataset.col]=l.scrollTop});
  var qi=$('#quick-input'),hadFocus=qi&&document.activeElement===qi;if(qi)ui.quickDraft=qi.value;
  b.innerHTML=meta.columns.map(columnHTML).join('')+'<div class="board-end"></div>';
  b.scrollLeft=sl;$$('.list',b).forEach(function(l){if(ls[l.dataset.col]!=null)l.scrollTop=ls[l.dataset.col]});
  if(prev){$$('#board .card').forEach(function(el){var f=prev[el.dataset.id];if(f){var l=el.getBoundingClientRect();var dx=f.left-l.left,dy=f.top-l.top;if(Math.abs(dx)>1||Math.abs(dy)>1)el.animate([{transform:'translate('+dx+'px,'+dy+'px)'},{transform:'none'}],{duration:340,easing:'cubic-bezier(.32,.72,0,1)'})}else if(opt.enter&&opt.enter.indexOf(el.dataset.id)>-1){el.animate([{opacity:0,transform:'scale(.94) translateY(6px)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.32,.72,0,1)'})}})}
  if(opt.pop){var pe=$('#board .card[data-id="'+opt.pop+'"]');if(pe){pe.classList.add('pop');setTimeout(function(){pe.classList.remove('pop')},700)}}
  var q2=$('#quick-input');if(q2&&(opt.focusQuick||hadFocus)){q2.focus();q2.setSelectionRange(q2.value.length,q2.value.length)}
}
var raf=0;
function softRender(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;renderHeader();renderChips();renderBoard({animate:false})})}
function renderAll(opt){renderHeader();renderChips();renderBoard(opt);renderLayer()}

/* ---------- Toast & undo ---------- */
var toastTimer;
function toast(msg,action){
  var r=$('#toast-root');clearTimeout(toastTimer);
  r.innerHTML='<div class="toast" role="status"><span>'+esc(msg)+'</span>'+(action?'<button id="toast-act">'+esc(action.label||'Undo')+'</button>':'')+'</div>';
  if(action)$('#toast-act').onclick=function(){r.innerHTML='';action.fn()};
  toastTimer=setTimeout(function(){r.innerHTML=''},action?6000:3500);
}
function restoreCard(prev){cards[prev.id]=prev;saveCard(prev,0,true);cancelPending(prev.id);dropDeferred(prev.id)}

/* ---------- Mutations ---------- */
function addCard(col,title){
  title=title.trim();if(!title)return null;
  var list=cardsIn(col);var person=null;if(ui.person){var m=allPeople().filter(function(p){return p.name.toLowerCase()===ui.person})[0];if(m)person=m.name}
  var c=normCard({id:uid('c'),col:col,pos:(list.length?list[list.length-1].pos:0)+1,title:title,tag:ui.tag||'',people:person?[person]:[],created:Date.now(),updated:Date.now()});
  cards[c.id]=c;saveCard(c,0,true);addActivity({kind:'add',card:c.id,title:c.title,to:col});return c;
}
function moveCard(c,toCol,pos){
  var from=c.col;c.col=toCol;
  if(pos!=null)c.pos=pos;else{var l=cardsIn(toCol).filter(function(x){return x!==c});c.pos=(l.length?l[l.length-1].pos:0)+1}
  saveCard(c,0);
  if(from!==toCol){cancelPending(c.id);dropDeferred(c.id)}
  return from!==toCol?addActivity({kind:'move',card:c.id,title:c.title,from:from,to:toCol}):null;
}
function afterMove(c,prev,act){
  var kind=colById(c.col).kind;
  toast('Moved to '+colById(c.col).name,{label:'Undo',fn:function(){restoreCard(prev);if(act){activity=activity.filter(function(a){return a!==act});queue('activity/'+act.id,null,0)}renderAll()}});
  if(act&&(kind==='done'||kind==='dropped')&&!(ui.open===c.id))openOutcome(c.id,act.id);
  if(act)promptForMove(c,act);
}
function deleteCard(c){
  cancelPending(c.id);dropDeferred(c.id);var prev=clone(c);delete cards[c.id];queue('cards/'+c.id,null,0);addActivity({kind:'delete',card:c.id,title:c.title,from:c.col});
  toast('Deleted “'+(c.title.length>32?c.title.slice(0,30)+'…':c.title)+'”',{label:'Undo',fn:function(){restoreCard(prev);renderAll()}});
}
function setOutcome(c,text,actId){
  text=text.replace(/\s+$/,'');var kind=colById(c.col).kind;
  c.outcome=text.trim()?{kind:kind,text:text.trim(),t:Date.now()}:null;saveCard(c,700);
  var a=null;if(actId)a=activity.filter(function(x){return x.id===actId})[0];
  if(!a)a=activity.filter(function(x){return x.kind==='move'&&x.card===c.id&&x.to===c.col})[0];
  if(a){if(text.trim())a.reason=text.trim();else delete a.reason;saveActivity(a,700)}
}
function renumber(col){cardsIn(col).forEach(function(c,i){if(c.pos!==i+1){c.pos=i+1;saveCard(c,300,true)}})}

/* ---------- Drag & drop ---------- */
var pending=null,drag=null,suppressClick=false,autoRaf=0;
function onDown(e){
  if(!editable()||e.button>0)return;
  var card=e.target.closest('.card');if(!card||e.target.closest('button,a,input,textarea'))return;
  pending={id:card.dataset.id,el:card,sx:e.clientX,sy:e.clientY,x:e.clientX,y:e.clientY,type:e.pointerType,timer:0};
  if(e.pointerType!=='mouse'){var p=pending;p.timer=setTimeout(function(){if(pending===p)begin(p)},260)}
}
function onMove(x,y){
  if(pending&&!drag){var dx=x-pending.sx,dy=y-pending.sy,dist=Math.sqrt(dx*dx+dy*dy);pending.x=x;pending.y=y;
    if(pending.type==='mouse'){if(dist>5)begin(pending)}else if(dist>9){clearTimeout(pending.timer);pending=null}}
  if(drag){drag.x=x;drag.y=y;place()}
}
function begin(p){
  pending=null;var el=p.el;if(!el.isConnected)return;var r=el.getBoundingClientRect();
  var g=el.cloneNode(true);g.classList.add('ghost-card');g.style.width=r.width+'px';g.removeAttribute('tabindex');document.body.appendChild(g);
  drag={id:p.id,el:el,ghost:g,ox:p.x-r.left,oy:p.y-r.top,x:p.x,y:p.y};
  el.classList.add('placeholder');document.body.classList.add('dragging');
  try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}
  if(!reduceMotion)g.animate([{transform:tf(p.x,p.y,1,0)},{transform:tf(p.x,p.y,1.035,2.2)}],{duration:180,easing:'cubic-bezier(.32,.72,0,1)'});
  move();autoScroll();
}
function tf(x,y,s,rot){return 'translate3d('+(x-drag.ox)+'px,'+(y-drag.oy)+'px,0) rotate('+rot+'deg) scale('+s+')'}
function move(){drag.ghost.style.transform=tf(drag.x,drag.y,1.035,2.2)}
function place(){
  move();
  var under=document.elementFromPoint(drag.x,drag.y);var colEl=under&&under.closest('.column');
  $$('.column.drop').forEach(function(c){if(c!==colEl)c.classList.remove('drop')});
  if(!colEl||!colEl.dataset.col)return;colEl.classList.add('drop');
  var list=colEl.querySelector('.list');var before=null;
  if(!colEl.classList.contains('collapsed')){
    var cs=$$('.card',list).filter(function(c){return c!==drag.el});
    for(var i=0;i<cs.length;i++){var r=cs[i].getBoundingClientRect();if(drag.y<r.top+r.height/2){before=cs[i];break}}
  }
  if(drag.el.parentNode===list&&(drag.el.nextElementSibling===before||(!before&&!drag.el.nextElementSibling)))return;
  var els=$$('#board .card'),first=new Map();if(!reduceMotion)els.forEach(function(e){first.set(e,e.getBoundingClientRect())});
  list.insertBefore(drag.el,before);
  if(!reduceMotion)els.forEach(function(e){var f=first.get(e),l=e.getBoundingClientRect();var dx=f.left-l.left,dy=f.top-l.top;if(Math.abs(dx)>1||Math.abs(dy)>1)e.animate([{transform:'translate('+dx+'px,'+dy+'px)'},{transform:'none'}],{duration:220,easing:'cubic-bezier(.2,.8,.2,1)'})});
}
function autoScroll(){
  if(!drag)return;var b=$('#board'),br=b.getBoundingClientRect(),edge=70,sp=0;
  if(drag.x<br.left+edge)sp=-Math.ceil((br.left+edge-drag.x)/5);else if(drag.x>br.right-edge)sp=Math.ceil((drag.x-(br.right-edge))/5);
  if(sp){b.scrollLeft+=sp;place()}
  var under=document.elementFromPoint(drag.x,drag.y);var ce=under&&under.closest('.column');var list=ce&&ce.querySelector('.list');
  if(list){var lr=list.getBoundingClientRect();if(drag.y<lr.top+50)list.scrollTop-=Math.ceil((lr.top+50-drag.y)/5);else if(drag.y>lr.bottom-50)list.scrollTop+=Math.ceil((drag.y-(lr.bottom-50))/5)}
  autoRaf=requestAnimationFrame(autoScroll);
}
function end(cancel){
  if(pending){clearTimeout(pending.timer);pending=null}
  if(!drag)return;
  cancelAnimationFrame(autoRaf);
  var d=drag;suppressClick=true;setTimeout(function(){suppressClick=false},80);
  var colEl=d.el.closest('.column');var target=colEl?colEl.getBoundingClientRect():null;
  var r=d.el.getBoundingClientRect();if(!r.width&&target)r={left:target.left,top:target.top+40,width:0};
  var g=d.ghost;
  var finish=function(){g.remove();document.body.classList.remove('dragging');$$('.column.drop').forEach(function(c){c.classList.remove('drop')});d.el.classList.remove('placeholder');drag=null;
    var c=cardById(d.id);
    if(cancel||!colEl||!c){needBoard=false;renderBoard({animate:false});return}
    var toCol=colEl.dataset.col;
    var sibs=$$('.card',colEl.querySelector('.list')).map(function(x){return x.dataset.id});var idx=sibs.indexOf(d.id);
    var p=idx>0?cardById(sibs[idx-1]):null,n=idx>-1&&idx<sibs.length-1?cardById(sibs[idx+1]):null;
    var pos=p&&n?(p.pos+n.pos)/2:p?p.pos+1:n?n.pos-1:1;
    if(colEl.classList.contains('collapsed'))pos=null;
    if(c.col===toCol&&c.pos===pos){needBoard=false;renderBoard({animate:false});return}
    var prev=clone(c);var act=moveCard(c,toCol,pos);
    if(p&&n&&Math.abs(n.pos-p.pos)<1e-6)renumber(toCol);
    needBoard=false;renderAll({animate:false,pop:act&&colById(toCol).kind==='done'?c.id:null});
    if(act)afterMove(c,prev,act);
  };
  if(reduceMotion||!r.width&&cancel){finish();return}
  var anim=g.animate([{transform:g.style.transform},{transform:'translate3d('+r.left+'px,'+r.top+'px,0) rotate(0deg) scale(1)'}],{duration:220,easing:'cubic-bezier(.32,.72,0,1)',fill:'forwards'});
  anim.onfinish=finish;
}
document.addEventListener('pointerdown',function(e){if(e.target.closest('#board'))onDown(e)});
window.addEventListener('pointermove',function(e){if(pending||drag)onMove(e.clientX,e.clientY)});
window.addEventListener('pointerup',function(){end(false)});
window.addEventListener('pointercancel',function(){if(drag)return;end(true)});
document.addEventListener('touchmove',function(e){if(drag){e.preventDefault();var t=e.touches[0];if(t)onMove(t.clientX,t.clientY)}},{passive:false});
document.addEventListener('touchend',function(){if(drag)end(false)});
document.addEventListener('contextmenu',function(e){if(drag||pending&&pending.type!=='mouse')e.preventDefault()});

/* ---------- Layers ---------- */
var openSnapshot=null;
function openCard(id){ui.open=id;ui.settings=false;ui.drawer=false;ui.outcome=null;ui.newTag=false;var c=cardById(id);openSnapshot=c?JSON.stringify(c):null;renderLayer(true);renderHeader()}
function openOutcome(id,actId){ui.outcome={id:id,act:actId};ui.open=null;ui.settings=false;ui.drawer=false;renderLayer(true)}
function closeLayer(){
  var root=$('#layer-root');var layer=root.firstElementChild;
  if(ui.open&&editable()){var c=cardById(ui.open);if(c&&openSnapshot){var o=JSON.parse(openSnapshot);var ch=['title','notes','tag','priority','due','link','budget','budgetPeriod'].some(function(k){return o[k]!==c[k]})||JSON.stringify(o.people)!==JSON.stringify(c.people)||JSON.stringify(o.checklist)!==JSON.stringify(c.checklist);if(ch){if(!c.title.trim()){c.title='Untitled';saveCard(c,0)}addActivity({kind:'edit',card:c.id,title:c.title})}}}
  var annc=ui.open&&editable()&&cardById(ui.open);if(annc&&!annc.announced&&colById(colOf(annc)).kind==='idea'&&linkedMembers(annc).some(function(m){return m.email!==myId}))deferPrompt(annc.id,'created');
  if(ui.notify){var nn=cardById(ui.notify.id);if(nn&&!nn.announced){nn.announced=true;saveCard(nn,0,true)}}
  ui.open=null;ui.settings=false;ui.drawer=false;ui.outcome=null;ui.notify=null;ui.bell=false;openSnapshot=null;
  renderHeader();renderBoard({animate:false});
  if(layer&&!reduceMotion){layer.classList.add('leave');setTimeout(function(){if(!ui.open&&!ui.settings&&!ui.drawer&&!ui.outcome&&!ui.notify&&!ui.bell)root.innerHTML=''},300)}else root.innerHTML='';
  flushAll();runDeferred();
}
function renderLayer(animateIn){
  var root=$('#layer-root');
  if(!ui.open&&!ui.settings&&!ui.drawer&&!ui.outcome&&!ui.notify&&!ui.bell){root.innerHTML='';return}
  var html='',side=false;
  if(ui.open){var c=cardById(ui.open);if(!c){ui.open=null;root.innerHTML='';return}html=sheetHTML(c)}
  else if(ui.outcome){var oc=cardById(ui.outcome.id);if(!oc){ui.outcome=null;root.innerHTML='';return}html=outcomeHTML(oc)}
  else if(ui.notify){var nc=cardById(ui.notify.id);if(!nc){ui.notify=null;root.innerHTML='';return}html=notifyHTML(nc)}
  else if(ui.bell){side=true;html=bellHTML()}
  else if(ui.settings){html=settingsHTML()}
  else {side=true;html=drawerHTML()}
  root.innerHTML='<div class="layer'+(side?' side':'')+(animateIn&&!reduceMotion?' enter':'')+'">'+html+'</div>';
  if(animateIn&&!reduceMotion){var L=root.firstElementChild;L.getBoundingClientRect();requestAnimationFrame(function(){L.classList.remove('enter')})}
  $$('textarea.f-title,textarea.notes',root).forEach(autosize);
  var foc=root.querySelector('[data-autofocus]');if(foc&&animateIn&&editable())setTimeout(function(){foc.focus()},80);
}
function autosize(t){t.style.height='auto';t.style.height=t.scrollHeight+'px'}
function layerFocused(){var a=document.activeElement;return !!(a&&a.closest&&a.closest('#layer-root')&&(a.tagName==='INPUT'||a.tagName==='TEXTAREA'||a.tagName==='SELECT'))}
function rerenderSheetBody(focusId){
  var body=$('#sheet-body');if(!body)return;var st=body.scrollTop;var c=cardById(ui.open);if(!c)return;
  body.innerHTML=sheetBodyHTML(c);body.scrollTop=st;$$('textarea.f-title,textarea.notes',body).forEach(autosize);
  var crumb=$('#crumb');if(crumb){var col=colById(colOf(c));crumb.innerHTML='<i class="dot" style="--c:'+hex(col.color)+'"></i>'+esc(col.name)}
  if(focusId){var f=document.getElementById(focusId);if(f){f.focus();if(f.setSelectionRange&&f.value!=null)try{f.setSelectionRange(f.value.length,f.value.length)}catch(e){}}}
}
function refreshLayerFromData(){
  if(ui.open){if(!cardById(ui.open)){closeLayer();return}if(!layerFocused())rerenderSheetBody()}
  else if(ui.drawer){var b=$('#drawer-body');var st=b?b.scrollTop:0;renderLayer(false);b=$('#drawer-body');if(b)b.scrollTop=st}
  else if(ui.settings&&!layerFocused())rerenderSettings();
  else if(ui.bell){var bb2=$('#drawer-body');var st2=bb2?bb2.scrollTop:0;renderLayer(false);bb2=$('.drawer .sheet-body');if(bb2)bb2.scrollTop=st2}
}
function sheetHTML(c){
  var col=colById(colOf(c));
  return '<div class="scrim" data-close></div><section class="sheet" role="dialog" aria-modal="true" aria-label="Project details">'+
   '<div class="sheet-bar"><span class="crumb" id="crumb"><i class="dot" style="--c:'+hex(col.color)+'"></i>'+esc(col.name)+'</span><span class="grow"></span><button class="icon-btn sm" data-close aria-label="Close">'+I.x+'</button></div>'+
   '<div class="sheet-body" id="sheet-body">'+sheetBodyHTML(c)+'</div></section>';
}
function seg(name,opts,val,ed){return '<div class="seg" role="radiogroup">'+opts.map(function(o){return '<button role="radio" aria-checked="'+(o.v===val)+'" class="'+(o.v===val?'on':'')+'" data-act="'+name+'" data-val="'+esc(o.v)+'"'+(ed?'':' disabled')+'>'+(o.dot?'<i class="dot" style="--c:'+o.dot+'"></i>':'')+esc(o.l)+'</button>'}).join('')+'</div>'}
function reasonChips(kind,attr){return '<div class="reason-chips">'+REASONS[kind].map(function(r){return '<button class="rchip" data-act="'+attr+'" data-val="'+esc(r)+'">'+esc(r)+'</button>'}).join('')+'</div>'}
function outcomeSection(c,ed){
  var kind=colById(colOf(c)).kind;if(kind!=='done'&&kind!=='dropped')return '';
  var label=kind==='done'?'What came of it':'Why it was scrapped';
  var txt=c.outcome?c.outcome.text:'';
  if(!ed)return '<div class="sec outcome k-'+kind+'"><h4>'+label+'</h4><p class="notes-ro">'+(txt?esc(txt):'<span style="color:var(--fg3)">No reason given.</span>')+'</p></div>';
  return '<div class="sec outcome k-'+kind+'"><h4>'+label+'</h4>'+reasonChips(kind,'reason-sheet')+'<textarea id="f-outcome" class="notes short" rows="1" placeholder="'+(kind==='done'?'One line on the result. It shows on the card and in the Monday summary.':'One line on why. It shows on the card and in the Monday summary.')+'" aria-label="'+label+'">'+esc(txt)+'</textarea></div>';
}
function sheetBodyHTML(c){
  var ed=editable(),t=tagById(c.tag);var h='';
  h+=ed?'<textarea id="f-title" class="f-title" rows="1" placeholder="Project name" aria-label="Project name">'+esc(c.title)+'</textarea>':'<h2 class="f-title">'+esc(c.title)+'</h2>';
  h+=seg('status',meta.columns.map(function(x){return {v:x.id,l:x.name,dot:hex(x.color)}}),colOf(c),ed);
  var sd=stalledDays(c);
  if(sd)h+='<div class="stale-note">'+I.clock+'<span>No changes in '+sd+' days. Move it, update it, or scrap it.</span></div>';
  h+=outcomeSection(c,ed);
  h+='<dl class="props">';
  h+='<div class="prop"><dt>People</dt><dd>'+c.people.map(function(p){return '<span class="pchip'+(ed?'':' ro')+(memberFor(p)?'':' unlinked')+'"'+(memberFor(p)?'':' title="Not on the board yet, so they can’t be notified. Add them under People in Settings."')+'><span class="av" style="--c:'+personColor(p)+'">'+esc(initials(p))+'</span>'+esc(p)+(ed?'<button data-act="person-del" data-val="'+esc(p)+'" aria-label="Remove '+esc(p)+'">'+I.xs+'</button>':'')+'</span>'}).join('')+
    (ed?'<input id="f-person" class="person-input" list="people-list" placeholder="'+(c.people.length?'Add':'Add a person')+'" aria-label="Add a person" autocomplete="off"><datalist id="people-list">'+peopleSuggestions(c).map(function(n){return '<option value="'+esc(n)+'">'}).join('')+'</datalist>':(c.people.length?'':'<span class="ro">—</span>'))+'</dd></div>';
  h+='<div class="prop"><dt>Business</dt><dd>'+(ed?(ui.newTag?'<span class="inline-new"><input id="f-newtag" placeholder="New business name" aria-label="New business name"><button class="primary sm" data-act="newtag-save">Add</button></span>':'<select id="f-tag" aria-label="Business"><option value="">None</option>'+meta.tags.map(function(x){return '<option value="'+esc(x.id)+'"'+(x.id===c.tag?' selected':'')+'>'+esc(x.name)+'</option>'}).join('')+'<option value="__new">New business…</option></select>'):(t?'<span class="tag" style="--c:'+hex(t.color)+'">'+esc(t.name)+'</span>':'<span class="ro">—</span>'))+'</dd></div>';
  h+='<div class="prop"><dt>Priority</dt><dd>'+(ed?seg('prio',[{v:'',l:'None'},{v:'low',l:'Low'},{v:'med',l:'Medium'},{v:'high',l:'High'}],c.priority,ed):'<span class="ro">'+({'':'—',low:'Low',med:'Medium',high:'High'}[c.priority]||'—')+'</span>')+'</dd></div>';
  h+='<div class="prop"><dt>Ad budget</dt><dd>'+(ed?'<span class="money-in"><span>$</span><input id="f-budget" inputmode="decimal" autocomplete="off" placeholder="0" value="'+(c.budget?Math.round(c.budget).toLocaleString('en-US'):'')+'" aria-label="Ad budget in dollars"></span><span class="bper">'+seg('bper',[{v:'total',l:'Total'},{v:'month',l:'Per month'}],c.budgetPeriod,ed)+'</span>':'<span class="ro">'+(c.budget?esc(budgetLabel(c,false))+(c.budgetPeriod==='month'?'':' total'):'—')+'</span>')+'</dd></div>';
  h+='<div class="prop"><dt>Due</dt><dd>'+(ed?'<input type="date" id="f-due" value="'+esc(c.due)+'" aria-label="Due date">'+(c.due?'<button class="ghost" data-act="due-clear">Clear</button>':''):'<span class="ro">'+(c.due?esc(fmtDue(c.due)):'—')+'</span>')+'</dd></div>';
  var safe=/^https?:\/\//i.test(c.link)?c.link:(c.link?'https://'+c.link:'');
  h+='<div class="prop"><dt>Link</dt><dd>'+(ed?'<input type="url" id="f-link" value="'+esc(c.link)+'" placeholder="https://" aria-label="Link">':'')+(c.link?'<a href="'+esc(safe)+'" target="_blank" rel="noopener noreferrer">'+(ed?'Open':esc(c.link.replace(/^https?:\/\//,'')))+' ↗</a>':(ed?'':'<span class="ro">—</span>'))+'</dd></div>';
  h+='</dl>';
  h+='<div class="sec"><h4>Notes</h4>'+(ed?'<textarea id="f-notes" class="notes" placeholder="What is this, why it matters, what’s next…" aria-label="Notes">'+esc(c.notes)+'</textarea>':(c.notes?'<p class="notes-ro">'+esc(c.notes)+'</p>':'<p class="notes-ro" style="color:var(--fg3)">No notes yet.</p>'))+'</div>';
  var dn=c.checklist.filter(function(x){return x.done}).length,n=c.checklist.length;
  if(ed||n){
    h+='<div class="sec"><h4>Checklist'+(n?'<span>'+dn+' of '+n+'</span>':'')+'</h4>'+(n?'<div class="progress"><i style="width:'+Math.round(dn/n*100)+'%"></i></div>':'')+
     '<ul class="checks">'+c.checklist.map(function(x){return '<li class="'+(x.done?'done':'')+'"><button class="circle" data-act="check" data-id="'+esc(x.id)+'" role="checkbox" aria-checked="'+(!!x.done)+'" aria-label="'+esc(x.text)+'"'+(ed?'':' disabled')+'>'+(x.done?I.check:'')+'</button>'+(ed?'<input class="check-text" data-check-text="'+esc(x.id)+'" value="'+esc(x.text)+'" aria-label="Step"><button class="icon-btn xs" data-act="check-del" data-id="'+esc(x.id)+'" aria-label="Remove step">'+I.xs+'</button>':'<span>'+esc(x.text)+'</span>')+'</li>'}).join('')+'</ul>'+
     (ed?'<input id="f-check-new" class="check-new" placeholder="Add a step" aria-label="Add a step">':'')+'</div>';
  }
  var hist=activity.filter(function(a){return a.card===c.id}).slice(0,6);
  if(hist.length)h+='<div class="sec"><h4>History</h4><ul class="hist">'+hist.map(function(a){return '<li><span>'+histText(a)+'</span><time>'+ago(a.t)+'</time></li>'}).join('')+'</ul></div>';
  h+='<div class="sheet-foot"><span>Created '+fmtDate(c.created)+' · Updated '+ago(c.updated)+'</span>'+(ed?'<button class="danger-btn" data-act="delete">'+I.trash.replace('<svg','<svg style="display:inline;vertical-align:-2px;margin-right:4px"')+'<span>Delete project</span></button>':'')+'</div>';
  return h;
}
function who(a){var n=a.by&&names[a.by];return n?esc(n)+' ':''}
function histText(a){
  var w=who(a);
  if(a.kind==='move')return (w?w+'moved it':'Moved')+' from '+esc(colById(a.from).name)+' to '+esc(colById(a.to).name)+(a.reason?' · “'+esc(a.reason)+'”':'');
  if(a.kind==='add')return (w?w+'added it':'Added')+' to '+esc(colById(a.to).name);
  if(a.kind==='edit')return w?w+'updated details':'Details updated';
  if(a.kind==='delete')return w?w+'deleted it':'Deleted';
  return esc(a.text||'');
}
function outcomeHTML(c){
  var kind=colById(colOf(c)).kind;var done=kind==='done';
  return '<div class="scrim" data-close></div><section class="sheet compact" role="dialog" aria-modal="true" aria-label="'+(done?'Project outcome':'Reason for scrapping')+'">'+
   '<div class="sheet-bar"><span class="crumb"><i class="dot" style="--c:'+hex(colById(colOf(c)).color)+'"></i>'+esc(colById(colOf(c)).name)+'</span><span class="grow"></span><button class="icon-btn sm" data-close aria-label="Close">'+I.x+'</button></div>'+
   '<div class="sheet-body">'+
    '<h2 class="o-title">'+(done?'What came of “':'Why scrap “')+esc(c.title)+'”?</h2>'+
    '<p class="o-lede">One line is enough. It shows on the card and in the Monday summary.</p>'+
    reasonChips(kind,'reason-pick')+
    '<textarea id="o-text" class="notes short" rows="2" data-autofocus placeholder="'+(done?'e.g. Live, 40 calls a day at $28 CPL':'e.g. CPL never got under $60')+'" aria-label="Reason">'+esc(c.outcome?c.outcome.text:'')+'</textarea>'+
    '<div class="o-actions"><button class="ghost" data-close>Skip</button><button class="primary sm" data-act="outcome-save">Save</button></div>'+
   '</div></section>';
}
function settingsHTML(){
  var h='<div class="scrim" data-close></div><section class="sheet" role="dialog" aria-modal="true" aria-label="Board settings">'+
  '<div class="sheet-bar"><h3>Board settings</h3><span class="grow"></span><button class="primary sm" data-close>Done</button></div><div class="sheet-body" id="settings-body">'+settingsBody()+'</div></section>';
  return h;
}
function settingsBody(){
  var h='';
  h+='<label class="field"><span>Board name</span><input id="s-name" value="'+esc(meta.name)+'"></label>';
  h+='<label class="field"><span>Small label above the name</span><input id="s-eyebrow" value="'+esc(meta.eyebrow||'')+'" placeholder="Optional"></label>';
  h+='<div class="sec"><h4>Flag a project as stalled after</h4>'+seg('stale',[{v:'7',l:'7 days'},{v:'14',l:'14 days'},{v:'30',l:'30 days'},{v:'0',l:'Never'}],String(meta.staleDays),true)+'<p class="help">Only projects in an in-progress column get flagged. Any edit or move resets the clock.</p></div>';
  h+='<div class="sec"><h4>Columns</h4><ul class="rows">'+meta.columns.map(function(col,i){var n=cardList().filter(function(c){return colOf(c)===col.id}).length;return '<li><button class="swatch" data-act="col-color" data-id="'+esc(col.id)+'" style="--c:'+hex(col.color)+'" aria-label="Change color"></button><input data-col-name="'+esc(col.id)+'" value="'+esc(col.name)+'" aria-label="Column name"><small>'+n+'</small><button class="icon-btn sm" data-act="col-up" data-id="'+esc(col.id)+'" aria-label="Move left"'+(i===0?' disabled':'')+'>'+I.up+'</button><button class="icon-btn sm" data-act="col-down" data-id="'+esc(col.id)+'" aria-label="Move right"'+(i===meta.columns.length-1?' disabled':'')+'>'+I.down+'</button><button class="icon-btn sm" data-act="col-del" data-id="'+esc(col.id)+'" aria-label="Delete column" title="'+(n?'Move its projects out first':'Delete column')+'"'+(n||meta.columns.length<2?' disabled style="opacity:.35"':'')+'>'+I.trash+'</button></li>'}).join('')+'</ul><button class="ghost" style="margin-top:6px" data-act="col-add">+ Add column</button></div>';
  h+='<div class="sec"><h4>Businesses</h4><ul class="rows">'+(meta.tags.length?meta.tags.map(function(t){var n=cardList().filter(function(c){return c.tag===t.id}).length;return '<li><button class="swatch" data-act="tag-color" data-id="'+esc(t.id)+'" style="--c:'+hex(t.color)+'" aria-label="Change color"></button><input data-tag-name="'+esc(t.id)+'" value="'+esc(t.name)+'" aria-label="Business name"><small>'+n+(n===1?' project':' projects')+'</small><button class="icon-btn sm" data-act="tag-del" data-id="'+esc(t.id)+'" aria-label="Delete business">'+I.trash+'</button></li>'}).join(''):'<li><small>No businesses yet</small></li>')+'</ul><button class="ghost" style="margin-top:6px" data-act="tag-add">+ Add business</button></div>';
  h+=peopleHTML();
  return h;
}
function peopleHTML(){
  ui.expanded=ui.expanded||{};
  var h='<div class="sec" id="people"><h4>People<span>'+members.length+'</span></h4><ul class="rows people-rows">'+members.map(function(m){
    var nm=m.name||m.email.split('@')[0];var me=m.email===myId;var linked=cardsFor(m);var open=!!ui.expanded[m.email];var on=m.notify!==false;
    var row='<li><span class="av" style="--c:'+personColor(m.name||m.email)+'">'+esc(initials(nm))+'</span><button class="pm pm-btn" data-act="m-expand" data-email="'+esc(m.email)+'" aria-expanded="'+open+'"><b>'+esc(nm)+(me?' <small class="you">you</small>':'')+'</b><small>'+esc(m.email)+' · '+linked.length+(linked.length===1?' project':' projects')+(m.role==='admin'?'':' · sees '+esc(scopeLabel(m)))+' '+(open?'▴':'▾')+'</small></button>'+
      '<button class="icon-btn sm n-switch'+(on?' is-on':'')+'" data-act="m-notify" data-email="'+esc(m.email)+'" aria-pressed="'+on+'" title="'+(on?'Notifications on':'Notifications off')+'" aria-label="'+(on?'Turn off notifications for ':'Turn on notifications for ')+esc(nm)+'">'+(on?I.bell:I.belloff)+'</button>'+
      (me?'<span class="role-pill">Admin</span>':'<div class="seg mini" role="radiogroup" aria-label="Role for '+esc(nm)+'">'+['viewer','admin'].map(function(r){return '<button role="radio" aria-checked="'+(m.role===r)+'" class="'+(m.role===r?'on':'')+'" data-act="m-role" data-email="'+esc(m.email)+'" data-val="'+r+'">'+(r==='admin'?'Admin':'Viewer')+'</button>'}).join('')+'</div><button class="icon-btn sm" data-act="m-del" data-email="'+esc(m.email)+'" aria-label="Remove '+esc(nm)+'">'+I.trash+'</button>')+'</li>';
    if(open)row+='<li class="linked">'+scopeEd(m,me)+(linked.length?'<ul>'+linked.map(function(c){var col=colById(colOf(c));return '<li><i class="dot" style="--c:'+hex(col.color)+'"></i><span>'+esc(c.title)+'</span><small>'+esc(col.name)+'</small><button class="ghost" data-act="m-unlink" data-email="'+esc(m.email)+'" data-card="'+esc(c.id)+'">Unlink</button></li>'}).join('')+'</ul>':'<p class="help">Not linked to any project. Add '+esc(nm)+' under People on a project to link them.</p>')+'</li>';
    return row}).join('')+'</ul>'+
    '<form class="add-person" id="add-person" novalidate><input id="m-email" type="email" placeholder="Email address" aria-label="Email address" autocomplete="off"><input id="m-name" placeholder="Name (as used on projects)" aria-label="Name" autocomplete="off"><select id="m-role" aria-label="Role"><option value="viewer">Viewer</option><option value="admin">Admin</option></select><select id="m-scope" aria-label="What they can see"><option value="linked">Sees their projects</option><option value="all">Sees everything</option><option value="businesses">Sees certain businesses…</option></select><button class="primary sm" type="submit">Add</button></form>'+
    '<p class="help">A person is linked to a project when their name here matches a name in the project’s People. Tap a person to see and unlink their projects; the bell turns their notifications on or off. New people sign in at <b>'+esc(location.host||'the board address')+'</b> with “Create your password”.</p></div>';
  return h;
}
function scopeLabel(m){if(m.role==='admin')return 'everything';if(m.scope==='linked')return 'only their projects';if(m.scope==='businesses'){var ns=(m.tags||[]).map(function(id){var t=tagById(id);return t?t.name:null}).filter(Boolean);return ns.length?ns.join(', ')+' + their projects':'only their projects'}return 'everything'}
function scopeEd(m,me){
  if(m.role==='admin')return '<p class="help scope-note">Admins see and change everything.</p>';
  if(me)return '';
  var sc=m.scope||'all';
  var h='<div class="scope-ed"><span class="scope-l">Can see</span><div class="seg mini" role="radiogroup" aria-label="What '+esc(m.name||m.email)+' can see">'+[['all','Everything'],['linked','Their projects'],['businesses','Certain businesses']].map(function(o){return '<button role="radio" aria-checked="'+(sc===o[0])+'" class="'+(sc===o[0]?'on':'')+'" data-act="m-scope" data-email="'+esc(m.email)+'" data-val="'+o[0]+'">'+o[1]+'</button>'}).join('')+'</div>';
  if(sc==='businesses')h+='<div class="scope-tags">'+(meta.tags.length?meta.tags.map(function(t){var on=(m.tags||[]).indexOf(t.id)>-1;return '<button class="chip'+(on?' on':'')+'" data-act="m-tag" data-email="'+esc(m.email)+'" data-val="'+esc(t.id)+'" style="--c:'+hex(t.color)+'" aria-pressed="'+on+'"><i></i>'+esc(t.name)+'</button>'}).join(''):'<span class="help">Add businesses first.</span>')+'</div>';
  h+='<p class="help scope-note">'+(sc==='all'?'They see every project on the board.':sc==='linked'?'They only see projects where they’re listed under People.':'They see every project in the ticked businesses, plus any project they’re listed on.')+'</p></div>';
  return h;
}
function updateMember(m,patch,undoPatch){Object.keys(patch).forEach(function(k){m[k]=patch[k]});rerenderSettings();sb.from('members').update(patch).eq('email',m.email).then(function(r){if(r.error){Object.keys(undoPatch).forEach(function(k){m[k]=undoPatch[k]});rerenderSettings();toast('Couldn’t change that. '+r.error.message)}})}
function addMember(){
  var e=($('#m-email').value||'').trim().toLowerCase(),n=($('#m-name').value||'').trim(),r=$('#m-role').value,sc=$('#m-scope')?$('#m-scope').value:'all';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){toast('Enter an email address to add someone.');$('#m-email').focus();return}
  if(members.some(function(m){return m.email===e})){toast(e+' is already on the board.');return}
  sb.from('members').insert({email:e,name:n,role:r,scope:sc,tags:[]}).then(function(res){if(res.error){toast('Couldn’t add them. '+res.error.message);return}
    members.push({email:e,name:n,role:r,scope:sc,tags:[]});if(sc==='businesses'&&r!=='admin'){ui.expanded=ui.expanded||{};ui.expanded[e]=true}rerenderSettings();toast('Added '+(n||e)+'. Send them the board address.');var me=$('#m-email');if(me)me.focus()});
}
function setRole(email,role){var m=members.filter(function(x){return x.email===email})[0];if(!m||m.role===role)return;var old=m.role;m.role=role;rerenderSettings();
  sb.from('members').update({role:role}).eq('email',email).then(function(res){if(res.error){m.role=old;rerenderSettings();toast('Couldn’t change that. '+res.error.message)}})}
function removeMember(email){var prev=members.slice(),goneM=members.filter(function(x){return x.email===email})[0];members=members.filter(function(x){return x.email!==email});rerenderSettings();
  sb.from('members').delete().eq('email',email).then(function(res){if(res.error){members=prev;rerenderSettings();toast('Couldn’t remove them. '+res.error.message);return}toast('Removed '+((goneM&&goneM.name)||email)+'. They can no longer see the board.',{label:'Undo',fn:function(){if(!goneM)return;sb.from('members').insert({email:goneM.email,name:goneM.name,role:goneM.role}).then(function(r){if(r.error){toast('Couldn’t undo. '+r.error.message);return}if(!members.some(function(x){return x.email===goneM.email}))members.push(goneM);rerenderSettings()})}})})}
function rerenderSettings(){var b=$('#settings-body');if(!b)return;var st=b.scrollTop;b.innerHTML=settingsBody();b.scrollTop=st}
function drawerHTML(){
  var wk=Date.now()-7*DAY;var recent=activity.filter(function(a){return a.t>=wk});
  var added=recent.filter(function(a){return a.kind==='add'}).length;
  var moved=recent.filter(function(a){return a.kind==='move'}).length;
  var done=recent.filter(function(a){return a.kind==='move'&&colById(a.to).kind==='done'}).length;
  var h='<div class="scrim clear" data-close></div><aside class="drawer" role="dialog" aria-label="What’s moving"><div class="sheet-bar"><h3>What’s moving</h3><span class="grow"></span><button class="icon-btn sm" data-close aria-label="Close">'+I.x+'</button></div><div class="sheet-body" id="drawer-body">';
  h+='<div class="pulse-stats"><div class="stat"><b>'+added+'</b><span>Added this week</span></div><div class="stat"><b>'+moved+'</b><span>Moves this week</span></div><div class="stat"><b>'+done+'</b><span>Finished this week</span></div></div>';
  var st=stalledCards();
  if(st.length){h+='<div class="stalled-box"><p class="feed-day warm">'+I.clock+' Stalled</p><ul class="stalled-list">'+st.slice(0,8).map(function(c){var t=tagById(c.tag);return '<li><button data-open="'+esc(c.id)+'"><b>'+esc(c.title)+'</b>'+(t?'<span class="tag" style="--c:'+hex(t.color)+'">'+esc(t.name)+'</span>':'')+'</button><time>'+stalledDays(c)+'d</time></li>'}).join('')+'</ul></div>'}
  if(!activity.length)h+='<p class="empty-feed">Nothing has moved yet.</p>';
  var lastDay=null,open=false;
  activity.slice(0,100).forEach(function(a){
    var ds=dayStart(a.t),today=dayStart(Date.now());var label=ds===today?'Today':ds===today-DAY?'Yesterday':fmtDate(a.t);
    if(label!==lastDay){if(open)h+='</ol></div>';h+='<div><p class="feed-day">'+esc(label)+'</p><ol class="feed">';open=true;lastDay=label}
    var col=a.to?colById(a.to):a.from?colById(a.from):{color:'gray'};var icon=a.kind==='add'?I.spark:a.kind==='move'?I.arrow:a.kind==='delete'?I.trash:a.kind==='edit'?I.pencil:I.spark;
    var exists=a.card&&cardById(a.card);var w=who(a);
    var pill=function(id){var cc=colById(id);return '<span class="pill" style="--c:'+hex(cc.color)+'"><i></i>'+esc(cc.name)+'</span>'};
    var text=a.kind==='move'?(w?w+'moved ':'')+'<b>'+esc(a.title)+'</b> '+(w?'to ':'moved to ')+pill(a.to):
      a.kind==='add'?(w?w+'added ':'')+'<b>'+esc(a.title)+'</b> '+(w?'to ':'added to ')+pill(a.to):
      a.kind==='delete'?(w?w+'deleted ':'')+'<b>'+esc(a.title)+'</b>'+(w?'':' was deleted'):
      a.kind==='edit'?(w?w+'updated ':'')+'<b>'+esc(a.title)+'</b>'+(w?'':' details updated'):esc(a.text||'');
    if(a.reason)text+='<span class="reason">'+esc(a.reason)+'</span>';
    h+='<li><span class="ico" style="--c:'+hex(col.color)+'">'+icon+'</span><button '+(exists?'data-open="'+esc(a.card)+'"':'disabled')+'>'+text+'</button><time>'+clock(a.t)+'</time></li>';
  });
  if(open)h+='</ol></div>';
  return h+'</div></aside>';
}

/* ---------- Right-click menu (and the ⋯ button on cards) ---------- */
var menuState=null;
function closeMenu(){var m=document.getElementById('ctx');if(m)m.remove();menuState=null}
function openMenu(id,x,y,view){
  var c=cardById(id);if(!c)return;
  var old=document.getElementById('ctx');if(old)old.remove();
  menuState={id:id,x:x,y:y,view:view||'main'};
  var m=document.createElement('div');m.id='ctx';m.className='ctx';m.setAttribute('role','menu');m.setAttribute('aria-label','Project actions');
  m.innerHTML=menuHTML(c,menuState.view);document.body.appendChild(m);
  var r=m.getBoundingClientRect(),vw=window.innerWidth,vh=window.innerHeight;
  m.style.left=Math.max(8,Math.min(x,vw-r.width-8))+'px';m.style.top=Math.max(8,Math.min(y,vh-r.height-8))+'px';
  var f=m.querySelector('[data-ctx]');if(f)f.focus({preventScroll:true});
}
function rerenderMenu(view){if(menuState)openMenu(menuState.id,menuState.x,menuState.y,view)}
function mi(act,label,o){o=o||{};return '<button class="ctx-item'+(o.danger?' danger':'')+(o.on?' on':'')+'" role="menuitem" data-ctx="'+act+'"'+(o.val!=null?' data-val="'+esc(o.val)+'"':'')+'>'+(o.icon||'<span class="ctx-ico"></span>')+'<span class="ctx-label">'+label+'</span>'+(o.hint?'<span class="ctx-hint">'+o.hint+'</span>':'')+(o.more?'<span class="ctx-more">›</span>':'')+'</button>'}
function isoDay(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function menuHTML(c,view){
  var ed=editable(),col=colOf(c);
  var back='<button class="ctx-back" data-ctx="back">‹ '+esc(c.title.length>30?c.title.slice(0,28)+'…':c.title)+'</button>';
  if(view==='move')return back+meta.columns.map(function(x){return mi('move',esc(x.name),{val:x.id,on:x.id===col,icon:'<i class="dot" style="--c:'+hex(x.color)+'"></i>'})}).join('');
  if(view==='tag')return back+mi('tag','None',{val:'',on:!c.tag})+meta.tags.map(function(t){return mi('tag',esc(t.name),{val:t.id,on:c.tag===t.id,icon:'<i class="dot" style="--c:'+hex(t.color)+'"></i>'})}).join('');
  if(view==='people'){var ppl=allPeople();return back+ppl.map(function(p){return mi('person',esc(p.name),{val:p.name,on:c.people.indexOf(p.name)>-1,icon:'<span class="av mini" style="--c:'+personColor(p.name)+'">'+esc(initials(p.name))+'</span>'})}).join('')+(ppl.length?'<div class="ctx-sep"></div>':'')+mi('open-people','Add someone new…')}
  if(view==='due'){var t=new Date(),d1=new Date(t),nm=new Date(t),n2=new Date(t);d1.setDate(t.getDate()+1);nm.setDate(t.getDate()+(((8-t.getDay())%7)||7));n2.setDate(t.getDate()+14);
    return back+mi('due','Today',{val:isoDay(t),hint:DAYS[t.getDay()]})+mi('due','Tomorrow',{val:isoDay(d1),hint:DAYS[d1.getDay()]})+mi('due','Next Monday',{val:isoDay(nm),hint:MONTHS[nm.getMonth()]+' '+nm.getDate()})+mi('due','In 2 weeks',{val:isoDay(n2),hint:MONTHS[n2.getMonth()]+' '+n2.getDate()})+'<div class="ctx-sep"></div>'+mi('open-due','Pick a date…')+(c.due?mi('due','Clear due date',{val:''}):'')}
  var h='<div class="ctx-title">'+esc(c.title||'Untitled')+'</div>'+mi('open','Open details',{hint:'↵'});
  if(!ed)return h+mi('copy','Copy title');
  h+='<div class="ctx-sep"></div>'+mi('view-move','Move to',{more:true,hint:esc(colById(col).name)});
  h+='<div class="ctx-prio" role="group" aria-label="Priority"><span>Priority</span>'+[['','None'],['low','Low'],['med','Med'],['high','High']].map(function(p){return '<button data-ctx="prio" data-val="'+p[0]+'" class="'+(c.priority===p[0]?'on':'')+'">'+p[1]+'</button>'}).join('')+'</div>';
  var tg=tagById(c.tag);
  h+=mi('view-tag','Business',{more:true,hint:tg?esc(tg.name):'None'});
  h+=mi('view-people','People',{more:true,hint:c.people.length?esc(c.people.length===1?c.people[0]:c.people.length+' people'):'None'});
  h+=mi('view-due','Due date',{more:true,hint:c.due?esc(fmtDue(c.due)):'None'});
  h+=mi('open-budget','Ad budget',{hint:c.budget?esc(budgetLabel(c,true)):'Set…'});
  h+='<div class="ctx-sep"></div>'+mi('dup','Duplicate')+mi('copy','Copy title');
  h+='<div class="ctx-sep"></div>'+mi('delete','Delete',{danger:true,hint:'⌫'});
  return h;
}
function openSheetField(c,id){closeMenu();openCard(c.id);setTimeout(function(){var f=document.getElementById(id);if(f){f.scrollIntoView({block:'center'});f.focus();if(id==='f-due'){try{f.showPicker()}catch(e){}}}},140)}
function ctxAct(el){
  var a=el.dataset.ctx,c=menuState&&cardById(menuState.id);if(!c){closeMenu();return}
  if(a==='back'){rerenderMenu('main');return}
  if(a.indexOf('view-')===0){rerenderMenu(a.slice(5));return}
  if(a==='open'){closeMenu();openCard(c.id);return}
  if(a==='copy'){var txt=c.title;closeMenu();try{navigator.clipboard.writeText(txt).then(function(){toast('Title copied')},function(){toast('Couldn’t copy in this window')})}catch(e){toast('Couldn’t copy in this window')}return}
  if(!editable())return;
  if(a==='move'){var to=el.dataset.val;closeMenu();if(to===c.col)return;var prev=clone(c);var mv=moveCard(c,to);renderAll({pop:colById(to).kind==='done'?c.id:null});if(mv)afterMove(c,prev,mv);return}
  if(a==='prio'){c.priority=el.dataset.val;saveCard(c,0);softRender();rerenderMenu('main');return}
  if(a==='tag'){c.tag=el.dataset.val;saveCard(c,0);closeMenu();softRender();return}
  if(a==='person'){var p=el.dataset.val,i=c.people.indexOf(p);if(i>-1)c.people.splice(i,1);else c.people.push(p);saveCard(c,300);softRender();rerenderMenu('people');return}
  if(a==='due'){c.due=el.dataset.val;saveCard(c,0);closeMenu();softRender();return}
  if(a==='open-people'){openSheetField(c,'f-person');return}
  if(a==='open-due'){openSheetField(c,'f-due');return}
  if(a==='open-budget'){openSheetField(c,'f-budget');return}
  if(a==='dup'){closeMenu();var list=cardsIn(c.col),k=list.indexOf(c),next=list[k+1];var d=clone(c);d.id=uid('c');d.title=c.title+' (copy)';d.pos=next?(c.pos+next.pos)/2:c.pos+1;d.created=Date.now();d.updated=Date.now();d.outcome=null;d.checklist=d.checklist.map(function(x){return {id:uid('k'),text:x.text,done:false}});cards[d.id]=d;saveCard(d,0,true);addActivity({kind:'add',card:d.id,title:d.title,to:d.col});renderAll2({enter:[d.id]});toast('Duplicated “'+(c.title.length>28?c.title.slice(0,26)+'…':c.title)+'”');return}
  if(a==='delete'){closeMenu();deleteCard(c);renderAll();return}
}
document.addEventListener('contextmenu',function(e){
  var card=e.target.closest('#board .card');if(!card||drag||e.target.closest('input,textarea'))return;
  e.preventDefault();openMenu(card.dataset.id,e.clientX,e.clientY);
});
window.addEventListener('resize',closeMenu);
document.addEventListener('scroll',function(e){if(menuState&&!(e.target&&e.target.closest&&e.target.closest('#ctx')))closeMenu()},true);

/* ---------- Notifications: confirm first, send after a 2-minute grace period ---------- */
function memberFor(name){var n=String(name||'').trim().toLowerCase();if(!n)return null;return members.filter(function(m){return (m.name&&m.name.trim().toLowerCase()===n)||m.email===n})[0]||null}
function linkedMembers(c){var seen={},out=[];c.people.forEach(function(p){var m=memberFor(p);if(m&&!seen[m.email]){seen[m.email]=1;out.push(m)}});return out}
function cardsFor(m){return cardList().filter(function(c){return c.people.some(function(p){var x=memberFor(p);return x&&x.email===m.email})})}
function peopleSuggestions(c){var names={};allPeople().forEach(function(p){names[p.name]=1});members.forEach(function(m){if(m.name)names[m.name]=1});return Object.keys(names).filter(function(n){return c.people.indexOf(n)<0}).sort()}
var NOTE_KIND={created:{verb:'added a new idea',ask:'Tell the team about this new idea?',done:'new idea'},started:{verb:'started',ask:'It’s in progress. Notify the team?',done:'start'},done:{verb:'finished',ask:'It’s done. Notify the team?',done:'finish'}};
var deferred=[];
function deferPrompt(id,kind){deferred=deferred.filter(function(d){return d.id!==id});deferred.push({id:id,kind:kind})}
function dropDeferred(id){deferred=deferred.filter(function(d){return d.id!==id})}
function runDeferred(){if(!deferred.length||!editable())return;var d=deferred.shift();setTimeout(function(){if(!ui.open&&!ui.settings&&!ui.drawer&&!ui.outcome&&!ui.notify&&!ui.bell)openNotify(d.id,d.kind);else deferred.unshift(d)},340)}
function cancelPending(cardId,recipient){
  if(!sb||mode!=='live')return;
  var q=sb.from('notifications').update({cancelled:true}).eq('card',cardId).eq('cancelled',false).gt('send_after',Date.now());
  if(recipient)q=q.eq('recipient',recipient);
  q.select('id').then(function(r){if(r&&r.data&&r.data.length)toast(r.data.length===1?'Pending notification cancelled':r.data.length+' pending notifications cancelled')},function(){});
}
function promptForMove(c,act){
  var fk=colById(act.from).kind,tk=colById(act.to).kind,kind=null;
  if(fk==='idea'&&tk==='active')kind='started';else if(fk==='active'&&tk==='done')kind='done';
  if(!kind)return;
  if(!linkedMembers(c).some(function(m){return m.email!==myId}))return;
  if(ui.open||ui.outcome||ui.settings||ui.drawer||ui.bell){deferPrompt(c.id,kind)}else openNotify(c.id,kind);
}
function openNotify(id,kind){var c=cardById(id);if(!c)return;var ms=linkedMembers(c).filter(function(m){return m.email!==myId});if(!ms.length){if(!c.announced){c.announced=true;saveCard(c,0,true)}return}
  ui.notify={id:id,kind:kind,pick:{}};ms.forEach(function(m){ui.notify.pick[m.email]=m.notify!==false});ui.open=null;ui.outcome=null;renderLayer(true)}
function notifyHTML(c){
  var n=ui.notify,K=NOTE_KIND[n.kind],col=colById(colOf(c));
  var ms=linkedMembers(c).filter(function(m){return m.email!==myId});
  var unlinked=c.people.filter(function(p){return !memberFor(p)});
  var count=ms.filter(function(m){return n.pick[m.email]}).length;
  var h='<div class="scrim" data-close></div><section class="sheet compact" role="dialog" aria-modal="true" aria-label="Notify the team">'+
   '<div class="sheet-bar"><span class="crumb"><i class="dot" style="--c:'+hex(col.color)+'"></i>'+esc(col.name)+'</span><span class="grow"></span><button class="icon-btn sm" data-close aria-label="Close without notifying">'+I.x+'</button></div>'+
   '<div class="sheet-body"><h2 class="o-title">“'+esc(c.title)+'”</h2><p class="o-lede">'+K.ask+'</p><ul class="rows notify-list">'+
   ms.map(function(m){var on=!!n.pick[m.email];var nm=m.name||m.email.split('@')[0];return '<li><button class="n-pick'+(on?' on':'')+'" data-act="n-toggle" data-email="'+esc(m.email)+'" role="checkbox" aria-checked="'+on+'"><span class="n-box">'+(on?I.check:'')+'</span><span class="av" style="--c:'+personColor(m.name||m.email)+'">'+esc(initials(nm))+'</span><span class="pm"><b>'+esc(nm)+'</b><small>'+esc(m.email)+(m.notify===false?' · notifications off':'')+'</small></span></button></li>'}).join('')+
   unlinked.map(function(p){return '<li class="n-off"><span class="n-box"></span><span class="av" style="--c:var(--fg3)">'+esc(initials(p))+'</span><span class="pm"><b>'+esc(p)+'</b><small>Not on the board yet. Add them under People to notify them.</small></span></li>'}).join('')+
   '</ul><input id="n-note" class="n-note" placeholder="Add a note (optional)" aria-label="Note" autocomplete="off">'+
   '<div class="o-actions"><button class="ghost" data-act="n-skip">Don’t notify</button><button class="primary sm" data-act="n-send"'+(count?'':' disabled')+'>'+(count?'Notify '+count+(count===1?' person':' people'):'Notify')+'</button></div>'+
   '<p class="help n-help">Sent in 2 minutes. Move it back or undo before then and nobody is notified.</p></div></section>';
  return h;
}
function sendNotifications(){
  var n=ui.notify,c=n&&cardById(n.id);if(!c)return;
  var note=($('#n-note')&&$('#n-note').value||'').trim();
  var ms=linkedMembers(c).filter(function(m){return m.email!==myId&&n.pick[m.email]});
  c.announced=true;saveCard(c,0,true);ui.notify=null;closeLayer();
  if(!ms.length)return;
  var now=Date.now(),rows=ms.map(function(m){return {id:uid('n'),t:now,send_after:now+NOTIFY_DELAY,recipient:m.email,card:c.id,title:c.title,kind:n.kind,by_email:myId||'',note:note,read:false,cancelled:false,emailed:false}});
  sb.from('notifications').insert(rows).then(function(r){
    if(r.error){toast('Couldn’t queue the notification. '+r.error.message);return}
    var names=ms.map(function(m){return m.name||m.email.split('@')[0]});
    toast('Notifying '+(names.length>2?names.slice(0,2).join(', ')+' +'+(names.length-2):names.join(' and '))+' in 2 min',{label:'Undo',fn:function(){sb.from('notifications').update({cancelled:true}).in('id',rows.map(function(x){return x.id})).then(function(){toast('Notification cancelled')})}});
  });
}
function watchNotes(){watch('notifications',{eq:['recipient',myId],ord:['t','desc'],lim:150},function(rows){myNotes=rows;renderHeader();if(ui.bell)renderLayer(false)},function(){})}
function visibleNotes(){var now=Date.now();return myNotes.filter(function(n){return !n.cancelled&&n.send_after<=now})}
function bellHTML(){
  var list=visibleNotes();
  var h='<div class="scrim clear" data-close></div><aside class="drawer" role="dialog" aria-label="Notifications"><div class="sheet-bar"><h3>Notifications</h3><span class="grow"></span>'+(list.some(function(n){return !n.read})?'<button class="ghost" data-mark-all>Mark all read</button>':'')+'<button class="icon-btn sm" data-close aria-label="Close">'+I.x+'</button></div><div class="sheet-body">';
  if(!list.length)h+='<p class="empty-feed">You’re all caught up. When someone adds you to a project or moves one you’re on, it shows up here.</p>';
  h+='<ol class="feed">'+list.map(function(n){var by=memberFor(n.by_email);var who=by?(by.name||by.email.split('@')[0]):'Someone';var K=NOTE_KIND[n.kind]||NOTE_KIND.started;var exists=cardById(n.card);
    return '<li class="'+(n.read?'':'unread')+'"><span class="ico" style="--c:'+(n.kind==='done'?PALETTE.green:n.kind==='started'?PALETTE.blue:PALETTE.indigo)+'">'+(n.kind==='done'?I.check:n.kind==='started'?I.arrow:I.spark)+'</span><button '+(exists?'data-open-note="'+esc(n.id)+'" data-card="'+esc(n.card)+'"':'disabled')+'>'+esc(who)+' '+K.verb+' <b>'+esc(n.title)+'</b>'+(n.note?'<span class="reason">'+esc(n.note)+'</span>':'')+'</button><time>'+ago(n.t)+'</time></li>'}).join('')+'</ol>';
  return h+'</div></aside>';
}
function markRead(ids){ids=ids.filter(Boolean);if(!ids.length||!sb)return;myNotes.forEach(function(n){if(ids.indexOf(n.id)>-1)n.read=true});renderHeader();sb.from('notifications').update({read:true}).in('id',ids).then(function(){},function(){})}

/* ---------- Money ---------- */
function money(n,compact){if(!n)return '';if(compact&&n>=1000){var k=n/1000;return '$'+(k>=100?Math.round(k):Math.round(k*10)/10)+'k'}return '$'+Math.round(n).toLocaleString('en-US')}
function budgetLabel(c,compact){return c.budget?money(c.budget,compact)+(c.budgetPeriod==='month'?'/mo':''):''}

/* ---------- Names for "who did what" (ids stored, names resolved per viewer) ---------- */
function resolveNames(){
  if(!user)return;var ids={};activity.forEach(function(a){if(a.by)ids[a.by]=1});ids=Object.keys(ids);if(!ids.length)return;
  user.profiles(ids).then(function(ps){var ch=false;ids.forEach(function(id){var n=(ps&&ps[id]&&ps[id].name)||'';var first=n.split(/\s+/)[0]||'';if(names[id]!==first){names[id]=first;ch=true}});if(ch)refreshLayerFromData()}).catch(function(){});
}

/* ---------- Events ---------- */
document.addEventListener('click',function(e){
  var t=e.target;
  var mb=t.closest('[data-more]');if(mb){e.stopPropagation();if(menuState&&menuState.id===mb.dataset.more){closeMenu();return}var br=mb.getBoundingClientRect();openMenu(mb.dataset.more,br.right-240,br.bottom+6);return}
  var ci=t.closest('#ctx [data-ctx]');if(ci){ctxAct(ci);return}
  if(t.closest('#ctx'))return;
  if(menuState){closeMenu();return}
  var menu=$('#acct-menu');
  if(t.closest('#btn-acct')){menu.hidden=!menu.hidden;$('#btn-acct').setAttribute('aria-expanded',String(!menu.hidden));return}
  if(menu&&!menu.hidden&&!t.closest('#acct-menu')){menu.hidden=true;$('#btn-acct').setAttribute('aria-expanded','false')}
  if(t.closest('[data-signout]')){if(sb)sb.auth.signOut().then(function(){location.reload()});return}
  var am=t.closest('[data-auth-mode]');if(am){authMode=am.dataset.authMode;renderBoard();return}
  if(t.closest('[data-close]')){closeLayer();return}
  var card=t.closest('#board .card');
  if(card){if(suppressClick)return;openCard(card.dataset.id);return}
  var el;
  if((el=t.closest('[data-open]'))){openCard(el.dataset.open);return}
  if((el=t.closest('[data-add]'))){e.preventDefault();ui.quickAdd=el.dataset.add;ui.quickDraft='';if(ui.collapsed[ui.quickAdd]){delete ui.collapsed[ui.quickAdd];lsSet('mvb-collapsed',ui.collapsed)}renderBoard({animate:false,focusQuick:true});var f=$('.quick');if(f)f.scrollIntoView({block:'nearest',inline:'nearest',behavior:reduceMotion?'auto':'smooth'});return}
  if(t.closest('[data-quick-cancel]')){ui.quickAdd=null;ui.quickDraft='';renderBoard({animate:false});return}
  if((el=t.closest('[data-collapse]'))){var id=el.dataset.collapse;if(ui.collapsed[id])delete ui.collapsed[id];else ui.collapsed[id]=1;lsSet('mvb-collapsed',ui.collapsed);renderBoard({animate:false});return}
  if((el=t.closest('.column.collapsed'))&&!drag&&el.dataset.col){delete ui.collapsed[el.dataset.col];lsSet('mvb-collapsed',ui.collapsed);renderBoard({animate:false});return}
  if((el=t.closest('[data-jump]'))){var cid=el.dataset.jump;if(ui.collapsed[cid]){delete ui.collapsed[cid];lsSet('mvb-collapsed',ui.collapsed);renderBoard({animate:false})}var ce=$('.column[data-col="'+cid+'"]');if(ce){ce.scrollIntoView({behavior:reduceMotion?'auto':'smooth',inline:'start',block:'nearest'});if(!reduceMotion)ce.animate([{boxShadow:'0 0 0 3px '+getComputedStyle(ce).getPropertyValue('--c')},{boxShadow:'0 0 0 0 transparent'}],{duration:900,easing:'ease-out'})}return}
  if(t.closest('[data-filter-all]')){ui.tag=null;ui.person=null;ui.stale=false;renderChips();renderBoard();return}
  if(t.closest('[data-filter-stale]')){ui.stale=!ui.stale;renderChips();renderBoard();return}
  if((el=t.closest('[data-filter-tag]'))){ui.tag=ui.tag===el.dataset.filterTag?null:el.dataset.filterTag;renderChips();renderBoard();return}
  if((el=t.closest('[data-filter-person]'))){ui.person=ui.person===el.dataset.filterPerson?null:el.dataset.filterPerson;renderChips();renderBoard();return}
  if(t.closest('#btn-new')){var first=meta.columns.filter(function(c){return c.kind==='idea'})[0]||meta.columns[0];if(first){ui.quickAdd=first.id;ui.quickDraft='';if(ui.collapsed[first.id]){delete ui.collapsed[first.id];lsSet('mvb-collapsed',ui.collapsed)}renderBoard({animate:false,focusQuick:true});var qf=$('.quick');if(qf)qf.scrollIntoView({block:'nearest',inline:'nearest'})}return}
  if(t.closest('#btn-bell')){if(ui.bell){closeLayer()}else{ui.bell=true;ui.open=null;ui.settings=false;ui.drawer=false;ui.outcome=null;renderLayer(true);renderHeader()}return}
  if(t.closest('[data-mark-all]')){markRead(visibleNotes().filter(function(n){return !n.read}).map(function(n){return n.id}));renderLayer(false);return}
  var on2=t.closest('[data-open-note]');if(on2){markRead([on2.dataset.openNote]);openCard(on2.dataset.card);return}
  if(t.closest('#btn-activity')){if(ui.drawer){closeLayer()}else{ui.drawer=true;ui.open=null;ui.settings=false;ui.outcome=null;renderLayer(true);renderHeader();resolveNames()}return}
  if(t.closest('#btn-settings')){ui.settings=true;ui.open=null;ui.drawer=false;ui.outcome=null;renderLayer(true);return}
  if((el=t.closest('[data-act]'))&&editable())act(el);
});
function act(el){
  var a=el.dataset.act,c=ui.open?cardById(ui.open):null;
  if(ui.notify){
    if(a==='n-toggle'){var em=el.dataset.email;ui.notify.pick[em]=!ui.notify.pick[em];var note=$('#n-note')?$('#n-note').value:'';renderLayer(false);if($('#n-note'))$('#n-note').value=note;return}
    if(a==='n-send'){sendNotifications();return}
    if(a==='n-skip'){closeLayer();return}
  }
  if(ui.outcome){
    var oc=cardById(ui.outcome.id);if(!oc)return;
    if(a==='reason-pick'){var ta=$('#o-text');ta.value=el.dataset.val;ta.focus();return}
    if(a==='outcome-save'){setOutcome(oc,$('#o-text').value,ui.outcome.act);closeLayer();renderBoard({animate:false});return}
  }
  if(c){
    if(a==='status'){var to=el.dataset.val;if(to===c.col)return;var prev=clone(c);var mv=moveCard(c,to);var k=colById(to).kind;rerenderSheetBody((k==='done'||k==='dropped')&&!c.outcome?'f-outcome':null);softRender();
      if(mv)promptForMove(c,mv);
      if(mv)toast('Moved to '+colById(to).name,{label:'Undo',fn:function(){restoreCard(prev);activity=activity.filter(function(x){return x!==mv});queue('activity/'+mv.id,null,0);renderAll()}});return}
    if(a==='reason-sheet'){var fo=$('#f-outcome');if(fo){fo.value=el.dataset.val;setOutcome(c,fo.value);softRender();fo.focus()}return}
    if(a==='bper'){c.budgetPeriod=el.dataset.val;saveCard(c,300);rerenderSheetBody();softRender();return}
    if(a==='prio'){c.priority=el.dataset.val;saveCard(c,300);rerenderSheetBody();softRender();return}
    if(a==='person-del'){c.people=c.people.filter(function(p){return p!==el.dataset.val});saveCard(c,300);rerenderSheetBody('f-person');softRender();return}
    if(a==='due-clear'){c.due='';saveCard(c,300);rerenderSheetBody();softRender();return}
    if(a==='check'){var it=c.checklist.filter(function(x){return x.id===el.dataset.id})[0];if(it){it.done=!it.done;saveCard(c,300);rerenderSheetBody();softRender()}return}
    if(a==='check-del'){c.checklist=c.checklist.filter(function(x){return x.id!==el.dataset.id});saveCard(c,300);rerenderSheetBody();softRender();return}
    if(a==='newtag-save'){saveNewTag(c);return}
    if(a==='delete'){var cc=c;ui.open=null;openSnapshot=null;closeLayer();deleteCard(cc);renderAll();return}
  }
  if(ui.settings){
    var id=el.dataset.id;
    if(a==='m-notify'){var mm=members.filter(function(x){return x.email===el.dataset.email})[0];if(mm){var nv=mm.notify===false;mm.notify=nv;rerenderSettings();sb.from('members').update({notify:nv}).eq('email',mm.email).then(function(r){if(r.error){mm.notify=!nv;rerenderSettings();toast('Couldn’t change that. '+r.error.message)}else toast((mm.name||mm.email)+(nv?' will get notifications':' won’t get notifications'))})}return}
    if(a==='m-expand'){ui.expanded=ui.expanded||{};ui.expanded[el.dataset.email]=!ui.expanded[el.dataset.email];rerenderSettings();return}
    if(a==='m-unlink'){var um=members.filter(function(x){return x.email===el.dataset.email})[0],uc=cardById(el.dataset.card);if(um&&uc){var prevP=uc.people.slice();uc.people=uc.people.filter(function(p){var x=memberFor(p);return !(x&&x.email===um.email)});saveCard(uc,0);cancelPending(uc.id,um.email);rerenderSettings();softRender();toast('Unlinked '+(um.name||um.email)+' from “'+uc.title+'”',{label:'Undo',fn:function(){uc.people=prevP;saveCard(uc,0);rerenderSettings();softRender()}})}return}
    if(a==='m-scope'){var sm=members.filter(function(x){return x.email===el.dataset.email})[0];if(sm&&sm.scope!==el.dataset.val){updateMember(sm,{scope:el.dataset.val},{scope:sm.scope||'all'});toast((sm.name||sm.email)+' now sees '+scopeLabel(sm))}return}
    if(a==='m-tag'){var tm=members.filter(function(x){return x.email===el.dataset.email})[0];if(tm){var tg2=(tm.tags||[]).slice(),ti=tg2.indexOf(el.dataset.val);if(ti>-1)tg2.splice(ti,1);else tg2.push(el.dataset.val);updateMember(tm,{tags:tg2},{tags:(tm.tags||[]).slice()})}return}
    if(a==='m-role'){setRole(el.dataset.email,el.dataset.val);return}
    if(a==='m-del'){removeMember(el.dataset.email);return}
    if(a==='stale'){meta.staleDays=+el.dataset.val;saveMeta();rerenderSettings();softRender();return}
    if(a==='col-color'){var col=colById(id);col.color=CKEYS[(CKEYS.indexOf(col.color)+1)%CKEYS.length];saveMeta();rerenderSettings();softRender();return}
    if(a==='col-up'||a==='col-down'){var i=meta.columns.findIndex(function(x){return x.id===id});var j=a==='col-up'?i-1:i+1;if(j<0||j>=meta.columns.length)return;var tmp=meta.columns[i];meta.columns[i]=meta.columns[j];meta.columns[j]=tmp;saveMeta();rerenderSettings();renderAll2();return}
    if(a==='col-del'){if(cardList().some(function(x){return colOf(x)===id})||meta.columns.length<2)return;var prevCols=clone(meta.columns),gone=colById(id).name;meta.columns=meta.columns.filter(function(x){return x.id!==id});saveMeta(0);rerenderSettings();renderAll2();toast('Deleted column “'+gone+'”',{label:'Undo',fn:function(){meta.columns=prevCols;saveMeta(0);rerenderSettings();renderAll2()}});return}
    if(a==='col-add'){var used=meta.columns.map(function(x){return x.color});var color=CKEYS.filter(function(k){return used.indexOf(k)<0})[0]||'teal';meta.columns.push({id:uid('col'),name:'New column',color:color,kind:'active'});saveMeta();rerenderSettings();renderAll2();var ins=$$('[data-col-name]');var last=ins[ins.length-1];if(last){last.focus();last.select()}return}
    if(a==='tag-color'){var tg=tagById(id);tg.color=CKEYS[(CKEYS.indexOf(tg.color)+1)%CKEYS.length];saveMeta();rerenderSettings();softRender();return}
    if(a==='tag-del'){var prevMeta=clone(meta);var touched=cardList().filter(function(x){return x.tag===id}).map(clone);
      meta.tags=meta.tags.filter(function(x){return x.id!==id});saveMeta(0);cardList().forEach(function(x){if(x.tag===id){x.tag='';saveCard(x,0,true)}});if(ui.tag===id)ui.tag=null;rerenderSettings();renderAll2();
      toast('Business deleted',{label:'Undo',fn:function(){meta=prevMeta;saveMeta(0);touched.forEach(restoreCard);rerenderSettings();renderAll2()}});return}
    if(a==='tag-add'){var usedT=meta.tags.map(function(x){return x.color});var colr=CKEYS.filter(function(k){return usedT.indexOf(k)<0})[0]||'pink';meta.tags.push({id:uid('t'),name:'New business',color:colr});saveMeta();rerenderSettings();renderChips();var tins=$$('[data-tag-name]');var tl=tins[tins.length-1];if(tl){tl.focus();tl.select()}return}
  }
}
function renderAll2(opt){renderHeader();renderChips();renderBoard(opt||{})}
function saveNewTag(c){var inp=$('#f-newtag');var name=inp?inp.value.trim():'';ui.newTag=false;if(name){var used=meta.tags.map(function(x){return x.color});var color=CKEYS.filter(function(k){return used.indexOf(k)<0})[0]||'pink';var tg={id:uid('t'),name:name,color:color};meta.tags.push(tg);saveMeta(0);c.tag=tg.id;saveCard(c,0);softRender()}rerenderSheetBody()}
function addPerson(c,inp){var v=inp.value.replace(/,/g,'').trim();if(!v)return;var ex=allPeople().filter(function(p){return p.name.toLowerCase()===v.toLowerCase()})[0];if(ex)v=ex.name;if(c.people.some(function(p){return p.toLowerCase()===v.toLowerCase()})){inp.value='';return}c.people.push(v);saveCard(c,300);rerenderSheetBody('f-person');softRender()}

document.addEventListener('input',function(e){
  var t=e.target;
  if(t.id==='q'){ui.q=t.value.trim();renderBoard({animate:false});return}
  if(t.id==='quick-input'){ui.quickDraft=t.value;return}
  if(!editable())return;
  if(t.id==='o-text'){autosize(t);return}
  var c=ui.open?cardById(ui.open):null;
  if(c){
    if(t.id==='f-title'){c.title=t.value.replace(/\n/g,' ');autosize(t);saveCard(c,800);softRender();return}
    if(t.id==='f-budget'){var raw=t.value.replace(/[^0-9.]/g,'');c.budget=raw?Math.max(0,parseFloat(raw)||0):0;saveCard(c,800);softRender();return}
    if(t.id==='f-notes'){c.notes=t.value;autosize(t);saveCard(c,800);softRender();return}
    if(t.id==='f-outcome'){autosize(t);setOutcome(c,t.value);softRender();return}
    if(t.id==='f-link'){c.link=t.value.trim();saveCard(c,800);softRender();return}
    if(t.dataset.checkText){var it=c.checklist.filter(function(x){return x.id===t.dataset.checkText})[0];if(it){it.text=t.value;saveCard(c,800);softRender()}return}
  }
  if(ui.settings){
    if(t.id==='s-name'){meta.name=t.value;saveMeta(800);renderHeader();return}
    if(t.id==='s-eyebrow'){meta.eyebrow=t.value;saveMeta(800);renderHeader();return}
    if(t.dataset.colName){colById(t.dataset.colName).name=t.value;saveMeta(800);softRender();return}
    if(t.dataset.tagName){var tg=tagById(t.dataset.tagName);if(tg){tg.name=t.value;saveMeta(800);softRender()}return}
  }
});
document.addEventListener('change',function(e){
  var t=e.target;if(!editable())return;var c=ui.open?cardById(ui.open):null;if(!c)return;
  if(t.id==='f-tag'){if(t.value==='__new'){ui.newTag=true;rerenderSheetBody('f-newtag');return}c.tag=t.value;saveCard(c,0);softRender();return}
  if(t.id==='f-budget'){t.value=c.budget?Math.round(c.budget).toLocaleString('en-US'):'';return}
  if(t.id==='f-due'){c.due=t.value;saveCard(c,0);rerenderSheetBody();softRender();return}
  if(t.id==='f-link'){rerenderSheetBody();return}
  if(t.id==='f-person'&&t.value){addPerson(c,t)}
});
document.addEventListener('submit',function(e){
  if(e.target.id==='auth-form'){e.preventDefault();doAuth();return}
  if(e.target.id==='add-person'){e.preventDefault();if(editable())addMember();return}
  var f=e.target.closest('.quick');if(!f)return;e.preventDefault();
  var inp=$('#quick-input');var c=addCard(f.dataset.quick,inp.value);
  ui.quickDraft='';renderAll2({focusQuick:true,enter:c?[c.id]:[]});
});
document.addEventListener('keydown',function(e){
  var t=e.target;
  if(menuState){if(e.key==='Escape'){e.preventDefault();var mid=menuState.id;closeMenu();var ce=document.querySelector('#board .card[data-id="'+mid+'"]');if(ce)ce.focus();return}
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();var its=[].slice.call(document.querySelectorAll('#ctx [data-ctx]'));var ix=its.indexOf(document.activeElement);var nx=its[(ix+(e.key==='ArrowDown'?1:-1)+its.length)%its.length];if(nx)nx.focus();return}
    if(e.key==='ArrowLeft'&&menuState.view!=='main'){e.preventDefault();rerenderMenu('main');return}}
  if(t.classList&&t.classList.contains('card')&&!ui.open&&!ui.settings){
    if((e.key==='Backspace'||e.key==='Delete')&&editable()){e.preventDefault();var dc=cardById(t.dataset.id);if(dc){deleteCard(dc);renderAll()}return}
    if(e.key==='ContextMenu'||(e.shiftKey&&e.key==='F10')){e.preventDefault();var cr=t.getBoundingClientRect();openMenu(t.dataset.id,cr.left+24,cr.top+24);return}
  }
  if(t.id==='quick-input'){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();if(t.form.requestSubmit)t.form.requestSubmit();else t.form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))}else if(e.key==='Escape'){ui.quickAdd=null;ui.quickDraft='';renderBoard({animate:false})}return}
  if(t.id==='o-text'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();var oc=ui.outcome&&cardById(ui.outcome.id);if(oc){setOutcome(oc,t.value,ui.outcome.act);closeLayer()}return}
  var c=ui.open?cardById(ui.open):null;
  if(c&&t.id==='f-title'&&e.key==='Enter'){e.preventDefault();var n=$('#f-notes');if(n)n.focus();return}
  if(c&&t.id==='f-person'){if(e.key==='Enter'||e.key===','){e.preventDefault();addPerson(c,t);return}if(e.key==='Backspace'&&!t.value&&c.people.length){c.people.pop();saveCard(c,300);rerenderSheetBody('f-person');softRender();return}}
  if(c&&t.id==='f-check-new'&&e.key==='Enter'){e.preventDefault();var v=t.value.trim();if(v){c.checklist.push({id:uid('k'),text:v,done:false});saveCard(c,300);rerenderSheetBody('f-check-new');softRender()}return}
  if(c&&t.id==='f-newtag'){if(e.key==='Enter'){e.preventDefault();saveNewTag(c)}else if(e.key==='Escape'){e.stopPropagation();ui.newTag=false;rerenderSheetBody()}return}
  if(e.key==='Escape'){var mn=$('#acct-menu');if(mn&&!mn.hidden){mn.hidden=true;return}if(drag){end(true);return}if(ui.open||ui.settings||ui.drawer||ui.outcome){closeLayer();return}if(t.id==='q'&&t.value){t.value='';ui.q='';renderBoard({animate:false});return}}
  var typing=t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable;
  if(typing)return;
  if(e.key==='/'){e.preventDefault();$('#q').focus();return}
  if((e.key==='n'||e.key==='N')&&editable()&&!ui.open&&!ui.settings&&!ui.outcome&&!e.metaKey&&!e.ctrlKey){e.preventDefault();$('#btn-new').click();return}
  if(e.key==='Enter'&&t.classList&&t.classList.contains('card')){openCard(t.dataset.id)}
});

/* ---------- Live data ---------- */
var dataRaf=0;
function onData(){
  if(dataRaf)return;
  dataRaf=requestAnimationFrame(function(){
    dataRaf=0;renderHeader();renderChips();renderBoard({animate:true});refreshLayerFromData();
  });
}
function subscribe(){
  var timer=setTimeout(function(){if(!ready()){offlineNote='Can’t reach the board right now. It will appear as soon as the connection is back.';renderBoard()}},10000);
  function done(){if(ready()){clearTimeout(timer);if(offlineNote){offlineNote=''}}}
  function err(e){clearTimeout(timer);var code=e&&e.code;if(code==='revoked'||code==='not_granted'){mode='signedout'}else{offlineNote='The board stopped updating. Reload the page to reconnect.'}renderAll()}
  db.doc('board/meta').onSnapshot(function(s){
    if(!pendingFor('board/meta'))meta=s.exists?normMeta(clone(s.data())):clone(DEFAULT_META);
    if(!s.metadata.fromCache)loaded.meta=true;done();onData();
  },err);
  db.collection('cards').onSnapshot(function(s){
    var next={};
    s.docs.forEach(function(d){var path='cards/'+d.id;
      if(pendingFor(path)){if(Q[path].del)return;if(cards[d.id]){next[d.id]=cards[d.id];return}}
      var c=normCard(clone(d.data()||{}));c.id=d.id;
      if(cards[d.id]&&JSON.stringify(cards[d.id])===JSON.stringify(c))next[d.id]=cards[d.id];else next[d.id]=c;
    });
    Object.keys(cards).forEach(function(id){var q=Q['cards/'+id];if(!next[id]&&q&&(q.has||q.busy)&&!q.del)next[id]=cards[id]});
    cards=next;if(!s.metadata.fromCache)loaded.cards=true;done();onData();
  },err);
  db.collection('activity').orderBy('t','desc').limit(300).onSnapshot(function(s){
    var seen={},list=[];
    s.docs.forEach(function(d){var path='activity/'+d.id;if(pendingFor(path)&&Q[path].del)return;var local=activity.filter(function(a){return a.id===d.id})[0];var a=pendingFor(path)&&local?local:clone(d.data()||{});a.id=d.id;seen[d.id]=1;list.push(a)});
    activity.forEach(function(a){var q=Q['activity/'+a.id];if(!seen[a.id]&&q&&(q.has||q.busy)&&!q.del)list.push(a)});
    list.sort(function(x,y){return y.t-x.t});activity=list;resolveNames();onData();
  },function(){});
}
/* ---------- Supabase: the same doc/collection API the board is written against ---------- */
var TABLE={board:'board_meta',cards:'cards',activity:'activity'};
function keyOf(r){return r.id!=null?r.id:r.email}
function dbErr(err){var m=String(err&&err.message||'');var code=(err&&err.code==='42501')||/row-level security|permission denied/i.test(m)?'invalid_argument':'unavailable';return {code:code,message:m}}
function watch(t,o,cb,onErr){
  var rows={},alive=true;
  function emit(){var list=Object.keys(rows).map(function(k){return rows[k]});if(o.ord){var f=o.ord[0],dir=o.ord[1]==='desc'?-1:1;list.sort(function(a,b){return ((a[f]||0)-(b[f]||0))*dir})}if(o.lim)list=list.slice(0,o.lim);cb(list)}
  function load(){var q=sb.from(t).select('*');if(o.id)q=q.eq('id',o.id);if(o.eq)q=q.eq(o.eq[0],o.eq[1]);if(o.ord)q=q.order(o.ord[0],{ascending:o.ord[1]!=='desc'});if(o.lim)q=q.limit(o.lim);
    return q.then(function(r){if(!alive)return;if(r.error){if(onErr)onErr(dbErr(r.error));return}rows={};(r.data||[]).forEach(function(x){rows[keyOf(x)]=x});emit()})}
  var filter={event:'*',schema:'public',table:t};if(o.id)filter.filter='id=eq.'+o.id;else if(o.eq)filter.filter=o.eq[0]+'=eq.'+o.eq[1];
  var ch=sb.channel(t+'-'+(o.id||'all')+'-'+uid('')).on('postgres_changes',filter,function(pl){
    if(pl.eventType==='DELETE'){var k=pl.old&&keyOf(pl.old);if(k!=null&&rows[k]){delete rows[k];emit()}else load();return}
    if(pl.new&&keyOf(pl.new)!=null){rows[keyOf(pl.new)]=pl.new;emit()}
  }).subscribe(function(status){if(status==='SUBSCRIBED')load()});
  load();
  document.addEventListener('visibilitychange',function(){if(alive&&document.visibilityState==='visible')load()});
  return function(){alive=false;sb.removeChannel(ch)};
}
function makeDb(){
  function D(path){var s=path.split('/'),t=TABLE[s[0]],id=s[1];return {
    set:function(data){var row={id:id,body:data};if(t==='activity')row.t=data.t||Date.now();return sb.from(t).upsert(row).then(function(r){if(r.error)throw dbErr(r.error)})},
    delete:function(){return sb.from(t).delete().eq('id',id).then(function(r){if(r.error)throw dbErr(r.error)})},
    onSnapshot:function(next,err){return watch(t,{id:id},function(rows){var r=rows[0];next({id:id,exists:!!r,data:function(){return r&&r.body},metadata:{fromCache:false,hasPendingWrites:false}})},err)}
  }}
  function Q(c,ord,lim){return {
    orderBy:function(f,d){return Q(c,[f,d],lim)},limit:function(n){return Q(c,ord,n)},doc:function(id){return D(c+'/'+id)},
    onSnapshot:function(next,err){return watch(TABLE[c],{ord:ord,lim:lim},function(rows){var docs=rows.map(function(r){return {id:r.id,exists:true,data:function(){return r.body},metadata:{fromCache:false,hasPendingWrites:false}}});next({docs:docs,size:docs.length,empty:!docs.length,metadata:{fromCache:false,hasPendingWrites:false}})},err)}
  }}
  return {doc:D,collection:function(c){return Q(c)}};
}
function makeUser(){return {
  canEdit:function(){return Promise.resolve(myRole==='admin')},
  id:function(){return Promise.resolve(myId)},
  profiles:function(ids){var o={};[].concat(ids).forEach(function(i){var m=members.filter(function(x){return x.email===i})[0];o[i]={id:i,name:m?(m.name||m.email.split('@')[0]):''}});return Promise.resolve(o)}
}}
function watchMembers(){
  watch('members',{},function(rows){
    members=rows.slice().sort(function(a,b){return (a.role===b.role?0:a.role==='admin'?-1:1)||String(a.name||a.email).localeCompare(String(b.name||b.email))});
    var me=members.filter(function(x){return x.email===myId})[0];
    if(!me){location.reload();return}
    var sk=me.role+'|'+(me.scope||'all')+'|'+(me.tags||[]).join(',');if(window.__scopeKey&&window.__scopeKey!==sk){location.reload();return}window.__scopeKey=sk;
    if(me.role!==myRole){myRole=me.role;mode=me.role==='admin'?'live':'readonly';if(mode!=='live'){ui.settings=false}renderAll()}
    names={};resolveNames();renderHeader();renderChips();
    if(ui.settings&&!layerFocused())rerenderSettings();
    if(ui.drawer||ui.open)refreshLayerFromData();
  },function(){});
}
function onSession(s){
  if(!s){session=null;if(started){location.reload();return}mode='signedout';renderAll();return}
  if((started||checking)&&session&&session.user&&s.user&&session.user.id===s.user.id){session=s;return}
  session=s;myId=String(s.user.email||'').toLowerCase();checking=true;
  sb.from('members').select('*').eq('email',myId).then(function(r){
    checking=false;var m=r.data&&r.data[0];
    if(r.error||!m){mode='noaccess';renderAll();return}
    myRole=m.role;members=[m];mode=m.role==='admin'?'live':'readonly';db=makeDb();user=makeUser();
    if(!started){started=true;renderAll();subscribe();watchMembers();watchNotes()}else renderAll();
  });
}
function connect(){
  var cfg=window.BOARD_CONFIG||{};
  if(!window.supabase||!cfg.supabaseUrl||!cfg.supabaseAnonKey||/YOUR[_-]/i.test(cfg.supabaseUrl+cfg.supabaseAnonKey)){mode='config';renderAll();return}
  sb=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  sb.auth.getSession().then(function(r){onSession(r.data&&r.data.session)},function(){mode='signedout';renderAll()});
  sb.auth.onAuthStateChange(function(ev,s){if(ev==='SIGNED_IN'||ev==='SIGNED_OUT')onSession(s);else if(s)session=s});
}

shell();renderAll();
setInterval(function(){if(!drag){renderHeader();renderChips();if(ui.bell)renderLayer(false)}},30000);
connect();
})();
