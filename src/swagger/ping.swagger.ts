/**
 * @swagger
 * /ping:
 *   get:
 *     summary: check if the server is running.
 *     tags:
 *       - Ping
 *     description: Returns a success message with 'P=pong'.
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: pong
 */
