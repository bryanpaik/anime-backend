import express from 'express';
import NyaaSearch from '../../lib/nyaa-scraper/nyaa-search';

const router = express.Router();

router.get('/search', async (req: any, res: any) => {
    const { query } = req.query;
    if(!query) {
        return res.status(400).json({ error: "Please provide a query"});
    }

    console.log(`Searching for ${query}`);
    try {
        const listing = await NyaaSearch.search(query);
        console.log("Listing found");
        return res.status(200).json(listing);
    }
    catch (err) {
        return res.status(500).json({error: err});
    }
});

module.exports = router;