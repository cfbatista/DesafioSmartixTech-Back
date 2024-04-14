const dataSource = require('../models');

class Services {

    constructor(model){
        this.model = model;
    }

    async getAll(){
        return dataSource[this.model].findAll();
    }
}

module.exports = Services;