let express = require('express'),
  moment = require('moment'),
  router = express.Router()

api = {
    getVersion : getVersion
};

function getVersion(req, res){
    res.status(200).json({version:'1.0.0'})
}

router.get('/', api.getVersion)

module.exports = router