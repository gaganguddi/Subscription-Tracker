import {Router} from 'express';
import authorize from "../middlewares/auth.middleware.js";
import {createSubscription, getUserSubscriptions} from "../controllers/subscription.controller.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get('/', (req, res) => res.send({title: 'GET all subscriptions'}));

subscriptionRoutes.get('/:id', (req ,res)  => res.send({title: 'GET  subscription datails'}));

subscriptionRoutes.post('/', authorize,createSubscription);
//sample test for postman
/*subscriptionRoutes.post('/', (req, res, next) => {
    console.log("Body received:", req.body);
    // res.send("It works!");
});*/

subscriptionRoutes.put('/:id', (req, res) => res.send({title: 'UPDATE subscriation'}));

subscriptionRoutes.delete('/:id', (req, res) => res.send({title: 'DELETE subscriation'}));

subscriptionRoutes.get('/user/:id', authorize, getUserSubscriptions );

subscriptionRoutes.post('/:id/cancel', (req, res) => res.send({title: 'CANCEL subscriation'}));

subscriptionRoutes.get('/upcoming-renewals', (req, res) => res.send({title: 'GET upcoming renewals'}));


export default subscriptionRoutes;