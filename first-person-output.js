function hasValue(value){return String(value||'').trim().length>0}
function fieldLine(label,name){const value=String(fd().get(name)||'');return hasValue(value)?label+': '+value+'\n':''}
function typedTextBlock(title,name){const value=String(fd().get(name)||'');return hasValue(value)?title+'\n'+value+'\n\n':''}
function selectedBullets(name){const items=all(name).filter(x=>hasValue(x));return items.map(x=>'• '+x).join('\n')}
function listBlock(title,name,intro){const items=selectedBullets(name);return items?title+'\n'+(intro?intro+'\n':'')+items+'\n\n':''}
function selectedValue(name){const value=String(fd().get(name)||'');return hasValue(value)?value:''}
function record(){
  const details=fieldLine('Name','name')+fieldLine('Area of Bellbrook','area')+fieldLine('Connection to Bellbrook','connection')+fieldLine('Time living or working in Bellbrook','years')+fieldLine('Contact details','contact');
  const account=typedTextBlock('MY ACCOUNT','experience')+typedTextBlock('SPECIFIC INCIDENT OR MOMENT','incident')+typedTextBlock('WHEN THIS STARTED OR CHANGED','turning');
  const first=selectedValue('firstNoticed');
  const impacts=listBlock('IMPACTS I HAVE EXPERIENCED — PROPERTY AND DAILY LIFE','physical','I have selected the following property and daily life impacts:')+listBlock('IMPACTS I HAVE EXPERIENCED — HEALTH AND WELLBEING','health','I have selected the following health and wellbeing impacts:')+listBlock('IMPACTS I HAVE EXPERIENCED — FINANCIAL AND ECONOMIC','financialChecks','I have selected the following financial or economic impacts:')+listBlock('IMPACTS I HAVE EXPERIENCED — COMMUNITY AND SOCIAL','communityChecks','I have selected the following community or social impacts:');
  const contacted=selectedBullets('contacted');
  const outcome=typedTextBlock('RESPONSE OR OUTCOME I RECEIVED','authorityOutcome');
  const requested=selectedBullets('requested');
  const custom=typedTextBlock('ADDITIONAL REQUESTS','customRequests');
  const permission=selectedValue('permission');
  const extra=typedTextBlock('ANYTHING ELSE','anythingElse');
  return `BELLBROOK FLYING FOX COMMUNITY IMPACT RECORD

This is my account of how the Bellbrook flying fox camp has affected me, my home, my daily life, and my community.

${details?'MY DETAILS\n'+details+'\n':''}${account}${first?'WHEN I FIRST NOTICED THE IMPACT\n'+first+'\n\n':''}${impacts}${contacted?'CONTACT AND RESPONSE HISTORY\nI have contacted:\n'+contacted+'\n\n':''}${outcome}${requested?'WHAT I AM ASKING FOR\nI am asking for:\n'+requested+'\n\n':''}${custom}${permission?'PERMISSION\nI give permission according to this selection:\n'+permission+'\n\n':''}${extra}PORTAL NOTE
This account was prepared using the Bellbrook Advocacy Portal. The portal assisted with formatting only. The account remains my own account and observations.

Generated: ${today()}`;
}
