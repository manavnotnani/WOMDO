// Imports
const ethers = await import("hardhat");

// ABI encoding
const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
  ["uint256[]"],
  [[1, 2, 3, 4, 5]]
);

// return the encoded data as Uint8Array
return ethers.getBytes(encoded);
