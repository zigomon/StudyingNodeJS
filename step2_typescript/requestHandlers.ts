import * as http from "http";
import * as querystring from "querystring";
import * as fs from "fs";

export class RequestHandler
{
    // "/start"のハンドラ
    public start(response:http.ServerResponse, postData:string): void
    {
        console.log("Request handler 'start' was called.");

        var path:string = "./view/start.html";
        fs.exists(path, (exists) => {

            if (exists){
                fs.readFile(path, "utf8", (err, data) => {
                    response.writeHead(200, {"Content-Type" : "text/html"});
                    response.write(data);
                    response.end();
                }); 
            }
            else {
                response.writeHead(404, {"Content-Type" : "text/plain"});
                response.write("404 File not found.");
                response.end();
            }
        }); 
    }

    public upload(response:http.ServerResponse, postData:string): void
    {
        console.log("Request handler 'upload' was called.2");
        var path:string = "./view/upload.html";
        fs.exists(path, (exists) => {

            if (exists){
                fs.readFile(path, "utf8", (err, data) => {
                    data = data.replace("<%body%>", postData);
                    response.writeHead(200, {"Content-Type" : "text/html"});
                    response.write(data);
                    response.end();
                }); 
            }
            else {
                response.writeHead(404, {"Content-Type" : "text/plain"});
                response.write("404 File not found.");
                response.end();
            }
        }); 
    }
}