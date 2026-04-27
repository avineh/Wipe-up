import { dictionaries } from './src/i18n/dictionaries';

const enKeys = Object.keys(dictionaries.en);
const heKeys = Object.keys(dictionaries.he);

console.log('EN keys:', enKeys);
console.log('HE keys:', heKeys);
console.log('Difference:', enKeys.filter(k => !heKeys.includes(k)));
console.log('Difference HE:', heKeys.filter(k => !enKeys.includes(k)));
