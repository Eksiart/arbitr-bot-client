import React from 'react';
import { useState, useEffect } from "react";

const Calculator = () => {
  const [firstCoin, setFirstCoin] = useState('USDT');
  const [secondCoin, setSecondCoin] = useState('BTC');

  const [firstPrice, setFirstPrice] = useState(65);
  const [secondPrice, setSecondPrice] = useState(1110000);

  const [spotPrice, setSpotPrice] = useState(0);
  const [shoulder, setShoulder] = useState(0);
  const [ROE, setROE] = useState(0);
  // const [garantexDop, seGtarantexDop] = useState(0);
  const [spread, setSpread] = useState(0);
  const [profit, setProfit] = useState(0);

  const [budget, setBudget] = useState(100000);

  useEffect(() => {
    // eslint-disable-next-line
  }, [])

  return (
    <div>

    </div>
  );
}

export default Calculator;
