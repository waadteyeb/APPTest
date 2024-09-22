const db = require("../models");
const spendings = db.spendings;
const { Op } = require('sequelize');

// for creating new spending entry
exports.addspendings = (req, res) => {
    const { userid, count, type, model } = req.body;
    if (!userid || !count || !type || !model) {
      return res.status(400).send({
        message: "Missing required fields"
      });
    }
    // Save spendings to Database
    spendings.create({
      id:req.body.id,
      userid: req.body.userid,
      count: req.body.count,
      type: req.body.type,
      model: req.body.model,
    })
    .then(spendings => {
        res.send(spendings);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };


//for fetching all spending records with optional filters
exports.getspendings = (req, res) => {
    const { userid, type, model, startdate, enddate } = req.query;
    
    let query = {};
    
    if (userid) {
      query.userid = userid;
    }
    
    if (type) {
      query.type = type;
    }
    
    if (model) {
      query.model = model;
    }
    
    if (startdate) {
      query.createdAt = {
          ...(query.createdAt || {}),
          [Op.gte]: new Date(startdate) // Greater than or equal to startdate
      };
  }
  
  
  if (enddate) {
      query.createdAt = {
          ...(query.createdAt || {}),
          [Op.lte]: new Date(enddate) // Less than or equal to enddate
      };
  }
    
   
    spendings.findAll({ where: query })
      .then(spendings => {
        if (spendings.length === 0) {
          return res.status(404).send({
            message: "No spendings found matching the filters."
          });
        }
        res.send(spendings);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

//for fetching spendings by id
exports.getspendingsbyid = (req, res) => {
    //find spendings by id
   spendings.findOne({
        where: {
            id: req.params.id
        }
      })
        .then(spendings => {
          if (!spendings) {
            return res.status(404).send({ message: "no spendings matching that id" });
          }
          else{
            
    
            res.status(200).json(spendings);
          }
    
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
  }; 

//for updating spendings by id
exports.updatespendings = (req, res) => {
    const { id } = req.params;
    const { userid, count, type,model} = req.body;
  
    Car.findOne({
      where: {
          id: id,
      },
    })
      .then((spendings) => {
        if (!spendings) {
          return res.status(404).json({ message: "spendings not found !" });
        }
  
        // Update spendings data with new values
        
        spendings.userid = userid || spendings.userid;
        spendings.count = count || spendings.count;
        spendings.type = type || spendings.type;
        spendings.model = model || spendings.model;
        
  
        // Save the updated spendings data
        spendings
          .save()
          .then(() => {
            res.status(200).json({ message: "spendings updated successfully!" });
          })
          .catch((err) => {
            
            res.status(500).json({ message: "error !" });
          });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  };  

// for deleting spendings by id 
exports.deletespendings = (req, res) => {
    spendings.findOne({
      where: {
        id: req.params.id
      }
    })
     .then(spendings => {
       if (!spendings ) {
         return res.status(404).send({ message: "spendings not found" });
       }
       else{
        spendings.destroy();
  
        res.status(204).json({ message: "spendings deleted successfully !" });
       }
  
     })
     .catch(err => {
       res.status(500).send({ message: err.message });
     });
  }; 