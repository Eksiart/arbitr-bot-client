
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
    nameRus: 'Тинькофф',
    name: 'TinkoffNew',
    selctor: '#Тинькофф',
    english: 'Tinkoff',
  },
  {
    id: 2,
    label: 'Росбанк',
    nameRus: 'Росбанк',
    name: 'RosBankNew',
    selctor: '#Росбанк',
    english: 'RosBank',
  },
  {
    id: 3,
    label: 'Райффайзенбанк',
    nameRus: 'Райффайзенбанк',
    name: 'RaiffeisenBank',
    selctor: '#Райффайзенбанк',
    english: 'Raiffeisenbank',
  },
];

const coinsOptions = [
  'USDT',
  'BUSD',
  'BTC',
  'ETH',
  'BNB',
  'RUB',
];

export {
  tradeTypesOptions,
  banksOptions,
  coinsOptions
}