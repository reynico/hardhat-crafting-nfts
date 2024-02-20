// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "base64-sol/base64.sol";

contract nftV2 is ERC721URIStorage {
    uint256 public tokenCounter;
    event CreateNFT(uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("Random Circles", "CIRCLES") {
        tokenCounter = 0;
    }

    string[] private colors = [
        "Red",
        "Green",
        "Blue",
        "Yellow",
        "Magenta",
        "Cyan",
        "Purple",
        "Orange",
        "DarkGreen",
        "Black",
        "Maroon",
        "Teal",
        "Pink",
        "LightYellow",
        "DarkPurple",
        "Tomato",
        "Khaki",
        "DarkViolet",
        "RoyalBlue",
        "Salmon"
    ];

    function create() public {
        string
            memory baseSvg = "<svg height='100' width='100' xmlns='http://www.w3.org/2000/svg'><circle r='45' cx='50' cy='50' stroke='black' stroke-width='3' fill='";
        for (uint i = 0; i < colors.length; i++) {
            string memory svg = string(
                abi.encodePacked(baseSvg, colors[i], "' /></svg>")
            );
            _safeMint(msg.sender, tokenCounter);
            string memory imageURI = svgToURI(svg);
            string memory tokenURI = formatTokenURI(imageURI, colors[i]);
            _setTokenURI(tokenCounter, tokenURI);
            tokenCounter = tokenCounter + 1;
            emit CreateNFT(tokenCounter, tokenURI);
        }
    }

    function svgToURI(string memory _svg) public pure returns (string memory) {
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(
            bytes(string(abi.encodePacked(_svg)))
        );
        string memory imageURI = string(
            abi.encodePacked(baseURL, svgBase64Encoded)
        );
        return imageURI;
    }

    function formatTokenURI(
        string memory _imageURI,
        string memory color
    ) public pure returns (string memory) {
        string memory baseURL = "data:application/json;base64,";
        return
            string(
                abi.encodePacked(
                    baseURL,
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name": "',
                                color,
                                ' Random Circle",',
                                '"description": "Random Circles collection",',
                                '"attributes": "",',
                                '"image": "',
                                _imageURI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }
}
