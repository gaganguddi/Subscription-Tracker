import express from "express";
import cookieParser from "cookie-parser";

import {PORT} from './config/env.js';

import userRouter from './routes/user.routes.js';

import authRouter  from "./routes/auth.routes.js";

import subscriptionRouter from "./routes/subscription.routes.js";
import connectTODatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRoutes from "./routes/workflow.routes.js";



// ... existing imports

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// 1. Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRoutes);

// 2. The welcome route (keep it with other routes)
app.get('/', (req, res) => {
    res.send("Welcome to the Subscription Tracker API!");
});

// 3. THE ERROR MIDDLEWARE MUST BE LAST!
// It only catches errors from things defined ABOVE it.
app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Subscription Listening on port ${PORT}!`);
    await connectTODatabase();
});

export default app;