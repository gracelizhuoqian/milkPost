var host = 'https://fuguadongchan.top';
const service = {
    // 用户登录
    login: `${host}/login`,
    // 提交性格信息
    character: `${host}/character`,
    // 查看信件列表
    getLetters: `${host}/getLetters`,
    // 查看某封信件
    getOneLetter: `${host}/getOneLetter`,
    // 新增一封信件
    addOneLetter:`${host}/addOneLetter`,
    // 删除一封信件
    deleteOneLetter: `${host}/deleteOneLetter`
};
module.exports = service;