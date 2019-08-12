import { inject, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../web-api';
import { ContactUpdates, ContactViewed } from '../messages';
import { areEqual } from '../utility';
//
import { Router } from 'aurelia-router';
//


interface Contact {
    firstName: string;
    lastName: string;
    email: string;
}

@autoinject
export class ContactDetail {
    routeConfig;
    contact: Contact;
    originalContact: Contact;

    constructor(private router: Router, private api: WebAPI, private ea: EventAggregator) {


    }

    activate(params, routeConfig) {

        this.routeConfig = routeConfig;

        return this.api.addContact();
    }
    addsave() {
        this.api.saveContact(this.contact).then(contact => {
            this.contact = <Contact>contact;
            this.routeConfig.navModel.setTitle(this.contact.firstName);
            this.originalContact = JSON.parse(JSON.stringify(this.contact));
            this.ea.publish(new ContactUpdates(this.contact));
            
            // navigate towards the initial list  

            let success = confirm('You have successfully added a new contact.');
            if (success) {
                this.router.navigateToRoute("list")
            }
            else {
                // future functionality that refreshes the view after the contact was added
            }

        });
    } 

} 