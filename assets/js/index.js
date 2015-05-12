var hidden = [];
var visible = [];

var docHidden = function(doc){
  
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

var clickHandler = function(e){
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

var setupFilter = function(type){
  var links = document.querySelectorAll("#" + type + " a");
  for(var i=0; i<links.length; i++){
    visible.push(links[i].getAttribute("data-filter"));
    links[i].onclick = clickHandler;
    links[i].className = "selected";
  }
}

var setupFilters = function(){
  setupFilter('type-filter');
  setupFilter('level-filter');
  //setupFilter('hw-filter');
}

if (window.addEventListener) {
    window.addEventListener('load', setupFilters, false);
} else {
    window.attachEvent('onload', setupFilters);
}