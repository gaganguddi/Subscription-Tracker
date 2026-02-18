import {Router} from "express";

import {singIn, singOut, singUp} from "../controllers/auth.controller.js";

const authRoutes = Router();


// Path : /api/v1/auth/sing-up
authRoutes.post('/sign-up', singUp);

//Path : /api/v1/auth/sing-in
authRoutes.post('/sign-in', singIn);

//Path : /api/v1/auth/sing-out
authRoutes.post('/sign-out', singOut);

export default authRoutes;

//stoped at 1:40