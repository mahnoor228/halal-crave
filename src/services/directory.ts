import type {Restaurant} from '../types';
// A clearly labelled, offline discovery directory. Locations are approximate and are NOT live Google data.
// Live Google Places results replace matching directory entries when configured.
// Every entry was verified in November 2026 against a real source (the
// restaurant's own site or menu, a Zabihah listing, or a credible review) for
// its halal status. A place is marked "fully_halal" only when a source says
// the whole menu is halal, and "halal_options" when only some dishes are
// halal, with a note saying which. Places whose halal status could not be
// verified were left out. No ratings, review counts, hours or photos are
// invented for these entries; those come from Google in live mode only.
// Halal status can change. Always confirm with the restaurant before visiting.
const entries:Restaurant[]=[
// La Jolla / UCSD
{id:'dir-tahini-ucsd',name:'Tahini',location:{lat:32.88069092,lng:-117.24086344},address:'9625 Scholars Dr N, La Jolla, CA 92037',cuisine:'Middle Eastern',area:'La Jolla',halalStatus:'fully_halal',source:'directory'},
{id:'dir-curry-up-now',name:'Curry Up Now',location:{lat:32.8772178,lng:-117.23384929},address:'9700 Gilman Dr, La Jolla, CA 92093',cuisine:'Indian',area:'La Jolla',halalStatus:'fully_halal',halalNote:'Confirm chicken tenders and wings at the counter; older listings excepted them.',source:'directory'},
{id:'dir-dirty-birds',name:'Dirty Birds La Jolla',location:{lat:32.88010651,lng:-117.23673711},address:'9500 Gilman Dr #1420, San Diego, CA 92161',cuisine:'American',area:'La Jolla',halalStatus:'halal_options',halalNote:'Halal chicken sandwiches, loaded fries and salads; wings are NOT halal.',source:'directory'},
{id:'dir-zoya',name:'Zoya',location:{lat:32.84761029,lng:-117.27498785},address:'1000 Prospect St, La Jolla, CA 92037',cuisine:'Mediterranean',area:'La Jolla',halalStatus:'halal_options',halalNote:'Chicken shawarma, chicken kabab and beef kabab only.',source:'directory'},
{id:'dir-kebab-shop-lajolla',name:'The Kebab Shop',location:{lat:32.86679551,lng:-117.23130577},address:'8657 Villa La Jolla Dr, La Jolla, CA 92037',cuisine:'Mediterranean',area:'La Jolla',halalStatus:'halal_options',halalNote:'Halal carved lamb and beef only; chicken is not halal here.',source:'directory'},
{id:'dir-ikes',name:"Ike's Love & Sandwiches",location:{lat:32.86690013,lng:-117.23123123},address:'8657 Villa La Jolla Dr, Ste 101, La Jolla, CA 92037',cuisine:'American',area:'La Jolla',halalStatus:'halal_options',halalNote:'Halal chicken sandwiches only.',source:'directory'},
// UTC / University City
{id:'dir-royal-halal',name:'Royal Halal',location:{lat:32.8703419,lng:-117.21042155},address:'4545 La Jolla Village Dr, Ste FC 5, San Diego, CA 92122',cuisine:'Indian',area:'UTC / University City',halalStatus:'fully_halal',halalNote:'Verify at the counter; limited public confirmation.',source:'directory'},
{id:'dir-amardeen',name:'Amardeen Lebanese and Mediterranean Cuisine',location:{lat:32.86765384,lng:-117.20582231},address:'8915 Towne Centre Dr, San Diego, CA 92122',cuisine:'Mediterranean',area:'UTC / University City',halalStatus:'fully_halal',halalNote:'Alcohol is served on site.',source:'directory'},
// Clairemont
{id:'dir-aladdin',name:'Aladdin Mediterranean Restaurant',location:{lat:32.83470545,lng:-117.1754582},address:'5420 Clairemont Mesa Blvd, San Diego, CA 92117',cuisine:'Mediterranean',area:'Clairemont',halalStatus:'fully_halal',halalNote:'Alcohol is served on site.',source:'directory'},
{id:'dir-mikes-red-tacos',name:"Mike's Red Tacos",location:{lat:32.8215765,lng:-117.18356047},address:'4310 Genesee Ave, Ste 105, San Diego, CA 92117',cuisine:'Mexican',area:'Clairemont',halalStatus:'halal_options',halalNote:'Halal beef only.',source:'directory'},
{id:'dir-pad-thai-stand',name:'The Pad Thai Stand',location:{lat:32.80827417,lng:-117.16019869},address:'3520 Ashford St, Unit A1, San Diego, CA 92111',cuisine:'Thai',area:'Clairemont',halalStatus:'halal_options',halalNote:'Chicken usually halal; confirm that day.',source:'directory'},
// Hillcrest
{id:'dir-halal-guys',name:'The Halal Guys',location:{lat:32.74750602,lng:-117.16016127},address:'3825 Fifth Ave, San Diego, CA 92103',cuisine:'Middle Eastern',area:'Hillcrest',halalStatus:'fully_halal',source:'directory'},
{id:'dir-tandoori-hut',name:'Tandoori Hut',location:{lat:32.74801322,lng:-117.16061672},address:'3890 5th Ave, San Diego, CA 92103',cuisine:'Indian',area:'Hillcrest',halalStatus:'fully_halal',halalNote:'Alcohol is served on site.',source:'directory'},
{id:'dir-cluck-n-sip',name:"Cluck N' Sip",location:{lat:32.75007631,lng:-117.16361148},address:'120 W Washington St, Ste B, San Diego, CA 92103',cuisine:'American',area:'Hillcrest',halalStatus:'fully_halal',source:'directory'},
{id:'dir-khyber-pass',name:'Khyber Pass Zarparan Restaurant',location:{lat:32.74816,lng:-117.16003},address:'523 University Ave, San Diego, CA 92103',cuisine:'Afghan',area:'Hillcrest',halalStatus:'fully_halal',source:'directory'},
// Downtown / Gaslamp
{id:'dir-alis-chicken-waffles',name:"Ali's Chicken & Waffles",location:{lat:32.71731579,lng:-117.15913995},address:'1139 Sixth Ave, San Diego, CA 92101',cuisine:'American',area:'Downtown / Gaslamp',halalStatus:'fully_halal',source:'directory'},
{id:'dir-villains',name:'Villains Brewing Company',location:{lat:32.71025796,lng:-117.15627146},address:'903 Island Ave, San Diego, CA 92101',cuisine:'American',area:'Downtown / Gaslamp',halalStatus:'fully_halal',halalNote:'Brewpub serving alcohol; food is 100% halal.',source:'directory'},
{id:'dir-dunya',name:'DUNYA Restaurant & Lounge',location:{lat:32.71965,lng:-117.16049},address:'1352 Fifth Ave, Ste B, San Diego, CA 92101',cuisine:'Middle Eastern',area:'Downtown / Gaslamp',halalStatus:'fully_halal',halalNote:'100% halal kitchen, no alcohol. Hookah lounge is 21+ after hours.',source:'directory'},
{id:'dir-house-of-mandi',name:'House of Mandi',location:{lat:32.70951608,lng:-117.16121973},address:'332 J St, Unit 102, San Diego, CA 92101',cuisine:'Middle Eastern',area:'Downtown / Gaslamp',halalStatus:'fully_halal',source:'directory'},
{id:'dir-kebab-shop-little-italy',name:'The Kebab Shop',location:{lat:32.72083704,lng:-117.16576171},address:'303 W Beech St, San Diego, CA 92101',cuisine:'Mediterranean',area:'Downtown / Gaslamp',halalStatus:'halal_options',halalNote:'Halal carved lamb and beef only.',source:'directory'},
// South Park
{id:'dir-shawarma-guys-south-park',name:'Shawarma Guys',location:{lat:32.72664674,lng:-117.13005602},address:'3012 Grape St, San Diego, CA 92102',cuisine:'Middle Eastern',area:'South Park',halalStatus:'fully_halal',halalNote:'Food truck.',source:'directory'},
// Mission Valley
{id:'dir-tahini-mission-valley',name:'Tahini',location:{lat:32.77115871,lng:-117.15597432},address:'7710 Hazard Center Dr, Ste D, San Diego, CA 92108',cuisine:'Middle Eastern',area:'Mission Valley',halalStatus:'fully_halal',source:'directory'},
{id:'dir-kebab-shop-mission-valley',name:'The Kebab Shop',location:{lat:32.77066995,lng:-117.15023134},address:'1570 Camino De La Reina, San Diego, CA 92108',cuisine:'Mediterranean',area:'Mission Valley',halalStatus:'halal_options',halalNote:'Halal carved lamb and beef only.',source:'directory'},
{id:'dir-wagyu-shawarma',name:'Wagyu Shawarma Grill',location:{lat:32.78454348,lng:-117.11129601},address:'10467 San Diego Mission Rd, San Diego, CA 92108',cuisine:'Mediterranean',area:'Mission Valley',halalStatus:'fully_halal',source:'directory'},
// Kearny Mesa
{id:'dir-tahini-kearny-mesa',name:'Tahini',location:{lat:32.83103928,lng:-117.13280472},address:'9119 Clairemont Mesa Blvd, San Diego, CA 92123',cuisine:'Middle Eastern',area:'Kearny Mesa',halalStatus:'fully_halal',source:'directory'},
// Miramar
{id:'dir-kebabish',name:'Kebabish',location:{lat:32.87919569,lng:-117.16414858},address:'7050 Miramar Rd, San Diego, CA 92121',cuisine:'Pakistani',area:'Miramar',halalStatus:'fully_halal',source:'directory'},
// Sorrento Valley
{id:'dir-urban-skillet',name:'Urban Skillet',location:{lat:32.89090807,lng:-117.20169172},address:'9254 Scranton Rd #105, San Diego, CA 92121',cuisine:'American',area:'Sorrento Valley',halalStatus:'fully_halal',source:'directory'},
// Mira Mesa
{id:'dir-shawarma-guys-mira-mesa',name:'Shawarma Guys',location:{lat:32.9131435,lng:-117.14895772},address:'9690 Reagan Rd Ste 103, San Diego, CA 92126',cuisine:'Middle Eastern',area:'Mira Mesa',halalStatus:'fully_halal',source:'directory'},
{id:'dir-charminar',name:'Charminar Indian Restaurant & Catering',location:{lat:32.90601188,lng:-117.17342521},address:'6755 Mira Mesa Blvd #111, San Diego, CA 92121',cuisine:'Indian',area:'Mira Mesa',halalStatus:'fully_halal',source:'directory'},
{id:'dir-pista-house',name:'Pista House',location:{lat:32.91457969,lng:-117.14671591},address:'8240 Mira Mesa Blvd Unit E, San Diego, CA 92126',cuisine:'Indian',area:'Mira Mesa',halalStatus:'fully_halal',halalNote:'Zabiha halal per the restaurant and Zabihah; HFSAA certification status was disputed in Nov 2026, confirm at the counter.',source:'directory'},
{id:'dir-baba-kabob',name:'Baba Kabob',location:{lat:32.89491799,lng:-117.12380737},address:'9474 Black Mountain Rd Ste A, San Diego, CA 92126',cuisine:'Afghan',area:'Mira Mesa',halalStatus:'fully_halal',source:'directory'},
// Scripps Ranch
{id:'dir-deccan-bites',name:'Deccan Bites',location:{lat:32.90380765,lng:-117.1142856},address:'9810 Carroll Canyon Rd Ste 102, San Diego, CA 92131',cuisine:'Indian',area:'Scripps Ranch',halalStatus:'fully_halal',source:'directory'},
// Rancho Bernardo
{id:'dir-casa-lahori',name:'Casa Lahori',location:{lat:33.02005124,lng:-117.07267633},address:'11975 Bernardo Plaza Dr, San Diego, CA 92128',cuisine:'Pakistani',area:'Rancho Bernardo',halalStatus:'fully_halal',halalNote:'No alcohol served.',source:'directory'},
// La Mesa
{id:'dir-shawarma-guys-la-mesa',name:'Shawarma Guys',location:{lat:32.77925907,lng:-117.0183018},address:'5525 Jackson Dr #B, La Mesa, CA 91942',cuisine:'Middle Eastern',area:'La Mesa',halalStatus:'fully_halal',source:'directory'},
// El Cajon
{id:'dir-mal-al-sham',name:'Mal Al Sham',location:{lat:32.79517534,lng:-116.95750417},address:'388 E Main St, El Cajon, CA 92020',cuisine:'Middle Eastern',area:'El Cajon',halalStatus:'fully_halal',source:'directory'},
{id:'dir-kabul-kabob',name:'Kabul Kabob House',location:{lat:32.79455304,lng:-116.93909346},address:'1255 E Main St, El Cajon, CA 92021',cuisine:'Afghan',area:'El Cajon',halalStatus:'fully_halal',source:'directory'},
{id:'dir-brothers-charcoal',name:'Brothers Charcoal Kebab',location:{lat:32.80679351,lng:-116.95665398},address:'463 Broadway, El Cajon, CA 92021',cuisine:'Afghan',area:'El Cajon',halalStatus:'fully_halal',source:'directory'},
{id:'dir-asadis',name:"Asadi's Halal Mart",location:{lat:32.79314771,lng:-116.96924151},address:'277 El Cajon Blvd, El Cajon, CA 92020',cuisine:'Afghan',area:'El Cajon',halalStatus:'fully_halal',halalNote:'Halal mart with restaurant seating.',source:'directory'},
{id:'dir-tarbosh',name:'Tarbosh Mediterranean Restaurant',location:{lat:32.79520504,lng:-116.94318266},address:'1142 E Main St, El Cajon, CA 92021',cuisine:'Middle Eastern',area:'El Cajon',halalStatus:'fully_halal',source:'directory'},
{id:'dir-saray',name:'Saray Restaurant',location:{lat:32.79560383,lng:-116.93487358},address:'123 Jamacha Rd, El Cajon, CA 92019',cuisine:'Turkish',area:'El Cajon',halalStatus:'fully_halal',halalNote:'No alcohol served.',source:'directory'},
// Chula Vista
{id:'dir-kabob-shack',name:'Kabob Shack',location:{lat:32.64108788,lng:-117.09383114},address:'200 Broadway, Chula Vista, CA 91910',cuisine:'Afghan',area:'Chula Vista',halalStatus:'fully_halal',source:'directory'},
];
export const directory:Restaurant[]=entries.map(r=>({...r,nearCampus:r.location.lat>=32.8665&&r.location.lat<=32.8955&&r.location.lng>=-117.253&&r.location.lng<=-117.222}));
