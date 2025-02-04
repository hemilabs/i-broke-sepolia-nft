//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract IBrokeSepoliaNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    string public baseTokenURI;
    
    constructor(string memory baseURI, string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {
        setBaseURI(baseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function tokenURI(uint256 tokenId) override public view virtual returns (string memory) {
        _requireOwned(tokenId);
        
        return _baseURI();
    }

    function mintNFT(address _owner) public onlyOwner {
        uint newTokenID = _tokenIds.current();
        _safeMint(_owner, newTokenID);
        _tokenIds.increment();
    }
    
    // Returns the ids of the NFTs owned by the wallet address
    function tokensOfOwner(address _owner) external view returns (uint[] memory) {
        uint tokenCount = balanceOf(_owner);
        uint[] memory tokensId = new uint256[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }
}


