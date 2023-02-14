import express from "express";
import expressFileUploaded from "express-fileupload";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import authRoutes from "./6-routes/auth-routes";
import vacationRoutes from "./6-routes/vacation-routes";
import adminRoutes from "./6-routes/admin-routes";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUploaded());

server.use("/api", authRoutes);
server.use("/api", vacationRoutes);
server.use("/api", adminRoutes);

server.use("*", routeNotFound);
server.use(catchAll);

server.listen(process.env.PORT, () => console.log(`Listening on http://localhost:${process.env.PORT}`));
