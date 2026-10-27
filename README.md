# GT Auto Towing Calculator

A phone app for pricing tow jobs, checking they make money, and keeping a record of every job.

**Open the app:** https://kuwarts.github.io/GT-Towing-Calculator/

It works like a calculator: you type the distances on the keypad and the price updates as you go. Everything is saved on the phone you use it on.

---

## Contents

1. [Install it on a phone](#1-install-it-on-a-phone)
2. [The main screen](#2-the-main-screen)
3. [Pricing a tow, step by step](#3-pricing-a-tow-step-by-step)
4. [How the customer price is worked out (rate card)](#4-how-the-customer-price-is-worked-out-rate-card)
5. [How your cost is worked out](#5-how-your-cost-is-worked-out)
6. [Turning cost factors on or off](#6-turning-cost-factors-on-or-off)
7. [Profit, break-even, markup and margin](#7-profit-break-even-markup-and-margin)
8. [Booking and managing jobs](#8-booking-and-managing-jobs)
9. [Recording what a job really cost](#9-recording-what-a-job-really-cost)
10. [Saved routes](#10-saved-routes)
11. [Fleet & rates: every setting explained](#11-fleet--rates-every-setting-explained)
12. [Your data, backups and new phones](#12-your-data-backups-and-new-phones)
13. [Worked example: Daraga → Goa → Daet](#13-worked-example-daraga--goa--daet)
14. [For whoever maintains the app](#14-for-whoever-maintains-the-app)

---

## 1. Install it on a phone

| Phone | Steps |
|---|---|
| **Android** | Open the link in **Chrome** → tap **⋮** → **Install app** (or **Add to Home screen**) → **Install**. |
| **iPhone** | Open the link in **Safari** (not Chrome) → tap **Share** (square with an arrow) → **Add to Home Screen** → **Add**. |

The GT icon appears on the home screen. It opens full screen and works without internet after the first open.

When the app is updated, close it fully and reopen it with internet (or pull down to refresh) to get the new version.

---

## 2. The main screen

From top to bottom:

| Part | What it does |
|---|---|
| **☰ list icon** | Opens **Tow jobs**: every quote and job you've saved. |
| **Sliders icon** | Opens **Fleet & rates**: all your prices, costs and settings. |
| **Book** | Saves the current quote as a job. Only works once a towed distance is entered. |
| **✓ Saved on this phone** | Confirms your work is being kept. If it ever shows a warning, open the app in Chrome (Android) or Safari (iPhone). |
| **Grey line above the total** | Unit type, total km driven and estimated job time. Warnings appear here in amber (unit too small, unit not suited, a distance that can't be worked out). |
| **Price line** | How the price is made up: tow + fuel + fees. Tap it to open the **Breakdown**. If you typed your own price, it shows the rate card price for comparison. |
| **Big number** | The price to give the customer. |
| **Cost / profit line** | Your estimated cost and profit for this price, in **green** (profit) or **red** (loss). Tap it to open **Cost & profit**. |
| **Tow unit, Vehicle, Condition, Weather & time** | Tap to choose. See [section 3](#3-pricing-a-tow-step-by-step). |
| **To pickup / Towed / Return** | The three distances, in km. The one outlined in red is the one the keypad is typing into. |
| **Keypad** | Types the distance. You can do sums, e.g. `60+39.5`. |

**Keypad keys**

| Key | Does |
|---|---|
| **Pickup › / Towed › / Return ›** | Moves to the next distance. |
| **C / AC** | **C** clears the distance you're on. **AC** (press when it's already empty) clears the whole quote. |
| **⌫** | Deletes the last digit. |
| **=** | Works out a sum and moves on to the next empty distance. |

---

## 3. Pricing a tow, step by step

1. **Type the distances**
   - **To pickup**: home base to the vehicle (truck empty).
   - **Towed**: vehicle to the drop-off (truck loaded).
   - **Return**: drop-off back to home base (truck empty).
2. **Vehicle**: what's being towed (motorcycle, sedan, SUV, truck…). Heavier classes multiply the hook-up and towed price.
3. **Condition**: the representative's assessment (rolls and steers, won't start, locked wheels, accident, in a ditch, flooded). Each adds its own fee and decides which tow units are suitable.
4. **Tow unit**: the list is ranked for the vehicle and condition you picked:
   - **Best fit**: the smallest suitable unit that can carry the weight.
   - **Suitable**: can do the job.
   - **Too light**: capacity is under the vehicle's weight.
   - **Not suited**: wrong type of unit for that condition.

   The representative makes the final choice.
5. **Weather & time**: weather surcharge, night differential (Auto / Night / Day) and Sunday or holiday.
6. Optional: tap the **price line** to open the **Breakdown** and add:
   - pickup and drop-off place names
   - extra drop-off legs
   - equipment (dollies, go-jacks, winch pulls…)
   - waiting time and tolls
   - a discount, a manual adjustment or VAT
7. Check the **cost / profit line**. Tap it to see the full cost and suggested prices.
8. Tap **Book**.

---

## 4. How the customer price is worked out (rate card)

The **rate card price** comes from the rates in **Fleet & rates**. Each line below is shown in the **Breakdown**.

| Line | Formula |
|---|---|
| **Hook-up** | unit hook-up fee × vehicle class multiplier. Includes the unit's **free km** of towing. |
| **Towed distance** | (towed km + extra drop-off legs − free km) × unit **towed ₱/km** × vehicle class multiplier |
| **Empty running** | (to-pickup km + return km) × unit **empty ₱/km**. The return is left out if **Charge the return trip** is off. |
| **Fuel charge** | km charged ÷ unit km per litre × diesel price. "Km charged" = towed + empty km you're billing. |
| **Condition fee** | from the condition picked |
| **Equipment & extras** | quantity × price for each item |
| **Waiting** | (minutes waited − free minutes) ÷ 60 × waiting rate per hour |
| **Subtotal** | sum of the lines above |
| **Surcharges** | subtotal × (night % + weather % + holiday %) |
| **Discount** | (subtotal + surcharges) × discount % |
| **Adjustment** | any amount you type (use − to take off) |
| **Minimum charge** | if the total is under the minimum charge, it's raised to the minimum |
| **Tolls & parking** | added at cost |
| **VAT** | VAT % on top, only if **Add VAT** is on |

**Night differential, Auto mode:** applies between the night start and end hours (default 10 PM to 6 AM) by the phone's clock.

**Your own price:** in **Cost & profit**, type any amount in **Quoted price** (e.g. ₱27,900). That becomes the big number and is what gets saved. Leave it blank to use the rate card.

**No towed km means no job:** with 0 towed km the price shows ₱0 and Book stays off.

> The tow unit rates that come with the app are **samples**. Replace them with GT Auto's real rates in Fleet & rates.

---

## 5. How your cost is worked out

The cost is what the job costs **GT Auto**, separate from what the customer pays. It's shown on **Cost & profit**.

| Cost factor | Formula | Type |
|---|---|---|
| **Diesel** | **all km driven** ÷ km per litre × diesel price | Cash |
| **Tolls & parking** | the amount entered for the job | Cash |
| **Driver** | (basic + meal) × number of shifts | Cash |
| **Helper** | (basic + meal) × number of shifts | Cash |
| **Trip cost lines** | your own lines, **per trip** or **per km driven** | Cash or Set aside |

**All km driven** = to pickup + towed + return. Diesel always counts the return trip, even when the customer isn't charged for it, because the truck still burns the fuel.

**Crew shifts**
- Crew pay is per **8-hour shift** (you can change the shift length).
- Job hours = km driven ÷ average speed + 30 minutes for hook-up and unloading + waiting time.
- Shifts = job hours ÷ shift length, **rounded up**, at least 1. A 16-hour job pays 2 shifts.
- You can change the number of shifts for a job with **− / +** on Cost & profit. **Auto** goes back to the worked-out number.

| Crew | Basic | Meal | Per shift | 2 shifts |
|---|---:|---:|---:|---:|
| Driver | ₱650 | ₱150 | ₱800 | ₱1,600 |
| Helper | ₱500 | ₱150 | ₱650 | ₱1,300 |

Meals are part of crew pay. Don't add them again as a separate trip cost, or they'll be counted twice.

**Cash vs set aside**
- **Cash**: money that leaves on the trip (diesel, tolls, crew, other expenses).
- **Set aside**: money you reserve from each job for later: **maintenance reserve**, **tire reserve**, **depreciation**. It counts in the cost and profit, but it isn't paid out on the day.

Maintenance, tire and depreciation start at **₱0**. Put in your own figures (usually ₱ per km) in Fleet & rates → **Trip costs**.

---

## 6. Turning cost factors on or off

Every cost factor has an **on/off switch**:

- **Fleet & rates → Cost factors to include**
- **Cost & profit** (next to each cost)

Both places show the same setting.

| When a cost is **off** | |
|---|---|
| Cost, break-even, markup price, margin price, profit | it's **left out** |
| Cost & profit screen | shown greyed out and crossed through, so you can switch it back on |
| Next quotes | stays off until you switch it back on |
| Saved jobs | keep the on/off setting they were booked with; the job says *"Left out of the cost: …"* |
| Recording actual costs | the app doesn't ask for a cost that was off |

Example: switching **Helper** off for a one-man job removes the helper's pay from the cost.

---

## 7. Profit, break-even, markup and margin

All on the **Cost & profit** screen.

| Figure | Meaning | Formula |
|---|---|---|
| **Expected profit** | what you should make on this price (an estimate) | price without VAT − total cost |
| **Break-even** | the lowest price that covers every cost (₱0 profit) | total cost |
| **Markup price** | cost plus a % of the cost | cost × (1 + markup %) |
| **Margin price** | price where a % of the **price** is profit | cost ÷ (1 − margin %) |
| **Margin %** | profit as a share of the price | profit ÷ price |
| **Markup %** | profit as a share of the cost | profit ÷ cost |
| **Revenue per km** | price per km driven | price ÷ km driven |
| **Cost per km** | cost per km driven | cost ÷ km driven |

**Markup vs margin.** These are easy to mix up:
- **Markup** is measured against the **cost**. On a ₱10,000 cost, a 25% markup = ₱12,500.
- **Margin** is measured against the **price**. A 20% margin on that same job is also ₱12,500, because ₱2,500 is 20% of ₱12,500.
- So **25% markup = 20% margin**. The defaults are set that way so you can see it.

Margin must be below 100% (a 100% margin would need an infinite price); the app shows a message if you type 100 or more.

Tap **Use** next to a price to make it your quoted price (rounded up to the next peso). Tap **Use** next to **Rate card price** to go back to the rate card.

**VAT:** when VAT is on, prices on this screen include VAT, but profit is worked out **without** VAT, because VAT goes to the government.

---

## 8. Booking and managing jobs

Tap **Book**, add the customer details (all optional), then choose:

| Button | Job status |
|---|---|
| **Dispatch job** | **Dispatched**: the truck is going. |
| **Save as quote only** | **Quoted**: waiting for the customer's answer. |

**Each job keeps everything it was quoted with:**
- distances
- diesel price and km per litre
- rates and crew pay
- cost on/off switches
- estimated cost and profit

Changing your rates later **doesn't change old jobs**.

**Job numbers** look like `TW-AV-0001`. The middle letters are the **phone code**, so two phones never give out the same number. Jobs from before this update keep their old numbers (`TW-0001`).

**In Tow jobs**
- Tap a job to open it. Use **Quote / Dispatch / Done / Cancel** to change its status.
- **Delete** asks you to tap twice.
- **Booked this month**: total of Dispatched and Completed jobs this month.
- **Actual profit, completed**: profit from this month's completed jobs where the payment is recorded. If some costs are still estimates, the label says how many.
- **Copy all for Google Sheets** copies every job, including estimated and actual cost and profit. Paste it into a sheet.

---

## 9. Recording what a job really cost

Open a **Dispatched** or **Completed** job. Under **What it really cost**:

1. Type what was actually spent on each cash cost (diesel, tolls, driver, helper…). The estimate is shown under each name.
2. **Other expenses**: anything unplanned. Leave it blank if there was nothing.
3. **Amount collected**: what the customer actually paid.

Set-aside costs (maintenance, tires, depreciation) are carried over from the estimate. You don't type them.

**What the result is called**

| Situation | Label |
|---|---|
| Amount collected not entered | *enter amount collected* (no profit shown) |
| Payment entered, some costs left blank | **Profit so far · N costs still estimated** (blank costs use the estimate) |
| Payment and every cost entered | **Actual profit** |

Under the profit it shows the **difference from the estimate**, e.g. *−₱548.89 vs estimate*.

The app only says **Actual profit** when nothing is estimated. To confirm a cost was zero (e.g. no tolls), type `0`.

Jobs saved before this update have no estimate. You can still record actual costs and payment for them.

---

## 10. Saved routes

For trips you do often:

1. Open the **Breakdown** (tap the price line).
2. Fill in the **pickup place**, **drop-off place**, distances and tolls.
3. Tap **＋ Save this route for next time**.

Next time, tap the route under **Saved routes** to fill in its distances, extra legs and tolls. Tap **✕** twice to remove one.

---

## 11. Fleet & rates: every setting explained

| Section | Settings |
|---|---|
| **Tow units** | Code, code name, type, capacity (tons), hook-up ₱, free km, towed ₱/km, empty ₱/km, km per litre |
| **Cost factors to include** | On/off switch for every cost ([section 6](#6-turning-cost-factors-on-or-off)) |
| **Crew pay per shift** | Role, basic ₱, meal ₱ (per shift). Add or remove crew roles. |
| **Trip costs** | Name, amount ₱, per trip or per km, cash or set aside |
| **Vehicle classes** | Weight (tons) for the capacity check; rate × multiplier |
| **Vehicle condition** | Fee ₱; suitable unit types (decides Best fit) |
| **Weather surcharge** | Weather name and surcharge % |
| **Equipment & extras** | Item and price |
| **Discounts** | Name and % off |
| **Pricing, fuel, time & fees** | Home base, markup %, target margin %, crew shift length, diesel ₱/L, night %, night start and end hour, Sunday/holiday %, minimum charge, free waiting minutes, waiting ₱/hour, average speed (km/h, for job time), VAT % |
| **This phone** | Phone code, install button, back up, restore |

**Starting values**

| Setting | Value | Note |
|---|---|---|
| Driver | ₱650 basic + ₱150 meal | given by GT Auto |
| Helper | ₱500 basic + ₱150 meal | given by GT Auto |
| Shift length | 8 hours | |
| Markup / target margin | 25% / 20% | change to your targets |
| Maintenance, tire, depreciation, other | ₱0 | **fill in your own** |
| Tow unit rates, condition fees, surcharges, discounts | samples | **replace with real rates** |
| Average speed | 35 km/h | used for job time and crew shifts |
| VAT | 12% | only applied when switched on for a quote |

**Restore sample rates** (bottom of Fleet & rates) resets the rates to the samples. It keeps your saved routes and home base, and never touches jobs.

In the **Breakdown**, rates shown in grey are your saved defaults. Typing over them changes **this quote only**. **Save changed rates as default** keeps them for future quotes.

---

## 12. Your data, backups and new phones

- **Everything is saved on the phone itself.** Nothing is sent to a server and **nothing syncs between phones**.
- Data stays after closing the app. It's lost only if the app is uninstalled or the browser's site data is cleared.

**Back up once a week:** Fleet & rates → **Back up rates and jobs**. A file goes to Downloads. Send it to yourself on Messenger or save it in Google Drive.

**Restore** (new phone, or giving staff the same rates): install the app, then Fleet & rates → **Restore from a backup file**.
- **Rates** are replaced with the backup's rates.
- **Jobs are merged.** Jobs on the phone are never deleted. Jobs from the backup are added. If the same job is on both, the most recently edited copy is kept.

**Several phones:** each phone keeps its own jobs. To total everything, use **Copy all for Google Sheets** on each phone and paste the rows into one sheet.

---

## 13. Worked example: Daraga → Goa → Daet

Home base Maroroy, Daraga, Albay → pickup Goa, Camarines Sur → drop-off Daet, Camarines Norte → back to Daraga.

| Leg | km |
|---|---:|
| Daraga → Goa (to pickup, empty) | 99.5 |
| Goa → Daet (towed) | 142 |
| Daet → Daraga (return, empty) | 181 |
| **Total driven** | **422.5** |

Diesel ₱98/L, truck does 4.5 km/L, customer price ₱27,900, no tolls entered, maintenance/tire/depreciation not set yet.

| Cost | Working | Amount |
|---|---|---:|
| Diesel | 422.5 ÷ 4.5 = 93.8889 L × ₱98 | ₱9,201.11 |
| Driver | job ≈ 12.6 h → 2 shifts × ₱800 | ₱1,600.00 |
| Helper | 2 shifts × ₱650 | ₱1,300.00 |
| **Total cost (break-even)** | | **₱12,101.11** |

| Result at ₱27,900 | |
|---|---:|
| Expected profit | ₱15,798.89 |
| Margin | 56.6% |
| Markup | 130.6% |
| Revenue per km | ₱66.04 |
| Cost per km | ₱28.64 |
| Price for a 20% margin (= 25% markup) | ₱15,126.39 |

With **Helper switched off**, the cost is ₱10,801.11 and the profit ₱17,098.89.

The profit will be lower once tolls and maintenance, tire and depreciation amounts are added.

---

## 14. For whoever maintains the app

| File | What it is |
|---|---|
| `index.html` | All screens and the rate card price |
| `finance.js` | Every cost and profit formula, as plain functions with no screen code |
| `sw.js` | Offline support; the cache name (`gt-towing-v4`) must go up with every update |
| `manifest.webmanifest` | App name, colours and icons |
| `icon-192.png`, `icon-512.png`, `maskable-512.png`, `apple-touch-icon.png` | Official GT logo icons; keep them in the main folder |

- **Branches:** `main` is the original app; `v3` is this version. GitHub Pages serves whichever branch is chosen in **Settings → Pages**.
- **Updating:** change the files, raise the number in `sw.js` (`gt-towing-v4` → `gt-towing-v5`), then commit. Phones pick up the new version the next time they open the app with internet.
- **Saved data on the phone** uses the keys `gtt.rates`, `gtt.jobs`, `gtt.draft`, `gtt.device` and `gtt.lastBackup`. New versions must only **add** to these, never reset them, so nobody loses jobs.
- **Same website, same data:** every copy of the app under `kuwarts.github.io` shares the same saved data on a phone. An older copy that saves settings drops newer settings (crew pay, cost switches, routes). Back up before testing another copy.
