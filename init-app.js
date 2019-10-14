const app = angular.module('something', []);

app.controller('somecontroller', function(){
	this.logs = [];
	this.addNewItem = function(){
  	this.items = this.items || [];
    this.items.push('');
  }
  
  this.showLogs = function(){
  	console.table(this.logs);
  }
})

app.directive('someItem', function(){
	return {
    template: `<p>something</p>`
  }
});

app.directive('anotherItem', function(){
	return{
  	'restrict': 'A',
    'scope': {
    	'logs': '='	
    },
    'controller': function($scope, $element, $attrs){
      $element[0].addEventListener('mouseenter', () => this.logMessage($attrs.hoverText));
      $element[0].addEventListener('click', () => this.logMessage($attrs.clickText));
      
      this.logMessage = function(message){
      	$scope.logs.push(Date.now() + ' ' + message);
      }
    }
  }
})
