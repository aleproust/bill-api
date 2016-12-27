// Module dependencie
let express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Bear = require('../../models/Bear/bear').Bear;
  mongoose.Promise = Promise;
  api = {
    getBears : getBears,
    postBears: postBears,
    putBears: putBears
  };



// GET Bears
function getBears(req, res) {
  let name = req.params.name;

  Bear.findOne({
    'name': name,
  })
  .then(bear =>  {
    res.status(200).json(bear)})
  .catch(err => res.status(404).json(err))

}

// ADD Bears
function postBears(req, res) {

  let bear = new Bear();
  bear.name = req.params.name;
  bear.data = req.body;
  bear.save()
  .then(bear => res.status(201).json(bear.toObject()))
  .catch(err =>res.status(500).json(err))

};

// Put bears
function putBears(req, res) {
  var name = req.params.name;
  Configuration.findOneAndUpdate({
    "name": name
  },
    {
      "$set": {
        "data": req.body
      }
    },
    {
      "new": true
    }).then(bear=> res.status(200).json(bear.data))
      .catch(err =>res.status(404).json(err))
}

router.get('/:name', api.getBears);
router.post('/:name', api.postBears);
router.put('/:name', api.putBears);
module.exports = router;
