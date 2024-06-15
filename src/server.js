import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';
import env from './utils/env.js';
import { getAllContacts, getContacById } from './services/contacts.js';

dotenv.config();

const app = express();

const PORT = Number(env('PORT', '3000'));

export default function setupServer() {
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.use(express.json());

  app.get('/contacts', async (_, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: "Successfully found contacts!",
      data: contacts,
    });
  });

  app.get('/contacts/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const contact = await getContacById(studentId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use('*', (_, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, _, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
