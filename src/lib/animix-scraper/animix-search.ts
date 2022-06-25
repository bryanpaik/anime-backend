import * as puppeteer from 'puppeteer';
import { AnimeListing } from '../interfaces/animeInterface';

class AnimixSearch {

    constructor(){}

    public static async search(anime: string): Promise<AnimeListing> {
        
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 0, // slow down by 250ms
        });

        const page = await browser.newPage();
        await page.goto(`https://animixplay.to/?q=${this.convertString(anime)}&sengine=gogo`, {waitUntil : 'domcontentloaded'});
        await page.waitForSelector('.items', {visible: true})
        await page.screenshot({path: 'example.png'});

        const value = await page.evaluate(() => {
            const baseUrl = 'https://animixplay.to';
            const animeList: any = [];
            
            document.querySelectorAll('.items > li').forEach(item => {
                const anime: AnimeListing = {
                    name: item.getElementsByClassName("name")[0].textContent,
                    image: item.getElementsByTagName('img')[0].getAttribute('src'),
                    releaseDate: item.getElementsByClassName("released")[0].textContent,
                    link: baseUrl + item.getElementsByTagName('a')[0].getAttribute('href')
                };
                animeList.push(anime);
            });
          
            return animeList;
        });

        await browser.close();

        return value;
    }

    private static convertString(line: string): string {
        return line.replace(" ", "%20");
    }
}

export default AnimixSearch;