# BZBET Automated Account Creation
This is just a POC project for creating multiple accounts and create pix deposit invoices automated.


# What this script gonna do?
- Register an account on BZBET.
- Generate a copy-paste QRCODE pix code.
- Save the log file named as email-username-password.txt containing the copy-paste qrcode, inside logs folder.

# Start using
- npm i (to install the npm dependencies)
- Download the chrome drivers by running the script `download_chrome_drivers.sh` or 
    - Download manually chrome driver for windows by acessing this [link](https://commondatastorage.googleapis.com/chromium-browser-snapshots/Win_x64/1188394/chrome-win.zip),
      extract it, propably it will contain a folder called chrome-win,  paste this folder inside `src/drivers`
    - Download manually chrome driver for linux by acessing this [link](https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F1188415%2Fchrome-linux.zip?alt=media),
      extract it, propably it will contain a folder called chrome-linux,  paste this folder inside `src/drivers`
- configure the fields mentioned below in [_Attention Topic_](#attention)
- Run the code `npm run start`  

# Demonstration
![demonstration](demonstration.gif)


<h1 id="attention"> Attention! </h1>
Obs: Running this code as it is commited it will not open the browser (is running on hadless mode).
So... executing this code it will work but not show anything.
To change this behaviour you need to change this line of code `headless: 'new'` to `headless: false`.

Obs2: You can set the amount of accounts you wanna generate by modifying this line of code `NUMBER_OF_EXECUTIONS: 10` and change the number 10 for the amount of accounts you wanna generate.

Obs3: To change the affiliate code present on the URL change this line of code `YOUR_AFFILIATE_CODE = 79529920` and change the code...


OBS_MASTER: How to find this lines of codes mentioned on above obs's? Just `ctrl + f` in src/main.js or src/app.js.# bzbet-automated-account-creator
