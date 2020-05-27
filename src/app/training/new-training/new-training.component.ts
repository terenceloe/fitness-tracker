import { Component, OnInit, OnDestroy } from '@angular/core';

import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];  
  isLoading = true;
  private exerciseSubscription: Subscription;
  private loadingSubs: Subscription;

  constructor(
    private exerciseService: ExerciseService,
    private uiService: UIService
  ) { }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChange.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.exerciseSubscription = this.exerciseService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.exerciseService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

}
