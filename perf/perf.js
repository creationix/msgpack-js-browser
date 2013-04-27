(function() {
    "use strict";
    var iterations = 100;
    function fetch(path, responseType, callback) {
        var req = new XMLHttpRequest();
        req.responseType = responseType || 'text';
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                callback(req.response);
            }
        };
        req.open('GET', path);
        req.send();
    }
    function test(title, obj, operation, context) {
        var result;
        var start = new Date();
        console.group(title);
        console.time(title);
        for (var i = 0; i < iterations; i++) {
            result = operation.call(context, obj);
        }
        console.timeEnd(title);
        var total = new Date() - start;
        var op = total/iterations;
        console.log('Total for %s was %sms, %sms per operation', title, total, op);
        console.groupEnd(title);

        var tableEl = document.getElementById('results');
        var rowEl = document.createElement('tr');

        var titleEl = document.createElement('td');
        titleEl.textContent = title;
        rowEl.appendChild(titleEl);

        var totalEl = document.createElement('td');
        totalEl.textContent = total + 'ms';
        rowEl.appendChild(totalEl);

        var opEl = document.createElement('td');
        opEl.textContent = op + 'ms';
        rowEl.appendChild(opEl);

        tableEl.appendChild(rowEl);
        return result;
    }
    function testDecode(title, path, responseType, operation, context, callback) {
        fetch(path, responseType, function(response) {
            var result = test(title, response, operation, context)
            callback(result);
        });
    }

    testDecode('json decode', 'albums.json', 'text', JSON.parse, JSON, function(obj) {
        test('json encode', obj, JSON.stringify, JSON);
    });

    testDecode('msgpack decode', 'albums.msgpack', 'arraybuffer', msgpack.decode, msgpack, function(obj) {
        test('msgpack encode', obj, msgpack.encode, msgpack);
    });

}).call(this);
