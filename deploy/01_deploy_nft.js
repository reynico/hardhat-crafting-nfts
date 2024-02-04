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
}