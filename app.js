const $ = s => document.querySelector(s);
let language = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'fr';
let data = window.GUIDES[language];
let selected = new URLSearchParams(location.search).get('competition');
const aliases = {l1:'lspro',l2:'lspro',l3:'lspro',espoirs:'lspro',senior:'cups',masters:'cups'};
selected = aliases[selected] || selected;
if (!Object.hasOwn(data.competitions, selected)) selected = 'lspro';
let checked = [];
function readProgress() { try { const saved = JSON.parse(localStorage.getItem('lspro-guide-v2-' + selected)); checked = Array.isArray(saved) ? saved.filter(n => Number.isInteger(n) && n >= 0 && n < data.steps.length) : []; } catch { checked = []; } }
function store() { try { localStorage.setItem('lspro-guide-v2-' + selected, JSON.stringify(checked)); } catch {} }
function link(label,url) { const a=document.createElement('a'); a.textContent=label+' ↗'; a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; return a; }
function progress() { $('#count').textContent=language === 'fr' ? 'Étapes terminées : '+checked.length+' / '+data.steps.length : checked.length+' of '+data.steps.length+' steps completed'; $('#progress').max=data.steps.length; $('#progress').value=checked.length; $('#complete').hidden=checked.length!==data.steps.length; document.querySelectorAll('.step').forEach((el,i)=>el.classList.toggle('done',checked.includes(i))); }
function render() {
 translateUI();
 const c=data.competitions[selected]; $('#competition').value=selected; $('#family').textContent=c.family; $('#title').textContent=c.name; $('#competition-note').textContent=c.note;
 $('#steps').replaceChildren(); $('#navigation').replaceChildren(); readProgress();
 data.steps.forEach((step,i)=>{
  const nav=document.createElement('a'); nav.href='#step-'+(i+1); nav.textContent=String(i+1).padStart(2,'0')+'  '+step.title; $('#navigation').append(nav);
  const section=document.createElement('section'); section.className='step'; section.id='step-'+(i+1);
  const top=document.createElement('div'); top.className='step-top'; const number=document.createElement('span'); number.className='number'; number.textContent=String(i+1).padStart(2,'0');
  const label=document.createElement('label'); label.className='check'; const input=document.createElement('input'); input.type='checkbox'; input.checked=checked.includes(i); input.addEventListener('change',()=>{checked=input.checked?[...checked,i]:checked.filter(n=>n!==i);store();progress();}); label.append(input,document.createTextNode(language === 'fr' ? ' Étape terminée' : ' Mark complete'));top.append(number,label);
  const h=document.createElement('h3'); h.textContent=step.title; const subtitle=document.createElement('p'); subtitle.className='subtitle'; subtitle.textContent=step.subtitle; const ol=document.createElement('ol'); step.items.forEach(item=>{const li=document.createElement('li');li.textContent=item;ol.append(li);});section.append(top,h,subtitle,ol);
  if(step.action){const url=step.action==='portal'?data.portalUrl:c.registrationUrl;if(url)section.append(link(step.action==='portal'?(language==='fr'?'Ouvrir le portail':'Open registration portal'):(language==='fr'?'Inscription — '+c.name:'Open '+c.name+' registration'),url));else{const note=document.createElement('p');note.className='pending';note.textContent=language==='fr'?'Lien d’inscription en attente de confirmation':'Registration link awaiting administrator confirmation';section.append(note);}}
  if(step.tip){const tip=document.createElement('p');tip.className='tip';tip.textContent=step.tip;section.append(tip);}$('#steps').append(section);
 });
 progress(); document.title=c.name+(language==='fr'?' | Guide d’inscription':' | Team registration guide');
}
$('#competition').addEventListener('change',event=>{selected=event.target.value;const url=new URL(location.href);url.searchParams.set('competition',selected);url.searchParams.set('lang',language);url.hash='';history.replaceState(null,'',url);render();});
$('#reset').addEventListener('click',()=>{checked=[];store();render();});$('#print').addEventListener('click',()=>window.print());
$('#language').addEventListener('change',event=>{language=event.target.value;data=window.GUIDES[language];const url=new URL(location.href);url.searchParams.set('lang',language);url.searchParams.set('competition',selected);history.replaceState(null,'',url);render();});

