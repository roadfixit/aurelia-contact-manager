  import {customAttribute, bindable, inject} from 'aurelia-framework';
  import {EventAggregator} from 'aurelia-event-aggregator';
  import {WebAPI} from './web-api';
  import {ContactUpdates,ContactViewed} from './messages';
  import {areEqual} from './utility';
  
  interface Contact {
    firstName: string;
    lastName: string;
    email: string;
  }
  
  @inject(WebAPI, EventAggregator)
  @customAttribute('add-contact')

  
  export class AddContact {

    routeConfig;
    contact: Contact;
    originalContact: Contact;
  
    constructor(private api: WebAPI, private ea: EventAggregator) { }
  
    activate(params, routeConfig) {
      this.routeConfig = routeConfig;
  
      return this.api.getContactDetails(params.id).then(contact => {
        this.contact = <Contact>contact;
        this.routeConfig.navModel.setTitle(this.contact.firstName);
        this.originalContact = JSON.parse(JSON.stringify(this.contact));
        this.ea.publish(new ContactViewed(this.contact));
      });
    }

    get canAdd() {
        return this.contact.firstName && this.contact.lastName && this.contact.email && !this.api.isRequesting;
      }
  
    add() {
      this.api.addContact(this.contact).then(contact => {
        this.contact = <Contact>contact;
        this.routeConfig.navModel.setTitle(this.contact.firstName);
        this.originalContact = JSON.parse(JSON.stringify(this.contact));
        this.ea.publish(new ContactUpdates(this.contact));
      });
    }
  

  }
  