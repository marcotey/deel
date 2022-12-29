'use strict';
const {Op, Transaction, sequelize } = require('../../infra/sequelize')

module.exports = class CommonRepository {
    constructor() {
        this._sequelize = sequelize;
        this._Op = Op;
        this._Transaction = Transaction;
    }   
}
