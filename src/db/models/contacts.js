import { model, Schema } from 'mongoose';
import { emailRegex, typeContactList } from '../../constants/contacts.js';
import { mongooseSaveError } from './hooks.js';


const schemaContacts = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: [emailRegex,"Please enter a valid email address"]
    },

    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeContactList,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schemaContacts.post('save', mongooseSaveError);

export const ContactsCollection = model('contacts', schemaContacts);
