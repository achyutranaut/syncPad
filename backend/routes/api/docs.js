const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const docsCollection = req.app.locals.docsCollection;

    if (!docsCollection) {
      return res.status(503).json({ error: 'Database not ready yet' });
    }

    const { ownerId } = req.query;
    if (!ownerId) {
      return res.status(400).json({ error: 'ownerId query param is required' });
    }

    const docs = await docsCollection
      .find({ participants: ownerId }, { projection: { docName: 1, updatedAt: 1, _id: 0 } })
      .sort({ updatedAt: -1 })
      .toArray();

    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

router.post('/', async (req, res) => {
  try {
    const docsCollection = req.app.locals.docsCollection;

    if (!docsCollection) {
      return res.status(503).json({ error: 'Database not ready yet' });
    }

    const { docName, ownerId } = req.body || {};
    if (!docName || !ownerId) {
      return res.status(400).json({ error: 'docName and ownerId are required' });
    }

    await docsCollection.updateOne(
      { docName },
      {
        $setOnInsert: { docName, ownerId, createdAt: new Date(), updatedAt: new Date() },
        $addToSet: { participants: ownerId },
      },
      { upsert: true }
    );

    res.status(201).json({ docName });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create document' });
  }
});

module.exports = router;