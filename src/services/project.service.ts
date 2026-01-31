import Project from "../models/Project";

 
 
 
 
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

export const projectService = {
    createProjectService,
    getProjectsService,
}