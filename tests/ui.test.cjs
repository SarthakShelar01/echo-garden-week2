/* Integration smoke tests use a small DOM/canvas substitute, not a browser renderer. */
const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
function boot(failStorage=false){
 class Element{constructor(){this.children=[];this.dataset={};this.open=false;this.textContent='';this.innerHTML='';}replaceChildren(){this.children=[];}append(e){this.children.push(e);}setAttribute(k,v){this[k]=v;}showModal(){this.open=true;}close(){this.open=false;}}
 const ids={};const drawing=new Proxy({},{get:()=>()=>{}});const events={};const document={getElementById:id=>ids[id]||(ids[id]=new Element()),createElement:()=>new Element(),querySelectorAll:()=>[],addEventListener:(k,f)=>events[k]=f};document.getElementById('board').getContext=()=>drawing;ids.board.width=880;ids.board.height=560;
 const localStorage={getItem(){if(failStorage)throw Error('blocked');return '{}';},setItem(){if(failStorage)throw Error('blocked');}};
 const c=vm.createContext({document,localStorage,console});vm.runInContext(fs.readFileSync(require.resolve('../core.js'),'utf8'),c);vm.runInContext(fs.readFileSync(require.resolve('../game.js'),'utf8'),c);
 return {ids,c,run:s=>vm.runInContext(s,c),key:key=>events.keydown({key,target:{tagName:'CANVAS'},preventDefault(){}})};
}
test('UI boots with three room buttons and eight trail slots',()=>{const b=boot();assert.equal(b.ids.levels.children.length,3);assert.equal(b.ids.trail.children.length,8);assert.equal(b.ids.record.disabled,true);assert.equal(b.ids['room-title'].textContent,'First steps');});
test('keyboard completes room and next button loads next terrace',()=>{const b=boot();for(const key of ['s',...Array(6).fill('d'),'w','Enter'])b.key(key);assert.equal(b.ids.done.open,true);assert.equal(b.ids.progress.textContent,'1 / 3');b.ids.next.onclick();assert.equal(b.ids.done.open,false);assert.equal(b.ids['room-title'].textContent,'A helping echo');assert.equal(b.ids.record.disabled,false);});
test('UI records, replays and restores second room',()=>{const b=boot();b.ids.levels.children[1].onclick();for(const key of ['e','w','d','d','e',...Array(6).fill('d'),'Enter'])b.key(key);assert.equal(b.ids.done.open,true);assert.equal(b.ids.progress.textContent,'1 / 3');assert.match(b.ids['done-copy'].textContent,/Terrace 2 restored in 6 turns/);});
test('UI remains playable when storage fails',()=>{const b=boot(true);assert.match(b.ids['save-note'].textContent,/unavailable/);b.key('s');assert.equal(b.ids.turns.textContent,1);});
