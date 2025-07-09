import { storage } from '../../app/(screens)/_layout';
import tr from './tr.json';
import en from './en.json';

export default function translation(dil?: string) {
  if (dil === 'tr') return tr;
  if (dil === 'en') return en;

  const lang = storage.getString('lang');
  if (!lang || lang == 'tr') return tr;
  else return en;
}
