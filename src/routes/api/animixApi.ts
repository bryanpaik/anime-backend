import express from 'express';
import AnimixSearch from '../../lib/animix-scraper/animix-search';
const router = express.Router();

router.get('/search', async (req: any, res: any) => {
    const { animeName } = req.query;
    if(!animeName) {
        return res.status(400).json({ error: "Please provide an anime name!" });
    }

    console.log(`Searching for ${animeName}`);
    try {
        const anime = await AnimixSearch.search(animeName);
        console.log("Anime found!");
        return res.status(200).json(anime);
    }
    catch (err) {
        return res.status(500).json({error: err})
    }
    
});

router.get('/getEpisodes', async (req: any, res: any) => {
    const { link } = req.query;
    if(!link) {
        return res.status(400).json({ error: "Please provide a link!" });
    }

    console.log(`Getting episodes for ${link}`);
    try {
        const episodes = await AnimixSearch.getEpisodes(link);
        console.log("Found episodes!");
        return res.status(200).json(episodes);
    }
    catch (err) {
        return res.status(500).json({error: err})
    }
    
});

router.get('/apiLink', async (req: any, res: any) => {
    const { link } = req.query;
    if(!link) {
        return res.status(400).json({ error: "Please provide a link!" });
    }

    console.log(`Getting api link for ${link}`);
    try {
        const episodes = await AnimixSearch.getApiLink(link);
        console.log("Found link!");
        return res.status(200).json(episodes);
    }
    catch (err) {
        return res.status(500).json({error: err})
    }
    
});

module.exports = router;