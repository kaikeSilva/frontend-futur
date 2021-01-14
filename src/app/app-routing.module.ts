import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent } from './public/register/register.component';
import { CoursesComponent } from './courses/courses.component';
import { GoalsComponent } from './goals/goals.component';
import { GoalDetailsComponent } from './goals/goal-details/goal-details.component';


const routes: Routes = [
  {path: '',  loadChildren: "./public/public.module#PublicModule"},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'goals', component: GoalsComponent},
  {path: 'goal/:id', component: GoalDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
