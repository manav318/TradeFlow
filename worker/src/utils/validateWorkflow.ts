import {prisma} from '../prisma'
import { WorkflowGraph } from './types';

export function validateWorkflow(workflow :any){
    const graph =workflow.definition as WorkflowGraph;
    const {nodes,edges}=graph;

    const nodeIds = new Set(nodes.map(n => n.id));

    for (const edge of edges) {
        if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
            throw new Error("Invalid edge reference");
        }
    }

    const adjacency = new Map<string, string[]>();

    for (const edge of edges) {
        if (!adjacency.has(edge.from)) {
            adjacency.set(edge.from, []);
        }
        adjacency.get(edge.from)!.push(edge.to);
    }

    const inDegree = new Map<string, number>();

for (const node of nodes) {
  inDegree.set(node.id, 0);
}

for (const edge of edges) {
  inDegree.set(edge.to, (inDegree.get(edge.to) ?? 0) + 1);
}

const queue: string[] = [];

for (const [nodeId, degree] of inDegree.entries()) {
  if (degree === 0) {
    queue.push(nodeId);
  }
}

const executionOrder: string[] = [];

while (queue.length > 0) {
  const current = queue.shift()!;
  executionOrder.push(current);

  const neighbors = adjacency.get(current) ?? [];
  for (const next of neighbors) {
    const nextDegree = inDegree.get(next)! - 1;
    inDegree.set(next, nextDegree);

    if (nextDegree === 0) {
      queue.push(next);
    }
  }
}

if (executionOrder.length !== nodes.length) {
  throw new Error(`Workflow id: ${workflow.id} contains a cycle`);
}
  const obj={nodeIds,adjacency,executionOrder};
    return obj;

}

