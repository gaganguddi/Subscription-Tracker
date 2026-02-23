import { Router } from 'express';

const workflowRoutes = Router();

workflowRoutes.get('/', (req, res) => res.send({}));

export default workflowRoutes;