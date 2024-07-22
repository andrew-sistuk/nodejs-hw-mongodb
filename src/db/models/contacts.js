import { model, Schema } from 'mongoose';
import { emailRegex, typeContactList } from '../../constants/contacts.js';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

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
      match: [emailRegex, 'Please enter a valid email address'],
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
    userId: {
      type: String,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schemaContacts.post('save', mongooseSaveError);

schemaContacts.pre('findOneAndUpdate', setUpdateSettings);

schemaContacts.post('findOneAndUpdate', mongooseSaveError);

export const ContactsCollection = model('contacts', schemaContacts);
