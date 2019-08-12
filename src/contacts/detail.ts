import { inject, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../web-api';
import { ContactUpdates, ContactViewed } from '../messages';
import { areEqual } from '../utility';
//
import { Router } from 'aurelia-router';
//



interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phonenumber: number;

}

@autoinject
export class ContactDetail {
    routeConfig;
    contacts: any;
    contact: Contact;
    originalContact: Contact;

    constructor(private router: Router, private api: WebAPI, private ea: EventAggregator) {


    }

    activate(params, routeConfig) {

        this.routeConfig = routeConfig;

        if (localStorage.length > 0) {

            this.contacts = JSON.parse(localStorage.getItem('Contacts'));


            this.contact = this.contacts.filter(x => x.id == params.id)[0];;
            this.routeConfig.navModel.setTitle(this.contact.firstName);
            this.originalContact = this.contact;
            this.ea.publish(new ContactViewed(this.contact));

            ;
        } else {

            return this.api.getContactDetails(params.id).then(contact => {
                this.contact = <Contact>contact;
                this.routeConfig.navModel.setTitle(this.contact.firstName);
                this.originalContact = JSON.parse(JSON.stringify(this.contact));
                this.ea.publish(new ContactViewed(this.contact));

            });
        }



    }


    // increased scope towards email
    get canSave() {
        return this.contact.firstName && this.contact.lastName && this.contact.email && !this.api.isRequesting;
    }

    save(params) {
        this.api.saveContact(this.contact).then(contact => {
            this.contact = <Contact>contact;
            this.routeConfig.navModel.setTitle(this.contact.firstName);
            this.originalContact = JSON.parse(JSON.stringify(this.contact));
            this.ea.publish(new ContactUpdates(this.contact));

            // navigate towards the initial list  

            let success = confirm('You have successfully changed the contact. Would you like to make subsequent changes?');
            if (success) {
                // future functionality that refreshes the view after changes were made
            }
            else {
                this.router.navigateToRoute("list")
            }
            //


            // retrieves data from localStorage/sessionStorage/cookies and updates it after save

           let saved = this.contacts.findIndex(x => x.id == this.contact.id);
           this.contacts.splice(saved,1, this.contact)
 
            localStorage.setItem('Contacts', JSON.stringify(this.contacts));


        });
    }



    canDeactivate() {
        if (!areEqual(this.originalContact, this.contact)) {
            let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

            if (!result) {
                this.ea.publish(new ContactViewed(this.contact));
            }

            return result;
        }

        return true;
    }
}


