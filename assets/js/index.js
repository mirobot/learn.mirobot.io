var hidden = [];
var tags = [];

var docHidden = function(doc){
  if(tags.length > 0){
    var docTags = doc.getAttribute("data-tags").split('|');
    var hide = true;
    for(var tag in tags){
      if(docTags.indexOf(tags[tag]) > -1){
        console.log('found tag');
        hide = false;
      }
    }
    if(hide){
      return true;
    }
  }
  for(var d in hidden){
    if(doc.className.indexOf(hidden[d]) > -1){
      return true;
    }
  }
  return false;
}

var filterDocs = function(){
  var docs = document.querySelectorAll("#docs .doc");
  for(var i = 0; i< docs.length; i++){
    if(docHidden(docs[i])){
      docs[i].style.display = 'none';
    }else{
      docs[i].style.display = '';
    }
  }
  setUrl();
}

var setUrl = function(){
  var url = [];
  if(hidden.length > 0) url.push("hidden=" + hidden.join('|'));
  if(tags.length > 0) url.push("tags=" + tags.join('|'));
  if(url.length === 0){
    history.replaceState({}, document.title, '/');
  }else{
    history.replaceState({}, document.title, '/#' + url.join('&'));
  }
}

var enumFilter = function(e){
  if(this.className == "selected"){
    hidden.push(this.getAttribute("data-filter"));
    this.className = "unselected";
  }else{
    var i = hidden.indexOf(this.getAttribute("data-filter"));
    if(i != -1) { hidden.splice(i, 1); }
    this.className = "selected";
  }
  filterDocs();
  return false;
}

var tagFilter = function(e){
  var siblings = this.parentElement.getElementsByTagName('a');
  var first_click = true;
  for(var i=0; i< siblings.length; i++){
    if(siblings[i].className !== 'selected'){
      first_click = false;
      break;
    }
  }
  if(first_click){
    // just select this tag and deselect the others
    for(var i=0; i< siblings.length; i++){
      siblings[i].className = 'unselected';
    }
    this.className = 'selected';
    tags.push(this.getAttribute("data-filter"));
  }else{
    // toggle this tag
    if(this.className == "selected"){
      var i = tags.indexOf(this.getAttribute("data-filter"));
      if(i != -1) { tags.splice(i, 1); }
      this.className = "unselected";
    }else{
      tags.push(this.getAttribute("data-filter"));
      this.className = "selected";
    }
  }
  if(tags.length === 0){
    for(var i=0; i< siblings.length; i++){
      siblings[i].className = 'selected';
    }
  }
  filterDocs();
  return false;
}

var setupFilter = function(type, fn, enabledFn){
  var links = document.querySelectorAll("#" + type + " a");
  for(var i=0; i<links.length; i++){
    links[i].onclick = fn;
    links[i].className = enabledFn(links[i]) ? "selected" : "unselected";
  }
}
var parseUrl = function(){
  if(window.location.hash.length <= 1) return;
  var params = window.location.hash.replace('#', '').split('&').map(function(p){
    var s = p.split('=');
    window[s[0]] = s[1].split('|');
  });
}

var filterLinkEnabled = function(link){
  if(hidden.length == 0){
    return true;
  }else{
    for(var i = 0; i< hidden.length; i++){
      if(link.getAttribute('data-filter').indexOf(hidden[i]) > -1){
        return false;
      }
    }
    return true;
  }
}

var tagLinkEnabled = function(link){
  if(tags.length == 0){
    return true;
  }else{
    for(var i = 0; i< tags.length; i++){
      if(link.getAttribute('data-filter').indexOf(tags[i]) > -1){
        return true;
      }
    }
    return false;
  }
}

var setupFilters = function(){
  parseUrl();
  setupFilter('type-filter', enumFilter, filterLinkEnabled);
  setupFilter('level-filter', enumFilter, filterLinkEnabled);
  setupFilter('tag-filter', tagFilter, tagLinkEnabled);
  setupFilter('hw-filter', enumFilter, filterLinkEnabled);
  filterDocs();
}

if (window.addEventListener) {
    window.addEventListener('load', setupFilters, false);
} else {
    window.attachEvent('onload', setupFilters);
}