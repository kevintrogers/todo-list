import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.html';


Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
if (Meteor.isClient) {
    Template.body.onRendered(function(){
    // sort: true
        Sortable.create(tasksList, {
            group: "sorting",
            sort: true
        });
    
      });
  }
	
        


Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
   Meteor.call('tasks.setChecked', this._id, !this.checked);
   $('li span').toggleClass('linethrough');
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  }
  
});