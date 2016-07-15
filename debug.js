var debugMode = true;
module.exports = {
    disableDebug: function() {
        debugMode = false;
    },

    enableDebug: function() {
        debugMode = true;
    },

    debug: function(argument) {
        if (debugMode) {
            process.stdout.write(argument);
        }
    },

    // new line
    debugNL: function(argument) {
        if (debugMode) {
            process.stdout.write(argument + '\n');
        }
    }
}