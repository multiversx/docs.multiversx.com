---
id: crowdfunding-p1
title: The Crowdfunding Smart Contract (part 1)
---

Write, build and deploy a simple smart contract written in Rust

This tutorial will guide you through the process of writing, building and deploying a very simple smart contract for the Elrond Network, written in Rust.

:::important
The Elrond Network supports smart contracts written in any programming language, but they must be compiled to WebAssembly.
:::

:::important
The current tutorial revolves around **elrond-wasm-rs** version **0.25.0**, and will get updated as new versions of elrond-wasm are released.
:::

# **Introduction**

Let's say you need to raise EGLD for a cause that you believe in. They will obviously be well spent, but you need to get the EGLD first. For this reason, you decided to run a crowdfunding campaign on the Elrond Network, which naturally means that you'll use a smart contract for the campaign. This tutorial will teach you how to do just that: write a crowdfunding smart contract, how to deploy it and how to use it.

The idea is simple: the smart contract will accept transfers until a deadline is reached, and it will keep track of all the people who sent EGLD.

If the deadline is reached and the smart contract has gathered an amount of EGLD above the desired funds, then the smart contract will consider the crowdfunding a success, and it will consequently send all the EGLD to a predetermined account (you!).

But if the total amount of EGLD is lower than the desired target, all the donated EGLD must be sent back to the people who donated.

# **Design**

Here's how the smart contract is designed:

- It will have an `init` method, which is automatically executed upon deployment. This method must receive from you the information on (1) the target amount of EGLD and (2) the crowdfunding deadline, expressed as a block nonce.
- It will have a `fund` method, which people will call to send money to the smart contract. This method will receive the EGLD and will have to save all the information needed to return the EGLD in case the campaign does not reach the target.
- It will have a `claim` method. If anyone calls this method _before_ the deadline, it will do nothing and return an error. But if called _after_ the deadline, it will do one of the following:
  - When you call it, and the target amount has been reached, it will send all the EGLD to you. If the amount has not been reached, it will do nothing and return an error.
  - When one of the donors calls it, and the target amount has been reached, it will do nothing and return an error. But if the amount has not been reached (the campaign failed), then the smart contract will send the correct amount of EGLD back to the donor.
  - When anyone else calls it, the method will do nothing and will return an error.
- It will have a `status` method, which will return information about the campaign, such as whether the campaign is ongoing or it has ended, and how much EGLD has been donated so far. You will probably call this method often, out of impatience.

Four methods, then: `init`, `fund`, `claim` and `status`.

This tutorial will firstly focus on the `init` method, to get you acquainted with the development process and tools. You will implement `init` and also _write unit tests_ for it.

:::note testing
Automated testing is exceptionally important for the development of smart contracts, due to the sensitive nature of the information they must handle.
:::

# **Prerequisites**

