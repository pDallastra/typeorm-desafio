import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    let totalIncome = 0;
    let totalOutcome = 0;

    const transactions = await this.find();

    transactions.map(transaction => {
      if (transaction.type === 'income') {
        totalIncome += Number(transaction.value);
      } else if (transaction.type === 'outcome') {
        totalOutcome += Number(transaction.value);
      }
    });
    const total = totalIncome - totalOutcome;
    const balance = { income: totalIncome, outcome: totalOutcome, total };

    return balance;
  }
}

export default TransactionsRepository;
