// server.js
import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

app.post('/start-process', async (req, res) => {
    const { groupName, phoneNumbers } = req.body;
    console.log('Received group name:', groupName);
    
    // Convert comma-separated string to array
    const phnNumList = phoneNumbers.split(',').map(num => num.trim());
    console.log(`Processing ${phnNumList.length} phone numbers`);
    
    let browser = null;
    
    try {
        // Launch browser
        // Replace this part in the merged code
const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null
});

const page = await browser.newPage();
        

        // Navigate to WhatsApp Web
        await page.goto('https://web.whatsapp.com/');
        console.log('Navigated to WhatsApp Web');

        // Wait for QR code and capture it
        const qrSelector = '#app > div > div.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.x1nhvcw1.xdt5ytf.x1dr59a3.xp22266.xcnrxux.xw2csxc.x1odjw0f.xyinxu5.xbxaen2.x1g2khh7.x1u72gb5.xp9ttsr.x6s0dn4.x9f619.xdounpk.xe4h88v > div.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.xeuugli.x2lwn1j.xl56j7k.xdt5ytf.x6s0dn4 > div.x1lliihq > div > div > div.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.xeuugli.x2lwn1j.x1nhvcw1.x1q0g3np.x1cy8zhl.x1ism021.x1w450gt > div.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.xeuugli.x2lwn1j.xozqiw3.xamitd3.x7v7x1q.x1n2onr6.x5zbcu4.x1dnwe82.x8vdgqj > div:nth-child(1) > div > canvas';
        
        console.log('Waiting for QR code element...');
        await page.waitForSelector(qrSelector, { visible: true, timeout: 60000 });
        console.log('QR code element found');

        await delay(2000);

        // Take screenshot of QR code element
        const element = await page.$(qrSelector);
        console.log('Taking screenshot of QR code...');
        const screenshot = await element.screenshot({
            encoding: 'base64'
        });
        console.log('Screenshot captured');

        // Send QR code to frontend
        res.json({
            success: true,
            qrCode: `data:image/png;base64,${screenshot}`,
            status: 'QR_GENERATED'
        });

        // Wait for successful login
        console.log('Waiting for login...');
        await page.waitForSelector('div[role="grid"]', { timeout: 300000 });
        console.log('WhatsApp Web login successful');
        
        await delay(2000);

        // Find and click group
        await page.waitForSelector(`span[title="${groupName}"]`);
        const target = await page.$(`span[title="${groupName}"]`);
        await target.click();

        await delay(2000);

        // Click group info
        const groupInfoBar = await page.$('#main > header > div.x78zum5.xdt5ytf.x1iyjqo2.xl56j7k.xeuugli > div.x78zum5.x1cy8zhl.x1y332i5.xggjnk3.x1yc453h > div > span');
        await groupInfoBar.click();

        await delay(2000);

        // Scroll to Add member element and click it
        await page.evaluate(() => {
            const addMemberElement = document.querySelector('#app > div > div.x78zum5.xdt5ytf.x5yr21d > div > div._aig-.x9f619.x1n2onr6.xyw6214.x5yr21d.x6ikm8r.x10wlt62.x17dzmu4.x1i1dayz.x2ipvbc.x1w8yi2h.xy80clv.x26u7qi.x1ux35ld > span > div > span > div > div > div > section > div.x13mwh8y.x1q3qbx4.x1wg5k15.xajqne3.x1n2onr6.x1c4vz4f.x2lah0s.xdl72j9.xyorhqc.x13x2ugz.x1i80of2.x6x52a7.xxpdul3.x18d9i69 > div.xdj266r.xcr5guo.xat24cr.xd8oflk > div:nth-child(1) > div._ak8l > div > div');
            if (addMemberElement) {
                console.log('Add member element found, scrolling and clicking');
                addMemberElement.scrollIntoView();
                addMemberElement.click();
            }
        });

        await delay(2000);

        // Add each phone number
        for(let i = 0; i < phnNumList.length; i++) {
            console.log(`Adding number ${i + 1}: ${phnNumList[i]}`);
            
            await page.keyboard.type(phnNumList[i]);
            await delay(1000);
            
            await page.keyboard.press('Enter');
            await delay(1000);

            await page.keyboard.down('Control');
            await page.keyboard.press('a');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            
            await delay(1000);
        }

        // Click tick button
        const tickSelector = '#app > div > span:nth-child(3) > div > span > div > div > div > div > div > div > span:nth-child(5) > div > div > div > span';
        await page.waitForSelector(tickSelector);
        await page.click(tickSelector);

        await delay(2000);

        // Click confirm button
        const confirmSelector = '#app > div > span:nth-child(3) > div > span > div > div > div > div > div > div.x78zum5.x8hhl5t.x13a6bvl.x13crsa5.x1mpkggp.x18d9i69.x1t2a60a.xp4054r.xuxw1ft > div > button.x889kno.x1a8lsjc.xbbxn1n.xxbr6pl.x1n2onr6.x1rg5ohu.xk50ysn.x1f6kntn.xyesn5m.x1z11no5.xjy5m1g.x1mnwbp6.x4pb5v6.x178xt8z.xm81vs4.xso031l.xy80clv.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x1v8p93f.xogb00i.x16stqrj.x1ftr3km.x1hl8ikr.xfagghw.x9dyr19.x9lcvmn.xbtce8p.xcjl5na.x14v0smp.x1k3x3db.xgm1il4.xuxw1ft.xv52azi > div > div';
        await page.waitForSelector(confirmSelector);
        await page.click(confirmSelector);

        await delay(3000);

        // Click cross button
        const crossButton = '#app > div > div.x78zum5.xdt5ytf.x5yr21d > div > div._aig-.x9f619.x1n2onr6.xyw6214.x5yr21d.x6ikm8r.x10wlt62.x17dzmu4.x1i1dayz.x2ipvbc.x1w8yi2h.xy80clv.x26u7qi.x1ux35ld > span > div > span > div > div > header > div > div.x1okw0bk.x1fxk84t > div > span';
        await page.waitForSelector(crossButton);
        await page.click(crossButton);

        await delay(5000);

        // Send message
        const message = "Dear, Don't be angry please. It's a funny project & I chose you as one of my experimental Guinea pigs because I know you won't be bored and angry at me at all.";
        await page.keyboard.type(message);
        await page.keyboard.press('Enter');
        
        console.log('Message sent successfully!');

        await delay(2000);
        await page.screenshot({ path: 'process_complete.jpg' });
        console.log('Process completed! Screenshot saved.');

        await delay(10000);
        await browser.close();

        console.log('Process completed successfully!');
        
    } catch (error) {
        console.error('Error:', error);
        if (browser) await browser.close();
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Visit http://localhost:${port} in your browser`);
});