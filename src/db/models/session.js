import { model, Schema } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const schemaSession = new Schema({
  userId: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessTokenValidUntil: {
    type: Date,
    required: true,
  },
  refreshTokenValidUntil: {
    type: Date,
    required: true,
  },
});

schemaSession.post('save', mongooseSaveError);

schemaSession.pre('findOneAndUpdate', setUpdateSettings);

schemaSession.post('findOneAndUpdate', mongooseSaveError);

export const SessionCollection = model('sessions', schemaSession);
