// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FarmNft is ERC721 {
    address public farmerAddress; // farmer's address deployed contract
    string public farmerName; // farmer's name
    string public description; // NFT's explanation
    uint256 public totalMint; // total amount of NFT that can be minted
    uint256 public availableMint; // amount of remaining NFT that can currently be minted
    uint256 public price; // NFT's price
    uint256 public expirationDate; // NFT's expiration date

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds; // NFT's id that will be minted next time

    constructor(
        address _farmerAddress,
        string memory _farmerName,
        string memory _description,
        uint256 _totalMint,
        uint256 _price,
        uint256 _expirationDate
    ) ERC721("Farm NFT", "FARM") {
        farmerAddress = _farmerAddress;
        farmerName = _farmerName;
        description = _description;
        totalMint = _totalMint;
        availableMint = _totalMint;
        price = _price;
        expirationDate = _expirationDate;
    }

    function mintNFT(address to) public payable {
        require(availableMint > 0, "Not enough nft");
        require(isExpired() == false, "Already expired");
        require(msg.value == price);

        uint256 newItemId = _tokenIds.current();
        _safeMint(to, newItemId);
        _tokenIds.increment();
        availableMint--;

        (bool success, ) = farmerAddress.call{value: msg.value}("");
        require(success, "Failed to withdraw AVAX");
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        name(),
                        " -- NFT #: ",
                        Strings.toString(_tokenId),
                        '", "description": "',
                        description,
                        '", "image": "',
                        "https://i.imgur.com/GZCdtXu.jpg",
                        '"}'
                    )
                )
            )
        );
        string memory output = string(
            abi.encodePacked("data:application/json;base64", json)
        );
        return output;
    }

    function isExpired() public view returns (bool) {
        if (block.timestamp > expirationDate) {
            return true;
        } else {
            return false;
        }
    }

    function burnNFT() public {
        require(isExpired(), "still available");
        for (uint256 id = 0; id < _tokenIds.current(); id++) {
            _burn(id);
        }
    }

    function getTokenOwners() public view returns (address[] memory) {
        address[] memory owners = new address[](_tokenIds.current());
        for (uint256 index = 0; index < _tokenIds.current(); index++) {
            owners[index] = ownerOf(index);
        }
        return owners;
    }
}
