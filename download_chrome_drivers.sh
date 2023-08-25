curl 'https://commondatastorage.googleapis.com/chromium-browser-snapshots/Win_x64/1188394/chrome-win.zip' \
  -H 'authority: commondatastorage.googleapis.com' \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'accept-language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'cookie: SLG_G_WPT_TO=pt; SLG_GWPT_Show_Hide_tmp=1; SLG_wptGlobTipTmp=1' \
  -H 'referer: https://download-chromium.appspot.com/' \
  -H 'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Opera GX";v="100"' \
  -H 'sec-ch-ua-arch: "x86"' \
  -H 'sec-ch-ua-bitness: "64"' \
  -H 'sec-ch-ua-full-version-list: "Not.A/Brand";v="8.0.0.0", "Chromium";v="114.0.5735.199", "Opera GX";v="100.0.4815.82"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-model: ""' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-ch-ua-platform-version: "15.0.0"' \
  -H 'sec-ch-ua-wow64: ?0' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: cross-site' \
  -H 'sec-fetch-user: ?1' \
  -H 'upgrade-insecure-requests: 1' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 OPR/100.0.0.0' \
  --compressed --output win-driver.zip && \

curl 'https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F1188415%2Fchrome-linux.zip?alt=media' \
  -H 'authority: www.googleapis.com' \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'accept-language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'cookie: SLG_G_WPT_TO=pt; SLG_GWPT_Show_Hide_tmp=1; SLG_wptGlobTipTmp=1' \
  -H 'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Opera GX";v="100"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: none' \
  -H 'sec-fetch-user: ?1' \
  -H 'upgrade-insecure-requests: 1' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 OPR/100.0.0.0' \
  --compressed --output linux-driver.zip && \


mv win-driver.zip ./src/drivers/ && \
mv linux-driver.zip ./src/drivers/ && \

unzip ./src/drivers/win-driver.zip -d ./src/drivers/ && \
unzip ./src/drivers/linux-driver.zip -d ./src/drivers/ && \

rm -rf ./src/drivers/win-driver.zip && \
rm -rf ./src/drivers/linux-driver.zip