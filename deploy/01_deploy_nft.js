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
    const nft = await deploy("nftV2", {
        from: deployer,
        log: true
    })
    log("You have deployed an NFT contract to " + nft.address)

    const NFTContract = await ethers.getContractFactory("nftV2")
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const svgNFT = new ethers.Contract(nft.address, NFTContract.interface, signer)
    const networkName = networkConfig[chainId]['name']
    log("Verify with \nnpx hardhat verify --network " + networkName + " " + svgNFT.address)

    let transactionResponse = await svgNFT.create()
    let receipt = await transactionResponse.wait(1)
    let nftCount = receipt.events.filter(obj => obj.event === "CreateNFT").length;
    for (let i = 0; i < nftCount; i++) {
        log("tokenURI: " + await (svgNFT.tokenURI(i)))
    }
}