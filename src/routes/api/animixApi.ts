import express from 'express';
import AnimixSearch from '../../lib/animix-scraper/animix-search';
import { AnimeListing } from '../../lib/interfaces/animeInterface';
const router = express.Router();

router.get('/getShow', async (req: any, res: any) => {
    const { animeName } = req.query;
    if(!animeName) {
        return res.status(400).json({ error: "Please provide an anime name!" });
    }

    try {
        const anime = await AnimixSearch.search(animeName);
        return res.status(200).json(anime);
    }
    catch (err) {
        return res.status(500).json({error: err})
    }
    
});

module.exports = router;