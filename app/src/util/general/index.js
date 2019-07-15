import moment from moment;
class General{
    static getKeyForList(add=""){
        return `${moment().unix()}${add.toString()}`;
    }
}

export default new General();