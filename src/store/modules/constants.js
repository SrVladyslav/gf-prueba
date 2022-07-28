export const namespaced = true

export const state = {
    // Server
    // backend: "http://192.168.0.21:8000",
    backend: "https://gf-prod-backend.herokuapp.com",
    //backend: "http://172.20.10.2:8000",
    // RPCs
    rpc: "https://rpc-mumbai.matic.today",
    gfMainContractAddress: "0xC6deCD8B2237C4aD1Bb27748Af292343e88EE21D",
    gfEconomyContract: "0xd4BFd958D1855C1A4E4ab62086a9941926cEf202",
    // Managers
    gfAccountManagerContract: "0xb387725ec7b7C75B192c56234ac16C84Cf586eBe",
    gfCollectionManager: "0x707cf0A5AaF9D94Ad84b8eCC3756B01F8F1954d1",
    gfUtilityManager: "0x6E13EEde37847fee8017c4BbC7BBCfA189cCa4a0",
    gfImageMangaer: "0x21e7867b612F58059C5ebAA2a8F63afE29639a37",
    // Storage
    gfAccountStorage: "0x256412B23c0be4bb16D78D2bE87A97bE9d7a1881",
    gfCollectionStorage: "0x59648c3923f80a9472Fa23Cbb59C368d4610F0eF",
    gfUtilityStorage: "0xd6BaE2Dfb3B1E8AA235e5347931b76de8438C71C",
    // ABI
    gfMainContractABI: [{
            "inputs": [{
                    "internalType": "string",
                    "name": "_nickname",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_bio",
                    "type": "string"
                },
                {
                    "internalType": "string[]",
                    "name": "_favoriteThematics",
                    "type": "string[]"
                },
                {
                    "internalType": "bool",
                    "name": "_doCommissions",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "_analyticsStatus",
                    "type": "bool"
                }
            ],
            "name": "createNewAccount",
            "outputs": [{
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "bool",
                "name": "_resolution",
                "type": "bool"
            }],
            "name": "decideRequest",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "_coOwner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gfAccountManagerContract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gfCollectionManagerContract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gfUtilityManagerContract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gfEconomyContract",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }],
            "name": "GFMainContractUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": false,
                    "internalType": "bool",
                    "name": "resolution",
                    "type": "bool"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "GFMainContractsChangeRequestStatusChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "GFAnalyticsContract",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "GFEconomyContract",
                    "type": "address"
                }
            ],
            "name": "GFMainContractsChangeRequested",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "NewAccountCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "gfAccountManagerContract",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "gfCollectionManagerContract",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "gfUtilityManagerContract",
                    "type": "address"
                }
            ],
            "name": "NewManagereContractsUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "_GFAnalyticsContract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_GFEconomyContract",
                    "type": "address"
                }
            ],
            "name": "requestMainContractsChange",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_newImageManagerContract",
                "type": "address"
            }],
            "name": "setImageManagerContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "setMainContractsChange",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_newCashCreator",
                "type": "address"
            }],
            "name": "setNewCashCreator",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_socialNetworkCOntract",
                "type": "address"
            }],
            "name": "setSocialNetworkContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "_gfAccountManagerContract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gfCollectionManagerContract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gfUtilityManagerContract",
                    "type": "address"
                }
            ],
            "name": "updateManagerContracts",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "coOwner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getImageManagerContract",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "string",
                "name": "_type",
                "type": "string"
            }],
            "name": "getMainContract",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "string",
                "name": "_type",
                "type": "string"
            }],
            "name": "getManagerContract",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getNewGFMainContract",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getSocialNetworkContract",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "string",
                "name": "_type",
                "type": "string"
            }],
            "name": "getStorageContract",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "gfCashCreator",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "newGFMainContract",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    gfCollectionStorageABI: [{
            "inputs": [{
                    "internalType": "address",
                    "name": "_gfCollectionManagerContract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_coOwner",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": false,
                    "internalType": "address",
                    "name": "collection",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "collectionType",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "NewCollectionCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_newGenerator",
                "type": "address"
            }],
            "name": "addGeneratorToAllowanceList",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "_sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_newUserCollection",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_collectionType",
                    "type": "string"
                }
            ],
            "name": "addNewUserCollection",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "coOwner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }],
            "name": "getUserCollectionAmount",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_collectionID",
                    "type": "uint256"
                }
            ],
            "name": "getUserCollectionData",
            "outputs": [{
                    "internalType": "address",
                    "name": "collectionAddr",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "collectionType",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "createdAt",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_generatorToRemove",
                "type": "address"
            }],
            "name": "removeGeneratorFromAllowanceList",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_gfNewCollectionManagerContract",
                "type": "address"
            }],
            "name": "updateCollectionManagerContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    gfCollectionManagerABI: [{
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "newGeneratorAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "string",
                    "name": "generatorType",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "CollectionGeneratorRemoved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "newGeneratorAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "string",
                    "name": "generatorType",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "NewCollectionGeneratorAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [{
                    "internalType": "string",
                    "name": "_generatorType",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_newGFCollectionGeneratorContract",
                    "type": "address"
                }
            ],
            "name": "addNewGenerator",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCollectionTypes",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getGFContractTypes",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "_generatorID",
                "type": "uint256"
            }],
            "name": "getGenerator",
            "outputs": [{
                    "internalType": "string",
                    "name": "_generatorType",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_generatorAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "string",
                "name": "_type",
                "type": "string"
            }],
            "name": "getGeneratorByType",
            "outputs": [{
                    "internalType": "string",
                    "name": "_generatorType",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_generatorAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "_generatorID",
                "type": "uint256"
            }],
            "name": "removeGenerator",
            "outputs": [{
                    "internalType": "string",
                    "name": "_type",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_generatorAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "_gfMainContract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gfCollectionStorageContract",
                    "type": "address"
                }
            ],
            "name": "setGFMainContracts",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "name": "typeExists",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "name": "typeToID",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    gfAccountStorageABI: [{
            "inputs": [{
                    "internalType": "address",
                    "name": "_gfAccountManagerContract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_coOwner",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "_newAccount",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_accountOwner",
                    "type": "address"
                }
            ],
            "name": "addNewAccount",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_newGFAccountManagerContract",
                "type": "address"
            }],
            "name": "changeAccountManagerContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "coOwner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "_accountID",
                "type": "uint256"
            }],
            "name": "getAccountByID",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }],
            "name": "getAccountOwner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }],
            "name": "getIDOfAccount",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }],
            "name": "getUserAccount",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "gfAccountManagerContract",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }],
            "name": "isGFAccount",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}