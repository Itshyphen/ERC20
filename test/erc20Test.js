const { expect } = require("chai");
const { ethers } = require("hardhat");

let erc20;
let accounts;

describe("ERC20", function () {

  this.beforeEach(async function () {
    accounts = await ethers.getSigners();
    owner = accounts[0];

    const ERC20 = await ethers.getContractFactory("ERC20Token");
     erc20 = await ERC20.deploy(1000, "ERC20Tokens", "ERC20");
    await erc20.deployed();

  })

  it("Successfully deployed contract", async function () {
    expect(await erc20.balanceOf(owner.address)).to.equal(1000);

  });
  
  it("Mint 1000 tokens to some address and check balance to be 1000", async function () {
    await erc20.mint(accounts[2].address,1000)
    expect(await erc20.balanceOf(accounts[2].address)).to.equal(1000);

  });

  it("MInt 1000 tokens, burn 100 tokens from some address and check balance to be 900", async function () {
    await erc20.mint(accounts[2].address,1000)
    expect(await erc20.balanceOf(accounts[2].address)).to.equal(1000);

    await erc20.connect(accounts[2]).burn(100)
    expect(await erc20.balanceOf(accounts[2].address)).to.equal(900);

  });

  it("Mint 1000 tokens, transfer 100 tokens to some address and check balance to be 900 and 100", async function () {
    await erc20.mint(accounts[2].address,1000)
    expect(await erc20.balanceOf(accounts[2].address)).to.equal(1000);

    await erc20.connect(accounts[2]).transferTokens(accounts[1].address,100)
    expect(await erc20.balanceOf(accounts[2].address)).to.equal(900);
    expect(await erc20.balanceOf(accounts[1].address)).to.equal(100);


  });

  it("Mint 1000 tokens, give approval to another account and transfer from that account to some address and check balance to be 900 and 100", async function () {
    await erc20.mint(accounts[2].address,1000)
    expect(await erc20.balanceOf(accounts[2].address)).to.equal(1000);

    await erc20.connect(accounts[2]).approve(accounts[3].address,100)

    await erc20.connect(accounts[3]).transferFrom(accounts[2].address, accounts[1].address,100)
    expect(await erc20.balanceOf(accounts[2].address)).to.equal(900);
    expect(await erc20.balanceOf(accounts[1].address)).to.equal(100);


  });

});
