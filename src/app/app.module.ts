import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { PublicModule } from './public/public.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CoursesComponent } from './courses/courses.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon'
import { FlexLayoutModule  } from '@angular/flex-layout'
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { GoalsComponent } from './goals/goals.component';
import { GoalsFormComponent } from './goals/goals-form/goals-form.component';
import { GoalDetailsComponent } from './goals/goal-details/goal-details.component';
import { ItemCellComponent } from './components/item-cell/item-cell.component';
import { GoalHeaderComponent } from './components/goal-header/goal-header.component';
import { CircleProgressBarComponent } from './components/circle-progress-bar/circle-progress-bar.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { LinearProgressBarComponent } from './components/linear-progress-bar/linear-progress-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './public/home/home.component';
import { CircleProgressBarModule } from './components/circle-progress-bar/circle-progress-bar.module';
import { GoalItemCellComponent } from './components/cells/goal-item-cell/goal-item-cell.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DATE_FORMATS } from './models/date-formats';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GoalItemFormComponent } from './components/cells/goal-item-cell/goal-item-form/goal-item-form.component';
@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    DashboardComponent,
    NavbarComponent,
    CoursesComponent,
    CourseFormComponent,
    ConfirmDialogComponent,
    GoalsComponent,
    GoalsFormComponent,
    GoalDetailsComponent,
    ItemCellComponent,
    GoalHeaderComponent,
    CourseCardComponent,
    LinearProgressBarComponent,
    GoalItemCellComponent,
    GoalItemFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    CircleProgressBarModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule 
  ],
  providers: [ 
    MatDatepickerModule,
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: {hasBackdrop: false}
    }
  ],
  entryComponents: [
    CourseFormComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
