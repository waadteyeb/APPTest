const controller = require("../controllers/spendings.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post("/spendings",controller.addspendings); //the route for posting spendings

    app.get("/spendings", controller.getspendings);  //the route for getting spendings

    app.get("/spendings/:id", controller.getspendingsbyid); //the route for getting spendings by id

    app.put("/spendings/:id", controller.updatespendings); //the route for updating spendings by id

    app.delete("/spendings/:id", controller.deletespendings); //the route for deleting spendings by id


  
   
  
    

  };
