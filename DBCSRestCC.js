/**
 * The ExpressJS namespace.
 * @external ExpressApplicationObject
 * @see {@link http://expressjs.com/3x/api.html#app}
 */ 

 // Reference component shell
 var shell = require('./shell')();
/**
 * Mobile Cloud custom code service entry point.
 * @param {external:ExpressApplicationObject}
 * service 
 */
module.exports = function(service) {

	service.get('/mobile/custom/DBCSRestCC/components', function(req,res) {
	    res.set('Content-Type', 'application/json')
	       .status(200)
	       .json(shell.getAllComponentMetadata());
	});

	service.post('/mobile/custom/DBCSRestCC/components/:componentName', function(req,res) {
		const componentName = req.params.componentName;
	    shell.invokeComponentByName(req.params.componentName, req.body, {'mobileSdk': req.oracleMobile}, function(err, data) {
	        if (!err) {
	            res.status(200).json(data);
	        }
	        else {
	            switch (err.name) {
	                case 'unknownComponent':
	                    res.status(404).send(err.message);
	                    break;
	                case 'badRequest':
	                    res.status(400).json(err.details);
	                    break;
	                default:
	                    res.status(500).json(err.details);
	                    break;
	            }
	        }
	    });
	});

};
