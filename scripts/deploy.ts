import { ethers } from 'hardhat';
import { getAbi } from "../utils/getAbi";
import fs from "fs"

async function main() {
  const personaToken = await ethers.deployContract('PersonaToken');

  await personaToken.waitForDeployment();

  console.log('---------------------------------------------');
  console.log(`personaToken with deployed to ${personaToken.target}`);
  console.log('---------------------------------------------');

  console.log('------------------Updating Frontend---------------------');
  const abi = getAbi('PersonaToken');
  fs.writeFileSync(
    '../personatokens/constants/smart-contracts.ts',
    `export const personaTokenAddress = "${personaToken.target}";
    export const personaTokenABI = ${JSON.stringify(abi)}`
  );
  console.log('---------------------------Done-------------------------------');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
