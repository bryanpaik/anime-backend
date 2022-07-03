import * as puppeteer from 'puppeteer';
import { AnimeListing } from '../interfaces/animeInterface';

class AnimixSearch {

    constructor(){}

    public static async search(anime: string): Promise<AnimeListing[]> {
        
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 0, // slow down by 250ms
        });

        const page = await browser.newPage();
        await page.goto(`https://animixplay.to/?q=${this.convertString(anime)}&sengine=gogo`, {waitUntil : 'domcontentloaded'});
        await page.waitForSelector('.items', {visible: true})

        const list = await page.evaluate(() => {
            const baseUrl = 'https://animixplay.to';
            const animeList: AnimeListing[] = [];
            
            document.querySelectorAll('.items > li').forEach(item => {
                const anime: AnimeListing = {
                    name: item.getElementsByClassName("name")[0].textContent,
                    image: item.getElementsByTagName('img')[0].getAttribute('src'),
                    link: baseUrl + item.getElementsByTagName('a')[0].getAttribute('href'),
                };
                animeList.push(anime);
            });
          
            return animeList;
        });

        await browser.close();

        return list;
    }

    public static async getEpisodes(animeLink: string) {
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 0, // slow down by 250ms
        });

        const page = await browser.newPage();
        await page.goto(animeLink, {waitUntil : 'domcontentloaded'});
        await page.waitForSelector('#epslistplace', {visible: true})

        const episodes = await page.evaluate(() => {
            const episodeLinks: any = [];
            document.querySelectorAll('#epslistplace > button').forEach(item => {
                episodeLinks.push({
                    episode: item.textContent,
                    link: null
                });
            });
            return episodeLinks;
        });

        episodes.forEach((item: any) => {
            item.link = `${animeLink}/ep${item.episode}`
        })


        await browser.close();

        return episodes;

    }

    public static async getApiLink(animePage: string) {
        const baseUrl = 'https://animixplay.to';

        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 0, // slow down by 250ms
        });

        const page = await browser.newPage();
        await page.goto(animePage, {waitUntil : 'domcontentloaded'});
        await page.waitForSelector('.playerpage', {visible: true})

        const apiLink = await page.evaluate(() => {
            return document.querySelector('#iframecontainer')?.getElementsByTagName('iframe')[0].getAttribute('src');
        });

        await browser.close();

        return baseUrl + apiLink;
    }

    private static convertString(line: string): string {
        return line.replace(" ", "%20");
    }

}

export default AnimixSearch;