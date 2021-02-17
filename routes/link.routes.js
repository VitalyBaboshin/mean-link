const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware')
const router = Router();

router.post('/generate',auth , async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        console.log(baseUrl)
        const {from} = req.body;
        const code = shortid.generate();
        const existing = await Link.findOne({from});
        if (existing) {
            return res.json({ link: existing});
        }
        const to = baseUrl + '/t/' + code;

        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        try {
            await link.save();
        } catch (e) {
            console.log(e._message)
        }
        res.status(201).json({ link })

    } catch (e) {
        //Внутренняя ошибка сервера
        res.status(500).json({message: 'Internal server error !!'})
    }
})
router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId});
        res.json(links);
    } catch (e) {
        //Внутренняя ошибка сервера
        res.status(500).json({message: 'Internal server error !!'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id); //??
        res.json(link);
    } catch (e) {
        //Внутренняя ошибка сервера
        res.status(500).json({message: 'Internal server error !!'})
    }
})

router.delete('/:id', auth, async (req, res) => {
    const link = await Link.findById(req.params.id)
    const from = link.from;
    const id = req.params.id;
    try {
        await Link.deleteMany({_id:id}, function (err, result) {
            if (err) {
                console.log(err)
            }
            console.log(result);
        });
        res.status(201).json({message: `Ссылка ${from} удалена` })
    } catch (e) {
        //Внутренняя ошибка сервера
        res.status(500).json({message: 'Internal server error !!Not delete'})
    }
})
module.exports = router
