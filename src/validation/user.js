import Joi from 'joi';

export const validationUserSignUp = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Field {#label} should be a string',
    'string.min': 'Field {#label} should have at least {#limit} characters',
    'string.max': 'Field {#label} should have at most {#limit} characters',
    'any.required': 'Field {#label} is required',
  }),
  email: Joi.string()
    .min(3)
    .max(20)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'Field {#label} should be a string',
      'string.email': 'Field {#label} should be like this "*@*.*"',
      'string.min': 'Field {#label} should have at least {#limit} characters',
      'string.max': 'Field {#label} should have at most {#limit} characters',
    }),
  password: Joi.string().min(8).required().messages({
    'string.base': 'Field {#label} should be a string',
    'string.min': 'Field {#label} should have at least {#limit} characters',
    'any.required': 'Field {#label} is required',
  }),
});

export const validationUserSignIn = Joi.object({
  email: Joi.string()
    .min(3)
    .max(20)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'Field {#label} should be a string',
      'string.email': 'Field {#label} should be like this "*@*.*"',
      'string.min': 'Field {#label} should have at least {#limit} characters',
      'string.max': 'Field {#label} should have at most {#limit} characters',
    }),
  password: Joi.string().min(8).required().messages({
    'string.base': 'Field {#label} should be a string',
    'string.min': 'Field {#label} should have at least {#limit} characters',
    'any.required': 'Field {#label} is required',
  }),
});
