const fs = require("fs")
let { networkConfig } = require("../helper-hardhat-config")

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()

    log("Starting the deploy")
    const nft = await deploy("nft", {
        from: deployer,
        log: true
    })
    log("You have deployed an NFT contract to " + nft.address)
    let filepath = "./img/circle.svg"
    let svg = fs.readFileSync(filepath, { encoding: "utf-8" })

    const NFTContract = await ethers.getContractFactory("nft")
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const svgNFT = new ethers.Contract(nft.address, NFTContract.interface, signer)
    const networkName = networkConfig[chainId]['name']
    log("Verify with \nnpx hardhat verify --network " + networkName + " " + svgNFT.address)

    let transactionResponse = await svgNFT.create(svg)
    let receipt = await transactionResponse.wait(1)
    log("tokenURI: " + await (svgNFT.tokenURI(0)))
}