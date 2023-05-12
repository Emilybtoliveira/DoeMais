const { Solicitation, Solicitation_Person, Donator} = require('../models')

const SolicitationController = {}; 

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

SolicitationController.create = async function(req, res){
    try {
        const filename = req.file ? req.file.filename : null

        const person = await Solicitation_Person.create({
            name: req.body.name,
            bloodtype: req.body.bloodtype,
            description: req.body.description,
            picture: filename,
            age: req.body.age,
            city: req.body.city,
            state: req.body.state,
            hospital: req.body.hospital,
        });
        
        const solicitation = await Solicitation.create({
            status: "open",
            solicitationPersonId: person.id,
            solicitationUserId: req.body.userId,
            creation_date: today.toUTCString()
        });

        res.status(200).json(solicitation);        
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

SolicitationController.getSolicitations = async function(req, res){
    try 
    {   
        if(req.query.userId){ //retorna as solicitações do usuario
            const data = await Solicitation.findAll({
                where:{
                    solicitationUserId: req.query.userId,
                    status: "open"
                },
                include: { model: Solicitation_Person, as: 'person' }
            });

            res.status(200).json({ data });

        } else if(req.query.id){ //retorna a solicitação com o id
            const data = await Solicitation.findOne({
                where:{
                    id: req.query.id,
                    status: "open"
                },
                include: { model: Solicitation_Person, as: 'person' }
            });

            res.status(200).json({ data });

        }else { //retorno de todas as solicitacoes
            const data = await Solicitation_Person.findAll({
                include: {
                    model: Solicitation,
                    where: {
                        status: "open"
                    }
                }
            });
            
            res.status(200).json({ data });        
        }
    } catch (error) 
    {
        res.status(500).json({ error: error });        
    }
}

SolicitationController.update = async function(req, res){
    try {
        const solicitation = await Solicitation_Person.findByPk(req.body.id)

        if (!solicitation) {
            res.status(404).json({ error: "Não existe solicitação com esse id."});
            return
        }

        const filename = req.file ? req.file.filename : solicitation.picture
        await solicitation.update({ 
            name: req.body.name,
            bloodtype: req.body.bloodtype,
            description: req.body.description,
            picture: filename,
            age: req.body.age,
            city: req.body.city,
            state: req.body.state,
            hospital: req.body.hospital,
        })

        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

SolicitationController.disable = async function(req, res){
    try {
        const solicitation_id = req.params.id;

        const result = await Solicitation.update({ 
            status: "closed",
            closure_date: today.toUTCString()
        }, 
        {
            where: {
              id: solicitation_id
            }
        });

        if(result){
            res.status(200).json();           
        }else{
            res.status(404).json({ error: "Não existe solicitação com esse id."});    
        }

    } catch (error) {
        res.status(500).json({ error: error });
    }
}

SolicitationController.getUserFeed = async function(req, res){
    const compatibily_map = {
        "A+": ["AB+", "A+"],
        "A-": ["A+", "A-", "AB+", "AB-"],
        "B+": ["B+", "AB+"],
        "B-": ["B+", "B-", "AB+", "AB-"],
        "AB+": ["AB+"],
        "AB-": ["AB+", "AB-"],
        "O+": ["A+", "B+", "O+", "AB+"],
        "O-": ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    }

    try {
        const city = req.query.city;
        const userId = req.query.userId;

        const user_donator = await Donator.findOne({
            where: {
                userId: userId
            }
        })
        
        if (!user_donator){
            res.status(404).json({ error: 'Nenhum usuário encontrado para o id fornecido.'});
            return;
        }
        if(req.query.city){
            if (user_donator.blood_type){
                const user_compatibilities = compatibily_map[user_donator.blood_type];

                const data = await Solicitation_Person.findAll({
                    where: {
                        city: city,
                        bloodtype: user_compatibilities
                    },
                    include: {
                        model: Solicitation,
                        where: {
                            status: "open"
                        }
                    }
                })
                
                    res.status(200).json({ data });

            } else {
                const data = await Solicitation_Person.findAll({
                    where: {
                        city: city
                    },
                    include: {
                        model: Solicitation,
                        where: {
                            status: "open"
                        }
                    }
                })
                res.status(200).json({ data });
            }
        }
        else{            
            const data = await Solicitation_Person.findAll({ 
                include: { 
                    model: Solicitation,
                    where: {
                        status: "open"
                    }
                } 
            });
            res.status(200).json({ data });
        }
    } catch (error) {
        res.status(500).json({ message: error})
    }
}

module.exports = SolicitationController;