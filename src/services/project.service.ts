import { ProjectStatus } from "../interfaces/project.interface";
import Project from "../models/Project";
import AppError from "../utils/AppError";

 
 
 
 
 const createProjectService = async (data: any, userId: string) => {
    return await Project.create({
        ...data,
        createdBy: userId,
    });
};


  const getProjectsService = async (userRole: string, search = '') => {
    const query: any = userRole === 'ADMIN' ? {} : { isDeleted: false };

    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    return await Project.find(query).populate('createdBy', 'name email');
};


const updateProjectService = async (id: string, data: any) => {
    const project = await Project.findById(id);

    if (!project) {
        throw new AppError(404, 'Project not found');
    }

    Object.assign(project, data);
    await project.save();

    return project;
};

 const deleteProjectService = async (id: string) => {
    const project = await Project.findById(id);

    if (!project) {
        throw new AppError(404, 'Project not found');
    }

    project.isDeleted = true;
    project.status = ProjectStatus.DELETED;
    await project.save();

    return { message: 'Project soft deleted' };
};

export const projectService = {
    createProjectService,
    getProjectsService,
    updateProjectService,
    deleteProjectService

}