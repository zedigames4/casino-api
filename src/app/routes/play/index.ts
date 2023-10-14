import express, { Router } from 'express';

const playRouter = Router();

playRouter.get('*', express.static('public/games'));

export default playRouter;
