require({ 
    paths: {
        'three': "vendor/threejs/three",
        'rx': "vendor/rxjs/rx.all"
    }
}, [ 'BlockifyText' ], function(lib) {
    var blockifier = new lib.BlockifyText();
    blockifier.run();
}); 