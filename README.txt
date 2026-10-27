GT AUTO TOWING CALCULATOR
=========================
Live app: https://kuwarts.github.io/GT-Towing-Calculator/

FILES (all sit together in the main folder, no sub-folders)
- index.html ............ the app screens
- finance.js ............ the money formulas (cost, profit, markup, margin)
- sw.js ................. lets the app open without internet
- manifest.webmanifest .. app name, icon and colours
- icon-192.png, icon-512.png, maskable-512.png, apple-touch-icon.png .. GT logo icons


HOW THE NUMBERS WORK
--------------------
Rate card price  = hook-up + towed km + empty km + fuel charge + fees (your rate settings)
Quoted price     = your own price if you type one, otherwise the rate card price

Estimated cost (per job):
  Diesel       = total km driven ÷ km per litre × diesel price
                 (always the full trip: to pickup + towed + return)
  Crew         = (basic + meal) × number of shifts
                 shifts = job hours ÷ shift length, rounded up (16 h ÷ 8 h = 2)
                 Driver ₱650 + ₱150 = ₱800 per shift; Helper ₱500 + ₱150 = ₱650 per shift
  Tolls        = what you enter for the job
  Trip costs   = your own lines, per trip or per km
                 "Cash paid" lines = money spent on the trip
                 "Set aside" lines = maintenance, tires, depreciation reserves
                 (counted in the cost, not paid on the day)

Break-even       = total cost
Markup price     = cost × (1 + markup %)      markup = profit as % of cost
Margin price     = cost ÷ (1 − margin %)      margin = profit as % of price
                   (margin must be below 100%; 25% markup = 20% margin)
Profit           = price (without VAT) − cost
Actual profit    = amount collected − actual cost. Only called "actual"
                   when every cash cost and the payment are entered.

Reference check (Daraga → Goa → Daet → Daraga, 422.5 km, ₱98/L, 4.5 km/L):
  93.8889 L diesel = ₱9,201.11; crew 2 shifts = ₱2,900; cost ₱12,101.11
  At ₱27,900: profit ₱15,798.89, margin 56.6%


YOUR DATA
---------
Saved on each phone only. Nothing syncs between phones.
Fleet & rates > "Back up rates and jobs" once a week; keep the file in Drive or Messenger.
Restore replaces the rates and ADDS the backup's jobs (nothing on the phone is deleted).


UPDATING THE APP ON GITHUB
--------------------------
1. Unzip the update on your computer. Open the folder.
2. On GitHub: Code > Add file > Upload files.
3. Drag in the FILES (not the zip, not the folder). Click "Commit changes".
4. Check sw.js on GitHub shows the new version number (e.g. gt-towing-v4).
5. Wait for the green tick under Actions, then open the app with internet.
For the next change, raise the number in sw.js (v4 → v5) so phones pick it up.
