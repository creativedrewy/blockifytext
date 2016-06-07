require({ 
    paths: {
        'three': "vendor/threejs/three"
    }
}, [ 'BlockifyText' ], function(lib) {
    var blockifier = new lib.BlockifyText();
    blockifier.run();
}); 