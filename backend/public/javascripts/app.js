var App = {
    workers: [],
    currentWorker: null,
    appContainer: null,
    init: function() {
        App.appContainer = document.getElementById("container");
        var xhReq = new XMLHttpRequest();
        xhReq.onreadystatechange = function() {
            if (xhReq.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
                if (xhReq.status == 200) {
                    App.workers = JSON.parse(xhReq.responseText);
                    App.renderList();
                }
                else if (xhReq.status == 400) {
                }
                else {
                }
            }
        };
        xhReq.open("GET", "/users", false);
        xhReq.send();
    },
    clearHtml: function(id) {    
        while (App.appContainer.firstChild) {
            App.appContainer.removeChild(App.appContainer.firstChild);
        }        
    },
    setCurrentWorker: function(id) {    
        App.currentWorker = App.workers.find(function(worker) {
            return worker.id === id;            
        });   
        App.renderInfo()         ;
    },
    backToList: function() {    
        App.renderList();
    },
    renderInfo: function() {       
        App.clearHtml();
        App.appContainer.insertAdjacentHTML( 'beforeend', '<div class="back" onClick=App.backToList()><i class="fas fa-angle-left"></i></div>' );
        App.appContainer.insertAdjacentHTML( 'beforeend', '<h1>Worker Profile</h1>' );        
        var worker = App.currentWorker;
        var htmlStr = 
        [
            '<div class="row">',
                '<div class="col-md-2 col-4"></div>',
                '<div class="col-md-2 col-4 avatar">',
                    '<img src="' + worker.avatar + '" />',
                '</div>',
                '<div class="col-md-6" >',
                    '<h2>' + worker.firstName + ' ' + worker.lastName + '</h2>',
                    '<h4><b>Birthday:</b> ' + worker.birthday + '</h4>',
                    '<h4><b>Email:</b> ' + worker.email + '</h4>',
                    '<h5><b>Address:</b> ' + worker.address + '</h5>',
                '</div>',
                '<div class="col-md-2 col-sm-0"></div>',
            '</div>',
        ].join('\n');            
        App.appContainer.insertAdjacentHTML( 'beforeend', htmlStr );

    },
    renderList: function() {       
        App.clearHtml();
        App.appContainer.insertAdjacentHTML( 'beforeend', '<h1>Workers</h1>' );
        App.workers.forEach(function(worker) {
            var htmlStr = 
            [
                '<div class="row" onclick=App.setCurrentWorker("' + worker.id + '")>',
                    '<div class="profile-list-item" >',
                        worker.firstName + ' ' + worker.lastName,
                    '</div>',
                '</div>'
            ].join('\n');            
            App.appContainer.insertAdjacentHTML( 'beforeend', htmlStr );
        });        
    },
};