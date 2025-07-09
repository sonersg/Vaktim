import { storage } from '../../app/(screens)/_layout';
import tr from './tr.json';
import en from './en.json';

export default function translation() {
  const lang = storage.getString('lang');
  if (!lang || lang == 'tr') return tr;
  else return en;
}
