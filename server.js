var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var FORM_COLLECTION = "main";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/game-on", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready!");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "success": true, "error": message });
}

// Generic response used by all endpoints.
var handleResponse = function (res, data, message) {
  res.status(200).json({
    "success": true,
    "data": data,
    "message": message
  });
}

app.get("/api/types", function (req, res) {
  db.collection(FORM_COLLECTION).distinct('type', function (err, data) {
    if (err) {
      return handleError(res, err.message, "Failed to get /" + type); return;
    } else {
      handleResponse(res, data);
    }
  });
});

/*  "/api/:type/:id?"
 *    GET: finds all documents form the requested type and/or id 
 *    POST: creates a new document for the given type
 */

app.get("/api/:type/:id?", function (req, res) {
  var type = req.params.type;
  var id = req.params.id;
  if (id) {
    try {
      var objID = new ObjectID(id);
      db.collection(FORM_COLLECTION).findOne({ _id: objID, "type": type }, function (err, data) {
        if (err) {
          return handleError(res, err.message, "Failed to get /" + type + "/" + id); return;
        } else {
          handleResponse(res, data);
        }
      });
    } catch (ex) {
      handleError(res, ex.message, "invalid parameter"); return;
    }
  } else {
    db.collection(FORM_COLLECTION).find({ "type": type }).toArray(function (err, data) {
      if (err) {
        return handleError(res, err.message, "Failed to get /" + type); return;
      } else {
        handleResponse(res, data);
      }
    });
  }
});

app.post("/api/forms", function (req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(FORM_COLLECTION).insertOne(newContact, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/forms/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/forms/:id", function (req, res) {
  db.collection(FORM_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/forms/:id", function (req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(FORM_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/forms/:id", function (req, res) {
  db.collection(FORM_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
