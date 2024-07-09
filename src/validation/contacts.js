import Joi from 'joi';
import { typeContactList } from '../constants/contacts.js';

export const contactsSchemaAdd = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Field {#label} should be a string',
    'string.min': 'Field {#label} should have at least {#limit} characters',
    'string.max': 'Field {#label} should have at most {#limit} characters',
    'any.required': 'Field {#label} is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Field {#label} should be a string',
    'string.min': 'Field {#label} should have at least {#limit} characters',
    'string.max': 'Field {#label} should have at most {#limit} characters',
    'any.required': 'Field {#label} is required',
  }),
  email: Joi.string()
    .min(3)
    .max(20)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'Field {#label} should be a string',
      'string.email': 'Field {#label} should be like this "*@*.*"',
      'string.min': 'Field {#label} should have at least {#limit} characters',
      'string.max': 'Field {#label} should have at most {#limit} characters',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Field {#label} should be a bool',
  }),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...typeContactList)
    .messages({
      'string.base': 'Field {#label} should be a string',
      'string.min': 'Field {#label} should have at least {#limit} characters',
      'string.max': 'Field {#label} should have at most {#limit} characters',
      'any.only': `Field {#label} should be one from this list [${typeContactList}]`,
    }),
});

export const contactsSchemaUpdate = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Field {#label} should be a string',
    'string.min': 'Field {#label} should have at least {#limit} characters',
    'string.max': 'Field {#label} should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Field {#label} should be a string',
    'string.min': 'Field {#label} should have at least {#limit} characters',
    'string.max': 'Field {#label} should have at most {#limit} characters',
  }),
  email: Joi.string()
    .min(3)
    .max(20)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'Field {#label} should be a string',
      'string.email': 'Field {#label} should be like this "*@*.*"',
      'string.min': 'Field {#label} should have at least {#limit} characters',
      'string.max': 'Field {#label} should have at most {#limit} characters',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Field {#label} should be a bool',
  }),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...typeContactList)
    .messages({
      'string.base': 'Field {#label} should be a string',
      'string.min': 'Field {#label} should have at least {#limit} characters',
      'string.max': 'Field {#label} should have at most {#limit} characters',
      'any.only': `Field {#label} should be one from this list [${typeContactList}]`,
    }),
});
