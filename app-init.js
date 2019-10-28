(function($wd){
	$wd.watchDogLogs = [];
	$wd.addEventListener('DOMContentLoaded', (event) => {
  	const targetNode = document.querySelector('body');
    
    // Options for the observer (which mutations to observe)
		const config = { attributes: true, childList: true, subtree: true };
    
    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // console.log('A child node has been added or removed.');
                $wd.checkForBinding(mutation.addedNodes);
            }
            else if (mutation.type === 'attributes') {
                // console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    $wd.watchDogObserver = observer;

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  
  
    var containerEl = document.querySelector('#container-el');
    var elementTemplate = document.querySelector('#element-template').content.querySelector('div');
    
    $wd.addNewItem = function(){
      var copyEl = elementTemplate.cloneNode(true);
      containerEl.appendChild(copyEl);
    }
    
    $wd.showLogs = function(){
    	console.table(this.watchDogLogs);
    }
  });
  
  $wd.checkForBinding = function(nodes){
  	for(let node of nodes){
    	var watchNode = !(node.getAttribute('data-watcher') == void 0);
      if(watchNode){
      	node.addEventListener('mouseenter', () => this.logMessage('User is hovering over node'));
        node.addEventListener('click', () => this.logMessage('User clicked on node'));
      }
    }
  }
  
  $wd.logMessage = function(message){
  	this.watchDogLogs.push(Date.now() + ': ' + message);
  }
  
  // unregister observer before window is destroyed
  $wd.onbeforeunload = function(event){
  	this.watchDogObserver.disconnect();
  }
})(window);
