import {prisma} from "../prisma";
import {getWorkflowById} from "../utils/fetchWorkflow";
import { validateWorkflow } from "../utils/validateWorkflow";

export async function runWorkflow(payload: any){
    const workflow = await getWorkflowById(payload);

    return validateWorkflow(workflow);

}
