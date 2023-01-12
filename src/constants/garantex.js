
const tradeTypesOptions = [
  {
    id: 1,
    label: 'T/T',
    first: 'TAKER',
    second: 'TAKER',
  },
  {
    id: 2,
    label: 'T/M',
    first: 'TAKER',
    second: 'MAKER',
  },
  {
    id: 3,
    label: 'M/T',
    first: 'MAKER',
    second: 'TAKER',
  },
  {
    id: 4,
    label: 'M/M',
    first: 'MAKER',
    second: 'MAKER',
  },
];

const banksOptions = [
  {
    id: 1,
    label: 'Тинькофф',
    name: 'тиньк',
    english: 'tink',
  },
  {
    id: 2,
    label: 'Сбербанк',
    name: 'сбер',
    english: 'sber',
  },
  {
    id: 3,
    label: 'Райффайзенбанк',
    name: 'райф',
    english: 'raif',
  },
  {
    id: 4,
    label: 'СБП',
    name: 'сбп',
    english: 'sbp',
  },
];

const coinsSimple = [
  'USDT',
  'BTC',
  'ETH',
];

const level = [
  'start',
  'pro1',
  'pro2',
  'pro3',
  'pro4',
  'pro5',
  'vip1',
  'vip2',
  'vip3',
]

export {
  tradeTypesOptions,
  banksOptions,
  coinsSimple,
  level,
}