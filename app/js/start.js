require({ }, [ 'bin/BlockifyText' ], function(Main) {
    var blockifier = new Main.BlockifyText();
    blockifier.run();
});