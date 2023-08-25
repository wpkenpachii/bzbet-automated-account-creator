import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import decodeQR from '@paulmillr/qr/decode.js';
import { Bitmap } from '@paulmillr/qr';
import Jimp from 'jimp';

// https://github.com/paulmillr/qr
// https://www.geeksforgeeks.org/reading-qr-codes-using-node-js/
// reference to base64 to img https://base64.guru/converter/decode/image


(async () => {
  const isWin = process.platform === "win32";
  const YOUR_AFFILIATE_CODE = 79529920;
  const pathToExtension = path.join(process.cwd(), '/src/extensions/bgafccceonganlcmcojjacanoadnhmac/1.0.3_0');
  const browser = await puppeteer.launch({
    executablePath: isWin ? './src/drivers/chrome-win/chrome.exe' : './src/drivers/chrome-linux/chrome',
    devtools: true,
    ignoreHTTPSErrors: true,
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension==${pathToExtension}`,  
      '--no-sandbox',
      '--ignore-certificate-errors',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,ProcessPerSiteUpToMainFrameThreshold',
      '--disable-site-isolation-trials',
    ]
  });

  (await browser.pages()).forEach(async (p) => {
    const state = await p.evaluate(() => document.visibilityState);
    return state != 'visible' ? p.close() : '';
  });


  const page = await browser.newPage({ ignoreHTTPSErrors: true });
  await page.setViewport({
    width: 1080,
    height: 1920,
    deviceScaleFactor: 1,
  });
  // await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/gh/cirocosta/qcode-decoder@latest/build/qcode-decoder.min.js' }); 


  await page.setExtraHTTPHeaders({
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'upgrade-insecure-requests': '1',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,en;q=0.8'
  });

  console.log('Opening page ...');
  try {
    let _pix_page = ''
    await page.goto(`https://bzbet1.com/pc/?code=${YOUR_AFFILIATE_CODE}#/game`, { timeout: 180000 })
    
    // Wait for pop up and close it
    await page.waitForSelector('.notice_pop .close')
    await page.evaluate(() => {
      return document.querySelector('.notice_pop .close').click()
    })


    // click on register
    await page.click('.register')
    // wait until modal exists
    await page.waitForSelector('.modalcontent.modal-')



    // feed form infos
    const { usuario: _username, email: _email, password: _password } = await page.evaluate(async() => {
      const EVENT_OPTIONS = {bubbles: true, cancelable: false, composed: true};
      const EVENTS = {
          BLUR: new Event("blur", EVENT_OPTIONS),
          CHANGE: new Event("change", EVENT_OPTIONS),
          INPUT: new Event("input", EVENT_OPTIONS),
      };

      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const generateString = (length) => {
          let result = '';
          const charactersLength = characters.length;
          for ( let i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return 's' + result + '1';
      }

      const usuario   = generateString(6) + '1';
      const email     = usuario + '@gmail.com';
      const password  = usuario

      const sleep = ms => new Promise(r => setTimeout(r, ms));
      const type = async (elem, text, ms = 50) => {
        for(let i=0; i<text.length; i++) {
          elem.value += text[i];
          elem.dispatchEvent(EVENTS.INPUT);
          await sleep(ms)
        }
      }

      // birthdate
      const days = [4, 10, 12, 16, 22, 25];
      const years = [1992, 1997, 1993, 1996, 1990];

      // typing month
      document.querySelector('.birthbox div.el-select div.el-input').click()
      const ul = document.querySelectorAll('.el-scrollbar__view.el-select-dropdown__list')[1]
      const li = Array.from(ul.querySelectorAll('li'))
      const months = li.map(e => e.textContent)
      const selected_month_index = Math.floor(Math.random() * months.length)
      li.forEach((elem, index) => {
        if (index != selected_month_index) return;
        elem.click() 
      })

      // typing day and year
      const birthdates = Array.from(document.querySelectorAll('.birthbox input[type="number"]'));
      for (let binput = 0; binput < birthdates.length; binput++) {
        const e = birthdates[binput];
        const isDayField = e.getAttribute('placeholder').match(/DD/igm)
        const isYearField = e.getAttribute('placeholder').match(/YYYY/img)
        console.log('------>>>', e);
        if (isDayField) {
          e.focus()
          e.value = days[Math.floor(Math.random() * days.length)]
          e.dispatchEvent(EVENTS.INPUT);
        } else if (isYearField) {
          e.focus()
          e.value = years[Math.floor(Math.random() * years.length)]
          e.dispatchEvent(EVENTS.INPUT);
        }
      }

      // typing username and email
      const username_email_inputs = Array.from(document.querySelectorAll('.lrl_right input[type="text"].el-input__inner'));
      for (let input = 0; input < username_email_inputs.length; input++) {
        const e = username_email_inputs[input]
        const isUserField = e.getAttribute('placeholder').match(/usuário/igm) ? true : false;
        const isEmailField = e.getAttribute('placeholder').match(/e-mail/igm) ? true : false;
        e.focus()
        if (isUserField) {
          await type(e, usuario)
        } else if (isEmailField) {
          await type(e, email)
        }
      }

      // typing password
      const passField = document.querySelector('.lrl_right input[type="password"].el-input__inner')
      if (passField) {
        await type(passField, password)
        // submit form
        document.querySelector('.el-button.el-button--primary').click()
      }

      return {
        usuario,
        email,
        password
      }
    })

    // =============================== [ ALREADY LOGGED IN ] ====================
    // Wait for pop up and close it
    await page.waitForSelector('.notice_pop .content')
    await page.waitForSelector('.notice_pop .close')
    await page.evaluate(() => {
      return document.querySelector('.notice_pop .close').click()
    })

    await page.waitForSelector('.butBox.flex-between.flex-center div')
    await page.evaluate(async () => {
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      await sleep(300)
      return document.querySelector('.butBox.flex-between.flex-center div').click()
    })

    browser.on("targetcreated", async (target)=>{
      const _url = (await target).url()
      if (_url.match(/bzbet1/img)) {
        const pix_url = decodeURIComponent((_url.split('?')[1]).split('=')[1])
        console.log('pix_url', pix_url)
        _pix_page = pix_url;
        await page.goto(decodeURI(_pix_page));
      }
    });

    await page.waitForSelector('div.inside .number-list-recharge div')
    await page.evaluate(async () => {
      const sleep = ms => new Promise(r => setTimeout(r, ms));

      document.querySelector('div.inside .number-list div').click()
      await sleep(200)
      document.querySelector('div.inside .number-list-recharge div').click()
      await sleep(200)
      document.querySelector('.confirm-div').click()
    })

    // AFTER
    await page.waitForSelector('.van-badge__wrapper.van-icon.van-icon-description')
    const image_buffer = await page.evaluate(async () => {
      return document.querySelector('canvas').toDataURL()
    })

    // console.log(image_buffer)
    const img_base64 = image_buffer.replace('data:image/png;base64,', '');
    // console.log(img_base64)

    const path_filename = `qrcodes/${(new Date()).getTime()}_qrcode.png`;

    fs.writeFile(path_filename, img_base64, 'base64', (err) => {
      if (err) throw err;
      const buffer = fs.readFileSync(path_filename);
      Jimp.read(buffer, function(err, image) {
        if (err) throw new Error(err)
        const bm = new Bitmap({ width: 244, height: 244 });
        bm.data = image.bitmap.data;
        const decoded = decodeQR(bm);
        const filename = `./logs/${_email}-${_username}-${_password}.txt`;
        fs.writeFileSync(filename, decoded)
        console.log('Content saved on', filename)
        page.close().then(() => {
          browser.close();
        });

      });

    });
  } catch (err) {
    console.log(err);
  }
})();