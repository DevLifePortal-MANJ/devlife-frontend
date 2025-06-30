import { Routes } from '@angular/router';
import { Login } from './pages/login/login/login';
import { Register } from './pages/register/register/register';
import { Dashboard } from './pages/dashboard/dashboard/dashboard';
import { CodeRoast } from './pages/code-roast/code-roast';
import { BugChase } from './pages/bug-chase/bug-chase';
import { CodeAnalyzer } from './pages/code-analyzer/code-analyzer';
import { DevDating } from './pages/dev-dating/dev-dating';
import { EscapeMeeting } from './pages/escape-meeting/escape-meeting';
import { CodeCasino } from './pages/code-casino/code-casino';

export const routes: Routes = [
    {path:'', redirectTo:'login',pathMatch:'full'},
    {path:'login' ,component: Login},
    {path:'register' ,component: Register},
    {path:'dashboard' ,component: Dashboard},
    {path:'casino' ,component: CodeCasino},
    {path: 'roast', component: CodeRoast },
    {path: 'bug-chase', component: BugChase },
    {path: 'analyzer', component: CodeAnalyzer },
    {path: 'dating', component: DevDating },
    {path: 'escape', component: EscapeMeeting }


];
