import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Router} from 'meteor/iron:router';
import {AccountsTemplates} from 'meteor/accounts-base';

import './main.html';

Router.configure({
  layoutTemplate: 'masterLayout',
  yieldTemplates: {
    myNav: {to: 'nav'},
    myFooter: {to: 'footer'},
  }
});

AccountsTemplates.configure({
  defaultLayout: 'masterLayout',
});

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  user() {
    return Meteor.user();
  },
  userEmails() {
    return Meteor.user()?.emails.map(({address}) => address).join(', ');
  }
});

Template.hello.events({
  'click .clickcounter'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  'click .logout'(event) {
     AccountsTemplates.logout();
  },
});
