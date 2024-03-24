import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
import { pinata } from 'frog/hubs'
import { serveStatic } from 'frog/serve-static'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

const abi = [
  {
    type: 'constructor',
    name: '',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      {
        type: 'address',
        name: 'account',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'operator',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'bool',
        name: 'approved',
        indexed: false,
        internalType: 'bool',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BatchMetadataUpdate',
    inputs: [
      {
        type: 'uint256',
        name: '_fromTokenId',
        indexed: false,
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: '_toTokenId',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DefaultRoyalty',
    inputs: [
      {
        type: 'address',
        name: 'newRoyaltyRecipient',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'newRoyaltyBps',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'EIP712DomainChanged',
    inputs: [],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FlatPlatformFeeUpdated',
    inputs: [
      {
        type: 'address',
        name: 'platformFeeRecipient',
        indexed: false,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'flatFee',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        type: 'uint8',
        name: 'version',
        indexed: false,
        internalType: 'uint8',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MetadataFrozen',
    inputs: [],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MetadataUpdate',
    inputs: [
      {
        type: 'uint256',
        name: '_tokenId',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnerUpdated',
    inputs: [
      {
        type: 'address',
        name: 'prevOwner',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'newOwner',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PlatformFeeInfoUpdated',
    inputs: [
      {
        type: 'address',
        name: 'platformFeeRecipient',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'platformFeeBps',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PlatformFeeTypeUpdated',
    inputs: [
      {
        type: 'uint8',
        name: 'feeType',
        indexed: false,
        internalType: 'enum IPlatformFee.PlatformFeeType',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PrimarySaleRecipientUpdated',
    inputs: [
      {
        type: 'address',
        name: 'recipient',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleAdminChanged',
    inputs: [
      {
        type: 'bytes32',
        name: 'role',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        type: 'bytes32',
        name: 'previousAdminRole',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        type: 'bytes32',
        name: 'newAdminRole',
        indexed: true,
        internalType: 'bytes32',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleGranted',
    inputs: [
      {
        type: 'bytes32',
        name: 'role',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: 'account',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'sender',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleRevoked',
    inputs: [
      {
        type: 'bytes32',
        name: 'role',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: 'account',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'sender',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoyaltyForToken',
    inputs: [
      {
        type: 'uint256',
        name: 'tokenId',
        indexed: true,
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: 'royaltyRecipient',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'royaltyBps',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TokensMinted',
    inputs: [
      {
        type: 'address',
        name: 'mintedTo',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'tokenIdMinted',
        indexed: true,
        internalType: 'uint256',
      },
      {
        type: 'string',
        name: 'uri',
        indexed: false,
        internalType: 'string',
      },
      {
        type: 'uint256',
        name: 'quantityMinted',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TokensMintedWithSignature',
    inputs: [
      {
        type: 'address',
        name: 'signer',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'mintedTo',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'tokenIdMinted',
        indexed: true,
        internalType: 'uint256',
      },
      {
        type: 'tuple',
        name: 'mintRequest',
        components: [
          {
            type: 'address',
            name: 'to',
            internalType: 'address',
          },
          {
            type: 'address',
            name: 'royaltyRecipient',
            internalType: 'address',
          },
          {
            type: 'uint256',
            name: 'royaltyBps',
            internalType: 'uint256',
          },
          {
            type: 'address',
            name: 'primarySaleRecipient',
            internalType: 'address',
          },
          {
            type: 'uint256',
            name: 'tokenId',
            internalType: 'uint256',
          },
          {
            type: 'string',
            name: 'uri',
            internalType: 'string',
          },
          {
            type: 'uint256',
            name: 'quantity',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'pricePerToken',
            internalType: 'uint256',
          },
          {
            type: 'address',
            name: 'currency',
            internalType: 'address',
          },
          {
            type: 'uint128',
            name: 'validityStartTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'validityEndTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'bytes32',
            name: 'uid',
            internalType: 'bytes32',
          },
        ],
        indexed: false,
        internalType: 'struct ITokenERC1155.MintRequest',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TransferBatch',
    inputs: [
      {
        type: 'address',
        name: 'operator',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'from',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'to',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256[]',
        name: 'ids',
        indexed: false,
        internalType: 'uint256[]',
      },
      {
        type: 'uint256[]',
        name: 'values',
        indexed: false,
        internalType: 'uint256[]',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TransferSingle',
    inputs: [
      {
        type: 'address',
        name: 'operator',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'from',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'to',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'id',
        indexed: false,
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: 'value',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'URI',
    inputs: [
      {
        type: 'string',
        name: 'value',
        indexed: false,
        internalType: 'string',
      },
      {
        type: 'uint256',
        name: 'id',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'function',
    name: 'DEFAULT_ADMIN_ROLE',
    inputs: [],
    outputs: [
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'id',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'balanceOfBatch',
    inputs: [
      {
        type: 'address[]',
        name: 'accounts',
        internalType: 'address[]',
      },
      {
        type: 'uint256[]',
        name: 'ids',
        internalType: 'uint256[]',
      },
    ],
    outputs: [
      {
        type: 'uint256[]',
        name: '',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'burn',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'id',
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: 'value',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'burnBatch',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
      {
        type: 'uint256[]',
        name: 'ids',
        internalType: 'uint256[]',
      },
      {
        type: 'uint256[]',
        name: 'values',
        internalType: 'uint256[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'contractType',
    inputs: [],
    outputs: [
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'contractURI',
    inputs: [],
    outputs: [
      {
        type: 'string',
        name: '',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'contractVersion',
    inputs: [],
    outputs: [
      {
        type: 'uint8',
        name: '',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'eip712Domain',
    inputs: [],
    outputs: [
      {
        type: 'bytes1',
        name: 'fields',
        internalType: 'bytes1',
      },
      {
        type: 'string',
        name: 'name',
        internalType: 'string',
      },
      {
        type: 'string',
        name: 'version',
        internalType: 'string',
      },
      {
        type: 'uint256',
        name: 'chainId',
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: 'verifyingContract',
        internalType: 'address',
      },
      {
        type: 'bytes32',
        name: 'salt',
        internalType: 'bytes32',
      },
      {
        type: 'uint256[]',
        name: 'extensions',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'freezeMetadata',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getDefaultRoyaltyInfo',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
      {
        type: 'uint16',
        name: '',
        internalType: 'uint16',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getFlatPlatformFeeInfo',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPlatformFeeInfo',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
      {
        type: 'uint16',
        name: '',
        internalType: 'uint16',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPlatformFeeType',
    inputs: [],
    outputs: [
      {
        type: 'uint8',
        name: '',
        internalType: 'enum IPlatformFee.PlatformFeeType',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoleAdmin',
    inputs: [
      {
        type: 'bytes32',
        name: 'role',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoleMember',
    inputs: [
      {
        type: 'bytes32',
        name: 'role',
        internalType: 'bytes32',
      },
      {
        type: 'uint256',
        name: 'index',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoleMemberCount',
    inputs: [
      {
        type: 'bytes32',
        name: 'role',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoyaltyInfoForToken',
    inputs: [
      {
        type: 'uint256',
        name: '_tokenId',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
      {
        type: 'uint16',
        name: '',
        internalType: 'uint16',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'grantRole',
    inputs: [
      {
        type: 'bytes32',
        name: 'role',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'hasRole',
    inputs: [
      {
        type: 'bytes32',
        name: 'role',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        type: 'address',
        name: '_defaultAdmin',
        internalType: 'address',
      },
      {
        type: 'string',
        name: '_name',
        internalType: 'string',
      },
      {
        type: 'string',
        name: '_symbol',
        internalType: 'string',
      },
      {
        type: 'string',
        name: '_contractURI',
        internalType: 'string',
      },
      {
        type: 'address[]',
        name: '_trustedForwarders',
        internalType: 'address[]',
      },
      {
        type: 'address',
        name: '_primarySaleRecipient',
        internalType: 'address',
      },
      {
        type: 'address',
        name: '_royaltyRecipient',
        internalType: 'address',
      },
      {
        type: 'uint128',
        name: '_royaltyBps',
        internalType: 'uint128',
      },
      {
        type: 'uint128',
        name: '_platformFeeBps',
        internalType: 'uint128',
      },
      {
        type: 'address',
        name: '_platformFeeRecipient',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'operator',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isTrustedForwarder',
    inputs: [
      {
        type: 'address',
        name: 'forwarder',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mintTo',
    inputs: [
      {
        type: 'address',
        name: '_to',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '_tokenId',
        internalType: 'uint256',
      },
      {
        type: 'string',
        name: '_uri',
        internalType: 'string',
      },
      {
        type: 'uint256',
        name: '_amount',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'mintWithSignature',
    inputs: [
      {
        type: 'tuple',
        name: '_req',
        components: [
          {
            type: 'address',
            name: 'to',
            internalType: 'address',
          },
          {
            type: 'address',
            name: 'royaltyRecipient',
            internalType: 'address',
          },
          {
            type: 'uint256',
            name: 'royaltyBps',
            internalType: 'uint256',
          },
          {
            type: 'address',
            name: 'primarySaleRecipient',
            internalType: 'address',
          },
          {
            type: 'uint256',
            name: 'tokenId',
            internalType: 'uint256',
          },
          {
            type: 'string',
            name: 'uri',
            internalType: 'string',
          },
          {
            type: 'uint256',
            name: 'quantity',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'pricePerToken',
            internalType: 'uint256',
          },
          {
            type: 'address',
            name: 'currency',
            internalType: 'address',
          },
          {
            type: 'uint128',
            name: 'validityStartTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'validityEndTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'bytes32',
            name: 'uid',
            internalType: 'bytes32',
          },
        ],
        internalType: 'struct ITokenERC1155.MintRequest',
      },
      {
        type: 'bytes',
        name: '_signature',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'multicall',
    inputs: [
      {
        type: 'bytes[]',
        name: 'data',
        internalType: 'bytes[]',
      },
    ],
    outputs: [
      {
        type: 'bytes[]',
        name: 'results',
        internalType: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [
      {
        type: 'string',
        name: '',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nextTokenIdToMint',
    inputs: [],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'platformFeeRecipient',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'primarySaleRecipient',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceRole',
    inputs: [
      {
        type: 'bytes32',
        name: 'role',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'revokeRole',
    inputs: [
      {
        type: 'bytes32',
        name: 'role',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'royaltyInfo',
    inputs: [
      {
        type: 'uint256',
        name: 'tokenId',
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: 'salePrice',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'address',
        name: 'receiver',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'royaltyAmount',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'safeBatchTransferFrom',
    inputs: [
      {
        type: 'address',
        name: 'from',
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'to',
        internalType: 'address',
      },
      {
        type: 'uint256[]',
        name: 'ids',
        internalType: 'uint256[]',
      },
      {
        type: 'uint256[]',
        name: 'amounts',
        internalType: 'uint256[]',
      },
      {
        type: 'bytes',
        name: 'data',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      {
        type: 'address',
        name: 'from',
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'to',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'id',
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
      },
      {
        type: 'bytes',
        name: 'data',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'saleRecipientForToken',
    inputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    inputs: [
      {
        type: 'address',
        name: 'operator',
        internalType: 'address',
      },
      {
        type: 'bool',
        name: 'approved',
        internalType: 'bool',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setContractURI',
    inputs: [
      {
        type: 'string',
        name: '_uri',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setDefaultRoyaltyInfo',
    inputs: [
      {
        type: 'address',
        name: '_royaltyRecipient',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '_royaltyBps',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setFlatPlatformFeeInfo',
    inputs: [
      {
        type: 'address',
        name: '_platformFeeRecipient',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '_flatFee',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setOwner',
    inputs: [
      {
        type: 'address',
        name: '_newOwner',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPlatformFeeInfo',
    inputs: [
      {
        type: 'address',
        name: '_platformFeeRecipient',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '_platformFeeBps',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPlatformFeeType',
    inputs: [
      {
        type: 'uint8',
        name: '_feeType',
        internalType: 'enum IPlatformFee.PlatformFeeType',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPrimarySaleRecipient',
    inputs: [
      {
        type: 'address',
        name: '_saleRecipient',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setRoyaltyInfoForToken',
    inputs: [
      {
        type: 'uint256',
        name: '_tokenId',
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: '_recipient',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '_bps',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setTokenURI',
    inputs: [
      {
        type: 'uint256',
        name: '_tokenId',
        internalType: 'uint256',
      },
      {
        type: 'string',
        name: '_uri',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [
      {
        type: 'bytes4',
        name: 'interfaceId',
        internalType: 'bytes4',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [
      {
        type: 'string',
        name: '',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'uri',
    inputs: [
      {
        type: 'uint256',
        name: '_tokenId',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'string',
        name: '',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'uriFrozen',
    inputs: [],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'verify',
    inputs: [
      {
        type: 'tuple',
        name: '_req',
        components: [
          {
            type: 'address',
            name: 'to',
            internalType: 'address',
          },
          {
            type: 'address',
            name: 'royaltyRecipient',
            internalType: 'address',
          },
          {
            type: 'uint256',
            name: 'royaltyBps',
            internalType: 'uint256',
          },
          {
            type: 'address',
            name: 'primarySaleRecipient',
            internalType: 'address',
          },
          {
            type: 'uint256',
            name: 'tokenId',
            internalType: 'uint256',
          },
          {
            type: 'string',
            name: 'uri',
            internalType: 'string',
          },
          {
            type: 'uint256',
            name: 'quantity',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'pricePerToken',
            internalType: 'uint256',
          },
          {
            type: 'address',
            name: 'currency',
            internalType: 'address',
          },
          {
            type: 'uint128',
            name: 'validityStartTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'validityEndTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'bytes32',
            name: 'uid',
            internalType: 'bytes32',
          },
        ],
        internalType: 'struct ITokenERC1155.MintRequest',
      },
      {
        type: 'bytes',
        name: '_signature',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
] as const

export const app = new Frog({
  basePath: '/api',
  // Supply a Hub API URL to enable frame verification.
  hub: pinata(),
})

app.frame('/', (c) => {
  return c.res({
    action: '/finish',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Perform a transaction
      </div>
    ),
    intents: [
      <TextInput placeholder="Value (ETH)" />,
      <Button.Transaction target="/send-ether">Send Ether</Button.Transaction>,
      // <Button.Transaction target="/mint">Mint</Button.Transaction>,
    ],
  })
})

app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    ),
  })
})

app.transaction('/send-ether', (c) => {
  const { inputText } = c
  // Send transaction response.
  return c.send({
    chainId: 'eip155:84532',
    to: '0xf7e89E45502890381F9242403eA8661fad89Ca79',
    value: parseEther(inputText || '0'),
  })
})

app.transaction('/mint', (c) => {
  const { address } = c
  console.log('address', address)

  return c.contract({
    abi,
    functionName: 'mintTo',
    args: [address, 0n, '', 1n],
    // chainId: 'eip155:8453',
    chainId: 'eip155:84532',
    to: '0xf35b08E176da8178443dE6720817CA10e2408f9c',
  })
})

if (import.meta.env?.MODE === 'development') devtools(app, { serveStatic })
else devtools(app, { assetsPath: '/.frog' })

export const GET = handle(app)
export const POST = handle(app)
