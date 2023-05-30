// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "./ FarmNft.sol";
import "hardhat/console.sol";

contract AssetTokenization {
    address[] public farmers; //farmer address
    mapping(address => FarmNft) farmerToNftContract; // Relate farmer' address to Farmer's NFT

    struct nftContractDetail {
        address farmerAddress;
        string farmerName;
        string description;
        uint256 totalMint;
        uint256 availableMint;
        uint256 price;
        uint256 expirationDate;
    }

    function availableContract(address _farmer) public view returns (bool) {
        return address(farmerToNftContract[_farmer]) != address(0);
    }

    function addFarmer(address newFarmer) internal {
        for (uint i = 0; i < farmers.length; i++) {
            if (newFarmer == farmers[i]) {
                return;
            }
        }
        farmers.push(newFarmer);
    }

    function generateNftContract(
        string memory _farmerName,
        string memory _description,
        uint256 _totalMint,
        uint256 _price,
        uint256 _expirataionDate
    ) public {
        address farmerAddress = msg.sender;

        require(
            availableContract(farmerAddress) == false,
            "Your token is already deployed"
        );

        addFarmer(farmerAddress);

        FarmNft newNft = new FarmNft(
            farmerAddress,
            _farmerName,
            _description,
            _totalMint,
            _price,
            _expirataionDate
        );

        farmerToNftContract[farmerAddress] = newNft;
    }
}
