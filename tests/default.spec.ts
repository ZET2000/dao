import { Blockchain, SandboxContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MasterDAO } from '../dist/tact_MasterDAO';
import '@ton/test-utils';

describe('MasterDAO', () => {
    let blockchain: Blockchain;
    let masterContract: SandboxContract<MasterDAO>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        const deployer = await blockchain.treasury('deployer');
        const treasury = await blockchain.treasury('treasury');

        masterContract = blockchain.openContract(
            await MasterDAO.fromInit(
                deployer.address,
                treasury.address
            )
        );

        const deployResult = await masterContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            "TopUp"
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: masterContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        expect(masterContract.address).toBeDefined();
    });
});