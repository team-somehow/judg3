# Flow CLI Commands

```bash
flow accounts add-contract ./cadence/contracts/Counter.cdc --network=testnet --signer=default
```

## Output

```bash
Contract created on the account 'ee884352e5d52524' with transaction ID a504af106fb7699204b7b17e6f21e38a877da112944866efe76dfe4ba504e417.

If you would like to fund the account with 1000 FLOW tokens for testing, visit https://testnet-faucet.onflow.org/fund-account?address=ee884352e5d52524

Address  0xee884352e5d52524
Balance  1000.00198779
Keys     1

Key 0   Public Key               ba0e417ef36f3cdf7b000cf2ae4f8b9729dcbb2a0d7f43e433daac587d1fe8b6f3383536acbc20aae6aedd26000d50b7ff8f5aec8aa893728111dfd436989f0b
        Weight                   1000
        Signature Algorithm      ECDSA_P256
        Hash Algorithm           SHA3_256
        Revoked                  false
        Sequence Number          4
        Index                    0

Contracts Deployed: 2
Contract: 'Counter'
Contract: 'VotingSystem'


Contracts (hidden, use --include contracts)

```

## Update Contract

```bash
flow accounts update-contract ./cadence/contracts/Counter.cdc --network=testnet --signer=default
```
