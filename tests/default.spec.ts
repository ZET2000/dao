import { Blockchain, SandboxContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MasterDAO } from '../dist/tact_MasterDAO';
import '@ton/test-utils';

describe('MasterDAO', () => {
let blockchain: Blockchain;
let masterContract: SandboxContract<MasterDAO>;

beforeEach(async () => {
    blockchain = await Blockchain.create();

    masterContract = blockchain.openContract(await MasterDAO.fromInit());

    const deployer = await blockchain.treasury('deployer');

    const deployResult = await masterContract.send(
        deployer.getSender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    expect(deployResult.transactions).toHaveTransaction({
        from: deployer.address,
        to: masterContract.address,
        deploy: true,
        success: true,
    });
});

it('should deploy', async () => {
    // the check is done inside beforeEach
    // blockchain and blankContract are ready to use
});
});
