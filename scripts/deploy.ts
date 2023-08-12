import { ethers } from 'hardhat';
import { getAbi } from "../utils/getAbi";
import fs from "fs"

async function main() {
  const personaToken = await ethers.deployContract('PersonaToken');
  const NFTMarketplace = await ethers.deployContract('NFTMarketplace');

  await personaToken.waitForDeployment();
  await NFTMarketplace.waitForDeployment();

  console.log('---------------------------------------------');
  console.log(`personaToken with deployed to ${personaToken.target}`);
  console.log('---------------------------------------------');
  console.log('---------------------------------------------');
  console.log(`NFTMarketplace with deployed to ${NFTMarketplace.target}`);
  console.log('---------------------------------------------');

  console.log('------------------Updating Frontend---------------------');
  const tokenAbi = getAbi('PersonaToken');
  const marketplaceAbi = getAbi('NFTMarketplace');
  fs.writeFileSync(
    '../personatokens/constants/smart-contracts.ts',
    `
    export const personaTokenAddress = "${personaToken.target}}";
    export const NFTMarketplaceAddress = "${NFTMarketplace.target}";
    export const personaTokenABI = ${JSON.stringify(tokenAbi)};
    export const NFTMarketplaceABI = ${JSON.stringify(marketplaceAbi)};
    `
  );
  console.log('---------------------------Done-------------------------------');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
