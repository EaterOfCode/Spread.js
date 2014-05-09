/**
 * Spread.js | EaterOfCode
 * https://gist.github.com/EaterOfCode/7954fdd2e4130c71b2a3
 * Spread that data
 * Licensed by MIT license
 */

(function(isNode) {

    function Spread(arr, key, cb) {
        var counted = {};
        if (typeof(key) == 'function') {
            cb = key;
            key = false;
        }
        if (key === true) {
            counted = arr;
        } else {
            if (!Array.isArray(arr)) {
                nextTime(function() {
                    cb(new Error('Argument is not an array'));
                });
                return;
            }
            arr.forEach(function(a) {
                if (key) {
                    counted[a[key]] = ++counted[a[key]] || 1;
                } else {
                    counted[a] = ++counted[a] || 1;
                }
            });
        }
        var uniq = Object.keys(counted);
        var rest = {};
        uniq.sort().forEach(function(a) {
            if (counted[a] % 2 == 1) {
                counted[a]--;
                rest[a] = 1;
                if (counted[a] == 0) return delete(counted[a]);
            }
            counted[a] /= 2;
        });
        var result = [];
        Object.keys(rest).sort().forEach(function(a) {
            result.push(a);
        });
        if (Object.keys(counted).length > 0) {
            nextTime(function() {
                Spread(counted, true, function(err, rcresult) {
                    result = [].concat(rcresult, result, rcresult);
                    fix();
                });
            });
            return;
        }
        return fix();

        function fix() {
            if (key && key !== true) {
                var shifter = [].concat(arr);
                var sorted = [];
                result.forEach(function(a) {
                    for (var i = 0; a != shifter[i][key]; i++);
                    sorted.push(shifter.splice(i, 1)[0]);
                });
                return cb(null, sorted);
            }
            return cb(null, result);
        }
    }

    Spread.sync = function(arr, key) {
        var counted = {};
        if (key === true) {
            counted = arr;
        } else {
            if (!Array.isArray(arr)) {
                throw new Error('Argument is not an array');
            }
            arr.forEach(function(a) {
                if (key) {
                    counted[a[key]] = ++counted[a[key]] || 1;
                } else {
                    counted[a] = ++counted[a] || 1;
                }
            });
        }
        var uniq = Object.keys(counted);
        var rest = {};
        uniq.sort().forEach(function(a) {
            if (counted[a] % 2 == 1) {
                counted[a]--;
                rest[a] = 1;
                if (counted[a] == 0) return delete(counted[a]);
            }
            counted[a] /= 2;
        });
        var result = [];
        Object.keys(rest).sort().forEach(function(a) {
            result.push(a);
        });
        if (Object.keys(counted).length > 0) {
            var rcresult = arguments.callee(counted, true);
            result = [].concat(rcresult, result, rcresult);
        }
        if (key && key !== true) {
            var shifter = [].concat(arr);
            var sorted = [];
            result.forEach(function(a) {
                for (var i = 0; a != shifter[i][key]; i++);
                sorted.push(shifter.splice(i, 1)[0]);
            });
            return sorted;
        }
        return result;
    };

    typeof(module) !== 'undefined' && (module.exports = Spread);
    typeof(window) !== 'undefined' && (window.Spread = Spread);

    function nextTime(cb) {
        if (isNode) {
            process.nextTick(cb);
        } else {
            setTimeout(cb, 0);
        }
    }

})(typeof(process) !== 'undefined');