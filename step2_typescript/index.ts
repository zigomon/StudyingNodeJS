import * as server from "./server";
import * as handler from "./requestHandlers";
import * as router from "./router";

class MainClass
{
    // リクエストハンドラ
    private _handler = new handler.RequestHandler();
    
    // ルート情報
    private _routeMap: {[key: string]: Function; } =
        {
            "/" : this._handler.start,
            "/start" : this._handler.start,
            "/upload" : this._handler.upload
        };

    // HTTPサーバー
    private _server;

    // ----------------------
    // コンストラクタ
    // ----------------------
    public constructor()
    {
        // ルート設定
        //this._routeMap["/"] = this._handler.start;
        //this._routeMap["/start"] = this._handler.start;
        //this._routeMap["/upload"] = this._handler.upload;
    }

    // ----------------------
    // 開始
    // ----------------------
    public start(): void
    {
        // ルーター生成
        var route: router.Router = new router.Router(this._routeMap); 
        
        // サーバーを生成して開始
        this._server = new server.Server(route);
        this._server.start();
    }
}

var main: MainClass = new MainClass();
main.start();

