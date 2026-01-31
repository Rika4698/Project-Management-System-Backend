import { AuthRequest } from "../middleware/auth";
import { projectService } from "../services/project.service";
import catchAsync from "../utils/catchAsync";
import { Response, NextFunction } from 'express';
import sendResponse from "../utils/sendResponse";
import { createAuditLog } from "../utils/audit";
import { AuditAction } from "../models/AuditLog";



// create projects
 const createProject = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const project = await projectService.createProjectService(req.body, req.user!._id.toString());

    await createAuditLog(req.user!._id.toString(), AuditAction.CREATE_PROJECT, `Created project: ${project.name}`, req);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Project created successfully',
        data: project,
    });
});


// get all projects
const getProjects = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const search = (req.query.search as string) || '';
    const projects = await projectService.getProjectsService(req.user!.role, search);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Projects retrieved successfully',
        data: projects,
    });
});



// update projects (only admin)
export const updateProject = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const project = await projectService.updateProjectService(req.params.id, req.body);

    await createAuditLog(req.user!._id.toString(), AuditAction.UPDATE_PROJECT, `Updated project: ${req.params.id}`, req);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Project updated successfully',
        data: project,
    });
});


// soft delete (only admin)
const deleteProject = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = await projectService.deleteProjectService(req.params.id);

    await createAuditLog(req.user!._id.toString(), AuditAction.DELETE_PROJECT, `Deleted project: ${req.params.id}`, req);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Project deleted successfully',
        data: result,
    });
});


export const projectController  = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
}