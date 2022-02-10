const { expect } = require("chai");


describe("Donations contract", function () 
{
  let owner;
  let Donations;
  let addr1;
  let addr2;
  let hardhatDonations;
  beforeEach(async function () 
  {
    [owner, addr1,addr2] = await ethers.getSigners();

    Donations = await ethers.getContractFactory("Donations");

    hardhatDonations = await Donations.deploy();
    
  });
  
  describe("donate", function () {
    it("Should donate tokens on owner account", async function () {
      
      await hardhatDonations.connect(addr1).donate({value:10});      
      
      expect(await hardhatDonations.donationBalance(addr1.address)).to.equal(10);
        
    });
    it("fail if sender`s donate=0", async function () {
      await expect(hardhatDonations.connect(addr1).donate({value:0})).to.be.revertedWith('zero donate');
    });
    
  });

  describe("withdraw", function () {
    it("fail if sender not owner", async function () {
      await expect(hardhatDonations.connect(addr1).withdraw(addr2.address,10))
      .to.be.revertedWith('Not owner')
    });

    it("fail if not enough money", async function () {
      
      await expect(hardhatDonations.withdraw(addr1.address,10)).to.be.revertedWith("not enough money"); 
        
    });

    it("should withdraw tokens from owner", async function () {
      await hardhatDonations.connect(addr2).donate({value:10});      

     
      await expect(await hardhatDonations.withdraw(addr2.address, 10)).to.changeEtherBalance(addr2, 10);
      
    });
  });
  describe("donatorsList", function ()  {
    it("Should return donatorsList", async function () {
      await hardhatDonations.connect(addr2).donate({value:10}); 
      await hardhatDonations.connect(addr2).donate({value:5}); 
      const list=await hardhatDonations.donatorsList();
      
      
      expect (list.length).to.be.equal(1);
  
    });
  }); 
});