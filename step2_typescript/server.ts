import * as http from "http";
import * as url from "url";
import * as router from "./router";
import * as handler from "./requestHandlers";

export class Server
{
    // ルート情報
    private _router: router.Router;

    // ----------------------
    // コンストラクタ
    // @param   [in]    route   ルート情報
    // @param   [in]    handler リクエストハンドラ
    // ----------------------
    public constructor(router: router.Router)
    {
        this._router = router;
    }

    public start():void
    {
        // サーバーを生成してListen
        http.createServer((request:http.IncomingMessage, response:http.ServerResponse) =>
        {
            // POSTデータ
            var postData: string = "";

            // URLパス名
            var pathname: string = url.parse(request.url).pathname;
            console.log("Request for " + pathname + " recieved.");

            // エンコード指定
            request.setEncoding("utf8");

            // POSTデータ受信イベント
            request.addListener("data", (postDataChunk:string) =>{
                postData += postDataChunk;
            });

            // POST完了イベント
            request.addListener("end", () => {
                this._router.routing(pathname, response, postData);
            });

        }).listen(9000);
    }
}