const UI = {"fr": {"hero-kicker": "GUIDE D’INSCRIPTION DES ÉQUIPES", "hero-title": "Votre équipe. Votre compétition.\nL’inscription, étape par étape.", "hero-subtitle": "Choisissez votre compétition et suivez les étapes à votre rythme.", "language-label": "Langue", "competitionLabel": "VOTRE COMPÉTITION", "nav": "Étapes du guide", "saved": "VOTRE PROGRESSION EST ENREGISTRÉE", "savedNote": "Dans ce navigateur, séparément pour chaque compétition. Aucune donnée d’inscription n’est recueillie.", "print": "Imprimer / enregistrer en PDF ↗", "tag": "INSCRIPTION D’ÉQUIPE", "noticeTitle": "Version de travail — procédure à confirmer", "notice": "Les liens d’inscription, les dates limites, les règles d’admissibilité et les libellés exacts du portail restent à confirmer auprès du responsable de la compétition.", "reset": "Réinitialiser la liste", "progress": "Progression de la liste", "progressNote": "Cocher une étape conserve votre progression dans ce guide. Cela ne soumet aucune inscription à Soccer Québec.", "complete": "Liste terminée. Vérifiez la confirmation du portail pour connaître le statut réel de votre inscription.", "resourcesKicker": "À GARDER SOUS LA MAIN", "resources": "Ressources officielles", "footer": "Vérifiez les exigences à chaque saison.", "skip": "Aller aux instructions"}, "en": {"hero-kicker": "TEAM REGISTRATION GUIDE", "hero-title": "Your team. Your competition.\nRegistration, step by step.", "hero-subtitle": "Choose your competition and follow the steps at your own pace.", "language-label": "Language", "competitionLabel": "YOUR COMPETITION", "nav": "Guide sections", "saved": "YOUR PROGRESS IS SAVED", "savedNote": "In this browser, separately for each competition. No registration data is collected.", "print": "Print / save as PDF ↗", "tag": "TEAM REGISTRATION", "noticeTitle": "Working guide — process confirmation needed", "notice": "Registration links, deadlines, eligibility rules and exact portal button names still need to be confirmed with your competition administrator.", "reset": "Reset checklist", "progress": "Checklist progress", "progressNote": "Checking a step saves your progress in this guide. It does not submit a registration to Soccer Québec.", "complete": "Checklist complete. Verify the portal confirmation to check your actual registration status.", "resourcesKicker": "KEEP THESE HANDY", "resources": "Official resources", "footer": "Verify requirements each season.", "skip": "Skip to instructions"}};

function translateUI(){
 const t=UI[language];document.documentElement.lang=language;$('#language').value=language;
 for(const id of ['hero-kicker','hero-title','hero-subtitle','language-label','print','reset','complete']) $('#'+id).textContent=t[id];
 $('#hero-title').style.whiteSpace='pre-line';$('label[for="competition"]').textContent=t.competitionLabel;
 $('#competition').options[1].textContent=data.competitions.cups.name;
 $('#navigation').setAttribute('aria-label',t.nav);
 $('.aside-note').replaceChildren(document.createTextNode(t.saved));const small=document.createElement('small');small.textContent=t.savedNote;$('.aside-note').append(small);
 $('.tag').textContent=t.tag;$('.notice strong').textContent=t.noticeTitle;$('.notice p').textContent=t.notice;
 $('.progress-panel').setAttribute('aria-label',t.progress);$('.progress-panel small').textContent=t.progressNote;
 $('.resources .eyebrow').textContent=t.resourcesKicker;$('.resources h2').textContent=t.resources;$('footer small').textContent=t.footer;$('.skip').textContent=t.skip;
 $('#links').replaceChildren();data.resources.forEach(r=>$('#links').append(link(r.label,r.url)));
 document.querySelector('meta[name="description"]').content=language==='fr'?'Guide d’inscription des équipes : LS PRO et Coupes du Québec.':'Team registration guide: LS PRO and Québec Cups.';
}
render();

