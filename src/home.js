define(function(require, exports, module) {
    function Home() {
        this.init.apply(this, arguments);
    }

    Home.prototype.init = function() {
        seajs.log('Home->init');
    }

    module.exports = new Home();
});
