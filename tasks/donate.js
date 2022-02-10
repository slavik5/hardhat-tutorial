const {task} = require("hardhat/config");
require ("@nomiclabs/hardhat-waffle");


task("donate", "donate amount from user")
    .addParam("from", "from which account")
    .addParam("amount", "amount to donate")
    .setAction(async function (taskArgs, hre) {

        const network = hre.network.name;

        console.log(network);
        
        const [...addr] = await hre.ethers.getSigners();
    
        const donation = await hre.ethers.getContractAt("Donations", process.env.DONATION_CONTRACT);
        
        await donation.connect(addr[taskArgs.from]).donate({value:taskArgs.amount});

        console.log('donate task Done!');
    });
task("withdraw", "donate amount from user")
    .addParam("to", "to which account")
    .addParam("amount", "amount to withdraw")
    .setAction(async function (taskArgs, hre) {

        const network = hre.network.name;

        console.log(network);
        
        const donation = await hre.ethers.getContractAt("Donations", process.env.DONATION_CONTRACT);
        
        await donation.withdraw(taskArgs.to,taskArgs.amount);
        console.log(' task Done!');
    });
task("donationBalance", "user`s donations")
    .addParam("add", "user`s address")
    .setAction(async function (taskArgs, hre) {

        const network = hre.network.name;

        console.log(network);
        
        const donation = await hre.ethers.getContractAt("Donations", process.env.DONATION_CONTRACT);
        
        const balance=await donation.donationBalance(taskArgs.add);
        console.log(balance);

    });
task("donatorsList", "list of donators")
    .setAction(async function (taskArgs, hre) {

        const network = hre.network.name;

        console.log(network);
        
        const donation = await hre.ethers.getContractAt("Donations", process.env.DONATION_CONTRACT);
        
        const list=await donation.donatorsList();
        console.log(list);
    });

