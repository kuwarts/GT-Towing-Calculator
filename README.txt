GT AUTO TOWING CALCULATOR – FREE APP SETUP
==========================================

What is in this folder
- index.html ............ the calculator
- manifest.webmanifest .. app name, icon and colours
- sw.js ................. lets the app open without internet
- icons/ ................ GT app icons
Keep all files together. Do not rename them.


STEP 1 – PUT IT ONLINE (free, about 10 minutes, use a computer)
---------------------------------------------------------------
Option A: Netlify (easiest)
1. Unzip this file so you have a folder called "gt-towing-app".
2. Go to netlify.com and sign up free (you can use your Gmail).
3. In Netlify, choose to add a new site and deploy manually
   (the drag-and-drop option).
4. Drag the whole "gt-towing-app" folder onto the page.
5. Netlify gives you a link like https://something-random.netlify.app
6. Optional: in Site settings, change the site name to something like
   gt-towing so the link becomes https://gt-towing.netlify.app

Option B: GitHub Pages
1. Sign up free at github.com.
2. Create a new public repository, e.g. "gt-towing".
3. Upload all files from the folder (keep the icons folder).
4. Settings > Pages > Source: deploy from branch "main", folder "/ (root)".
5. After a minute your link is https://YOUR-NAME.github.io/gt-towing/


STEP 2 – INSTALL ON YOUR ANDROID PHONE
--------------------------------------
1. Open the link from Step 1 in Chrome.
2. Tap the three dots (top right) > "Install app" or "Add to Home screen".
   (Or open Fleet & rates inside the calculator and tap
   "Install as app on this phone" when it appears.)
3. The GT Towing icon is now on your home screen. It opens full screen
   and works without internet after the first open.
Do the same on every staff phone.


STEP 3 – KEEP YOUR DATA SAFE
----------------------------
- Your rates and jobs are saved on each phone. They stay after you close
  the app.
- They are lost only if you uninstall the app or clear Chrome's data.
- Once a week: Fleet & rates > "Back up rates and jobs". A file goes to
  Downloads. Send it to yourself on Messenger or save it in Google Drive.
- New phone: install the app, then "Restore from a backup file".
- To give staff the same rates: back up on your phone, send the file,
  and restore it on their phone.


UPDATING THE APP LATER
----------------------
1. Replace index.html with the new version.
2. Open sw.js and change  gt-towing-v1  to  gt-towing-v2  (v3 next time).
3. Upload the folder again (Netlify: Deploys > drag the folder;
   GitHub: upload the changed files).
Phones get the new version the next time they open the app with internet.
