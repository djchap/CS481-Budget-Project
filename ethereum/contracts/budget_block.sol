pragma solidity ^0.5.7;
pragma experimental ABIEncoderV2;

contract Budget {
    
    address internal budgeter;
    uint256 public start;
    uint256 public end;
    
    struct Account {
        string name;
        uint goal;
        uint balance;
    }
    
    mapping(uint => Account) public accts;
    uint num_accts = 0;

    enum budget_state {
        STARTED
    }
    
    budget_state public STATE;
    
    modifier only_budgeter(){
        require(msg.sender == budgeter);
        _;
    }
    
    function deposit() public payable returns(string memory){}
    function make_budget(string memory, uint, uint) public returns(bool){}
    function see_progress() public returns(Account[] memory){}
    function collect_savings() public returns(bool){}
}

contract MyBudget is Budget {
    
    constructor () public {
        budgeter = msg.sender;
        start = now;
        end = start + 30 days;
        STATE=budget_state.STARTED;
    }
    
    function deposit() public payable returns(string memory){
        uint amt = msg.value;
        string memory deposit_response = "Good work! Keep saving!";
        
        // don't accept payments until budgets are created
        if (num_accts == 0) {
            msg.sender.transfer(amt);
            deposit_response = "Please make a budget before depositing money.";
            return deposit_response;
        }
        
        // iterate over accounts in priority order
        for (uint n = 1; n <= num_accts; n++) {
            uint diff = accts[n].goal - accts[n].balance;
            // add money if account is not full
            if(diff > 0) {
                if(diff > amt) {
                    // add remainder of deposited amount
                    accts[n].balance += amt;
                    amt = 0;
                }
                else {
                    // add part of deposited amount
                    accts[n].balance += diff;
                    amt -= diff;
                }
            }
            // transfer remainder of deposit if all goals are met
            if (n == num_accts) {
                diff = accts[n].goal - accts[n].balance;
                if (diff == 0) {
                    if (amt > 0) {
                        msg.sender.transfer(amt);
                        deposit_response = "You've reached all your savings goals!";
                    }
                }
            }
        }
        return deposit_response;
    }
    
    function make_budget(string memory name, uint goal, uint priority) public only_budgeter returns(bool){
        
        accts[priority].name = name;
        accts[priority].goal = goal;
        accts[priority].balance = 0;
        num_accts += 1;
        
        return true;
    }
    
    function see_progress() public returns(Account[] memory){
        Account[] memory acct_info = new Account[](num_accts);
        
        for (uint n = 1; n <= num_accts; n++) {
            acct_info[n-1] = accts[n];
        }
        
        return acct_info;
    }
    
    function collect_savings() public only_budgeter returns(bool) {
        require(now >= end, "You should wait to collect your savings until your bills are due.");
        
        selfdestruct(msg.sender);
        return true;
    }
}
