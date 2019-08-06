'use strict';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from '../web-api';
import {ContactUpdates, ContactViewed} from '../messages';
import {inject, autoinject} from 'aurelia-framework';
import { Router } from 'aurelia-router';

const fs = require('fs');

let student = { 
  name: 'Mike',
  age: 23, 
  gender: 'Male',
  department: 'English',
  car: 'Honda' 
};

let jsondata = JSON.stringify(student, null, 2);
  debugger

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
//
    test(){

        fs.writeFile('./jsondata.json', jsondata, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
//
    }

    navigateAdd() {
      this.router.navigateToRoute("list-add");
    }
  }
  

  

  
  

  


