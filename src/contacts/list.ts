'use strict';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../web-api';
import { ContactUpdates, ContactViewed } from '../messages';
import { inject, autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

//
interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

}
//


@autoinject
export class ContactList {
  contacts;
  //
  contact: Contact;
  //
  selectedId = 0;



  constructor(private router: Router, private api: WebAPI, ea: EventAggregator) {
    ea.subscribe(ContactViewed, msg => this.select(msg.contact));
    ea.subscribe(ContactUpdates, msg => {
      let id = msg.contact.id;
      let found = this.contacts.find(x => x.id == id);
      Object.assign(found, msg.contact);


    });
  }



  async activate() {
    const contacts = await this.api.getContactList();
    if (contacts) {
      this.contacts = contacts;
      this.addContactData();
    }
  }

  addContactData() {

    localStorage.setItem('Contacts', JSON.stringify(this.contacts));
    sessionStorage.setItem('Contacts', JSON.stringify(this.contacts));
    create_cookie('Contacts', this.contacts);

    // this.contacts.map(
    //   x => localStorage.setItem("Contact" + '' + x.id, JSON.stringify(x)));
    // this.contacts.map(
    //   x => sessionStorage.setItem("Contact" + '' + x.id, JSON.stringify(x)));
    // this.contacts.map(
    //   x => create_cookie("Contact" + '' + x.id, this.contacts));


    function create_cookie(cname, cvalue) {

      document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + ";path=/";
    }


  }



  select(contact) {
    this.selectedId = contact.id;
    return true;
  }

  /*
    test() {
  
      fs.writeFile('./jsondata.json', jsondata, (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
    }
    */

  navigateAdd() {
    this.router.navigateToRoute("add");
  }
}










