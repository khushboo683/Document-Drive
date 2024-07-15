import express from 'express';
import {check} from 'express-validator';
import { createDocument, getDocument, updateDocument, revertDocument, deleteDocument } from '../controllers/documentController.js';
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();

router.get('/:documentId',getDocument);
router.post('/',
    check('title')
    .notEmpty()
    .isString(),
    check('content')
    .notEmpty()
    .isString(),
    authMiddleware,createDocument);
router.patch('/:documentId',
    check('title')
    .optional()
    .isString(),
    check('content')
    .optional()
    .isString(),
    authMiddleware,updateDocument);
router.post('/:documentId/revert/:versionId',authMiddleware,revertDocument);
router.delete('/:documentId',authMiddleware,deleteDocument);

export default router;