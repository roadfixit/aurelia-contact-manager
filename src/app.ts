import {Router, RouterConfiguration} from 'aurelia-router';
import {inject, PLATFORM} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('no-selection'), title: 'Select'},
      { route: 'contacts',  moduleId: PLATFORM.moduleName('contacts/index'), name:'contacts', nav:true, title: 'Contacts' },
      // { route: 'items',  moduleId: PLATFORM.moduleName('item'), name:'items' }
    ]);

    this.router = router;
  }

}
  
