import { ethers } from "hardhat";

async function deploy() {
  // get account address that deploy contract
  const [deployer] = await ethers.getSigners();

  // deploy AssetTokenization contract
  const AssetTokenization = await ethers.getContractFactory(
    "AssetTokenization"
  );
  const assetTokenization = await AssetTokenization.deploy();
  await assetTokenization.deployed();

  console.log("assetTokenization address: ", assetTokenization.address);
  console.log("account address that deploy contract: ", deployer.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
