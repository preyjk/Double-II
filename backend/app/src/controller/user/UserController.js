import express from 'express';
import UserService from '../../service/UserService.js';

const router = express.Router();

/**
 * @openapi
 * /user/profile:
 *  get:
 *    summary: Get user profile
 *    description: Get user profile
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Get user profile
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                FirstName:
 *                  type: string
 *                LastName:
 *                  type: string
 *                Email:
 *                  type: string
 *      404:
 *        description: User not found
 */
router.get('/profile', async (req, res) => {
  const id = req.auth.id;
  const user = await UserService.getUserById(id);
  if (user.success) {
    const { FirstName, LastName, Email } = user.data;
    return res.json({ FirstName, LastName, Email });
  } 
  return res.status(404).json({ message: user.message });
});

export default router;