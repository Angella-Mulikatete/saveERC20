import { ethers } from "hardhat";

async function main() {
    const web3CXITokenAddress = "0x625B284f8CDD5D90CbC0Ee517870b6EBaD7c076D";
    const web3CXI = await ethers.getContractAt("IERC20", web3CXITokenAddress);

    const saveERC20ContractAddress = "0x115639e3f0d4A4419E69D303e36e1683217bA444";
    const saveERC20 = await ethers.getContractAt("ISaveERC20", saveERC20ContractAddress);

    // Approve savings contract to spend token
    const approvalAmount = ethers.parseUnits("1000", 18);

    const approveTx = await web3CXI.approve(saveERC20, approvalAmount);
    approveTx.wait();

    const contractBalanceBeforeDeposit = await saveERC20.getContractBalance();
    console.log("Contract balance before :::", contractBalanceBeforeDeposit);

    const depositAmount = ethers.parseUnits("150", 18);
    const depositTx = await saveERC20.deposit(depositAmount);

    console.log(depositTx);

    depositTx.wait();

    const contractBalanceAfterDeposit = await saveERC20.getContractBalance();

    console.log("Contract balance after :::", contractBalanceAfterDeposit);



    // Withdrawal Interaction

    const contractBalanceBeforeWithdrawal = await saveERC20.myBalance();
    console.log("Contract balance before :::", contractBalanceBeforeWithdrawal);

    const withdrawAmount = ethers.parseUnits("10", 18);
    const withdrawTx = await saveERC20.withdraw(withdrawAmount);

    console.log(withdrawTx);
    withdrawTx.wait();

    const contractBalanceAfterWithdrawal = await saveERC20.myBalance();
    console.log("Contract balance after :::", contractBalanceAfterWithdrawal);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
