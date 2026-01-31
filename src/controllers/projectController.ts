import { AuthRequest } from "../middleware/auth";
import { projectService } from "../services/project.service";
import catchAsync from "../utils/catchAsync";
import { Response, NextFunction } from 'express';
import sendResponse from "../utils/sendResponse";



// create projects
 const createProject = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const project = await projectService.createProjectService(req.body, req.user!._id.toString());

    // await createAuditLog(req.user!._id.toString(), AuditAction.CREATE_PROJECT, `Created project: ${project.name}`, req);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Project created successfully',
        data: project,
    });
});


// get all projects
const getProjects = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const projects = await projectService.getProjectsService(req.user!.role);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Projects retrieved successfully',
        data: projects,
    });
});

// update projects (only admin)
export const updateProject = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const project = await projectService.updateProjectService(req.params.id, req.body);

    // await createAuditLog(req.user!._id.toString(), AuditAction.UPDATE_PROJECT, `Updated project: ${req.params.id}`, req);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Project updated successfully',
        data: project,
    });
});



export const projectController  = {
    createProject,
    getProjects,
    updateProject,
}