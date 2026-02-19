import {Router} from "express";

import {signIn, signOut, signUp} from "../controllers/auth.controller.js";

const authRoutes = Router();


// Path : /api/v1/auth/sing-up
authRoutes.post('/sign-up', signUp);

//Path : /api/v1/auth/sing-in
authRoutes.post('/sign-in', signIn);

//Path : /api/v1/auth/sing-out
authRoutes.post('/sign-out', signOut);

export default authRoutes;

//stoped at 1:40