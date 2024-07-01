import { Router } from "express";
import express from "express";
import userController from '../controllers/userController'

Router=express.Router();

Router.post('/register',userController.register)