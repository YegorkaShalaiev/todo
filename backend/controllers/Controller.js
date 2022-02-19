class Controller {
    constructor(model) {
        this._model = model;
        this.create = this.create.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
    }

    async create(req, res, data = null) {
        const createData = data || req.body;

        return this._model.create(createData);
    };

    async get(data) {
        return this._model.findOne(data);
    }

    async update(data) {
        return this._model.update(data);
    }
}

export default Controller;