import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  private readonly widgets: string[] = ['Restart device', 'Provision FTD', 'Optimise Policies', 'Integrate on-prem FMC', 'Policy-update from Webex'];

  constructor() { }

  createWorkflow(workflow: string[]): void {
    console.trace(workflow)
  }

  getWorkflows(): string[] {
    return [] as string[]
  }

  getWidgets(): Observable<string[]> {
    return of(this.widgets);
  }
}
