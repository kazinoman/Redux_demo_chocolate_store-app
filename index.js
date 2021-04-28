const { combineReducers, createStore } = require("redux");
// console.log(Redux);

// Action creator
const buyChocolate = (quantity, givenMoney) => {
  return {
    type: "BUY_CHOCOLATE",
    payload: {
      quantity: quantity,
      givenMoney: givenMoney,
    },
  };
};

const returnChocolate = (quantity, takenMoney) => {
  return {
    type: "RETURN_CHOCOLATE",
    payload: {
      quantity,
      takenMoney,
    },
  };
};

// DEFINE reducer (Our depertment like cashCouner , central Storage)

const centralStorage = (previousStoreCondition = 100, action) => {
  if (action.type === "BUY_CHOCOLATE") {
    return previousStoreCondition - action.payload.quantity;
  } else if (action.type === "RETURN_CHOCOLATE") {
    return previousStoreCondition + action.payload.quantity;
  }

  return previousStoreCondition;
};

// ANOTHER REDUCER (Our cashCounter)

const cashCouner = (previousCashCondition = 200, action) => {
  if (action.type === "BUY_CHOCOLATE") {
    return previousCashCondition + action.payload.givenMoney;
  } else if (action.type === "RETURN_CHOCOLATE") {
    return previousCashCondition - action.payload.takenMoney;
  }

  return previousCashCondition;
};

const ourDepartments = combineReducers({
  centralStorage: centralStorage,
  cashCouner: cashCouner,
});

const store = createStore(ourDepartments);

// const action = buyChocolate(5, 10);
store.dispatch(buyChocolate(5, 10));
store.dispatch(buyChocolate(90, 300));

// Return chocolate from buyer....
store.dispatch(returnChocolate(50, 150));

console.log(store.getState());
