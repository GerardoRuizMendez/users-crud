import express from "express";
import userRouter from "./modules/users/application/route/users.router";
import authRouter from "./modules/auth/application/route/auth.router";
import cors from "cors";

const server = express();
const port = parseInt(process.env.PORT || "3000");
server.listen(port, "0.0.0.0", function () {
  console.log("Prueba host");
});
//server.set("port", 3000);
server.use(
  cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200,
  })
);

server.options(
  "*",
  cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200,
  })
);
server.use(function (req, res, next) {
  console.log("After CORS " + req.method + " " + req.url);
  next();
});
server.use(express.json());
// {
//   allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
//   exposedHeaders: ["authorization"], // you can change the headers
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
// }
// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );

//   // Allow browsers to send preflight (OPTIONS) requests without interruptions
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

//Router
server.use(userRouter);
server.use(authRouter);

export default server;
