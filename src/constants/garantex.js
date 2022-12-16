
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

const marketOptions = [
  {
    id: 1,
    name: "market",
  },
  {
    id: 2,
    name: "FixPrice",
  },
  {
    id: 3,
    name: 'MOEX',
  },
]


const banksOptions = [
  {
    id: 1,
    label: 'Тинькофф',
    name: 'тиньк',
  },
  {
    id: 2,
    label: 'Сбербанк',
    name: 'сбер',
  },
  {
    id: 3,
    label: 'Райффайзенбанк',
    name: 'райф',
  },
  {
    id: 4,
    label: 'СБП',
    name: 'сбп',
  },
];

const coinsOptions = [
  'USDT',
  'BTC',
  'ETH',
  'RUB',
];

const comissionType = [
  {
    id: 1,
    name: 'START',
    rub: {
      maker: 0.25,
      taker: 0.25,
    },
    usd: {
      maker: 0.2,
      taker: 0.2,
    },
    crypto: {
      taker: 0.2,
    },
  },
  {
    id: 2,
    name: 'PRO 1',
    rub: {
      maker: 0.2,
      taker: 0.23,
    },
    usd: {
      maker: 0.15,
      taker: 0.18,
    },
    crypto: {
      taker: 0.15,
    },
  },
  {
    id: 3,
    name: 'PRO 2',
    rub: {
      maker: 0.15,
      taker: 0.2,
    },
    usd: {
      maker: 0.12,
      taker: 0.15,
    },
    crypto: {
      taker: 0.12,
    },
  },
  {
    id: 4,
    name: 'PRO 3',
    rub: {
      maker: 0.15,
      taker: 0.19,
    },
    usd: {
      maker: 0.1,
      taker: 0.12,
    },
    crypto: {
      taker: 0.1,
    },
  },
  {
    id: 5,
    name: 'PRO 4',
    rub: {
      maker: 0.15,
      taker: 0.18,
    },
    usd: {
      maker: 0.1,
      taker: 0.1,
    },
    crypto: {
      taker: 0.09,
    },
  },
  {
    id: 6,
    name: 'PRO 5',
    rub: {
      maker: 0.14,
      taker: 0.17,
    },
    usd: {
      maker: 0.1,
      taker: 0.1,
    },
    crypto: {
      taker: 0.08,
    },
  },
  {
    id: 7,
    name: 'VIP 1',
    rub: {
      maker: 0.12,
      taker: 0.15,
    },
    usd: {
      maker: 0.1,
      taker: 0.1,
    },
    crypto: {
      taker: 0.075,
    },
  },
  {
    id: 8,
    name: 'VIP 2',
    rub: {
      maker: 0.1,
      taker: 0.13,
    },
    usd: {
      maker: 0.1,
      taker: 0.1,
    },
    crypto: {
      taker: 0.075,
    },
  },
  {
    id: 9,
    name: 'VIP 3',
    rub: {
      maker: 0.1,
      taker: 0.1,
    },
    usd: {
      maker: 0.1,
      taker: 0.1,
    },
    crypto: {
      taker: 0.075,
    },
  },
]

export {
  tradeTypesOptions,
  banksOptions,
  coinsOptions,
  marketOptions,
  comissionType
}