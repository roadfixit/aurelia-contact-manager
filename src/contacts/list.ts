import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from '../web-api';
import {ContactUpdates, ContactViewed} from '../messages';
import {inject, autoinject} from 'aurelia-framework';
import { Router } from 'aurelia-router';
  
  @autoinject
  export class ContactList {
    contacts;
    selectedId = 0;
  
    constructor(private router: Router, private api: WebAPI, ea: EventAggregator) { 
      ea.subscribe(ContactViewed, msg => this.select(msg.contact));
      ea.subscribe(ContactUpdates, msg=> {
        let id = msg.contact.id;
        let found = this.contacts.find(x => x.id == id);
        Object.assign(found,msg.contact);
      });
    }
  
    created() {
      this.api.getContactList().then(contacts => this.contacts = contacts);
    }
  
    select(contact) {
      this.selectedId = contact.id;
      return true;
    }

    navigateAdd() {
      this.router.navigateToRoute("list-add");
    }
  }
  

  

  
  

  


