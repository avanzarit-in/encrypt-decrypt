import express from 'express';

import create from './create';
import del from './remove';
import list from './list';
import fetch from './fetch';
import update from './update';

const routes = express.Router(({ mergeParams: true }));
// CHANNEL ROUTE
// Handles all channels Related Config
//

// Create a channels
// POST https://api.eticketdesk.io/accounts/:accountSid/channels
//
/**
 * @swagger
 * /accounts/{account_sid}/channels:
 *   post:
 *     tags:
 *       - Channels
 *     description: Create a new Channel for the Account
 *     parameters:
 *       - in: path
 *         name: account_sid
 *         schema:
 *         type: string
 *         description: The SID of an account
 *         required: true
 *       - in: body
 *         name: channel
 *         description: The channel to create.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - description 
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             updated_by:
 *               type: string 
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Creates a channel that belogs to the account
 *         schema:
 *           $ref: '#/definitions/Channel'
 */
routes.post('/', create);

// // List All channels
// // GET https://api.eticketdesk.io/accounts/:accountSid/channels
// //

/**
 * @swagger
 * /accounts/{account_sid}/channels:
 *   get:
 *     tags:
 *       - Channels
 *     description: Returns all Channels that belong to an Account
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *         type: integer
 *         description: Limit the search results to this value
 *       - in: path
 *         name: account_sid
 *         schema:
 *         type: string
 *         required: true 
 *         description: The SID of an account
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of groups that belog to a account
 *         schema:
 *           $ref: '#/definitions/Channel'
 */
routes.get('/', list);

// // Get channels By ID
// // GET https://api.eticketdesk.io/accounts/:accountSid/channels/:channelSid
// //

/**
 * @swagger
 * /accounts/{account_sid}/channels/{sid}:
 *   get:
 *     tags:
 *       - Channels
 *     description: Return a Channel by its SID
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: account_sid
 *         schema:
 *         type: string
 *         description: The Account SID the channel belongs to
 *       - in: path
 *         name: sid
 *         schema:
 *         type: string
 *         required: true
 *         description: The SID of a Channel
 *     responses:
 *       200:
 *         description: A account by its SID
 *         schema:
 *           $ref: '#/definitions/Department'
 *       '404':
 *         description: No data found with the provided sid
 */

routes.get('/:sid', fetch);

// // Delete a channels
// // DELETE https://api.eticketdesk.io/accounts/:accountSid/channels/:channelSid
// //

/**
 * @swagger
 * /accounts/{account_sid}/channels/{sid}:
 *   delete:
 *     tags:
 *       - Channels
 *     description: Delete a Channel given the account_sid and channel id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: account_sid
 *         schema:
 *         type: string
 *         description: The Account SID the channel belongs to
 *       - in: path
 *         name: sid
 *         schema:
 *         type: string
 *         required: true
 *         description: The SID of a channel to delete
 *     responses:
 *       '200':
 *         description: Returns the channel_id that got deleted.
 *         schema:
 *         type: string
 *       '404':
 *         description: No data found with the provided sid
 */
routes.delete('/:sid', del);

// // Update or Edit a channels
// // POST https://api.eticketdesk.io/accounts/:accountSid/channels/:channelSid
// //
// //

/** 
 * @swagger
 * /accounts/{account_sid}/channels/{sid}:
 *   put:
 *     tags:
 *       - Channels
 *     description: Update the channel details based on query_param and update_param
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: account_sid
 *         schema:
 *         type: string
 *         required: true 
 *         description: The Account SID the channel belongs to
 *       - in: path
 *         name: sid
 *         schema:
 *         type: string
 *         required: true
 *         description: The SID of a channel to delete
 *       - name: ChannelUpdateRequest
 *         description: Channel update request object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ChannelUpdateRequest'
 *     responses:
 *       200:
 *         description: Update the Channel details 
 *         schema:
 *           $ref: '#/definitions/Channel'
 */
routes.put('/:sid', update);

export default routes;
