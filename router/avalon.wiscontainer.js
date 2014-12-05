define(["avalon",  "text!./avalon.wiscontainer.html", "css!./avalon.wiscontainer.css"], function(avalon, template){

    var widget = avalon.ui.wiscontainer = function (element, data, vmodels) {

        var options = data.wiscontainerOptions;
        options.template = options.getTemplate(template, options);
        var win = avalon.parseHTML(options.template).lastChild;

        var vmodel = avalon.define(data.wiscontainerId, function(vm){
            avalon.mix(vm, options);
            var inited, id = +(new Date());
            vm.widgetElement = element;
            vm.$skipArray = ["widgetElement", "template"];
            vm.$uid = id;
            vm.title = "";

            vm.$init = function (continueScan) {
                if(inited) return;
                inited = true;
                vmodel.template = vmodel.template.replace(/\{\{MS_COMBOX_ID\}\}/g, id)

                element.innerHTML = vmodel.template;
                if(continueScan){
                    continueScan();
                }
            }

            vm.load = function(controller, title){
                vmodel.title = title;
                var selfcontainer = element.lastChild.children[1];
                require([controller+"/avalon."+controller], function(){
                    selfcontainer.innerHTML = "<div><div>";
                    avalon(selfcontainer.children[0]).attr("ms-widget", controller);
                    avalon.scan(selfcontainer.children[0], vmodel);
                });

            }


        });

        return vmodel;
    }

    widget.defaults = {
        getTemplate: function(tmpl, opts, tplName) {
            return tmpl
        }
    }
});