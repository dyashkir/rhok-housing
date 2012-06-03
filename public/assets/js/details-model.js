function getUrlVars()
{
    var vars = [], hash;
    var queryString = window.location.href.indexOf('?')+1;
    var hashes = window.location.href.slice(queryString).split('=');
    return hashes[1];
}



var ViewModel = function(first, last) {
  var self = this;
 
  var id = getUrlVars();
  console.log('id is' + id);
  self.reports = ko.observableArray();

  $.getJSON("/addresses/" + id, function(data){
  
    data.forEach(function(element){
      self.reports.push(element);
    });

  });
 
};
 
ko.applyBindings(new ViewModel("Planet", "Earth"));
