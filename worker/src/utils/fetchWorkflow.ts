import {prisma} from "../prisma";

export async function getWorkflowById(payload :any){
    const workflow=await prisma.workflow.findUnique({
        where:{id:payload.workflowId}
    });

    if(!workflow){
        throw new Error(`Workflow with id ${payload.workflowId} not found`);
    }

    return workflow;
}