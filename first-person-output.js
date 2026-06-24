function cleanText(value){return String(value||'').trim()}
function fieldLine(label,name){const value=cleanText(fd().get(name));return value?label+': '+value+'\n':''}
function textBlock(title,name){const value=cleanText(fd().get(name));return value?title+'\n'+value+'\n\n':''}
function selectedBullets(name){const items=all(name).filter(x=>cleanText(x));return items.map(x=>'• '+x).join('\n')}
function listBlock(title,name,intro){const items=selectedBullets(name);return items?title+'\n'+(intro?intro+'\n':'')+items+'\n\n':''}
function record(){
  const details=fieldLine('Name','name')+fieldLine('Area of Bellbrook','area')+fieldLine('Connection to Bellbrook','connection')+fieldLine('Time living or working in Bellbrook','years')+fieldLine('Contact details','contact');
  const account=textBlock('MY ACCOUNT', 'experience')+textBlock('SPECIFIC INCIDENT OR MOMENT', 'incident')+textBlock('WHEN THIS STARTED OR CHANGED', 'turning');
  const first=cleanText(fd().get('firstNoticed'));
  const impacts=listBlock('IMPACTS I HAVE EXPERIENCED — PROPERTY AND DAILY LIFE','physical','I have experienced the following property and daily life impacts:')+listBlock('IMPACTS I HAVE EXPERIENCED — HEALTH AND WELLBEING','health','I have experienced the following health and wellbeing impacts:')+listBlock('IMPACTS I HAVE EXPERIENCED — FINANCIAL AND ECONOMIC','financialChecks','I have experienced the following financial or economic impacts:')+listBlock('IMPACTS I HAVE EXPERIENCED — COMMUNITY AND SOCIAL','communityChecks','I have experienced the following community or social impacts:');
  const contacted=selectedBullets('contacted');
  const outcome=cleanText(fd().get('authorityOutcome'));
  const requested=selectedBullets('requested');
  const custom=cleanText(fd().get('customRequests'));
  const permission=cleanText(fd().get('permission'));
  const extra=cleanText(fd().get('anythingElse'));
  return `BELLBROOK FLYING FOX COMMUNITY IMPACT RECORD

This is my account of how the Bellbrook flying fox camp has affected me, my home, my daily life, and my community.

${details?'MY DETAILS\n'+details+'\n':''}${account}${first?'WHEN I FIRST NOTICED THE IMPACT\n'+first+'\n\n':''}${impacts}${contacted?'CONTACT AND RESPONSE HISTORY\nI have contacted:\n'+contacted+'\n\n':''}${outcome?'The response or outcome I received was:\n'+outcome+'\n\n':''}${requested?'WHAT I AM ASKING FOR\nI am asking for:\n'+requested+'\n\n':''}${custom?'ADDITIONAL REQUESTS\n'+custom+'\n\n':''}${permission?'PERMISSION\nI give permission according to this selection:\n'+permission+'\n\n':''}${extra?'ANYTHING ELSE\n'+extra+'\n\n':''}PORTAL NOTE
This account was prepared using the Bellbrook Advocacy Portal. The portal assisted with formatting only. The account remains my own account and observations.

Generated: ${today()}`;
}
