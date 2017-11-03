import * as http from "http";

export class Router
{
    // ルート情報
    private _routeMap: {[key: string]: Function; };

    // ----------------------
    // コンストラクタ
    // @param   [in]    route   ルート情報
    // ----------------------
    public constructor(routeMap: {[key: string]: Function; })
    {
        this._routeMap = routeMap;
    }

    // ----------------------
    // ルーティング
    // @param   [in]    pathname    URLパス名
    // @param   [in]    response    httpレスポンス
    // @param   [in]    postData    POSTデータ
    // ----------------------
    public routing(pathname: string, response:http.ServerResponse, postData: string): void
    {
        if (null != this._routeMap) {
            if (typeof(this._routeMap[pathname]) === 'function') {
                this._routeMap[pathname](response, postData);
                return;
            }
        }

        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type" : "text/plain"});
        response.write("404 Not found.");
        response.end();
    }
}