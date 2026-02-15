import {Router} from 'express';

const subscriptionRoutes = Router();

subscriptionRoutes.get('/', (req, res) => res.send({title: 'GET all subscriptions'}));

subscriptionRoutes.get('/:id', (req ,res)  => res.send({title: 'GET  subscription datails'}));

subscriptionRoutes.post('/', (req, res) => res.send({title: 'CREATE subscriation'}));

subscriptionRoutes.put('/:id', (req, res) => res.send({title: 'UPDATE subscriation'}));

subscriptionRoutes.delete('/:id', (req, res) => res.send({title: 'DELETE subscriation'}));

subscriptionRoutes.get('/user/:id', (req, res) => res.send({title: 'GET all user subscriation'}));

subscriptionRoutes.post('/:id/cancel', (req, res) => res.send({title: 'CANCEL subscriation'}));

subscriptionRoutes.get('/upcoming-renewals', (req, res) => res.send({title: 'GET upcoming renewals'}));


export default subscriptionRoutes;