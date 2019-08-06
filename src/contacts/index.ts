import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-framework';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: ['','list'], moduleId: PLATFORM.moduleName('./list'), nav: true, name:'list', title: 'Select'},
      { route: '/:id',      moduleId: PLATFORM.moduleName('./list-detail'), name:'contacts' },
      { route: 'list-add',  moduleId: PLATFORM.moduleName('./list-add'), name:'list-add' }     
      // { route: 'items',  moduleId: PLATFORM.moduleName('item'), name:'items' }
    ]);

    this.router = router;
  }

}
  
