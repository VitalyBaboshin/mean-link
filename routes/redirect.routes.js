const {Router} = require('express');
const Link = require('../models/Link');
const router = Router();

router.get('/:code', async (req, res) => {
    try {
        let link
        console.log(req.params.code)
        //Получаем ссылку с которой мы сейчас работаем по коду
        try {
            link = await Link.findOne({ code: req.params.code});
        } catch (e) {
            console.log(e.message)
        }

        if (link) {
            link.clicks++;
            await link.save();
            if (link.from.slice(0, 4) !== 'http') {
                return res.redirect(`http://`+ link.from);
            }
            return res.redirect(link.from);
        }

        res.status(404).json('Ссылка не найдена');

    } catch (e) {
        //Внутренняя ошибка сервера
        res.status(500).json({message: 'Internal server error !!'})
    }
})

module.exports = router;
