export class PipelineStage {
  id: string;
  name: string;
  status: string;
  startTimeMillis: number;
  durationMillis: number;
  pauseDurationMillis: number;
  stageFlowNodes: any[];
  
  constructor(data) {
    var obj = data || {};
    this.id = obj.id || "";
    this.name = obj.name || "";
    this.status = obj.status || "";
    this.startTimeMillis = obj.startTimeMillis || 0;
    this.durationMillis = obj.durationMillis || 0;
    this.pauseDurationMillis = obj.pauseDurationMillis || 0;
    this.stageFlowNodes = obj.stageFlowNodes || [];
  }
}


