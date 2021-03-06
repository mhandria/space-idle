import { ResourceCollection } from '../models/resource';

export class TaskDefinition {
  public baseProduction: ResourceCollection = new ResourceCollection();
  constructor (
    public name: string
  ) {}

  public addProduction(resource: string, amount: number): TaskDefinition {
    this.baseProduction.add(resource, amount);
    return this;
  }
}

export const TASK_LIBRARY: TaskDefinition[] = [
  new TaskDefinition('Survey').addProduction('survey', 0.6),
  new TaskDefinition('Logging').addProduction('hydrocarbon', 0.5),
  new TaskDefinition('Mining').addProduction('metal', 0.4),
  new TaskDefinition('Sifting').addProduction('silicate', 0.4)
];
