const aylar = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

function getToday() {
  const date = new Date();

  let year = date.getFullYear(); // 2023

  let month = date.getMonth(); // 0 - 11

  let day = date.getDate(); // 31

  return day + ' ' + aylar[month] + ' ' + year;
}

export default getToday;
