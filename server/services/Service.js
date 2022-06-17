class Service {
    constructor(model) {
        this._model = model;
        this.create = this.create.bind(this);
        this.find = this.find.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(data) {
        return this._model.create(data);
    };

    async find(data) {
        return this._model.findOne(data);
    }

    async update(data) {
        return this._model.updateOne(data);
    }

    async delete(data) {
        return this._model.deleteOne(data);
    }
}

export default Service;