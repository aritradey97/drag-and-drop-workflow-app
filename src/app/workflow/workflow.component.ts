import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { WorkflowService } from '../service/workflow.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowComponent implements OnDestroy{

  workflow: string[] = [];
  widgets: string[] = [];

  private destroyed$: Subject<void>;

  constructor(private workflowService: WorkflowService) {
    this.destroyed$ = new Subject<void>();
    this.workflowService.getWidgets().pipe(takeUntil(this.destroyed$)).subscribe((widgets) => {
      this.widgets = widgets;
    })
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  drop(event: CdkDragDrop<string[]> | null): void {
    if (!event) {
      return;
    }
    if (event.previousContainer === event.container) {
      const newIndex = this.workflow.length - 1;
      moveItemInArray(event.container.data, event.previousIndex, newIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  

  trackByFn(index: number, item: string) {
    return item; // or return index;
  }

  saveWorkflow(): void {
    this.workflowService.createWorkflow(this.workflow);
  }

  getWidgets(): Observable<string[]> {
    return this.workflowService.getWidgets();
  }
}
