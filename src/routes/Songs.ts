import { IncomingMessage, ServerResponse } from "http";
import { getSongs, getSongById, addSong } from "../controllers/Songs";

//http://localhost:3000/songs

export const songsRoutes = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/songs" ) {
    const songs = getSongs();

    const parts = req.url.split("/");
    console.log(parts, "url parts");

    const id = parts.length > 2 ? parseInt(parts[2]) : undefined;

    if (req.method === "GET" && !id) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(songs));
      return;
    }

    if (req.method === "GET" && id) {
      const song = getSongById(id);
      res.writeHead(song ? 200 : 404, { "Content-Type": "application/json" });
      res.end(JSON.stringify(song || { message: " Not found" }));
      return;
    }

    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        console.log(chunk, "chunk");
        body += chunk.toString();
        console.log(body, "body");
      });

      req.on("end", () => {
        const { title, artist, duration } = JSON.parse(body);
        const newSong = addSong(title, artist, duration);
        res.writeHead(201, { "Content-type": "application/json" });
        res.end(JSON.stringify(newSong));
        return;
      });
    }
  }
};
