import Project from "../models/Project";
import AppError from "../utils/AppError";

 
 
 
 
 const createProjectService = async (data: any, userId: string) => {
    return await Project.create({
        ...data,
        createdBy: userId,
    });
};


 const getProjectsService = async (userRole: string) => {
    const query = userRole === 'ADMIN' ? {} : { isDeleted: false };
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


export const projectService = {
    createProjectService,
    getProjectsService,
    updateProjectService,

}