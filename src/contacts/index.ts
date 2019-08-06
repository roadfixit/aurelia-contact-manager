import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-framework';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: ['','list'],moduleId: PLATFORM.moduleName('./list'), title: 'Select'},      
      // { route: 'items',  moduleId: PLATFORM.moduleName('item'), name:'items' }
    ]);

    this.router = router;
  }

}
  
