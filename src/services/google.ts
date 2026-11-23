import {setOptions,importLibrary} from '@googlemaps/js-api-loader';
import type {Restaurant,Point,Review} from '../types';
import {miles,campusApprox} from '../utils/geo';
let initialized=false;
export const configured=Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim());
export async function loadGoogle(){if(!configured)throw new Error('Live Google Maps is not configured.');if(!initialized){setOptions({key:import.meta.env.VITE_GOOGLE_MAPS_API_KEY,v:'weekly'});initialized=true;}
// The loader never settles if the Maps script can't load (e.g. blocked
// network), so time out instead of leaving the app waiting on live data.
let timer:ReturnType<typeof setTimeout>|undefined;try{const [maps,places,marker]=await Promise.race([Promise.all([importLibrary('maps'),importLibrary('places'),importLibrary('marker')]),new Promise<never>((_,reject)=>{timer=setTimeout(()=>reject(new Error('Google Maps took too long to load.')),10000);})]);return {maps,places,marker};}finally{clearTimeout(timer);}}
const baseFields=['id','displayName','location','formattedAddress','rating','userRatingCount','priceLevel','businessStatus','regularOpeningHours','photos','googleMapsURI','types','currentOpeningHours'];
const detailFields=['id','displayName','location','formattedAddress','rating','userRatingCount','priceLevel','businessStatus','regularOpeningHours','currentOpeningHours','photos','googleMapsURI','types','websiteURI','nationalPhoneNumber','reviews','outdoorSeating','servesVegetarianFood','dineIn','takeout','delivery'];
async function toRestaurant(p:google.maps.places.Place):Promise<Restaurant|null>{
  if(!p.location||!p.id)return null;
  const loc={lat:p.location.lat(),lng:p.location.lng()};
  const photo=p.photos?.[0];
  const photos=p.photos?.slice(0,5).map(x=>x.getURI({maxWidth:900,maxHeight:650}));
  const hours=p.currentOpeningHours||p.regularOpeningHours;
  // The Places API exposes open status via the async Place.isOpen() method;
  // OpeningHours has no openNow property in @types/google.maps 3.58.
  const open=await p.isOpen().catch(()=>undefined);
  // Live Places results carry no verified halal status. The directory is the
  // only source of verified halal claims; live results are shown as
  // unverified so the app never calls a place fully halal on a guess.
  return {id:p.id,name:p.displayName||'Unnamed restaurant',location:loc,address:p.formattedAddress||undefined,rating:p.rating??undefined,reviewCount:p.userRatingCount??undefined,price:p.priceLevel||undefined,open,photo:photo?.getURI({maxWidth:600,maxHeight:420}),photos,website:p.websiteURI||undefined,phone:p.nationalPhoneNumber||undefined,mapsUrl:p.googleMapsURI||undefined,types:p.types||undefined,hours:hours?.weekdayDescriptions||undefined,businessStatus:p.businessStatus||undefined,amenities:{outdoor:p.hasOutdoorSeating??undefined,vegetarian:p.servesVegetarianFood??undefined,dineIn:p.hasDineIn??undefined,takeout:p.hasTakeout??undefined,delivery:p.hasDelivery??undefined},source:'google',nearCampus:campusApprox(loc)};
}
const cache=new Map<string,{at:number;items:Restaurant[]}>();
const searches=['halal restaurant San Diego','halal restaurant La Jolla','halal restaurant UTC San Diego','halal Mediterranean restaurant San Diego','halal Indian restaurant San Diego','halal restaurant Hillcrest San Diego','halal restaurant El Cajon','halal restaurant Mira Mesa San Diego'];
export async function searchRestaurants(origin:Point,radiusMi:number):Promise<Restaurant[]>{const key=`${origin.lat.toFixed(3)}:${origin.lng.toFixed(3)}:${radiusMi.toFixed(2)}`;const hit=cache.get(key);if(hit&&Date.now()-hit.at<10*60_000)return hit.items;const {places}=await loadGoogle();const Place=places.Place;const seen=new Map<string,Restaurant>();const add=async(ps:google.maps.places.Place[])=>{const cs=await Promise.all(ps.map(toRestaurant));for(const c of cs){if(c&&c.businessStatus!=='CLOSED_PERMANENTLY'&&miles(origin,c.location)<=radiusMi)seen.set(c.id,c);}};
// Nearby Search has a result cap, so supplement it with geographically distinct text searches.
const tasks:Promise<unknown>[]=[];tasks.push(Place.searchNearby({fields:baseFields,locationRestriction:{center:origin,radius:Math.min(radiusMi*1609.344,8000)},includedPrimaryTypes:['restaurant'],maxResultCount:20,rankPreference:google.maps.places.SearchNearbyRankPreference.DISTANCE}).then(r=>add(r.places)).catch(()=>{}));
for(const q of searches){tasks.push(Place.searchByText({textQuery:q,fields:baseFields,locationBias:{center:origin,radius:Math.min(radiusMi*1609.344+1000,10000)},maxResultCount:20}).then(r=>add(r.places)).catch(()=>{}));}
await Promise.all(tasks);const items=[...seen.values()];if(!items.length)throw new Error('No live restaurants returned. Check your API permissions, quota, or connection.');cache.set(key,{at:Date.now(),items});return items;}
export async function getRestaurantDetails(id:string):Promise<Restaurant>{const {places}=await loadGoogle();const p=new places.Place({id});await p.fetchFields({fields:detailFields});const c=await toRestaurant(p);if(!c)throw new Error('This restaurant could not be loaded.');const reviews=((p.reviews||[]) as google.maps.places.Review[]).slice(0,5);c.reviews=reviews.map((r):Review=>({author:r.authorAttribution?.displayName||'Google reviewer',rating:r.rating||0,text:r.text||'',time:r.relativePublishTimeDescription||undefined,avatar:r.authorAttribution?.photoURI||undefined,url:r.authorAttribution?.uri||undefined}));return c;}
export interface AddressSuggestion{placeId:string;mainText:string;secondaryText:string}
// Places Autocomplete predictions for the address field. Only called while
// live mode is on; loadGoogle() throws when no key is configured, so the
// caller must guard on `configured && !mapsFailed` first.
export async function fetchAddressSuggestions(input:string,origin:Point):Promise<AddressSuggestion[]>{const {places}=await loadGoogle();const {suggestions}=await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({input,locationBias:{center:origin,radius:20000},origin,region:'US'});return suggestions.map(s=>s.placePrediction).filter((p):p is google.maps.places.PlacePrediction=>!!p).map(p=>({placeId:p.placeId,mainText:p.mainText?.text||p.text.text,secondaryText:p.secondaryText?.text||''}));}
export async function placeLocation(placeId:string):Promise<{location:Point;name:string}>{const {places}=await loadGoogle();const p=new places.Place({id:placeId});await p.fetchFields({fields:['location','displayName']});if(!p.location)throw new Error('Place not found');return {location:{lat:p.location.lat(),lng:p.location.lng()},name:p.displayName||''};}
