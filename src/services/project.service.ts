import Project from "../models/Project";

 
 
 
 
 const createProjectService = async (data: any, userId: string) => {
    return await Project.create({
        ...data,
        createdBy: userId,
    });
};


export const projectService = {
    createProjectService,
}