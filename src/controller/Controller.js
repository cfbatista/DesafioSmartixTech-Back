class Controller {

    constructor(entidadeService){
        this.entidadeService = entidadeService;
    }

    async getAll(req, res) {
        try{
            const listRegistros = await this.entidadeService.getAll();

            return res.status(200).json(listRegistros);
        } catch (error) {

        }
    }
}

module.exports = Controller;