import { ExplainComponent } from "./explain/explain.component";

export const infoRouter = [
  { path:'', redirectTo:'explain', pathMatch:'full' },
  { path:'explain', component:ExplainComponent, data: ['说明', '说明'], }
]
