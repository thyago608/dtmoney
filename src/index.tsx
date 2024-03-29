import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createServer, Model } from 'miragejs';

createServer({
  models:{
    transaction: Model
  },
  seeds(server){
    server.db.loadData({
      transactions:[
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          value: 6000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          value: 1100,
          createdAt: new Date('2021-02-03 12:43:00')
        },
      ]
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions',()=>{
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
        const transaction = JSON.parse(request.requestBody);

        return schema.create('transaction', {
          ...transaction,
          createdAt: new Date(),
        });
    });

    this.put('/transactions',(schema, request) =>{
      const transactionRequest = JSON.parse(request.requestBody);

      const transaction = schema.find('transaction', transactionRequest.id);

      transaction?.update({
         ...transactionRequest,
         createdAt: new Date()
      });
     
      return transaction ?? {};
    });

    this.delete('/transactions', (schema, request) => {
      const idTransaction = JSON.parse(request.queryParams[0]);

      const transaction = schema.find('transaction',idTransaction);
      
      transaction?.destroy();

      return transaction ?? {};
    });
  },
});


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
