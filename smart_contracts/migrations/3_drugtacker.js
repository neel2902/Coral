const drugTracker = artifacts.require("drug_tracker");

module.exports = function (deployer) {
    deployer.deploy(drugTracker);
};
