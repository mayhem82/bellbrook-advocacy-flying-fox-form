(function(){
  const guidance = {
    council: {
      title: 'Council / General Manager',
      body: 'This package is directed to council because council is the local body positioned to consider a Bellbrook Flying-fox Camp Management Plan, local infrastructure responses, grant pathways, and disclosure of consultation outcomes. Keep any reply and record whether it answers the questions raised or only describes process activity.'
    },
    councillor: {
      title: 'Mayor / Councillors',
      body: 'This package is directed to elected representatives because they can raise resident concerns, request briefings, ask for agenda items, and seek explanations through council processes. Keep any reply and record whether a specific action is promised.'
    },
    mp: {
      title: 'Member for Oxley / State MP',
      body: 'This package is directed to a state representative because state agencies and ministers are relevant to the NSW flying-fox management framework. Keep any reply and request written confirmation of any ministerial or departmental response.'
    },
    environment: {
      title: 'NSW DCCEEW / NSW Environment',
      body: 'This package is directed to the environment framework because flying-fox camp management, lawful management options, and management-plan funding pathways sit within that system. Keep any reply and check whether it answers the management-plan and funding-pathway questions.'
    },
    health: {
      title: 'NSW Health',
      body: 'This package is directed to health authorities because residents may report sleep disruption, stress, odour exposure, wellbeing impacts, and school-related concerns. Keep any reply and record whether the health impacts were formally acknowledged.'
    },
    oversight: {
      title: 'NSW Ombudsman',
      body: 'This package is directed to an oversight body because the issue may involve administrative handling, consultation outputs, disclosure, and unanswered process questions. Keep every reply and record whether the response addresses the process questions.'
    },
    media: {
      title: 'Media / Community Advocacy',
      body: 'This package is directed to media or advocacy contacts because the resident account may help explain the community impact and the public-interest context. Only share personal details if comfortable. Keep a copy of anything provided.'
    }
  };

  function selectedType(){
    const el = document.getElementById('recipientType');
    return el ? el.value : 'council';
  }

  function selectedGuidance(){
    const g = guidance[selectedType()] || guidance.council;
    return 'RECIPIENT GUIDANCE\n\nSelected recipient: ' + g.title + '\n\nWHY THIS RECIPIENT MAY MATTER\n' + g.body + '\n\nTRANSPARENCY STATEMENT\nResident-authored content is the Community Impact Record and personal testimony. Portal-generated content includes cover-letter formatting, recipient guidance, and submission support. The resident may edit, remove, or replace generated content before sending.';
  }

  function ensurePanel(){
    if(document.getElementById('guidancePreview')) return;
    const cover = document.getElementById('coverPreview');
    if(!cover) return;
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = '<h2>3. Recipient Guidance & Transparency</h2><pre id="guidancePreview"></pre>';
    const parentArticle = cover.closest('article');
    if(parentArticle && parentArticle.parentNode){ parentArticle.parentNode.insertBefore(article, parentArticle.nextSibling); }
  }

  const previousUpdate = window.update;
  window.update = function(){
    if(typeof previousUpdate === 'function') previousUpdate();
    ensurePanel();
    const gp = document.getElementById('guidancePreview');
    if(gp) gp.textContent = selectedGuidance();
  };

  const previousDownloadPackage = window.downloadPackage;
  window.downloadPackage = function(){
    if(typeof record !== 'function' || typeof coverLetter !== 'function') {
      if(typeof previousDownloadPackage === 'function') return previousDownloadPackage();
      return;
    }
    window.update();
    const text = coverLetter() + '\n\n================ ATTACHED BELLBROOK FLYING FOX COMMUNITY IMPACT RECORD ================\n\n' + record() + '\n\n================ RECIPIENT GUIDANCE AND TRANSPARENCY ================\n\n' + selectedGuidance();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], {type:'text/plain'}));
    a.download = 'bellbrook-flying-fox-submission-package.txt';
    a.click();
  };

  document.addEventListener('change', function(e){ if(e.target && e.target.id === 'recipientType') window.update(); });
  document.addEventListener('DOMContentLoaded', function(){ if(typeof window.update === 'function') window.update(); });
})();
