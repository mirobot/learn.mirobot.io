var hidden = [];
var visible = [];
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
}

var enumFilter = function(e){
  if(this.className == "selected"){
    var i = visible.indexOf(this.getAttribute("data-filter"));
    if(i != -1) { visible.splice(i, 1); }
    hidden.push(this.getAttribute("data-filter"));
    this.className = "unselected";
  }else{
    var i = hidden.indexOf(this.getAttribute("data-filter"));
    if(i != -1) { hidden.splice(i, 1); }
    visible.push(this.getAttribute("data-filter"));
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
    tags.push(this.getAttribute("data-tag"));
  }else{
    // toggle this tag
    if(this.className == "selected"){
      var i = tags.indexOf(this.getAttribute("data-tag"));
      if(i != -1) { tags.splice(i, 1); }
      this.className = "unselected";
    }else{
      tags.push(this.getAttribute("data-tag"));
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

var setupFilter = function(type, fn){
  var links = document.querySelectorAll("#" + type + " a");
  for(var i=0; i<links.length; i++){
    visible.push(links[i].getAttribute("data-filter"));
    links[i].onclick = fn;
    links[i].className = "selected";
  }
}

var setupFilters = function(){
  setupFilter('type-filter', enumFilter);
  setupFilter('level-filter', enumFilter);
  setupFilter('tag-filter', tagFilter);
  //setupFilter('hw-filter');
}

if (window.addEventListener) {
    window.addEventListener('load', setupFilters, false);
} else {
    window.attachEvent('onload', setupFilters);
}