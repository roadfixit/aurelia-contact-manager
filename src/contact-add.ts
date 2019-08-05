import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from './web-api';
import { ContactViewed } from './messages';

@autoinject
export class ContactAdd {

  routeConfig;
  contact: any ;

  constructor(
    private api: WebAPI,
    private ea: EventAggregator
  ) { }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
  }
  save(){
    localStorage.setItem('Contacts', JSON.stringify(this.contact));
  }

  get canAdd() {
    return this.contact.firstName && this.contact.lastName && this.contact.email && !this.api.isRequesting;
  }

}
