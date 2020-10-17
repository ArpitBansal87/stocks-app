const updateStockMarket = (stockUpdates, stocksListObj) => {
    const currentData = JSON.parse(stockUpdates);
    const currentTime = new Date();
    for (const stock of currentData) {
      if (stocksListObj.has(stock[0])) {
        const currentValue = stocksListObj.get(stock[0]);
        stocksListObj.set(stock[0], {
          updatedTimeStamp: currentTime,
          change: currentValue.price - stock[1],
          price: stock[1],
          history:
            currentValue.history.length !== 0
              ? [...currentValue.history, { price: stock[1], time: currentTime }]
              : [{ price: currentValue.price, time: currentTime }],
          name: stock[0],
        });
      } else {
        stocksListObj.set(stock[0], {
          updatedTimeStamp: currentTime,
          change: 0,
          price: stock[1],
          history: [{ price: stock[1], time: currentTime }],
          name: stock[0],
        });
      }
    }
    return stocksListObj;
  };

  export default updateStockMarket;