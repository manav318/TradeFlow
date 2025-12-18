export type NodeType = 'trigger'|'indicator'|'condition'|'data'|'buy'|'sell';

export interface Node{
    id: string;
    type: NodeType;
    name?: string;
    config: Record<string, any>;
}

export interface Edge{
    from: string;
    to: string;
}

export interface WorkflowGraph{
    "nodes": Node[];
    "edges": Edge[];
}

export interface ExecutionContext{
    executionId: string;
    userId: string;
    results: Map<string,any>;
}