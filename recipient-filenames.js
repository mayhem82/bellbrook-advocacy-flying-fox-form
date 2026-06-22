(function(){
  function slug(text){
    return String(text || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'unknown';
  }

  function recipientSlug(){
    const el = document.getElementById('recipientType');
    if(!el) return 'council';
    return slug(el.options[el.selectedIndex].text || el.value);
  }

  function personSlug(){
    const el = document.querySelector('[name="name"]');
    return el && el.value.trim() ? '-' + slug(el.value.trim()) : '';
  }

  function dateSlug(){
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }

  window.bellbrookFilename = function(kind){
    const person = personSlug();
    const date = dateSlug();
    const recipient = recipientSlug();
    if(kind === 'record') return 'bellbrook-flying-fox-community-impact-record' + person + '-' + date + '.txt';
    if(kind === 'letter') return 'bellbrook-flying-fox-letter-' + recipient + person + '-' + date + '.txt';
    return 'bellbrook-flying-fox-package-' + recipient + person + '-' + date + '.txt';
  };
})();
