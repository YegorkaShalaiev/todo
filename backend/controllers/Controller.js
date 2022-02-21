class Controller {
    constructor(model) {
        this._model = model;
        this.create = this.create.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
    }

    async create(data) {
        return this._model.create(data);
    };

    async get(data) {
        return this._model.findOne(data);
    }

    async update(data) {
        return this._model.updateOne(data);
    }
}

export default Controller;