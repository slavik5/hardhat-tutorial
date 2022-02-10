const hre = require("hardhat");

async function main() {
  
  const Donations = await hre.ethers.getContractFactory("Donations");

  const hardhatDonations = await Donations.deploy();
  await hardhatDonations.deployed();

  console.log("Donation deployed to:", hardhatDonations.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
