export const endpoints = {
  users: {
    list: '/users',
    me: '/users/me',
    updateMe: '/users/me',
    updatePassword: '/users/password',
  },
  transaction: {
    transactionMe: '/api/transacoes/me',
  },
  savings:{
    reserva: '/economias/reserva'
  },
  income:{
    saldo: '/economias/saldo'
  },
  goals: {
    list: '/goals'
  }
};
