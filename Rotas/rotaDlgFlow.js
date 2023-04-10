import { Router } from "express";
import ChamadoCTRL from "../Controle/ChamadoCTRL.js";
const rotaDlgFlow = new Router();
const chamadoCTRL = new ChamadoCTRL();

rotaDlgFlow.post('/', chamadoCTRL.processarIntents);


export default rotaDlgFlow;