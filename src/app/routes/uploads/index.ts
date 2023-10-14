import express, { Router } from 'express';

const uploadsRouter = Router();

uploadsRouter.get('*', express.static('uploads'));

export default uploadsRouter;
