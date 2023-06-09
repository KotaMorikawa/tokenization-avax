import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { BigNumber, Overrides } from "ethers";
import { ethers } from "hardhat";

describe("Asset-Tokenization", function () {
  const oneWeekInSecond = 60 * 60 * 24 * 7;

  async function deployContract() {
    const accounts = await ethers.getSigners();

    const AssetTokenization = await ethers.getContractFactory(
      "AssetTokenization"
    );
    const assetTokenization = await AssetTokenization.deploy();

    return {
      deployAccount: accounts[0],
      userAccounts: accounts.slice(1, accounts.length),
      assetTokenization,
    };
  }

  describe("basic", function () {
    it("generate NFT contract and check details", async function () {
      const { userAccounts, assetTokenization } = await loadFixture(
        deployContract
      );

      const farmerName = "farmer";
      const description = "description";
      const totalMint = BigNumber.from(5);
      const price = BigNumber.from(100);
      const expirationDate = BigNumber.from(Date.now())
        .div(1000)
        .add(oneWeekInSecond);

      const farmer1 = userAccounts[0];
      const farmer2 = userAccounts[1];

      await assetTokenization
        .connect(farmer1)
        .generateNftContract(
          farmerName,
          description,
          totalMint,
          price,
          expirationDate
        );

      await assetTokenization
        .connect(farmer2)
        .generateNftContract(
          farmerName,
          description,
          totalMint,
          price,
          expirationDate
        );

      const details1 = await assetTokenization.getNftContractDetails(
        farmer1.address
      );
      expect(details1.farmerAddress).to.equal(farmer1.address);
      expect(details1.farmerName).to.equal(farmerName);
      expect(details1.description).to.equal(description);
      expect(details1.totalMint).to.equal(totalMint);
      expect(details1.availableMint).to.equal(totalMint);
      expect(details1.price).to.equal(price);
      expect(details1.expirationDate).to.equal(expirationDate);

      const details2 = await assetTokenization.getNftContractDetails(
        farmer2.address
      );
      expect(details2.farmerAddress).to.equal(farmer2.address);
      expect(details2.farmerName).to.equal(farmerName);
      expect(details2.description).to.equal(description);
      expect(details2.totalMint).to.equal(totalMint);
      expect(details2.availableMint).to.equal(totalMint);
      expect(details2.price).to.equal(price);
      expect(details2.expirationDate).to.equal(expirationDate);
    });
  });

  describe("buyNFT", function () {
    it("balance should be change", async function () {
      const { userAccounts, assetTokenization } = await loadFixture(
        deployContract
      );

      const farmerName = "farmer";
      const description = "description";
      const totalMint = BigNumber.from(5);
      const price = BigNumber.from(100);
      const expirationDate = BigNumber.from(Date.now())
        .div(1000)
        .add(oneWeekInSecond);

      const farmer = userAccounts[0];
      const buyer = userAccounts[1];

      await assetTokenization
        .connect(farmer)
        .generateNftContract(
          farmerName,
          description,
          totalMint,
          price,
          expirationDate
        );

      await expect(
        assetTokenization
          .connect(buyer)
          .buyNft(farmer.address, { value: price } as Overrides)
      ).to.changeEtherBalances([farmer, buyer], [price, -price]);
    });
  });

  describe("upkeep", function () {
    it("checkUpkeep and performUpkeep", async function () {
      const { userAccounts, assetTokenization } = await loadFixture(
        deployContract
      );

      // parameter
      const farmer = userAccounts[0];
      const farmerName = "farmer";
      const description = "description";
      const totalMint = BigNumber.from(5);
      const price = BigNumber.from(100);
      const expirationDate = BigNumber.from(Date.now())
        .div(1000)
        .add(oneWeekInSecond);

      // deploy nft contract
      await assetTokenization
        .connect(farmer)
        .generateNftContract(
          farmerName,
          description,
          totalMint,
          price,
          expirationDate
        );

      const [return1] = await assetTokenization.checkUpkeep("0x00");

      // return false because expired NFT is nothing now
      expect(return1).to.equal(false);

      // Change the timestamp of the blockchain (generate a block containing a timestamp 1s after the expiration date) so that the nft contract expires
      await time.increaseTo(expirationDate.add(1));

      const [return2] = await assetTokenization.checkUpkeep("0x00");

      // return true because there is expired NFT
      expect(return2).to.equal(true);

      await assetTokenization.performUpkeep("0x00");

      //　Unable to retrieve contract details for the expired NFT.
      await expect(assetTokenization.getNftContractDetails(farmer.address)).to
        .be.reverted;
    });
  });
});
