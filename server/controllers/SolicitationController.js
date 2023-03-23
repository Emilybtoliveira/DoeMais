const { Solicitation, Solicitation_Person, Donator} = require('../models')

const SolicitationController = {}; 

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

SolicitationController.create = async function(req, res){
    try {
        const person = await Solicitation_Person.create({
            name: req.body.name,
            bloodtype: req.body.bloodtype,
            description: req.body.description,
            picture: req.body.picture,
            city: req.body.city,
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
        res.status(404).json({ message: error });
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
                include: {model: Solicitation_Person, as: 'person'}
            });

            res.status(200).json({ data: data });
        } else { //retorno de todas as solicitacoes
            const data = await Solicitation_Person.findAll({include: Solicitation});
            
            res.status(200).json({ data: data });        
        }
    } catch (error) 
    {
        res.status(404).json({ message: "something went wrong" });        
    }
}

SolicitationController.update = async function(req, res){
    try {
        const result = await Solicitation_Person.update({ 
            name: req.body.name,
            bloodtype: req.body.bloodtype,
            description: req.body.description,
            picture: req.body.picture,
            city: req.body.city,
            hospital: req.body.hospital, 
        }, 
        {
            where: {
              id: req.body.id
            }
        });

        if (result == 1){
            res.status(200).json();    
        } else{
            res.status(404).json({ message: "Não existe solicitação com esse id."});    
        }

    } catch (error) {
        res.status(404).json({ message: error });
    }
}

SolicitationController.disable = async function(req, res){
    try {
        const person_id = req.params.id;

        const solicitation_id = await Solicitation.findOne({
            where: {
                solicitationPersonId: person_id
            }
          });

        const result = await Solicitation.update({ 
            status: "closed",
            closure_date: today.toUTCString()
        }, 
        {
            where: {
              id: solicitation_id.id
            }
        });

        res.status(200).json();           

    } catch (error) {
        res.status(404).json({ message: error });
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
            res.status(400).json({ message: 'user not found'});
            return;
        }

        if(user_donator.blood_type){
            const user_compatibilities = compatibily_map[user_donator.blood_type];
            console.log(user_compatibilities)

            const compatible_solicitations = await Solicitation_Person.findAll({
                where: {
                    city: city,
                    bloodtype: user_compatibilities
                }
            })
            res.status(200).json({compatible_solicitations});

        } else {
            const compatible_solicitations = await Solicitation_Person.findAll({
                where: {
                    city: city
                }
            })
            res.status(500).json({compatible_solicitations});
        }

    } catch (error) {
        res.status(400).json({ message: error})
    }
}

module.exports = SolicitationController;