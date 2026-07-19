require('dotenv').config();

const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const { WebSocketServer } = require('ws');
const { setupWSConnection, setPersistence } = require('y-websocket/bin/utils');
const { MongoClient } = require('mongodb');
const Y = require('yjs');
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

let docsCollection;

async function initMongo() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db('syncpad');
  docsCollection = db.collection('documents');

  app.locals.docsCollection = docsCollection;

  console.log('[mongo] connected');
}

setPersistence({
  bindState: async (docName, ydoc) => {
    const existing = await docsCollection.findOne({ docName });
    if (existing?.state) {
      Y.applyUpdate(ydoc, new Uint8Array(existing.state.buffer));
    }

    let saveTimeout = null;
    ydoc.on('update', () => {
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(async () => {
        const state = Buffer.from(Y.encodeStateAsUpdate(ydoc));
        await docsCollection.updateOne(
          { docName },
          { $set: { docName, state, updatedAt: new Date() } },
          { upsert: true }
        );
        console.log(`[mongo] saved doc "${docName}"`);
      }, 1000);
    });
  },

  writeState: async (docName, ydoc) => {
    const state = Buffer.from(Y.encodeStateAsUpdate(ydoc));
    await docsCollection.updateOne(
      { docName },
      { $set: { docName, state, updatedAt: new Date() } },
      { upsert: true }
    );
    console.log(`[mongo] final save for doc "${docName}"`);
  },
});

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', require('./routes/root'));
app.use('/api/docs', require('./routes/api/docs'));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req);
});

initMongo()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[mongo] connection failed:', err.message);
    process.exit(1);
  });