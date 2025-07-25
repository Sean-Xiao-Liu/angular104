import { Directive, effect, inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {

  @Input({required: true, alias: 'appAuth'}) userType: Permission = 'guest'; 
  private authService = inject(AuthService);
  // templateRef is a reference to the template that will be used to create the embedded view
  // viewContainerRef is a reference to the view container that will be used to create the embedded view
  // and the embedded view can be used to update the host dom element
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  constructor() { 
    effect(() => {
      if (this.authService.activePermission() === this.userType) {
        // console.log('show content');
        // render the template into dom
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        // console.log('hide content');
        this.viewContainerRef.clear(); // without this, the content will be shown even if the userType is not the same
      }
    });
  }

}
