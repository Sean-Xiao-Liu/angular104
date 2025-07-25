import { Directive, Input } from '@angular/core';

// notice the decorator is different from a component
@Directive({
  // the selector is the attribute that will be used to apply the directive to an element
  // insread of a tag selector
  selector: '[appSafeLink]',
  standalone: true,
  host: {
    // the host is the element that will be used to apply the directive to an element
    '(click)': 'onLeavePage($event)',
  },
})
// a directive is like a componet without a template
export class SafeLinkDirective {
  // default url parameter value
  // set alias as appSafeLink so that we can use it as an attribute in the template
  @Input({alias: 'appSafeLink'}) queryParams: string = 'utm_source=angular-course'; 

  constructor() {
    console.log('SafeLinkDirective is active');
   }

  onLeavePage(event: Event) {
    console.log('Link clicked', event);
    const target = event.target as HTMLAnchorElement;
    
    if (window.confirm('You are going to be redirected to a external site')) {
      event.preventDefault(); // the default behavior of the event is to navigate to the href in the same tab
      if (target.href) {
        const address = target.href;
        target.href = address + '?from=' + this.queryParams;
        window.open(target.href, '_blank');
        console.log('Redirecting to', target.href);
      } else {
        console.log('No href found');
      }
    } else {
      event.preventDefault();
    }
  }

}
