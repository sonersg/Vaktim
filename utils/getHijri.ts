import {toHijri, toGregorian} from 'hijri-converter';

const hicriAylar = [
  'Muharrem',
  'Safer',
  'R.evvel',
  'R.ahir',
  'C.evvel',
  'C.ahir',
  'Recep',
  'Şaban',
  'Ramazan',
  'Şevval',
  'Zilkade',
  'Zilhicce',
];

function getHijri() {
  const date = new Date();

  const year = date.getFullYear(); // 2023

  const month = date.getMonth(); // 9 -> Eylül

  const day = date.getDate(); // 12

  const hicri = toHijri(year, month + 1, day); // convert greg to hijri

  const greg = toGregorian(1407, 7, 1); // convert 1st of Rajab, 1407 to Gregorian

  return hicri.hd + ' ' + hicriAylar[hicri.hm - 1] + ' ' + hicri.hy;
}

export default getHijri;
