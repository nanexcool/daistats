"""
Execute with:
   brownie run --network mainnet tokenlist > makerdao.tokenlist.json

Semantic versioning:
    Lists include a version field, which follows semantic versioning.
    List versions must follow the rules:
        Increment major version when tokens are removed
        Increment minor version when tokens are added
        Increment patch version when tokens already on the list have minor details changed (name, symbol, logo URL, decimals)
    Changing a token address or chain ID is considered both a remove and an add, and should be a major version update.

Schema:
    https://uniswap.org/tokenlist.schema.json

TODO:
    project logo 256x256
    other tags
    keywords
    uni lp token logos
        "A URI to the token logo asset; if not set, interface will attempt to
        find a logo based on the token address; suggest SVG or PNG of size
        64x64"
    extension values pip, join, flip, CR
    Add SAI, MKR-OLD?

"""
import os, json, datetime

from brownie import Contract

ILK_REGISTRY = '0x8b4ce5DCbb01e0e1f0521cd8dCfb31B308E52c24'
DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
MKR = '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2'

TOKEN_LOGO_URI = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/%s/logo.png'

tl = {
    "name": "MakerDAO",
    "timestamp": datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S+00:00'),
    "version": {
        "major": 0,
        "minor": 1,
        "patch": 0
    },
    #logoURI is optional
    # 	"A URI for the logo of the token list; prefer SVG or PNG of size 256x256"
    # FIXME this is 600x600
    "logoURI": "https://makerdao-forum-backup.s3.dualstack.us-east-1.amazonaws.com/original/1X/68e5b859631b8f66624f5880acb8c189a32aee64.png",
    "keywords": [  #optional
        "MakerDAO", "Maker", "DAO", "DAI", "MKR", "Stablecoin", "Collateral", "DeFi"
    ],
    "tags": { #optional
        "stablecoin": {
            "name": "Stablecoin",
            "description": "Tokens that are fixed to an external asset, e.g. the US dollar"
        },
        "lp": {
            "name": "Uniswap LP Token",
            "description": "Tokens that represent a stake in a Uniswap pool"
        }
    },
    "tokens": [
        {
            "chainId": 1,
            "address": DAI,
            "symbol": "DAI",
            "name": "Dai Stablecoin",
            "decimals": 18,
            "logoURI": TOKEN_LOGO_URI % DAI,
            "tags": [
                "stablecoin"
            ]
        },
        {
            "chainId": 1,
            "address": MKR,
            "symbol": "MKR",
            "name": "Maker",
            "decimals": 18,
            "logoURI": TOKEN_LOGO_URI % MKR,
        }
    ]
}

def main():
    abif = 'contracts/%s.json' % ILK_REGISTRY
    if os.path.exists(abif):
        c = Contract.from_abi('IlkRegistry', ILK_REGISTRY, json.load(open(abif, 'r')))
    else:
        c = Contract.from_explorer(ILK_REGISTRY)

    names = set()
    for i in c.list():
        symbol = c.symbol(i)
        gem = c.gem(i)
        tags = []
        if symbol in ['DAI', 'USDC', 'TUSD', 'USDT', 'PAX', 'GUSD']:
            tags.append('stablecoin')
        if symbol == 'UNI-V2':
            tags.append('lp')
            uniLp = Contract.from_explorer(gem)
            token0 = Contract.from_explorer(uniLp.token0())
            token1 = Contract.from_explorer(uniLp.token1())
            name = f'Uniswap V2 {token0.symbol()}/{token1.symbol()} LP'
            symbol = f'UNI-V2-{token0.symbol()}-{token1.symbol()}'
        else:
            name = c.name(i)

        if name not in names:
            names.add(name)
            m = {
                "chainId": 1,
                "address": gem,
                "symbol": symbol, # max 20 chars
                "name": name, # max 40 chars
                "decimals": c.dec(i)
                }
            if not symbol.startswith('UNI-V2'):
                m["logoURI"] = (TOKEN_LOGO_URI % gem) #optional
            if tags:
                m["tags"] = tags #optional
            tl['tokens'].append(m)

    print(json.dumps(tl, indent=4))

