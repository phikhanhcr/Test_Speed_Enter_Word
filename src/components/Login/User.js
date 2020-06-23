import React from 'react'
const UserContext = React.createContext();
const UserProvide = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

export { UserProvide , UserConsumer}