const $ = s => document.querySelector(s);
const data = window.GUIDE;
let selected = new URLSearchParams(location.search).get('competition');
if (!Object.hasOwn(data.competitions, selected)) selected = 'l1';
let checked = [];
function readProgress() { try { const saved = JSON.parse(localStorage.getItem('sportal-v1-' + selected)); checked = Array.isArray(saved) ? saved.filter(n => Number.isInteger(n) && n >= 0 && n < data.steps.length) : []; } catch { checked = []; } }
function store() { try { localStorage.setItem('sportal-v1-' + selected, JSON.stringify(checked)); } catch {} }
function link(label,url) { const a=document.createElement('a'); a.textContent=label+' ↗'; a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; return a; }
function progress() { $('#count').textContent=checked.length+' of '+data.steps.length+' steps completed'; $('#progress').max=data.steps.length; $('#progress').value=checked.length; $('#complete').hidden=checked.length!==data.steps.length; document.querySelectorAll('.step').forEach((el,i)=>el.classList.toggle('done',checked.includes(i))); }
function render() {
 const c=data.competitions[selected]; $('#competition').value=selected; $('#family').textContent=c.family; $('#title').textContent=c.name; $('#competition-note').textContent=c.note;
 $('#steps').replaceChildren(); $('#navigation').replaceChildren(); readProgress();
 data.steps.forEach((step,i)=>{
  const nav=document.createElement('a'); nav.href='#step-'+(i+1); nav.textContent=String(i+1).padStart(2,'0')+'  '+step.title; $('#navigation').append(nav);
  const section=document.createElement('section'); section.className='step'; section.id='step-'+(i+1);
  const top=document.createElement('div'); top.className='step-top'; const number=document.createElement('span'); number.className='number'; number.textContent=String(i+1).padStart(2,'0');
  const label=document.createElement('label'); label.className='check'; const input=document.createElement('input'); input.type='checkbox'; input.checked=checked.includes(i); input.addEventListener('change',()=>{checked=input.checked?[...checked,i]:checked.filter(n=>n!==i);store();progress();}); label.append(input,document.createTextNode(' Mark complete'));top.append(number,label);
  const h=document.createElement('h3'); h.textContent=step.title; const subtitle=document.createElement('p'); subtitle.className='subtitle'; subtitle.textContent=step.subtitle; const ol=document.createElement('ol'); step.items.forEach(item=>{const li=document.createElement('li');li.textContent=item;ol.append(li);});section.append(top,h,subtitle,ol);
  if(step.action){const url=step.action==='portal'?data.portalUrl:c.registrationUrl;if(url)section.append(link(step.action==='portal'?'Open registration portal':'Open '+c.name+' registration',url));else{const note=document.createElement('p');note.className='pending';note.textContent='Registration link awaiting administrator confirmation';section.append(note);}}
  if(step.tip){const tip=document.createElement('p');tip.className='tip';tip.textContent=step.tip;section.append(tip);}$('#steps').append(section);
 });
 progress(); document.title=c.name+' | Sportal registration guide';
}
$('#competition').addEventListener('change',event=>{selected=event.target.value;const url=new URL(location.href);url.searchParams.set('competition',selected);url.hash='';history.replaceState(null,'',url);render();});
$('#reset').addEventListener('click',()=>{checked=[];store();render();});$('#print').addEventListener('click',()=>window.print());
data.resources.forEach(resource=>$('#links').append(link(resource.label,resource.url)));render();
