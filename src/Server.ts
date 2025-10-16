import http, {IncomingMessage, ServerResponse} from "http";
import { songsRoutes } from "./routes/Songs";

const PORT = 4000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    if(req.url?.startsWith("/songs")) {
        songsRoutes(req, res);
    } else{
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello World!" }));
    }
  
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});