The best way to build on Elrond is using our [VS Code IDE](https://marketplace.visualstudio.com/items?itemName=Elrond.vscode-elrond-ide), which you should install before proceeding.

Elrond IDE is an extension for Visual Studio Code that offers development support for Elrond Smart Contracts.

Elrond IDE supports the following programming languages:

- Rust - recommended. For Rust, the IDE also provides a step-by-step debugging experience, via elrond-wasm-debug and CodeLLDB.
- C / C++

Follow the video guide for a detailed explanation about how to get started.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/bXbBfJCRVqE?playlist=bXbBfJCRVqE&loop=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The steps are covered in detail below.

# **Step 1: the workspace**

The source code of each smart contract requires its own folder. You'll need to create one for the crowdfunding smart contract presented here. Run these commands below in a terminal to create it:

```
mkdir -p ~/Elrond/SmartContracts
cd ~/Elrond/SmartContracts
erdpy contract new crowdfunding --template adder
code crowdfunding
```

You may choose any location you want for your smart contract. The above is just an example. Either way, now that you are in the folder dedicated to the smart contract, we can begin.

Straight away you get a project that works - `erdpy` created your project out of a template. These templates are contracts written and tested by Elrond, which can be used by anybody as starting points. The `adder` template is pretty much the simplest contract you can imagine.

The last line also opens the new project in a new VS Code instance.

Let's have a quick look around the project.

Open `Cargo.toml` in the text editor of your choice:

```
Cargo.toml
[package]
name = "crowdfunding"
version = "0.0.0"
authors = [ "you",]
edition = "2018"
publish = false

[lib]
path = "src/adder.rs"

[dependencies.elrond-wasm]
version = "0.25.0"

[dev-dependencies.elrond-wasm-debug]
version = "0.25.0"
```

Let's see what this means:

- The package is unsurprisingly named `crowdfunding`, and has the version `0.0.0`. You can set any version you like, just make sure it has 3 numbers separated by dots. It's a requirement. <b> For now let's just set it to `0.0.1`. </b>
- This package has dependencies. It will require other packages. Since you're writing a Rust smart contract for the Elrond Network, you'll need a special and very helpful package, developed by Elrond.
- The file `src/adder.rs` will contain the source code of the smart contract, and that is what the `[lib]` section is declaring.
- The resulting binary will be named `crowdfunding` (actually, `crowdfunding.wasm`, but the compiler will add the `.wasm` part)
- The resulting binary will be produced by compiling `src/adder.rs`.

# **Step 2: the code**

With the structure in place, you can now write the code and build it. Open `src/adder.rs` , remove the existing `Adder` code and insert the following:

```Rust
src/adder.rs
#![no_std]

elrond_wasm::imports!();

#[elrond_wasm::contract]
pub trait Crowdfunding {

    #[init]
    fn init(&self) {
    }
}
```

Let's take a look at the code. The first three lines declare some characteristics of the code. You don't need to understand them (just skip ahead if you will), but here are some explanations:

- `#![no_std]` means that the smart contract **has no access to standard libraries**. That might sound restrictive, but the trade-off is that the code will be lean and very light. It is entirely possible to create a smart contract with the standard libraries, but that would add a lot of overhead, and is not recommended. Definitely not needed for the Crowdfunding smart contract.

### **Bring in the framework**

The 3rd line contains the command `elrond_wasm::imports!();`. This command imports the dependencies we mentioned when we discussed the `Cargo.toml` file. It effectively grants you access to the Elrond framework for Rust smart contracts, which is designed to simplify the code enormously.

The framework itself is a topic for another day, but you should be aware that smart contracts written in Rust aren't normally this simple. It's the framework that does the heavy lifting, so that your code stays clean and readable. Line 5 is your first contact with the framework:

```Rust
#[elrond_wasm::contract]
```

This line simply tells the framework to treat the next `trait` declaration (we'll get to it in a moment) as a smart contract. Because of this line, the framework will _automatically generate_ much of the code required. You won't see the generated code now (but you can).

### **Make it a trait**

Your smart contract effectively starts at line 9. We could have gotten here quicker, but you wanted to know what the code means, and it took a little while to explain. We're finally here, though. Let's look at the code again:

```Rust
src/adder.rs (revisited)
#![no_std]

elrond_wasm::imports!();

#[elrond_wasm::contract]
pub trait Crowdfunding {

    #[init]
    fn init(&self) {
    }
}
```

It helps to know what a trait is in Rust, before continuing (the [Rust book explains it well](https://doc.rust-lang.org/book/ch10-02-traits.html)).

For now, you only need to remember that you write your smart contract as the `trait Crowdfunding`.

### **Init**

Every smart contract must define a constructor method, which is run _once and only once_, upon deployment on the network. You can name it any way you wish, but it must be annotated with `#[init]` . The Crowdfunding smart contract needs to store some initial configuration, which will be read during subsequent calls to the other methods (these other methods are `fund`, `claim` and `status`, to refresh your memory).

The `init` method of the Crowdfunding smart contract is currently empty. We'll add the actual code later. First, you want to build the whole project, to make sure everything has worked well so far, even if the smart contract does nothing right now.

# **Step 3: the build**

After creating the file `src/adder.rs` with the content described in [the previous step](/developers/tutorials/crowdfunding-p1#step-2-the-code), you can issue the first build command. Make sure you save the file first.

Now go back to the terminal, make sure the current folder is the one containing the Crowdfunding smart contract (use `pwd` for that), then issue the build command:

```
erdpy contract build
```

If this is the first time you build a Rust smart contract with the `erdpy` command, it will take a little while before it's done. Subsequent builds will be much faster.

When the command completes, a new folder will appear: `output`. This folder now contains two files: `crowdfunding.abi.json` and `crowdfunding.wasm`. We won't be doing anything with these files just yet - wait until we get to the deployment part. Along with `output`, there are a few other folders and files generated. You can safely ignore them for now, but do not delete the `wasm` folder - it's what makes the build command faster after the initial run.

The following can be safely deleted, as they are not important for this contract:

- the `testnet.toml` and `elrond.json` files
- the `tests` folder
- the `interaction` folder

The structure of your folder should be like this (output printed by the command `tree -L 2`):

```
.
├── Cargo.toml
├── mandos
│   └── adder.scen.json
├── meta
│   ├── Cargo.lock
│   ├── Cargo.toml
│   ├── src
│   └── target
├── output
│   ├── crowdfunding.abi.json
│   └── crowdfunding.wasm
├── README.md
├── src
│   └── adder.rs
├── wallets
│   ├── observers
│   ├── users
│   └── validators
└── wasm
    ├── Cargo.lock
    ├── Cargo.toml
    ├── src
    └── target

```

It's time to add some functionality to the `init` function now, because the next step will take you through a very important process: testing your smart contract.

# **Step 4: the test**

In this step you will use the `init` method to persist some values in the storage of the Crowdfunding smart contract. Afterwards, we will write a test to make sure that these values were properly stored.

### **Storage setters, storage getters**

Every smart contract is allowed to store key-value pairs into a persistent structure, created for the smart contract at the moment of its deployment on the Elrond Network.

The storage of a smart contract is, for all intents and purposes, a generic hash map or dictionary. When you want to store some arbitrary value, you store it under a specific key. To get the value back, you need to know the key you stored it under.

To help you with keeping the code clean, the framework enables you to write setter and getter methods for individual key-value pairs. Here is a setter method and a getter method, dedicated to storing / retrieving the value stored under the key `owner`:

```Rust
#[storage_set("owner")]
fn set_owner(&self, address: &ManagedAddress);

#[storage_get("owner")]
fn get_owner(&self) -> ManagedAddress;
```

The methods above treat the stored value as having a specific **type**, namely the type `ManagedAddress`. Under the hood, `ManagedAddress` resolves to `[u8; 32]`, which effectively means "an array of exactly 32 bytes".

Normally, smart contract developers are used to dealing with raw bytes when storing or loading values from storage. The Elrond framework for Rust smart contracts makes it far easier to manage the storage, because it can handle typed values automatically. Just wait until we get to automatic serialization of complex structures.

### **Remember me, I made you**

You will now instruct the `init` method to store your address as the owner of this smart contract, upon deployment.

The owner of a smart contract is the account which deployed it (you). By design, your Crowdfunding smart contract will send all the donated EGLD to its owner (you), assuming the target amount was reached. Nobody else has this privilege, because there is only one single owner of any given smart contract.

Here's how the `init` method looks like, with the code that saves the address of the owner (guess who):

```Rust
#![no_std]

elrond_wasm::imports!();

#[elrond_wasm::contract]
pub trait Crowdfunding {

    #[storage_set("owner")]
    fn set_owner(&self, address: &ManagedAddress);

    #[view]
    #[storage_get("owner")]
    fn get_owner(&self) -> ManagedAddress;

    #[init]
    fn init(&self) {
        let my_address: ManagedAddress = self.blockchain().get_caller();
        self.set_owner(&my_address);
    }
}
```

The code above adds the methods `set_owner` and `get_owner`, which are marked as "storage setter" and "storage getter" respectively, for the key `owner`.

Moreover, the `init` method now calls an API method: `self.blockchain().get_caller();`. As mentioned earlier, the `init` method is called only once, during the deployment of the smart contract. This API method always returns the address of whomever calls the current smart contract method.

But because the deployment is defined by the Elrond protocol as a transaction containing a call to a special system smart contract, it means that when called during `init`, the `self.blockchain().get_caller();` method returns the address of whom is deploying the smart contract, i.e. the owner, so you.

We assign the address returned by `self.blockchain().get_caller();` to the `my_address` local variable, and then we pass this variable to our storage setter `self.set_owner()`, which will save it to the storage under the key `owner`.

Whenever you want to make sure your code is in order, run the build command:

```
erdpy contract build
```

There's one more thing: by default, none of the `fn` statements declare smart contract methods which are _externally callable_. All the data in the contract is publicly available, but it can be cumbersome to search through the contract storage manually. That is why it is often nice to make getters public, so people can call them to get specific data out. Public methods are annotated with either `#[endpoint]` or `#[view]`. There is currently no difference in functionality between them (but there might be at some point in the future). Semantically, `#[view]` indicates readonly methods, while `#[endpoint]` suggests that the method also changes the contract state. You can also think of `#[init]` as a special type of endpoint.

```Rust
    #[view]
    #[storage_get("owner")]
    fn get_owner(&self) -> ManagedAddress;
```

Note that since `set_owner()` has no endpoint annotation, nobody can call the `set_owner()` method from the outside. Only the smart contract itself may call it, so only the smart contract decides who its "owner" is, upon deployment.

### **But will you remember?**

You must always make sure that the code you write functions as intended. That's what automatic testing is for.

Let's write a test against the `init` method, and make sure that it definitely stores the address of the owner under the `owner` key, at deployment.

To test `init`, you will write a JSON file which describes what to do with the smart contract and what is the expected output. In the folder of the Crowdfunding smart contract, there is a folder called `mandos`. Inside it, there is a file called `adder.scen.json`. Rename that file to`test-init.scen.json` ( `scen` is short for "scenario").

Your folder should look like this (output from the command `tree -L 2`):

```
.
├── Cargo.toml
├── mandos
│   └── test-init.scen.json
├── meta
│   ├── Cargo.lock
│   ├── Cargo.toml
│   ├── src
│   └── target
├── output
│   ├── crowdfunding.abi.json
│   └── crowdfunding.wasm
├── README.md
├── src
│   └── adder.rs
├── wallets
│   ├── observers
│   ├── users
│   └── validators
└── wasm
    ├── Cargo.lock
    ├── Cargo.toml
    ├── src
    └── target

```

Let's define the first test scenario. Open the file `mandos/test-init.scen.json` in your favorite text editor and replace its contents with the following code. It might look like a lot, but we'll go over every bit of it, and it's not really that complicated.

```
{
    "name": "crowdfunding deployment test",
    "steps": [
      {
        "step": "setState",
        "accounts": {
          "address:my_address": {
            "nonce": "0",
            "balance": "1,000,000"
          }
        },
        "newAddresses": [
          {
            "creatorAddress": "address:my_address",
            "creatorNonce": "0",
            "newAddress": "sc:crowdfunding_contract"
          }
        ]
      },
      {
        "step": "scDeploy",
        "tx": {
          "from": "address:my_address",
          "contractCode": "file:../output/crowdfunding.wasm",
          "value": "0",
          "gasLimit": "1,000,000",
          "gasPrice": "0"
        },
        "expect": {
          "status": "0",
          "gas": "*",
          "refund": "*"
        }
      },
      {
        "step": "checkState",
        "accounts": {
          "address:my_address": {
            "nonce": "1",
            "balance": "1,000,000"
          },
          "sc:crowdfunding_contract": {
            "nonce": "0",
            "balance": "0",
            "storage": {
              "''owner": "address:my_address"
            },
            "code": "file:../output/crowdfunding.wasm"
          }
        }
      }
    ]
  }
```

Save the file. Do you want to try it out first? Go ahead and issue this command on your terminal:

```
erdpy contract test
```

If everything went well, you should see an all-capitals, loud `SUCCESS` being printed, like this:

```
Scenario: test-init.scen.json ...   ok
Done. Passed: 1. Failed: 0. Skipped: 0.
SUCCESS
```

You need to understand the contents of this JSON file - again, the importance of testing your smart contracts cannot be overstated.

### **So what just happened?**

You ran a testing command which interpreted a JSON scenario. Line number 2 contains the name of this scenario, namely `crowdfunding deployment test`. This test was executed in an isolated environment, which contains the Arwen WASM VM and a simulated blockchain. It's as close to the real Elrond Network as you can get — save from running your own local testnet, of course, but you don't need to think about that right now.

A scenario has steps, which will be executed in the sequence they appear in the JSON file. Observe on line 3 that the field `steps` is a JSON list, containing three scenario steps.

Looking at the JSON file, you may be tempted to assume that the meaning of `"step": "setState"` is simply to give a name to the scenario step. That is incorrect, because `"step": "setState"` means that the _type_ of this step is `setState`, i.e. to prepare the state of the testing environment for the following scenario steps.

The same goes for `"step": "scDeploy"`, which is a scenario step that performs the deployment of a SmartContract. As you probably guessed, the last scenario step has the type `checkState`: it describes your expectations about the testing environment, after running the previous scenario steps.

The following subsections will discuss each of the steps individually.

## **Scenario step "setState"**

### **You're you, but in a different universe**

The first scenario step begins by declaring the accounts that exist in the fictional universe in which the Crowdfunding smart contract will be tested.

There is only one account defined - the one that will perform the deployment during the test. The smart contract will believe that it is owned by this account. In the JSON file, you wrote:

```
"accounts": {
  "address:my_address": {
    "nonce": "0",
    "balance": "1,000,000"
  }
},

```

This defines the account with the address `my_address`, which the testing framework will use to pretend it's you. Note that in this fictional universe, your account nonce is `0` (meaning you've never used this account yet) and your `balance` is `1,000,000` (that's a lot of EGLD).

Note that there are is the text `address:`at the beginning of `my_address`, which instructs the testing framework to treat the immediately following string as a 32-byte address (by also adding the necessary padding to reach the required length), i.e. it shouldn't try to decode it as a hexadecimal number or anything else. All addresses in the JSON file above are defined with leading `address:`. Smart Contract addresses are defined with leading `sc:`.

### **Imaginary address generator**

Immediately after the `accounts`, the first scenario step contains the following block:

```
"newAddresses": [
  {
    "creatorAddress": "address:my_address",
    "creatorNonce": "0",
    "newAddress": "sc:the_crowdfunding_contract"
  }
]
```

In short, this block instructs the testing framework to pretend that the address to be generated for the first (nonce `0`) deployment attempted by `my_address` must be the address`the_crowdfunding_contract`.

Makes sense, doesn't it? If you didn't write this, the testing framework would have deployed the Crowdfunding smart contract at some auto-generated address, which we wouldn't be informed of, so we couldn't interact with the smart contract in the subsequent scenario steps.

But with the configured `newAddresses` generator, we know that every run of the test will deploy the smart contract at the address `the_crowdfunding_contract`.

While it's not important to know right now, the `newAddresses` generator can be configured to produce fixed addresses for multiple smart contract deployments and even for multiple addresses that perform the deployment!

## **Scenario step "scDeploy"**

The next scenario step defined by the JSON file instructs the testing framework to perform the deployment itself. Observe:

```
"tx": {
  "from": "address:my_address",
  "contractCode": "file:../output/crowdfunding.wasm",
  "value": "0",
  "gasLimit": "1,000,000",
  "gasPrice": "0"
},
```

This describes a deployment transaction. It was fictionally submitted by "you", using your account with the address `my_address`.

This deployment transaction contains the WASM bytecode of the Crowdfunding smart contract, which is read at runtime from the file `output/crowdfunding.wasm`.

Remember to run `erdpy contract build` before running the test, especially if you made recent changes to the smart contract source code! The WASM bytecode will be read directly from the file you specify here, without rebuilding it automatically.

"You" also sent exactly `value: 0` EGLD out of the `1,000,000` to the deployed smart contract. It wouldn't need them anyway, because your Crowdfunding smart contract won't be transferring any EGLD to anyone, unless they donate it first.

The fields `gasLimit` and `gasPrice` shouldn't concern you too much. It's important that `gasLimit` needs to be high, and `gasPrice` may be 0. Just so you know, the real Elrond Network would calculate the transaction fee from these values. On the real Elrond Network, you cannot set a `gasPrice` of 0, for obvious reasons.

### **The result of the deployment**

Once the testing framework executes the deployment transaction described above, you have the opportunity to assert its successful completion:

```
"expect": {
  "status": "0",
  "gas": "*",
  "refund": "*"
}
```

The only important field here is `"status": "0"`, which is the actual return code coming from the Arwen VM after it executed the deployment transaction. `0` means success, of course.

The remaining two fields `gas` and `refund` allow you to specify how much gas you expect the deployment transaction to consume, and how much EGLD you'd receive back as a result of overestimating the `gasLimit`. These are both set to `"*"` here, meaning that we don't care right now about their actual values.

## **Scenario step "checkState"**

The final scenario step mirrors the first scenario step. There's an `accounts` field again, but with more content:

```
"accounts": {
  "address:my_address": {
    "nonce": "1",
    "balance": "1,000,000"
  },
  "sc:the_crowdfunding_contract": {
    "code": "file:../output/crowdfunding.wasm",
    "nonce": "0",
    "balance": "0",
    "storage": {
      "''owner": "address:my_address"
    }
  }
}
```

Notice that there are two accounts now, not just one. There's evidently the account `my_address`, which we knew it existed, after defining it ourselves in the first scenario step. But a new account appeared, `the_crowdfunding_contract`, as a result of the deployment transaction executed in the second scenario step. This is because smart contracts _are_ accounts in the Elrond Network, accounts with associated code, which can be executed when transactions are sent to them.

The account `my_address` now has the nonce `1`, because a transaction has been executed, sent from it. Its balance remains unchanged - the deployment transaction did not cost anything, because the `gasPrice` field was set to `0` in the second scenario step. This is only allowed in tests, of course.

The account `the_crowdfunding_contract` is the Crowdfunding smart contract. We assert that it contains the bytecode specified by the file `output/crowdfunding.wasm` (path relative to the JSON file). We also assert that its `nonce` is `0`, which means that the contract itself has never deployed a "child" contract of its own (which is technically possible). The `balance` of the smart contract account is `0`, because it didn't receive any EGLD as part of the deployment transaction, nor did we specify any scenario steps that transfer EGLD to it (we'll do that soon).

And finally, we assert that the smart contract storage contains `my_address` under the `owner` key, which is what the `init` function was supposed to make sure. The smart contract has, therefore, remembered you.

# **Next up**

The tutorial will continue with the definition of the `fund`, `claim` and `status` function, and will guide you through writing JSON test scenarios for them.
