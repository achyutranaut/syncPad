const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const docsCollection = req.app.locals.docsCollection;

    if (!docsCollection) {
      return res.status(503).json({ error: 'Database not ready yet' });
    }

    const docs = await docsCollection
      .find({}, { projection: { docName: 1, updatedAt: 1, _id: 0 } })
      .sort({ updatedAt: -1 })
      .toArray();

    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

module.exports = router;