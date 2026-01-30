import { Request } from "express";
import AuditLog, { AuditAction } from "../models/AuditLog";



export const createAuditLog = async (
    userId:string,
    action:AuditAction,
    details:string,
    req?:Request
)=> {
    try{
        await AuditLog.create({
            user:userId,
            action,
            details,
            ipAddress: req?.ip,
            userAgent: req?.get('User-Agent'),
        });
    } catch (error){
        console.log('Failed to create audit log:', error);
    }
};