var http = require('http');
var url = require('url');

const port = 8124

function start(route, handle)
{
    http.createServer((request, response) => 
    {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " recieved.");
        
        request.setEncoding("utf8");

        // POSTデータをため込む
        request.addListener("data", (postDataChunk) =>
        {
            postData += postDataChunk;
            console.log("Recieve POST Data Chunk '" + postDataChunk + "'");
        });

        // POSTデータ終わり
        request.addListener("end", () =>
        {
            route(handle, pathname, response, postData);
        })
        
    }).listen(port);
    console.log('Server is runnning at http://localhost:${port}/');
}

exports.start = start;



