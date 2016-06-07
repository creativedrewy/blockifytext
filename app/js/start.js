require({ 
    paths: {
        'three': "vendor/three"
    }
}, [ 'BlockifyText' ], function(lib) {
    var blockifier = new lib.BlockifyText();
    blockifier.run();
}); 