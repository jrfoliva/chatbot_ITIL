/*
    API que tem como objetivo processar intenções vindas do dialogflow messenger
*/

import express from "express";
import cors from "cors";
import rotaDlgFlow from "./Rotas/rotaDlgFlow.js";

const host = "0.0.0.0";
const port = 9001;

const app = express();
app.use(cors({
    origin: '*',
    methods: ["GET", "POST"]
}));

app.use(express.json());
app.use("/webhook", rotaDlgFlow);

app.use(express.static("./Public"));

app.listen(port, host, () => {
    console.log(`WebHook-ITIL em execução na porta ${port}`);
});
