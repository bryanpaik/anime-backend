import * as puppeteer from 'puppeteer';
import { NyaaConstants } from '../constants/nyaa-constants';
import { NyaaListing } from '../interfaces/nyaaInterface';

class NyaaSearch {

    constructor(){}

    public static async search(anime: string): Promise<any> {
        
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 300, // slow down by 250ms
        });

        const page = await browser.newPage();
        await page.goto(`${NyaaConstants.BASEURL}?f=1&c=0_0&q=${this.convertString(anime)}&s=seeders&o=desc`, {waitUntil : 'domcontentloaded'});
        await page.waitForSelector('.table-responsive', {visible: true})


        const list = await page.evaluate(() => {            
            const links: NyaaListing[] = [];
            document.querySelectorAll('tbody tr').forEach(item => {
                const title = item.querySelector('td[colspan="2"] a:not(.comments)')?.textContent || "";
                const magnet = item.querySelectorAll('.text-center a')[1].getAttribute('href');
                links.push({title, magnet});
            });
            return links;
        });

        await browser.close();

        return list;
    }

    private static convertString(line: string): string {
        return line.replace(/\s/g, "+");
    }
}

export default NyaaSearch;