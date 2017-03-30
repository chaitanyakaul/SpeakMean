module.exports = function (app,moduleModel) {
    app.post('/api/module', createModule);
    app.get('/api/module', findAllModules);
    app.get('/api/module/:moduleId', findModuleById);
    app.put('/api/module/:moduleId', updateModule);
    app.delete('/api/module/:moduleId', deleteModule);

    // var modules = [
    //     {_id: '123', name: 'Module 123', vocabulary: ['Word123-1', 'Word123-2', 'Word123-3', 'Word123-4'], topics: ['Topic 123-1', 'Topic 123-2', 'Topic 123-3', 'Topic 123-4']},
    //     {_id: '234', name: 'Module 234', vocabulary: [], topics: ['Topic 234-1', 'Topic 234-2', 'Topic 234-3', 'Topic 234-4']},
    //     {_id: '345', name: 'Module 345', vocabulary: ['Word345-1', 'Word345-2', 'Word345-3', 'Word345-4'], topics: ['Topic 345-1', 'Topic 345-2', 'Topic 345-3', 'Topic 345-4']},
    //     {_id: '456', name: 'Module 456', vocabulary: ['Word456-1', 'Word456-2', 'Word456-3', 'Word456-4'], topics: ['Topic 456-1', 'Topic 456-2', 'Topic 456-3', 'Topic 456-4']}
    // ];

    function createModule(req, res) {
        var module = req.body;
        moduleModel
            .createModule(module)
            .then(function (module) {
                console.log(module)
                res.json(module)
            },function (err) {
                res.send(err)
            })
        // module._id = (new Date()).getTime();
        // modules.push(module);
        // req.sendStatus(200);
    }

    function findAllModules(req, res) {
        moduleModel
            .findAllModules()
            .then(function (modules) {
                res.json(modules)
            },function (err) {
                res.send(err)
            })
    }

    function findModuleById(req, res) {
        var moduleId = req.params.moduleId;
        moduleModel
            .findModuleById(moduleId)
            .then(function (module) {
                if (module.length==0){
                    res.sendStatus(404).send('Module Not Found!')
                }else{
                    res.json(module)
                }
            },function (err) {
                res.send(err)
            })
        // var module = modules.filter(function(module){
        //     return module._id === moduleId;
        // });
        // console.log(module);
        // if (module) {
        //     res.json(module);
        //     console.log('found');
        //     console.log(module);
        //     return;
        // }
        // for(var i in modules) {
        //     var module = modules[i];
        //     if(moduleId === module._id) {
        //         res.json(module);
        //         return;
        //     }
        // }
        // res.sendStatus(404).send('Module not found');
    }

    function updateModule(req, res) {
        var moduleId = req.params.moduleId;
        var module = req.body;
        moduleModel
            .updateModule(moduleId,module)
            .then(function (status) {
                res.sendStatus(200)
            },function (err) {
                res.send(err)
            })
        // for(var i in modules) {
        //     if(moduleId === modules[i]._id) {
        //         modules[i] = module;
        //         res.json(modules[i]);
        //         return;
        //     }
        // }
        // res.sendStatus(404).send('Module not found');
    }

    function deleteModule(req, res) {
        var moduleId = req.params.moduleId;

        moduleModel
            .deleteModule(moduleId)
            .then(function (status) {
                res.sendStatus(200)
            },function (err) {
                res.sendStatus(404).send('Sorry Could not delete.')
                res.send(err)
            })
        // for(var i in modules) {
        //     var module = modules[i];
        //     if(moduleId === module._id) {
        //         modules.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404).send('Module not found');
    }
};