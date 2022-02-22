// Dependencies.
import express from 'express';
import { ConflictError, NotFoundError } from '../errors/apiErrors';
import { store as storeEmail } from '../services/emailService';
import { store as storeUser } from '../services/userService';


export const registerHandler = async (req, res, next) => {
    try {
        // Register handler.
        return res.status(201);
    } catch (error) {
        return next(error);
    }
}

export const loginHandler = async (req, res, next) => {
    try {
        // Login handler.
        return res.status(200);
    } catch (error) {
        return next(error);
    }
}
